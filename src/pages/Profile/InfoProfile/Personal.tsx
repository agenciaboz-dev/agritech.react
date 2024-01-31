import { Box, Button, MenuItem, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { useGender } from "../../../hooks/useGender"
import { useRelationship } from "../../../hooks/useRelationship"
import MaskedInput from "../../../components/MaskedInput"
import { useUser } from "../../../hooks/useUser"

interface PersonalProps {
    values: User
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Personal: React.FC<PersonalProps> = ({ values, handleChange }) => {
    const gender = useGender()
    const typeRelationship = useRelationship()

    const { user } = useUser()

    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <TextField label={"Nome Completo"} name={"name"} sx={textField} value={values.name} onChange={handleChange} />

            <TextField
                label={"Data de Nascimento"}
                name={"birth"}
                sx={textField}
                value={values.birth}
                onChange={handleChange}
            />
            {values.employee?.id === undefined && (
                <TextField
                    label={"CPF"}
                    name={"cpf"}
                    sx={textField}
                    value={values.cpf}
                    onChange={handleChange}
                    InputProps={ {
                          // @ts-ignore
                        inputComponent: MaskedInput,
                        inputProps: { mask: "000.000.000-00" },
                        readOnly: true,
                    }}
                />
            )}
            {values.employee?.id === undefined && (
                <TextField
                    label={"CNPJ"}
                    name={"producer.cnpj"}
                    sx={textField}
                    value={values.producer?.cnpj}
                    onChange={handleChange}
                    InputProps={ {
                          // @ts-ignore
                        inputComponent: MaskedInput,
                        inputProps: { mask: "000.000.000/0000-0" },
                        readOnly: true,
                    }}
                />
            )}
            {values.employee?.id !== undefined && (
                <>
                    <Box sx={{ flexDirection: "row", width: "100%", gap: "3vw" }}>
                        <TextField
                            select
                            onChange={handleChange}
                            label="Gênero"
                            name="employee.gender"
                            sx={{
                                ...textField,
                                width: "50%",
                            }}
                            variant="outlined"
                            value={values.employee?.gender}
                            InputProps={{
                                sx: { ...textField, height: "12vw" },
                            }}
                            SelectProps={{
                                MenuProps: {
                                    MenuListProps: { sx: { width: "100%", maxHeight: "80vw", overflowY: "auto" } },
                                },
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
                            select
                            onChange={handleChange}
                            label="Estado Civil"
                            name="employee.relationship"
                            sx={{
                                ...textField,
                                width: "50%",
                            }}
                            required
                            variant="outlined"
                            value={values.employee?.relationship}
                            InputProps={{
                                sx: { ...textField, height: "12vw" },
                            }}
                            SelectProps={{
                                MenuProps: {
                                    MenuListProps: { sx: { width: "100%", maxHeight: "80vw", overflowY: "auto" } },
                                },
                            }}
                        >
                            <MenuItem
                                value={0}
                                sx={{
                                    display: "none",
                                }}
                            ></MenuItem>
                            {typeRelationship.map((relationship) => (
                                <MenuItem
                                    key={relationship.value}
                                    value={relationship.value}
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    {relationship.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    <TextField
                        label={"Nacionalidade"}
                        name={"employee.nationality"}
                        sx={textField}
                        value={values.employee?.nationality}
                        onChange={handleChange}
                    />
                </>
            )}
        </Box>
    )
}
