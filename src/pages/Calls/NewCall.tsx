import { Autocomplete, Badge, Box, Button, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { TitleComponents } from "../../components/TitleComponents"
import { useFormik } from "formik"
import { Call, CreateCall } from "../../definitions/call"
import { useUser } from "../../hooks/useUser"
import { useKits } from "../../hooks/useKits"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useCall } from "../../hooks/useCall"
import dayjs, { Dayjs } from "dayjs"
import { DemoItem } from "@mui/x-date-pickers/internals/demo"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { ptBR } from "@mui/x-date-pickers/locales"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { Test } from "./Test"
import { useUsers } from "../../hooks/useUsers"
import { Indicator } from "@mantine/core"
import { PickersDay } from "@mui/x-date-pickers"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"
interface NewCallProps {
    user: User
}

export const NewCall: React.FC<NewCallProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    const io = useIo()
    const header = useHeader()
    const account = useUser()
    const navigate = useNavigate()
    const { listUsers } = useUsers()
    const { snackbar } = useSnackbar()
    const { listKits } = useKits()
    const { addCallPending, addCallApprove } = useCall()

    const [loading, setLoading] = useState(false)
    const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null)
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)
    const [selectedTalhao, setSelectedTalhao] = useState<Talhao | null>(null)

    const [producers] = useState(listUsers?.map((user: User) => user.producer).filter((item) => !!item) as Producer[])
    const [kits, setKits] = useState(listKits.filter((item) => !!item && item.active))
    const [tillages, setTillages] = useState<Tillage[]>([])
    const [tillagesProducer, setTillagesProducer] = useState<Tillage[]>([])
    const [talhoes, setTalhoes] = useState<Talhao[]>([])
    const [talhoesProducer, setTalhoesProducer] = useState<Talhao[]>([])

    const [tillageId, setTillageId] = useState<number | null>(null)
    const [talhaoId] = useState<number | null>(null)
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)

    const findTillageInfo = selectedProducer?.tillage?.find((item) => item.id === tillageId)

    useEffect(() => {
        if (listKits.length == 0) io.emit("kit:list")
    }, [])

    useEffect(() => {
        setKits(listKits.filter((item) => !!item && item.active) as Kit[])
    }, [listKits])

    const formik = useFormik<CreateCall>({
        initialValues: {
            approved: user.isAdmin ? true : false,
            open: "",
            comments: "",
            producerId: selectedProducer?.id || 0,

            talhaoId: talhaoId || 0,
            kitId: undefined,
            userId: Number(account?.user?.id),
            hectarePrice: findTillageInfo?.hectarePrice.toString().replace(".", ",") || "",
            forecast: "",
        },
        onSubmit: (values) => {
            handleSubmit(values)
        },
        enableReinitialize: true,
    })

    const handleSubmit = (values: CreateCall) => {
        console.log(values)
        const dataAdmin = {
            approved: user.isAdmin ? true : false,
            open: new Date().getTime().toString(),
            comments: "",
            producerId: user.producer ? user.producer.id : selectedProducer?.id,
            talhaoId: selectedTalhao?.id,
            userId: Number(account?.user?.id),
            kitId: selectedKit?.id ? selectedKit?.id : undefined,
            forecast: dayjs(pickDate).valueOf().toString(),
            hectarePrice: unmaskCurrency(values.hectarePrice),
        }

        const dataProducer = {
            approved: false,
            open: new Date().getTime().toString(),
            comments: values.comments,
            producerId: user.producer?.id,
            talhaoId: selectedTalhao?.id,
            userId: user?.id,
            forecast: dayjs(pickDate).valueOf().toString(),
        }

        console.log(dataAdmin)
        console.log(dataAdmin)
        io.emit(
            user.employee !== null ? "admin:call:create" : "call:create",
            user.employee !== null ? dataAdmin : dataProducer
        )
        setLoading(true)
    }

    useEffect(() => {
        io.on("call:creation:success", (data: Call) => {
            console.log({ callProducer: data })
            snackbar({ severity: "success", text: "Chamado aberto! Aguarde a aprovação." })
            setLoading(false)
            navigate("/producer/requests")
        })
        io.on("call:creation:failed", (data: Call) => {
            console.log({ callProducer: data })
            snackbar({ severity: "error", text: "Algo deu errado!" })
            setLoading(false)
        })
    }, [])

    const ServerDay = (props: any) => {
        const { day, outsideCurrentMonth, ...other } = props

        const currentDate = dayjs()
        const isToday = day.isSame(currentDate, "day")

        const isFutureDate = day.isAfter(currentDate, "day")
        if (!isFutureDate && !isToday) {
            return <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        }

        const callsForDay = selectedKit?.calls?.filter((call: Call) => {
            const callDate = new Date(Number(call.forecast))
            return (
                callDate.getDate() === day.date() &&
                callDate.getMonth() === day.month() &&
                callDate.getFullYear() === day.year()
            )
        })

        const areaDayCalls =
            callsForDay
                ?.map((item: any) => Number(item.talhao?.area))
                .reduce((prev: number, current: number) => prev + current, 0) || 0

        const totalArea = areaDayCalls + Number(selectedTalhao?.area)

        const indicatorColor =
            callsForDay &&
            callsForDay.length > 0 &&
            selectedKit &&
            selectedKit.hectareDay &&
            (totalArea <= selectedKit.hectareDay ? "#88A486" : totalArea > selectedKit.hectareDay && colors.delete)

        return (
            <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={<Indicator color={indicatorColor || "#88A486"} size={7} offset={5} />}
            >
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        )
    }

    const shouldDisableDate = (day: dayjs.Dayjs): boolean => {
        const callsForDay = selectedKit?.calls?.filter((call: Call) => {
            const callDate = new Date(Number(call.forecast))
            return (
                callDate.getDate() === day.date() &&
                callDate.getMonth() === day.month() &&
                callDate.getFullYear() === day.year()
            )
        })

        const areaDayCalls =
            callsForDay
                ?.map((item: any) => Number(item.talhao?.area))
                .reduce((prev: number, current: number) => prev + current, 0) || 0

        const totalArea = areaDayCalls + Number(selectedTalhao?.area)

        const indicatorColor =
            callsForDay &&
            callsForDay.length > 0 &&
            selectedKit &&
            selectedKit.hectareDay &&
            (totalArea <= selectedKit.hectareDay ? "#88A486" : totalArea > selectedKit.hectareDay && colors.delete)
        return indicatorColor === colors.delete ? true : false // Garantindo que selectedKit?.hectareDay não seja undefined
    }

    useEffect(() => {
        console.log(
            selectedProducer?.tillage?.length !== 0
                ? selectedProducer?.tillage?.map((tillage) => ({
                      id: tillage.id,
                      name: tillage.name,
                      call: tillage.call,
                  }))
                : undefined
        )
        if (selectedProducer?.tillage) setTillages(selectedProducer?.tillage)

        const selectedTillage = selectedProducer?.tillage?.find((item) => item.id === tillageId)
        if (selectedTillage?.talhao) setTalhoes(selectedTillage.talhao)
    }, [selectedProducer, tillageId])

    console.log(selectedProducer)

    useEffect(() => {
        console.log(
            user.producer?.tillage?.length !== 0
                ? selectedProducer?.tillage?.map((tillage) => ({
                      id: tillage.id,
                      name: tillage.name,
                      call: tillage.call,
                  }))
                : undefined
        )
        if (user.producer?.tillage) setTillagesProducer(user.producer?.tillage)

        const selectedTillage = user.producer?.tillage?.find((item) => item.id === tillageId)
        if (selectedTillage?.talhao) setTalhoesProducer(selectedTillage.talhao)
    }, [user, tillageId])

    useEffect(() => {
        io.on("adminCall:creation:success", (data: Call) => {
            // console.log({ chamadoAberto: data })
            addCallPending(data)
            {
                !data.approved ? addCallPending(data) : addCallApprove(data)
            }
            setLoading(false)
            snackbar({
                severity: "success",
                text: !user.isAdmin ? "Chamado aberto! Aguarde a aprovação." : "Chamado aberto!",
            })
            navigate(user.isAdmin ? "/adm/calls" : user.employee ? "/employee/" : "/producer/")
        })
        io.on("adminCall:creation:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Algo deu errado" })
            setLoading(false)
        })

        return () => {
            io.off("AdminCall:creation:success")
            io.off("AdminCall:creation:failed")
        }
    }, [])

    useEffect(() => {
        formik.setFieldValue("producerId", selectedProducer?.id || 0)
    }, [selectedProducer])

    useEffect(() => {
        formik.setFieldValue("kitId", selectedKit?.id || 0)
    }, [selectedKit])

    useEffect(() => {
        header.setTitle("Painel")
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
                    padding: isMobile ? "8vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header back location={account.user?.isAdmin ? "/" : user?.producer ? "/producer/" : "/employee/"} />
            </Box>

            <Box
                sx={{
                    padding: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    gap: isMobile ? "5vw" : "1vw",
                    flexDirection: "column",
                    mt: isMobile ? "0.5vw" : 0,
                    overflow: "hidden",
                }}
            >
                <TitleComponents
                    title="Novo Chamado"
                    style={{ fontSize: isMobile ? "5vw" : "1.5rem" }}
                    button={user?.employee && selectedProducer?.id ? true : false}
                    click={() =>
                        selectedProducer?.id &&
                        navigate(
                            user.isAdmin
                                ? `/adm/producer/${selectedProducer?.id}`
                                : `/employee/producer/${selectedProducer?.id}`
                        )
                    }
                    textButton="Acessar Cliente"
                    variant
                />
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            gap: isMobile ? "2vw" : "1vw",
                            overflowY: "auto",
                            // paddingBottom: isMobile ? "" : "400vh",
                            paddingBottom: isMobile ? "10vh" : "40vh",
                        }}
                    >
                        {!user.isAdmin && (
                            <DemoItem label={"Previsão da visita (Obrigatório)"}>
                                <MobileDatePicker
                                    sx={{ ...textField }}
                                    format="DD/MM/YYYY"
                                    value={pickDate}
                                    onChange={(newDate) => {
                                        if (newDate !== null) {
                                            setPickDate(newDate)
                                        }
                                    }}
                                    timezone="system"
                                    localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                    disablePast
                                />
                            </DemoItem>
                        )}
                        {user.employee && (
                            <>
                                <Autocomplete
                                    value={selectedProducer}
                                    options={producers || []}
                                    getOptionLabel={(option) => option.user?.name || ""}
                                    // inputValue={inputValue}
                                    onChange={(event, selected) => setSelectedProducer(selected)}
                                    isOptionEqualToValue={(option, value) => option.id == value.id}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Cliente" required />
                                    )}
                                />
                                <Autocomplete
                                    value={tillages.find((item) => item.id === tillageId) || null}
                                    options={tillages || []}
                                    getOptionLabel={(option: { id: number; name: string }) => option.name}
                                    onChange={(event, selected) => {
                                        if (selected) {
                                            formik.setFieldValue("tillageId", selected.id)
                                            setTillageId(selected.id)
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Fazenda" required />
                                    )}
                                    disabled={selectedProducer ? false : true}
                                />
                                <Autocomplete
                                    value={selectedTalhao}
                                    options={talhoes || []}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, selected) => setSelectedTalhao(selected)}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Talhao" required />
                                    )}
                                    disabled={tillageId ? false : true}
                                />
                                <Test
                                    handleChange={formik.handleChange}
                                    values={formik.values}
                                    disabled={tillageId ? false : true}
                                />
                            </>
                        )}
                        {user.isAdmin && (
                            <Box sx={{ gap: "1vw" }}>
                                <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                                    <p style={{ color: colors.primary, fontSize: isMobile ? "3.3vw" : "1rem" }}>
                                        Selecione um kit para marcar a data de visita.
                                    </p>
                                    <Autocomplete
                                        value={selectedKit}
                                        options={kits || []}
                                        getOptionLabel={(option) => option.name || ""}
                                        // inputValue={inputValue}
                                        onChange={(event, selected) => setSelectedKit(selected)}
                                        isOptionEqualToValue={(option, value) => option.id == value.id}
                                        renderInput={(params) => (
                                            <TextField {...params} sx={{ ...textField }} label="kit" required />
                                        )}
                                        disabled={selectedTalhao ? false : true}
                                    />
                                </Box>
                                <DemoItem label={"Previsão da visita*"}>
                                    <MobileDatePicker
                                        sx={{ ...textField }}
                                        format="DD/MM/YYYY"
                                        value={pickDate}
                                        onChange={(newDate) => {
                                            if (newDate !== null) {
                                                setPickDate(newDate)
                                            }
                                        }}
                                        timezone="system"
                                        disabled={selectedKit === null ? true : false}
                                        slots={{
                                            day: ServerDay,
                                        }}
                                        disablePast
                                        shouldDisableDate={shouldDisableDate}
                                    />
                                </DemoItem>
                            </Box>
                        )}
                        {user.producer && (
                            <>
                                <Autocomplete
                                    value={tillagesProducer.find((item) => item.id === tillageId) || null}
                                    options={tillagesProducer || []}
                                    getOptionLabel={(option: { id: number; name: string }) => option.name}
                                    onChange={(event, selected) => {
                                        if (selected) {
                                            formik.setFieldValue("tillageId", selected.id)
                                            setTillageId(selected.id)
                                        }
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Fazenda" required />
                                    )}
                                />
                                <Autocomplete
                                    value={selectedTalhao}
                                    options={talhoesProducer || []}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, selected) => setSelectedTalhao(selected)}
                                    renderInput={(params) => (
                                        <TextField {...params} sx={{ ...textField }} label="Talhao" required />
                                    )}
                                    disabled={tillageId ? false : true}
                                />
                            </>
                        )}

                        <TextField
                            multiline
                            label="Observações"
                            name="comments"
                            value={formik.values.comments}
                            minRows={2}
                            maxRows={5}
                            sx={{
                                ...textField,
                            }}
                            onChange={formik.handleChange}
                            InputProps={{
                                sx: {
                                    "& .MuiOutlinedInput-root": {
                                        "&.Mui-focused fieldset": {
                                            borderColor: colors.secondary,
                                        },
                                        fieldset: {
                                            borderColor: "#232323",
                                        },
                                    },
                                },
                            }}
                        />
                        {user.producer && tillagesProducer.length !== 0 && pickDate && (
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    fontSize: 17,
                                    color: colors.text.white,
                                    width: "100%",
                                    backgroundColor: colors.button,
                                    borderRadius: "5vw",
                                    textTransform: "none",
                                }}
                            >
                                {loading ? <CircularProgress size={"1.6rem"} sx={{ color: "#fff" }} /> : "Abrir Chamado"}
                            </Button>
                        )}
                        {user.employee && tillages.length !== 0 && pickDate && (
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    fontSize: 17,
                                    color: colors.text.white,
                                    width: "100%",
                                    backgroundColor: colors.button,
                                    borderRadius: "5vw",
                                    textTransform: "none",
                                }}
                            >
                                {loading ? <CircularProgress size={"1.6rem"} sx={{ color: "#fff" }} /> : "Abrir Chamado"}
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
