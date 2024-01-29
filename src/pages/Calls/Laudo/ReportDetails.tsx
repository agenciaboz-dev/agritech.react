import { Box, Button, CircularProgress, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { TitleComponents } from "../../../components/TitleComponents"
import { DialogConfirm } from "../../../components/DialogConfirm"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import findProducer from "../../../hooks/filterProducer"
import { useKits } from "../../../hooks/useKits"
import { useCall } from "../../../hooks/useCall"
import { useUsers } from "../../../hooks/useUsers"
import { useProducer } from "../../../hooks/useProducer"
import { dateFrontend } from "../../../hooks/useFormattedDate"
import { CardTeam } from "../../../components/Kit/CardTeam"
import findEmployee from "../../../hooks/filterEmployee"
import { Call } from "../../../definitions/call"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

interface ReportDetailsProps {}

const modal = {
    title: "Tem certeza que deseja cancelar esse chamado?",
    content: "Uma vez que cancelado o mesmo chamado não poderá ser refeito, apenas um novo poderá ser aberto.",
    submitTitle: "Sim, cancelar",
    cancelTitle: "Não",
}
const p_style = {
    fontSize: "3.5vw",
}

export const ReportDetails: React.FC<ReportDetailsProps> = ({}) => {
    const { reportid } = useParams()

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="/" />
            </Box>
            <Box
                style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#353535",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                }}
            >
                <Box
                    style={{
                        padding: "5vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                        gap: "4vw",
                        height: "100%",
                    }}
                >
                    <h3>Detalhes</h3>
                    <Box>
                        <p>Contratante: </p>
                        <p>Propriedade: </p>
                    </Box>
                    <Box>
                        <hr />
                    </Box>
                    <Box>
                        <p style={{ fontWeight: "bold" }}>Dados de Operação</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
