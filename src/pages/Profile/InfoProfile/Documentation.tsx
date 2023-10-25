import { Box } from "@mui/material"
import React, { ChangeEventHandler } from "react"

interface DocumentationProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Documentation: React.FC<DocumentationProps> = ({ values, handleChange }) => {
    return <Box sx={{ flexDirection: "column", gap: "2vw" }}>{values.birth}</Box>
}
