import React, { ChangeEventHandler } from "react"
import { Box, TextField, MenuItem } from "@mui/material"
import { textField } from "../../../style/input"
import { useBankAccount } from "../../../hooks/useBankAccount"
import MaskedInput from "../../../components/MaskedInput"

interface BankProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Bank: React.FC<BankProps> = ({ values, handleChange }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <TextField
                label={"Banco"}
                name={"employee.bank.name"}
                sx={textField}
                value={values.employee?.bank?.name}
                onChange={handleChange}
            />
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
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"Agência"}
                    name={"employee.bank.agency"}
                    sx={textField}
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
                    sx={textField}
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
