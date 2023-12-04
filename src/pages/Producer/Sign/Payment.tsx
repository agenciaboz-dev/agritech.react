import { Box, Button, TextField } from "@mui/material"
import React from "react"
import { textField } from "../../../style/input"
import { useUser } from "../../../hooks/useUser"
import { colors } from "../../../style/colors"

interface PaymentProps {
    setCurrentStep: (value: React.SetStateAction<number>) => void
}
export const Payment: React.FC<PaymentProps> = ({ setCurrentStep }) => {
    const { logout } = useUser()
    return (
        <Box sx={{ p: "8vw", gap: "4vw", alignItems: "center" }}>
            <h3 style={{ textAlign: "center", fontWeight: "400" }}>Finalize sua configuração de conta</h3>

            <p>Crie uma senha para começar sua assinatura</p>
            <Box sx={{ gap: "2vw" }}>
                <TextField
                    label={"Nº do Cartão"}
                    name="email"
                    value={""}
                    type="email"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
                <TextField
                    label={"Data de vencimento"}
                    name="password"
                    value={""}
                    type="paswword"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
                <TextField
                    label={"CCV"}
                    name="password"
                    value={""}
                    type="paswword"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
                <TextField
                    label={"Primeiro Nome"}
                    name="password"
                    value={""}
                    type="paswword"
                    sx={textField}
                    // onChange={"handleChange"}
                    required
                />
                <TextField
                    label={"Sobrenome"}
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
                Inicie sua assinatura
            </Button>
            <p style={{ textDecoration: "underline", fontSize: "4vw" }} onClick={() => setCurrentStep(0)}>
                Cancelar
            </p>
        </Box>
    )
}
