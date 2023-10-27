import React, { ChangeEventHandler } from "react"
import { Box, TextField } from "@mui/material"
import MaskedInput from "../../../components/MaskedInput"
import { textField } from "../../../style/input"

interface AddressProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Address: React.FC<AddressProps> = ({ values, handleChange }) => {
    return (
        <Box sx={{ flexDirection: "column", gap: "3vw" }}>
            <p style={{ fontSize: "4.0vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Endereço Residencial
            </p>
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"CEP"}
                    name={"cep"}
                    sx={textField}
                    value={values.cep}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "00.000-000" },
                    }}
                />
                <TextField label={"Estado"} name={"uf"} sx={textField} value={values.uf} onChange={handleChange} />
            </Box>
            <TextField label={"Cidade"} name={"city"} sx={textField} value={values.city} onChange={handleChange} />
            <TextField label={"Bairro"} name={"district"} sx={textField} value={values.district} onChange={handleChange} />
            <Box sx={{ flexDirection: "row", gap: "3vw" }}>
                <TextField
                    label={"Logradouro, Rua, Avenida..."}
                    name={"street"}
                    sx={textField}
                    value={values.street}
                    onChange={handleChange}
                />
                <TextField label={"Nº"} name={"number"} sx={textField} value={values.number} onChange={handleChange} />
            </Box>
        </Box>
    )
}
