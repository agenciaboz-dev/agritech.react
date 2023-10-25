import { Box, Button, MenuItem, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { useGender } from "../../../hooks/useGender"

interface PersonalProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setTab: React.Dispatch<React.SetStateAction<string>>
}

export const Personal: React.FC<PersonalProps> = ({ values, handleChange, setTab }) => {
    const gender = useGender()

    return (
        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
            <TextField label={"Nome Completo"} name={"name"} sx={textField} value={values.name} onChange={handleChange} />
            <TextField
                label={"Data de Nascimento"}
                name={"birth"}
                sx={textField}
                value={values.birth}
                onChange={handleChange}
            />
            <TextField
                select
                onChange={handleChange}
                label="Gênero"
                name="gender"
                sx={{
                    ...textField,
                    width: "100%",
                }}
                variant="outlined"
                value={values.gender}
                InputProps={{
                    style: {},
                }}
                SelectProps={{
                    MenuProps: { MenuListProps: { sx: { maxHeight: "80vw", overflowY: "auto" } } },
                }}
            >
                <MenuItem
                    value={0}
                    sx={{
                        display: "none",
                    }}
                ></MenuItem>
                {gender.map((gender) => (
                    <MenuItem
                        key={gender.value}
                        value={gender.value}
                        sx={{
                            width: "100%",
                        }}
                    >
                        {gender.value}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                label={"Estado Civil"}
                name={"relationship"}
                sx={textField}
                value={values.relationship}
                onChange={handleChange}
            />
            <TextField
                label={"Nacionalidade"}
                name={"nacionality"}
                sx={textField}
                value={values?.nationality}
                onChange={handleChange}
            />
        </Box>
    )
}
