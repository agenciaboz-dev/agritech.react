import React, { useEffect } from "react"
import { Avatar, Box, Drawer, IconButton, MenuItem, SxProps, useRadioGroup } from "@mui/material"
import { useMenuDrawer } from "../hooks/useMenuDrawer"
import { useUser } from "../hooks/useUser"
import { useNavigationList } from "../hooks/useNavigationList"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import { useNavigate } from "react-router-dom"
import Ios from "../assets/icons/ios-settings.svg"
import avatar from "../assets/logo/Avatar.png"

import LogoutIcon from "@mui/icons-material/Logout"

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({}) => {
    const navigationItems = useNavigationList()
    const admDrawerItems = navigationItems.admin.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useMenuDrawer()
    const { user, logout, setUser } = useUser()

    const iconStyle: SxProps = {
        width: "5vw",
        height: "auto",
    }

    const iconButtonStyle: SxProps = {
        height: "9vw",
        width: "9vw",
        padding: "1.5vw",
        color: "#fff",
    }

    const menuItemStyle: SxProps = {
        fontSize: "3.8vw",
        fontFamily: "MalgunGothicBold",
        height: "fit-content",
        alignItems: "center",
        padding: "0 4vw",
        color: "#fff",
        gap: "2vw",
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
                    width: "75vw",
                    height: "100%",
                    borderTopLeftRadius: "10vw",
                    borderBottomLeftRadius: "10vw",
                    overflowX: "hidden",
                    backgroundColor: "#232323",
                    justifyContent: "space-between",
                },
            }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box>
                <Box sx={{ justifyContent: "space-between", width: "100%", padding: "4vw" }}>
                    <IconButton color="default" sx={iconButtonStyle} onClick={handleClose}>
                        <KeyboardBackspaceIcon sx={iconStyle} />
                    </IconButton>
                    <Box sx={{ alignItems: "center", gap: "6vw" }}>
                        {/* <Avatar src={user?.image} sx={{ width: "50vw", height: "50vw", alignSelf: "center" }} /> */}
                        <Avatar src={avatar} sx={{ width: "50vw", height: "50vw", alignSelf: "center" }} />
                        <p style={{ color: "#fff", fontSize: "5vw" }}>{user?.name}</p>
                    </Box>
                </Box>
                {/*  */}
                <Box sx={{ flexDirection: "column", paddingTop: "4vw" }}>
                    {admDrawerItems.map((menu) => (
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

            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                <MenuItem
                    sx={{
                        fontSize: "3.8vw",
                        height: "fit-content",
                        alignItems: "center",
                        padding: "0 4vw",
                        marginTop: "auto",
                        fontFamily: "MalgunGothicBold",
                        color: "#fff",
                        gap: "1.5vw",
                    }}
                    onClick={() => {
                        handleClose()
                    }}
                >
                    <img src={Ios} style={{ width: "6vw" }} />
                    Configurações
                </MenuItem>
                <MenuItem
                    sx={{
                        fontSize: "3.8vw",
                        height: "fit-content",
                        alignItems: "center",
                        padding: "0 4vw",
                        marginTop: "auto",
                        fontFamily: "MalgunGothicBold",
                        color: "#fff",
                        gap: "1.5vw",
                    }}
                    onClick={() => {
                        logout()
                        handleClose()
                    }}
                >
                    <LogoutIcon sx={{ color: "#fff", width: "6vw" }} />
                </MenuItem>
            </Box>
        </Drawer>
    )
}
