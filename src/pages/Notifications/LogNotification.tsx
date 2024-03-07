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
import { colors } from "../../style/colors"
import { RiCustomerServiceLine } from "react-icons/ri"

interface LogNotificationProps {
    notification: NotificationType
    drawer: Boolean
}

export const LogNotification: React.FC<LogNotificationProps> = ({ notification, drawer }) => {
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
        active: {
            kit: {
                message: `Seu kit foi ativado`,
                onClick: () => navigate(`/adm/settings-kit/${notification.target_id}`),
            },
        },
        disabled: {
            kit: {
                message: `Seu kit foi desativado`,
                onClick: () => navigate(`/adm/settings-kit/${notification.target_id}`),
            },
        },
        approve: {
            report: {
                message: `O relatório do talhão ${report?.call?.talhao?.name} foi aprovado.`,
                onClick: () => navigate(`/adm/call/${report?.callId}/report/${notification.target_id}`),
            },
        },
        close: {
            report: {
                message: `O relatório do talhão ${report?.call?.talhao?.name} foi fechado.`,
                onClick: () => navigate(`/adm/call/${report?.callId}/report/${notification.target_id}`),
            },
        },
    }

    const generateMessageAndOnClick = () => {
        // Acessa o objeto de ação baseado na ação da notificação
        const actionObject = messageTemplates[notification.action]
        // Acessa o objeto de template baseado no target_key da notificação
        const templateObject = actionObject ? actionObject[notification.target_key] : null
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
                bgcolor: !drawer ? "#F0F9F2" : "transparent",
                p: "3vw",
                borderRadius: "4vw",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}
            onClick={onClick}
        >
            <Box sx={{ flexDirection: "row", gap: drawer ? "3vw" : "1.5vw", width: "90%", alignItems: "center" }}>
                <Box width="13%">
                    {notification.target_key === "employee" ? (
                        <Avatar src={employee?.image} sx={{ width: "8vw", height: "8vw" }} />
                    ) : notification.target_key === "report" && notification.action === "close" ? (
                        <HiOutlineClipboardDocument
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "7vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "report" && notification.action === "approve" ? (
                        <HiOutlineClipboardDocumentCheck
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "7vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "call" ? (
                        <RiCustomerServiceLine
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "6vw",
                                height: "6vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "talhao" || notification.target_key === "tillage" ? (
                        <PiPlant
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "8.5vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "active" ? (
                        <PiPlugsConnectedDuotone
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "7vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "disabled" ? (
                        <VscDebugDisconnect
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "7vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "new" ? (
                        <TbPlaylistAdd
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: "7vw",
                                height: "7vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : (
                        notification.target_key === "kit" &&
                        notification.action === "update" && (
                            <MdUpdate
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    width: "7vw",
                                    height: "7vw",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                }}
                            />
                        )
                    )}
                </Box>
                <Box sx={{ flexDirection: "column", width: "75%", flexWrap: "nowrap" }}>
                    {notification.target_key === "employee" ? (
                        <p
                            style={{
                                fontWeight: "800",
                                fontSize: "0.8rem",
                                color: drawer ? colors.text.white : colors.text.black,
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflowX: "hidden",
                            }}
                        >
                            {employee?.name}
                        </p>
                    ) : notification.action === "close" && notification.target_key === "report" ? (
                        <p
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,

                                fontWeight: "800",
                                fontSize: "0.8rem",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                overflowX: "hidden",
                            }}
                        >
                            {report?.call?.talhao?.tillage?.owner} - {report?.call?.talhao?.tillage?.name}
                        </p>
                    ) : notification.action === "new" && notification.target_key === "kit" ? (
                        <p
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                fontWeight: "800",
                                fontSize: "0.8rem",
                            }}
                        >
                            Novo kit {kit?.name} disponível
                        </p>
                    ) : notification.target_key === "kit" ? (
                        <p
                            style={{
                                fontWeight: "800",
                                fontSize: "0.8rem",
                                color: drawer ? colors.text.white : colors.text.black,
                            }}
                        >
                            {kit?.name}
                        </p>
                    ) : notification.action === "update" && notification.target_key === "kit" ? (
                        <p
                            style={{
                                fontWeight: "800",
                                fontSize: "0.8rem",
                                color: drawer ? colors.text.white : colors.text.black,
                            }}
                        >
                            Kit {kit?.name} foi atualizado
                        </p>
                    ) : (
                        notification.action === "new" &&
                        notification.target_key === "call" && (
                            <p
                                style={{
                                    fontWeight: "800",
                                    fontSize: "0.8rem",
                                    color: drawer ? colors.text.white : colors.text.black,
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                }}
                            >
                                Chamado aberto para {call?.producer?.user?.name}
                            </p>
                        )
                    )}
                    <p
                        style={{
                            // display: "flex",
                            fontSize: "3.0vw",
                            textOverflow: "ellipsis",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            color: drawer ? colors.text.white : colors.text.black,
                        }}
                    >
                        {message}
                    </p>
                </Box>
            </Box>
            <Box sx={{ width: "10%" }}>
                <IconButton onClick={onClick}>
                    <ArrowForwardIos fontSize="small" sx={{ color: drawer ? colors.text.white : colors.text.black }} />
                </IconButton>
            </Box>
        </Box>
    )
}
