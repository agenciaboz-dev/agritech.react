import React, { useEffect, useState } from "react"
import { Accordion, Autocomplete, Avatar, Badge, Box, Button, Radio, Skeleton, TextField, useMediaQuery } from "@mui/material"
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
import { MobileDatePicker, PickersDay, ptBR } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import dayjs, { Dayjs } from "dayjs"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import { unmaskCurrency } from "../../../hooks/unmaskNumber"
import { Indicator } from "@mantine/core"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface ApproveCallProps {}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ApproveCall: React.FC<ApproveCallProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const textField = useResponsiveStyles()
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
    console.log(findCall)

    const producerSelected = listUsers?.find((item) => item.producer?.id === findCall?.producerId)
    const tillageSelected = producerSelected?.producer?.tillage?.find((item) => item.id === findCall?.talhaoId)
    const kitsActived = listKits.filter((item) => item.active)
    const [kits, setKits] = useState(listKits.filter((item) => !!item && item.active))
    const [selectedKit, setSelectedKit] = useState<Kit | null>(null)

    console.log(tillageSelected)
    const [hectare, setHectare] = useState("")
    const [pickDate, setPickDate] = useState<Dayjs | null>(null)
    const [kitId, setKitId] = useState<number>(0)

    const [cover, setCover] = useState("")

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
            return callDate.getDate() === day.date() && callDate.getMonth() === day.month() && callDate.getFullYear() === day.year()
        })

        const areaDayCalls =
            callsForDay?.map((item: any) => Number(item.talhao?.area)).reduce((prev: number, current: number) => prev + current, 0) || 0

        const totalArea = areaDayCalls + Number(findCall?.talhao?.area)

        const indicatorColor =
            callsForDay &&
            callsForDay.length > 0 &&
            selectedKit &&
            selectedKit.hectareDay &&
            (totalArea <= selectedKit.hectareDay ? "#88A486" : totalArea > selectedKit.hectareDay && colors.delete)

        return (
            <Badge key={day.toString()} overlap="circular" badgeContent={<Indicator color={indicatorColor || "#88A486"} size={7} offset={5} />}>
                <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
            </Badge>
        )
    }

    useEffect(() => {
        if (listKits.length === 0) io.emit("")
        if (findCall?.talhao) io.emit("tillage:cover", findCall?.talhao.tillageId)

        io.on("tillage:cover:success", (data: any) => {
            setCover(data.cover)
            console.log(data.cover)
        })
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
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="/adm/calls" />
            </Box>
            <Box
                style={{
                    height: "92%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "90%",
                        gap: isMobile ? "9vw" : "1vw",
                        flexDirection: "column",
                        p: isMobile ? "4vw" : "1vw",
                        overflowY: "auto",
                        // paddingBottom: "400vh",
                        paddingBottom: "40vh",
                    }}
                >
                    <p style={{ fontSize: isMobile ? "4.5vw" : "1.2rem" }}>Abertura do Chamado</p>

                    <Box
                        sx={{
                            flexDirection: "row",
                            gap: isMobile ? "5vw" : "1vw",
                            width: "100%",
                            height: isMobile ? "45%" : "fit-content",
                            alignItems: "center",
                        }}
                    >
                        {cover ? (
                            <Avatar
                                src={cover ? cover : ""}
                                // onChange={(file) => setImage(file)}

                                variant="rounded"
                                style={{
                                    flex: 1,
                                    height: isMobile ? "38vw" : "20vw",
                                    fontSize: isMobile ? "4vw" : "1.2rem",
                                    fontFamily: "MalgunGothic2",
                                }}
                            />
                        ) : (
                            <Skeleton animation="wave" variant="rounded" sx={{ flex: 1, height: isMobile ? "38vw" : "20vw" }} />
                        )}
                        <Box sx={{ flexDirection: "column", gap: isMobile ? "2vw" : "1vw", flex: 1 }}>
                            <Box sx={{ width: 1 }}>
                                <p style={{ fontSize: isMobile ? "3vw" : "1rem", fontWeight: "600" }}>Nome da Fazenda</p>
                                <p
                                    style={{
                                        width: "40vw",
                                        // maxWidth: "90%", // Defina a largura máxima em vez de largura
                                        textOverflow: "ellipsis", // Adicione reticências ao texto que ultrapassa o limite de largura
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                    }}
                                >
                                    {findCall?.talhao?.tillage?.name} - {findCall?.talhao?.name}
                                </p>
                            </Box>
                            <Box>
                                <p style={{ fontSize: isMobile ? "3vw" : "1rem", fontWeight: "600" }}>Endereço </p>
                                <p>
                                    {findCall?.talhao?.tillage?.address?.street}, {findCall?.talhao?.tillage?.address.district} -{" "}
                                    {findCall?.talhao?.tillage?.address?.city}, {findCall?.talhao?.tillage?.address?.uf} -{" "}
                                    {findCall?.talhao?.tillage?.address?.cep}
                                </p>
                            </Box>
                            <Box>
                                <p style={{ fontSize: isMobile ? "3vw" : "1rem", fontWeight: "600" }}>Área: {findCall?.talhao?.area} ha</p>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ height: isMobile ? "63%" : "fit-content" }}>
                        <Formik initialValues={initialValues} onSubmit={approveCall}>
                            {({ values, handleChange, setFieldValue }) => (
                                <Form>
                                    <TitleComponents title="Escolha o kit responsável" button textButton="Salvar Kit" submit />
                                    <Box sx={{ gap: isMobile ? "5vw" : "1vw" }}>
                                        <Box sx={{ gap: isMobile ? "3vw" : "1vw", padding: "1vw 0" }}>
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
                                                renderInput={(params) => <TextField {...params} sx={{ ...textField }} label="kit" required />}
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
