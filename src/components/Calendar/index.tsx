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
import { Call } from "../../definitions/call"

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = ({}) => {
    const header = useHeader()
    const navigate = useNavigate()
    const { listCalls } = useCall()

    //Users
    const { userid } = useParams()
    const { listUsers } = useUsers()
    const findUser = listUsers?.find((user) => String(user.id) === userid)
    const [callsDay, setCallsDay] = useState<Call[] | undefined>([])

    //Methods and variables Date
    const [value, setValue] = useState<Date | null>(null)
    const dayCurrent = new Date().getDate()

    const handleFindCalls = (value: Date | null) => {
        console.log(findUser?.employee?.kits)
        if (value && findUser?.employee?.kits?.length !== 0) {
            const callsPerDay =
                (findUser?.employee?.kits &&
                    findUser?.employee?.kits[0].calls?.filter(
                        (item) => item.forecast === new Date(value).getTime().toString()
                    )) ||
                []
            setCallsDay(callsPerDay)
            // console.log(callsPerDay)
            return callsPerDay
        }
    }

    const dayRenderer: DatePickerProps["renderDay"] = (date) => {
        const day = date.getDate()
        if (findUser && findUser?.employee?.kits && findUser?.employee?.kits[0].calls) {
            const callsForDay: Call[] | undefined =
                findUser?.employee?.kits &&
                findUser?.employee?.kits[0].calls?.filter((call) => {
                    const callDate = new Date(Number(call.forecast))
                    return (
                        callDate.getDate() === day &&
                        callDate.getMonth() === date.getMonth() &&
                        callDate.getFullYear() === date.getFullYear()
                    )
                })

            const areaDayCalls =
                callsForDay?.map((item) => Number(item.talhao?.area)).reduce((prev, current) => prev + current, 0) || 0

            useEffect(() => {
                console.log({ por_dia_temos: areaDayCalls })
                findUser?.employee?.kits && console.log({ limite_kit: findUser?.employee.kits[0].hectareDay })
            }, [findUser?.employee])

            const indicatorColor =
                callsForDay &&
                callsForDay.length > 0 &&
                findUser?.employee?.kits &&
                findUser?.employee?.kits[0].hectareDay &&
                (areaDayCalls < findUser?.employee.kits[0].hectareDay && areaDayCalls !== 0
                    ? "#FFD700"
                    : areaDayCalls === findUser?.employee.kits[0].hectareDay
                    ? colors.delete
                    : findUser?.employee.kits[0].hectareDay - areaDayCalls <= 100
                    ? "orange"
                    : "#88A486")

            return (
                <Indicator size={7} color={indicatorColor || "#88A486"} offset={-3}>
                    <div>{day}</div>
                </Indicator>
            )
        } else if (findUser?.employee?.kits?.length === 0) {
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
                    renderDay={findUser?.employee?.kits?.length !== 0 ? dayRenderer : undefined}
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
                    {findUser?.office === "pilot" || findUser?.office === "copilot"
                        ? callsDay?.length !== 0
                            ? callsDay?.map((call, index) => <LogsCard key={index} review={false} call={call} />)
                            : "Nenhum chamado aberto para esse dia"
                        : "Sem compromissos"}
                </Box>
            </Box>
        </Box>
    )
}
