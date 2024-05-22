import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { useNavigate } from "react-router-dom"
import { useNavigationList } from "../../../hooks/useNavigationList"
import { useHeader } from "../../../hooks/useHeader"
import { useUsers } from "../../../hooks/useUsers"
import { CardUser } from "../../../components/CardUser"
import findProducer from "../../../hooks/filterProducer"
import { useUser } from "../../../hooks/useUser"
import { useIo } from "../../../hooks/useIo"
import { SearchField } from "../../../components/SearchField"

interface ListProducerProps {
    user: User
}

export const ListProducer: React.FC<ListProducerProps> = ({}) => {
    const navigate = useNavigate()
    const header = useHeader()
    const profile = useUser()
    const io = useIo()
    const { listUsers } = useUsers()
    const [listProducer, setListProducer] = useState<User[]>(
        listUsers?.filter((user) => user.producer?.employeeId === profile.user?.employee?.id)
    )
    const [searchText, setSearchText] = useState("") // Estado para controlar a entrada de pesquisa

    useEffect(() => {
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])

    useEffect(() => {
        if (searchText.trim() === "") {
            // Se o campo de pesquisa estiver vazio, restaura a lista completa
            setListProducer(listUsers?.filter((user) => user.producer?.employeeId === profile.user?.employee?.id))
        } else {
            // Aplica o filtro de acordo com o texto de pesquisa
            const filteredList = listUsers
                ?.filter((user) => user.producer?.employeeId === profile.user?.employee?.id)
                .filter((user) => user.name.toLowerCase().includes(searchText.toLowerCase()))
            setListProducer(filteredList || [])
        }
    }, [searchText, listUsers])

    useEffect(() => {
        header.setTitle("Clientes")
    })

    const team = profile.user?.employee?.producers?.map((item: Producer) => {
        return findProducer(String(item.id))
    })

    useEffect(() => {
        header.setTitle("Clientes")
    })

    useEffect(() => {
        console.log({ LISTProducer: listProducer })
    }, [listProducer])

    useEffect(() => {
        if (listUsers.length === 0) io.emit("user:list")
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
                    height: "10%",
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
                sx={{
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: "2vw",
                    mt: "10vw",
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
                        gap: "4vw",
                    }}
                >
                    <SearchField searchText={searchText} setSearchText={setSearchText} placeholder="produtor" />

                    <Box sx={{ gap: "2vw", height: "180vw", pb: "12vh", overflow: "auto" }}>
                        {listProducer?.length !== 0
                            ? listProducer?.map((user) => (
                                  <CardUser
                                      user={user}
                                      key={user.id}
                                      location={
                                          profile.user?.isAdmin
                                              ? user.employee
                                                  ? `/adm/calendar/${user?.id}`
                                                  : `/adm/profile/${user?.id}`
                                              : `/employee/profile/${user?.id}`
                                      }
                                  />
                              ))
                            : "Nenhum cliente encontrado"}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
