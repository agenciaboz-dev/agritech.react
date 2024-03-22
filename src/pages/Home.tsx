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
                gap: "3vw",
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
                    borderBottomRightRadius: "7vw",
                    borderBottomLeftRadius: "7vw",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "10vw",
                    boxShadow: "3px 3px 6px gray",
                    padding: "4vw",
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

                <Box style={{ width: "100%", height: "20%", gap: "2vw", flexDirection: "column" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            padding: "2vw",
                            borderColor: "#fff",
                            width: "100%",
                            color: colors.text.white,
                            fontWeight: "600",
                            fontSize: "4vw",
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

            <Box sx={{ height: "10%", width: "100%", alignItems: "center" }}>
                <Button
                    sx={{
                        width: "100%",
                        fontWeight: "600",
                        padding: "2vw",
                        color: colors.text.black,
                        textTransform: "none",
                        fontSize: "4vw",
                    }}
                    onClick={() => navigate("/terms")}
                >
                    Termos de serviço
                </Button>
            </Box>
        </Box>
    )
}
