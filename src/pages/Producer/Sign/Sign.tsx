import { Box, Button } from "@mui/material"
import React, { useState } from "react"
import { colors } from "../../../style/colors"
import logo from "../../../assets/logo/logo.png"
import { Plans } from "./Plans"
import { useUser } from "../../../hooks/useUser"
import { Account } from "./Account"
import { Payment } from "./Payment"

interface SignProps {
    user: User
}

export const Sign: React.FC<SignProps> = ({ user }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const { logout } = useUser()

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
                backgroundImage: `linear-gradient(${colors.secondary} , ${colors.primary} 20%)`,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                }}
            >
                <img
                    src={logo}
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100vw",
                        height: "43vw",
                    }}
                />
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: "87%",
                    padding: "4vw",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    flex: 1,
                    gap: 10,
                    flexDirection: "column",
                    paddingBottom: "8vw",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                <Box sx={{ flexDirection: "column", gap: "10vw", justifyContent: "center", alignItems: "center" }}>
                    {currentStep === 0 && (
                        <>
                            <h1 style={{ fontWeight: "400" }}>
                                Assine <span style={{ fontWeight: "bold" }}>Agritech</span>
                            </h1>
                            <ul style={{ fontSize: "4vw" }}>
                                <li>Vantagem Lorem Ipsum</li>
                                <li>Vantagem Lorem Ipsum</li>
                                <li>Vantagem Lorem Ipsum</li>
                            </ul>
                            <Box sx={{ width: "100%", alignItems: "center", gap: "3vw" }}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        padding: "1vw",
                                        borderColor: colors.button,
                                        width: "80%",
                                        backgroundColor: "#232323",
                                        borderRadius: "10vw",
                                        fontWeight: "800",
                                        textTransform: "none",
                                        fontSize: "3.5vw",
                                    }}
                                    onClick={() => {
                                        setCurrentStep(1)
                                    }}
                                >
                                    Próximo
                                </Button>
                                <p style={{ textDecoration: "underline", fontSize: "4vw" }} onClick={() => logout()}>
                                    Sair
                                </p>
                            </Box>
                        </>
                    )}
                    {currentStep === 1 && <Plans setCurrentStep={setCurrentStep} />}
                    {currentStep === 2 && <Account setCurrentStep={setCurrentStep} />}
                    {currentStep === 3 && <Payment setCurrentStep={setCurrentStep} />}
                </Box>
            </Box>
        </Box>
    )
}
