import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"

interface TeamProps {
    data: NewTillage
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Team: React.FC<TeamProps> = ({ data, handleChange }) => {
    return (
        <Box sx={{ width: "100%", flexDirection: "column", gap: "2vw", }}>
            <TextField
                label={"Prorietário"}
                name="owner"
                value={data.owner}
                sx={textField}
                onChange={handleChange}
                required
            />
            <TextField label={"CEO"} name="ceo" value={data.ceo} sx={textField} onChange={handleChange}  />
            <TextField
                label={"Gerente"}
                name="manager"
                value={data.manager}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
                
            />
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
            <TextField
                label={"Outros"}
                name="others"
                value={data.others}
                sx={{ ...textField, width: "100%" }}
                onChange={handleChange}
                
            />
        </Box>
    )
}
