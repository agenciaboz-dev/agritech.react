import { Box, TextField, Button, MenuItem } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInput from "../../components/MaskedInput"

interface StepThreeProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StepThree: React.FC<StepThreeProps> = ({ data, handleChange }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Documentação
            </p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "2vw" }}>
                    <TextField
                        variant="outlined"
                        label={"Nacionalidade"}
                        value={data.employee?.nationality}
                        name="employee.nationality"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº do título de eleitor"}
                        value={data.employee?.voter_card}
                        name="employee.voter_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "0000000000000", inputMode: "numeric" },
                        }}
                        required
                    />
                   
                </Box>
                <Box sx={{ gap: "2vw" }}>
                    <p style={{ fontSize: "3.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Certificado de reservista
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: "17%",
                            fontSize: "3vw",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                    <p style={{ fontSize: "3.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Comprovante de Residência
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: "17%",
                            fontSize: "3vw",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
