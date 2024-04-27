import { Autocomplete, Box, IconButton, Skeleton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../Header"
import { useHeader } from "../../../hooks/useHeader"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { DatePicker, DatePickerProps } from "@mantine/dates"
import { Indicator } from "@mantine/core"
import { LogsCard } from "../../../pages/Calls/LogsCard"
import { Call } from "../../../definitions/call"
import { useKits } from "../../../hooks/useKits"
import { textField } from "../../../style/input"
import { useIo } from "../../../hooks/useIo"
import { BsFillInfoCircleFill } from "react-icons/bs"
import { useDisclosure } from "@mantine/hooks"
import { ModalLegend } from "../../CalendarUser/ModalLegend"
import { ModalCalls } from "./ModalCalls"
import { useUser } from "../../../hooks/useUser"

interface CalendarKitProps {}

export const CalendarKit: React.FC<CalendarKitProps> = ({}) => {
    const io = useIo()
    const header = useHeader()
    const { user } = useUser()

    //kits
    const { listKits } = useKits()
    const [kits, setKits] = useState<Kit[]>([])
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)

    //Users
    const { userid } = useParams()
    const { listUsers } = useUsers()
    const findUser = listUsers?.find((user) => String(user.id) === userid)
    const [callsDay, setCallsDay] = useState<Call[] | undefined>([])

    const [value, setValue] = useState<Date | null>(null)
    const dayCurrent = new Date().toLocaleDateString("pt-br")

    const [opened, { open, close }] = useDisclosure()
    const [openedCalls, { open: openCalls, close: closeCalls }] = useDisclosure()

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
        selectedKit?.calls && console.log({ limite_kit: selectedKit?.hectareDay })
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
                (areaDayCalls >= selectedKit.hectareDay / 2 && areaDayCalls < selectedKit.hectareDay && areaDayCalls > 0
                    ? "#FFD700"
                    : areaDayCalls >= selectedKit.hectareDay
                    ? colors.delete
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
        console.log(listKits)
        setKits(listKits?.filter((item) => item.active))
    }, [listKits])

    useEffect(() => {
        console.log(kits)
    }, [kits])
    useEffect(() => {
        handleFindCalls(value)
    }, [value])

    useEffect(() => {
        header.setTitle("Calendários")
    }, [])

    const handleDaySelect = (selectedDate: Date | null) => {
        setValue(selectedDate) // Atualize o estado com a data selecionada
        if (selectedDate) {
            openCalls() // Abra o modal de chamadas
        }
    }
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <ModalCalls close={closeCalls} opened={openedCalls} callsDay={callsDay} kit={selectedKit} />

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
                <Box sx={{ width: "99%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {listKits.length !== 0 ? (
                        user?.isAdmin && (
                            <Autocomplete
                                value={selectedKit}
                                options={listKits || []}
                                getOptionLabel={(option) => option.name || ""}
                                onChange={(event, selected) => setSelectedKit(selected)}
                                isOptionEqualToValue={(option, value) => option.id == value.id}
                                renderInput={(params) => (
                                    <TextField {...params} sx={{ ...textField }} label="kit" required />
                                )}
                                sx={{ width: "85%" }}
                            />
                        )
                    ) : (
                        <Skeleton animation="wave" variant="rounded" sx={{ width: 0.85, height: "6vh" }} />
                    )}
                    <Box>
                        <IconButton onClick={open}>
                            <BsFillInfoCircleFill color={colors.button} style={{ width: "6vw", height: "6vw" }} />
                        </IconButton>
                        <ModalLegend opened={opened} close={close} />
                    </Box>
                </Box>
                <DatePicker
                    locale="pt-br"
                    renderDay={findUser?.employee?.kits?.length !== 0 ? dayRenderer : undefined}
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
                    onChange={handleDaySelect}
                    size={"lg"}
                />
            </Box>
        </Box>
    )
}
