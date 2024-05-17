import React, { ChangeEventHandler } from "react"
import { Box, TextField, useMediaQuery } from "@mui/material"
import MaskedInput from "../../../components/MaskedInput"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface ContactProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Contact: React.FC<ContactProps> = ({ values, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    console.log({ Chegou: values })
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
            <Box sx={{ flexDirection: "row", gap: isMobile ? "3vw" : "1vw" }}>
                <TextField
                    label={"Nome de Usuário"}
                    name={"username"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.username}
                    onChange={handleChange}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label={"Senha"}
                    name={"password"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.password}
                    onChange={handleChange}
                    type="password"
                    InputProps={{ readOnly: true }}
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
