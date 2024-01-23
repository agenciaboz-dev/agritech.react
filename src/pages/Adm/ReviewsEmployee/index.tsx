import { Box, Tab, Tabs, Avatar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { useIo } from "../../../hooks/useIo"
import { CardUser } from "../../../components/CardUser"
import { useUsers } from "../../../hooks/useUsers"

interface ReviewsEmployeeProps {
    user: User
}

export const ReviewsEmployee: React.FC<ReviewsEmployeeProps> = ({ user }) => {
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
        setListEmployee(
            pendingUsers.filter((user) => user.employee !== null && user.isAdmin === false && user.rejected === null)
        )
        setRequests(pendingUsers.filter((user) => user.isAdmin === false))
    }, [pendingUsers])

    useEffect(() => {
        header.setTitle("Análise de Contas")
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header />
            </Box>

            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    gap: "2vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ alignItems: "center", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
                    <p style={{ padding: "0 2vw", fontSize: "4.55vw" }}>Pendentes</p>
                    <Button
                        size="small"
                        variant="contained"
                        sx={{
                            alignItems: "center",
                            gap: "0vw",
                            backgroundColor: colors.button,
                            color: colors.text.white,
                            textTransform: "none",
                            borderRadius: "5vw",
                            fontSize: "3.0vw",
                            p: "1vw 3vw",
                            width: "fit-content",
                        }}
                        onClick={() => {}}
                    >
                        Ações em massa
                    </Button>
                </Box>
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
                <Box sx={{ width: "100%", height: "82%", overflow: "auto", gap: "1vw" }}>
                    {tab === "requestsEmployee" && listEmployee?.length !== 0
                        ? listEmployee?.map((user) => (
                              <CardUser review user={user} key={user.id} location={`/adm/review/profile/${user.id}`} />
                          ))
                        : tab === "requestsEmployee" && "Nenhum cadastro de colaborador"}
                </Box>
            </Box>
        </Box>
    )
}
