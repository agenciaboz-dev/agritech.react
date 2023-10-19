import { Box, TextField, Button } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"

interface StepThreeProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepThree: React.FC<StepThreeProps> = ({ data, handleChange, setCurrentStep }) => {
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>Documentação</p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "3vw" }}>
                    <TextField
                        variant="outlined"
                        label={"Nº do título de eleitor"}
                        value={data.voter_card}
                        name="voter_card"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº da carteira de trabalho"}
                        value={data.work_card}
                        name="work_card"
                        style={{ width: "100%" }}
                        onChange={handleChange}
                    />
                </Box>
                <Box sx={{ gap: "2vw" }}>
                    <p style={{ fontSize: "4vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Certificado de reservista
                    </p>
                    <Button
                        variant="contained"
                        style={{
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
                    <p style={{ fontSize: "4vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Comprovante de Residência
                    </p>
                    <Button
                        variant="contained"
                        style={{
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
