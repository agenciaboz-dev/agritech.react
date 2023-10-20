import React, { useContext, useEffect, useState } from "react"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"
import UserContext from "../contexts/userContext"
import { Box, Button, CircularProgress, TextField } from "@mui/material"
import { colors } from "../style/colors"
import logo from "../assets/logo/logo.png"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { textField, textStyle } from "../style/input"
import { buttonStyle } from "../style/button"

interface LoginProps {}

interface LoginValues {
    login: string
    password: string
}
export const Login: React.FC<LoginProps> = ({}) => {
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const io = useIo()

    const { user } = useUser()
    const { setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    const initialValues: LoginValues = {
        login: "",
        password: "",
    }

    const handleLogin = async (values: LoginValues) => {
        io.emit("client:sync", user)
        io.emit("user:login", values)
        setLoading(true)
    }
    useEffect(() => {
        io.on("user:login:success", (user: User) => {
            setLoading(false)
            console.log("Usuário definido:", user)
            setUser(user)
            if (user) {
                snackbar({ severity: "success", text: "Conectado!" })
            }
        })

        io.on("user:login:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })

        return () => {
            io.off("user:login:success")
            io.off("user:login:failed")
        }
    })

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `linear-gradient(${colors.secondary} , ${colors.primary} 50%)`,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <img
                    onClick={() => navigate("../home")}
                    src={logo}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "30vw",
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: "4vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    gap: "3vw",
                    flexDirection: "column",
                }}
            >
                <p
                    style={{
                        color: colors.text.black,
                        fontFamily: "MalgunGothic2",
                        paddingTop: "3vw",
                        fontSize: "5vw",
                        fontWeight: "600",
                    }}
                >
                    Login
                </p>
                <Formik initialValues={initialValues} onSubmit={(values) => handleLogin(values)}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField
                                placeholder="E-mail, nome de usuário ou CPF"
                                name="login"
                                label="E-mail, nome de usuário ou CPF"
                                value={values.login}
                                sx={textField}
                                onChange={handleChange}
                            />
                            <TextField
                                placeholder="Senha"
                                type="password"
                                name="password"
                                label="Senha"
                                sx={textField}
                                value={values.password}
                                onChange={handleChange}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    ...buttonStyle,
                                    backgroundColor: colors.button,
                                    padding: "3vw",
                                    fontSize: "4vw",
                                    fontWeight: "600",
                                    borderRadius: "10vw",
                                    textTransform: "none",
                                }}
                            >
                                {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2vw" }} /> : "Entrar"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button
                    sx={{ padding: "3vw", color: colors.text.black, fontWeight: "600", fontSize: "4vw" }}
                    onClick={() => navigate("/signup")}
                >
                    Cadastre-se
                </Button>
            </Box>
        </Box>
    )
}
