import React, { ChangeEventHandler } from "react"
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { colors } from "../../../style/colors"
import { NewLavoura } from "../../../definitions/newTillage"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface AdditionalProps {
    data: NewLavoura
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Additional: React.FC<AdditionalProps> = ({ data, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: isMobile ? "3vw" : "1vw", pt: isMobile ? "4vw" : "2vw" }}>
            <TextField
                label={"Observações Adicionais"}
                name="comments"
                value={data.comments}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
            />
        </Box>
    )
}
