import { Avatar } from "@files-ui/react"
import { Box, TextField, SxProps } from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { textField } from "../../style/input"
import MaskedInput from "../../components/MaskedInput"

interface HeaderProfileProps {
    values: FormValues
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    style?: SxProps
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ values, handleChange, style }) => {
    const [image, setImage] = useState<File>()

    return (
        <Box
            sx={{
                ...style,
            }}
        >
            <Avatar
                src={image}
                onChange={(file) => setImage(file)}
                changeLabel="Trocar foto"
                emptyLabel="Adicionar foto"
                variant="circle"
                style={{
                    width: "37vw",
                    height: "36vw",
                    fontSize: "4vw",
                    fontFamily: "MalgunGothic2",
                }}
            />
            <Box sx={{ flexDirection: "column", gap: "3vw", width: "60%" }}>
                <TextField label={"Nome Completo"} name="name" value={values.name} onChange={handleChange} sx={textField} />
                <TextField label={"E-mail"} name="email" value={values.email} onChange={handleChange} sx={textField} />
                <TextField
                    label={"Telefone"}
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "(00) 0 0000-0000" },
                    }}
                />
            </Box>
        </Box>
    )
}
