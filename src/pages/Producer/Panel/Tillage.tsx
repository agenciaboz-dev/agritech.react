import { Avatar, Box, IconButton, Tab, Tabs, ThemeProvider, createTheme } from "@mui/material"
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
import { useProducer } from "../../../hooks/useProducer"
import { useIo } from "../../../hooks/useIo"
import { PiPlant } from "react-icons/pi"
import { Call, CreateCall } from "../../../definitions/call"
import { OpenCallBox, ProgressCall } from "../../../components/OpenCallBox"
import { LogsCard } from "../../TillageDetails/LogsCard"
import { content, openCall, progress } from "../../../tools/contenModals"
import { DialogConfirm } from "../../../components/DialogConfirm"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker, ptBR } from "@mui/x-date-pickers"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { CurrencyText } from "../../../components/CurrencyText"
import { textField, input } from "../../../style/input"
import dayjs, { Dayjs } from "dayjs"

interface TillageProps {}

export const Tillage: React.FC<TillageProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { user } = useUser()
    const { tillageid } = useParams()
    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()

    const findTillage = user?.producer?.tillage?.find((item) => item.id === Number(tillageid))
    const [weatherData, setWeatherData] = useState<CurrentConditions>()
    const [icon, setIcon] = useState<string>("")
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)
    const [variant, setVariant] = useState(false)

    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)
    const [callStatus, setCallStatus] = useState(false)
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [openApproved, setOpenApproved] = useState(false)

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
        header.setTitle(findTillage ? findTillage?.name : "")
    }, [])

    useEffect(() => {
        // console.log({ location: tillageSelect?.address.city })
        findTillage?.address.city && io.emit("weather:find", { data: findTillage?.address.city })

        io.on("weather:find:success", (data: any) => {
            setWeatherData(data.currentConditions)
            setIcon(data.currentConditions.icon)
        })
        io.on("weather:find:failed", (data: any) => {})

        return () => {
            io.off("weather:find:success")
            io.off("weather:find:failed")
        }
    }, [findTillage])

    const handleClickOpen = () => {
        setOpen(true)
    }

    const initialValues = {
        approved: false,
        open: "",
        comments: "",
        producerId: user?.id,
        talhaoId: selectedTalhao?.id,
        kitId: undefined,
        userId: user?.id,
        hectarePrice: "",
        forecast: "",
    }
    const handleSubmit = (values: any) => {
        const data = {
            ...values,
            forecast: dayjs(pickDate).valueOf().toString(),
        }
        console.log(data)
        io.emit("call:create", data)
        setLoading(true)
    }

    const newTheme = (theme: any) =>
        createTheme({
            ...theme,
            components: {
                MuiPickersToolbar: {
                    styleOverrides: {
                        root: {
                            color: "#fff",
                            // borderRadius: 5,
                            borderWidth: 0,
                            backgroundColor: colors.primary,
                        },
                    },
                },
                MuiPickersMonth: {
                    styleOverrides: {
                        monthButton: {
                            borderRadius: 20,
                            borderWidth: 0,
                            border: "0px solid",
                        },
                    },
                },
                MuiPickersDay: {
                    styleOverrides: {
                        root: {
                            color: colors.primary,
                            borderRadius: 20,
                            borderWidth: 0,
                        },
                    },
                },
            },
        })
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
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
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
                    gap: "1vw",
                }}
            >
                <Box
                    sx={{
                        p: "4vw",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <p
                        style={{
                            fontSize: "5.5vw",
                            color: colors.text.white,
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        {/* {!user?.producer ? tillageSelect?.name : tillageSelectProd?.name} */}
                        {!user?.producer ? selectedTalhao?.name : ""}
                    </p>

                    {/* <p
                        style={{ color: "white", fontSize: "3vw", textDecoration: "underline" }}
                        onClick={() =>
                            navigate(user?.producer !== null ? `/producer/call/${call?.id}` : `/${producerid}/tillage/list`)
                        }
                    >
                        Detalhes
                    </p> */}
                </Box>
                {findTillage?.talhao?.length !== 0 ? (
                    <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", overflow: "auto", p: "0vw 4vw 8vw" }}>
                        {findTillage?.talhao &&
                            findTillage.talhao.map((item, index) => (
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
                        gap: "4vw",
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
                                <Tab sx={{ ...tabStyle, width: "100%" }} value="calls" label="Chamados" />
                            </Tabs>
                            {findTillage?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
                            )}
                            {tab === "calls" && selectedTalhao?.calls.length === 0 ? (
                                <OpenCallBox
                                    click={handleClickOpen}
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
                                    <Box sx={{ overflowY: "auto", height: "50%" }}>
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

                            <DialogConfirm
                                user={user}
                                open={open}
                                setOpen={setOpen}
                                data={openCall}
                                children={
                                    <Box sx={{ gap: "3vw" }}>
                                        {user?.isAdmin && (
                                            <Box sx={{ gap: "2vw" }}>
                                                <DemoItem label="Previsão da visita">
                                                    <MobileDatePicker
                                                        sx={{ ...textField }}
                                                        format="DD/MM/YYYY"
                                                        value={pickDate}
                                                        onChange={(newDate) => {
                                                            if (newDate !== null) {
                                                                setPickDate(newDate)
                                                            }
                                                        }}
                                                        timezone="system"
                                                        disablePast
                                                    />
                                                </DemoItem>
                                                <Box sx={{ flexDirection: "row", gap: "2vw", color: colors.text.white }}>
                                                    <p style={{ fontSize: "4vw" }}>Custo por hectare: </p>
                                                    {"  "}
                                                    <p style={{ fontSize: "4vw" }}>
                                                        <CurrencyText value={findTillage?.hectarePrice || ""} />
                                                    </p>
                                                </Box>
                                            </Box>
                                        )}
                                    </Box>
                                }
                                click={() => {
                                    setVariant(true)
                                    setOpen(false)
                                    handleSubmit(initialValues)
                                }}
                            />
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
                        onClick={() => navigate(`/producer/${findTillage?.id}/new_talhao`)}
                    >
                        <PiPlant color={"#fff"} sx={{ width: "6vw", height: "6vw" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
