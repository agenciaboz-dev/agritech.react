import { Avatar, ExtFile } from "@files-ui/react"
import { Box, Button, TextField, MenuItem } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useGender } from "../../hooks/useGender"
import { textField } from "../../style/input"
import { useRelationship } from "../../hooks/useRelationship"

interface StepOneProps {
    data: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    typeUser: string
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const StepOne: React.FC<StepOneProps> = ({ data, handleChange, typeUser, setCurrentStep }) => {
    const gender = useGender()
    const typeRelationship = useRelationship()
    const [image, setImage] = useState<File>()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Informações Pessoais
            </p>
            <Box sx={{ flexDirection: "row", gap: "5vw", width: "100%", height: "23%", alignItems: "center" }}>
                <Avatar
                    src={image}
                    onChange={(file) => setImage(file)}
                    changeLabel="Trocar foto"
                    emptyLabel="Adicionar foto"
                    variant="circle"
                    style={{ width: "30vw", height: "30vw", fontSize: "4vw", fontFamily: "MalgunGothic2" }}
                />
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                    <p style={{ fontWeight: "500", fontFamily: "MalgunGothic2", textAlign: "start", fontSize: "4vw" }}>
                        Foto
                    </p>
                    <p style={{ fontSize: "3vw", fontFamily: "MalgunGothic2", textAlign: "start" }}>
                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente visível e sem
                        adereços.
                    </p>
                </Box>
            </Box>
            <Box sx={{ gap: "3vw", width: "100%", height: "100%" }}>
                <TextField label={"Nome"} name="name" value={data.name} sx={textField} onChange={handleChange} />
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                    <TextField
                        label={"CPF"}
                        name="cpf"
                        value={data.cpf}
                        sx={{ ...textField, width: "50%" }}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "000.000.000-00" },
                        }}
                        onChange={handleChange}
                    />
                    {typeUser == "producer" && (
                        <TextField
                            label={"CNPJ"}
                            name="producer.cnpj"
                            value={data.producer?.cnpj}
                            sx={{ ...textField, width: "50%" }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "00.000.000/0000-00" },
                            }}
                            onChange={handleChange}
                        />
                    )}
                    {typeUser == "employee" && (
                        <TextField
                            label={"Rg"}
                            name="employee.rg"
                            value={data.employee?.rg}
                            sx={{ ...textField, width: "50%" }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "0000000000000", inputMode: "numeric" },
                            }}
                            onChange={handleChange}
                        />
                    )}
                </Box>

                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label={"Data de Nascimento"}
                        name="birth"
                        value={data.birth}
                        sx={{ ...textField, width: "100%" }}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "00/00/0000" },
                        }}
                        onChange={handleChange}
                    />
                </Box>
                <TextField
                    label={"E-mail"}
                    name="email"
                    value={data.email}
                    type="email"
                    sx={textField}
                    onChange={handleChange}
                />
                <Box sx={{ alignItems: "center", justifyContent: "center", gap: "5vw" }}>
                    {typeUser == "employee" && (
                        <Box sx={{ flexDirection: "row", width: "100%", gap: "2vw" }}>
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
                                value={data.employee?.gender}
                                InputProps={{
                                    sx: { ...textField },
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
                                        value={gender.id}
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
                                variant="outlined"
                                value={data.employee?.relationship}
                                InputProps={{
                                    sx: { ...textField },
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
                                {typeRelationship.map((relationship) => (
                                    <MenuItem
                                        key={relationship.value}
                                        value={relationship.id}
                                        sx={{
                                            width: "100%",
                                        }}
                                    >
                                        {relationship.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    )}
                </Box>

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
                        setCurrentStep(0)
                    }}
                >
                    Voltar
                </Button>
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
                        setCurrentStep(2)
                    }}
                >
                    Próximo
                </Button>
            </Box>
        </Box>
    )
}
