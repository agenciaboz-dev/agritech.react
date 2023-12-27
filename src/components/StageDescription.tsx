import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../style/input"
import { colors } from "../style/colors"
import { Call } from "../definitions/call"

interface StageDescriptionProps {
    title: string
    values: Call
    change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const StageDescription: React.FC<StageDescriptionProps> = ({ title, values, change }) => {
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
                />
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label="Início"
                        name="stages.start"
                        type="time"
                        value={values.stages[1].start}
                        sx={{ ...textField }}
                        onChange={change}
                    />
                    <TextField
                        label="Finalização"
                        name="stages.finish"
                        type="time"
                        value={values.stages[1].finish}
                        sx={{ ...textField }}
                        onChange={change}
                    />
                    <TextField
                        label="Duração"
                        name="stages.duration"
                        type="time"
                        value={values.stages[1].duration}
                        sx={{ ...textField }}
                        onChange={change}
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
                onChange={change}
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
