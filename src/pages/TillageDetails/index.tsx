import { Avatar, Box, Tab, Tabs } from "@mui/material"
import React, { useEffect } from "react"
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
interface TillageDetailsProps {}

export const TillageDetails: React.FC<TillageDetailsProps> = ({}) => {
    const header = useHeader()
    const images = useArray().newArray(5)

    const { producerid } = useParams() // temporario => na verdade deve ser tillageid que vai armazenar a info do produtor dela

    const producer = listProducers()?.filter((item) => String(item.id) == producerid) || []

    const [tab, setTab] = React.useState("call")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    console.log(producer)
    useEffect(() => {
        // header.setTitle(producer[0].name)
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
                    {tab === "call" && (
                        <Box
                            sx={{
                                bgcolor: "rgba(136, 164, 134, 0.29)",
                                p: "6vw",
                                borderRadius: "5vw",
                                gap: "3vw",
                                height: "45%",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    gap: "3vw",
                                }}
                            >
                                <p style={{ fontSize: "4.5vw", fontWeight: "600" }}>Abrir um chamado de pulverização</p>
                                <p style={{ fontSize: "3.2vw", textAlign: "justify" }}>
                                    Abra um chamada para que nossa equipe encaminhe-se até o local Lavoura 1#, o prazo minino
                                    do chamado é de XX Horas segundo o contrato vigente.
                                </p>
                            </Box>
                            <p style={{ fontSize: "3.2vw", textAlign: "end", width: "100%", color: colors.primary }}>
                                Abrir Chamado
                            </p>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
