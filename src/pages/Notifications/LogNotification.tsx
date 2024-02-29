import { Avatar, Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import findEmployee from "../../hooks/filterEmployee"
import { useKits } from "../../hooks/useKits"
import { useCall } from "../../hooks/useCall"
import { useReports } from "../../hooks/useReports"
import { useTalhao } from "../../hooks/useTalhao"
import { useUsers } from "../../hooks/useUsers"

interface LogNotificationProps {
    notification: NotificationType
    list: any[]
}

export const LogNotification: React.FC<LogNotificationProps> = ({ notification, list }) => {
    const [value, setValue] = useState<any>()

    useEffect(() => {
        setValue(list.find((item) => item.id === notification.target_id))
    }, [list])
    const messageTemplates: any = {
        new: {
            employee: "Novo colaborador cadastrado, encaminhe-o para aprovação.",
            talhao: "Um novo talhão foi adicionado para você.",
            kit: "Um novo kit com ID ${target_id} está disponível.",
            call: "Você tem uma nova chamada pendente com ID ${target_id}.",
        },
        toggle: {
            kit: "O kit com ID ${target_id} foi atualizado.",
        },
        approve: {
            report: "O relatório com ID ${target_id} foi aprovado.",
        },
        close: {
            report: "O relatório com ID ${target_id} foi fechado.",
        },
    }

    const generateMessage = () => {
        const actionObject = messageTemplates[notification.action]
        const messageTemplate = actionObject ? actionObject[notification.target_key] : ""
        return messageTemplate.replace("${target_id}", notification.target_id.toString())
    }

    // Gerar mensagem
    const message = generateMessage()

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#F0F9F2",
                p: "3vw",
                borderRadius: "4vw",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ flexDirection: "row", gap: "1.5vw", width: "90%", alignItems: "center" }}>
                <Avatar src={""} sx={{ width: "11vw", height: "11vw" }} />
                <Box sx={{ flexDirection: "column", width: "80%", flexWrap: "nowrap" }}>
                    <p style={{ fontWeight: "800", fontSize: "0.9rem" }}></p>
                    <p
                        style={{
                            display: "flex",
                            fontSize: "3.0vw",
                            textOverflow: "ellipsis",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            width: "100%",
                        }}
                    >
                        {message}
                    </p>
                </Box>
            </Box>
            <p style={{ fontWeight: "800", fontSize: "3.5vw" }}>100+</p>
        </Box>
    )
}
