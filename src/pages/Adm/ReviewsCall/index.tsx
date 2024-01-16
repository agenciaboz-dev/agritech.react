import { Box, Tab, Tabs, Avatar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useCall } from "../../../hooks/useCall"
import { useIo } from "../../../hooks/useIo"

interface ReviewsCallProps {
    user: User
}

export const ReviewsCall: React.FC<ReviewsCallProps> = ({ user }) => {
    const header = useHeader()
    const io = useIo()
    const { listCallsPending, listCalls } = useCall()

    const [tab, setTab] = useState("pending")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        header.setTitle("Chamados")
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
                <Box sx={{ width: "100%", height: "78%", overflow: "auto", gap: "1vw" }}>
                    {tab === "pending" && listCallsPending.length !== 0
                        ? listCallsPending?.map((call, index) => <LogsCard key={index} call={call} review />)
                        : tab === "pending" && "Nenhum chamado pendente"}
                    {tab === "calls" && listCalls.length !== 0
                        ? listCalls?.map((call, index) => <LogsCard key={index} call={call} review />)
                        : tab === "calls" && "Nenhum chamado aberto"}
                </Box>
            </Box>
        </Box>
    )
}
