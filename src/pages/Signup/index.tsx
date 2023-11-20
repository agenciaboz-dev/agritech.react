import React, { useState, useEffect } from "react"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { colors } from "../../style/colors"
import { useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { StepOne } from "./../Signup/StepOne"
import { Form, Formik } from "formik"
import { StepTwo } from "./../Signup/StepTwo"
import { StepThree } from "./../Signup/StepThree"
import { useDataHandler } from "../../hooks/useDataHandler"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { useGender } from "../../hooks/useGender"
import { useSnackbar } from "burgos-snackbar"
import { buttonStyle } from "../../style/button"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    const io = useIo()
    const navigate = useNavigate()
    const { login, setUser } = useUser()
    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    const estados = useEstadosBrasil()
    const gender = useGender()

    const [typeUser, setTypeUser] = useState("")
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const initialValues: FormValues = {
        name: "",
        email: "",
        username: "",
        password: "",
        cpf: "",
        birth: "",
        phone: "",
        image: "",

        //address
        address: {
            street: "",
            district: "",
            number: "",
            city: "",
            cep: "",
            uf: "",
            complement: "",
        },
        isAdmin: false,
        approved: false,
        rejected: "",

        employee:
            typeUser === "employee"
                ? {
                      rg: "",
                      gender: "",
                      nationality: "",
                      relationship: "",
                      voter_card: "",
                      work_card: "",
                      military: "",
                      residence: "",
                      // bank_data: {
                      //     account: "",
                      //     agency: "",
                      //     name: "",
                      //     type: "",
                      // },
                  }
                : undefined,

        producer:
            typeUser === "producer"
                ? {
                      cnpj: "",
                  }
                : undefined,
    }
    const handleTypeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeUser((event.target as HTMLInputElement).value)
        setCurrentStep(1)
    }

    const handleSignup = async (values: FormValues) => {
        const data = {
            ...values,
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            cep: unmask(values.address.cep),
            address: {
                street: values.address.street,
                district: values.address.district,
                number: values.address.number,
                city: values.address.city,
                cep: values.address.cep,
                // uf: estados.find((estado) => estado.value == values.address.uf)!.value,
                uf: "AM",

                complement: values.address.complement,
            },
        }
        if (typeUser === "employee") {
            io.emit("user:signup", {
                ...data,
                employee: {
                    rg: data.employee?.rg,
                    // gender: gender.find((gender) => gender.id == String(data.employee?.gender))!.value,
                    gender: "Fem",
                    nationality: data.employee?.nationality,
                    relationship: data.employee?.relationship,
                    voter_card: data.employee?.voter_card,
                    work_card: data.employee?.work_card,
                    military: data.employee?.military,
                    residence: data.employee?.residence,

                    // bank_data: {
                    //     account: data.employee?.bank_data.account,
                    //     type: data.employee?.bank_data.type,
                    //     agency: data.employee?.bank_data.agency,
                    //     name: data.employee?.bank_data.name,
                    // },
                },
            })
            console.log(data)
        } else if (typeUser === "producer") {
            console.log(data)
            io.emit("user:signup", { ...data, approved: true, producer: { cnpj: unmask(data.producer?.cnpj || "") } })
        }
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoading(false)
            if (user) {
                // login({ login: user.username, password: user.password })
                snackbar({ severity: "success", text: "Cadastro enviado para análise!" })
                {
                    typeUser === "producer" ? navigate("../panel") : navigate("../analysis")
                }
            }
        })

        io.on("user:login:success", (user: User) => {
            setUser(user)
            snackbar({ severity: "success", text: "Conectado!" })
        })

        io.on("user:signup:failed", (data) => {
            const errorMessage = data.error ? data.error : "Falha no cadastro!"
            snackbar({ severity: "error", text: errorMessage })

            setLoading(false)
        })

        return () => {
            io.off("user:signup:success")
            io.off("user:signup:failed")
            io.off("user:login:success")
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
                    }}
                >
                    Registre-se
                </p>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "87%",
                    padding: "4vw",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    flex: 1,
                    gap: 10,
                    flexDirection: "column",
                    paddingBottom: "8vw",
                }}
            >
                <Formik initialValues={initialValues} onSubmit={(values) => handleSignup(values)}>
                    {({ values, handleChange }) => (
                        <Form>
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
                                {currentStep === 0 && (
                                    <>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "5vw",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <p style={{ fontSize: "5vw", fontFamily: "MalgunGothic2" }}>
                                                Selecione o tipo de conta
                                            </p>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={typeUser}
                                                    name="typeAccount"
                                                    onChange={handleTypeUser}
                                                    sx={{ width: "100%" }}
                                                >
                                                    <FormControlLabel
                                                        value="producer"
                                                        sx={{
                                                            fontWeight: typeUser == "producer" ? "800" : "400",
                                                            fontSize: "4vw",
                                                            fontFamily: "MalgunGothic2",
                                                        }}
                                                        control={<Radio />}
                                                        label="Produtor"
                                                    />
                                                    <FormControlLabel
                                                        value="employee"
                                                        sx={{
                                                            fontWeight: typeUser == "producer" ? "800" : "400",
                                                            fontSize: "4vw",
                                                            fontFamily: "MalgunGothic2",
                                                        }}
                                                        control={<Radio />}
                                                        label="Funcionário"
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
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
                                    </>
                                )}

                                {currentStep === 1 && (
                                    <StepOne
                                        data={values}
                                        handleChange={handleChange}
                                        typeUser={typeUser}
                                        setCurrentStep={setCurrentStep}
                                    />
                                )}
                                {currentStep === 2 && (
                                    <StepTwo
                                        data={values}
                                        handleChange={handleChange}
                                        typeUser={typeUser}
                                        setCurrentStep={setCurrentStep}
                                    />
                                )}
                                {currentStep === 3 && typeUser === "employee" && (
                                    <StepThree data={values} handleChange={handleChange} setCurrentStep={setCurrentStep} />
                                )}

                                {typeUser == "producer" && currentStep == 2 && (
                                    <Box sx={{ width: "100%", position: "relative", bottom: "10vw" }}>
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
                                    </Box>
                                )}
                                {typeUser == "employee" && currentStep == 3 && (
                                    <Box sx={{ width: "100%", gap: "3vw" }}>
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
                                    </Box>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
