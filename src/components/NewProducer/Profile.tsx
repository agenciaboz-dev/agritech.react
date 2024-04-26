import { Avatar } from "@files-ui/react"
import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { useCnpjMask, useCpfMask, usePhoneMask } from "burgos-masks"
import MaskedInputNando from "../MaskedNando"
import MaskedInput from "../MaskedInput"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface ProfileProps {
    values: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    image: File | undefined
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>
}

export const Profile: React.FC<ProfileProps> = ({ values, handleChange, image, setImage }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
    return (
        <Box sx={{ padding: isMobile ? "4vw" : "1vw 0", gap: isMobile ? "4vw" : "1vw", height: "100%", overflowY: "auto" }}>
            <p
                style={{
                    fontSize: isMobile ? "4.5vw" : "1.2rem",
                    fontFamily: "MalgunGothic2",
                    textAlign: "left",
                    fontWeight: "800",
                }}
            >
                Informações Pessoais
            </p>
            <Box
                sx={{
                    flexDirection: "row",
                    gap: isMobile ? "3vw" : "2vw",
                    width: "100%",
                    height: isMobile ? "23%" : "fit-content",
                    alignItems: "center",
                }}
            >
                <Avatar
                    src={image || values.image}
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
                <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", width: "65%" }}>
                    <p
                        style={{
                            fontWeight: "600",
                            fontFamily: "MalgunGothic2",
                            textAlign: "start",
                            fontSize: isMobile ? "4vw" : "1.2rem",
                        }}
                    >
                        Foto (Opcional)
                    </p>
                    <p
                        style={{
                            fontSize: isMobile ? "3vw" : "1rem",
                            fontFamily: "MalgunGothic2",
                            textAlign: "start",
                        }}
                    >
                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente visível e sem adereços.
                    </p>
                </Box>
            </Box>

            <Box sx={{ width: "100%", flexDirection: "column", gap: isMobile ? "2vw" : "1vw" }}>
                <TextField label={"Nome Completo"} name="name" value={values.name} sx={textField} onChange={handleChange} required />
                <TextField label={"E-mail"} name="email" value={values.email} type="email" sx={textField} onChange={handleChange} required />
                <TextField
                    label={"CPF"}
                    name="cpf"
                    value={values.cpf}
                    sx={{ ...textField, width: "100%" }}
                    InputProps={{
                        inputComponent: MaskedInputNando,
                        inputProps: { mask: useCpfMask, inputMode: "numeric" },
                    }}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={"CNPJ"}
                    name="producer.cnpj"
                    value={values.producer?.cnpj}
                    sx={{ ...textField, width: "100%" }}
                    InputProps={{
                        inputComponent: MaskedInputNando,
                        inputProps: { mask: useCnpjMask, inputMode: "numeric" },
                    }}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={"Inscrição Estadual"}
                    name="producer.inscricaoEstadual"
                    value={values.producer?.inscricaoEstadual}
                    sx={{ ...textField, width: "100%" }}
                    InputProps={{ inputComponent: MaskedInput, inputProps: { mask: "00000000000" }, inputMode: "numeric" }}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={"Telefone"}
                    name="phone"
                    value={values.phone}
                    sx={textField}
                    onChange={handleChange}
                    InputProps={{
                        inputComponent: MaskedInputNando,
                        inputProps: { mask: usePhoneMask },
                        inputMode: "numeric",
                    }}
                    required
                />
            </Box>
        </Box>
    )
}
