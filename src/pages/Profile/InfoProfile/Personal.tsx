import { Box, Button, MenuItem, TextField } from "@mui/material"
import React, { ChangeEventHandler } from "react"
import { textField } from "../../../style/input"
import { useGender } from "../../../hooks/useGender"
import { useRelationship } from "../../../hooks/useRelationship"
import MaskedInput from "../../../components/MaskedInput"
import { useUser } from "../../../hooks/useUser"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCnpjMask } from "burgos-masks"

interface PersonalProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Personal: React.FC<PersonalProps> = ({ values, handleChange }) => {
    const gender = useGender()
    const typeRelationship = useRelationship()

    const { user } = useUser()

    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <TextField
                label={"Data de Nascimento"}
                name={"birth"}
                sx={textField}
                value={values.birth}
                onChange={handleChange}
            />
            {values.employee === undefined && (
                <TextField
                    label={"CPF"}
                    name={"cpf"}
                    sx={textField}
                    value={values.cpf}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "000.000.000-00" },
                        readOnly: true,
                    }}
                />
            )}
            {values.employee === undefined && (
                <>
                    <TextField
                        label={"CNPJ"}
                        name={"producer.cnpj"}
                        sx={textField}
                        value={values.producer?.cnpj}
                        InputProps={{
                            inputComponent: MaskedInputNando,
                            inputProps: { mask: useCnpjMask, inputMode: "numeric" },
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label={"Inscrição Estadual"}
                        name={"producer.inscricaoEstadual"}
                        sx={textField}
                        value={values.producer?.inscricaoEstadual}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </>
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
