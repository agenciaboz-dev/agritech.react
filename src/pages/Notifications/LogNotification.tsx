import { Avatar, Box, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import findEmployee from "../../hooks/filterEmployee"
import { useKits } from "../../hooks/useKits"
import { useCall } from "../../hooks/useCall"
import { useReports } from "../../hooks/useReports"
import { useTalhao } from "../../hooks/useTalhao"
import { useUsers } from "../../hooks/useUsers"
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos"
import { useUser } from "../../hooks/useUser"
import { PiPlant, PiPlugsConnectedDuotone } from "react-icons/pi"
import { CiViewTable } from "react-icons/ci"
import Alert from "../../assets/icons/circle_alert.svg"
import { TbPlaylistAdd, TbReport } from "react-icons/tb"
import { HiOutlineClipboardDocument, HiOutlineClipboardDocumentCheck } from "react-icons/hi2"
import { VscDebugDisconnect } from "react-icons/vsc"
import { MdUpdate } from "react-icons/md"
import { Call } from "../../definitions/call"
import { Report } from "../../definitions/report"
import { useNavigate } from "react-router-dom"

interface LogNotificationProps {
    notification: NotificationType
}

export const LogNotification: React.FC<LogNotificationProps> = ({ notification }) => {
    const { user } = useUser()
    const navigate = useNavigate()

    const { listUsers, pendingUsers } = useUsers()
    const { listKits } = useKits()
    const { listCalls } = useCall()
    const { listReports } = useReports()
    const { listTalhao } = useTalhao()

    const [employee, setEmployee] = useState<User>()
    const [call, setCall] = useState<Call>()
    const [report, setReport] = useState<Report>()
    const [kit, setKit] = useState<Kit>()
    const [talhao, setTalhao] = useState<Talhao>()

    useEffect(() => {
        setEmployee(listUsers.concat(pendingUsers).find((item) => item.id === notification.target_id))
        setCall(listCalls.find((item) => item.id === notification.target_id))
        setReport(listReports?.find((item) => item.id === notification.target_id))
        setTalhao(listTalhao?.find((item) => item.id === notification.target_id))
        setKit(listKits?.find((item) => item.id === notification.target_id))
    }, [notification])
    useEffect(() => {
        notification.target_key === "employee" && console.log(employee)
        notification.target_key === "call" && console.log(call)
        notification.target_key === "report" && console.log(report)
        notification.target_key === "talhao" && console.log(talhao)
        notification.target_key === "kit" && console.log(kit)
    }, [])

    const messageTemplates: any = {
        new: {
            employee: {
                message: "Novo colaborador cadastrado, encaminhe-o para aprovação.",
                onClick: () =>
                    navigate(
                        !employee?.approved
                            ? `/adm/review/profile/${notification.target_id}`
                            : `/adm/profile/${notification.target_id}`
                    ),
            },
            talhao: {
                message: "Um novo talhão foi adicionado para você.",
                onClick: () => navigate(`/producer/tillage/${talhao?.tillageId}`),
            },
            kit: { onClick: () => navigate(`/adm/settings-kit/${notification.target_id}`) },
            call: {
                onClick: () =>
                    navigate(
                        user?.isAdmin
                            ? `/adm/call/${notification.target_id}/laudos`
                            : user?.producer
                            ? `/employee/call/${notification.target_id}/laudos`
                            : `/employee/call/${notification.target_id}/laudos`
                    ),
            },
        },
        update: {
            kit: {
                message: "Verifique as atualizações",
                onClick: () => navigate(`/adm/settings-kit/${notification.target_id}`),
            },
        },
        toggle: {
            kit: {
                message: `Seu kit foi ${kit?.active ? "ativado" : "desativado"}`,
                onClick: () => navigate(`/adm/settings-kit/${notification.target_id}`),
            },
        },
        approve: {
            report: {
                message: "O relatório com ID ${target_id} foi aprovado.",
                onClick: () => navigate(`/adm/review/profile/${notification.target_id}`),
            },
        },
        close: {
            report: {
                message: `O relatório do talhão ${report?.call?.talhao?.name} foi fechado.`,
                onClick: () => navigate(`/adm/review/profile/${notification.target_id}`),
            },
        },
    }

    const generateMessageAndOnClick = () => {
        // Acessa o objeto de ação baseado na ação da notificação
        const actionObject = messageTemplates[notification.action]
        // Acessa o objeto de template baseado no target_key da notificação
        const templateObject = actionObject ? actionObject[notification.target_key] : null
        console.log("onClick function:", templateObject.onClick)
        if (templateObject) {
            // Processa a mensagem para substituir placeholders
            // const processedMessage = templateObject.message.replace("${target_id}", notification.target_id.toString())
            // Retorna a mensagem processada e a função onClick
            return { message: templateObject.message, onClick: templateObject.onClick }
        } else {
            // Retorna valores padrão se não houver template correspondente
            return { onClick: () => console.log("Ação padrão.") }
        }
    }

    // Usar a função para gerar a mensagem e onClick
    const { message, onClick } = generateMessageAndOnClick()

    return (
        <Box
            sx={{
                width: "100%",
                height: "16vw",
                bgcolor: "#F0F9F2",
                p: "3vw",
                borderRadius: "4vw",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <Box sx={{ flexDirection: "row", gap: "1.5vw", width: "90%", alignItems: "center" }}>
                <Box width="13%">
                    {notification.target_key === "employee" ? (
                        <Avatar src={employee?.image} sx={{ width: "10vw", height: "10vw" }} />
                    ) : notification.target_key === "report" && notification.action === "close" ? (
                        <HiOutlineClipboardDocument
                            style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }}
                        />
                    ) : notification.target_key === "report" && notification.action === "approve" ? (
                        <HiOutlineClipboardDocumentCheck
                            style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }}
                        />
                    ) : notification.target_key === "call" ? (
                        <img src={Alert} style={{ width: "8.5vw" }} />
                    ) : notification.target_key === "talhao" || notification.target_key === "tillage" ? (
                        <PiPlant style={{ width: "8.5vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }} />
                    ) : notification.target_key === "kit" && notification.action === "toggle" ? (
                        kit?.active ? (
                            <PiPlugsConnectedDuotone
                                style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }}
                            />
                        ) : (
                            <VscDebugDisconnect style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }} />
                        )
                    ) : notification.target_key === "kit" && notification.action === "new" ? (
                        <TbPlaylistAdd style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }} />
                    ) : (
                        notification.target_key === "kit" &&
                        notification.action === "update" && (
                            <MdUpdate style={{ width: "7vw", height: "7vw", paddingLeft: 0, paddingRight: 0 }} />
                        )
                    )}
                </Box>
                <Box sx={{ flexDirection: "column", width: "80%", flexWrap: "nowrap" }}>
                    {notification.target_key === "employee" ? (
                        <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>{employee?.name}</p>
                    ) : notification.action === "close" && notification.target_key === "report" ? (
                        <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>
                            {report?.call?.talhao?.tillage?.owner} - {report?.call?.talhao?.tillage?.name}
                        </p>
                    ) : notification.action === "new" && notification.target_key === "kit" ? (
                        <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>Novo kit {kit?.name} disponível</p>
                    ) : notification.action === "toggle" && notification.target_key === "kit" ? (
                        <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>{kit?.name}</p>
                    ) : notification.action === "update" && notification.target_key === "kit" ? (
                        <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>Seu kit {kit?.name} foi atualizado</p>
                    ) : (
                        notification.action === "new" &&
                        notification.target_key === "call" && (
                            <p style={{ fontWeight: "800", fontSize: "0.8rem" }}>
                                Chamado aberto para {call?.producer?.user?.name}
                            </p>
                        )
                    )}
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
            <IconButton onClick={onClick}>
                <ArrowForwardIos fontSize="small" />
            </IconButton>
        </Box>
    )
}
