import { Box, Button } from "@mui/material"
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
                        gap: "3vw",
                    }}
                >
                    {listEmployee && (
                        <SearchField
                            searchText={searchText}
                            setSearchText={setSearchText} // Passa setSearchText para poder atualizar o estado de pesquisa
                            placeholder="colaborador"
                        />
                    )}
                    <Box sx={{ gap: "2vw", height: "90%", overflow: "auto" }}>
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
