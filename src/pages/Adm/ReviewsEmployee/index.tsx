import { Box, Tab, Tabs, Avatar, Button, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { useIo } from "../../../hooks/useIo"
import { CardUser } from "../../../components/CardUser"
import { useUsers } from "../../../hooks/useUsers"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface ReviewsEmployeeProps {
    user: User
}

export const ReviewsEmployee: React.FC<ReviewsEmployeeProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const tabStyle = useResponsiveStyles()
    const header = useHeader()
    const io = useIo()

    const [tab, setTab] = React.useState("requestsEmployee")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const { pendingUsers, setPendingUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [requests, setRequests] = useState<User[]>()

    useEffect(() => {
        setListEmployee(pendingUsers.filter((user) => user.employee !== null && user.isAdmin === false && user.rejected === null))
        setRequests(pendingUsers.filter((user) => user.isAdmin === false))
    }, [pendingUsers])

    useEffect(() => {
        if (pendingUsers.length == 0) {
            io.emit("user:pendingApproval")
        }
        header.setTitle("Análise de Contas")
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "10%" : "12%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header />
            </Box>

            <Box
                style={{
                    padding: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    gap: isMobile ? "2vw" : "1vw",
                    overflowY: "auto",
                    flexDirection: "column",
                }}
            >
                {/* <Box sx={{ alignItems: "center", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                    <p style={{ padding: isMobile ? "0 2vw" : "0 1vw", fontSize: isMobile ? "4.55vw" : "1.2rem" }}>Pendentes</p>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            alignItems: "center",
                            gap: "0vw",
                            backgroundColor: colors.button,
                            color: colors.text.white,
                            textTransform: "none",
                            borderRadius: isMobile ? "5vw" : "2vw",
                            fontSize: isMobile ? "3vw" : "1rem",
                            p: isMobile ? "1vw 3vw" : "1vw",
                            width: "fit-content",
                        }}
                        onClick={() => {}}
                    >
                        Ações em massa
                    </Button>
                </Box> */}
                <Tabs
                    value={tab}
                    onChange={changeTab}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="tabs"
                    variant="scrollable"
                    scrollButtons="auto"
                    allowScrollButtonsMobile
                >
                    <Tab sx={tabStyle} value="requestsEmployee" label="Cadastro de Colaboradores" />
                </Tabs>
                <Box sx={{ width: "100%", height: isMobile ? "82%" : "fit-content", overflow: "auto", gap: "1vw" }}>
                    {tab === "requestsEmployee" && listEmployee?.length !== 0
                        ? listEmployee?.map((user) => <CardUser review user={user} key={user.id} location={`/adm/review/profile/${user.id}`} />)
                        : tab === "requestsEmployee" && "Nenhum cadastro de colaborador"}
                </Box>
            </Box>
        </Box>
    )
}
