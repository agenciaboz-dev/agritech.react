import { Box, Skeleton, useMediaQuery } from "@mui/material"
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
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()

    const { user } = useUser()
    const { producerid } = useParams()
    const { listUsers } = useUsers()

    const producerSelect = findProducer(producerid || "")
    const producerEncontrado = listUsers?.find((item) => String(item.producer?.id) === producerid)
    const { setProducerid } = useProducer()

    const [tillages, setTillages] = useState<Tillage[] | undefined>(user?.producer?.tillage)
    const [tillagesProducer, setTillagesProducer] = useState<Tillage[]>(producerEncontrado?.producer?.tillage || [])
    const [searchText, setSearchText] = useState("")
    const [loadingSkeletons, setloadingSkeletons] = useState(true)

    useEffect(() => {
        console.log({ USER_ATUALIZDO: user })
    }, [user])

    useEffect(() => {
        setTillagesProducer(producerEncontrado?.producer?.tillage || [])
        setloadingSkeletons(false)
    }, [producerEncontrado?.producer?.tillage])

    useEffect(() => {
        const filteredList = producerEncontrado?.producer?.tillage?.filter(
            (item) => item !== null && item.name.toLowerCase().includes(searchText.toLowerCase())
        )

        setTillagesProducer(filteredList || [])
        setloadingSkeletons(false)
    }, [producerEncontrado?.producer?.tillage, searchText])

    useEffect(() => {
        setTillages(user?.producer?.tillage)
        setloadingSkeletons(false)

        console.log({ opa: user?.producer?.tillage })
    }, [user?.producer?.tillage])

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
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                    pb: isMobile ? "8vh" : "",
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
                sx={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    paddingTop: isMobile ? "4vw" : "1vw",
                }}
            >
                <Box
                    style={{
                        padding: isMobile ? "4vw" : "0 0 1vw",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        overflow: "hidden",
                        gap: isMobile ? "3vw" : "1vw",
                    }}
                >
                    {/* <SearchField
                        searchText={searchText}
                        setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                        placeholder="fazendas do produtor"
                    /> */}

                    <Box
                        sx={{
                            gap: isMobile ? "2vw" : "1vw",
                            height: "90%",
                            overflowY: "auto",
                            // paddingBottom: "400vh",
                            paddingBottom: "40vh",
                        }}
                    >
                        {user?.producer !== null && tillages ? (
                            tillages.length !== 0 ? (
                                tillages.map((item, index) => (
                                    <CardTillage key={index} tillage={item} location={`/producer/tillage/${item.id}`} />
                                ))
                            ) : loadingSkeletons ? (
                                user?.producer?.tillage?.length === 0 && (
                                    <Box
                                        sx={{
                                            padding: "1vw",
                                        }}
                                    >
                                        <p>Nenhuma opinh encontrada.</p>
                                    </Box>
                                )
                            ) : (
                                user?.producer?.tillage?.length === 0 && (
                                    <Box
                                        sx={{
                                            padding: "1vw",
                                        }}
                                    >
                                        <p>Nenhuma fazenda encontrada.</p>
                                    </Box>
                                )
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
                        ) : loadingSkeletons ? (
                            <Box
                                sx={{
                                    height: isMobile ? "22vw" : "fit-content",
                                    flexDirection: "row",
                                    gap: isMobile ? "3vw" : "1vw",
                                    padding: isMobile ? "4vw 2vw" : "1vw",
                                    alignItems: "center",
                                    borderBottom: "1px solid #88A486",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ flexDirection: "row", gap: isMobile ? "3vw" : "1vw", alignItems: "center" }}>
                                    <Skeleton
                                        animation="wave"
                                        variant="rounded"
                                        sx={{
                                            width: isMobile ? "18vw" : "10vw",
                                            height: isMobile ? "18vw" : "10vw",
                                            borderRadius: isMobile ? "3vw" : "2vw",
                                        }}
                                    />
                                    {isMobile && (
                                        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                sx={{ width: "30vw", height: "4vw" }}
                                            />
                                            <Skeleton
                                                animation="wave"
                                                variant="rounded"
                                                sx={{ width: "22vw", height: "3vw" }}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        ) : (
                            tillagesProducer.length === 0 && (
                                <Box
                                    sx={{
                                        padding: "1vw",
                                    }}
                                >
                                    <p>Nenhuma fazenda encontrada.</p>
                                </Box>
                            )
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
