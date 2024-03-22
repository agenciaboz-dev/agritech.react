import { Box, Button, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { useHeader } from "../../hooks/useHeader"
import { Header } from "../../components/Header"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { Formik, Form } from "formik"
import { HeaderProfile } from "./HeaderProfile"
import { InfoProfile } from "./InfoProfile"
import { useDataHandler } from "../../hooks/useDataHandler"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { useGender } from "../../hooks/useGender"
import { useNavigate } from "react-router-dom"
import { useRelationship } from "../../hooks/useRelationship"
import { unmaskCurrency } from "../../hooks/unmaskNumber"

interface ProfileProps {
    user: User
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const header = useHeader()
    const io = useIo()
    const { setUser } = useUser()

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()
    const [image, setImage] = useState<File>()

    const [loading, setLoading] = useState(false)
    const [tab, setTab] = React.useState("personal")

    const initialValues: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }> = {
        name: user.name,
        cpf: user.cpf,
        phone: user.phone,
        email: user.email,
        birth: new Date(Number(user.birth) || 0).toLocaleDateString("pt-br"),
        image: user.image || null,
        address: {
            cep: user.address?.cep || "",
            city: user.address?.city || "",
            district: user.address?.district || "",
            number: user.address?.number || "",
            street: user.address?.street || "",
            uf: user.address?.uf || "",
            adjunct: user.address?.adjunct || "",
        },
        office: user.office,

        employee: user.employee
            ? {
                  rg: user.employee.rg,
                  gender: user.employee.gender,
                  military: user.employee.military,
                  nationality: user.employee.nationality,
                  relationship: user.employee.relationship,
                  voter_card: user.employee.voter_card,
                  work_card: user.employee.work_card,
                  residence: user.employee.residence,
                  bank: {
                      account: user.employee?.bank?.account || "",
                      name: user.employee?.bank?.name || "",
                      agency: user.employee?.bank?.agency || "",
                      type: user.employee?.bank?.type || "",
                  },
                  //   professional: {
                  //       admission: user.employee.professional?.admission,
                  //       salary: user.employee.professional?.salary,
                  //   },
              }
            : undefined,
        producer: user.producer
            ? {
                  cnpj: user.producer.cnpj,
                  inscricaoEstadual: user.producer.inscricaoEstadual,
              }
            : undefined,
    }
    console.log({ initialValues: initialValues })

    const handleSubmit = async (values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>) => {
        try {
            const data = {
                ...values,
                cpf: values.cpf ? unmask(values.cpf) : undefined,
                phone: values.phone ? unmask(values.phone) : undefined,
                birth: values.birth
                    ? new Date(`${values.birth.split("/")[2]}-${values.birth.split("/")[1]}-${values.birth.split("/")[0]}`)
                          .getTime()
                          .toString()
                    : undefined,
                image: image
                    ? {
                          file: image,
                          name: image.name,
                      }
                    : undefined,
                address: values.address
                    ? {
                          ...values.address,
                          cep: values.address.cep ? unmask(values.address.cep) : undefined,
                      }
                    : undefined,

                employee: values.employee
                    ? {
                          ...values.employee,
                          professional: {
                              ...values.employee.professional,
                              salary: unmaskCurrency(values.employee.professional?.salary || 0),
                          },
                      }
                    : undefined,
                producer: values.producer
                    ? {
                          ...values.producer,
                          cnpj: values.producer.cnpj ? unmask(values.producer.cnpj) : undefined,
                          inscricaoEstadual: values.producer.inscricaoEstadual
                              ? unmask(values.producer.inscricaoEstadual)
                              : undefined,
                      }
                    : undefined,
            }
            setLoading(true)
            io.emit("user:update", data, user.id)
        } catch (error) {
            console.log("O erro é: ", error)
        }
    }

    useEffect(() => {
        header.setTitle("Meu Perfil")
    }, [])

    useEffect(() => {
        io.on("user:update:success", (dataUser: User) => {
            setUser(dataUser)
            console.log("atualizado", dataUser)
            setLoading(false)
            snackbar({ severity: "success", text: "Dados alterados!" })
        })

        io.on("user:update:failed", (error) => {
            console.log(error.error)
            setLoading(false)
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })

        return () => {
            io.off("user:update:success")
            io.off("user:update:failed")
        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location={user.isAdmin ? "../adm/" : user.employee ? "../employee/" : "../producer/"} />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    padding: "4vw",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    flexDirection: "column",
                    paddingBottom: "20vw",
                    gap: "4vw",
                }}
            >
                <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                    Informações Pessoais
                </p>
                <Box sx={{ height: "100%" }}>
                    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize={true}>
                        {({ values, handleChange }) => (
                            <Form>
                                <Box sx={{ gap: "4vw" }}>
                                    <HeaderProfile
                                        values={values}
                                        handleChange={handleChange}
                                        style={{
                                            flexDirection: "row",
                                            gap: "5vw",
                                            width: "100%",
                                            height: "100%",
                                            alignItems: "center",
                                        }}
                                        image={image}
                                        setImage={setImage}
                                    />
                                    <InfoProfile
                                        values={values}
                                        handleChange={handleChange}
                                        review={false}
                                        tab={tab}
                                        setTab={setTab}
                                    />
                                    {tab !== "security" && (
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            sx={{
                                                fontSize: "4vw",
                                                color: colors.text.white,
                                                width: "100%",
                                                backgroundColor: colors.button,
                                                borderRadius: "5vw",
                                                textTransform: "none",
                                            }}
                                        >
                                            {loading ? (
                                                <CircularProgress
                                                    size={"9vw"}
                                                    sx={{ color: colors.text.white, width: "0.5vw" }}
                                                />
                                            ) : (
                                                "Salvar"
                                            )}
                                        </Button>
                                    )}
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}
