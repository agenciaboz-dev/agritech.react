import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Box, Skeleton, useMediaQuery } from "@mui/material"
import { Header } from "../../components/Header"
import { TitleComponents } from "../../components/TitleComponents"
import { useNavigate, useParams } from "react-router-dom"
import { useCall } from "../../hooks/useCall"
import { LogsLaudo } from "./LogsLaudo"
import { useIo } from "../../hooks/useIo"
import { useReports } from "../../hooks/useReports"
import { Report } from "../../definitions/report"
import { useArray } from "burgos-array"

interface ListLaudosProps {
    user: User
}

export const ListLaudos: React.FC<ListLaudosProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const navigate = useNavigate()
    const { callid } = useParams()
    const { listReports } = useReports()

    const skeletons = useArray().newArray(3)
    const { listCalls } = useCall()

    useEffect(() => {
        if (listCalls.length == 0) io.emit("call:listApproved")
        if (listReports.length == 0) io.emit("report:list")
        console.log(listCalls)
        console.log(listReports)
    }, [])

    const selectedCall = listCalls.find((item) => item.id === Number(callid))
    const [sortedReports, setSortedReports] = useState<Report[]>([])

    useEffect(() => {
        listReports &&
            setSortedReports(
                listReports?.filter((item) => item.callId === Number(callid)).sort((a, b) => Number(a.date) - Number(b.date))
            )
    }, [listReports])
    useEffect(() => {
        console.log(listCalls)
    }, [listCalls])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header
                    back
                    location={
                        user?.isAdmin
                            ? `/adm/producer/${selectedCall?.producer?.id}/${selectedCall?.talhao?.tillage?.id}`
                            : // : `/employee/producer/${selectedCall?.producer?.id}/${selectedCall?.talhao?.tillage?.id}`
                              "/employee/requests"
                    }
                />
            </Box>

            <Box
                style={{
                    padding: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    gap: isMobile ? "5vw" : "1vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <TitleComponents
                    title="Relatórios"
                    style={{ fontSize: isMobile ? "5vw" : "1.5rem" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Cliente"
                    click={() =>
                        navigate(
                            user.isAdmin
                                ? `/adm/profile/${selectedCall?.producer?.user?.id}`
                                : `/employee/profile/${selectedCall?.producer?.user?.id}`
                        )
                    }
                    variant
                />
                <Box
                    sx={{
                        gap: isMobile ? "4vw" : "1vw",
                        overflowY: "auto",
                        // paddingBottom: "400vh",
                        paddingBottom: "40vh",
                    }}
                >
                    {sortedReports.length != 0
                        ? sortedReports?.map((item, index) => (
                              <LogsLaudo key={index} id={index + 1} report={item} talhao={item.talhao} />
                          ))
                        : skeletons.map((_, index) => (
                              <Box sx={{ flexDirection: "column", justifyContent: "start", gap: "2vw" }} key={index}>
                                  <Skeleton
                                      variant="rounded"
                                      animation="wave"
                                      sx={{ width: isMobile ? "28vw" : "56vw", height: "3vw" }}
                                  />
                                  <Skeleton
                                      variant="rounded"
                                      animation="wave"
                                      sx={{ width: isMobile ? "40vw" : "80vw", height: "5vw" }}
                                  />
                              </Box>
                          ))}
                </Box>
            </Box>
        </Box>
    )
}
