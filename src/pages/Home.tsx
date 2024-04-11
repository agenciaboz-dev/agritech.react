import React from "react"
import { image } from "../image"
import { colors } from "../style/colors"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import LogoIcon from "../assets/logo/logo.svg"
import { ButtonComponent } from "../components/ButtonComponent"
import { app_version } from "../app_version"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "start",
                height: "100%",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "89%" : "80%",
                    backgroundImage: `linear-gradient(${colors.secondary}, ${colors.primary})`,
                    borderBottomRightRadius: isMobile ? "7vw" : "2vw",
                    borderBottomLeftRadius: isMobile ? "7vw" : "2vw",
                    alignItems: "center",
                    justifyContent: isMobile ? "space-between" : "space-around",
                    boxShadow: "3px 3px 6px gray",
                    padding: isMobile ? "4vw" : "1vw",
                    paddingBottom: isMobile ? "1vw" : "3vw",
                    paddingTop: isMobile ? "12vw" : "3vw",
                    flexDirection: "column",
                }}
            >
                <img
                    src={LogoIcon}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: isMobile ? "50%" : "30%",
                        height: isMobile ? "80%" : "50%",
                    }}
                />

                <Box
                    style={{
                        width: isMobile ? "100%" : "20%",
                        height: "20%",
                        gap: isMobile ? "2vw" : "1vw",
                        flexDirection: "column",
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{
                            padding: isMobile ? "2vw" : "1vw",
                            borderColor: "#fff",
                            width: "100%",
                            color: colors.text.white,
                            fontWeight: "600",
                            fontSize: isMobile ? "4vw" : "1.2vw",
                            borderRadius: "10vw",
                            textTransform: "none",
                        }}
                        onClick={() => navigate("../signup")}
                    >
                        Cadastre-se
                    </Button>
                    <ButtonComponent title="Entrar" location="../login" />
                </Box>
            </Box>

            <Box sx={{ height: isMobile ? "10%" : "20%", width: "100%", alignItems: "center", justifyContent: "center" }}>
                <Button
                    sx={{
                        fontWeight: "600",
                        padding: isMobile ? "0vw 2vw" : "1vw",
                        color: colors.text.black,
                        textTransform: "none",
                        fontSize: isMobile ? "4vw" : "1vw",
                    }}
                    onClick={() => navigate("/terms")}
                >
                    Termos de serviço
                </Button>
                <Box sx={{ alignItems: "center", lineHeight: 1.2, fontSize: "0.8rem" }}>
                    <p>
                        {new Date().getFullYear()} © Direitos Reservados - {app_version}
                    </p>
                    <p>Powered by BOZ</p>
                </Box>
            </Box>
        </Box>
    )
}
