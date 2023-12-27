import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../style/input"
import { colors } from "../style/colors"
import { Call } from "../definitions/call"
import { useUser } from "../hooks/useUser"

interface StageDescriptionProps {
    title: string
    values: Call
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StageDescription: React.FC<StageDescriptionProps> = ({ title, values, change }) => {
    const { user } = useUser()
    return (
        <Box sx={{ gap: "3vw" }}>
            <Box sx={{ gap: "3vw" }}>
                <p style={{ fontSize: "3.5vw", fontWeight: "bold" }}>{title}</p>
                <TextField
                    label="Data"
                    name="stages.date"
                    type="date"
                    value={values.stages[1].date}
                    sx={{ ...textField }}
                    inputProps={{ "aria-readonly": true }}
                    disabled={!user?.producer ? false : true}
                />
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label="Início"
                        name="stages.start"
                        type="time"
                        value={values.stages[1].start}
                        sx={{ ...textField }}
                        onChange={!user?.producer ? change : () => {}}
                        disabled={!user?.producer ? false : true}
                    />
                    <TextField
                        label="Finalização"
                        name="stages.finish"
                        type="time"
                        value={values.stages[1].finish}
                        sx={{ ...textField }}
                        onChange={!user?.producer ? change : () => {}}
                        disabled={!user?.producer ? false : true}
                    />
                    <TextField
                        label="Duração"
                        name="stages.duration"
                        type="time"
                        value={values.stages[1].duration}
                        sx={{ ...textField }}
                        onChange={!user?.producer ? change : () => {}}
                        disabled={!user?.producer ? false : true}
                    />
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
