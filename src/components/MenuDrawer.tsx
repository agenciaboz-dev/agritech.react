import React, { useEffect } from "react"
import { Avatar, Box, Drawer, IconButton, MenuItem, SwipeableDrawer, SxProps, useMediaQuery, useRadioGroup } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigationItems = useNavigationList()
    const admDrawerItems = navigationItems.admin.drawer
    const employeeDrawer = navigationItems.employee.drawer
    const producerDrawer = navigationItems.producer.drawer

    const navigate = useNavigate()

    const { open, setOpen } = useMenuDrawer()
    const { user, logout } = useUser()

    const iconStyle: SxProps = {
        width: isMobile ? "5vw" : "2vw",
        height: "auto",
    }

    const iconButtonStyle: SxProps = {
        height: isMobile ? "9vw" : "2vw",
        width: isMobile ? "9vw" : "2vw",
        padding: "1.5vw",
        color: "#fff",
    }

    const menuItemStyle: SxProps = {
        fontSize: isMobile ? "3.8vw" : "1rem",
        fontFamily: "MalgunGothicBold",
        height: "fit-content",
        alignItems: "center",
        padding: isMobile ? "0 4vw" : "1vw",
        color: "#fff",
        gap: isMobile ? "2vw" : "1vw",
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <SwipeableDrawer
            onOpen={() => setOpen(true)}
            anchor={"right"}
            open={open}
            disableSwipeToOpen
            onClose={handleClose}
            PaperProps={{
                sx: {
                    padding: isMobile ? "6vw 3vw" : "1vw",
                    width: isMobile ? "75vw" : "25vw",
                    height: "100%",
                    borderTopLeftRadius: isMobile ? "10vw" : "2vw",
                    borderBottomLeftRadius: isMobile ? "10vw" : "2vw",
                    overflowX: "hidden",
                    backgroundColor: "#232323",
                    justifyContent: "space-between",
                },
            }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box>
                <Box sx={{ justifyContent: "space-between", width: "100%", padding: isMobile ? "4vw" : "1vw" }}>
                    <IconButton color="default" sx={iconButtonStyle} onClick={handleClose}>
                        <KeyboardBackspaceIcon sx={iconStyle} />
                    </IconButton>
                    <Box sx={{ alignItems: "center", gap: isMobile ? "6vw" : "1vw" }}>
                        {/* <Avatar src={user?.image} sx={{ width: "50vw", height: "50vw", alignSelf: "center" }} /> */}
                        <Avatar
                            src={user?.image}
                            sx={{ width: isMobile ? "50vw" : "10vw", height: isMobile ? "50vw" : "10vw", alignSelf: "center" }}
                        />
                        <p style={{ color: "#fff", fontSize: isMobile ? "5vw" : "2rem" }}>{user?.name}</p>
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "column", paddingTop: isMobile ? "4vw" : "1vw" }}>
                    {user?.isAdmin
                        ? admDrawerItems.map((menu) => (
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
                          ))
                        : user?.employee
                        ? employeeDrawer.map((menu) => (
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
                          ))
                        : producerDrawer.map((menu) => (
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

            <Box sx={{ width: "100%", alignItems: "end" }}>
                {/* <MenuItem
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
                </MenuItem> */}
                <MenuItem
                    sx={{
                        fontSize: isMobile ? "3.8vw" : "1.2rem",
                        height: "fit-content",
                        padding: isMobile ? "0 4vw" : "1vw",
                        marginTop: "auto",
                        fontFamily: "MalgunGothicBold",
                        color: "#fff",
                        gap: "1.5vw",
                        width: "100%",
                        justifyContent: "end",
                    }}
                    onClick={() => {
                        logout()
                        handleClose()
                    }}
                >
                    <LogoutIcon sx={{ color: "#fff", width: isMobile ? "6vw" : "2vw", height: "auto" }} />
                </MenuItem>
            </Box>
        </SwipeableDrawer>
    )
}
