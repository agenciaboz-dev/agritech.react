import React, { useContext, useEffect, useState } from "react"
import { useIo } from "../hooks/useIo"
import UserContext from "../contexts/userContext"
import { Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { colors } from "../style/colors"
import Logo from "../assets/logo/logo.svg"
import { useNavigate } from "react-router-dom"
import { Formik, Form } from "formik"
import { useSnackbar } from "burgos-snackbar"
import { useResponsiveStyles } from "../hooks/useResponsiveStyles"
import { buttonStyle } from "../style/button"

interface LoginProps {}

interface LoginValues {
    login: string
    password: string
}
export const Login: React.FC<LoginProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()

    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const io = useIo()

    const { setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)

    const initialValues: LoginValues = {
        login: "",
        password: "",
    }

    const handleLogin = async (values: LoginValues) => {
        if (loading) return

        setLoading(true)
        io.emit("user:login", values)
    }
    useEffect(() => {
        io.on("user:login:success", (user: User) => {
            setLoading(false)
            setUser(user)
            console.log("Usuário definido:", user)
            navigate(user.isAdmin ? "/adm/panel" : user.employee ? "/employee" : "/producer")
        })

        io.on("user:login:failed", () => {
            setLoading(false)
            snackbar({ severity: "error", text: "Usuário ou senha inválido!" })
        })

        return () => {
            io.off("admin:login:success")
            io.off("user:login:success")
            io.off("user:login:failed")
        }
    }, [])

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
                    height: isMobile ? "40%" : "80%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <img
                    onClick={() => navigate("../home")}
                    src={Logo}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: isMobile ? "30vw" : "10vw",
                    }}
                />
            </Box>
            <Box
                sx={{
                    padding: isMobile ? "4vw" : "1vw",
                    width: "100%",
                    height: isMobile ? "60%" : "70%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    gap: isMobile ? "3vw" : "1vw",
                    flexDirection: "column",
                }}
            >
                <p
                    style={{
                        color: colors.text.black,
                        fontFamily: "MalgunGothic2",
                        paddingTop: isMobile ? "3vw" : "1vw",
                        fontSize: isMobile ? "5vw" : "1vw",
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
                                InputProps={{ inputMode: "email" }}
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
                                    padding: isMobile ? "3vw" : "0.5vw",
                                    fontSize: isMobile ? "4vw" : "1.2vw",
                                    fontWeight: "600",
                                    borderRadius: "10vw",
                                    textTransform: "none",
                                    width: isMobile ? "100%" : "20%",
                                    margin: "3vw auto 0",
                                }}
                            >
                                {loading ? <CircularProgress size={30} sx={{ color: "#fff", fontSize: "2vw" }} /> : "Entrar"}
                            </Button>
                        </Form>
                    )}
                </Formik>
                <Button
                    sx={{
                        padding: isMobile ? "3vw" : "0.5vw",
                        color: colors.text.black,
                        fontWeight: "600",
                        fontSize: isMobile ? "4vw" : "1.2vw",
                        width: isMobile ? "100%" : "20%",
                        margin: "0 auto",
                    }}
                    onClick={() => navigate("/signup")}
                >
                    Cadastre-se
                </Button>
            </Box>
        </Box>
    )
}
