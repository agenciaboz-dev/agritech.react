import { Box, TextField, ThemeProvider, createTheme } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import { MobileDatePicker, ptBR } from "@mui/x-date-pickers"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { Dayjs } from "dayjs"
import { colors } from "../../../style/colors"

interface ProfessionalProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    userLog: boolean
    pickDate?: Dayjs | null
    setPickDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>
}

export const Professional: React.FC<ProfessionalProps> = ({ userLog, values, handleChange, pickDate, setPickDate }) => {
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
                    value={values.employee?.professional?.salary}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInputNando,
                        inputProps: {
                            mask: useCurrencyMask({ decimalLimit: 6 }),
                            inputMode: "numeric",
                        },
                    }}
                />

                <DemoItem label="Data de Admissão">
                    <MobileDatePicker
                        sx={{ ...textField }}
                        format="DD/MM/YYYY"
                        value={pickDate}
                        onChange={(newDate) => {
                            if (newDate !== null && setPickDate) {
                                setPickDate(newDate)
                            }
                        }}
                        timezone="system"
                    />
                </DemoItem>
            </Box>
        )
    )
}
