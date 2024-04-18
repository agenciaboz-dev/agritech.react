import { Avatar, Box, IconButton, Skeleton, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { useParams } from "react-router"
import { tabStyle } from "../../style/tabStyle"
import { WeatherComponent } from "../../components/WeatherComponent"
import { useNavigate } from "react-router-dom"
import { OpenCallBox, ProgressCall } from "../../components/OpenCallBox"
import { useUser } from "../../hooks/useUser"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useCall } from "../../hooks/useCall"
import { Call } from "../../definitions/call"
import { content, progress } from "../../tools/contenModals"
import { LogsCard } from "./LogsCard"
import { PiPlant } from "react-icons/pi"
import "../../style/styles.css"
import GeoImage from "../../assets/default.png"
import { useArray } from "burgos-array"

interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { tillageid, producerid } = useParams()
    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const { addCallApprove } = useCall()
    const skeletons = useArray().newArray(3)

    const [loading, setLoading] = useState(false)

    const [tillageSelect, setTillageSelect] = useState<Tillage>()
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)

    const [listTillages, setListTillages] = useState<Tillage[]>([])
    const [tillageUpdate, setTillageUpdate] = useState<Boolean>(false)

    useEffect(() => {
        io.emit("tillage:list")

        io.on("tillage:list:success", (data: Tillage[]) => {
            if (user?.employee) {
                if (producerid) {
                    const listTillagesId = data.filter((item) => item.producerId === Number(producerid)) //lista de lavoura do respectivo usuário employee ou adm
                    setListTillages(listTillagesId)
                    setTillageUpdate(true)
                }
            }
        })
        io.on("tillage:list:error", () => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
        })

        return () => {
            io.off("tillage:list:success")
            io.off("tillage:list:error")
        }
    }, [])

    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()
    const [selectedAvatar, setSelectedAvatar] = useState(0)

    const [weatherData, setWeatherData] = useState<CurrentConditions>()
    const [icon, setIcon] = useState<string>("")

    const toggleSelection = (talhao: Talhao) => {
        if (selectedAvatar === talhao.id) {
            setSelectedAvatar(talhao.id)
        } else {
            setSelectedAvatar(talhao.id)
            setSelectedTalhao(talhao)
            setSelectedCall(null)
        }
    }

    const [call, setCall] = useState<Call>()

    const [tillageSelectProd, setTillageSelectProd] = useState<Tillage>()

    const [callStatus, setCallStatus] = useState(false)

    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        const findTillage = listTillages.find((item) => item.id === Number(tillageid))
        setTillageSelectProd(findTillage)
        setTillageSelect(findTillage)
    }, [tillageid])

    useEffect(() => {
        io.emit("talhao:cover", Number(tillageid))

        io.on("talhao:cover:success", (data) => {
            setTillageSelect(data)
        })

        return () => {
            io.off("talhao:cover:success")
        }
    }, [tillageid])

    useEffect(() => {
        console.log(call)
        selectedCall ? setCallStatus(true) : setCallStatus(false)
        call && setSelectedCall(call)
    }, [call])

    useEffect(() => {
        setCallStatus(false)
    }, [selectedAvatar])

    useEffect(() => {
        header.setTitle(!tillageSelect ? `Informações` : tillageSelect.name)
    }, [tillageSelect])

    useEffect(() => {
        io.on(user?.isAdmin ? "adminCall:creation:success" : "call:creation:success", (data: any) => {
            console.log({ chamadoAberto: data })
            addCallApprove(data)
            setLoading(false)
            setCall(data)
            setSelectedCall(data)
            snackbar({
                severity: "success",
                text: !user?.isAdmin ? "Chamado aberto! Aguarde a aprovação." : "Chamado aberto!",
            })
        })
        io.on(user?.isAdmin ? "adminCall:creation:failed" : "call:creation:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Algo deu errado" })
            setLoading(false)
        })
        io.on("call:update:failed", (error) => {
            console.log({ chamadoAberto: error })
            setLoading(false)
        })
        return () => {
            io.off("adminCall:creation:success")
            io.off("adminCall:creation:failed")
            io.off("call:creation:success")
            io.off("call:creation:failed")
        }
    }, [])

    useEffect(() => {
        tillageSelect?.address.city && io.emit("weather:find", { data: tillageSelect?.address.city })

        io.on("weather:find:success", (data: any) => {
            setWeatherData(data.currentConditions)
            setIcon(data.currentConditions.icon)
        })
        io.on("weather:find:failed", (error: any) => {
            console.log(error)
        })

        return () => {
            io.off("weather:find:success")
            io.off("weather:find:failed")
        }
    }, [tillageSelect])

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
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                <Header
                    back
                    location={
                        user?.producer !== null
                            ? "/producer/tillages"
                            : user?.isAdmin
                            ? `/adm/producer/${producerid}`
                            : `/employee/producer/${producerid}`
                    }
                />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#353535",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    gap: "1vw",
                    overflow: "hidden",
                    marginTop: "1.5vw",
                }}
            >
                <Box
                    sx={{
                        p: "2vw 4vw",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {!selectedTalhao ? (
                        <Skeleton sx={{ width: 0.5, height: "8vw" }} />
                    ) : (
                        <p
                            style={{
                                fontSize: "1.2rem",
                                color: colors.text.white,
                                fontFamily: "MalgunGothic2",
                                fontWeight: "bold",
                            }}
                        >
                            {!user?.producer ? selectedTalhao?.name : ""}
                        </p>
                    )}
                </Box>
                {tillageSelect?.talhao?.length !== 0 ? (
                    <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", overflow: "auto", p: "0vw 3vw 3vw" }}>
                        {tillageSelect?.talhao
                            ? tillageSelect?.talhao?.map((item, index) => (
                                  <Box sx={{ alignItems: "center" }} key={index}>
                                      <Avatar
                                          src={item.cover || GeoImage}
                                          style={{
                                              width: "24vw",
                                              height: "34vw",
                                              fontSize: "4vw",
                                              fontFamily: "MalgunGothic2",
                                              marginLeft: "0vw",
                                              borderRadius: "8vw",
                                              border: selectedTalhao?.id === item.id ? `5px solid ${colors.secondary}` : "",
                                          }}
                                          onClick={() => (selectedTalhao?.id !== item.id ? toggleSelection(item) : () => {})}
                                      />
                                      <p style={{ fontSize: "0.9rem", textAlign: "center", color: colors.text.white }}>
                                          {item.name}
                                      </p>
                                  </Box>
                              ))
                            : skeletons.map((_, index) => (
                                  <Box sx={{ alignItems: "center", gap: "2vw" }} key={index}>
                                      <Skeleton
                                          animation="wave"
                                          variant="rounded"
                                          sx={{ width: "24vw", height: "34vw", borderRadius: "8vw" }}
                                      />
                                      <Skeleton animation="wave" variant="rounded" sx={{ width: "23vw", height: "3vw" }} />
                                  </Box>
                              ))}
                    </Box>
                ) : (
                    <Box sx={{ p: "2vw 4vw 8vw" }}>
                        <p style={{ fontSize: "4vw", color: colors.text.white }}>Nenhum talhão cadastrado.</p>
                    </Box>
                )}

                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                        gap: "0vw",
                        height: "100%",
                    }}
                >
                    <WeatherComponent dataWeather={weatherData} icon={icon} />

                    {selectedAvatar === 0 && tillageSelect?.talhao?.length !== 0 ? (
                        <p style={{ marginTop: "4vw" }}>Selecione um talhão</p>
                    ) : (
                        <>
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
                                {/* <Tab sx={{ ...tabStyle, width: "50%" }} value="history" label="Histórico" /> */}
                                <Tab sx={{ ...tabStyle, width: "50%" }} value="calls" label="Chamados" />
                            </Tabs>
                            {tab === "calls" && selectedTalhao?.calls.length === 0 ? (
                                <OpenCallBox
                                    click={() => navigate("/adm/call/new")}
                                    data={content}
                                    callStatus={callStatus}
                                    call={selectedTalhao.calls[0]}
                                    talhao={selectedTalhao}
                                    tillage={tillageSelect}
                                    user={user}
                                    setSelectedCall={() => {}}
                                />
                            ) : tab === "calls" && selectedCall && selectedCall.reports?.length === 0 ? (
                                <ProgressCall
                                    user={user}
                                    click={
                                        () => {}
                                        // navigate(
                                        //     user?.producer !== null
                                        //         ? `/producer/call/${call?.id}`
                                        //         : selectedCall?.stage === 4
                                        //         ? user.isAdmin
                                        //             ? `/adm/call/${selectedCall?.id}/laudo`
                                        //             : `/employee/call/${selectedCall?.id}/laudo`
                                        //         : user.isAdmin
                                        //         ? `/adm/call/${selectedCall?.id}/report`
                                        //         : `/employee/call/${call?.id}/report`
                                        // )
                                    }
                                    data={progress}
                                    call={selectedCall}
                                    tillage={tillageSelectProd}
                                    setSelectedCall={setSelectedCall}
                                />
                            ) : (
                                tab === "calls" && (
                                    <Box sx={{ overflowY: "auto", height: "60%", pb: "8vh", gap: "3vw", pt: "2.5vw" }}>
                                        {selectedTalhao?.calls.length !== 0
                                            ? selectedTalhao?.calls.map((item, index) => (
                                                  <LogsCard
                                                      user={user}
                                                      key={index}
                                                      call={item}
                                                      talhao={selectedTalhao}
                                                      tillage={tillageSelect}
                                                      setSelectedCall={setSelectedCall}
                                                  />
                                              ))
                                            : skeletons.map((_, index) => (
                                                  <Skeleton key={index} variant="rounded" animation="wave" />
                                              ))}
                                    </Box>
                                )
                            )}
                            {tillageSelect?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
                            )}
                            {/* {tab === "history" && <p>Nenhum Registro</p>} */}
                        </>
                    )}
                    <IconButton
                        sx={{
                            bgcolor: colors.button,
                            width: "12vw",
                            height: "12vw",
                            borderRadius: "10vw",
                            position: "absolute",
                            bottom: "22vw",
                            right: "5vw",
                        }}
                        onClick={() =>
                            navigate(
                                user?.isAdmin
                                    ? `/adm/producer/${tillageSelect?.producerId}/${tillageSelect?.id}/new_talhao`
                                    : `/employee/producer/${tillageSelect?.producerId}/${tillageSelect?.id}/new_talhao`
                            )
                        }
                    >
                        <PiPlant color={"#fff"} style={{ width: "6vw", height: "6vw" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
