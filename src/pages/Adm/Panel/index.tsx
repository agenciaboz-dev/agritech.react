import { Avatar, Badge, Box, Button, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useNavigationList } from "../../../hooks/useNavigationList"
import { BottomNavigation } from "../../../components/BottomNavigation"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import { useNavigate } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { CardUser } from "../../../components/CardUser"
import Logo from "../../../assets/logo/Avatar.png"
import { useNotificationDrawer } from "../../../hooks/useNotificationDrawer"
import PostAddIcon from "@mui/icons-material/PostAdd"
import { useNotification } from "../../../hooks/useNotifications"

interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    const bottomMenu = useNavigationList()
    const io = useIo()
    const { setUser } = useUser()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()

    const menu = useMenuDrawer()
    const notificationDrawer = useNotificationDrawer()
    const { recents } = useNotification()
    const { listUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [listProducer, setListProducer] = useState<User[]>()

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

    useEffect(() => {
        setListEmployee(listUsers?.filter((users) => users.employee !== null && !users.isAdmin))
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])
    useEffect(() => {
        console.log(recents)
    }, [recents])

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "4vw", height: "100%" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 4vw" }}>
                <Box
                    sx={{
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingTop: " 0vw",
                        gap: "1vw",
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
                <Box style={{ flexDirection: "row", gap: "4vw" }}>
                    <SearchIcon sx={{ color: "#fff" }} />
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
                        padding: "1vw 3vw",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>
                        Configuração de Kits
                    </p>
                    <IconButton onClick={() => navigate("/adm/settings-kit")}>
                        <ArrowForwardIosIcon sx={{ color: "#fff", width: "5vw" }} />
                    </IconButton>
                </Box>
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        flex: 1,
                        height: "100%",
                        gap: "10vw",
                    }}
                >
                    <Box sx={{ gap: "4vw" }}>
                        <Box sx={{ gap: "0vw" }}>
                            <p
                                style={{
                                    color: colors.text.black,
                                    fontSize: "4.5vw",
                                    fontFamily: "MalgunGothic2",
                                    textAlign: "left",
                                }}
                            >
                                Colaboradores Fixados
                            </p>
                            <Box style={{ width: "100%" }}>
                                {listEmployee?.length !== 0 &&
                                    listEmployee
                                        ?.slice(0, 3)
                                        .map((user) => (
                                            <CardUser user={user} key={user.id} location={`/adm/calendar/${user.id}`} />
                                        ))}
                            </Box>
                            <Box
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 20,
                                    paddingTop: "2vw",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{
                                        width: "50%",
                                        padding: "2.5vw",
                                        color: colors.text.white,
                                        fontWeight: "500",
                                        fontSize: "3vw",
                                        textTransform: "none",
                                        borderRadius: "10vw",
                                        height: "10vw",
                                    }}
                                    onClick={() => navigate("/adm/new_employee")}
                                >
                                    Cadastrar novo colaborador
                                </Button>
                                <Box
                                    sx={{
                                        flexDirection: "row",
                                        width: "25%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: "1vw",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colors.primary,
                                            fontSize: "3.5vw",
                                            fontFamily: "MalgunGothic2",
                                            fontWeight: "500",
                                        }}
                                        onClick={() => {
                                            navigate("/adm/employees")
                                        }}
                                    >
                                        Ver todos
                                    </p>
                                    <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ gap: "2vw" }}>
                            <p
                                style={{
                                    color: colors.text.black,
                                    fontSize: "4.5vw",
                                    fontFamily: "MalgunGothic2",
                                    textAlign: "left",
                                }}
                            >
                                Clientes Fixados
                            </p>
                            <Box style={{ width: "100%" }}>
                                {listProducer?.length !== 0 &&
                                    listProducer
                                        ?.slice(0, 3)
                                        .map((user) => (
                                            <CardUser user={user} key={user.id} location={`/adm/profile/${user.id}`} />
                                        ))}
                            </Box>
                            <Box
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    gap: 20,
                                }}
                            >
                                <Box
                                    style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingTop: "2vw",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            width: "50%",
                                            padding: "2.5vw",
                                            color: colors.text.white,
                                            fontWeight: "500",
                                            fontSize: "3vw",
                                            textTransform: "none",
                                            borderRadius: "10vw",
                                            height: "10vw",
                                        }}
                                        onClick={() => navigate("/adm/new_producer")}
                                    >
                                        Cadastrar novo cliente
                                    </Button>
                                    <Box
                                        sx={{
                                            flexDirection: "row",
                                            width: "30%",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            gap: "1vw",
                                        }}
                                    >
                                        <p
                                            style={{
                                                color: colors.primary,
                                                fontSize: "3.5vw",
                                                fontFamily: "MalgunGothic2",
                                                fontWeight: "500",
                                            }}
                                            onClick={() => {
                                                navigate("/adm/producers")
                                            }}
                                        >
                                            Ver todos
                                        </p>
                                        <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <IconButton
                        sx={{
                            bgcolor: colors.button,
                            width: "12vw",
                            height: "12vw",
                            borderRadius: "10vw",
                            position: "absolute",
                            bottom: "26vw",
                            right: "7vw",
                        }}
                        onClick={() => navigate("/adm/call/new")}
                    >
                        <PostAddIcon fontSize="medium" sx={{ color: "#fff" }} />
                    </IconButton>

                    <Box sx={{ flexDirection: "row" }}>
                        <BottomNavigation section={bottomMenu.admin} external />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
