import React, { ChangeEventHandler } from "react"
import { Box, TextField, Button, MenuItem } from "@mui/material"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { textField } from "../../style/input"

interface StepTwoProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ data, handleChange, typeUser, setCurrentStep }) => {
    const estados = useEstadosBrasil()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>Login</p>

            <Box sx={{ gap: "3vw" }}>
                <TextField
                    name="username"
                    label={"Username"}
                    value={data.username}
                    sx={textField}
                    onChange={handleChange}
                    required
                />
                <TextField
                    name="password"
                    type="password"
                    label={"Senha"}
                    value={data.password}
                    sx={textField}
                    onChange={handleChange}
                    required
                />
            </Box>

            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Dados para contato
            </p>

            <Box sx={{ gap: "5vw" }}>
                <Box sx={{ gap: "3vw" }}>
                    <TextField
                        name="phone"
                        label={"Telefone"}
                        placeholder={"Telefone"}
                        value={data.phone}
                        sx={textField}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: " (00) 0 0000-0000", inputMode: "numeric" },
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
                    <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                        <TextField
                            name="address.number"
                            label={"Número"}
                            value={data.address.number}
                            sx={textField}
                            onChange={handleChange}
                            required
                        />
                        <TextField
                            name="address.cep"
                            label={"CEP"}
                            value={data.address.cep}
                            sx={{ ...textField, width: "76%" }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "00.000-000", inputMode: "numeric" },
                            }}
                            onChange={handleChange}
                            required
                        />
                    </Box>
                    <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                        <TextField
                            name="address.city"
                            label={"Cidade"}
                            value={data.address.city}
                            sx={textField}
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
                                width: "48%",
                            }}
                            value={data.address.uf}
                            InputProps={{
                                sx: {
                                    ...textField,
                                    height: "12vw",
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
                                    value={estado.id}
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
                        name="address.complement"
                        label={"Complemento"}
                        value={data.address.complement}
                        sx={{ ...textField, width: "100%" }}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <Box sx={{ gap: "2vw" }}>
                    <Button
                        variant="outlined"
                        sx={{
                            padding: "3vw",
                            color: colors.text.black,
                            fontWeight: "600",
                            fontSize: "4vw",
                            textTransform: "none",
                            borderRadius: "10vw",
                            height: "10vw",
                        }}
                        onClick={() => {
                            setCurrentStep(1)
                        }}
                    >
                        Voltar
                    </Button>
                    {typeUser === "employee" && (
                        <Button
                            variant="contained"
                            sx={{
                                fontSize: 17,
                                color: colors.text.white,
                                width: "100%",
                                backgroundColor: colors.button,
                                borderRadius: "5vw",
                                textTransform: "none",
                            }}
                            onClick={() => {
                                setCurrentStep(3)
                            }}
                        >
                            Próximo
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
