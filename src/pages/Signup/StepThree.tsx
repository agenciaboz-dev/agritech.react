import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import MaskedInput from "../../components/MaskedInput"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepThreeProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepThree: React.FC<StepThreeProps> = ({ data, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: isMobile ? "4vw" : "1vw", padding: "1vw 0" }}>
            <p
                style={{
                    fontSize: isMobile ? "4.5vw" : "1.2rem",
                    fontWeight: "800",
                    fontFamily: "MalgunGothic2",
                    textAlign: "left",
                }}
            >
                Documentação
            </p>
            <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
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
                {/* <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3.5vw" : "1rem", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Certificado de reservista
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: isMobile ? "17%" : "fit-content",
                            fontSize: isMobile ? "3vw" : "1rem",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                    <p style={{ fontSize: isMobile ? "3.5vw" : "1rem", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Comprovante de Residência
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: isMobile ? "17%" : "fit-content",
                            fontSize: isMobile ? "3vw" : "1rem",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                </Box> */}
            </Box>
        </Box>
    )
}
