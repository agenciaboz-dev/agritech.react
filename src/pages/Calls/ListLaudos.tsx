import React, { useEffect } from "react"
import { colors } from "../../style/colors"
import { Box } from "@mui/material"
import { Header } from "../../components/Header"
import { TitleComponents } from "../../components/TitleComponents"
import { useNavigate, useParams } from "react-router-dom"
import { useCall } from "../../hooks/useCall"
import { LogsLaudo } from "./LogsLaudo"

interface ListLaudosProps {
    user: User
}

export const ListLaudos: React.FC<ListLaudosProps> = ({ user }) => {
    const navigate = useNavigate()
    const { callid } = useParams()

    const { listCalls } = useCall()
    const selectedCall = listCalls.find((item) => item.id === Number(callid))
    const sortedReports = selectedCall?.reports?.sort((a, b) => Number(a.date) - Number(b.date))

    useEffect(() => {
        console.log(selectedCall)
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
                        user?.isAdmin
                            ? `/adm/producer/${selectedCall?.producer?.id}/${selectedCall?.talhao?.tillage?.id}`
                            : `/adm/producer/${selectedCall?.producer?.id}/${selectedCall?.talhao?.tillage?.id}`
                    }
                />
            </Box>

            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    gap: "5vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <TitleComponents
                    title="Relatórios"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Cliente"
                    click={() =>
                        navigate(
                            user.isAdmin
                                ? `/adm/profile/${selectedCall?.producer?.user?.id}`
                                : `/employee/profile/${selectedCall?.producer?.user?.id}`
                        )
                    }
                    variant
                />
                <Box>
                    {sortedReports?.map((item, index) => (
                        <LogsLaudo key={index} id={index + 1} report={item} talhao={item.talhao} />
                    ))}
                </Box>
            </Box>
        </Box>
    )
}
