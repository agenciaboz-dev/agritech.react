import { Box, TextField, Button, MenuItem, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInput from "../MaskedInput"
import MaskedInputNando from "../MaskedNando"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepFourProps {
    data: NewEmployee
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StepFour: React.FC<StepFourProps> = ({ data, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: isMobile ? "4vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "4vw" : "1vw" }}>
                {" "}
                <p style={{ fontSize: isMobile ? "4.5vw" : "1.5rem", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                    Dados Bancários
                </p>
                <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                    <TextField label={"Banco"} name="employee.bank.name" value={data.employee?.bank?.name} sx={textField} onChange={handleChange} />

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
                            sx: {
                                ...textField,
                                height: isMobile ? "10.5vw" : "fit-content",
                            },
                        }}
                        SelectProps={{
                            MenuProps: { MenuListProps: { sx: { maxHeight: isMobile ? "80vw" : "fit-content", overflowY: "auto" } } },
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
                            label={"Nº da Conta"}
                            name="employee.bank.account"
                            value={data.employee?.bank?.account}
                            sx={{ ...textField, width: "100%" }}
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
                            sx={{ ...textField, width: "100%" }}
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
