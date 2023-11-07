import React, { ChangeEventHandler } from "react"
import { Box, TextField, MenuItem } from "@mui/material"
import { textField } from "../../../style/input"
import { useBankAccount } from "../../../hooks/useBankAccount"

interface BankProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Bank: React.FC<BankProps> = ({ values, handleChange }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <TextField
                label={"Banco"}
                name={"nameBank"}
                sx={textField}
                value={values.employee?.bank_data?.name}
                onChange={handleChange}
            />
            <TextField
                select
                onChange={handleChange}
                label="Tipo de conta"
                name="type"
                sx={{
                    ...textField,
                    width: "100%",
                }}
                variant="outlined"
                value={values.employee?.bank_data?.type}
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
                    name={"agency"}
                    sx={textField}
                    value={values.employee?.bank_data?.agency}
                    onChange={handleChange}
                />
                <TextField label={"Dígito"} name={"number"} sx={textField} onChange={handleChange} />
            </Box>
            <TextField
                label={"Nº da conta"}
                name={"account"}
                sx={textField}
                value={values.employee?.bank_data?.account}
                onChange={handleChange}
            />
        </Box>
    )
}
