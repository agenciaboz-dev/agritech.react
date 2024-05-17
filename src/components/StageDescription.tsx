import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { colors } from "../style/colors"
import { Call } from "../definitions/call"
import { useUser } from "../hooks/useUser"
import { dateFrontend } from "../hooks/useFormattedDate"
import { TimeField, ptBR } from "@mui/x-date-pickers"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { CiClock2 } from "react-icons/ci"
import { Stage } from "../definitions/report"
import { useResponsiveStyles } from "../hooks/useResponsiveStyles"

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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    const { user } = useUser()

    useEffect(() => {
        console.log(data.initPick)
    }, [])
    return (
        <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem", fontWeight: "bold" }}>{title}</p>
                <TextField
                    label="Data"
                    value={new Date().toLocaleDateString("pt-br")}
                    sx={{ ...textField }}
                    InputProps={{ readOnly: true }}
                    disabled={!user?.producer ? false : true}
                />
                <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                    <TimeField
                        label="Início"
                        name="start"
                        sx={{ ...textField, flex: 1 }}
                        value={data.initPick}
                        onChange={(newValue) => data.setInitPick(newValue)}
                        format="HH:mm"
                        ampm={false}
                        InputProps={{
                            inputMode: "numeric",
                            endAdornment: (
                                <CiClock2
                                    style={{
                                        color: "black",
                                        width: isMobile ? "6vw" : "2vw",
                                        height: isMobile ? "6vw" : "2vw",
                                    }}
                                />
                            ),
                        }}
                    />
                    <TimeField
                        label="Final"
                        name="finish"
                        sx={{ ...textField, flex: 1 }}
                        value={data.finishPick}
                        onChange={(newValue) => data.setFinishPick(newValue)}
                        disabled={!user?.producer ? false : true}
                        format="HH:mm"
                        ampm={false}
                        timezone="system"
                        InputProps={{
                            inputMode: "numeric",
                            endAdornment: (
                                <CiClock2
                                    style={{
                                        color: "black",
                                        width: isMobile ? "6vw" : "2vw",
                                        height: isMobile ? "6vw" : "2vw",
                                    }}
                                />
                            ),
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
