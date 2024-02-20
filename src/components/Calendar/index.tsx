import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../Header"
import { useHeader } from "../../hooks/useHeader"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../hooks/useUsers"
import { DatePicker, DatePickerProps } from "@mantine/dates"
import { Indicator } from "@mantine/core"
import useDateISO from "../../hooks/useDateISO"
import { LogsCard } from "../../pages/Calls/LogsCard"
import { IconUser } from "@tabler/icons-react"
import { useCall } from "../../hooks/useCall"

interface CalendarProps {}
const dayRenderer: DatePickerProps["renderDay"] = (date) => {
    const day = date.getDate()
    return (
        <Indicator size={7} color={"#88A486"} offset={-3} disabled={day !== 22}>
            <div>{day}</div>
        </Indicator>
    )
}
export const Calendar: React.FC<CalendarProps> = ({}) => {
    const header = useHeader()
    const navigate = useNavigate()
    const { listCalls } = useCall()

    //Users
    const { userid } = useParams()
    const { listUsers } = useUsers()
    const findUser = listUsers?.find((user) => String(user.id) === userid)

    //Methods and variables Date
    const [value, setValue] = useState<Date | null>(null)
    // const [value, setValue] = useState<string | null>(null)
    const dayCurrent = new Date().getDate()

    const handleFindCalls = (value: Date | null) => {
        if (value) {
            const callsPerDay = listCalls.filter((item) => item.forecast === new Date(value).getTime().toString())
            // Faça a lógica para buscar os chamados com base na data ISO
            // Atualize a lista de chamados com os chamados encontrados
            console.log(callsPerDay)
        }
    }

    useEffect(() => {
        handleFindCalls(value)
    }, [value])

    useEffect(() => {
        header.setTitle(findUser?.name || "")
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
                    padding: "4vw",
                    width: "100%",
                    flex: 1,
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    overflow: "hidden",
                    alignItems: "center",
                    gap: "4vw",
                }}
            >
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        alignItems: "center",
                        gap: "0vw",
                        backgroundColor: "#88A486",
                        color: colors.text.white,
                        textTransform: "none",
                        borderRadius: "5vw",
                        fontSize: "3.5vw",
                        p: "2vw",
                        width: "100%",
                    }}
                    onClick={() => navigate(`/adm/profile/${userid}`)}
                >
                    <IconUser fontSize="xs" color="#fff" />
                    Acessar cadastro colaborador
                </Button>
                <DatePicker
                    locale="pt-br"
                    renderDay={dayRenderer}
                    weekendDays={[0]}
                    styles={{
                        day: { borderRadius: "100%" },
                    }}
                    getDayProps={(day) => ({
                        style: {
                            border: day.getDate() == dayCurrent ? `1px solid ${colors.secondary}` : "",
                            color:
                                day.getDate() == dayCurrent
                                    ? colors.secondary
                                    : day.getDate() == value?.getDate()
                                    ? "white"
                                    : "",
                        },
                    })}
                    value={value}
                    onChange={setValue}
                    size={"lg"}
                />
                <Box
                    sx={{
                        flexDirection: "column",
                        width: "100%",
                        height: "38%",
                        overflowY: "auto",
                        p: "2vw 4vw",
                        gap: "3vw",
                    }}
                >
                    {value?.getDate() === 22 &&
                        (listCalls.length !== 0
                            ? listCalls.map((call, index) => <LogsCard key={index} review={false} call={call} />)
                            : "Nenhum chamado aberto para esse dia")}
                </Box>
            </Box>
        </Box>
    )
}
