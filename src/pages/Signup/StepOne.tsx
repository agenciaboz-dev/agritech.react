import { Avatar, ExtFile } from "@files-ui/react"
import { Box, Button, TextField, MenuItem, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { colors } from "../../style/colors"
import MaskedInput from "../../components/MaskedInput"
import { useGender } from "../../hooks/useGender"
import { textField } from "../../style/input"
import { useRelationship } from "../../hooks/useRelationship"
import MaskedInputNando from "../../components/MaskedNando"
import { useCnpjMask, useCpfMask } from "burgos-masks"
import dayjs, { Dayjs } from "dayjs"
import { DemoItem } from "@mui/x-date-pickers/internals/demo"
import { MobileDatePicker, ptBR } from "@mui/x-date-pickers"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface StepOneProps {
    data: SignupValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    setCurrentStep: (value: React.SetStateAction<number>) => void
    typeUser: string
    image: File | undefined
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>
    pickDate: Dayjs | null
    setPickDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export const StepOne: React.FC<StepOneProps> = ({ data, handleChange, image, setImage, pickDate, setPickDate }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    const gender = useGender()
    const typeRelationship = useRelationship()

    return (
        <Box sx={{ width: "100%", height: "100%", gap: isMobile ? "4vw" : "1vw", flexDirection: "column", paddingTop: isMobile ? 0 : "10vw" }}>
            <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem", fontFamily: "MalgunGothic2", textAlign: "left", fontWeight: "800" }}>
                Informações Pessoais
            </p>
            <Box
                sx={{
                    flexDirection: "row",
                    gap: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    height: isMobile ? "23%" : "fit-content",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={image || undefined}
                    onChange={(file) => setImage(file)}
                    changeLabel="Trocar foto"
                    emptyLabel="Adicionar foto"
                    variant="circle"
                    style={{
                        width: isMobile ? "30vw" : "10vw",
                        height: isMobile ? "30vw" : "10vw",
                        fontSize: isMobile ? "4vw" : "1.2rem",
                        fontFamily: "MalgunGothic2",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: isMobile ? "65%" : "fit-content" }}>
                    <p style={{ fontWeight: "500", fontFamily: "MalgunGothic2", textAlign: "start", fontSize: isMobile ? "4vw" : "1.2rem" }}>Foto</p>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", fontFamily: "MalgunGothic2", textAlign: "start" }}>
                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente visível e sem adereços.
                    </p>
                </Box>
            </Box>
            <Box sx={{ gap: isMobile ? "3vw" : "1vw", width: "100%", height: "100%" }}>
                <TextField label={"Nome"} name="name" value={data.name} sx={textField} onChange={handleChange} required />
                <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw", width: "100%" }}>
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
                            InputProps={{
                                inputComponent: MaskedInput,
                                inputProps: { mask: "0000000000000", inputMode: "numeric" },
                            }}
                            required
                        />
                    </>
                )}
                <DemoItem label={"Data de Nascimento"}>
                    <MobileDatePicker
                        sx={{ ...textField, width: "100%" }}
                        format="DD/MM/YYYY"
                        value={pickDate}
                        onChange={(newDate) => {
                            if (newDate !== null) {
                                setPickDate(newDate)
                            }
                        }}
                        timezone="system"
                        localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                    />
                </DemoItem>
                <TextField label={"E-mail"} name="email" value={data.email} type="email" sx={textField} onChange={handleChange} required />
                <Box sx={{ alignItems: "center", justifyContent: "center", gap: isMobile ? "5vw" : "1vw" }}>
                    {data.employee && (
                        <Box sx={{ flexDirection: "row", width: "100%", gap: isMobile ? "2vw" : "1vw" }}>
                            <TextField
                                select
                                onChange={handleChange}
                                label="Gênero"
                                name="employee.gender"
                                sx={{
                                    ...textField,
                                    width: isMobile ? "48%" : "fit-content",
                                }}
                                value={data.employee.gender}
                                InputProps={{
                                    sx: {
                                        ...textField,
                                        height: isMobile ? "12vw" : "fit-content",
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
                                    width: isMobile ? "50%" : "fit-content",
                                }}
                                required
                                variant="outlined"
                                value={data.employee.relationship}
                                InputProps={{
                                    sx: { ...textField, height: isMobile ? "12vw" : "fit-content" },
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
