import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { useParams } from "react-router-dom"
import { useHeader } from "../../hooks/useHeader"
import { useProducer } from "../../hooks/useProducer"
import { useUser } from "../../hooks/useUser"
import { CardTillage } from "../../components/CardTillage"
import findProducer from "../../hooks/filterProducer"
import { useUsers } from "../../hooks/useUsers"

interface ListTillagesProps {}

export const ListTillages: React.FC<ListTillagesProps> = ({}) => {
    const header = useHeader()

    const { user } = useUser()
    const { producerid } = useParams()
    const { listUsers } = useUsers()

    const producerSelect = findProducer(producerid || "")
    const producerEncontrado = listUsers?.filter((item) => String(item.producer?.id) === producerid) || []
    const { listTillages, tillageUpdate, setProducerid } = useProducer()

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
                    }}
                >
                    <Box sx={{ gap: "2vw", height: "90%", overflow: "auto" }}>
                        {tillageUpdate && user?.producer !== null ? (
                            listTillages.length !== 0 ? (
                                listTillages?.map((item, index) => (
                                    <CardTillage key={index} tillage={item} location={`/producer/tillage/${item.id}`} />
                                ))
                            ) : (
                                listTillages.length === 0 && <p>Nenhuma lavoura encontrada.</p>
                            )
                        ) : producerEncontrado[0].producer?.tillage?.length !== 0 ? (
                            producerEncontrado[0].producer?.tillage?.map((tillage, index) => (
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
                            <p>Nenhuma lavoura encontrada.</p>
                        )}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
