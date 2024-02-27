import { Box, Tab, Tabs, Avatar, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"
import { LogsCard } from "../../Calls/LogsCard"
import { useCall } from "../../../hooks/useCall"
import { useIo } from "../../../hooks/useIo"
import { NewReport, Report } from "../../../definitions/report"
import { LogsReport } from "./LogsReport"
import { SearchField } from "../../../components/SearchField"

interface ReviewsReportsProps {
    user: User
}

export const ReviewsReports: React.FC<ReviewsReportsProps> = ({ user }) => {
    const header = useHeader()
    const io = useIo()

    const [tab, setTab] = useState("pending")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const [reports, setReports] = useState<Report[]>([])
    const [reportsPending, setReportsPending] = useState<Report[]>([])

    useEffect(() => {
        io.emit("report:list")

        io.on("report:list:success", (data: Report[]) => {
            setReports(
                data
                    .filter((item) => item.approved && item.stage === "STAGE4")
                    .sort((a, b) => Number(a.date) - Number(b.date))
            )
            setReportsPending(
                data
                    .filter((item) => !item.approved && item.stage! === "STAGE4")
                    .sort((a, b) => Number(a.date) - Number(b.date))
            )
        })

        return () => {
            io.off("report:list:success")
        }
    }, [reports, reportsPending])

    useEffect(() => {
        header.setTitle("Relatórios")
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
                            zIndex: 1,
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
                        <Tab sx={tabStyle} value="reports" label="Aprovados" />
                    </Tabs>
                    <Box sx={{ width: "100%", height: "100%", overflow: "auto", gap: "1vw" }}>
                        {tab === "pending" && reportsPending.length !== 0
                            ? reportsPending?.map((item, index) => <LogsReport key={index} report={item} review />)
                            : tab === "pending" && "Nenhum relatório pendente"}
                        {tab === "reports" && reports.length !== 0
                            ? reports?.map((item, index) => <LogsReport key={index} report={item} />)
                            : tab === "reports" && "Nenhum relatório."}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
