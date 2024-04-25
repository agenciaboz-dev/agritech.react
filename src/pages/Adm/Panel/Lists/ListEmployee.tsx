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

interface ListEmployeeProps {}

export const ListEmployee: React.FC<ListEmployeeProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const header = useHeader()

    const { listUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>(listUsers?.filter((users) => users.employee !== null))

    const [searchText, setSearchText] = useState("") // Estado para controlar a entrada de pesquisa

    useEffect(() => {
        setListEmployee(listUsers?.filter((users) => users.employee !== null))
    }, [listUsers])
    useEffect(() => {
        const filteredList = listUsers?.filter(
            (user) => user.employee !== null && user.name.toLowerCase().includes(searchText.toLowerCase())
        )
        setListEmployee(filteredList || [])
    }, [listUsers, searchText])

    useEffect(() => {
        header.setTitle("Colaboradores")
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
                    height: isMobile ? "6vw" : "fit-content",
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
                    paddingTop: isMobile ? 10 : "1vw",
                    marginTop: isMobile ? "5vh" : 0,
                }}
            >
                <Box
                    style={{
                        padding: isMobile ? "4vw" : "1vw",
                        width: "100%",
                        flex: 1,
                        maxHeight: "100%",
                        height: "80vw",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        overflow: "hidden",
                        gap: isMobile ? "3vw" : "1vw",
                    }}
                >
                    {listEmployee && (
                        <SearchField
                            searchText={searchText}
                            setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                            placeholder="colaborador"
                        />
                    )}
                    <Box sx={{ gap: isMobile ? "2vw" : "1vw", height: "100%", overflow: "auto", pb: "12vh" }}>
                        {listEmployee?.length !== 0
                            ? listEmployee?.map((user) => (
                                  <CardUser
                                      user={user}
                                      key={user.id}
                                      location={user.employee ? `/adm/calendar/${user.id}` : `/adm/profile/${user.id}`}
                                  />
                              ))
                            : "Nenhum colaborador encontrado"}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
