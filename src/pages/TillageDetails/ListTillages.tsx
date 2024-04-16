import { Box } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { useParams } from "react-router-dom"
import { useHeader } from "../../hooks/useHeader"
import { useProducer } from "../../hooks/useProducer"
import { useUser } from "../../hooks/useUser"
import { CardTillage } from "../../components/CardTillage"
import findProducer from "../../hooks/filterProducer"
import { useUsers } from "../../hooks/useUsers"
import { SearchField } from "../../components/SearchField"

interface ListTillagesProps {}

export const ListTillages: React.FC<ListTillagesProps> = ({}) => {
    const header = useHeader()

    const { user } = useUser()
    const { producerid } = useParams()
    const { listUsers } = useUsers()

    const producerSelect = findProducer(producerid || "")
    const producerEncontrado = listUsers?.find((item) => String(item.producer?.id) === producerid)
    const { listTillages, tillageUpdate, setProducerid } = useProducer()

    const [tillages, setTillages] = useState<Tillage[] | undefined>(user?.producer?.tillage)
    const [tillagesProducer, setTillagesProducer] = useState<Tillage[]>(producerEncontrado?.producer?.tillage || [])
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        setTillagesProducer(producerEncontrado?.producer?.tillage || [])
    }, [producerEncontrado?.producer?.tillage])

    useEffect(() => {
        const filteredList = tillagesProducer?.filter(
            (item) => item !== null && item.name.toLowerCase().includes(searchText.toLowerCase())
        )

        setTillagesProducer(filteredList || [])
    }, [producerEncontrado?.producer?.tillage, searchText])

    useEffect(() => {
        if (user?.producer !== null && user?.producer?.tillage) setTillages(user?.producer?.tillage)
        console.log({ opa: user?.producer?.tillage })
    }, [user, user?.producer?.tillage])

    useEffect(() => {
        console.log(user?.producer?.tillage)
    }, [tillages, user?.producer?.tillage])

    useEffect(() => {
        const filteredList = tillages?.filter(
            (item) => item !== null && item.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setTillages(filteredList || [])
    }, [user?.producer?.tillage, searchText])

    useEffect(() => {
        header.setTitle(user?.producer !== null ? "Minhas Fazendas" : "Fazendas")
        user?.employee && setProducerid(Number(producerid))
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
                    height: "10%",
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
                        user?.producer
                            ? "/producer/"
                            : user?.isAdmin
                            ? `/adm/profile/${producerSelect.id}`
                            : `/employee/profile/${producerSelect.id}`
                    }
                />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                        gap: "3vw",
                    }}
                >
                    {/* <SearchField
                        searchText={searchText}
                        setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                        placeholder="fazendas do produtor"
                    /> */}

                    <Box sx={{ gap: "2vw", height: "90%", overflow: "auto" }}>
                        {user?.producer !== null && tillages ? (
                            tillages.length !== 0 ? (
                                tillages.map((item, index) => (
                                    <CardTillage key={index} tillage={item} location={`/producer/tillage/${item.id}`} />
                                ))
                            ) : (
                                tillages.length === 0 && <p>Nenhuma fazenda encontrada.</p>
                            )
                        ) : tillagesProducer.length !== 0 ? (
                            tillagesProducer?.map((tillage, index) => (
                                <CardTillage
                                    key={index}
                                    tillage={tillage}
                                    location={
                                        user?.isAdmin
                                            ? `/adm/producer/${producerSelect.producer?.id}/${tillage.id}`
                                            : `/employee/producer/${producerSelect.producer?.id}/${tillage.id}`
                                    }
                                />
                            ))
                        ) : (
                            <p>Nenhuma fazenda encontrada.</p>
                        )}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
