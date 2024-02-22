import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { Box, Button, TextField } from "@mui/material"
import { colors } from "../../../style/colors"
import { NewLavoura } from "../../../definitions/newTillage"

interface AdditionalProps {
    data: NewLavoura
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Additional: React.FC<AdditionalProps> = ({ data, handleChange }) => {
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "3vw" }}>
            <TextField
                label={"Observações Adicionais"}
                name="comments"
                value={data.comments}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
            />
        </Box>
    )
}
