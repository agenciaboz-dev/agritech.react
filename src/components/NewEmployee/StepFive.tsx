import { Box, TextField, Button, MenuItem, FormControlLabel, FormGroup, styled, Switch } from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { textField } from "../../style/input"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInputNando from "../MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import MaskedInput from "../MaskedInput"
import { useIo } from "../../hooks/useIo"

interface StepFiveProps {
    data: NewEmployee
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    adminStatus: boolean
    setAdminStatus: (values: boolean) => void
    managerStatus: boolean
    setManagerStatus: (values: boolean) => void
}
const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&:before": {
            left: 12,
        },
        "&:after": {
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}))

export const StepFive: React.FC<StepFiveProps> = ({
    data,
    handleChange,
    adminStatus,
    setAdminStatus,
    managerStatus,
    setManagerStatus,
}) => {
    const bankAccount = useBankAccount()


    const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        console.log("handleChangeAdmin", checked)
        setAdminStatus(checked)
    }

    const handleChangeManager = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        console.log("handleChangeManager", checked)
        setManagerStatus(checked)
    }
    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Informações Profissionais
            </p>
            <Box sx={{ gap: "2vw" }}>
                <Box sx={{ gap: "3vw" }}>
                    <TextField
                        label={"Salário"}
                        name="employee.professional.salary"
                        value={data.employee.professional?.salary}
                        sx={textField}
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
                        variant="outlined"
                        label={"Data de admissão"}
                        value={data.employee?.professional?.admission}
                        name="employee.professional.admission"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: {
                                mask: "00/00/0000",
                                inputMode: "numeric",
                            },
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label={"Nº da carteira de trabalho"}
                        value={data.employee?.work_card}
                        name="employee.work_card"
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "0000000000000", inputMode: "numeric" },
                        }}
                    />
                </Box>
            </Box>
            <p style={{ fontSize: "4.5vw", fontWeight: "800", fontFamily: "MalgunGothic2", textAlign: "left" }}>
                Permissões
            </p>
            <Box sx={{ flexDirection: "column", justifyContent: "space-between" }}>
                <FormGroup sx={{ width: "90%" }}>
                    <FormControlLabel
                        checked={adminStatus}
                        control={<Android12Switch />}
                        onChange={handleChangeAdmin}
                        label={
                            <Box sx={{ width: "100%" }}>
                                <p style={{ fontSize: "4vw", width: "100%" }}>Administrador</p>
                                <p
                                    style={{
                                        fontSize: "3vw",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        // overflow: "hidden",
                                        width: "100%",
                                    }}
                                >
                                    Acesso ilimitado ao sistema
                                </p>
                            </Box>
                        }
                    />
                </FormGroup>
                <FormGroup sx={{ width: "90%" }}>
                    <FormControlLabel
                        checked={managerStatus}
                        control={<Android12Switch />}
                        onChange={handleChangeManager}
                        label={
                            <Box sx={{ width: "100%" }}>
                                <p style={{ fontSize: "4vw", width: "100%" }}>Gerente</p>
                                <p
                                    style={{
                                        fontSize: "3vw",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        // overflow: "hidden",
                                        width: "100%",
                                    }}
                                >
                                    Acesso limitado ao sistema
                                </p>
                            </Box>
                        }
                    />
                </FormGroup>
            </Box>
        </Box>
    )
}
