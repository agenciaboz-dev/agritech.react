import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Call, Stage } from "../../definitions/call"
import { Box, CircularProgress, TextField } from "@mui/material"
import { useFormik } from "formik"
import { TitleComponents } from "../../components/TitleComponents"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { textField } from "../../style/input"
import { StageDescription } from "../../components/StageDescription"
import { Stepper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../hooks/useUsers"
import { useCall } from "../../hooks/useCall"
import { useProducer } from "../../hooks/useProducer"
import { ButtonAgritech } from "../../components/ButtonAgritech"
import { dateFrontend } from "../../hooks/useFormattedDate"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"

interface ReportCallProps {
    user: User
}

export const ReportCall: React.FC<ReportCallProps> = ({ user }) => {
    const header = useHeader()
    const navigate = useNavigate()
    const io = useIo()
    const { snackbar } = useSnackbar()
    const { callid } = useParams()
    const { listUsers } = useUsers()
    const { listCalls } = useCall()
    const { listTillages } = useProducer()

    const [stage, setstage] = useState(0)
    const [loading, setLoading] = useState(false)
    const [call, setCall] = useState<Call | null>()
    const [producerSelect, setProducerSelect] = useState<User | null>()
    const [tillage, setTillage] = useState<Tillage | null>()

    useEffect(() => {
        setCall(listCalls.find((item) => String(item.id) === callid))
        setProducerSelect(listUsers?.find((item) => item.producer?.id === call?.producerId) || null)
        setTillage(listTillages?.find((item) => item.id === call?.tillageId && item.producerId === call.producerId))
    }, [call])

    const chegadaFormik = useFormik<Stage>({
        initialValues: {
            name: "",
            comments: "",
            date: new Date().toISOString(),
            duration: "",
            finish: "",
            start: "",
            callId: Number(callid),
        },
        onSubmit: (values) => chegadaSubmit(values),
    })
    const pulverizacaoFormik = useFormik<Stage>({
        initialValues: {
            name: "",
            comments: "",
            date: new Date().toISOString(),
            duration: "",
            finish: "",
            start: "",
            callId: Number(callid),
        },
        onSubmit: (values) => pulverizacaoSubmit(values),
    })
    const backFormik = useFormik<Stage>({
        initialValues: {
            name: "",
            comments: "",
            date: new Date().toISOString(),
            duration: "",
            finish: "",
            start: "",
            callId: Number(callid),
        },
        onSubmit: (values) => backSubmit(values),
    })

    const chegadaSubmit = (values: Stage) => {
        const isoDateTimeStart = `2022-01-24T${values.start}:00.000Z`
        const isoDateTimeFinish = `2022-01-23T${values.finish}:00.000Z`
        const data = {
            ...values,
            id: call?.stages[0].id,
            start: isoDateTimeStart,
            finish: isoDateTimeFinish,
        }
        io.emit("stage:update:one", data)
        setLoading(true)
        // console.log(data)
    }

    const pulverizacaoSubmit = (values: Stage) => {
        console.log({ pulverizou: call?.stages[1] })
        const isoDateTimeStart = `2022-01-24T${values.start}:00.000Z`
        const isoDateTimeFinish = `2022-01-23T${values.finish}:00.000Z`
        const data = {
            ...values,
            id: call?.stages[1].id,
            start: isoDateTimeStart,
            finish: isoDateTimeFinish,
        }
        io.emit("stage:update:two", data)
        setLoading(true)
    }

    const backSubmit = (values: Stage) => {
        // console.log({ voltou: values })
        const isoDateTimeStart = `2022-01-24T${values.start}:00.000Z`
        const isoDateTimeFinish = `2022-01-23T${values.finish}:00.000Z`
        const data = {
            ...values,
            id: call?.stages[2].id,
            start: isoDateTimeStart,
            finish: isoDateTimeFinish,
        }
        io.emit("stage:update:three", data)
        setLoading(true)
    }

    useEffect(() => {
        const registerEvents = () => {
            io.on("stage:updateOne:success", (stage) => {
                console.log({ stage1: stage })
                setLoading(false)
                setstage(1)
            })
            io.on("stage:updateOne:failed", (stage) => {
                snackbar({ severity: "error", text: "Tem algo errado com os dados de chegada!" })
            })

            io.on("stage:updateTwo:success", (stage) => {
                console.log({ stage2: stage })
                setLoading(false)
                setstage(2)
            })
            io.on("stage:updateTwo:failed", (stage) => {
                snackbar({ severity: "error", text: "Tem algo errado com os dados de pulverização!!" })
            })

            io.on("stage:updateThree:success", (stage) => {
                snackbar({ severity: "success", text: "Dados registrados!" })
                setLoading(false)
                setstage(3)
                console.log("Finalizado")
                navigate(user.isAdmin ? `/adm/call/${callid}/laudo` : `/employee/call/${callid}/laudo`)
            })
            io.on("stage:updateThree:failed", (stage) => {
                snackbar({ severity: "error", text: "Tem algo errado com os dados de volta!" })
            })

            io.on("call:updateOne:success", (call) => {
                setCall(call)
            })
            io.on("call:updateTwo:success", (call) => {
                setCall(call)
            })
            io.on("call:updateThree:success", (call) => {
                setCall(call)
            })
        }

        // Função para desregistrar todos os eventos
        const unregisterEvents = () => {
            io.off("stage:updateOne:success")
            io.off("stage:updateOne:failed")
            io.off("stage:updateTwo:success")
            io.off("stage:updateTwo:failed")
            io.off("stage:updateThree:success")
            io.off("stage:updateThree:failed")
        }

        // Registre os eventos uma vez
        registerEvents()

        return () => {
            // Ao desmontar o componente, desregiste os eventos
            unregisterEvents()
        }
    }, [])

    useEffect(() => {
        header.setTitle("Painel")
    }, [])

    useEffect(() => {
        console.log({ Estágio: call })
    }, [call])
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
                            ? `/adm/producer/${producerSelect?.id}/${tillage?.id}`
                            : `/employee/producer/${producerSelect?.id}/${tillage?.id}`
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
                    title="Chamado"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Cliente"
                    click={() =>
                        navigate(
                            user.isAdmin ? `/adm/profile/${producerSelect?.id}` : `/employee/profilw/${producerSelect?.id}`
                        )
                    }
                    variant
                />

                <Box sx={{ gap: "3vw", height: "85%", overflowY: "auto", p: "2vw 0" }}>
                    <Box sx={{ justifyContent: "space-between", height: "100%" }}>
                        <Box sx={{ gap: "4vw" }}>
                            <TextField
                                label="Aberto em"
                                name="init"
                                type="text"
                                value={dateFrontend(call?.init || "")}
                                sx={{ ...textField }}
                                inputProps={{ "aria-readonly": true }}
                                disabled={!user?.producer ? false : true}
                            />
                            <TextField
                                label="Cliente"
                                name="producer"
                                value={producerSelect ? producerSelect?.name : ""}
                                sx={{ ...textField }}
                                disabled={!user?.producer ? false : true}
                            />
                            <TextField
                                label="Talhão"
                                name="tillage"
                                value={tillage ? tillage?.name : " "}
                                sx={{ ...textField }}
                                disabled={!user?.producer ? false : true}
                            />
                        </Box>
                        <Stepper
                            active={stage}
                            size="xs"
                            // onStepClick={setstage}
                            styles={{
                                step: { flexDirection: "column", alignItems: "center", gap: "4vw" },
                                content: { margin: 0 },
                                stepIcon: { margin: 0 },
                                stepBody: { margin: 0 },
                            }}
                        >
                            <Stepper.Step label="Chegada" step={2} />
                            <Stepper.Step label="Pulverização" />
                            <Stepper.Step label="Finalização" />
                        </Stepper>
                        {stage === 0 && (
                            <form onSubmit={chegadaFormik.handleSubmit}>
                                <StageDescription
                                    title={"Chegada na localização"}
                                    values={chegadaFormik.values}
                                    change={chegadaFormik.handleChange}
                                />
                                <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                    {loading ? (
                                        <CircularProgress size="7vw" sx={{ color: colors.text.white }} />
                                    ) : (
                                        "Chegou na Localização"
                                    )}
                                </ButtonAgritech>
                            </form>
                        )}
                        {stage === 1 && (
                            <form onSubmit={pulverizacaoFormik.handleSubmit}>
                                <StageDescription
                                    title={"Pulverização"}
                                    values={pulverizacaoFormik.values}
                                    change={pulverizacaoFormik.handleChange}
                                />
                                <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                    {loading ? (
                                        <CircularProgress size="7vw" sx={{ color: colors.text.white }} />
                                    ) : (
                                        "Finalizar Pulverização"
                                    )}
                                </ButtonAgritech>
                            </form>
                        )}
                        {stage === 2 && (
                            <form onSubmit={backFormik.handleSubmit}>
                                <StageDescription
                                    title={"Volta da Localização"}
                                    values={backFormik.values}
                                    change={backFormik.handleChange}
                                />

                                <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                    {loading ? (
                                        <CircularProgress size="7vw" sx={{ color: colors.text.white }} />
                                    ) : (
                                        "Voltou da localização"
                                    )}
                                </ButtonAgritech>
                            </form>
                        )}
                        {/* {!user?.producer && <ButtonComponent title="Reportar" location="" />} */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
