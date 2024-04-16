import React, { useState, useEffect } from "react"
import { useIo } from "../../hooks/useIo"
import { colors } from "../../style/colors"
import { useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress } from "@mui/material"
import { StepOne } from "./../Signup/StepOne"
import { Form, Formik } from "formik"
import { StepTwo } from "./../Signup/StepTwo"
import { StepThree } from "./../Signup/StepThree"
import { useDataHandler } from "../../hooks/useDataHandler"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { useGender } from "../../hooks/useGender"
import { useSnackbar } from "burgos-snackbar"
import { buttonStyle } from "../../style/button"
import { useRelationship } from "../../hooks/useRelationship"
import { SelectAccount } from "./SelectAccount"
import dayjs, { Dayjs } from "dayjs"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    const io = useIo()
    const navigate = useNavigate()
    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()
    const estados = useEstadosBrasil()
    const gender = useGender()
    const typeRelationship = useRelationship()

    const [typeUser, setTypeUser] = useState("")
    const [typeOffice, setTypeOffice] = useState("")
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState<File>()
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)

    const initialValues: SignupValues = {
        name: "",
        email: "",
        username: "",
        password: "",
        cpf: "",
        birth: "",
        phone: "",
        image: null,

        //address
        address: {
            street: "",
            district: "",
            number: "",
            city: "",
            cep: "",
            uf: "",
            adjunct: "",
        },
        isAdmin: false,
        approved: false,
        rejected: "",
        office: "",

        employee:
            typeUser == "employee"
                ? {
                      rg: "",
                      gender: "",
                      nationality: "",
                      relationship: "",
                      voter_card: "",
                      work_card: "",
                      military: "",
                      residence: "",
                  }
                : undefined,
        producer:
            typeUser == "producer"
                ? {
                      cnpj: "",
                      contract: false,
                      inscricaoEstadual: "",
                      tillage: [],
                  }
                : undefined,
    }

    const handleSignup = async (values: SignupValues) => {
        console.log(values.office)

        const data = {
            ...values,
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            approved: typeUser === "employee" ? false : true,
            birth: dayjs(pickDate).valueOf().toString(),

            address: {
                street: values.address.street,
                district: values.address.district,
                number: values.address.number,
                city: values.address.city,
                cep: unmask(values.address.cep),
                uf: estados.find((estado) => estado.value == values.address.uf)?.value || "",
                adjunct: values.address.adjunct,
            },
            image: image
                ? {
                      file: image,
                      name: image.name,
                  }
                : undefined,
        }
        if (typeUser === "employee") {
            io.emit("user:signup", {
                ...data,
                employee: {
                    rg: data.employee?.rg,
                    gender: gender.find((gender) => gender.id == String(data.employee?.gender))?.value || "",
                    relationship:
                        typeRelationship.find((relationship) => relationship.id == data.employee?.relationship)?.value || "",
                    nationality: data.employee?.nationality,
                    voter_card: data.employee?.voter_card,
                    work_card: data.employee?.work_card,
                    military: data.employee?.military,
                    residence: data.employee?.residence,
                },
            })
            console.log(data)
        } else if (typeUser === "producer") {
            console.log({ producer: data })
            io.emit("user:signup", {
                ...data,
                producer: {
                    cnpj: unmask(data.producer?.cnpj || ""),
                    inscricaoEstadual: unmask(data.producer?.inscricaoEstadual || ""),
                },
            })
        }
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoading(false)
            if (user) {
                console.log(typeUser)
                snackbar({
                    severity: "success",
                    text: "Cadastro realizado com sucesso! Faça login.",
                })
                {
                    typeUser === "producer" ? navigate("../panel") : navigate("../analysis")
                }
            }
        })

        io.on("user:status:failed", (data) => {
            const errorMessage = data.error ? data.error : "Falha no cadastro!"
            snackbar({ severity: "error", text: errorMessage })
            setLoading(false)
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:status:failed")
        }
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                backgroundImage: `linear-gradient(${colors.secondary} , ${colors.primary} 20%)`,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    paddingHorizontal: 20,
                    justifyContent: "center",
                    alignItems: "flex-start",
                    padding: "4vw",
                }}
            >
                <p
                    style={{
                        fontFamily: "MalgunGothic2",
                        fontWeight: "bold",
                        color: colors.text.white,
                        fontSize: "5.5vw",
                        paddingTop: "2vw",
                        height: "100%",
                        textAlign: "start",
                        width: "100%",
                        overflow: "hidden",
                    }}
                >
                    Registre-se
                </p>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "90%",
                    padding: "4vw",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    gap: 10,
                    flexDirection: "column",
                    paddingBottom: "10vw",
                    overflow: "auto",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12vw",
                        flexDirection: "column",
                    }}
                >
                    <Formik initialValues={initialValues} onSubmit={(values) => handleSignup(values)} enableReinitialize>
                        {({ values, handleChange }) => (
                            <Form>
                                {currentStep === 0 && (
                                    <>
                                        <SelectAccount
                                            change={handleChange}
                                            values={values}
                                            typeUser={typeUser}
                                            typeOffice={typeOffice}
                                            setCurrentStep={setCurrentStep}
                                            setUser={setTypeUser}
                                            setOffice={setTypeOffice}
                                        />
                                        <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    padding: "3vw",
                                                    color: colors.text.black,
                                                    fontWeight: "600",
                                                    fontSize: "4vw",
                                                    textTransform: "none",
                                                    borderRadius: "10vw",
                                                    height: "10vw",
                                                }}
                                                onClick={() => navigate("/../home")}
                                            >
                                                Cancelar
                                            </Button>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    padding: "3vw",
                                                    color: colors.text.white,
                                                    fontWeight: "600",
                                                    fontSize: "4vw",
                                                    textTransform: "none",
                                                    borderRadius: "10vw",
                                                    height: "10vw",
                                                    bgcolor: colors.button,
                                                }}
                                                onClick={() => setCurrentStep(1)}
                                            >
                                                Próximo
                                            </Button>
                                        </Box>
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <Box>
                                        <StepOne
                                            data={values}
                                            handleChange={handleChange}
                                            image={image}
                                            setImage={setImage}
                                            typeUser={typeUser}
                                            setCurrentStep={setCurrentStep}
                                            pickDate={pickDate}
                                            setPickDate={setPickDate}
                                        />
                                        <Box sx={{ width: "100%", gap: "2vw" }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    fontSize: "4vw",
                                                    color: colors.text.white,
                                                    width: "100%",
                                                    backgroundColor: colors.button,
                                                    borderRadius: "5vw",
                                                    textTransform: "none",
                                                }}
                                                onClick={() => {
                                                    setCurrentStep(2)
                                                }}
                                            >
                                                Próximo
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    padding: "3vw",
                                                    color: colors.text.black,
                                                    fontWeight: "600",
                                                    fontSize: "4vw",
                                                    textTransform: "none",
                                                    borderRadius: "10vw",
                                                    height: "10vw",
                                                    width: "100%",
                                                }}
                                                onClick={() => {
                                                    setCurrentStep(0)
                                                }}
                                            >
                                                Voltar
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                                {currentStep === 2 && (
                                    <Box sx={{ gap: "4vw" }}>
                                        <StepTwo
                                            data={values}
                                            handleChange={handleChange}
                                            typeUser={typeUser}
                                            setCurrentStep={setCurrentStep}
                                        />
                                        {typeUser === "employee" && (
                                            <Box sx={{ width: "100%", gap: "2vw" }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        fontSize: "4vw",
                                                        color: colors.text.white,
                                                        width: "100%",
                                                        backgroundColor: colors.button,
                                                        borderRadius: "5vw",
                                                        textTransform: "none",
                                                    }}
                                                    onClick={() => {
                                                        setCurrentStep(3)
                                                    }}
                                                >
                                                    Próximo
                                                </Button>

                                                <Button
                                                    variant="outlined"
                                                    sx={{
                                                        padding: "3vw",
                                                        color: colors.text.black,
                                                        fontWeight: "600",
                                                        fontSize: "4vw",
                                                        textTransform: "none",
                                                        borderRadius: "10vw",
                                                        height: "10vw",
                                                        width: "100%",
                                                    }}
                                                    onClick={() => {
                                                        setCurrentStep(1)
                                                    }}
                                                >
                                                    Voltar
                                                </Button>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                                {currentStep === 3 && typeUser === "employee" && (
                                    <StepThree data={values} handleChange={handleChange} setCurrentStep={setCurrentStep} />
                                )}

                                {typeUser == "producer" && currentStep == 2 && (
                                    <Box sx={{ width: "100%", gap: "2vw" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                ...buttonStyle,
                                                fontSize: 17,
                                                color: colors.text.white,
                                                width: "100%",
                                                backgroundColor: colors.button,
                                                borderRadius: "5vw",
                                                textTransform: "none",
                                            }}
                                        >
                                            {loading ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "Cadastrar"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                padding: "3vw",
                                                color: colors.text.black,
                                                fontWeight: "600",
                                                fontSize: "4vw",
                                                textTransform: "none",
                                                borderRadius: "10vw",
                                                height: "10vw",
                                                width: "100%",
                                            }}
                                            onClick={() => {
                                                setCurrentStep(1)
                                            }}
                                        >
                                            Voltar
                                        </Button>
                                    </Box>
                                )}
                                {typeUser == "employee" && currentStep == 3 && (
                                    <Box sx={{ width: "100%", gap: "2vw" }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                ...buttonStyle,
                                                fontSize: 17,
                                                color: colors.text.white,
                                                width: "100%",
                                                backgroundColor: colors.button,
                                                borderRadius: "5vw",
                                                textTransform: "none",
                                            }}
                                        >
                                            {loading ? <CircularProgress size={30} sx={{ color: "#fff" }} /> : "Cadastrar"}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                width: "100%",
                                                padding: "3vw",
                                                color: colors.text.black,
                                                fontWeight: "600",
                                                fontSize: "4vw",
                                                textTransform: "none",
                                                borderRadius: "10vw",
                                                height: "10vw",
                                            }}
                                            onClick={() => {
                                                setCurrentStep(2)
                                            }}
                                        >
                                            Voltar
                                        </Button>
                                    </Box>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    )
}
