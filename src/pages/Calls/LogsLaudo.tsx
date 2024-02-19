import { Box, IconButton } from "@mui/material"
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
    const navigate = useNavigate()
    const { user } = useUser()
    console.log({ Relatorio: report.id })
    return (
        <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ flexDirection: "column" }}>
                <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                    <p style={{ fontSize: "3vw", color: "gray" }}>{new Date().toLocaleTimeString("pt-br")}</p>
                </Box>
                <p style={{ fontSize: "3.5vw", fontWeight: "600" }}>{`Laudo ${id}`}</p>
                {/* <p style={{ fontSize: "3vw", color: "gray", flexDirection: "column" }}>{talhao.name}</p> */}
            </Box>

            <IconButton
                onClick={() => {
                    if (user?.employee) {
                        if (report && report.stage === "STAGE1") {
                            console.log("sem relatorio")
                            user.isAdmin
                                ? navigate(`/adm/call/${report.call?.id}/stages/${report.id}`)
                                : navigate(`/employee/call/${report.call?.id}/stages/${report.id}`)
                            // call && setSelectedCall(call)
                        } else if (report && report.stage === "STAGE4") {
                            navigate(`/adm/call/${report.call?.id}/report/${report.id}`)
                        } else {
                            // navigate(`/adm/call/${call?.id}/report/${call?.reports && call.reports[0].id}`)
                            console.log("com relatorio")
                            navigate(
                                user.isAdmin
                                    ? `/adm/call/${report.call?.id}/laudo/${report.id}`
                                    : `/employee/call/${report.call?.id}/laudo`
                            )
                            // call && setSelectedCall(call)
                        }
                    }
                }}
            >
                <IoIosArrowForward style={{ width: "5vw", height: "5vw" }} />
            </IconButton>
        </Box>
    )
}
