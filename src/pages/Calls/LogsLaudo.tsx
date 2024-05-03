import { Box, IconButton, Skeleton, useMediaQuery } from "@mui/material"
import React, { useEffect } from "react"
import { ActionIcon, Group, Menu } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { IoIosArrowForward } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Call } from "../../definitions/call"
import { useKits } from "../../hooks/useKits"
import { useUsers } from "../../hooks/useUsers"
import { Report } from "../../definitions/report"

interface LogsLaudoProps {
    report: Report
    talhao?: Talhao
    tillage?: Tillage
    id: number
    setSelectedCall?: (value: Call) => void
}

export const LogsLaudo: React.FC<LogsLaudoProps> = ({ report, talhao, id, tillage, setSelectedCall }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const { user } = useUser()
    useEffect(() => {
        console.log(report.stage)
    }, [report])
    return (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: isMobile ? "2vw" : "1vw" }}>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray" }}>
                        {new Date(Number(report.date)).toLocaleDateString("pt-br")} - {new Date(Number(report.hour)).toLocaleTimeString("pt-br")}
                    </p>
                </Box>
                <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem", fontWeight: "600" }}>{`Laudo ${id}`}</p>
                {/* <p style={{ fontSize: isMobile ? "3vw" : "1rem", color: "gray", flexDirection: "column" }}>{talhao.name}</p> */}
            </Box>

            <IconButton
                onClick={() => {
                    if (user?.employee) {
                        if ((report && report.stage === 1) || report.stage === 2) {
                            console.log({ Report: report })
                            user.isAdmin
                                ? navigate(`/adm/call/${report.call?.id}/stages/${report.id}`)
                                : navigate(`/call/${report.call?.id}/stages/${report.id}`)
                            // call && setSelectedCall(call)
                        } else if (report && report.stage === 4) {
                            console.log("report finalizado")
                            navigate(
                                user.isAdmin
                                    ? `/adm/call/${report.call?.id}/report/${report.id}`
                                    : `/employee/call/${report.call?.id}/report/${report.id}`
                            )
                        } else if (report && report.stage === 3) {
                            // navigate(`/adm/call/${call?.id}/report/${call?.reports && call.reports[0].id}`)
                            console.log({ Relatorio_aqui: report })
                            navigate(
                                user.isAdmin
                                    ? `/adm/call/${report.call?.id}/laudo/${report.id}`
                                    : `/employee/call/${report.call?.id}/laudo/${report.id}`
                            )
                            // call && setSelectedCall(call)
                        }
                    }
                }}
            >
                <IoIosArrowForward style={{ width: isMobile ? "5vw" : "2vw", height: isMobile ? "5vw" : "2vw" }} />
            </IconButton>
        </Box>
    )
}
