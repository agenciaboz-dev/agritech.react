import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { useIo } from "../../../hooks/useIo"
import { Box, Skeleton, Tab, Tabs } from "@mui/material"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useUser } from "../../../hooks/useUser"
import { useKits } from "../../../hooks/useKits"
import { useArray } from "burgos-array"

interface MyCallsProps {}

export const MyCalls: React.FC<MyCallsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { user } = useUser()
    const { listKits } = useKits()

    const skeletons = useArray().newArray(3)

    const [tab, setTab] = React.useState("day")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const kitsEmployee = listKits
        .filter((kit) => kit.employees?.some((employee) => employee.id === user?.employee?.id))
        .map((kit) => kit.calls)

    const callsEmployee = kitsEmployee.flat()

    const sorted_waiting = callsEmployee.sort((a, b) => Number(a.forecast) - Number(b.forecast))
    const sorted_progress = callsEmployee
        .filter((item) => new Date(Number(item.forecast)).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))
        .sort((a, b) => Number(a.forecast) - Number(b.forecast))

    useEffect(() => {
        header.setTitle("Meus chamados")
    }, [])
    useEffect(() => {
        console.log({ sorteados: sorted_progress })
    }, [sorted_progress])

    useEffect(() => {
        if (listKits.length == 0) io.emit("kit:list")
        console.log(listKits)
    }, [listKits])

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
                    <Tab sx={tabStyle} value="day" label="Chamados do dia" />
                    <Tab sx={tabStyle} value="waiting" label="Aguardando" />
                    {/* <Tab sx={tabStyle} value="concluded" label="Concluídos" /> */}
                </Tabs>
                <Box sx={{ width: "100%", height: "82%", overflow: "auto", gap: "1vw" }}>
                    {
                        tab === "waiting" && sorted_waiting.length !== 0
                            ? sorted_waiting?.map((call, index) => <LogsCard key={index} call={call} review />)
                            : tab === "waiting" && (
                                  <Box sx={{ gap: "2vw" }}>
                                      {skeletons.map((_, index) => (
                                          <Skeleton
                                              animation="wave"
                                              variant="rounded"
                                              sx={{ width: 1, height: "7vh" }}
                                              key={index}
                                          />
                                      ))}
                                  </Box>
                              )
                        // <p>Nenhum chamado </p>
                    }

                    {
                        tab === "day" && sorted_progress.length !== 0
                            ? sorted_progress?.map((call, index) => <LogsCard key={index} call={call} review />)
                            : tab === "day" && (
                                  <Box sx={{ gap: "2vw" }}>
                                      {skeletons.map((_, index) => (
                                          <Skeleton
                                              animation="wave"
                                              variant="rounded"
                                              sx={{ width: 1, height: "7vh" }}
                                              key={index}
                                          />
                                      ))}
                                  </Box>
                              )
                        // : (
                        //     <p>Nenhum chamado </p>
                        // )
                    }
                    {/* {tab === "concluded" && kitsEmployee.length !== 0
                        ? kitsEmployee?.map((user, index) => <></>)
                        : tab === "concluded" && <p>Nenhum chamado </p>} */}
                </Box>
            </Box>
        </Box>
    )
}
