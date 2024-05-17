import { Avatar, Box, IconButton, Skeleton, Tab, Tabs, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { useParams } from "react-router"
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
import { ButtonAgritech } from "../../components/ButtonAgritech"
import { VscAdd } from "react-icons/vsc"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { tabStyle } = useResponsiveStyles()
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
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
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
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    paddingTop: isMobile ? 10 : "1vw",
                    gap: "1vw",
                    overflow: "hidden",
                }}
            >
                {!selectedTalhao && tillageSelect?.talhao?.length !== 0 ? (
                    <Box
                        sx={{
                            p: isMobile ? "2vw 4vw" : "0 1vw",
                            flexDirection: "row",
                            width: isMobile ? "90%" : "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Skeleton
                            sx={{
                                width: isMobile ? 0.5 : 1,
                                height: isMobile ? "8vw" : "5vw",
                                marginLeft: isMobile ? "1vw" : 0,
                            }}
                        />
                    </Box>
                ) : (
                    tillageSelect?.talhao?.length !== 0 && (
                        <Box
                            sx={{
                                p: isMobile ? "2vw 4vw" : "1vw",
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
                                {!user?.producer ? selectedTalhao?.name : ""}
                            </p>
                            <ButtonAgritech
                                sx={{
                                    width: "20%",
                                    color: colors.text.white,
                                    height: isMobile ? "12vw" : "3vw",
                                    fontSize: isMobile ? "0.7rem" : "1rem",
                                    gap: "1vw",
                                    bgcolor: "gray",
                                    p: 0,
                                    textDecoration: isMobile ? "underline" : "unset",
                                }}
                                onClick={() =>
                                    navigate(
                                        user?.isAdmin
                                            ? `/adm/producer/${tillageSelect?.producerId}/${tillageSelect?.id}/new_talhao`
                                            : `/employee/producer/${tillageSelect?.producerId}/${tillageSelect?.id}/new_talhao`
                                    )
                                }
                            >
                                <VscAdd
                                    color={"#fff"}
                                    style={{ width: isMobile ? "4vw" : "2vw", height: isMobile ? "4vw" : "2vw" }}
                                />
                                Talhão
                            </ButtonAgritech>
                        </Box>
                    )
                )}
                {tillageSelect?.talhao?.length !== 0 ? (
                    <Box
                        sx={{
                            flexDirection: "row",
                            gap: isMobile ? "2vw" : "1vw",
                            width: "100%",
                            overflow: "auto",
                            p: isMobile ? "0vw 3vw 3vw" : "0 1vw 1vw",
                        }}
                    >
                        {tillageSelect?.talhao
                            ? tillageSelect?.talhao?.map((item, index) => (
                                  <Box sx={{ width: "fit-content", alignItems: "center" }} key={index}>
                                      <Avatar
                                          src={item.cover || GeoImage}
                                          style={{
                                              width: isMobile ? "24vw" : "5vw",
                                              height: isMobile ? "34vw" : "5vw",
                                              fontSize: isMobile ? "4vw" : "1.2rem",
                                              fontFamily: "MalgunGothic2",
                                              marginLeft: "0vw",
                                              borderRadius: isMobile ? "8vw" : "2vw",
                                              border: selectedTalhao?.id === item.id ? `5px solid ${colors.secondary}` : "",
                                          }}
                                          onClick={() => (selectedTalhao?.id !== item.id ? toggleSelection(item) : () => {})}
                                      />
                                      <p
                                          style={{
                                              fontSize: "0.9rem",
                                              textAlign: "center",
                                              color: colors.text.white,
                                          }}
                                      >
                                          {item.name}
                                      </p>
                                  </Box>
                              ))
                            : skeletons.map((_, index) => (
                                  <Box sx={{ alignItems: "center", gap: isMobile ? "2vw" : "2px" }} key={index}>
                                      <Skeleton
                                          animation="wave"
                                          variant="rounded"
                                          sx={{
                                              width: isMobile ? "24vw" : "5vw",
                                              height: isMobile ? "34vw" : "5vw",
                                              borderRadius: isMobile ? "8vw" : "2vw",
                                          }}
                                      />
                                      <Skeleton
                                          animation="wave"
                                          variant="rounded"
                                          sx={{ width: isMobile ? "23vw" : "9vw", height: "2vw" }}
                                      />
                                  </Box>
                              ))}
                    </Box>
                ) : (
                    <Box sx={{ p: isMobile ? "8vw 4vw" : "1vw" }}>
                        <p style={{ fontSize: isMobile ? "4vw" : "1vw", color: colors.text.white }}>
                            Nenhum talhão cadastrado.
                        </p>
                    </Box>
                )}
                <Box
                    style={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        overflow: "hidden",
                        gap: "0vw",
                        height: "100%",
                    }}
                >
                    <WeatherComponent dataWeather={weatherData} icon={icon} />

                    {selectedAvatar === 0 && tillageSelect?.talhao?.length !== 0 ? (
                        <p style={{ marginTop: isMobile ? "4vw" : "1vw" }}>Selecione um talhão</p>
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
                            {tillageSelect?.talhao?.length === 0 && tab === "calls" && (
                                <p style={{ marginTop: isMobile ? "4vw" : "1vw" }}>
                                    É necessário ter talhões cadastrados para abrir chamados.
                                </p>
                            )}
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
                                    click={() => {}}
                                    data={progress}
                                    call={selectedCall}
                                    tillage={tillageSelectProd}
                                    setSelectedCall={setSelectedCall}
                                />
                            ) : (
                                tab === "calls" && (
                                    <Box
                                        sx={{
                                            height: "60%",
                                            gap: isMobile ? "3vw" : "1vw",
                                            pt: isMobile ? "2.5vw" : "1vw",
                                            overflowY: "auto",
                                            // paddingBottom: "400vh",
                                            paddingBottom: "40vh",
                                        }}
                                    >
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

                            {/* {tab === "history" && <p>Nenhum Registro</p>} */}
                        </>
                    )}
                    {tillageSelect?.talhao?.length == 0 && (
                        <IconButton
                            sx={{
                                bgcolor: colors.button,
                                width: isMobile ? "12vw" : "3vw",
                                height: isMobile ? "12vw" : "3vw",
                                borderRadius: "50%",
                                position: "absolute",
                                bottom: isMobile ? "22vw" : "13vh",
                                left: isMobile ? "85vw" : "95vw",
                            }}
                            onClick={() =>
                                navigate(
                                    user?.isAdmin
                                        ? `/adm/producer/${tillageSelect?.producerId}/${tillageSelect?.id}/new_talhao`
                                        : `/employee/producer/${producerid}/${tillageid}/new_talhao`
                                )
                            }
                        >
                            <PiPlant
                                color={"#fff"}
                                style={{ width: isMobile ? "6vw" : "100%", height: isMobile ? "6vw" : "100%" }}
                            />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
