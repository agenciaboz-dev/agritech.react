import React, { useContext, useEffect, useState } from 'react';
import { useIo } from '../hooks/useIo';
import { useUser } from '../hooks/useUser';
import UserContext from '../contexts/userContext';
import {Box, Button, CircularProgress, TextField, } from "@mui/material"
import { colors } from '../style/colors';
import logo from "../assets/logo/logo.png";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    
}

export const Login: React.FC<LoginProps> = ({ }) => {
    const navigate = useNavigate()

    const io = useIo()
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const { user } = useUser()

    const { setUser } = useContext(UserContext)

    const [loading, setLoading] = useState(false)
    const [snackbarVisible, setSnackbarVisible] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState("")

    const handleLogin = async (user: User | null) => {
        const data = { login, password }

        io.emit("client:sync", user)
        io.emit("user:login", data)
        setLoading(true)
    }
    useEffect(() => {
        io.on("user:login:success", (user: User) => {
            setLoading(false)
            console.log("Usuário definido:", user)
            setUser(user)
            if (user) {
                setSnackbarMessage("Logado com sucesso!")
                setSnackbarVisible(true)
            }
        })

        io.on("user:login:failed", () => {
            setLoading(false)
            alert("Usuário ou senha incorreta!")
        })

        return () => {
            io.off("user:login:success")
            io.off("user:login:failed")
        }
    })

    return (
        <Box
        sx={{
            alignItems: "center",
            justifyContent: "center",
            width:"100%",
            backgroundColor: colors.primary,
        }}
    >
        <Box
            
            sx={{
                
                width: "100%",
                // paddingHorizontal: "2vw",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <img
                src={logo}
                style={{
              
                    alignItems: "center",
                    justifyContent: "center",
                    width: "25vw",
                 
                }}
            />
        </Box>
        <Box
            sx={{
                // paddingTop: "20vw",
                // padding: "20vw",
                width: "100%",
                backgroundColor: "#fff",
                borderTopLeftRadius: "5vw",
                borderTopRightRadius: "5vw",
                
                //gap: 10,
            }}
        >
            <p
                style={{
                    color: colors.text.black,
                    fontSize: "2vw",
                    fontFamily: "MalgunGothic2",
                    paddingTop: "1.5vw",
                    height: "14%",
                }}
            >
                Login
            </p>
            <TextField
                
                placeholder="E-mail, nome de usuário ou CPF"
                value={login}
                // handle={setLogin}
            />
            <TextField
                placeholder="Senha"
                value={password}
                // onChangeText={setPassword}
            />
            <Button variant='contained' color="secondary" onClick={() => handleLogin(user)}>
                {loading ? <CircularProgress color='primary' /> : "Entrar"}
            </Button>
            <Button sx={{ color: colors.text.black }} onClick={() => navigate("/../home")}>
                Cadastre-se
            </Button>
            <Box sx={{ padding: 100, justifyContent: "center" }}>
                {/* <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={Snackbar.DURATION_MEDIUM}
                >
                    {snackbarMessage}
                </Snackbar> */}
            </Box>
        </Box>
    </Box>
)
}