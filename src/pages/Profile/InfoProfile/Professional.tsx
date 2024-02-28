import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"

interface ProfessionalProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Professional: React.FC<ProfessionalProps> = ({ values, handleChange }) => {
    return (
        values.employee?.professional !== null && (
            <Box sx={{ flexDirection: "column", gap: "3vw" }}>
                <TextField label={"Cargo"} name={"office"} sx={textField} value={values.office} onChange={handleChange} />

                <TextField
                    label={"Salário"}
                    name={"employee.bank.agency"}
                    sx={{ ...textField }}
                    value={
                        values.office === "agronomist"
                            ? "Agronômo"
                            : values.office === "technician"
                            ? "Técnico"
                            : values.office === "copilot"
                            ? "Copiloto de drone"
                            : values.office === "seller"
                            ? "Vendedor"
                            : values.office === "pilot" && "Piloto de drone"
                    }
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label={"Admissão"}
                    name={"employee.bank.account"}
                    sx={textField}
                    value={values.employee?.professional?.admission}
                    InputProps={{ readOnly: true }}
                />
            </Box>
        )
    )
}
