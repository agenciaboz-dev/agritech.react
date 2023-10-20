import React from "react"
import { Box, Drawer, IconButton, MenuItem, SxProps } from "@mui/material"
import { useMenuDrawer } from "../hooks/useMenuDrawer"
import { useUser } from "../hooks/useUser"
import { useNavigationList } from "../hooks/useNavigationList"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import QuestionMarkIcon from "@mui/icons-material/QuestionMark"
import { useNavigate } from "react-router-dom"

interface MenuDrawerProps {}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({}) => {
    const menus = Object.entries(useNavigationList())
        .map(([_, value]) => value)
        .sort((a, b) => a.id - b.id)

    const navigate = useNavigate()

    const { open, setOpen } = useMenuDrawer()
    const { user } = useUser()

    const iconStyle: SxProps = {
        width: "5vw",
        height: "auto",
    }

    const iconButtonStyle: SxProps = {
        border: "1px solid black",
        borderRadius: "50%",
        height: "9vw",
        width: "9vw",
        padding: "1.5vw",
    }

    const menuItemStyle: SxProps = {
        fontSize: "5vw",
        height: "fit-content",
        alignItems: "center",
        padding: "0 4vw",
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Drawer
            anchor={"left"}
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: "80vw", overflowX: "hidden" } }}
            // ModalProps={{ BackdropProps: { sx: backdropStyle } }}
            keepMounted
        >
            <Box sx={{ justifyContent: "space-between", width: "100%", padding: "4vw" }}>
                <IconButton color="primary" sx={iconButtonStyle} onClick={handleClose}>
                    <KeyboardBackspaceIcon sx={iconStyle} />
                </IconButton>

                <Box sx={{ gap: "2vw", alignItems: "center", fontSize: "3.5vw" }}>
                    Ajuda
                    <IconButton color="primary" sx={iconButtonStyle}>
                        <QuestionMarkIcon sx={iconStyle} />
                    </IconButton>
                </Box>
            </Box>

            {/*  */}

            <Box sx={{ flexDirection: "column", paddingTop: "4vw" }}>
                {menus
                    .filter((item) => !item.hidden)
                    .map((menu) => (
                        <MenuItem
                            key={menu.location}
                            onClick={() => {
                                handleClose()
                                navigate(menu.location)
                            }}
                            sx={menuItemStyle}
                        >
                            {menu.title}
                        </MenuItem>
                    ))}
            </Box>
            <MenuItem
                sx={{
                    fontSize: "5vw",
                    height: "fit-content",
                    alignItems: "center",
                    padding: "0 4vw",
                    marginTop: "auto",
                }}
                onClick={() => {
                    handleClose()
                }}
            >
                Sair
            </MenuItem>
        </Drawer>
    )
}
