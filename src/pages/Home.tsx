import React from "react"
import { image } from "../image"
import { colors } from "../style/colors"
import { Box, Button, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo/logo.png"
import { ButtonComponent } from "../components/ButtonComponent"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: isMobile ? "3vw" : "1vw",
                height: "100%",
                flexDirection: "column",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "90%",
                    backgroundImage: `linear-gradient(${colors.secondary}, ${colors.primary})`,
                    borderBottomRightRadius: isMobile ? "7vw" : "1vw",
                    borderBottomLeftRadius: isMobile ? "7vw" : "1vw",
                    alignItems: "center",
                    justifyContent: "space-between",
                    boxShadow: "3px 3px 6px gray",
                    padding: isMobile ? "4vw" : "1vw",
                    paddingBottom: isMobile ? "4vw" : "3vw",
                    flexDirection: "column",
                }}
            >
                <img
                    src={logo}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "80%",
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

            <Box sx={{ height: "10%", width: isMobile ? "100%" : "20%", alignItems: "center" }}>
                <Button
                    sx={{
                        width: "100%",
                        fontWeight: "600",
                        padding: isMobile ? "2vw" : "1vw",
                        color: colors.text.black,
                        textTransform: "none",
                        fontSize: isMobile ? "4vw" : "1vw",
                    }}
                >
                    Termos de serviço
                </Button>
            </Box>
        </Box>
    )
}
