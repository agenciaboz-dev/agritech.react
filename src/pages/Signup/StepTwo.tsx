import React, { ChangeEventHandler } from "react"
import { Box, TextField, Button, MenuItem } from "@mui/material"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"

interface StepTwoProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepTwo: React.FC<StepTwoProps> = ({ data, handleChange, typeUser, setCurrentStep }) => {
    const estados = useEstadosBrasil()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>Login</p>

            <Box sx={{ gap: "2vw" }}>
                <TextField
                    name="username"
                    variant="outlined"
                    label={"Username"}
                    value={data.username}
                    onChange={handleChange}
                />
                <TextField
                    name="password"
                    variant="outlined"
                    type="password"
                    label={"Senha"}
                    value={data.password}
                    onChange={handleChange}
                />
            </Box>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>Dados para contato</p>
            <Box sx={{ gap: "2vw" }}>
                <TextField
                    name="phone"
                    variant="outlined"
                    label={"Telefone"}
                    value={data.phone}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: " (00) 0 0000-0000", inputMode: "numeric" },
                    }}
                    onChange={handleChange}
                />
                <TextField
                    name="street"
                    variant="outlined"
                    label={"Logradouro"}
                    value={data.street}
                    onChange={handleChange}
                />
                <TextField
                    name="district"
                    variant="outlined"
                    label={"Bairro"}
                    value={data.district}
                    onChange={handleChange}
                />
                <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        name="number"
                        variant="outlined"
                        label={"Número"}
                        value={data.number}
                        onChange={handleChange}
                    />
                    <TextField
                        name="cep"
                        variant="outlined"
                        label={"CEP"}
                        value={data.cep}
                        style={{ width: "76%" }}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "00.000-000", inputMode: "numeric" },
                        }}
                        onChange={handleChange}
                    />
                </Box>

                <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        name="city"
                        variant="outlined"
                        label={"Cidade"}
                        value={data.city}
                        style={{ width: "68%" }}
                        onChange={handleChange}
                    />
                    <TextField
                        select
                        onChange={handleChange}
                        label="UF"
                        name="uf"
                        sx={{
                            width: "38%",
                        }}
                        variant="outlined"
                        value={data.uf}
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
                    name="complement"
                    variant="outlined"
                    label={"Complemento"}
                    value={data.complement}
                    style={{ width: "100%" }}
                    onChange={handleChange}
                />
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
                        style={{
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
    )
}
