import React, { ChangeEventHandler } from "react"
import { Box, TextField } from "@mui/material"
import { textField } from "../../../style/input"
import MaskedInput from "../../../components/MaskedInput"

interface ContactProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Contact: React.FC<ContactProps> = ({ values, handleChange }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"Nome de Usuário"}
                    name={"username"}
                    sx={textField}
                    value={values.username}
                    onChange={handleChange}
                />
                <TextField
                    label={"Senha"}
                    name={"password"}
                    sx={textField}
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                />
            </Box>
            <TextField
                label={"E-mail"}
                name={"email"}
                sx={textField}
                value={values.email}
                onChange={handleChange}
                type="email"
            />
            <TextField
                label={"Telefone"}
                name={"phone"}
                sx={textField}
                value={values.phone}
                onChange={handleChange}
                InputProps={{
                    inputComponent: MaskedInput,
                    inputProps: { mask: "(00) 0 0000-0000" },
                }}
            />
        </Box>
    )
}
