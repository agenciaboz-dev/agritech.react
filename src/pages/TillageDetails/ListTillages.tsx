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
    const { listTillages, tillageUpdate, setProducerid } = useProducer()
    const { producerid } = useParams()
    setProducerid(Number(producerid))

    const producerSelect = findProducer(producerid || "")
    const { listUsers } = useUsers()
    const producerEncontrado = listUsers?.filter((item) => String(item.producer?.id) === producerid) || []

    useEffect(() => {
        header.setTitle(user?.producer !== null ? "Minhas lavouras" : "Lavouras")
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
                <Header back location="../" />
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
                        {tillageUpdate && user?.producer !== null
                            ? listTillages?.map((item, index) =>
                                  listTillages.length === 0 ? (
                                      <p>Nenhuma lavoura encontrada.</p>
                                  ) : (
                                      <CardTillage key={index} tillage={item} location={`/producer/tillage/${item.id}`} />
                                  )
                              )
                            : producerSelect.producer?.tillage?.map((tillage, index) =>
                                  producerEncontrado[0].producer?.tillage?.length === 0 ? (
                                      <p>Nenhuma lavoura encontrada.</p>
                                  ) : (
                                      <CardTillage
                                          key={index}
                                          tillage={tillage}
                                          location={`/adm/producer/${producerSelect.producer?.id}/${tillage.id}`}
                                      />
                                  )
                              )}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
