import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"

interface StepThreeProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
}

export const StepThree: React.FC<StepThreeProps> = ({ data, handleChange, typeUser }) => {
    return (
        <Box>
            <TextField onChange={handleChange} />
        </Box>
    )
}
