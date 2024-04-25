import { Box, Button, Skeleton, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { useHeader } from "../../../hooks/useHeader"
import { CardKit } from "../../../components/Kit/CardKit"
import addIcon from "../../../assets/icons/square_plus.svg"
import { useNavigate } from "react-router-dom"
import { useKits } from "../../../hooks/useKits"
import { useUser } from "../../../hooks/useUser"
import { SearchField } from "../../../components/SearchField"
import { useIo } from "../../../hooks/useIo"
import { useArray } from "burgos-array"

interface SettingsKitProps {}

export const SettingsKit: React.FC<SettingsKitProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { listKits, updateKit } = useKits()
    const { user } = useUser()

    const skeletons = useArray().newArray(3)

    const kitsEmployee = listKits.filter((kit) => kit.employees?.some((employee) => employee.id === user?.employee?.id))
    const [kits, setKits] = useState<Kit[]>(listKits)
    const [searchText, setSearchText] = useState("") // Estado para controlar a entrada de pesquisa

    useEffect(() => {
        setKits(listKits)
    }, [listKits])

    useEffect(() => {
        const filteredList = listKits?.filter(
            (kit) => kit.name !== null && kit.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setKits(filteredList || [])
    }, [listKits, searchText])

    useEffect(() => {
        header.setTitle("Painel")
        if (listKits.length === 0) io.emit("kit:list")
        console.log(listKits)
        console.log({ kits_emp: kitsEmployee })
    }, [])
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
                overflowY: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: isMobile ? "1vw" : "0.5vw",
                    padding: isMobile ? "4vw" : "1vw",
                    flexDirection: "row",
                    paddingBottom: isMobile ? "13vw" : "",
                }}
            >
                <Header back location="../panel" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",

                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    height: "100%",
                    paddingTop: isMobile ? "3vh" : 0,
                }}
            >
                <Box
                    sx={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // height: "100%",
                        padding: isMobile ? "0vw 4vw" : "1.5vw 1vw",
                        paddingBottom: isMobile ? "4vw" : "1.5vw",
                        overflowY: "hidden",
                    }}
                >
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: isMobile ? "5vw" : "1.5rem",
                            fontFamily: "MalgunGothic2",
                        }}
                    >
                        Configuração de Kits
                    </p>
                    {user?.isAdmin && (
                        <Button
                            variant="contained"
                            sx={{
                                alignItems: "center",
                                gap: "1vw",
                                backgroundColor: "#fff",
                                textTransform: "none",
                                borderRadius: "5vw",
                                width: "40%",
                                color: colors.text.black,
                            }}
                            onClick={() => navigate("/adm/settings-kit/addkit")}
                        >
                            <img src={addIcon} style={{ width: isMobile ? "5vw" : "2vw" }} />
                            <p style={{ fontSize: isMobile ? "3.5vw" : "1.2rem" }}>Adicionar kit</p>
                        </Button>
                    )}
                </Box>
                <Box
                    style={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        gap: isMobile ? "3vw" : "1vw",
                        height: "100%",

                        // height: 1,
                    }}
                >
                    <Box sx={{ width: 1, gap: isMobile ? "3vw" : "1vw", height: "100%" }}>
                        {listKits && (
                            <SearchField
                                searchText={searchText}
                                setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                                placeholder="kit"
                            />
                        )}
                        <Box sx={{ height: "80%", overflowY: "auto", pb: isMobile ? "10vh" : "15vh" }}>
                            {
                                user?.isAdmin
                                    ? kits.length !== 0
                                        ? kits.map((kit, index) => <CardKit key={index} kit={kit} />)
                                        : kits === undefined
                                        ? skeletons.map((_, index) => <Skeleton variant="rounded" key={index} animation="wave" />)
                                        : "Nenhum kit encontrado"
                                    : kitsEmployee.length !== 0
                                    ? kitsEmployee.map((kit, index) => <CardKit key={index} kit={kit} />)
                                    : kitsEmployee.length === 0 && (
                                          <Box sx={{ gap: "2vw", width: 1 }}>
                                              {skeletons.map((_, index) => (
                                                  <Skeleton variant="rounded" key={index} animation="wave" sx={{ width: 1, height: "10vh" }} />
                                              ))}
                                          </Box>
                                      )
                                // : "Nenhum kit encontrado."
                            }
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
