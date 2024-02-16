import { Box, Button } from "@mui/material"
import React from "react"
import { colors } from "../../../../style/colors"
import logoColor from "../../assets/logo/logoColor.svg"
import textImage from "../../assets/Seu cadastro foi enviado para.svg"
import { useNavigate } from "react-router-dom"
import { Call } from "../../../../definitions/call"

interface FinishReportProps {
    call?: Call
}

export const FinishReport: React.FC<FinishReportProps> = ({ call }) => {
    const navigate = useNavigate()
    return (
        <Box sx={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
            <img src={textImage} style={{ width: "80%", height: "20vw" }} />
            <img src={logoColor} style={{ width: "100%", height: "50vw" }} />
            <Box sx={{ p: "1vw", gap: "3vw", alignItems: "center" }}>
                <p style={{ fontSize: "4.5vw", fontWeight: "400", textAlign: "center" }}>
                    Relatório Operacional finalizado.
                </p>
                <p style={{ fontSize: "3.6vw" }}></p>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        bgcolor: colors.button,
                        textTransform: "none",
                        borderRadius: "5vw",
                        width: "fit-content",
                    }}
                    onClick={() => navigate(`/adm/call/${call?.id}/report/${call?.report?.id}`)}
                >
                    Ver Relatório
                </Button>
            </Box>
        </Box>
    )
}
