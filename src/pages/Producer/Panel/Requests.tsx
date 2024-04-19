import { Box, Tab, Tabs, Avatar, Button, Skeleton } from "@mui/material"
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
import { useArray } from "burgos-array"

interface RequestsProps {}

export const Requests: React.FC<RequestsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { user } = useUser()
    const { listCallsPending, listCalls } = useCall()
    // const [callsPending, setCallsPending] = useState<Call[]>([])

    const skeletons = useArray().newArray(3)

    const [tab, setTab] = useState("pending")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const sortedPendingCalls = listCallsPending
        .filter((item) => !item.approved)
        .sort((a, b) => Number(a.open) - Number(b.open))

    const sortedApprovedCalls = listCalls.sort((a, b) => Number(a.open) - Number(b.open))

    useEffect(() => {
        console.log(sortedPendingCalls)
    }, [sortedPendingCalls])
    useEffect(() => {
        header.setTitle("Chamados")
        if (listCalls.length == 0) io.emit("call:listApproved")
        if (listCallsPending.length == 0) io.emit("call:listPending")
    }, [])

    console.log(listCallsPending)

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
                sx={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    gap: "2vw",
                    overflow: "hidden",
                    flexDirection: "column",
                    mt: "2vw",
                }}
            >
                {/* <Box sx={{ alignItems: "center", width: "100%", justifyContent: "space-between", flexDirection: "row" }}>
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
                </Box> */}
                {/*position:relative */}

                <Box sx={{ zIndex: 0, bottom: "11vw", gap: "3vw", height: "92%" }}>
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
                        {tab === "pending" && sortedPendingCalls.length !== 0
                            ? sortedPendingCalls?.map((call, index) => <LogsCard key={index} call={call} variant />)
                            : tab === "pending" && (
                                  <Skeleton animation="wave" variant="rounded" sx={{ width: 1, height: "13vw" }} />
                              )}
                        {tab === "calls" && listCalls.length !== 0
                            ? sortedApprovedCalls?.map((call, index) => <LogsCard key={index} call={call} variant />)
                            : tab === "calls" && (
                                  <Skeleton animation="wave" variant="rounded" sx={{ width: 1, height: "13vw" }} />
                              )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
