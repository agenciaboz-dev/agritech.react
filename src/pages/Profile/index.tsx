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

interface ProfileProps {
    user: User
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const header = useHeader()
    const io = useIo()
    const { setUser } = useUser()

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    const estados = useEstadosBrasil()
    const gender = useGender()

    const [loading, setLoading] = useState(false)

    const initialValues: FormValues = {
        name: user.name || "",
        cpf: user.cpf || "",
        phone: user.phone || "",
        email: user.email || "",
        username: user.username || "",
        password: user.password || "",
        birth: new Date(user.birth || 0).toLocaleDateString("pt-br") || "",
        image: user.image || "",
        address: {
            cep: user.address?.cep || "",
            city: user.address?.city || "",
            district: user.address?.district || "",
            number: user.address?.number || "",
            street: user.address?.street || "",
            uf: user.address?.uf || "",
            complement: user.address?.complement || "",
        },

        isAdmin: user.isAdmin,

        employee: {
            id: user.employee?.id,
            rg: user.employee?.rg || "",
            gender: user.employee?.gender || "",
            military: user.employee?.military || "",
            nationality: user.employee?.nationality || "",
            relationship: user.employee?.relationship || "",
            voter_card: user.employee?.voter_card || "",
            work_card: user.employee?.work_card || "",
            residence: user.employee?.residence || "",
            bank_data: {
                account: user.employee?.bank_data?.account || "",
                name: user.employee?.bank_data?.name || "",
                agency: user?.employee?.bank_data?.agency || "",
                type: user?.employee?.bank_data?.type || "",
            },
        },
        producer: {
            cnpj: user.producer?.cnpj || "",
        },
    }

    const handleSubmit = async (values: FormValues) => {
        try {
            const data = {
                ...values,
                cpf: unmask(values.cpf),
                phone: unmask(values.phone),

                isAdmin: values.isAdmin,
                address: {
                    cep: unmask(values.address.cep),
                    city: values.address.city,
                    complement: values.address.complement,
                    district: values.address.district,
                    number: values.address.number,
                    street: values.address.street,
                    uf: estados.find((estado) => estado.value == values.address.uf)!.value,
                    userId: user.id,
                },
            }

            if (data.employee) {
                io.emit("user:update", {
                    ...data,
                    employee: {
                        rg: data.employee?.rg,
                        gender: gender.find((gender) => gender.value == data.employee?.gender)!.value,
                        nationality: data.employee?.nationality,
                        relationship: data.employee?.relationship,
                        voter_card: data.employee?.voter_card,
                        work_card: data.employee?.work_card,
                        military: data.employee?.military,
                        residence: data.employee?.residence,
                        userid: user.id,

                        bank_data: {
                            account: data.employee?.bank_data?.account,
                            type: data.employee?.bank_data?.type,
                            agency: data.employee?.bank_data?.agency,
                            name: data.employee?.bank_data?.name,
                            employeeId: user.employee?.id,
                        },
                    },
                })
                console.log("DADOS MONTAdos:", data)
            } else if (data.producer) {
                console.log(data)
                io.emit("user:update", { ...data, producer: { cnpj: unmask(data.producer?.cnpj) } })
            }
        } catch (error) {
            console.log("O erro é: ", error)
        }
        setLoading(true)
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

        io.emit("user:find", user.id)

        io.on("user:find:success", (dataUser: User) => {
            setUser(dataUser)
        })

        io.on("user:find:failed", (error) => {
            console.error(error.error)
        })

        return () => {
            io.off("user:update:success")
            io.off("user:update:failed")
            io.off("user:find")
            io.off("user:find:success")
            io.off("user:find:failed")
        }
    }, [user])

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
                <Header back />
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
                                    />
                                    <InfoProfile values={values} handleChange={handleChange} />
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        sx={{
                                            fontSize: "5vw",
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
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}
