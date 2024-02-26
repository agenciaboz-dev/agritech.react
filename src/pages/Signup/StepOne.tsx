import { Avatar, ExtFile } from "@files-ui/react"
import { Box, Button, TextField, MenuItem } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useGender } from "../../hooks/useGender"
import { textField } from "../../style/input"
import { useRelationship } from "../../hooks/useRelationship"
import MaskedInputNando from "../../components/MaskedNando"
import { useCnpjMask, useCpfMask } from "burgos-masks"

interface StepOneProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
    typeUser: string
    image: File | undefined
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const StepOne: React.FC<StepOneProps> = ({ data, handleChange, image, setImage }) => {
    const gender = useGender()
    const typeRelationship = useRelationship()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: "4vw", flexDirection: "column" }}>
            <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Informações Pessoais
            </p>
            <Box sx={{ flexDirection: "row", gap: "5vw", width: "100%", height: "23%", alignItems: "center" }}>
                <Avatar
                    src={image || undefined}
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
                <TextField label={"Nome"} name="name" value={data.name} sx={textField} onChange={handleChange} required />
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                    <TextField
                        label={"CPF"}
                        name="cpf"
                        value={data.cpf}
                        sx={{ ...textField, width: "50%" }}
                        InputProps={{
                            inputComponent: MaskedInputNando,
                            inputProps: { mask: useCpfMask, inputMode: "numeric" },
                        }}
                        onChange={handleChange}
                        required
                    />
                    {data.producer && (
                        <>
                            <TextField
                                label={"CNPJ"}
                                name="producer.cnpj"
                                value={data.producer?.cnpj}
                                sx={{ ...textField, width: "50%" }}
                                InputProps={{
                                    inputComponent: MaskedInputNando,
                                    inputProps: { mask: useCnpjMask, inputMode: "numeric" },
                                }}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    {data.employee && (
                        <TextField
                            label={"Rg"}
                            name="employee.rg"
                            value={data.employee.rg}
                            sx={{ ...textField, width: "50%" }}
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "0000000000000", inputMode: "numeric" },
                            }}
                            onChange={handleChange}
                            required
                        />
                    )}
                </Box>

                {data.producer && (
                    <>
                        <TextField
                            label={"Inscrição Estadual"}
                            name="producer.inscricaoEstadual"
                            value={data.producer?.inscricaoEstadual}
                            sx={{ ...textField, width: "100%" }}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                    <TextField
                        label={"Data de Nascimento"}
                        name="birth"
                        value={data.birth}
                        sx={{ ...textField, width: "100%" }}
                        InputProps={{
                            inputComponent: MaskedInput,
                            inputProps: { mask: "00/00/0000" },
                            inputMode: "numeric",
                        }}
                        onChange={handleChange}
                        required
                    />
                </Box>
                <TextField
                    label={"E-mail"}
                    name="email"
                    value={data.email}
                    type="email"
                    sx={textField}
                    onChange={handleChange}
                    required
                />
                <Box sx={{ alignItems: "center", justifyContent: "center", gap: "5vw" }}>
                    {data.employee && (
                        <Box sx={{ flexDirection: "row", width: "100%", gap: "2vw" }}>
                            <TextField
                                select
                                onChange={handleChange}
                                label="Gênero"
                                name="employee.gender"
                                sx={{
                                    ...textField,
                                    width: "48%",
                                }}
                                value={data.employee.gender}
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
                                required
                                variant="outlined"
                                value={data.employee.relationship}
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
            </Box>
        </Box>
    )
}
