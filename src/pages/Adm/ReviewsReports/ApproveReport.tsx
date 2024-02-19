import React, { useEffect, useState } from "react"
import { Accordion, Box, Button, Radio, TextField } from "@mui/material"
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
import { LocalizationProvider, MobileDatePicker, ptBR } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo"
import dayjs from "dayjs"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import { unmaskCurrency } from "../../../hooks/unmaskNumber"

interface ApproveReportProps {}

const p_style = {
    fontSize: "3vw",
    fontWeight: "600",
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ApproveReport: React.FC<ApproveReportProps> = ({}) => {
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
    console.log(tillageSelected)
    const [hectare, setHectare] = useState("")

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
        kitId: findCall?.kitId || 0,
        hectarePrice: findCall?.tillage?.hectarePrice || "",
        forecast: findCall?.forecast || "",
    }
    const approveCall = (values: ApprovedCall) => {
        console.log(values)
        const data = { ...values, hectarePrice: unmaskCurrency(values.hectarePrice || "") }
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
                                    <Box sx={{ gap: "5vw" }}>
                                        <Box sx={{ gap: "3vw" }}>
                                            <TextField
                                                label="Previsão da visita"
                                                sx={{ ...textField }}
                                                value={dateForecast}
                                            />
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

                                        <TitleComponents
                                            title="Escolha o kit para enviar"
                                            button
                                            textButton="Salvar Kit"
                                            submit
                                            disabled={!values.kitId}
                                        />
                                        <Box sx={{ height: "100%", overflowY: "auto" }}>
                                            {kitsActived.map((kit, index) => (
                                                <Accordion
                                                    elevation={0}
                                                    key={index}
                                                    expanded={expanded === String(index)}
                                                    onChange={expandendChange(String(index))}
                                                >
                                                    <AccordionSummary aria-controls="panel1d-content" id={String(index)}>
                                                        <Typography>{kit.name}</Typography>
                                                        <Radio
                                                            name="kitId"
                                                            value={kit.id}
                                                            checked={values.kitId === kit.id}
                                                            onChange={() => {
                                                                setFieldValue("kitId", kit.id)
                                                                handleChange
                                                            }}
                                                        />
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <p>Objetos</p>
                                                        {kit.objects?.map((obj: NewObject, index) => (
                                                            <p key={index}>
                                                                {obj.quantity}x {obj.name}
                                                            </p>
                                                        ))}
                                                    </AccordionDetails>
                                                </Accordion>
                                            ))}
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
