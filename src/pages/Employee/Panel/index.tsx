import { Avatar, Badge, Box, Button, IconButton } from "@mui/material"
import React, { useEffect } from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useMenuDrawer } from "../../../hooks/useMenuDrawer"
import { useNavigate } from "react-router-dom"
import PostAddIcon from "@mui/icons-material/PostAdd"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { CardUser } from "../../../components/CardUser"
import findProducer from "../../../hooks/filterProducer"
import { useNotificationDrawer } from "../../../hooks/useNotificationDrawer"
import { useNotification } from "../../../hooks/useNotifications"
import { useUsers } from "../../../hooks/useUsers"

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
    const { listUsers } = useUsers()

    const team = user.employee?.producers

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
        console.log({ team: team })
    }, [])

    useEffect(() => {
        if (listUsers.length === 0) io.emit("users:list")
        console.log(listUsers)
    }, [listUsers])
    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "4vw", height: "100%", overflow: "hidden" }}>
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
                <Box style={{ flexDirection: "row", gap: "4vw", alignItems: "center" }}>
                    {/* <SearchIcon sx={{ color: "#fff" }} /> */}
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
                    sx={{
                        padding: "4vw",
                        paddingTop: "6vw",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        gap: "10vw",
                    }}
                >
                    <Box sx={{ gap: "2vw" }}>
                        <p
                            style={{
                                color: colors.text.black,
                                fontSize: "4.5vw",
                                fontFamily: "MalgunGothic2",
                                textAlign: "left",
                            }}
                        >
                            Meus Clientes
                        </p>
                        <Box style={{ width: "100%" }}>
                            {team?.length !== 0 ? (
                                team?.slice(0, 4).map(
                                    (producer) =>
                                        producer.user && (
                                            <CardUser
                                                user={producer.user}
                                                key={producer.user.id}
                                                review
                                                location={`/employee/profile/${producer.user.id}`}
                                            />
                                        )
                                    //
                                )
                            ) : (
                                <p>Você não cadastrou nenhum cliente.</p>
                            )}
                        </Box>
                        <Box
                            style={{
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    paddingTop: "2vw",
                                    gap: "1vw",
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
                                    onClick={() => navigate("/employee/new_producer")}
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
                                            navigate("/employee/producers")
                                        }}
                                    >
                                        Ver todos
                                    </p>
                                    <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ gap: "2vw" }}>
                        <Box
                            sx={{
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingRight: "2vw",
                            }}
                        >
                            <p
                                style={{
                                    color: colors.text.black,
                                    fontSize: "4.5vw",
                                    fontFamily: "MalgunGothic2",
                                    textAlign: "left",
                                }}
                            >
                                Equipe
                            </p>
                            <Box
                                sx={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "justify-content",
                                    gap: "1vw",
                                }}
                            >
                                <p
                                    style={{
                                        color: colors.text.black,
                                        fontSize: "3.5vw",
                                        fontFamily: "MalgunGothic2",
                                        fontWeight: "500",
                                    }}
                                    onClick={() => {
                                        navigate("/employee/settings-kit")
                                    }}
                                >
                                    Ver mais
                                </p>
                                <ArrowForwardIosIcon color="primary" sx={{ width: "2vw" }} />
                            </Box>
                        </Box>
                        {/* <Box style={{ width: "100%" }}>
                            {listProducer?.length !== 0 &&
                                listProducer
                                    ?.slice(0, 3)
                                    .map((user) => (
                                        <CardUser user={user} key={user.id} location={`/adm/profile/${user.id}`} />
                                    ))}
                        </Box> */}
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
                    onClick={() => navigate("/call/new")}
                >
                    <PostAddIcon fontSize="medium" sx={{ color: "#fff" }} />
                </IconButton>
            </Box>
        </Box>
    )
}
