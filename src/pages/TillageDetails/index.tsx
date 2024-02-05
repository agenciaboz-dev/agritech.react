import { Avatar, Box, IconButton, Tab, Tabs } from "@mui/material"
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

interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const { addCallPending, allCalls } = useCall()

    const images = useArray().newArray(5)
    const [open, setOpen] = useState(false)
    const [openApproved, setOpenApproved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState(false)

    const [tillageSelect, setTillageSelect] = useState<Tillage>()
    const [selectedCall, setSelectedCall] = useState<Call | null>(null)

    const [selectedTalhao, setSelectedTalhao] = useState<Talhao>()
    const [selectedAvatar, setSelectedAvatar] = useState(0)

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
        const callTillage = allCalls.filter((item) => item.tillageId === Number(tillageid))
        callTillage.length === 0 ? setCallStatus(false) : setCallStatus(true)
        setCall(callTillage[0])
    }, [allCalls, callStatus])

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
        console.log(values)
        const data = { ...values, hectarePrice: Number(values.hectarePrice) }
        io.emit("call:create", data)
        setLoading(true)
    }

    useEffect(() => {
        header.setTitle(!tillageSelect ? `Informações` : tillageSelect.name)
        setProducerid(Number(producerid))
    }, [tillageSelect])

    useEffect(() => {
        io.on("call:creation:success", (data: Call) => {
            console.log({ chamadoAberto: data })
            addCallPending(data)
            setLoading(false)
            setCall(data)
            snackbar({
                severity: "success",
                text: !user?.isAdmin ? "Chamado aberto! Aguarde a aprovação." : "Chamado aberto!",
            })
        })
        io.on("call:creation:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Algo deu errado" })
            setLoading(false)
        })
        io.on("call:update:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Já existe chamado ativo pra esse talhão!" })
            setLoading(false)
        })
        return () => {
            io.off("call:creation:success")
            io.off("call:creation:failed")
        }
    }, [call, callStatus])

    useEffect(() => {
        console.log({ call_selecioonada: selectedCall })
    }, [selectedCall])
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
                    {selectedAvatar === 0 ? (
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

                            {tab === "history" && <p>Nenhum Registro</p>}
                            {tab === "calls" && selectedCall?.reports?.length !== 0 && selectedCall !== null && (
                                <LaudoCall
                                    user={user}
                                    click={() =>
                                        // navigate(
                                        //     user?.isAdmin
                                        //         ? `/adm/call/${call?.id}/report/${selectedCall?.reports?.id}`
                                        //         : `/employee/call/${call?.id}/report/${selectedCall?.report?.id}`
                                        // )
                                        {}
                                    }
                                    data={progress}
                                    call={call}
                                    tillage={tillageSelectProd}
                                    setSelectedCall={() => {}}
                                />
                            )}
                            <DialogConfirm
                                user={user}
                                open={open}
                                setOpen={setOpen}
                                data={openCall}
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
                            {/* {tab === "calls" && call && (
                        <Box sx={{ height: "50%", overflowY: "auto", p: "2vw" }}>
                            <LogsCard call={call} talhao={selectedAvatar} />
                            <LogsCard call={call} talhao={selectedAvatar} />
                            <LogsCard call={call} talhao={selectedAvatar} />
                        </Box>
                    )} */}
                            {/* <IconButton
                        sx={{
                            bgcolor: colors.button,
                            width: "12vw",
                            height: "12vw",
                            borderRadius: "10vw",
                            position: "absolute",
                            bottom: "26vw",
                            right: "8vw",
                        }}
                        onClick={() =>
                            navigate(
                                user?.isAdmin
                                    ? `/adm/tillage/${tillageSelect?.id}/new_talhao`
                                    : `/employee/tillage/${tillageSelect?.id}/new_talhao`
                            )
                        }
                    >
                        <PiPlant color={"#fff"} sx={{ width: "6vw", height: "6vw" }} />
                    </IconButton> */}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
