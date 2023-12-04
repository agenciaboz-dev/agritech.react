import { Box, TextField, Button, MenuItem } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"

interface StepFourProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepFour: React.FC<StepFourProps> = ({ data, handleChange, setCurrentStep }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Informações Profissionais
            </p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "3vw" }}>
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
