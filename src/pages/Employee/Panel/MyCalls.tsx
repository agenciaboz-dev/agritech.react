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
import { useCall } from "../../../hooks/useCall"
import { SearchField } from "../../../components/SearchField"
import { Call } from "../../../definitions/call"

interface MyCallsProps {}

export const MyCalls: React.FC<MyCallsProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const { user } = useUser()
    const { listKits, loadingSkeleton } = useKits()
    const { listCallsPending } = useCall()

    // Define uma função para filtrar chamados baseada no nome
    const [text, setText] = useState("")
    const [filteredProgress, setFilteredProgress] = useState<Call[]>([])
    const [filteredWaiting, setFilteredWaiting] = useState<Call[]>([])
    const [filteredPending, setFilteredPending] = useState<Call[]>([])

    const skeletons = useArray().newArray(3)
    const [loadingSkeletonsPending, setloadingSkeletonsPending] = useState(false)

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
    const sorted_pending = listCallsPending
        .filter((item) => item.userId === user?.id)
        .sort((a, b) => Number(a.forecast) - Number(b.forecast))

    useEffect(() => {
        header.setTitle("Meus chamados")
    }, [])
    useEffect(() => {
        io.on("call:listPending:success", () => {
            setloadingSkeletonsPending(false)
        })
    }, [])

    useEffect(() => {
        console.log({ LOADING: loadingSkeleton })
    }, [])

    useEffect(() => {
        if (listKits.length == 0) io.emit("kit:list")
        if (listCallsPending.length == 0) io.emit("call:listPending")

        // console.log(listKits)
    }, [listKits])
    const filterCallsByName = (calls: Call[], name: string) => {
        return calls.filter((call) => call.producer?.user?.name.toLowerCase().includes(name.toLowerCase()))
    }

    useEffect(() => {
        // Atualiza chamados filtrados quando a lista de chamados ou o texto de pesquisa muda
        const filteredProgress = filterCallsByName(sorted_progress, text)
        const filteredWaiting = filterCallsByName(sorted_waiting, text)
        const filteredPending = filterCallsByName(sorted_pending, text)

        setFilteredProgress(filteredProgress)
        setFilteredWaiting(filteredWaiting)
        setFilteredPending(filteredPending)
    }, [listKits, listCallsPending, text])

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
                <SearchField searchText={text} setSearchText={setText} placeholder="nome do cliente" />
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
                    <Tab sx={tabStyle} value="pending" label="Pendentes" />
                    {/* <Tab sx={tabStyle} value="concluded" label="Concluídos" /> */}
                </Tabs>
                <Box sx={{ width: "100%", height: "82%", gap: "2vw", pt: "1.5vw", overflowY: "auto", pb: "12vh" }}>
                    {tab === "day" && filteredProgress.length > 0 && !loadingSkeleton ? (
                        <Box sx={{ width: "100%", height: "100%", overflowY: "auto", gap: "1vw", pt: "1.5vw" }}>
                            {filteredProgress?.map((call, index) => (
                                <LogsCard key={index} call={call} review />
                            ))}
                        </Box>
                    ) : tab === "day" && loadingSkeleton ? (
                        <Box sx={{ gap: "2vw" }}>
                            {skeletons.map((_, index) => (
                                <Skeleton animation="wave" variant="rounded" sx={{ width: 1, height: "7vh" }} key={index} />
                            ))}
                        </Box>
                    ) : (
                        !loadingSkeleton && filteredProgress.length === 0 && tab == "day" && <p>Nenhum chamado encontrado</p>
                    )}
                    {tab === "waiting" && filteredWaiting.length > 0 && !loadingSkeleton ? (
                        filteredWaiting?.map((call, index) => <LogsCard key={index} call={call} review />)
                    ) : tab === "waiting" && loadingSkeleton ? (
                        <Box sx={{ gap: "2vw" }}>
                            {skeletons.map((_, index) => (
                                <Skeleton animation="wave" variant="rounded" sx={{ width: 1, height: "7vh" }} key={index} />
                            ))}
                        </Box>
                    ) : (
                        tab === "waiting" &&
                        !loadingSkeleton &&
                        filteredWaiting.length === 0 && <p>Nenhum chamado encontrado</p>
                    )}

                    {tab === "pending" && filteredPending.length > 0 && !loadingSkeletonsPending ? (
                        filteredPending?.map((call, index) => <LogsCard key={index} call={call} review />)
                    ) : tab === "pending" && filteredPending.length === 0 && !loadingSkeletonsPending ? (
                        <p>Nenhum chamado encontrado </p>
                    ) : (
                        tab === "pending" &&
                        loadingSkeletonsPending && (
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
                    )}

                    {/* {tab === "concluded" && kitsEmployee.length !== 0
                        ? kitsEmployee?.map((user, index) => <></>)
                        : tab === "concluded" && <p>Nenhum chamado </p>} */}
                </Box>
            </Box>
        </Box>
    )
}
