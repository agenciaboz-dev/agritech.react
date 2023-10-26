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

        street: "",
        district: "",
        number: "",
        city: "",
        cep: "",
        uf: "",
        complement: "",

        //Employee
        rg: "",
        gender: "",
        nationality: "",
        relationship: "",
        voter_card: "",
        work_card: "",
        military: "",
        residence: "",

        //Bank
        account: "",
        agency: "",
        nameBank: "",
        typeAccount: "",

        //Producer
        cnpj: "",
    }
    const handleTypeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeUser((event.target as HTMLInputElement).value)
        setCurrentStep(1)
    }
    // useEffect(() => {
    //     console.log(typeUser) // Este log mostrará o valor atualizado de typeUser sempre que ele mudar
    // }, [typeUser])

    const handleSignup = async (values: FormValues) => {
        const data = {
            ...values,
            cpf: unmask(values.cpf),
            phone: unmask(values.phone),
            cep: unmask(values.cep),
            address: {
                street: values.street,
                district: values.district,
                number: values.number,
                city: values.city,
                cep: values.cep,
                uf: estados.find((estado) => estado.id == Number(values.uf))!.value,
                complement: values.complement,
            },
        }
        if (typeUser === "employee") {
            io.emit("user:signup", {
                ...data,
                employee: {
                    rg: data.rg,
                    gender: gender.find((gender) => gender.id == String(data.gender))!.value,
                    nationality: data.nationality,
                    relationship: data.relationship,
                    voter_card: data.voter_card,
                    work_card: data.work_card,
                    military: data.military,
                    residence: data.residence,

                    bank_data: {
                        account: data.account,
                        type: data.typeAccount,
                        agency: data.agency,
                        name: data.nameBank,
                    },
                },
            })
            console.log(data)
        } else if (typeUser === "producer") {
            console.log(data)
            io.emit("user:signup", { ...data, producer: { cnpj: unmask(data.cpf) } })
        }
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoading(false)
            if (user) {
                // login({ login: user.username, password: user.password })
                snackbar({ severity: "success", text: "Cadastro realizado com sucesso!" })
                navigate("../Login")
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
