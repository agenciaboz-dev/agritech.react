import { Avatar, Box, IconButton, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { useParams } from "react-router"
import GeoImage from "../../../assets/geo.svg"
import { useArray } from "burgos-array"
import { tabStyle } from "../../../style/tabStyle"
import { WeatherComponent } from "../../../components/WeatherComponent"
import { DialogConfirm } from "../../../components/DialogConfirm"
import { useNavigate } from "react-router-dom"
import { LaudoCall, OpenCallBox, ProgressCall } from "../../../components/OpenCallBox"
import { useUser } from "../../../hooks/useUser"
import { useProducer } from "../../../hooks/useProducer"
import findProducer from "../../../hooks/filterProducer"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useCall } from "../../../hooks/useCall"
import { Call, CreateCall } from "../../../definitions/call"
import { approveCall, content, openCall, progress } from "../../../tools/contenModals"
import { PiPlant } from "react-icons/pi"

interface TillageProps {}

export const Tillage: React.FC<TillageProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { listTillages } = useProducer()

    const { user } = useUser()
    const { tillageid } = useParams()
    const { snackbar } = useSnackbar()

    const [open, setOpen] = useState(false)
    const [openApproved, setOpenApproved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [variant, setVariant] = useState(false)

    const findTillage = listTillages.find((item) => item.id === Number(tillageid))
    console.log(findTillage)
    const [tab, setTab] = React.useState("calls")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const [selectedAvatar, setSelectedAvatar] = useState(0)
    const [selectedTalhao, setSelectedTalhao] = useState("")
    const toggleSelection = (id: number, name: string) => {
        if (selectedAvatar === id) {
            // Se o mesmo avatar já está selecionado, mantenha-o selecionado
            setSelectedAvatar(id)
            console.log({ deseleiona: id })
        } else {
            // Caso contrário, selecione o novo avatar
            setSelectedAvatar(id)
            setSelectedTalhao(`Talhão ${id}`)
        }
    }

    useEffect(() => {
        header.setTitle(findTillage ? findTillage?.name : "")
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
                        {!findTillage?.talhao ? "Nenhum talhão cadastrado." : selectedTalhao}
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
                                        src={GeoImage}
                                        style={{
                                            width: "28vw",
                                            height: "38vw",
                                            fontSize: "4vw",
                                            fontFamily: "MalgunGothic2",
                                            marginLeft: "0vw",
                                            borderRadius: "8vw",
                                            border: selectedAvatar === item.id ? `5px solid ${colors.secondary}` : "",
                                        }}
                                        onClick={() =>
                                            selectedAvatar !== item.id ? toggleSelection(item.id, item.name) : () => {}
                                        }
                                    />
                                    <p style={{ fontSize: "3.5vw", color: colors.text.white }}>Talhão {item.id}</p>
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
                                <Tab sx={{ ...tabStyle, width: "50%" }} value="history" label="Histórico" />
                                <Tab sx={{ ...tabStyle, width: "50%" }} value="calls" label="Chamados" />
                            </Tabs>
                            {/* {tab === "calls" && (!call || !callStatus) && (
                            <OpenCallBox
                                click={user?.isAdmin && callStatus ? handleOpenApprove : handleClickOpen}
                                data={content}
                                callStatus={callStatus}
                                call={call}
                                user={user}
                            />
                        )} */}
                            {/* {tab === "calls" && !call?.report && call?.approved && (
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
                        )} */}
                            {findTillage?.talhao?.length === 0 && tab === "calls" && (
                                <p>É necessário ter talhões cadastrados para abrir chamados.</p>
                            )}
                            {tab === "history" && <p>Nenhum Registro</p>}
                            {tab === "calls" && !findTillage?.talhao && (
                                <p style={{ padding: "2vw" }}>Não existe nenhum talhão cadastrado.</p>
                            )}
                            {/* {tab === "calls" && call?.report && (
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
                        )} */}
                            {/* <DialogConfirm
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
                        {tab === "calls" && call && (
                            <Box sx={{ height: "50%", overflowY: "auto", p: "2vw" }}>
                                <LogsCard call={call} talhao={selectedAvatar} />
                                <LogsCard call={call} talhao={selectedAvatar} />
                                <LogsCard call={call} talhao={selectedAvatar} />
                            </Box>
                        )} */}
                            <IconButton
                                sx={{
                                    bgcolor: colors.button,
                                    width: "12vw",
                                    height: "12vw",
                                    borderRadius: "10vw",
                                    position: "absolute",
                                    bottom: "26vw",
                                    right: "8vw",
                                }}
                                onClick={() => navigate(`/producer/${findTillage?.id}/new_Talhao`)}
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
