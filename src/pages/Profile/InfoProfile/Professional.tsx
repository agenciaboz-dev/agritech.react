import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"

interface ProfessionalProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    userLog: boolean
}

export const Professional: React.FC<ProfessionalProps> = ({ userLog, values, handleChange }) => {
    return (
        values.employee?.professional !== null && (
            <Box sx={{ flexDirection: "column", gap: "3vw" }}>
                <TextField
                    label={"Cargo"}
                    name={"office"}
                    sx={textField}
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
                />

                <TextField
                    label={"Salário"}
                    name={"employee.professional.salary"}
                    sx={{ ...textField }}
                    value={values.employee?.professional?.salary || 0}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInputNando,
                        inputProps: {
                            mask: useCurrencyMask({ decimalLimit: 6 }),
                            inputMode: "numeric",
                        },
                    }}
                />
                <TextField
                    label={"Admissão"}
                    name={"employee.bank.admission"}
                    sx={textField}
                    value={values.employee?.professional?.admission}
                    InputProps={{ readOnly: true }}
                    onChange={handleChange}
                />
            </Box>
        )
    )
}
