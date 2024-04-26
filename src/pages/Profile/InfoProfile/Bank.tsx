import React, { ChangeEventHandler } from "react"
import { Box, TextField, MenuItem, useMediaQuery } from "@mui/material"
import { useBankAccount } from "../../../hooks/useBankAccount"
import MaskedInput from "../../../components/MaskedInput"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface BankProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Bank: React.FC<BankProps> = ({ values, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const bankAccount = useBankAccount()
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
            <TextField label={"Banco"} name={"employee.bank.name"} sx={textField} value={values.employee?.bank?.name} onChange={handleChange} />
            <TextField
                select
                onChange={handleChange}
                label="Tipo de conta"
                name="employee.bank.type"
                sx={{
                    ...textField,
                    width: "100%",
                }}
                variant="outlined"
                value={values.employee?.bank?.type}
                InputProps={{
                    style: {},
                }}
                SelectProps={{
                    MenuProps: { MenuListProps: { sx: { maxHeight: "80vw", overflowY: "auto" } } },
                }}
            >
                <MenuItem
                    value={0}
                    sx={{
                        display: "none",
                    }}
                ></MenuItem>
                {bankAccount.map((account) => (
                    <MenuItem
                        key={account.value}
                        value={account.id}
                        sx={{
                            width: "100%",
                        }}
                    >
                        {account.value}
                    </MenuItem>
                ))}
            </TextField>
            <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                <TextField
                    label={"Agência"}
                    name={"employee.bank.agency"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.employee?.bank?.agency}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "00000000000000000000", inputMode: "numeric" },
                    }}
                />
                <TextField
                    label={"Nº da conta"}
                    name={"employee.bank.account"}
                    sx={{ ...textField, width: 0.5 }}
                    value={values.employee?.bank?.account}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "00000000000000000000", inputMode: "numeric" },
                    }}
                />
            </Box>
        </Box>
    )
}
