import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Call } from "../../definitions/call"
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
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Report, Stage } from "../../definitions/report"

interface ReportStageProps {
    user: User
}

export const ReportStage: React.FC<ReportStageProps> = ({ user }) => {
    const header = useHeader()
    const navigate = useNavigate()
    const io = useIo()
    const { snackbar } = useSnackbar()
    const { callid, reportid } = useParams()
    const { listUsers } = useUsers()
    const { listCalls } = useCall()
    const { listTillages } = useProducer()

    const [loading, setLoading] = useState(false)
    const [call, setCall] = useState<Call | null>()
    const [report, setReport] = useState<Report | null>()
    const [producerSelect, setProducerSelect] = useState<User | null>()
    const [tillage, setTillage] = useState<Tillage | null>()

    const [initPick, setInitPick] = useState(null)
    const [finishPick, setFinishPick] = useState(null)
    const [durationPick, setDuration] = useState(null)

    const dates = {
        initPick: initPick,
        setInitPick: setInitPick,
        finishPick: finishPick,
        setFinishPick: setFinishPick,
        durationPick: durationPick,
        setDuration: setDuration,
    }

    useEffect(() => {
        setCall(listCalls.find((item) => String(item.id) === callid))
        if (call) {
            setReport(call.reports?.find((item) => item.id === Number(reportid)))
        }
        setProducerSelect(listUsers?.find((item) => item.producer?.id === call?.producerId) || null)
        setTillage(listTillages?.find((item) => item.id === call?.talhao?.tillageId && item.producerId === call.producerId))
    }, [call, listCalls])

    // const stageCurrent = call?.stage === "STAGE1" ? 0 : call?.stage === "STAGE2" ? 1 : call?.stage === "STAGE3" ? 2 : 3
    const [stage, setstage] = useState(0)
    // console.log(stageCurrent)

    // console.log(call?.stage)
    // console.log({ stage: stage })

    const chegadaFormik = useFormik<Stage>({
        initialValues: {
            name: "",
            comments: "",
            date: "",
            duration: "",
            finish: "",
            start: "",
            reportId: Number(reportid),
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
            reportId: Number(reportid),
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
            reportId: Number(reportid),
        },
        onSubmit: (values) => backSubmit(values),
    })

    const chegadaSubmit = (values: Stage) => {
        const durationTimestamp =
            Number(new Date(Number(finishPick)).getTime().toString()) -
            Number(new Date(Number(initPick)).getTime().toString())

        // console.log(`Novo Timestamp: ${new Date(Number(durationTimestamp)).toLocaleDateString("pr-br")}`)

        const data = {
            ...values,
            id: report?.stages ? report?.stages[0].id : null,
            date: new Date().getTime().toString(),
            start: new Date(Number(initPick)).getTime().toString(),
            finish: new Date(Number(finishPick)).getTime().toString(),
            duration: durationTimestamp.toString(),
        }
        io.emit("stage:update:one", data)
        setLoading(true)
        console.log({ STEP1: data })
    }

    const pulverizacaoSubmit = (values: Stage) => {
        // console.log({ pulverizou: report?.stages[1] })
        const data = {
            ...values,
            id: report?.stages ? report?.stages[1].id : null,
            date: new Date().getTime().toString(),
            start: new Date(Number(initPick)).getTime().toString(),
            finish: new Date(Number(finishPick)).getTime().toString(),
        }
        io.emit("stage:update:two", data)
        setLoading(true)
        console.log(data)
    }

    const backSubmit = (values: Stage) => {
        const data = {
            ...values,
            id: report?.stages ? report?.stages[2].id : null,
            date: new Date().getTime().toString(),
            start: new Date(Number(initPick)).getTime().toString(),
            finish: new Date(Number(finishPick)).getTime().toString(),
        }
        io.emit("stage:update:three", data)
        setLoading(true)
    }

    useEffect(() => {
        console.log({ Estágio: report })
        // setstage(stageCurrent)
        // console.log(stageCurrent)

        console.log(report?.stage)
    }, [report?.stage])

    useEffect(() => {
        if (report?.stage === "STAGE3") {
            navigate(user.isAdmin ? `/adm/call/${callid}/laudo/${reportid}` : `/employee/call/${callid}/laudo`)
        }
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
                snackbar({ severity: "success", text: "Dados registrados!" })

                setLoading(false)
                setstage(2)
                navigate(user.isAdmin ? `/adm/call/${call?.id}/laudo/${stage.reportId}` : `/employee/call/${call?.id}/laudo`)
            })
            io.on("stage:updateTwo:failed", (stage) => {
                snackbar({ severity: "error", text: "Tem algo errado com os dados de pulverização!!" })
            })

            io.on("stage:updateThree:success", (stage) => {
                snackbar({ severity: "success", text: "Dados registrados!" })
                setLoading(false)
                console.log("Finalizado")
                setstage(3)
                // navigate(user.isAdmin ? `/adm/call/${callid}/laudo` : `/employee/call/${callid}/laudo`)
            })
            io.on("stage:updateThree:failed", (stage) => {
                snackbar({ severity: "error", text: "Tem algo errado com os dados de volta!" })
            })

            // io.on("call:updateOne:success", (call) => {
            //     setCall(call)
            // })
            // io.on("call:updateTwo:success", (call) => {
            //     setCall(call)
            // })
            // io.on("call:updateThree:success", (call) => {
            //     setCall(call)
            // })
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
    }, [stage])
    useEffect(() => {
        console.log({ REPORT: report?.stage })
        if (report?.stage === "STAGE1") {
            setstage(0)
        } else if (report?.stage === "STAGE2") {
            setstage(1)
        } else if (report?.stage === "STAGE3") {
            setstage(2)
        }
        console.log({ STAFE: stage })
    }, [report?.stage])

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
                <Header back location={user?.isAdmin ? `/adm/call/${callid}/laudos` : `/employee/call/${callid}/laudos`} />
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
                                value={new Date(Number(call?.init)).toLocaleDateString("pt-br")}
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
                                label="Fazenda"
                                name="tillage"
                                value={tillage ? tillage?.name : " "}
                                sx={{ ...textField }}
                                disabled={!user?.producer ? false : true}
                            />
                        </Box>
                        {call?.stage !== "STAGE3" && (
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
                                <Stepper.Step label="Chegada" />
                                <Stepper.Step label="Pulverização" />
                                {/* <Stepper.Step label="Finalização" /> */}
                            </Stepper>
                        )}
                        {stage === 0 && (
                            <form onSubmit={chegadaFormik.handleSubmit}>
                                <StageDescription
                                    title={"Chegada na localização"}
                                    values={chegadaFormik.values}
                                    change={chegadaFormik.handleChange}
                                    data={dates}
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
                                    data={dates}
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
                        {/* {stage === 2 && (
                            <form onSubmit={backFormik.handleSubmit}>
                                <StageDescription
                                    title={"Volta da Localização"}
                                    values={backFormik.values}
                                    change={backFormik.handleChange}
                                    data={dates}
                                />

                                <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                    {loading ? (
                                        <CircularProgress size="7vw" sx={{ color: colors.text.white }} />
                                    ) : (
                                        "Voltou da localização"
                                    )}
                                </ButtonAgritech>
                            </form>
                        )} */}
                        {/* {!user?.producer && <ButtonComponent title="Reportar" location="" />} */}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
