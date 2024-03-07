import React from "react"
import { Box, Card, Drawer, MenuItem, SxProps } from "@mui/material"
import { useNavigationList } from "../hooks/useNavigationList"
import { useNavigate } from "react-router-dom"
import { useNotificationDrawer } from "../hooks/useNotificationDrawer"
import { colors } from "../style/colors"
import { IoIosArrowDown } from "react-icons/io"
import { useNotification } from "../hooks/useNotifications"
import { LogNotification } from "../pages/Notifications/LogNotification"

interface NotificationDrawerProps {}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({}) => {
    const navigationItems = useNavigationList()
    const notifications = navigationItems.notifications.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useNotificationDrawer()
    const { listNotifications } = useNotification()
    // const { user, logout, setUser } = useUser()

    const menuItemStyle: SxProps = {
        fontSize: "3.8vw",
        fontFamily: "MalgunGothicBold",
        height: "fit-content",
        alignItems: "center",
        padding: "0 4vw",
        color: "#fff",
        gap: "5vw",
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Drawer
            anchor={"right"}
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    padding: "6vw 3vw",
                    width: "78vw",
                    height: "100%",
                    borderTopLeftRadius: "10vw",
                    borderBottomLeftRadius: "10vw",
                    overflowX: "hidden",
                    backgroundColor: "#232323",
                },
            }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box sx={{ p: "4vw 4vw 2vw", flexDirection: "row", justifyContent: "space-between" }}>
                <p style={{ fontWeight: "800", color: colors.text.white, fontFamily: "MalgunGothicBold" }}>
                    {navigationItems.notifications.title}
                </p>
                <p
                    style={{
                        fontWeight: "800",
                        color: colors.text.white,
                        fontFamily: "MalgunGothicBold",
                        fontSize: "3.5vw",
                    }}
                    onClick={() => {
                        navigate("/notifications/list")
                        setOpen(false)
                    }}
                >
                    Ver todas
                </p>
            </Box>
            <Box sx={{ overflowY: "auto", gap: "8vw" }}>
                <Box>
                    <Box sx={{ flexDirection: "column", paddingTop: "2vw", gap: "0.3vw" }}>
                        {listNotifications?.map((item) => (
                            <LogNotification notification={item} drawer />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}
