import { Box, Tab, Tabs, Avatar } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { useIo } from "../../../hooks/useIo"
import { CardUser } from "../../../components/CardUser"
import { useUsersPending } from "../../../hooks/useUsers"

interface ReviewsProps {
    user: User
}

export const Reviews: React.FC<ReviewsProps> = ({ user }) => {
    const header = useHeader()
    const io = useIo()

    const [tab, setTab] = React.useState("requestsEmployee")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const { pendingUsers, setPendingUsers } = useUsersPending()
    const [listProducer, setListProducer] = useState<User[]>()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [reject, setReject] = useState<User[]>()

    useEffect(() => {
        setListProducer(
            pendingUsers.filter((user) => user.producer !== null && user.isAdmin === false && user.rejected === null)
        )
        setListEmployee(
            pendingUsers.filter((user) => user.employee !== null && user.isAdmin === false && user.rejected === null)
        )
        setReject(pendingUsers.filter((user) => user.approved == false && user.rejected !== null))
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
                    gap: "4vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
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
                    <Tab sx={tabStyle} value="requestsEmployee" label="Cadastro de Funcionários" />
                    <Tab sx={tabStyle} value="requestsProducer" label="Cadastro de Produtores" />
                    {/* <Tab sx={tabStyle} value="approved" label="Aprovados" /> */}
                    <Tab sx={tabStyle} value="reject" label="Reprovados" />
                </Tabs>
                <Box sx={{ width: "100%", height: "82%", overflow: "auto", gap: "1vw" }}>
                    {tab === "requestsEmployee" &&
                        listEmployee?.map((user) => <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />)}
                    {tab === "requestsProducer" &&
                        listProducer?.map((user) => <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />)}
                    {tab === "reject" &&
                        reject?.map((user) => <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />)}
                </Box>
            </Box>
        </Box>
    )
}
