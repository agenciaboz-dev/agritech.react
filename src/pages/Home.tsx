import React from "react"
import { image } from "../image"
import { colors } from "../style/colors"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo/logo.png";
import { ButtonComponent } from "../components/ButtonComponent"

interface HomeProps {}

export const Home: React.FC<HomeProps> = ({}) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: "3vw",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "90%",
                    backgroundImage: `linear-gradient(${colors.secondary}, ${colors.primary})`,
                    borderBottomRightRadius: 40,
                    borderBottomLeftRadius: 40,
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "10vw",
                    boxShadow: "3px 3px 6px gray",
                    padding: "4vw",
                }}
            >
                <img
                    src={logo}
                    style={{
                        flex: 0.8,
                        alignItems: "center",
                        justifyContent: "center",
                        width: "80%",
                        height: "80%",
                    }}
                />
                <Box style={{ width: "100%", height: "20%", gap: 15 }}>
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

            <Box sx={{ height: "10%", width: "100%" }}>
                <Button
                    sx={{
                        fontWeight: "600",
                        padding: "2vw",
                        color: colors.text.black,
                        textTransform: "none",
                        fontSize: "4vw",
                    }}
                >
                    Termos de serviço
                </Button>
            </Box>
        </Box>
    )
}
