import React from "react"
import { Box, Card, Drawer, MenuItem, SxProps } from "@mui/material"
import { useUser } from "../hooks/useUser"
import { useNavigationList } from "../hooks/useNavigationList"
import { useNavigate } from "react-router-dom"
import { useNotificationDrawer } from "../hooks/useNotificationDrawer"
import { colors } from "../style/colors"
import { IoIosArrowDown } from "react-icons/io"

interface NotificationDrawerProps {}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({}) => {
    const navigationItems = useNavigationList()
    const notifications = navigationItems.notifications.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useNotificationDrawer()
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
                    padding: "6vw 4vw",
                    width: "85vw",
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
                >
                    Ver todas
                </p>
            </Box>
            <Box sx={{ overflowY: "auto", gap: "8vw" }}>
                <Box>
                    <Box sx={{ flexDirection: "column", paddingTop: "4vw", gap: "4vw" }}>
                        {notifications.map((menu) => (
                            <MenuItem
                                key={menu.location}
                                onClick={() => {
                                    handleClose()
                                    navigate(menu.location)
                                }}
                                sx={menuItemStyle}
                            >
                                {menu.icon}
                                {menu.title}
                            </MenuItem>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Box
                        sx={{
                            p: "4vw 4vw 2vw",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <p style={{ fontWeight: "800", color: colors.text.white, fontFamily: "MalgunGothicBold" }}>
                            Funcionários Fixados
                        </p>
                        <IoIosArrowDown color={colors.text.white} style={{ width: "6vw", height: "6vw" }} />
                    </Box>
                    <Box sx={{ flexDirection: "column", paddingTop: "4vw", gap: "4vw" }}>
                        {notifications.map((menu) => (
                            <MenuItem
                                key={menu.location}
                                onClick={() => {
                                    handleClose()
                                    navigate(menu.location)
                                }}
                                sx={menuItemStyle}
                            >
                                {menu.icon}
                                {menu.title}
                            </MenuItem>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Box
                        sx={{
                            p: "4vw 4vw 2vw",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <p style={{ fontWeight: "800", color: colors.text.white, fontFamily: "MalgunGothicBold" }}>
                            Produtores Fixados
                        </p>
                        <IoIosArrowDown color={colors.text.white} style={{ width: "6vw", height: "6vw" }} />
                    </Box>
                    <Box sx={{ flexDirection: "column", paddingTop: "4vw", gap: "4vw" }}>
                        {notifications.map((menu) => (
                            <MenuItem
                                key={menu.location}
                                onClick={() => {
                                    handleClose()
                                    navigate(menu.location)
                                }}
                                sx={menuItemStyle}
                            >
                                {menu.icon}
                                {menu.title}
                            </MenuItem>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}
