import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { textField } from "../../../style/input"
import { colors } from "../../../style/colors"
import { Call } from "../../../definitions/call"
// import { NumericFormat } from "react-number-format"
interface OperationProps {
    user: User
    values: NewReport
    call: Call | undefined | null
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Operation: React.FC<OperationProps> = ({ values, change, user, call }) => {
    useEffect(() => {
        console.log(call?.talhao)
    }, [call?.talhao?.tillage?.area])
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "3.5vw", fontWeight: "bold" }}>Dados de Operação</p>
                <TextField
                    label="Tipo de serviço"
                    name="operation.service"
                    value={values.operation?.service}
                    sx={{ ...textField }}
                    onChange={change}
                    required
                />
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
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
                <TextField
                    label="Modelo"
                    name="operation.model"
                    value={values.operation?.model}
                    sx={{ ...textField }}
                    onChange={change}
                    required
                />
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
