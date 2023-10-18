import React, { useState, useEffect } from "react"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { colors } from "../../style/colors"
import { useNavigate } from "react-router-dom"
import { Box, Button, CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"
import { StepOne } from "./../Signup/StepOne"
import { Form, Formik } from "formik"
import { StepTwo } from "./../Signup/StepTwo"
import { StepThree } from "./../Signup/StepThree"

interface SignupProps {}

export const Signup: React.FC<SignupProps> = ({}) => {
    const io = useIo()
    const { login, setUser } = useUser()
    const navigate = useNavigate()

    const [typeUser, setTypeUser] = useState("producer")
    const [currentStep, setCurrentStep] = useState(0)
    const [loading, setLoading] = useState(false)

    const initialValues: FormValues = {
        name: " ",
        email: " ",
        username: " ",
        password: " ",
        cpf: " ",
        birth: "",
        phone: " ",

        street: "",
        district: "",
        number: "",
        city: "",
        cep: "",
        uf: "",
        complement: "",

        //Employee
        rg: "",
        gender: " ",
        nationality: " ",
        relationship: " ",
        voter_card: " ",
        work_card: " ",
        military: " ",
        residence: " ",

        //Producer
        cnpj: " ",
    }
    const handleTypeUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTypeUser((event.target as HTMLInputElement).value)
        setCurrentStep(1)
    }
    useEffect(() => {
        console.log(typeUser) // Este log mostrará o valor atualizado de typeUser sempre que ele mudar
    }, [typeUser])

    const handleSignup = async (values: FormValues) => {
        const data = {
            ...values,
            address: {
                street: values.street,
                district: values.district,
                number: values.number,
                city: values.city,
                cep: values.cep,
                uf: values.uf,
                complement: values.complement,
            },
        }
        if (typeUser === "employee") {
            io.emit("user:signup", {
                ...data,
                employee: {
                    rg: data.rg,
                    gender: data.gender,
                    nationality: data.nationality,
                    relationship: data.relationship,
                    voter_card: data.voter_card,
                    work_card: data.work_card,
                    military: data.military,
                    residence: data.residence,
                },
            })
            console.log(data)
        } else if (typeUser === "producer") {
            console.log(data)
            io.emit("user:signup", { ...data, producer: { cnpj: data.cnpj } })
        }
        setLoading(true)
    }

    useEffect(() => {
        io.on("user:signup:success", (user: User) => {
            setLoading(false)
            // setSnackbarMessage("Cadastro realizado com sucesso!")
            if (user) {
                //setSnackbarVisible(true)
                //login({ login: user.username, password: user.password })
                navigate("Login")
            }
        })

        io.on("user:login:success", (user: User) => {
            setUser(user)
        })

        io.on("user:signup:failed", () => {
            alert("Falha no cadastro!")
            // setSnackbarVisible(true)
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
            style={{
                height: "100%",
                backgroundColor: "#fff",
                backgroundImage: `linear-gradient(${colors.secondary} , ${colors.primary} 20%)`,
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
                        color: colors.text.white,
                        fontSize: 23,
                        paddingTop: 15,
                        height: "100%",
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
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    flex: 1,
                    gap: 10,
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
                                }}
                            >
                                {currentStep === 0 && (
                                    <>
                                        <Box sx={{ alignItems: "center", justifyContent: "center", gap: "5vw" }}>
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
                                                        style={{
                                                            fontWeight: typeUser == "producer" ? "800" : "400",
                                                            fontSize: "4vw",
                                                            fontFamily: "MalgunGothic2",
                                                        }}
                                                        control={<Radio />}
                                                        label="Produtor"
                                                    />
                                                    <FormControlLabel
                                                        value="employee"
                                                        style={{
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
                                    <StepTwo data={values} handleChange={handleChange} typeUser={typeUser} />
                                )}
                                {currentStep === 3 && typeUser === "employee" && (
                                    <StepThree data={values} handleChange={handleChange} typeUser={typeUser} />
                                )}

                                {typeUser == "producer" && currentStep == 2 && (
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        style={{ fontSize: 17, backgroundColor: colors.button }}
                                    >
                                        {loading ? (
                                            <CircularProgress style={{ backgroundColor: colors.text.white }} />
                                        ) : (
                                            "Cadastrar"
                                        )}
                                    </Button>
                                )}
                                {typeUser == "employee" && currentStep == 3 && (
                                    <Button type="submit" variant="contained" style={{ backgroundColor: "#232323" }}>
                                        Cadastrar
                                    </Button>
                                )}
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
