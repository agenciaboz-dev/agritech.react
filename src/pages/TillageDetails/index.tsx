import {
    Autocomplete,
    Avatar,
    Badge,
    Box,
    IconButton,
    Tab,
    Tabs,
    TextField,
    ThemeProvider,
    createTheme,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { useParams } from "react-router"
// import GeoImage from "../../assets/geo.svg"
import { useArray } from "burgos-array"
import { tabStyle } from "../../style/tabStyle"
import { WeatherComponent } from "../../components/WeatherComponent"
import { DialogConfirm } from "../../components/DialogConfirm"
import { useNavigate } from "react-router-dom"
import { LaudoCall, OpenCallBox, ProgressCall } from "../../components/OpenCallBox"
import { useUser } from "../../hooks/useUser"
import { useProducer } from "../../hooks/useProducer"
import findProducer from "../../hooks/filterProducer"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useCall } from "../../hooks/useCall"
import { Call, CreateCall } from "../../definitions/call"
import { approveCall, content, openCall, progress } from "../../tools/contenModals"
import { LogsCard } from "./LogsCard"
import { PiPlant } from "react-icons/pi"
import { LocalizationProvider, MobileDatePicker, PickersDay } from "@mui/x-date-pickers"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ptBR } from "@mui/x-date-pickers/locales"
import { textField, input } from "../../style/input"
import "../../style/styles.css"
import dayjs, { Dayjs } from "dayjs"
import { useKits } from "../../hooks/useKits"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { useCurrencyMask } from "burgos-masks"
import MaskedInputNando from "../../components/MaskedNando"
import { CurrencyText } from "../../components/CurrencyText"
import { Indicator } from "@mantine/core"
import GeoImage from "../../assets/default.png"

interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { tillageid, producerid } = useParams()
    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const { addCallApprove } = useCall()
    const { listKits } = useKits()

    const [open, setOpen] = useState(false)
    const [openApproved, setOpenApproved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState(false)

    const [tillageSelect, setTillageSelect] = useState<Tillage>()
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)

    const [selectedKit, setSelectedKit] = useState<Kit | null>(null) // Estado para o valor selecionado
    const [kits, setKits] = useState(listKits?.filter((item) => !!item && item.active) as Kit[])
    const [kitValue, setKitValue] = useState("") // Estado para o texto do campo de entrada
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

    const handleKitChange = (event: any, selected: any) => {
        if (selected) {
            setSelectedKit(selected)
            setKitValue(selected.name)
        }
    }
    const getOptionSelected = (option: any, value: any) => option.id === value.id

    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()
    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)

    const [pickHectarePrice, setPickHectarePrice] = useState<string>("")
    const [weatherData, setWeatherData] = useState<CurrentConditions>()
    const [icon, setIcon] = useState<string>("")
    const [loadingIcon, setLoadingIcon] = useState(false)
    const [cover, setCover] = useState<String[]>([])

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

    //only producer
    const [tillageSelectProd, setTillageSelectProd] = useState<Tillage>()
    // const { listTillages, setProducerid } = useProducer()
    // //only employee and adm

    const [callStatus, setCallStatus] = useState(false)

    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        const findTillage = listTillages.find((item) => item.id === Number(tillageid))
        setTillageSelectProd(findTillage)
        setTillageSelect(findTillage)
    }, [tillageid, listTillages])

    useEffect(() => {
        tillageSelect?.talhao?.map((item) => {
            io.emit("tillage:cover", item.id)
        })

        tillageSelect?.talhao?.map((item) => {
            io.on("tillage:cover:success", (data: { tillageId: number; cover: string }) => {
                // if (data.tillageId === tillage.id) {
                //     setCover(data.cover)
                // }
            })
        })

        return () => {
            io.off("tillage:cover:success")
        }
    }, [tillageid])

    useEffect(() => {
        console.log(listTillages)
    }, [listTillages])
    //
    useEffect(() => {
        console.log(call)
        selectedCall ? setCallStatus(true) : setCallStatus(false)
        call && setSelectedCall(call)
    }, [call])

    useEffect(() => {
        setCallStatus(false)
    }, [selectedAvatar])
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleOpenApprove = () => {
        setOpenApproved(true)
    }
    const initialValues: CreateCall = {
        approved: false,
        open: new Date().toLocaleDateString("pt-br"),
        comments: "",
        producerId: user?.producer ? user.producer.id || 0 : Number(producerid),
        talhaoId: selectedTalhao?.id || 0,
        kitId: undefined,
        userId: Number(user?.id),
        hectarePrice: "",
        forecast: call?.forecast || "",
    }

    const handleSubmit = (values: CreateCall) => {
        const data = {
            ...values,
            kitId: Number(selectedKit?.id),
            hectarePrice: unmaskCurrency(pickHectarePrice),
            forecast: dayjs(pickDate).valueOf().toString(),
        }
        console.log(data)
        io.emit(user?.isAdmin ? "admin:call:create" : "call:create", data)
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

    const ServerDay = (props: any) => {
        const { day, outsideCurrentMonth, ...other } = props

        const currentDate = dayjs()
        const isToday = day.isSame(currentDate, "day")
        const isFutureDate = day.isAfter(currentDate, "day")

        if (!isFutureDate && !isToday) {
            return <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        }

        // Retorna null se selectedKit não estiver definido ainda
        if (!selectedKit) {
            return null
        }
        useEffect(() => {
            console.log(selectedKit)
        }, [selectedKit])

        // Lógica para determinar a cor do indicador
        const callsForDay = selectedKit.calls?.filter((call: Call) => {
            const callDate = new Date(Number(call.forecast))
            return (
                callDate.getDate() === day.date() &&
                callDate.getMonth() === day.month() &&
                callDate.getFullYear() === day.year()
            )
        })

        const areaDayCalls =
            callsForDay
                ?.map((item: any) => Number(item.talhao?.area))
                .reduce((prev: number, current: number) => prev + current, 0) || 0

        const totalArea = areaDayCalls + Number(selectedTalhao?.area)

        const indicatorColor =
            callsForDay &&
            callsForDay.length > 0 &&
            selectedKit.hectareDay &&
            (totalArea <= selectedKit.hectareDay ? "#88A486" : colors.delete) // Cor vermelha

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={<Indicator color={indicatorColor || "#88A486"} size={7} offset={5} />}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        )
    }

    useEffect(() => {
        header.setTitle(!tillageSelect ? `Informações` : tillageSelect.name)
        // setProducerid(Number(producerid))
        // console.log(tillageSelect)
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
        // console.log({ location: tillageSelect?.address.city })
        tillageSelect?.address.city && io.emit("weather:find", { data: tillageSelect?.address.city })

        io.on("weather:find:success", (data: any) => {
            setWeatherData(data.currentConditions)
            setIcon(data.currentConditions.icon)
        })
        io.on("weather:find:failed", (data: any) => {})

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
                        // onClick={() =>
                        //     navigate(user?.producer !== null ? `/producer/call/${call?.id}` : `/${producerid}/tillage/list`)
                        // }
                    >
                        Detalhes
                    </p> */}
                </Box>
                {tillageSelect?.talhao?.length !== 0 ? (
                    <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", overflow: "auto", p: "0vw 4vw 8vw" }}>
                        {tillageSelect?.talhao?.map((item, index) => (
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
                                        border: selectedTalhao?.id === item.id ? `5px solid ${colors.secondary}` : "",
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

                    {selectedAvatar === 0 && tillageSelect?.talhao?.length !== 0 ? (
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
                                <Tab sx={{ ...tabStyle, width: "50%" }} value="history" label="Histórico" />
                                <Tab sx={{ ...tabStyle, width: "50%" }} value="calls" label="Chamados" />
                            </Tabs>
                            {tab === "calls" && selectedTalhao?.calls.length === 0 ? (
                                <OpenCallBox
                                    click={user?.isAdmin && callStatus ? handleOpenApprove : handleClickOpen}
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
                                    <Box sx={{ overflowY: "auto", height: "50%" }}>
                                        {selectedTalhao?.calls.map((item, index) => (
                                            <LogsCard
                                                user={user}
                                                key={index}
                                                call={item}
                                                talhao={selectedTalhao}
                                                tillage={tillageSelect}
                                                setSelectedCall={setSelectedCall}
                                            />
                                        ))}
                                    </Box>
                                )
                            )}
                            {tillageSelect?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
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
                                                <Autocomplete
                                                    value={selectedKit}
                                                    getOptionLabel={(option) => option.name}
                                                    options={kits || []}
                                                    onChange={(event, selected) => setSelectedKit(selected)}
                                                    isOptionEqualToValue={getOptionSelected}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Kit"
                                                            value={kitValue}
                                                            onChange={(e) => setKitValue(e.target.value)}
                                                            sx={{ ...textField, ...input }}
                                                        />
                                                    )}
                                                />
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDayjs}
                                                    localeText={
                                                        ptBR.components.MuiLocalizationProvider.defaultProps.localeText
                                                    }
                                                >
                                                    <DemoContainer components={["MobileDatePicker"]} sx={{ color: "#fff" }}>
                                                        <DemoItem label="Previsão da visita">
                                                            <ThemeProvider theme={newTheme}>
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
                                                                    disabled={selectedKit === null ? true : false}
                                                                    slots={{
                                                                        day: ServerDay,
                                                                    }}
                                                                    disablePast
                                                                />
                                                            </ThemeProvider>
                                                        </DemoItem>
                                                    </DemoContainer>
                                                </LocalizationProvider>
                                                <Box sx={{ flexDirection: "row", gap: "2vw", color: colors.text.white }}>
                                                    <p style={{ fontSize: "4vw" }}>Custo por hectare: </p>
                                                    {"  "}
                                                    <p style={{ fontSize: "4vw" }}>
                                                        <CurrencyText value={tillageSelect?.hectarePrice || ""} />
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
                            {user?.isAdmin && (
                                <DialogConfirm
                                    user={user}
                                    open={openApproved}
                                    setOpen={setOpenApproved}
                                    data={approveCall}
                                    click={() => {
                                        setVariant(true)
                                        setOpenApproved(false)
                                        console.log("cria")
                                        navigate(`/adm/calls/${call?.id}`)
                                    }}
                                />
                            )}
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
                        <PiPlant color={"#fff"} sx={{ width: "6vw", height: "6vw" }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    )
}
