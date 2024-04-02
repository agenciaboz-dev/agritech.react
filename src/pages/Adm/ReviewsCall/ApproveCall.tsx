import React, { useEffect, useState } from "react"
import { Accordion, Autocomplete, Badge, Box, Button, Radio, TextField } from "@mui/material"
import { Avatar } from "@files-ui/react"
import GeoImage from "../../../assets/geo.svg"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { useHeader } from "../../../hooks/useHeader"
import { useNavigate, useParams } from "react-router-dom"
import { TitleComponents } from "../../../components/TitleComponents"
import { styled } from "@mui/material/styles"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { AccordionSummary } from "../../../components/Accordion"
import { useCall } from "../../../hooks/useCall"
import { useKits } from "../../../hooks/useKits"
import { ApprovedCall, Call } from "../../../definitions/call"
import { Form, Formik } from "formik"
import { NewObject } from "../../../definitions/object"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useUsers } from "../../../hooks/useUsers"
import { textField } from "../../../style/input"
import { MobileDatePicker, PickersDay, ptBR } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import dayjs, { Dayjs } from "dayjs"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import { unmaskCurrency } from "../../../hooks/unmaskNumber"
import { Indicator } from "@mantine/core"

interface ApproveCallProps {}

const p_style = {
    fontSize: "3vw",
    fontWeight: "600",
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ApproveCall: React.FC<ApproveCallProps> = ({}) => {
    const header = useHeader()
    const io = useIo()
    const navigate = useNavigate()
    const { callid } = useParams()
    const { listCallsPending, listCalls, removeCallApprove, addCallApprove } = useCall()
    const { listKits } = useKits()
    const { listUsers } = useUsers()

    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const [expanded, setExpanded] = React.useState<string | false>("")

    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const findCall = listCallsPending?.find((call) => String(call.id) === callid)

    const producerSelected = listUsers?.find((item) => item.producer?.id === findCall?.producerId)
    const tillageSelected = producerSelected?.producer?.tillage?.find((item) => item.id === findCall?.talhaoId)
    const kitsActived = listKits.filter((item) => item.active)
    const [kits, setKits] = useState(listKits.filter((item) => !!item && item.active))
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)

    console.log(tillageSelected)
    const [hectare, setHectare] = useState("")
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)
    const [kitId, setKitId] = useState<number>(0)

    useEffect(() => {
        setHectare(findCall?.tillage?.hectarePrice || "")
    }, [findCall])
    const initialValues: ApprovedCall = {
        open: findCall?.open || "",
        comments: findCall?.comments,
        approved: findCall?.approved,

        talhaoId: findCall?.talhaoId || 0,
        producerId: findCall?.producerId,
        userId: findCall?.userId,

        id: Number(callid),
        kitId: undefined || 0,
        hectarePrice: findCall?.tillage?.hectarePrice || "",
        forecast: new Date(Number(findCall?.forecast) || 0).toLocaleDateString("pt-br") || "",
    }
    const approveCall = (values: ApprovedCall) => {
        console.log(values)
        const data = {
            ...values,
            hectarePrice: unmaskCurrency(values.hectarePrice || ""),
            forecast: dayjs(pickDate).valueOf().toString(),
            kitId: selectedKit?.id ? selectedKit?.id : undefined,
        }
        io.emit("call:approve", data)
        setLoading(true)
    }

    const dateForecast = findCall?.forecast
        ? new Date(Number(findCall?.forecast) || 0).toLocaleDateString("pt-Br")
        : new Date().toLocaleDateString("pt-br")

    useEffect(() => {
        io.on("call:approve:success", (data: Call) => {
            console.log({ chamado_aprovado: data })
            removeCallApprove(data)
            addCallApprove(data)
            snackbar({ severity: "success", text: "Chamado aprovado!" })
            setLoading(false)
            navigate("/adm/calls")
        })
        io.on("call:approve:failed", (error) => {
            snackbar({ severity: "error", text: error })
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (kitsActived.length == 0) io.emit("kit:list")
    }, [listKits])

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

        const totalArea = areaDayCalls + Number(findCall?.talhao?.area)

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
                <Header back location="/adm/calls" />
            </Box>
            <Box
                style={{
                    height: "92%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                }}
            >
                <Box sx={{ width: "100%", height: "90%", gap: "7vw", flexDirection: "column", p: "4vw" }}>
                    <p style={{ fontSize: "4.5vw" }}>Abertura do Chamado</p>

                    <Box
                        sx={{
                            flexDirection: "row",
                            gap: "5vw",
                            width: "100%",
                            height: "23%",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            src={GeoImage}
                            // onChange={(file) => setImage(file)}
                            changeLabel="Trocar foto"
                            emptyLabel="Adicionar foto"
                            variant="square"
                            style={{
                                width: "40vw",
                                height: "40vw",
                                fontSize: "4vw",
                                fontFamily: "MalgunGothic2",
                            }}
                        />
                        <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                            <Box>
                                <p style={p_style}>Nome da Fazenda</p>
                                <p>
                                    {findCall?.talhao?.tillage?.name} - {findCall?.talhao?.name}
                                </p>
                            </Box>
                            <Box>
                                <p style={p_style}>Endereço </p>
                                <p>
                                    {findCall?.talhao?.tillage?.address?.street},{" "}
                                    {findCall?.talhao?.tillage?.address.district} -{" "}
                                    {findCall?.talhao?.tillage?.address?.city}, {findCall?.talhao?.tillage?.address?.uf} -{" "}
                                    {findCall?.talhao?.tillage?.address?.cep}
                                </p>
                            </Box>
                            <Box>
                                <p style={p_style}>Área</p>
                                <p>{findCall?.talhao?.area} ha</p>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ height: "63%" }}>
                        <Formik initialValues={initialValues} onSubmit={approveCall}>
                            {({ values, handleChange, setFieldValue }) => (
                                <Form>
                                    <TitleComponents
                                        title="Escolha o kit responsável"
                                        button
                                        textButton="Salvar Kit"
                                        submit
                                    />
                                    <Box sx={{ gap: "5vw" }}>
                                        <Box sx={{ gap: "3vw" }}>
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
                                            />
                                            <DemoItem label={"Previsão da visita"}>
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
                                            </DemoItem>
                                            <TextField
                                                label={"Custo por hectare"}
                                                name="hectarePrice"
                                                value={values.hectarePrice}
                                                sx={textField}
                                                onChange={handleChange}
                                                InputProps={{
                                                    inputComponent: MaskedInputNando,
                                                    inputProps: {
                                                        mask: useCurrencyMask({ decimalLimit: 6 }),
                                                        inputMode: "numeric",
                                                    },
                                                }}
                                                required
                                            />
                                        </Box>
                                    </Box>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
