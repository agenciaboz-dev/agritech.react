import React, { ChangeEventHandler } from "react"
import { Box, TextField } from "@mui/material"

interface StepTwoProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
}

export const StepTwo: React.FC<StepTwoProps> = ({ data, handleChange, typeUser }) => {
    return (
        <Box>
            <TextField onChange={handleChange} />
        </Box>
    )
}
