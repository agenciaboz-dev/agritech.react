import { Box, Tab, Tabs, Avatar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useCall } from "../../../hooks/useCall"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { Call } from "../../../definitions/call"

interface RequestsProps {}

export const Requests: React.FC<RequestsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { user } = useUser()
    const { listCallsPending, listCalls } = useCall()
    const [callsPending, setCallsPending] = useState<Call[]>([])

    const callsApprove = listCalls.filter((item) => item.producerId === user?.producer?.id)

    const [tab, setTab] = useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        header.setTitle("Chamados")
    }, [])
    useEffect(() => {
        setCallsPending(listCallsPending.filter((item) => item.producerId === user?.producer?.id))
    }, [listCallsPending])

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
                    <p style={{ padding: "0 2vw", fontSize: "4.55vw" }}></p>
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
                <Box sx={{ position: "relative", zIndex: 0, bottom: "11vw", gap: "3vw", height: "92%" }}>
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
                        <Tab sx={tabStyle} value="pending" label="Pendentes" />
                        <Tab sx={tabStyle} value="calls" label="Em andamento" />
                    </Tabs>
                    <Box sx={{ width: "100%", height: "100%", overflow: "auto", gap: "1vw" }}>
                        {tab === "pending" && listCallsPending.length !== 0
                            ? callsPending?.map((call, index) => <LogsCard key={index} call={call} variant />)
                            : tab === "pending" && "Nenhum chamado pendente"}
                        {tab === "calls" && listCalls.length !== 0
                            ? callsApprove?.map((call, index) => <LogsCard key={index} call={call} variant />)
                            : tab === "calls" && "Nenhum chamado aberto"}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
