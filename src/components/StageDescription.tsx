import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { textField } from "../style/input"
import { colors } from "../style/colors"
import { Call } from "../definitions/call"
import { useUser } from "../hooks/useUser"
import { dateFrontend } from "../hooks/useFormattedDate"
import { LocalizationProvider, TimeField, ptBR } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CiClock2 } from "react-icons/ci"
import { Stage } from "../definitions/report"

interface StageDescriptionProps {
    title: string
    values: Stage
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    data: {
        initPick: any
        setInitPick: React.Dispatch<React.SetStateAction<null>>
        finishPick: any
        setFinishPick: React.Dispatch<React.SetStateAction<null>>
        durationPick: any
        setDuration: React.Dispatch<React.SetStateAction<null>>
    }
}

export const StageDescription: React.FC<StageDescriptionProps> = ({ title, values, change, data }) => {
    const { user } = useUser()

    useEffect(() => {
        console.log(data.initPick)
    }, [])
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "3.5vw", fontWeight: "bold" }}>{title}</p>
                <TextField
                    label="Data"
                    value={new Date().toLocaleDateString("pt-br")}
                    sx={{ ...textField }}
                    InputProps={{ readOnly: true }}
                    disabled={!user?.producer ? false : true}
                />
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                >
                    <DemoContainer components={["TimeField", "TimeField", "TimeField"]}>
                        <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                            <TimeField
                                label="Início"
                                name="start"
                                sx={{ ...textField }}
                                value={data.initPick}
                                onChange={(newValue) => data.setInitPick(newValue)}
                                format="HH:mm"
                                ampm={false}
                                InputProps={{
                                    inputMode: "numeric",
                                    endAdornment: <CiClock2 style={{ color: "black", width: "6vw", height: "6vw" }} />,
                                }}
                            />
                            <TimeField
                                label="Final"
                                name="finish"
                                sx={{ ...textField }}
                                value={data.finishPick}
                                onChange={(newValue) => data.setFinishPick(newValue)}
                                disabled={!user?.producer ? false : true}
                                format="HH:mm"
                                ampm={false}
                                timezone="system"
                                InputProps={{
                                    inputMode: "numeric",
                                    endAdornment: <CiClock2 style={{ color: "black", width: "6vw", height: "6vw" }} />,
                                }}
                            />
                            {/* <TimeField
                                label="Duração"
                                name="duration"
                                sx={{ ...textField }}
                                value={data.durationPick}
                                // onChange={(newValue) => data.setFinishPick(newValue)}
                                disabled={!user?.producer ? false : true}
                                format="HH:mm"
                                ampm={false}
                                timezone="system"
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: <CiClock2 style={{ color: "black", width: "6vw", height: "6vw" }} />,
                                }}
                            /> */}
                        </Box>
                    </DemoContainer>
                </LocalizationProvider>
            </Box>
            <TextField
                multiline
                label="Observações"
                name="comments"
                value={values.comments}
                minRows={1}
                maxRows={3}
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
