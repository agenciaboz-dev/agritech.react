import { Box, Button, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../../../components/Header"
import { colors } from "../../../../style/colors"
import { useNavigate } from "react-router-dom"
import { useNavigationList } from "../../../../hooks/useNavigationList"
import { useHeader } from "../../../../hooks/useHeader"
import { useUsers } from "../../../../hooks/useUsers"
import { CardUser } from "../../../../components/CardUser"
import { SearchField } from "../../../../components/SearchField"

interface ListProducerProps {}

export const ListProducer: React.FC<ListProducerProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const navigate = useNavigate()
    const bottomMenu = useNavigationList()
    const header = useHeader()

    const { listUsers } = useUsers()
    const [listProducer, setListProducer] = useState<User[]>(listUsers?.filter((users) => users.producer !== null))
    const [searchText, setSearchText] = useState("") // Estado para controlar a entrada de pesquisa

    useEffect(() => {
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])
    useEffect(() => {
        const filteredList = listUsers?.filter((user) => user.producer !== null && user.name.toLowerCase().includes(searchText.toLowerCase()))
        setListProducer(filteredList || [])
    }, [listUsers, searchText])

    useEffect(() => {
        header.setTitle("Clientes")
    })

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
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                style={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                    paddingTop: isMobile ? "10" : "1vw",
                }}
            >
                <Box
                    style={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        height: "80vw",
                        flex: 1,
                        maxHeight: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        overflow: "hidden",
                        gap: isMobile ? "3vw" : "1vw",
                    }}
                >
                    <SearchField searchText={searchText} setSearchText={setSearchText} placeholder="produtor" />

                    <Box
                        sx={{
                            gap: isMobile ? "2vw" : "1vw",
                            height: "100%",
                            overflowY: "auto",
                            // paddingBottom: "400vh",
                            paddingBottom: "40vh",
                        }}
                    >
                        {listProducer?.length !== 0
                            ? listProducer?.map((user) => (
                                  <CardUser
                                      user={user}
                                      key={user.id}
                                      location={user.employee ? `/adm/calendar/${user.id}` : `/adm/profile/${user.id}`}
                                  />
                              ))
                            : "Nenhum cliente encontrado"}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
