import React, { ChangeEventHandler } from "react"
import { Box, TextField, Button, MenuItem, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import MaskedInputNando from "../../components/MaskedNando"
import { useCepMask, usePhoneMask } from "burgos-masks"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepTwoProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ data, handleChange, typeUser, setCurrentStep }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const estados = useEstadosBrasil()

    return (
        <Box sx={{ width: "100%", height: 1, gap: isMobile ? "2vw" : "1vw", padding: "1vw 0" }}>
            {/* <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>Login</p> */}

            <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                <TextField name="username" label={"Username"} value={data.username} sx={textField} onChange={handleChange} required />
                <TextField name="password" type="password" label={"Senha"} value={data.password} sx={textField} onChange={handleChange} required />
            </Box>

            <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Dados para contato
            </p>

            <Box sx={{ gap: isMobile ? "5vw" : "1vw" }}>
                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                    <TextField
                        name="phone"
                        label={"Telefone"}
                        placeholder={"Telefone"}
                        value={data.phone}
                        sx={textField}
                        InputProps={{
                            inputComponent: MaskedInputNando,
                            inputProps: { mask: usePhoneMask, inputMode: "numeric" },
                        }}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="address.street"
                        label={"Logradouro"}
                        value={data.address.street}
                        sx={textField}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        name="address.district"
                        label={"Bairro"}
                        value={data.address.district}
                        sx={textField}
                        onChange={handleChange}
                        required
                    />
                    <Box sx={{ width: "100%", flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                        <TextField
                            name="address.number"
                            label={"Número"}
                            value={data.address.number}
                            sx={{ ...textField, flex: 0.4 }}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="address.cep"
                            label={"CEP"}
                            value={data.address.cep}
                            sx={{ ...textField, flex: 0.6 }}
                            InputProps={{
                                inputComponent: MaskedInputNando,
                                inputProps: { mask: useCepMask, inputMode: "numeric" },
                            }}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ width: "100%", flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                        <TextField
                            name="address.city"
                            label={"Cidade"}
                            value={data.address.city}
                            sx={{ ...textField, width: 0.5 }}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            select
                            onChange={handleChange}
                            label="UF"
                            name="address.uf"
                            sx={{
                                ...textField,
                                width: 0.5,
                            }}
                            value={data.address.uf}
                            InputProps={{
                                sx: {
                                    ...textField,
                                },
                            }}
                            SelectProps={{
                                MenuProps: {
                                    MenuListProps: { sx: { width: "100%", maxHeight: "80vw", overflowY: "auto" } },
                                },
                            }}
                            required
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
                    </Box>

                    <TextField
                        name="address.adjunct"
                        label={"Complemento"}
                        value={data.address.adjunct}
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                    />
                </Box>
            </Box>
        </Box>
    )
}
