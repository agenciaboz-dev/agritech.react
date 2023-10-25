import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"

interface DocumentationProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Documentation: React.FC<DocumentationProps> = ({ values, handleChange }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
            <TextField label={"Nome Completo"} name={"name"} sx={textField} value={values.name} onChange={handleChange} />
            <TextField
                label={"Data de Nascimento"}
                name={"birth"}
                sx={textField}
                value={values.birth}
                onChange={handleChange}
            />

            <TextField
                label={"Estado Civil"}
                name={"relationship"}
                sx={textField}
                value={values.relationship}
                onChange={handleChange}
            />
            <TextField
                label={"Nacionalidade"}
                name={"nacionality"}
                sx={textField}
                value={values?.nationality}
                onChange={handleChange}
            />
        </Box>
    )
}
