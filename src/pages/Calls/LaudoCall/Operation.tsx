import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Call } from "../../../definitions/call"
import { NewReport } from "../../../definitions/report"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"
// import { NumericFormat } from "react-number-format"
interface OperationComponentProps {
    user: User
    values: NewReport
    call: Call | undefined | null
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const OperationComponent: React.FC<OperationComponentProps> = ({ values, change, user, call }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    useEffect(() => {
        console.log(call?.talhao)
    }, [call?.talhao?.tillage?.area])
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                <p style={{ fontSize: isMobile ? "3.5vw" : "1rem", fontWeight: "bold" }}>Dados de Operação</p>
                <TextField
                    label="Tipo de serviço"
                    name="operation.service"
                    value={values.operation?.service}
                    sx={{ ...textField }}
                    onChange={change}
                    required
                />
                <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                    <TextField
                        label="Cultura"
                        name="operation.culture"
                        value={values.operation?.culture}
                        sx={{ ...textField, width: "80%" }}
                        onChange={change}
                        required
                    />
                    <TextField
                        label="Área Mapeada"
                        name=""
                        value={call?.talhao?.tillage?.area ? call?.talhao?.tillage?.area : ""}
                        sx={{ ...textField }}
                        InputProps={{
                            readOnly: true,
                            endAdornment: "ha",
                        }}
                    />
                </Box>
                <TextField
                    label="Equipamento"
                    name="operation.equipment"
                    value={values.operation?.equipment}
                    sx={{ ...textField }}
                    required
                    onChange={change}
                />
                <TextField label="Modelo" name="operation.model" value={values.operation?.model} sx={{ ...textField }} onChange={change} required />
            </Box>
            <TextField
                label="Piloto/Copiloto"
                name="kit"
                value={
                    call?.kit?.employees
                        ? call.kit?.employees.length <= 1
                            ? `${call?.kit?.employees[0].user?.name}`
                            : `${call?.kit?.employees[0].user?.name}/${call?.kit?.employees[1].user?.name}`
                        : ""
                }
                sx={{
                    ...textField,
                }}
                onChange={!user?.producer ? change : () => {}}
                disabled={!user?.producer ? false : true}
                InputProps={{
                    sx: {
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: colors.secondary,
                            },
                            fieldset: {
                                borderColor: "#232323",
                            },
                        },
                    },
                }}
            />
        </Box>
    )
}
