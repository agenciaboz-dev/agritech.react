import React, { useEffect } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Box, Button } from "@mui/material"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { LogNotification } from "./LogNotification"
import { NotificationDrawer } from "../../components/NotificationDrawer"
import { useNotification } from "../../hooks/useNotifications"
import { useUsers } from "../../hooks/useUsers"
import { useKits } from "../../hooks/useKits"
import { useCall } from "../../hooks/useCall"
import { useReports } from "../../hooks/useReports"
import { useTalhao } from "../../hooks/useTalhao"

interface NotificationsListProps {
    user: User
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ user }) => {
    const header = useHeader()
    const { listNotifications } = useNotification()
    const { listUsers } = useUsers()
    const { listKits } = useKits()
    const { listCalls } = useCall()
    const { listReports } = useReports()
    const { listTalhao } = useTalhao()

    useEffect(() => {
        console.log({ usuários: listUsers })
    }, [listUsers])

    useEffect(() => {
        header.setTitle("Notificações")
        console.log(listNotifications)
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflowY: "hidden",
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
                    paddingBottom: "13vw",
                }}
            >
                <Header back location={user.isAdmin ? "/adm" : user.producer !== null ? "/producer" : "/employee"} />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: "5vw",
                        justifyContent: "space-between",
                        padding: "3vw",
                        overflowY: "hidden",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Notificações</p>
                </Box>
                <Box
                    style={{
                        padding: " 3vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        height: "100%",
                        gap: "3vw",
                    }}
                >
                    <Box sx={{ overflowY: "auto", height: "72%", gap: "2vw" }}>
                        {listNotifications?.map((item) => (
                            <LogNotification
                                notification={item}
                                list={item.target_key === "employee" ? listUsers : listKits}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}