import { Avatar, Box, IconButton, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useKits } from "../../hooks/useKits"
import { useCall } from "../../hooks/useCall"
import { useReports } from "../../hooks/useReports"
import { useTalhao } from "../../hooks/useTalhao"
import { useUsers } from "../../hooks/useUsers"
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos"
import { useUser } from "../../hooks/useUser"
import { PiPlant, PiPlugsConnectedDuotone } from "react-icons/pi"
import { TbCrown, TbPlaylistAdd } from "react-icons/tb"
import { HiOutlineClipboardDocument, HiOutlineClipboardDocumentCheck } from "react-icons/hi2"
import { VscDebugDisconnect } from "react-icons/vsc"
import { MdUpdate } from "react-icons/md"
import { Call } from "../../definitions/call"
import { Report } from "../../definitions/report"
import { useNavigate } from "react-router-dom"
import { colors } from "../../style/colors"
import { RiCustomerServiceLine } from "react-icons/ri"
import { useIo } from "../../hooks/useIo"
import { NotificationClass } from "../../types/server/class/Notification"
import { useNotification } from "../../hooks/useNotifications"
import { useMenuDrawer } from "../../hooks/useMenuDrawer"

interface LogNotificationProps {
    notification: NotificationClass
    drawer: Boolean
}

export const LogNotification: React.FC<LogNotificationProps> = ({ notification, drawer }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const { user } = useUser()
    const navigate = useNavigate()

    const { removeNotification, open, setOpen } = useNotification()

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

        setReport(listReports?.find((item) => item.id === notification.target_id))
        setTalhao(listTalhao?.find((item) => item.id === notification.target_id))
        setKit(listKits?.find((item) => item.id === notification.target_id))
    }, [notification])

    useEffect(() => {
        // if (listUsers.length == 0) io.emit("users:list")
        // if (listKits.length == 0) {
        //     io.emit("kit:list")
        // }
        // if (listCalls.length == 0) {
        //     io.emit("call:listApproved", user)
        //     setCall(listCalls.find((item) => item.id === notification.target_id))
        // }
        // if (listReports.length == 0) io.emit("report:list")
        // if (listTalhao?.length == 0) io.emit("talhao:list", user)
    }, [listUsers, listKits, listCalls, listReports, listTalhao])
    useEffect(() => {
        // console.log({ CALLLLLLLL: listCalls })
        // console.log({ CALLLLLLLL: notification.target_id })
    }, [listCalls])

    // useEffect(() => {
    //     console.log({ USERS: listUsers })
    //     console.log({ KITS: listKits })
    //     console.log({ CALLS: listCalls })
    //     console.log({ TALHAO: listTalhao })
    //     console.log({ REPORTS: listReports })
    // }, [listUsers, listKits, listCalls, listReports, listTalhao])

    const messageTemplates: any = {
        new: {
            employee: {
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    removeNotification(notification.id)
                    removeNotification(notification.id)
                    navigate(
                        !employee?.approved
                            ? `/adm/review/profile/${notification.target_id}`
                            : `/adm/profile/${notification.target_id}`
                    )
                },
            },
            talhao: {
                message: "Um novo talhão foi adicionado para você.",
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/producer/tillage/${talhao?.tillageId}`)
                    removeNotification(notification.id)
                },
            },
            kit: {
                onClick: () => {
                    drawer && open && setOpen(false)
                    navigate(`/adm/settings-kit/${notification.target_id}`)
                    user && io.emit("notification:viewed", notification.id, user.id)
                    removeNotification(notification.id)
                },
            },
            call: {
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(
                        user?.isAdmin
                            ? `/adm/call/${notification.target_id}/laudos`
                            : user?.producer
                            ? `/employee/call/${notification.target_id}/laudos`
                            : `/employee/call/${notification.target_id}/laudos`
                    )
                    removeNotification(notification.id)
                },
            },
        },
        update: {
            kit: {
                message: "Verifique as atualizações",
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/settings-kit/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
        },
        active: {
            kit: {
                message: `Seu kit foi ativado`,
                onClick: () => {
                    drawer && open && setOpen(false)

                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/settings-kit/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
            admin: {
                message: `Agora você tem permissões de administrador.`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/profile/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
            manager: {
                message: `Agora você tem permissões de gerente.`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/profile/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
        },
        disabled: {
            kit: {
                message: `Seu kit foi desativado`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/settings-kit/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
            admin: {
                message: `Você não é mais administrador`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/profile/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
            manager: {
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/profile/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
        },
        approve: {
            report: {
                message: `O relatório do talhão ${report?.call?.talhao?.name} foi aprovado.`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)
                    navigate(`/adm/call/${report?.callId}/report/${notification.target_id}`)
                    removeNotification(notification.id)
                },
            },
        },
        close: {
            report: {
                message: `O relatório do talhão ${report?.call?.talhao?.name} foi fechado.`,
                onClick: () => {
                    user && io.emit("notification:viewed", notification.id, user.id)

                    removeNotification(notification.id)
                    navigate(`/adm/call/${report?.callId}/report/${notification.target_id}`)
                },
            },
        },
    }

    useEffect(() => {
        io.on("notification:viewed", () => {})
    }, [])
    const generateMessageAndOnClick = () => {
        const actionObject = messageTemplates[notification.action]
        const templateObject = actionObject ? actionObject[notification.target_key] : null
        if (templateObject) {
            return {
                message: templateObject.message,
                onClick: () => {
                    setOpen(false)
                    templateObject.onClick()
                },
            }
        } else {
            return { onClick: () => console.log("Ação padrão.") }
        }
    }

    // Usar a função para gerar a mensagem e onClick
    const { message, onClick } = generateMessageAndOnClick()
    const findBy = notification.viewed_by.find((item) => item === user?.id)
    return (
        <Box
            sx={{
                width: "100%",
                height: isMobile ? "13vw" : "4vw",
                bgcolor:
                    !drawer && findBy
                        ? "transparent"
                        : !drawer && findBy === undefined
                        ? "#F0F9F2"
                        : drawer && "transparent",
                padding: "1vw",
                borderRadius: isMobile ? "4vw" : "2vw",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    flexDirection: "row",
                    gap: drawer ? "2vw" : "0vw",
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        width: isMobile ? "13%" : "fit-content",
                    }}
                >
                    {notification.target_key === "employee" ? (
                        <Avatar
                            src={employee?.image}
                            sx={{ width: isMobile ? "8vw" : "2vw", height: isMobile ? "8vw" : "2vw" }}
                        />
                    ) : notification.target_key === "report" && notification.action === "close" ? (
                        <HiOutlineClipboardDocument
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "report" && notification.action === "approve" ? (
                        <HiOutlineClipboardDocumentCheck
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "call" ? (
                        <RiCustomerServiceLine
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "6vw" : "2vw",
                                height: isMobile ? "6vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "talhao" || notification.target_key === "tillage" ? (
                        <PiPlant
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "8.5vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "active" ? (
                        <PiPlugsConnectedDuotone
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "disabled" ? (
                        <VscDebugDisconnect
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "kit" && notification.action === "new" ? (
                        <TbPlaylistAdd
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "active" && notification.action === "admin" ? (
                        <TbCrown
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "disabled" && notification.action === "admin" ? (
                        <TbCrown
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "active" && notification.action === "manager" ? (
                        <TbCrown
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
                                paddingLeft: 0,
                                paddingRight: 0,
                            }}
                        />
                    ) : notification.target_key === "disabled" && notification.action === "manager" ? (
                        <TbCrown
                            style={{
                                color: drawer ? colors.text.white : colors.text.black,
                                width: isMobile ? "7vw" : "2vw",
                                height: isMobile ? "7vw" : "2vw",
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
                                    width: isMobile ? "7vw" : "2vw",
                                    height: isMobile ? "7vw" : "2vw",
                                    paddingLeft: 0,
                                    paddingRight: 0,
                                }}
                            />
                        )
                    )}
                </Box>
                <Box
                    sx={{
                        flexDirection: "row",
                        width: "67%",
                        flexWrap: "nowrap",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {notification.target_key === "employee" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Novo Cadastro
                            </p>
                            <p
                                style={{
                                    fontSize: "0.7rem",
                                    color: drawer ? colors.text.white : colors.text.black,
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                {employee?.name} acabou de ser cadastrado
                            </p>
                        </Box>
                    ) : notification.action === "close" && notification.target_key === "report" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: "800",
                                }}
                            >
                                {report?.call?.talhao?.tillage?.owner}
                            </p>
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.7rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Relatório fechado para {report?.call?.talhao?.tillage?.name}
                            </p>
                        </Box>
                    ) : notification.action === "active" && notification.target_key === "admin" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Atualização
                            </p>
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.7rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Você se tornou administrador
                            </p>
                        </Box>
                    ) : notification.action === "disabled" && notification.target_key === "admin" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Você não é mais administrador
                            </p>
                        </Box>
                    ) : notification.action === "active" && notification.target_key === "manager" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Atualização
                            </p>
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.7rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Você se tornou gerente
                            </p>
                        </Box>
                    ) : notification.action === "disabled" && notification.target_key === "manager" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Atualização
                            </p>
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.7rem",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Você não é mais gerente
                            </p>
                        </Box>
                    ) : notification.action === "new" && notification.target_key === "kit" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontSize: "0.9rem",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    overflowX: "hidden",
                                }}
                            >
                                Novo kit {kit?.name} disponível
                            </p>
                        </Box>
                    ) : notification.action === "active" && notification.target_key === "kit" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    color: drawer ? colors.text.white : colors.text.black,
                                    fontWeight: findBy === undefined ? "800" : "0",
                                }}
                            >
                                Seu Kit foi ativado
                            </p>
                        </Box>
                    ) : notification.action === "disabled" && notification.target_key === "kit" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                    color: drawer ? colors.text.white : colors.text.black,
                                }}
                            >
                                Seu Kit foi desativado
                            </p>
                        </Box>
                    ) : notification.action === "update" && notification.target_key === "kit" ? (
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.9rem",
                                    fontWeight: findBy === undefined ? "800" : "0",
                                    color: drawer ? colors.text.white : colors.text.black,
                                }}
                            >
                                Kit {kit?.name} foi atualizado
                            </p>
                        </Box>
                    ) : (
                        notification.action === "new" &&
                        notification.target_key === "call" && (
                            <Box
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <p
                                    style={{
                                        color: drawer ? colors.text.white : colors.text.black,
                                        fontSize: "0.9rem",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        overflowX: "hidden",
                                        fontWeight: "800",
                                    }}
                                >
                                    {call?.producer?.user?.name}
                                </p>
                                <p
                                    style={{
                                        fontSize: "0.7rem",
                                        color: drawer ? colors.text.white : colors.text.black,
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontWeight: findBy === undefined ? "800" : "0",
                                        overflowX: "hidden",
                                    }}
                                >
                                    Chamado aberto para o talhão {call?.talhao?.name}
                                </p>
                            </Box>
                        )
                    )}
                </Box>
                <Box sx={{ flexDirection: "column", gap: isMobile ? "1vw" : 0, alignItems: "end", width: "20%" }}>
                    <p
                        style={{
                            // display: "flex",
                            fontSize: isMobile ? "3vw" : "1rem",
                            textOverflow: "ellipsis",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            color: drawer ? colors.text.white : colors.text.black,
                        }}
                    >
                        {new Date(Number(notification.datetime)).toLocaleDateString("pt-br")}
                    </p>
                    <p
                        style={{
                            // display: "flex",
                            fontSize: isMobile ? "2.5vw" : "1rem",
                            textOverflow: "ellipsis",
                            overflowX: "hidden",
                            whiteSpace: "nowrap",
                            color: drawer ? colors.text.white : colors.text.black,
                        }}
                    >
                        {" "}
                        {new Date(Number(notification.datetime)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>
            </Box>
            <Box sx={{ width: isMobile ? "10%" : "fit-content" }}>
                {drawer && findBy === undefined && (
                    <IconButton onClick={onClick} sx={{ padding: 0 }}>
                        <ArrowForwardIos fontSize="small" sx={{ color: drawer ? colors.text.white : colors.text.black }} />
                    </IconButton>
                )}
                {!drawer && findBy === undefined && (
                    <IconButton onClick={onClick} sx={{ padding: 0 }}>
                        <ArrowForwardIos fontSize="small" sx={{ color: drawer ? colors.text.white : colors.text.black }} />
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}
