import {
    Box,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    FormGroup,
    styled,
    Switch,
    ThemeProvider,
    createTheme,
    useMediaQuery,
} from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { useBankAccount } from "../../hooks/useBankAccount"
import MaskedInputNando from "../MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import MaskedInput from "../MaskedInput"
import { useIo } from "../../hooks/useIo"
import { MobileDatePicker, ptBR } from "@mui/x-date-pickers"
import { colors } from "../../style/colors"
import { Dayjs } from "dayjs"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepFiveProps {
    data: NewEmployee
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    adminStatus: boolean
    setAdminStatus: (values: boolean) => void
    managerStatus: boolean
    setManagerStatus: (values: boolean) => void
    pickDate?: Dayjs | null
    setPickDate?: React.Dispatch<React.SetStateAction<Dayjs | null>>
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

const newTheme = (theme: any) =>
    createTheme({
        ...theme,
        components: {
            MuiPickersToolbar: {
                styleOverrides: {
                    root: {
                        color: "#fff",
                        // borderRadius: 5,
                        borderWidth: 0,
                        backgroundColor: colors.primary,
                    },
                },
            },
            MuiPickersMonth: {
                styleOverrides: {
                    monthButton: {
                        borderRadius: 20,
                        borderWidth: 0,
                        border: "0px solid",
                    },
                },
            },
            MuiPickersDay: {
                styleOverrides: {
                    root: {
                        color: colors.primary,
                        borderRadius: 20,
                        borderWidth: 0,
                    },
                },
            },
        },
    })

export const StepFive: React.FC<StepFiveProps> = ({
    data,
    handleChange,
    adminStatus,
    setAdminStatus,
    managerStatus,
    setManagerStatus,
    pickDate,
    setPickDate,
}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
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
        <Box sx={{ width: "100%", height: "100%", gap: isMobile ? "4vw" : "1vw" }}>
            <p
                style={{
                    fontSize: isMobile ? "4.5vw" : "1.5rem",
                    fontWeight: "800",
                    fontFamily: "MalgunGothic2",
                    textAlign: "left",
                }}
            >
                Informações Profissionais
            </p>
            <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
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
            <p
                style={{
                    fontSize: isMobile ? "4.5vw" : "1.5rem",
                    fontWeight: "800",
                    fontFamily: "MalgunGothic2",
                    textAlign: "left",
                }}
            >
                Permissões
            </p>
            <Box sx={{ flexDirection: "column", gap:"2vw",justifyContent: "space-between" }}>
                <FormGroup sx={{ width: "90%" }}>
                    <FormControlLabel
                        checked={adminStatus}
                        control={<Android12Switch />}
                        onChange={handleChangeAdmin}
                        label={
                            <Box sx={{ width: "100%" }}>
                                <p style={{ fontSize: isMobile ? "4vw" : "1.2rem", width: "100%" }}>Administrador</p>
                                <p
                                    style={{
                                        fontSize: isMobile ? "3vw" : "1rem",
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
                                <p style={{ fontSize: isMobile ? "4vw" : "1.2rem", width: "100%" }}>Gerente</p>
                                <p
                                    style={{
                                        fontSize: isMobile ? "3vw" : "1rem",
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
