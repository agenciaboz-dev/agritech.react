import { Box, TextField, Button, MenuItem, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { useBankAccount } from "../../hooks/useBankAccount"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepFourProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepFour: React.FC<StepFourProps> = ({ data, handleChange, setCurrentStep }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const bankAccount = useBankAccount()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: isMobile ? "4vw" : "1vw" }}>
            <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Informações Profissionais
            </p>
            <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                    <TextField
                        variant="outlined"
                        label={"Departamento"}
                        value={data.employee?.voter_card}
                        name="voter_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label={"Salário"}
                        value={data.employee?.voter_card}
                        name="voter_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label={"Data de admissão"}
                        value={data.employee?.voter_card}
                        name="voter_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº da carteira de trabalho"}
                        value={data.employee?.work_card}
                        name="work_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </Box>
    )
}
