import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { useIo } from "../../../hooks/useIo"
import { Box, Tab, Tabs } from "@mui/material"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useUser } from "../../../hooks/useUser"
import { useKits } from "../../../hooks/useKits"

interface MyCallsProps {}

export const MyCalls: React.FC<MyCallsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { user } = useUser()
    const { listKits } = useKits()

    const [tab, setTab] = React.useState("waiting")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const kitsEmployee = listKits
        .filter((kit) => kit.employees?.some((employee) => employee.id === user?.employee?.id))
        .map((kit) => kit.calls)

    const callsEmployee = kitsEmployee.flat()

    useEffect(() => {
        console.log(callsEmployee)
        header.setTitle("Meus chamados")
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
                    <Tab sx={tabStyle} value="late" label="Atrasados" />
                    <Tab sx={tabStyle} value="waiting" label="Aguardando" />
                    {/* <Tab sx={tabStyle} value="concluded" label="Concluídos" /> */}
                </Tabs>
                <Box sx={{ width: "100%", height: "82%", overflow: "auto", gap: "1vw" }}>
                    {tab === "late" && <p>Nenhum chamado atrasado</p>}
                    {tab === "waiting" && callsEmployee.length !== 0
                        ? callsEmployee?.map((call, index) => <LogsCard key={index} call={call} review />)
                        : tab === "waiting" && <p>Nenhum chamado </p>}
                    {/* {tab === "concluded" && kitsEmployee.length !== 0
                        ? kitsEmployee?.map((user, index) => <></>)
                        : tab === "concluded" && <p>Nenhum chamado </p>} */}
                </Box>
            </Box>
        </Box>
    )
}
