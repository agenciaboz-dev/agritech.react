import { Avatar, Box, IconButton, Skeleton, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { useParams } from "react-router"
import GeoImage from "../../../assets/default.png"
import { tabStyle } from "../../../style/tabStyle"
import { WeatherComponent } from "../../../components/WeatherComponent"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import { useIo } from "../../../hooks/useIo"
import { PiPlant } from "react-icons/pi"
import { Call } from "../../../definitions/call"
import { OpenCallBox, ProgressCall } from "../../../components/OpenCallBox"
import { LogsCard } from "../../TillageDetails/LogsCard"
import { content, progress } from "../../../tools/contenModals"
import { useProducer } from "../../../hooks/useProducer"
import { useArray } from "burgos-array"
import { VscAdd } from "react-icons/vsc"
import { ButtonAgritech } from "../../../components/ButtonAgritech"

interface TillageProps {}

export const Tillage: React.FC<TillageProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { user } = useUser()
    const { listTillages } = useProducer()
    const { tillageid } = useParams()
    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()

    const findTillage = user?.producer?.tillage?.find((item) => item.id === Number(tillageid))
    const [tillageSelect, setTillageSelect] = useState<Tillage>()

    const [weatherData, setWeatherData] = useState<CurrentConditions>()
    const [icon, setIcon] = useState<string>("")

    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)
    const [callStatus, setCallStatus] = useState(false)
    const skeletons = useArray().newArray(3)

    const toggleSelection = (talhao: Talhao) => {
        if (selectedAvatar === talhao.id) {
            setSelectedAvatar(talhao.id)
        } else {
            setSelectedAvatar(talhao.id)
            setSelectedTalhao(talhao)
            setSelectedCall(null)
        }
    }

    useEffect(() => {
        console.log({ OIAAAA: user?.producer?.tillage })
    }, [user])

    useEffect(() => {
        header.setTitle(findTillage ? findTillage?.name : "")
    }, [])

    useEffect(() => {
        findTillage?.address.city && io.emit("weather:find", { data: findTillage?.address.city })

        io.on("weather:find:success", (data: any) => {
            setWeatherData(data.currentConditions)
            setIcon(data.currentConditions.icon)
        })
        io.on("weather:find:failed", (error) => {
            console.log(error)
        })

        return () => {
            io.off("weather:find:success")
            io.off("weather:find:failed")
        }
    }, [findTillage])

    useEffect(() => {
        io.emit("talhao:cover", Number(tillageid))

        io.on("talhao:cover:success", (data) => {
            setTillageSelect(data)
        })

        return () => {
            io.off("tillage:cover:success")
        }
    }, [tillageid])

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
                <Header back location={user?.producer !== null ? "/producer/tillages" : "/producer"} />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#353535",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    gap: "0vw",
                    marginTop: "2vw",
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {!selectedTalhao ? (
                        <Box
                            sx={{
                                p: "2vw 4vw",
                                flexDirection: "row",
                                width: "90%",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Skeleton sx={{ width: 0.5, height: "8vw", marginLeft: "0vw" }} />
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                p: "2vw 4vw",
                                flexDirection: "row",
                                width: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.2rem",
                                    color: colors.text.white,
                                    fontFamily: "MalgunGothic2",
                                    fontWeight: "bold",
                                }}
                            >
                                {user?.producer ? selectedTalhao?.name : ""}
                            </p>
                            <ButtonAgritech
                                sx={{
                                    width: "20%",
                                    color: colors.text.white,
                                    height: "12vw",
                                    fontSize: "0.7rem",
                                    gap: "1vw",
                                    bgcolor: "gray",
                                    p: 0,
                                    textDecoration: "underline",
                                }}
                                onClick={() => navigate(`/producer/${tillageSelect?.id}/new_talhao`)}
                            >
                                <VscAdd color={"#fff"} style={{ width: "4vw", height: "4vw" }} />
                                Talhão
                            </ButtonAgritech>
                        </Box>
                    )}
                </Box>
                {findTillage?.talhao?.length !== 0 ? (
                    <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", overflow: "auto", p: "0vw 4vw 3vw" }}>
                        {tillageSelect?.talhao
                            ? tillageSelect.talhao.map((item, index) => (
                                  <Box sx={{ alignItems: "center" }} key={index}>
                                      <Avatar
                                          src={item.cover || GeoImage}
                                          style={{
                                              width: "28vw",
                                              height: "38vw",
                                              fontSize: "4vw",
                                              fontFamily: "MalgunGothic2",
                                              marginLeft: "0vw",
                                              borderRadius: "8vw",
                                              border: selectedAvatar === item.id ? `5px solid ${colors.secondary}` : "",
                                          }}
                                          onClick={() => (selectedTalhao?.id !== item.id ? toggleSelection(item) : () => {})}
                                      />
                                      <p style={{ fontSize: "3.5vw", color: colors.text.white }}>{item.name}</p>
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

                    {selectedAvatar === 0 && findTillage?.talhao?.length !== 0 ? (
                        <p>Selecione um talhão</p>
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
                            {findTillage?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
                            )}
                            {tab === "calls" && selectedTalhao?.calls.length === 0 ? (
                                <OpenCallBox
                                    click={() => navigate("/call/new")}
                                    data={content}
                                    callStatus={callStatus}
                                    call={selectedTalhao.calls[0]}
                                    talhao={selectedTalhao}
                                    tillage={findTillage}
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
                                    tillage={findTillage}
                                    setSelectedCall={setSelectedCall}
                                />
                            ) : (
                                tab === "calls" && (
                                    <Box sx={{ overflowY: "auto", height: "50%", pt: "2vw" }}>
                                        {selectedTalhao?.calls.map((item, index) => (
                                            <LogsCard
                                                user={user}
                                                key={index}
                                                call={item}
                                                talhao={selectedTalhao}
                                                tillage={findTillage}
                                                setSelectedCall={setSelectedCall}
                                            />
                                        ))}
                                    </Box>
                                )
                            )}

                            {/* {tab === "history" && <p>Nenhum Registro</p>} */}
                        </>
                    )}
                    {tillageSelect?.talhao?.length == 0 && (
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
                            onClick={() => navigate(`/producer/${findTillage?.id}/new_talhao`)}
                        >
                            <PiPlant color={"#fff"} style={{ width: "6vw", height: "6vw" }} />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
