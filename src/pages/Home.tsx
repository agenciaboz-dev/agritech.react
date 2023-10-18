import React from "react"
import { image } from "../image"
import { colors } from "../style/colors"
import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo/logo.png";


interface HomeProps {
}

export const Home: React.FC<HomeProps> = ({ }) => {
    const navigate = useNavigate()
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
           
                <Box
                    
                    sx={{
                        width: "100%",
                        backgroundImage: `linear-gradient(${colors.secondary}, ${colors.primary})`,
                        borderBottomRightRadius: 40,
                        borderBottomLeftRadius: 40,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={logo}
                        style={{
                            flex: 0.8,
                            alignItems: "center",
                            justifyContent: "center",
                            width: 200,
                            height: 200,
                        }}
                    />
                    <Box style={{ width: "100%", gap: 15, paddingTop: 22 }}>
                        <Button
                            variant="outlined"
                            style={{ borderColor: "#fff", width: "100%" }}
                            //labelStyle={{ color: "#fff", fontFamily: "MalgunGothic2", fontSize: 19 }}
                            onClick={() => navigate("Signup")}
                        >
                            Cadastre-se
                        </Button>
                        <Button
                            variant="contained"
                            color={"primary"}
                            style={{ borderColor: colors.button, width: "100%" }}
                            // labelStyle={{ fontSize: 19, fontFamily: "MalgunGothic2" }}
                            onClick={() => navigate("Login")}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
           
            <Box style={{ flex: 0.08 }}>
                <Button
                    // labelStyle={{ fontFamily: "MalgunGothic2", fontSize: 16, color: colors.button }}
                >
                    Termos de serviço
                </Button>
            </Box>
        </Box>
    )
}
