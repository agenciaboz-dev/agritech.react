import { Avatar } from "@files-ui/react"
import { Box, Button, TextField } from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { textField } from "../../style/input"
import MaskedInput from "../MaskedInput"
import { colors } from "../../style/colors"
import { useNavigate } from "react-router-dom"
import { useCnpjMask, useCpfMask, usePhoneMask } from "burgos-masks"
import MaskedInputNando from "../MaskedNando"

interface ProfileProps {
    values: NewProducer
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const Profile: React.FC<ProfileProps> = ({ values, handleChange }) => {
    const [image, setImage] = useState<File>()

    return (
        <Box sx={{ p: "4vw", gap: "4vw", height: "80%" }}>
            <p
                style={{
                    fontSize: "4.5vw",
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
                    gap: "5vw",
                    width: "100%",
                    height: "23%",
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
                        width: "30vw",
                        height: "30vw",
                        fontSize: "4vw",
                        fontFamily: "MalgunGothic2",
                    }}
                />
                <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                    <p
                        style={{
                            fontWeight: "600",
                            fontFamily: "MalgunGothic2",
                            textAlign: "start",
                            fontSize: "4vw",
                        }}
                    >
                        Foto (Opcional)
                    </p>
                    <p
                        style={{
                            fontSize: "3vw",
                            fontFamily: "MalgunGothic2",
                            textAlign: "start",
                        }}
                    >
                        Clique na imagem ao lado para adicionar uma foto sua. A foto deve estar plenamente visível e sem
                        adereços.
                    </p>
                </Box>
            </Box>

            <Box sx={{ width: "100%", flexDirection: "column", gap: "2vw" }}>
                <TextField
                    label={"Nome Completo"}
                    name="name"
                    value={values.name}
                    sx={textField}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label={"E-mail"}
                    name="email"
                    value={values.email}
                    type="email"
                    sx={textField}
                    onChange={handleChange}
                    required
                />
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
