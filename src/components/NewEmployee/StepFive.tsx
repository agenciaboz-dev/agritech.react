import { Box, TextField, Button, MenuItem } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInputNando from "../MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import MaskedInput from "../MaskedInput"

interface StepFiveProps {
    data: NewEmployee
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StepFive: React.FC<StepFiveProps> = ({ data, handleChange }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Informações Profissionais
            </p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "3vw" }}>
                    <TextField
                        label={"Salário"}
                        name="employee.professional.salary"
                        value={data.employee.professional?.salary}
                        sx={textField}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: MaskedInputNando,
                            inputProps: {
                                mask: useCurrencyMask({ decimalLimit: 6 }),
                                inputMode: "numeric",
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label={"Data de admissão"}
                        value={data.employee?.professional?.admission}
                        name="employee.professional.admission"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: {
                                mask: "00/00/0000",
                                inputMode: "numeric",
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº da carteira de trabalho"}
                        value={data.employee?.work_card}
                        name="employee.work_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "0000000000000", inputMode: "numeric" },
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
