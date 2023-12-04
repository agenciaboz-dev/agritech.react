import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { textField } from "../../../style/input"
import { useUser } from "../../../hooks/useUser"
import { colors } from "../../../style/colors"

interface AccountProps {
    setCurrentStep: (value: React.SetStateAction<number>) => void
}
export const Account: React.FC<AccountProps> = ({ setCurrentStep }) => {
    const { logout } = useUser()
    return (
        <Box sx={{ p: "8vw", gap: "4vw", alignItems: "center" }}>
            <h3 style={{ textAlign: "center", fontWeight: "400" }}>Finalize sua configuração de conta</h3>

            <p>Crie uma senha para começar sua assinatura</p>
            <Box sx={{ gap: "2vw" }}>
                <TextField
                    label={"E-mail"}
                    name="email"
                    value={""}
                    type="email"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
                <TextField
                    label={"Senha"}
                    name="password"
                    value={""}
                    type="paswword"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
            </Box>
            <Button
                variant="contained"
                sx={{
                    padding: "1vw",
                    borderColor: colors.button,
                    width: "80%",
                    backgroundColor: "#232323",
                    borderRadius: "10vw",
                    fontWeight: "800",
                    textTransform: "none",
                    fontSize: "3.5vw",
                }}
                onClick={() => {
                    setCurrentStep(3)
                }}
            >
                Próximo
            </Button>
            <p style={{ textDecoration: "underline", fontSize: "4vw" }} onClick={() => logout()}>
                Sair
            </p>
        </Box>
    )
}
