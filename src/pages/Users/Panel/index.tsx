import { Avatar, Badge, Box, Button, Icon, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"
import { useNotificationDrawer } from "../../../hooks/useNotificationDrawer"
import { useNotification } from "../../../hooks/useNotifications"

interface PanelUserProps {
    user: User
}

export const PanelUser: React.FC<PanelUserProps> = ({ user }) => {
    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const menu = useMenuDrawer()
    const notificationDrawer = useNotificationDrawer()
    const { recents } = useNotification()

    useEffect(() => {
        io.on("user:disconnect", () => {
            setUser(null)
            console.log(user)
            snackbar({ severity: "info", text: "Desconectado!" })
        })

        return () => {
            io.off("user:disconnect")
        }
    }, [])

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "4vw", height: "100%" }}>
            <Box
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 4vw",
                    height: "100%",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingTop: " 0vw",
                        gap: "1vw",
                        height: "100%",
                    }}
                >
                    <img src={drone} style={{ width: "10vw" }} />
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: "5vw",
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        Painel
                    </p>
                </Box>
                <Box style={{ flexDirection: "row", gap: "4vw", alignItems: "center" }}>
                    <Badge badgeContent={recents?.length} color="success">
                        <NotificationsNoneIcon
                            sx={{ color: "#fff" }}
                            onClick={() => {
                                notificationDrawer.toggle()
                            }}
                        />
                    </Badge>
                    <Avatar
                        src={user.image}
                        style={{ color: "#fff", width: "8vw", height: "8vw" }}
                        onClick={() => {
                            menu.toggle()
                            console.log("abriu")
                        }}
                    />
                </Box>
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.primary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                    height: "100%",
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: "5vw",
                        justifyContent: "space-between",
                        padding: "2vw 5vw",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>Início</p>
                </Box>
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        gap: "10vw",
                        height: "100%",
                    }}
                ></Box>
            </Box>
        </Box>
    )
}
