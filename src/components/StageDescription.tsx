import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../style/input"
import { colors } from "../style/colors"
import { Call, Stage } from "../definitions/call"
import { useUser } from "../hooks/useUser"
import { dateFrontend } from "../hooks/useFormattedDate"

interface StageDescriptionProps {
    title: string
    values: Stage
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
                    type="text"
                    value={dateFrontend(values.date)}
                    sx={{ ...textField }}
                    inputProps={{ "aria-readonly": true }}
                    disabled={!user?.producer ? false : true}
                />
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label="Início"
                        name="start"
                        type="time"
                        value={values.start}
                        sx={{ ...textField }}
                        onChange={!user?.producer ? change : () => {}}
                        disabled={!user?.producer ? false : true}
                        InputLabelProps={{
                            shrink: true, // Encolher o rótulo quando houver valor
                        }}
                    />
                    <TextField
                        label="Final"
                        name="finish"
                        type="time"
                        value={values.finish}
                        sx={{ ...textField }}
                        onChange={!user?.producer ? change : () => {}}
                        disabled={!user?.producer ? false : true}
                        InputLabelProps={{
                            shrink: true, // Encolher o rótulo quando houver valor
                        }}
                    />
                    <TextField
                        label="Duração"
                        name="duration"
                        type="time"
                        value={values.duration}
                        sx={{ ...textField }}
                        // onChange={!user?.producer ? change : () => {}}
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
