import { Autocomplete, Badge, Box, Button, CircularProgress, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { useHeader } from "../../hooks/useHeader"
import { TitleComponents } from "../../components/TitleComponents"
import { useFormik } from "formik"
import { Call, CreateCall } from "../../definitions/call"
import { textField } from "../../style/input"
import { useUser } from "../../hooks/useUser"
import { useKits } from "../../hooks/useKits"
import { useProducer } from "../../hooks/useProducer"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useCall } from "../../hooks/useCall"
import dayjs, { Dayjs } from "dayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker"
import { ptBR } from "@mui/x-date-pickers/locales"
import { unmaskCurrency } from "../../hooks/unmaskNumber"
import { Test } from "./Test"
import { useUsers } from "../../hooks/useUsers"
import { Indicator } from "@mantine/core"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers"
interface NewCallProps {
    user: User
}

export const NewCall: React.FC<NewCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
    const account = useUser()
    const navigate = useNavigate()
    const { listUsers } = useUsers()
    const { snackbar } = useSnackbar()
    const { listKits } = useKits()
    const { listTillages } = useProducer()
    const { addCall, addCallPending, addCallApprove } = useCall()

    const [highlightedDays, setHighlightedDays] = React.useState()

    const [loading, setLoading] = useState(false)
    const [selectedProducer, setSelectedProducer] = useState<Producer | null>(null)
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)
    const [selectedTalhao, setSelectedTalhao] = useState<Talhao | null>(null)

    const [producers, setProducers] = useState(
        listUsers?.map((user: User) => user.producer).filter((item) => !!item) as Producer[]
    )
    const [kits, setKits] = useState(listKits?.filter((item) => !!item) as Kit[])
    const [tillages, setTillages] = useState<Tillage[]>([])
    const [talhoes, setTalhoes] = useState<Talhao[]>([])

    const [tillageId, setTillageId] = useState<number | null>(null)
    const [talhaoId, setTalhaoId] = useState<number | null>(null)
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)

    const findTillageInfo = selectedProducer?.tillage?.find((item) => item.id === tillageId)
    const talhaoSelect = findTillageInfo?.talhao?.find((item) => item.id === talhaoId)

    //Render options => user.producer
    const producerTillagesList = listTillages.filter((item) => item.producerId === user.producer?.id)
    const [tillagesProducer, setTillagesProducer] = useState<{ id: number; name: string }[]>(
        user.producer?.tillage?.map((tillage) => ({
            id: tillage.id,
            name: tillage.name,
            call: tillage.call,
        })) || []
    )

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
        const data = {
            approved: user.isAdmin ? true : false,
            open: new Date().getTime().toString(),
            comments: "",
            producerId: user.producer ? user.producer.id : selectedProducer?.id,
            talhaoId: selectedTalhao?.id,
            userId: Number(account?.user?.id),
            kitId: selectedKit?.id,
            forecast: dayjs(pickDate).valueOf().toString(),
            hectarePrice: unmaskCurrency(values.hectarePrice),
        }
        console.log(data)
        io.emit(user.isAdmin ? "admin:call:create" : "call:create", data)
        setLoading(true)
    }

    const newTheme = (theme: any) =>
        createTheme({
            ...theme,
            components: {
                MuiPickersToolbar: {
                    styleOverrides: {
                        root: {
                            color: "#fff",
                            // borderRadius: 5,
                            borderWidth: 0,
                            backgroundColor: colors.primary,
                        },
                    },
                },
                MuiPickersMonth: {
                    styleOverrides: {
                        monthButton: {
                            borderRadius: 20,
                            borderWidth: 0,
                            border: "0px solid",
                        },
                    },
                },
                MuiPickersDay: {
                    styleOverrides: {
                        root: {
                            color: colors.primary,
                            borderRadius: 20,
                            borderWidth: 0,
                        },
                    },
                },
            },
        })

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
    useEffect(() => {
        setTillagesProducer(
            producerTillagesList.map((tillage) => ({
                id: tillage.id,
                name: tillage.name,
                call: tillage.call,
            })) || []
        )
    }, [listTillages])

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

    useEffect(() => {
        io.on(user.isAdmin ? "adminCall:creation:success" : "call:creation:success", (data: Call) => {
            // console.log({ chamadoAberto: data })
            addCall(data)
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
        io.on(user.isAdmin ? "adminCall:creation:failed" : "call:creation:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Algo deu errado" })
            setLoading(false)
        })
        io.on("call:update:failed", (error) => {
            console.log({ chamadoAberto: error })
            snackbar({ severity: "error", text: "Já existe chamado ativo pra esse Fazenda!" })
            setLoading(false)
        })
        return () => {
            io.off("call:creation:success")
            io.off("call:creation:failed")
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
                <Header back location={account.user?.isAdmin ? "/" : user?.producer ? "/producer/" : "/employee/"} />
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
                    title="Novo Chamado"
                    style={{ fontSize: "5vw" }}
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
                    <Box sx={{ gap: "4vw" }}>
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
                                <Box gap="4vw">
                                    <p style={{ color: colors.primary, fontSize: "3.3vw" }}>
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
                                <LocalizationProvider
                                    dateAdapter={AdapterDayjs}
                                    localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                >
                                    <DemoContainer components={["MobileDatePicker"]}>
                                        <DemoItem label={"Previsão da visita"}>
                                            <ThemeProvider theme={newTheme}>
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
                                                />
                                            </ThemeProvider>
                                        </DemoItem>
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Box>
                        )}
                        {/* {user.producer && (
                                    <>
                                        <Autocomplete
                                            value={
                                                tillagesProducer.find((tillage) => tillage.id === values.tillageId) || null
                                            }
                                            inputValue={inputValue}
                                            options={tillagesProducer || []}
                                            getOptionLabel={(option: { id: number; name: string }) => option.name}
                                            onChange={(event, selected) => {
                                                if (selected) {
                                                    setFieldValue("tillageId", selected.id)
                                                    setTillageId(selected.id)
                                                }
                                            }}
                                            renderOption={(props, option) => {
                                                // Verifique se a opção atual tem uma 'call' associada
                                                const isOptionDisabled = allCalls.some((call) =>
                                                    account.user?.producer
                                                        ? call.producerId === user?.producer?.id &&
                                                          call.tillageId === option.id
                                                        : call.producerId === producerId && call.tillageId === option.id
                                                )

                                                return (
                                                    <li
                                                        {...props}
                                                        style={{
                                                            color: isOptionDisabled ? "black" : "black",
                                                            // Desabilitar a opção se necessário
                                                            pointerEvents: isOptionDisabled ? "none" : "auto",
                                                            opacity: isOptionDisabled ? 0.7 : 1,
                                                            flexDirection: "column",

                                                            alignItems: "start",
                                                        }}
                                                    >
                                                        {option.name}{" "}
                                                        {isOptionDisabled && (
                                                            <span style={{ color: colors.delete, fontSize: "3vw" }}>
                                                                Já existe chamado
                                                            </span>
                                                        )}
                                                    </li>
                                                )
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} sx={{ ...textField }} label="Fazenda" required />
                                            )}
                                        />
                                        <Autocomplete
                                            value={talhoes.find((tillage) => tillage.id === values.talhaoId) || null}
                                            inputValue={inputValue}
                                            options={talhoes || []}
                                            getOptionLabel={(option: { id: number; name: string }) => option.name}
                                            onChange={(event, selected) => {
                                                if (selected) {
                                                    setFieldValue("tillageId", selected.id)
                                                    setTillageId(selected.id)
                                                }
                                            }}
                                            renderOption={(props, option) => {
                                                // Verifique se a opção atual tem uma 'call' associada
                                                const isOptionDisabled = allCalls.some((call) =>
                                                    account.user?.producer
                                                        ? call.producerId === user?.producer?.id &&
                                                          call.tillageId === option.id
                                                        : call.producerId === producerId && call.tillageId === option.id
                                                )

                                                return (
                                                    <li
                                                        {...props}
                                                        style={{
                                                            color: isOptionDisabled ? "black" : "black",
                                                            // Desabilitar a opção se necessário
                                                            pointerEvents: isOptionDisabled ? "none" : "auto",
                                                            opacity: isOptionDisabled ? 0.7 : 1,
                                                            flexDirection: "column",

                                                            alignItems: "start",
                                                        }}
                                                    >
                                                        {option.name}{" "}
                                                        {isOptionDisabled && (
                                                            <span style={{ color: colors.delete, fontSize: "3vw" }}>
                                                                Já existe chamado
                                                            </span>
                                                        )}
                                                    </li>
                                                )
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} sx={{ ...textField }} label="Talhao" required />
                                            )}
                                        />
                                    </>
                                )} */}

                        <TextField
                            multiline
                            label="Observações"
                            name="comments"
                            value={formik.values.comments}
                            minRows={5}
                            maxRows={15}
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
                        {user.producer && tillagesProducer.length !== 0 && (
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
                                {loading ? <CircularProgress sx={{ color: "#fff" }} /> : "Abrir Chamado"}
                            </Button>
                        )}
                        {user.employee && tillages.length !== 0 && (
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
                                {loading ? <CircularProgress sx={{ color: "#fff" }} /> : "Abrir Chamado"}
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </Box>
    )
}
