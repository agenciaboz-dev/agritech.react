import { Box, Button, IconButton, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { logout } = useUser()
    const header = useHeader()

    console.log({ rejectedUser: user })
    useEffect(() => {
        {
            user.isAdmin && header.setTitle("Novo Colaborador")
        }
    }, [])

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: isMobile ? "5vw" : "1vw", height: "100%" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "0 4vw" : "0 1vw" }}>
                <Box
                    sx={{
                        width: "100%",
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingLeft: isMobile ? "4vw" : "1vw",
                        paddingRight: isMobile ? "4vw" : "1vw",
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
                                    fontSize: isMobile ? "5vw" : "1.5rem",
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
                    <LogoutIcon sx={{ color: "#fff", width: isMobile ? "6vw" : "2vw" }} />
                </IconButton>
            </Box>
            <Box
                style={{
                    padding: isMobile ? "10vw" : "1vw",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    gap: isMobile ? "8vw" : "1vw",
                    textAlign: "center",
                    height: "100%",
                }}
            >
                {user.rejected === null && !user.isAdmin ? (
                    <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <img src={textImage} style={{ width: "80%", height: isMobile ? "20vw" : "10vw" }} />
                        <img src={logoColor} style={{ width: "100%", height: isMobile ? "50vw" : "10vw" }} />
                        <Box sx={{ p: "1vw", gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                            <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "400", textAlign: "center" }}>
                                Estamos analisando seu cadastro e entraremos em contato a respeito
                            </p>
                            <p style={{ fontSize: isMobile ? "3.6vw" : "1rem" }}>Situação:</p>
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
                    <Box sx={{ justifyContent: "center", alignItems: "center", gap: isMobile ? "6vw" : "1vw" }}>
                        <img src={logoColor} style={{ width: "100%", height: isMobile ? "40vw" : "10vw" }} />
                        <Box sx={{ p: "1vw", gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                            <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "400", textAlign: "center" }}>
                                Seu cadastro foi recusado,{" "}
                                <a href="" style={{ color: colors.primary }}>
                                    clique aqui
                                </a>{" "}
                                para rever seu cadastro
                            </p>
                            {/* <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "400", textAlign: "center" }}>
                                Motivo: Não completou o cadastro
                            </p> */}
                            <p style={{ fontSize: isMobile ? "3.6vw" : "1rem" }}>Situação:</p>
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
                                Recusado
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
