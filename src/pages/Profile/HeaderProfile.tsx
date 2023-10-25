import { Avatar } from "@files-ui/react"
import { Box, TextField } from "@mui/material"
import React, { ChangeEventHandler, useState } from "react"
import { textField } from "../../style/input"

interface HeaderProfileProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({ values, handleChange }) => {
    const [image, setImage] = useState<File>()

    return (
        <Box
            sx={{
                flexDirection: "row",
                gap: "5vw",
                width: "100%",
                height: "100%",
                alignItems: "center",
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
            <Box sx={{ flexDirection: "column", gap: "2vw", width: "60%" }}>
                <TextField label={"Nome Completo"} name="name" value={values.name} onChange={handleChange} sx={textField} />
                <TextField label={"E-mail"} name="email" value={values.email} onChange={handleChange} sx={textField} />
                <TextField label={"Telefone"} name="phone" value={values.phone} onChange={handleChange} sx={textField} />
            </Box>
        </Box>
    )
}
