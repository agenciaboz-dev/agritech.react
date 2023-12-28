import React, { ChangeEventHandler } from "react"
import { Box, TextField, MenuItem } from "@mui/material"
import MaskedInput from "../../../components/MaskedInput"
import { textField } from "../../../style/input"
import { useEstadosBrasil } from "../../../hooks/useEstadosBrasil"

interface AddressProps {
    values: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Address: React.FC<AddressProps> = ({ values, handleChange }) => {
    const estados = useEstadosBrasil()
    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <p style={{ fontSize: "4.0vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Endereço Residencial
            </p>
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"CEP"}
                    name={"address.cep"}
                    sx={textField}
                    value={values.address.cep}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "00.000-000" },
                    }}
                />
                <TextField
                    select
                    onChange={handleChange}
                    label="Estado"
                    name={"address.uf"}
                    sx={{
                        ...textField,
                        width: "48%",
                    }}
                    value={values.address.uf}
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
                    />
                    {estados.map((estado) => (
                        <MenuItem
                            key={estado.value}
                            value={estado.value}
                            sx={{
                                width: "100%",
                            }}
                        >
                            {estado.value}
                        </MenuItem>
                    ))}
                </TextField>
                {/* <TextField label={"Estado"} name={"uf"} sx={textField} value={values.address.uf} onChange={handleChange} /> */}
            </Box>
            <TextField
                label={"Cidade"}
                name={"address.city"}
                sx={textField}
                value={values.address.city}
                onChange={handleChange}
            />
            <TextField
                label={"Bairro"}
                name={"address.district"}
                sx={textField}
                value={values.address.district}
                onChange={handleChange}
            />
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"Logradouro, Rua, Avenida..."}
                    name={"address.street"}
                    sx={{ ...textField, width: "90%" }}
                    value={values.address.street}
                    onChange={handleChange}
                />
                <TextField
                    label={"Nº"}
                    name={"address.number"}
                    sx={textField}
                    value={values.address.number}
                    onChange={handleChange}
                />
            </Box>
            <TextField
                label={"Complemento"}
                name={"address.adjunct"}
                sx={textField}
                value={values.address.adjunct}
                onChange={handleChange}
            />
        </Box>
    )
}
