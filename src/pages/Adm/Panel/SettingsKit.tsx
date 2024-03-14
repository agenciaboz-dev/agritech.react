import { Box, Button } from "@mui/material"
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

interface SettingsKitProps {}

export const SettingsKit: React.FC<SettingsKitProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { listKits, updateKit } = useKits()
    const { user } = useUser()

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
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                    paddingBottom: "13vw",
                }}
            >
                <Header back location="../panel" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    flex: 1,
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: "5vw",
                        justifyContent: "space-between",
                        padding: "3vw",
                        overflowY: "hidden",
                    }}
                >
                    <p style={{ color: colors.text.white, fontSize: "5vw", fontFamily: "MalgunGothic2" }}>
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
                            <img src={addIcon} style={{ width: "5vw" }} />
                            Adicionar kit
                        </Button>
                    )}
                </Box>
                <Box
                    style={{
                        padding: " 4vw",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        height: "100%",
                        gap: "3vw",
                    }}
                >
                    {listKits && (
                        <SearchField
                            searchText={searchText}
                            setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                            placeholder="kit"
                        />
                    )}
                    <Box sx={{ overflowY: "auto", height: "72%" }}>
                        {user?.isAdmin
                            ? kits.length !== 0
                                ? kits.map((kit, index) => <CardKit key={index} kit={kit} />)
                                : "Nenhum kit encontrado."
                            : kitsEmployee.length !== 0
                            ? kitsEmployee.map((kit, index) => <CardKit key={index} kit={kit} />)
                            : "Nenhum kit encontrado."}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
