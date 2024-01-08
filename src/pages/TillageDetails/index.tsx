import { Avatar, Box, IconButton, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { IoIosArrowForward } from "react-icons/io"
import { useParams } from "react-router"
import listProducers from "../../hooks/listProducers"
import GeoImage from "../../assets/geo.svg"
import { useArray } from "burgos-array"
import { tabStyle } from "../../style/tabStyle"
import { WeatherComponent } from "../../components/WeatherComponent"
import { DialogConfirm } from "../../components/DialogConfirm"
import { useNavigate } from "react-router-dom"
import { OpenCallBox, ProgressCall } from "../../components/OpenCallBox"
import { useUser } from "../../hooks/useUser"
import { PiPlantLight } from "react-icons/pi"

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
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const images = useArray().newArray(5)
    const [open, setOpen] = useState(false)
    const [variant, setVariant] = useState(false)

    const { producerid } = useParams() // temporario => na verdade deve ser tillageid que vai armazenar a info do produtor dela
    const producer = listProducers()?.filter((item) => String(item.id) == producerid) || []

    const [tab, setTab] = React.useState("call")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    const handleClickOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        header.setTitle("Lavouras")
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
                <Header />
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
                        Lavouras
                    </p>
                    <IoIosArrowForward color="white" size={"6vw"} />
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
                    {tab === "call" && !variant ? (
                        <OpenCallBox click={handleClickOpen} data={content} />
                    ) : (
                        tab === "call" && <ProgressCall click={() => navigate("/callDetail")} data={progress} />
                    )}
                    <DialogConfirm
                        open={open}
                        setOpen={setOpen}
                        data={openCall}
                        click={() => {
                            setVariant(true)
                            setOpen(false)
                        }}
                    />
                    {/* {user?.producer && (
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
                            onClick={() => navigate("/producer/new")}
                        >
                            <PiPlantLight color="#fff" />
                        </IconButton>
                    )} */}
                </Box>
            </Box>
        </Box>
    )
}
