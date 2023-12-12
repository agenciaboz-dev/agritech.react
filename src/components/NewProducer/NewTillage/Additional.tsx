import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { Box, Button, TextField } from "@mui/material"
import { colors } from "../../../style/colors"

interface AdditionalProps {
    data: NewTillage
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Additional: React.FC<AdditionalProps> = ({ data, handleChange }) => {
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "3vw" }}>
            <TextField
                label={"Observações Adicionais"}
                name="comments"
                value={data.commments}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
            />

            <Box sx={{ gap: "3vw", flexDirection: "column", width: "100%" }}>
                <p style={{ fontSize: "4vw" }}>Adicionar novos campos</p>
                <TextField
                    label={"Observações Adicionais"}
                    name="comments"
                    value={data.commments}
                    sx={{ ...textField, width: "100%" }}
                    onChange={handleChange}
                />
                <Button variant="contained" sx={{fontSize: "3vw",
                                color: colors.text.white,
                                width: "30%",
                                backgroundColor: colors.button,
                                borderRadius: "5vw",
                                textTransform: "none",}}> Novo campo</Button>
            </Box>
        </Box>
    )
}
