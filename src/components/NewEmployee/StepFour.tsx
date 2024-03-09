import { Box, TextField, Button, MenuItem } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInput from "../MaskedInput"
import MaskedInputNando from "../MaskedNando"

interface StepFourProps {
    data: NewEmployee
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StepFour: React.FC<StepFourProps> = ({ data, handleChange }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <Box sx={{ gap: "4vw" }}>
                {" "}
                <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                    Dados Bancários
                </p>
                <Box sx={{ gap: "2vw" }}>
                    <TextField
                        label={"Banco"}
                        name="employee.bank.name"
                        value={data.employee?.bank?.name}
                        sx={textField}
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
                        value={data.employee?.bank?.type}
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

                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <TextField
                            label={"Nº da Conta"}
                            name="employee.bank.account"
                            value={data.employee?.bank?.account}
                            sx={textField}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "00000000000000000000", inputMode: "numeric" },
                            }}
                            onChange={handleChange}
                        />
                        <TextField
                            label={"Agência"}
                            name="employee.bank.agency"
                            value={data.employee?.bank?.agency}
                            sx={textField}
                            onChange={handleChange}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "00000000000000000000", inputMode: "numeric" },
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
