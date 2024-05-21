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
        listUsers?.filter((users) => users.producer?.employeeId === profile.user?.id)
    )
    const [searchText, setSearchText] = useState("") // Estado para controlar a entrada de pesquisa

    useEffect(() => {
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])

    useEffect(() => {
        const filteredList = listUsers?.filter(
            (user) => user.producer !== null && user.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setListProducer(filteredList || [])
    }, [listUsers, searchText])

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
        if (listUsers.length === 0) io.emit("user:list")
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
                    <SearchField searchText={searchText} setSearchText={setSearchText} placeholder="produtor" />

                    <Box sx={{ gap: "2vw", height: "90%", overflow: "auto" }}>
                        {listProducer?.length !== 0
                            ? listProducer?.map((user) => (
                                  <CardUser
                                      user={user}
                                      key={user.id}
                                      location={
                                          profile.user?.isAdmin
                                              ? user.employee
                                                  ? `/adm/calendar/${profile?.user?.id}`
                                                  : `/adm/profile/${profile?.user?.id}`
                                              : `/employee/profile/${profile?.user?.id}`
                                      }
                                  />
                              ))
                            : "Nenhum cliente encontrado"}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
