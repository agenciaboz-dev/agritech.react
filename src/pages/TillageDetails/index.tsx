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
import { OpenCallBox, ProgressCall } from "../../components/OpenCallBox"
import { useUser } from "../../hooks/useUser"
import { useProducer } from "../../hooks/useProducer"
import findProducer from "../../hooks/filterProducer"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useCall } from "../../hooks/useCall"
import { Call, CreateCall } from "../../definitions/call"

interface TillageDetailsProps {}

const openCall = {
    title: "Deseja abrir um novo chamado?",
    content:
        "Tem certeza que deseja iniciar um chamado para esse produtor? Uma vez que iniciado, esse chamado ficará registrado no histórico de todos os envolvidos.",
    submitTitle: "Sim, iniciar",
    cancelTitle: "Não, cancelar",
}
const content = {
    title: "Abrir um chamado de pulverização",
    content:
        "Abra um chamada para que nossa equipe encaminhe-se até o local Lavoura 1#, o prazo minino do chamado é de XX Horas segundo o contrato vigente.",
    buttonTitle: "Abrir Chamado",
}
const progress = {
    title: "Chamado em Aberto",
    content:
        "Abra um chamada para que nossa equipe encaminhe-se até o local Lavoura 1#, o prazo minino do chamado é de XX Horas segundo o contrato vigente.",
    hour: "20:00",
}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const { addCallPending, listCalls } = useCall()

    const images = useArray().newArray(5)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState(false)
    const { producerid, tillageid } = useParams()

    const [call, setCall] = useState<Call>()
    //only producer
    const { listTillages, setProducerid, tillageUpdate } = useProducer()

    // //only employee and adm
    const producerSelect = findProducer(producerid || "")
    const tillageSelectProd = user?.producer?.tillage?.find((item) => item.id === Number(tillageid))
    const [callStatus, setCallStatus] = useState(false)

    const [tab, setTab] = React.useState("call")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        const callTillage = listCalls.filter((item) => item.tillageId === Number(tillageid))
        callTillage.length === 0 ? setCallStatus(false) : setCallStatus(true)
        setCall(callTillage[0])
    }, [listCalls, callStatus])

    console.log(call)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const initialValues: CreateCall = {
        approved: user?.isAdmin ? true : false,
        open: new Date().toLocaleDateString("pt-br"),
        comments: "",
        producerId: user?.producer ? user.producer.id || 0 : 0,
        tillageId: tillageSelectProd?.id || 0,
        kitId: undefined,
        userId: Number(user?.id),
    }

    const handleSubmit = (values: CreateCall) => {
        console.log(values)
        io.emit("call:create", values)
        setLoading(true)
    }

    useEffect(() => {
        header.setTitle(!producerSelect ? `Informações` : "Lavoura")
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
            snackbar({ severity: "error", text: "Já existe chamado ativo pra essa lavoura!" })
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
                    location={user?.producer !== null ? "/producer/tillages" : user?.isAdmin ? `/adm/` : `/employee/`}
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
                        {!user?.producer ? tillageUpdate && listTillages[0].name : tillageSelectProd?.name}
                    </p>
                    {callStatus && (
                        <IoIosArrowForward
                            color="white"
                            size={"6vw"}
                            onClick={() =>
                                navigate(
                                    user?.producer !== null ? `/producer/call/${call?.id}` : `/${producerid}/tillage/list`
                                )
                            }
                        />
                    )}
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
                    {tab === "call" && !callStatus ? (
                        <OpenCallBox click={handleClickOpen} data={content} callStatus={callStatus} call={call} />
                    ) : (
                        tab === "call" && (
                            <ProgressCall
                                click={() => navigate("/callDetail")}
                                data={progress}
                                call={call}
                                tillage={tillageSelectProd}
                            />
                        )
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
                </Box>
            </Box>
        </Box>
    )
}
