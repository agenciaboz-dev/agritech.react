import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../../../components/Header"
import { colors } from "../../../../style/colors"
import { BottomNavigation } from "../../../../components/BottomNavigation"
import { useNavigate } from "react-router-dom"
import { useNavigationList } from "../../../../hooks/useNavigationList"
import { useHeader } from "../../../../hooks/useHeader"
import { useUsers } from "../../../../hooks/useUsers"
import { CardUser } from "../../../../components/CardUser"

interface ListUsersProps {}

export const ListUsers: React.FC<ListUsersProps> = ({}) => {
    const navigate = useNavigate()
    const bottomMenu = useNavigationList()
    const header = useHeader()

    const { listUsers } = useUsers()
    const [listEmployee, setListEmployee] = useState<User[]>()
    const [listProducer, setListProducer] = useState<User[]>()

    useEffect(() => {
        // header.setTitle(`${title}`)
        header.setTitle("Usuários")
    })

    useEffect(() => {
        setListEmployee(listUsers?.filter((users) => users.employee !== null && !users.isAdmin))
        setListProducer(listUsers?.filter((users) => users.producer !== null))
    }, [listUsers])

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
                <Header back location="../panel" />
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
                        overflow:"hidden"
                        
                    }}
                >
                    <Box sx={{ gap: "2vw", height: "90%",overflow: "auto", }}>
                       
                        {listUsers?.map((user) => (
                            <CardUser user={user} key={user.id} location={`/profile/${user.id}`} />
                        ))}
                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
