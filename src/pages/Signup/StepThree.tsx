import { Box, TextField, Button, MenuItem } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"

interface StepThreeProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepThree: React.FC<StepThreeProps> = ({ data, handleChange, setCurrentStep }) => {
    const bankAccount = useBankAccount()
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Documentação
            </p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "3vw" }}>
                    <TextField
                        variant="outlined"
                        label={"Nacionalidade"}
                        value={data.employee?.nationality}
                        name="employee.nationality"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº do título de eleitor"}
                        value={data.employee?.voter_card}
                        name="employee.voter_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº da carteira de trabalho"}
                        value={data.employee?.work_card}
                        name="employee.work_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box sx={{ gap: "2vw" }}>
                    <p style={{ fontSize: "3.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Certificado de reservista
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: "17%",
                            fontSize: "3vw",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                    <p style={{ fontSize: "3.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        {" "}
                        Comprovante de Residência
                    </p>
                    <Button
                        variant="contained"
                        sx={{
                            width: "50%",
                            height: "17%",
                            fontSize: "3vw",
                            color: colors.text.white,
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                    >
                        Enviar documento
                    </Button>
                </Box>
                {/* <Box sx={{ gap: "4vw" }}>
                    {" "}
                    <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                        Dados Bancários
                    </p>
                    <Box sx={{ gap: "3vw" }}>
                        <TextField
                            label={"Banco"}
                            name="name"
                            value={data.employee?.bank_data.name}
                            sx={textField}
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
                            value={data.employee?.bank_data.type}
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
                                label={"Conta"}
                                name="account"
                                value={data.employee?.bank_data.account}
                                sx={textField}
                                onChange={handleChange}
                            />
                            <TextField
                                label={"Agência"}
                                name="agency"
                                value={data.employee?.bank_data.agency}
                                sx={textField}
                                onChange={handleChange}
                            />
                        </Box>
                    </Box>
                </Box> */}
            </Box>
        </Box>
    )
}
