import { Avatar, Box, IconButton, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { IoIosArrowForward } from "react-icons/io"
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
    const { producerid, tillageid } = useParams()

    const [call, setCall] = useState<Call>()
    //only producer
    const [tillageSelectProd, setTillageSelectProd] = useState<Tillage>()
    const [tillageSelect, setTillageSelect] = useState<Tillage>()
    const { listTillages, setProducerid } = useProducer()

    // //only employee and adm
    const producerSelect = findProducer(producerid || "")

    const [callStatus, setCallStatus] = useState(false)

    const [tab, setTab] = React.useState("call")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    //retrieve name of newly created tillage
    useEffect(() => {
        const findTillage = listTillages.find((item) => item.id === Number(tillageid))
        setTillageSelectProd(findTillage)
    }, [listTillages, tillageid])
    useEffect(() => {
        const findTillage = listTillages.find((item) => item.id === Number(tillageid))
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
        tillageId: tillageSelectProd?.id || 0,
        kitId: undefined,
        userId: Number(user?.id),
        hectarePrice: "",
    }

    const handleSubmit = (values: CreateCall) => {
        console.log(values)
        const data = { ...values, hectarePrice: Number(values.hectarePrice) }
        io.emit("call:create", data)
        setLoading(true)
    }

    useEffect(() => {
        header.setTitle(!producerSelect ? `Informações` : producerSelect.name)
        setProducerid(Number(producerid))
    }, [producerSelect])

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
                        {!user?.producer ? tillageSelect?.name : tillageSelectProd?.name}
                    </p>
                    {/* {call?.approved && (
                        <IoIosArrowForward
                            color="white"
                            size={"6vw"}
                            onClick={() =>
                                navigate(
                                    user?.producer !== null ? `/producer/call/${call?.id}` : `/${producerid}/tillage/list`
                                )
                            }
                        />
                    )} */}
                </Box>
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%", overflow: "auto", p: "3vw 4vw 8vw" }}>
                    {images.map((item, index) => (
                        <Avatar
                            key={index}
                            src={GeoImage}
                            style={{
                                width: "28vw",
                                height: "38vw",
                                fontSize: "4vw",
                                fontFamily: "MalgunGothic2",
                                marginLeft: "0vw",
                                borderRadius: "8vw",
                            }}
                        />
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
                        <Tab sx={{ ...tabStyle, width: "50%" }} value="call" label="Chamado" />
                    </Tabs>
                    {tab === "call" && (!call?.approved || !callStatus) ? (
                        <OpenCallBox
                            click={user?.isAdmin && callStatus ? handleOpenApprove : handleClickOpen}
                            data={content}
                            callStatus={callStatus}
                            call={call}
                            user={user}
                        />
                    ) : (
                        tab === "call" &&
                        !call?.report && (
                            <ProgressCall
                                user={user}
                                click={() =>
                                    navigate(
                                        user?.producer !== null
                                            ? `/producer/call/${call?.id}`
                                            : call?.stages.length === 3
                                            ? user.isAdmin
                                                ? `/adm/call/${call?.id}/laudo`
                                                : `/employee/call/${call?.id}/laudo`
                                            : user.isAdmin
                                            ? `/adm/call/${call?.id}/report`
                                            : `/employee/call/${call?.id}/report`
                                    )
                                }
                                data={progress}
                                call={call}
                                tillage={tillageSelectProd}
                            />
                        )
                    )}
                    {tab === "history" && <p>Nenhum Registro</p>}
                    {tab === "call" && call?.report && (
                        <LaudoCall
                            user={user}
                            click={() =>
                                navigate(
                                    user?.isAdmin
                                        ? `/adm/call/${call?.id}/report/${call?.report?.id}`
                                        : `/employee/call/${call?.id}/report/${call.report?.id}`
                                )
                            }
                            data={progress}
                            call={call}
                            tillage={tillageSelectProd}
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
                </Box>
            </Box>
        </Box>
    )
}
