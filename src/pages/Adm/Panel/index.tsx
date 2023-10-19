import { Box, Button, Icon, IconButton } from "@mui/material"
import React from "react"
import { colors } from "../../../style/colors"
import drone from "../../../assets/logo/droneIcon.png"
import SearchIcon from "@mui/icons-material/Search"
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
interface PanelProps {
    user: User
}

export const Panel: React.FC<PanelProps> = ({ user }) => {
    return (
        <Box style={{ flex: 1, paddingTop: 22, backgroundColor: colors.button, padding: "4vw" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Box style={{ flexDirection: "row", paddingBottom: 10, alignItems: "center", paddingLeft: 20, gap: 7 }}>
                    <img src={drone} style={{ width: 40 }} />
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
                    <NotificationsNoneIcon sx={{ color: "#fff" }} />
                    <PersonOutlineIcon sx={{ color: "#fff" }} />
                    {/* <IconButton icon={"magnify"} iconColor={colors.text.white} />
                    <IconButton icon={"bell-outline"} iconColor={colors.text.white} />

                    <IconButton
                        icon={"account-circle-outline"}
                        iconColor={colors.text.white}
                        onClick={() => {
                            setvisibleMenu((prevVisible) => !prevVisible)
                        }}
                    /> */}
                </Box>
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.primary,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: "4vw",
                        justifyContent: "space-between",
                        padding: "3vw",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>
                        Configuração de Kits
                    </p>
                    <IconButton>
                        <ArrowForwardIosIcon sx={{ color: "#fff", width: "5vw" }} />
                    </IconButton>
                    {/* <IconButton
                        icon={"chevron-right"}
                        iconColor={colors.text.white}
                        onPress={() => navigation.navigate("SettingsKit")}
                    /> */}
                </Box>
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        flex: 1,
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
                            Funcionários Fixados
                        </p>
                        <Box style={{ width: "100%" }}>
                            {/* <Employee />
                            <Employee /> */}
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
                            >
                                Cadastrar novo funcionário
                            </Button>
                            <Box
                                sx={{
                                    flexDirection: "row",
                                    width: "30%",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <p
                                    style={{
                                        color: colors.primary,
                                        fontSize: "3.5vw",
                                        fontFamily: "MalgunGothic2",
                                        fontWeight: "500",
                                    }}
                                    onClick={() => {}}
                                >
                                    Ver todos
                                </p>
                                <IconButton>
                                    <ArrowForwardIosIcon color="primary" sx={{ width: "3vw" }} />
                                </IconButton>
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
                            Produtores Fixados
                        </p>
                        <Box style={{ width: "100%" }}>
                            {/* <Employee />
                            <Employee /> */}
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
                                >
                                    Cadastrar novo funcionário
                                </Button>
                                <Box
                                    sx={{
                                        flexDirection: "row",
                                        width: "30%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <p
                                        style={{
                                            color: colors.primary,
                                            fontSize: "3.5vw",
                                            fontFamily: "MalgunGothic2",
                                            fontWeight: "500",
                                        }}
                                        onClick={() => {}}
                                    >
                                        Ver todos
                                    </p>
                                    <IconButton>
                                        <ArrowForwardIosIcon color="primary" sx={{ width: "3vw" }} />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    {/* {Object.entries(user).map(([key, value]) => (
                    <Text key={key}>
                    {key}: {value}
                    </Text>
                ))} */}

                    {/* <Button mode="contained" buttonColor={colors.button} onClick={handleLogout}>
                    Sair
                    </Button>
                    <Button mode="contained" buttonColor={colors.button} onClick={handleSnackbar}>
                    snackbar
                </Button> */}
                    <Box style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}></Box>
                </Box>
            </Box>
            {/* <BottomMenu user={user} navigation={navigation} /> */}
        </Box>
    )
}
