import React, { ChangeEventHandler } from "react"
import { Box, TextField, MenuItem, useMediaQuery } from "@mui/material"
import MaskedInput from "../../../components/MaskedInput"
import { useEstadosBrasil } from "../../../hooks/useEstadosBrasil"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface AddressProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Address: React.FC<AddressProps> = ({ values, handleChange }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    const estados = useEstadosBrasil()
    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: isMobile ? "3vw" : "1vw",
                height: "75%",
                overflowY: "auto",
                // paddingBottom: "400vh",
                paddingBottom: "40vh",
            }}
        >
            <p
                style={{
                    fontSize: isMobile ? "4.0vw" : "1.2rem",
                    fontFamily: "MalgunGothic2",
                    textAlign: "left",
                    fontWeight: "800",
                }}
            >
                Endereço Residencial
            </p>
            <Box sx={{ flexDirection: "row", gap: isMobile ? "2.5vw" : "1vw" }}>
                <TextField
                    label={"CEP"}
                    name={"address.cep"}
                    sx={{ ...textField, width: "50%" }}
                    value={values.address?.cep}
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
                        width: "50%",
                    }}
                    value={values.address?.uf}
                    InputProps={{
                        sx: { ...textField, height: "fit-content" },
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
                {/* <TextField label={"Estado"} name={"uf"} sx={textField} value={values.address?.uf} onChange={handleChange} /> */}
            </Box>
            <TextField
                label={"Cidade"}
                name={"address.city"}
                sx={textField}
                value={values.address?.city}
                onChange={handleChange}
            />
            <TextField
                label={"Bairro"}
                name={"address.district"}
                sx={textField}
                value={values.address?.district}
                onChange={handleChange}
            />
            <Box sx={{ flexDirection: "row", gap: isMobile ? "2.5vw" : "1vw" }}>
                <TextField
                    label={"Logradouro, Rua, Avenida..."}
                    name={"address.street"}
                    sx={{ ...textField, width: "90%" }}
                    value={values.address?.street}
                    onChange={handleChange}
                />
                <TextField
                    label={"Nº"}
                    name={"address.number"}
                    sx={textField}
                    value={values.address?.number}
                    onChange={handleChange}
                />
            </Box>
            <TextField
                label={"Complemento"}
                name={"address.adjunct"}
                sx={textField}
                value={values.address?.adjunct}
                onChange={handleChange}
            />
        </Box>
    )
}
