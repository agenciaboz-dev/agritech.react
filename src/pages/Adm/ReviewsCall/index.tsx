import { Box, Tab, Tabs, Avatar, Button, Skeleton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useCall } from "../../../hooks/useCall"
import { useIo } from "../../../hooks/useIo"
import { useArray } from "burgos-array"
import { useKits } from "../../../hooks/useKits"

interface ReviewsCallProps {
    user: User
}

export const ReviewsCall: React.FC<ReviewsCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
    const skeletons = useArray().newArray(3)
    const { listCalls, listCallsPending } = useCall()

    const [tab, setTab] = useState("pending")
    const sortedPendingCalls = listCallsPending
        .filter((item) => !item.approved)
        .sort((a, b) => Number(a.forecast) - Number(b.forecast))
    const sortedApprovedCalls = listCalls
        .filter((item) => item.status !== "CANCELED")
        .sort((a, b) => Number(a.forecast) - Number(b.forecast))

    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        console.log({ PENDING: sortedPendingCalls })
    }, [sortedPendingCalls])
    useEffect(() => {
        console.log({ APPROVED: listCalls })
    }, [sortedApprovedCalls])

    useEffect(() => {
        header.setTitle("Chamados")

        if (listCalls.length == 0) io.emit("call:listApproved")
        if (listCallsPending.length == 0) io.emit("call:listPending")
        // if (listKits.length == 0) io.emit("kit:list")
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
                    mt: "4vw",
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
                            zIndex: 1,
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
                    <Box sx={{ width: "100%", height: "100%", overflow: "auto", gap: "1vw", pb: "4vh" }}>
                        {tab === "pending" && sortedPendingCalls.length !== 0
                            ? sortedPendingCalls.map((call, index) => <LogsCard key={index} call={call} review />)
                            : tab === "pending" &&
                              sortedPendingCalls.length === 0 &&
                              skeletons.map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      animation="wave"
                                      variant="rounded"
                                      sx={{ width: 1, height: "15vw" }}
                                  />
                              ))}
                        {tab === "calls" && listCalls.length !== 0
                            ? sortedApprovedCalls?.map((call, index) => <LogsCard key={index} call={call} />)
                            : tab === "calls" &&
                              sortedApprovedCalls.length === 0 &&
                              skeletons.map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      animation="wave"
                                      variant="rounded"
                                      sx={{ width: 1, height: "15vw" }}
                                  />
                              ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
