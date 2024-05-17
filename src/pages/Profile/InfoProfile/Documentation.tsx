import { Box, TextField, Button, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import MaskedInput from "../../../components/MaskedInput"
import { colors } from "../../../style/colors"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface DocumentationProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Documentation: React.FC<DocumentationProps> = ({ values, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "3vw" : "1vw",
                width: "100%",
                padding: isMobile ? "2vw 0" : "1vw 0",
                overflowY: "auto",
                // paddingBottom: "400vh",
                paddingBottom: "40vh",
            }}
        >
            <Box sx={{ flexDirection: "row", gap: isMobile ? "2.5vw" : "1vw", width: "100%" }}>
                <TextField
                    label={"CPF"}
                    name={"cpf"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.cpf}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "000.000.000-00" },
                        readOnly: true,
                    }}
                />
                <TextField
                    label={"RG"}
                    name={"employee.rg"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.employee?.rg}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                />
            </Box>
            {!values.producer && (
                <>
                    <TextField
                        label={"Título de eleitor"}
                        name={"voter_card"}
                        sx={textField}
                        value={values.employee?.voter_card}
                        onChange={handleChange}
                        placeholder={"00000000/00"}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "00000000/00" },
                        }}
                    />

                    <TextField
                        label={"Carteira de trabalho"}
                        name={"employee.work_card"}
                        sx={textField}
                        value={values.employee?.work_card}
                        onChange={handleChange}
                        placeholder={"00.000.000/0000-00"}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "00.000.000/0000-00" },
                        }}
                    />
                    {/* <Box sx={{ gap: "2vw" }}>
                        <p style={{ fontSize: "3.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                            {" "}
                            Certificado de reservista
                        </p>
                        <Button
                            variant="contained"
                            sx={{
                                width: "50%",
                                height: "17%",
                                fontSize: "2.5vw",
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
                                fontSize: "2.5vw",
                                color: colors.text.white,
                                backgroundColor: colors.button,
                                borderRadius: "5vw",
                                textTransform: "none",
                            }}
                        >
                            Enviar documento
                        </Button>
                    </Box> */}
                </>
            )}
        </Box>
    )
}
