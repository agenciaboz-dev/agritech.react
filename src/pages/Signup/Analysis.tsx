import { Box, Button, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useUser } from "../../hooks/useUser"
import LogoutIcon from "@mui/icons-material/Logout"
import drone from "../../assets/logo/droneIcon.png"
import logoColor from "../../assets/logo/logoColor.svg"
import textImage from "../../assets/Seu cadastro foi enviado para.svg"
import { colors } from "../../style/colors"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"

interface AnalysisProps {
    user: User
}

export const Analysis: React.FC<AnalysisProps> = ({ user }) => {
    const { logout } = useUser()
    const header = useHeader()

    console.log({ rejectedUser: user })
    useEffect(() => {
        {
            user.isAdmin && header.setTitle("Novo Funcionário")
        }
    }, [])

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "5vw", height: "100%" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 4vw" }}>
                <Box
                    sx={{
                        width: "100%",
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingLeft: "4vw",
                        paddingRight: "4vw",
                        gap: "1vw",
                    }}
                >
                    {user.isAdmin ? (
                        <Header back location="/" />
                    ) : (
                        <>
                            <img src={drone} style={{ width: 40 }} />
                            <p
                                style={{
                                    color: colors.text.white,
                                    fontSize: "5vw",
                                    fontFamily: "MalgunGothic2",
                                    fontWeight: "bold",
                                }}
                            >
                                Em análise
                            </p>
                        </>
                    )}
                </Box>
                <IconButton onClick={logout}>
                    <LogoutIcon sx={{ color: "#fff", width: "6vw" }} />
                </IconButton>
            </Box>
            <Box
                style={{
                    padding: "10vw",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    gap: "8vw",
                    textAlign: "center",
                    height: "100%",
                }}
            >
                {user.rejected === null && !user.isAdmin ? (
                    <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <img src={textImage} style={{ width: "80%", height: "20vw" }} />
                        <img src={logoColor} style={{ width: "100%", height: "50vw" }} />
                        <Box sx={{ p: "1vw", gap: "3vw", alignItems: "center" }}>
                            <p style={{ fontSize: "4.5vw", fontWeight: "400", textAlign: "center" }}>
                                Estamos analisando seu cadastro e entraremos em contato a respeito
                            </p>
                            <p style={{ fontSize: "3.6vw" }}>Situação:</p>
                            <Button
                                size="small"
                                variant="contained"
                                sx={{
                                    bgcolor: colors.button,
                                    textTransform: "none",
                                    borderRadius: "5vw",
                                    width: "fit-content",
                                }}
                            >
                                Em Análise
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <>
                        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                            {" "}
                            <HighlightOffIcon fontSize="large" sx={{ color: colors.primary }} />
                            <p style={{ fontSize: "5vw", fontWeight: "800" }}>Cadastro recusado!</p>
                            <p style={{ fontSize: "4vw", fontWeight: "400" }}>Motivo: {user.rejected}</p>
                        </Box>
                        <Button variant="contained" sx={{ textTransform: "none", justifyContent: "flex-end" }}>
                            Rever Cadastro
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    )
}
