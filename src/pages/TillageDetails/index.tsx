import { Autocomplete, Avatar, Box, IconButton, Tab, Tabs, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { useParams } from "react-router"
import GeoImage from "../../assets/geo.svg"
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
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { ptBR } from "@mui/x-date-pickers/locales"
import { textField, input } from "../../style/input"
import "../..//style/styles.css"
import dayjs from "dayjs"
import { useKits } from "../../hooks/useKits"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { useCurrencyMask } from "burgos-masks"
import MaskedInputNando from "../../components/MaskedNando"

interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const { addCallPending, allCalls, addCall } = useCall()
    const { listKits } = useKits()

    const images = useArray().newArray(5)
    const [open, setOpen] = useState(false)
    const [openApproved, setOpenApproved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState(false)

    const [tillageSelect, setTillageSelect] = useState<Tillage>()
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)

    const [selectedKit, setSelectedKit] = useState(null) // Estado para o valor selecionado
    const [kitValue, setKitValue] = useState("") // Estado para o texto do campo de entrada

    const handleKitChange = (event: any, selected: any) => {
        if (selected) {
            setSelectedKit(selected)
            setKitValue(selected.name)
        }
    }
    const getOptionSelected = (option: any, value: any) => option.id === value.id
    const kits =
        listKits?.map((item) => ({
            id: item.id || 0,
            name: item.name,
        })) || []

    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()
    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [pickDate, setPickDate] = useState(null)
    const [pickHectarePrice, setPickHectarePrice] = useState<string>("")

    const toggleSelection = (talhao: Talhao) => {
        if (selectedAvatar === talhao.id) {
            // Se o mesmo avatar já está selecionado, mantenha-o selecionado
            setSelectedAvatar(talhao.id)
        } else {
            // Caso contrário, selecione o novo avatar
            setSelectedAvatar(talhao.id)
            setSelectedTalhao(talhao)
            setSelectedCall(null)
        }
    }

    const { producerid, tillageid } = useParams()
    const [call, setCall] = useState<Call>()

    //only producer
    const [tillageSelectProd, setTillageSelectProd] = useState<Tillage>()
    const { listTillages, setProducerid } = useProducer()
    // //only employee and adm
    const producerSelect = findProducer(producerid || "")

    const [callStatus, setCallStatus] = useState(false)

    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        const findTillage = listTillages.find((item) => item.id === Number(tillageid))
        setTillageSelectProd(findTillage)
        setTillageSelect(findTillage)
    }, [listTillages, tillageid])

    //
    useEffect(() => {
        console.log(call)
        selectedCall ? setCallStatus(true) : setCallStatus(false)
        call && setSelectedCall(call)
        console.log({ selectedCall: selectedCall?.forecast })
    }, [call])

    useEffect(() => {
        console.log(callStatus)
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

    useEffect(() => {
        header.setTitle(!tillageSelect ? `Informações` : tillageSelect.name)
        setProducerid(Number(producerid))
    }, [tillageSelect])

    useEffect(() => {
        io.on(user?.isAdmin ? "adminCall:creation:success" : "call:creation:success", (data: Call) => {
            console.log({ chamadoAberto: data })
            addCall(data)
            setLoading(false)
            setCall(data)
            setSelectedCall(data)
            console.log(data)
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
        console.log({ call_selecioonada: selectedCall })
    }, [selectedCall])
    useEffect(() => {
        console.log(tillageSelect)
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
                        {!user?.producer ? selectedTalhao?.name : "Talhão 1"}
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
                                    src={GeoImage}
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
                    <WeatherComponent />

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
                                    click={() =>
                                        navigate(
                                            user?.producer !== null
                                                ? `/producer/call/${call?.id}`
                                                : selectedCall?.stage === "STAGE4"
                                                ? user.isAdmin
                                                    ? `/adm/call/${selectedCall?.id}/laudo`
                                                    : `/employee/call/${selectedCall?.id}/laudo`
                                                : user.isAdmin
                                                ? `/adm/call/${selectedCall?.id}/report`
                                                : `/employee/call/${call?.id}/report`
                                        )
                                    }
                                    data={progress}
                                    call={selectedCall}
                                    tillage={tillageSelectProd}
                                    setSelectedCall={setSelectedCall}
                                />
                            ) : (
                                tab === "calls" &&
                                selectedTalhao?.calls.map((item, index) => (
                                    <LogsCard
                                        key={index}
                                        call={item}
                                        talhao={selectedTalhao}
                                        tillage={tillageSelect}
                                        setSelectedCall={setSelectedCall}
                                    />
                                ))
                            )}
                            {tillageSelect?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
                            )}
                            {tab === "history" && <p>Nenhum Registro</p>}

                            <DialogConfirm
                                user={user}
                                open={open}
                                setOpen={setOpen}
                                data={openCall}
                                children={
                                    <Box sx={{ gap: "3vw" }}>
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                            localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                        >
                                            <DemoContainer components={["MobileDatePicker"]} sx={{ color: "#fff" }}>
                                                <DemoItem label="Previsão da visita">
                                                    <MobileDatePicker
                                                        sx={{ ...textField }}
                                                        format="D/M/YYYY"
                                                        value={pickDate}
                                                        onChange={(newDate) => setPickDate(newDate)}
                                                        timezone="system"
                                                        className="qzy322-MuiFormControl-root-MuiTextField-root MuiOutlinedInput-input custom-datepicker"
                                                    />
                                                </DemoItem>
                                            </DemoContainer>
                                        </LocalizationProvider>
                                        <TextField
                                            label={"Custo por hectare"}
                                            name="hectarePrice"
                                            value={pickHectarePrice || ""}
                                            sx={{ ...textField, ...input }}
                                            onChange={(e) => setPickHectarePrice(e.target.value)}
                                            required
                                            InputProps={{
                                                inputComponent: MaskedInputNando,
                                                inputProps: {
                                                    mask: useCurrencyMask({ decimalLimit: 6 }),
                                                    inputMode: "numeric",
                                                },
                                            }}
                                        />
                                        {user?.isAdmin && (
                                            <Autocomplete
                                                value={selectedKit}
                                                getOptionLabel={(option) => option.name}
                                                options={kits || []}
                                                onChange={handleKitChange}
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
                                        navigate(`/adm/calls/${call?.id}`)
                                    }}
                                />
                            )}

                            <IconButton
                                sx={{
                                    bgcolor: colors.button,
                                    width: "12vw",
                                    height: "12vw",
                                    borderRadius: "10vw",
                                    position: "absolute",
                                    bottom: "20vw",
                                    right: "8vw",
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
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
