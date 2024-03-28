import { Autocomplete, Box, Button, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { DatePicker, DatePickerProps } from "@mantine/dates"
import { Indicator } from "@mantine/core"
import { LogsCard } from "../../../pages/Calls/LogsCard"
import { IconUser } from "@tabler/icons-react"
import { Call } from "../../../definitions/call"
import { useKits } from "../../../hooks/useKits"
import { textField } from "../../../style/input"
import { useIo } from "../../../hooks/useIo"

interface CalendarProps {}

export const Calendar: React.FC<CalendarProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()

    //kits
    const { listKits } = useKits()
    const [kits, setKits] = useState(listKits?.filter((item) => !!item && item.active) as Kit[])
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)

    //Users
    const { kitid } = useParams()
    const [callsDay, setCallsDay] = useState<Call[] | undefined>([])

    //Methods and variables Date
    const [value, setValue] = useState<Date | null>(null)
    const dayCurrent = new Date().toLocaleDateString("pt-br")

    const handleFindCalls = (value: Date | null) => {
        console.log(selectedKit?.calls)
        if (value && selectedKit?.calls?.length !== 0) {
            const callsPerDay =
                (selectedKit?.calls &&
                    selectedKit?.calls.filter((item) => item.forecast === new Date(value).getTime().toString())) ||
                []
            setCallsDay(callsPerDay)
            // console.log(callsPerDay)
            return callsPerDay
        }
    }
    useEffect(() => {
        if (listKits.length !== 0) setSelectedKit(listKits.find((item) => item.id === Number(kitid)) || null)
    }, [selectedKit])

    const dayRenderer: DatePickerProps["renderDay"] = (date) => {
        const day = date.getDate()
        if (selectedKit && selectedKit.calls) {
            const callsForDay: Call[] | undefined =
                selectedKit.calls &&
                selectedKit.calls?.filter((call) => {
                    const callDate = new Date(Number(call.forecast))
                    return (
                        callDate.getDate() === day &&
                        callDate.getMonth() === date.getMonth() &&
                        callDate.getFullYear() === date.getFullYear()
                    )
                })

            const areaDayCalls =
                callsForDay?.map((item) => Number(item.talhao?.area)).reduce((prev, current) => prev + current, 0) || 0

            const indicatorColor =
                callsForDay &&
                callsForDay.length > 0 &&
                selectedKit.calls &&
                selectedKit.hectareDay &&
                (areaDayCalls < selectedKit.hectareDay && areaDayCalls !== 0
                    ? "#FFD700"
                    : areaDayCalls === selectedKit.hectareDay
                    ? colors.delete
                    : selectedKit.hectareDay - areaDayCalls <= 100
                    ? "orange"
                    : "#88A486")

            return (
                <Indicator size={7} color={indicatorColor || "#88A486"} offset={-3}>
                    <div>{day}</div>
                </Indicator>
            )
        } else if (selectedKit?.calls?.length === 0) {
        }
    }

    useEffect(() => {
        if (listKits.length === 0) io.emit("kit:list")
    }, [listKits])
    useEffect(() => {
        handleFindCalls(value)
    }, [value])

    useEffect(() => {
        header.setTitle(selectedKit ? `${selectedKit?.name}` : "Calendário")
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
                <Header back location={`/adm/settings-kit/${kitid}`} />
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
                <DatePicker
                    locale="pt-br"
                    renderDay={dayRenderer}
                    weekendDays={[0]}
                    styles={{
                        day: { borderRadius: "100%" },
                    }}
                    getDayProps={(day) => ({
                        style: {
                            border: day.toLocaleDateString("pt-br") == dayCurrent ? `1px solid ${colors.secondary}` : "",
                            color:
                                day.toLocaleDateString("pt-br") == dayCurrent
                                    ? colors.secondary
                                    : day.toLocaleDateString("pt-br") == value?.toLocaleDateString("pt-br")
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
                    {selectedKit
                        ? callsDay?.length !== 0
                            ? callsDay?.map((call, index) => <LogsCard key={index} review={false} call={call} />)
                            : "Nenhum chamado aberto para esse dia"
                        : "Selecione um kit para visualizar o calendário."}
                </Box>
            </Box>
        </Box>
    )
}
