import { Box, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { NewLavoura } from "../../../definitions/newTillage"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface TeamProps {
    data: NewLavoura
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    producerName?: string
}

export const Team: React.FC<TeamProps> = ({ data, handleChange, producerName }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    return (
        <Box sx={{ width: "100%", height: "100%", flexDirection: "column", gap: isMobile ? "2vw" : "1vw", pt: isMobile ? "4vw" : "2vw" }}>
            <TextField
                label={"Proprietário"}
                name="owner"
                value={data.owner}
                sx={textField}
                // InputProps={{ readOnly: true }}
                onChange={handleChange}
            />
            <TextField label={"CEO"} name="ceo" value={data.ceo} sx={textField} onChange={handleChange} />
            <TextField label={"Gerente"} name="manager" value={data.manager} sx={{ ...textField, width: "100%" }} onChange={handleChange} />
            <TextField
                label={"Agronômo Responsável"}
                name="agronomist"
                value={data.agronomist}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
            />
            <TextField
                label={"Técnico Responsável"}
                name="technician"
                value={data.technician}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
            />
            <TextField label={"Outros"} name="others" value={data.others} sx={{ ...textField, width: "100%" }} onChange={handleChange} />
        </Box>
    )
}
