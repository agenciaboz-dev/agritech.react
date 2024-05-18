import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { Call } from "../../definitions/call"
import { Box, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { useFormik } from "formik"
import { TitleComponents } from "../../components/TitleComponents"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
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
import { useReports } from "../../hooks/useReports"
import { useResponsiveStyles } from "../../hooks/useResponsiveStyles"

interface ReportStageProps {
    user: User
}

export const ReportStage: React.FC<ReportStageProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
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
    const { update } = useReports()

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
    }, [call, listCalls, listTillages])

    // useEffect(() => {
    //     if (listTillages.length == 0) io.emit("tillages:list")
    // }, [])

    // const stageCurrent = call?.stage === 1 ? 0 : call?.stage === 2 ? 1 : call?.stage === 3 ? 2 : 3
    const [stage, setstage] = useState(0)
    // console.log(stageCurrent)

    // console.log(call?.stage)
    // console.log({ stage: stage })

    const initialValues: Stage = {
        name: "",
        comments: "",
        date: "",
        duration: "",
        finish: "",
        start: "",
        reportId: Number(reportid),
    }

    const chegadaFormik = useFormik<Stage>({
        initialValues,
        onSubmit: (values) => chegadaSubmit(values),
    })
    const pulverizacaoFormik = useFormik<Stage>({
        initialValues,
        onSubmit: (values) => pulverizacaoSubmit(values),
    })

    const chegadaSubmit = (values: Stage) => {
        const durationTimestamp =
            Number(new Date(Number(finishPick)).getTime().toString()) -
            Number(new Date(Number(initPick)).getTime().toString())

        // console.log(`Novo Timestamp: ${new Date(Number(durationTimestamp)).toLocaleDateString("pr-br")}`)

        const data = {
            ...values,
            date: new Date().getTime().toString(),
            start: new Date(Number(initPick)).getTime().toString(),
            finish: new Date(Number(finishPick)).getTime().toString(),
            // duration: durationTimestamp.toString(),
        }

        io.emit("stage:new", data, 2)
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
        io.emit("stage:new", data, 3)
        setLoading(true)
        console.log(data)
    }

    useEffect(() => {
        console.log({ Call: listCalls })
    }, [call])

    useEffect(() => {
        // if (listReports.length == 0) {
        //     io.emit("report:list")
        //     console.log("emitiu report")
        // }
    }, [])
    useEffect(() => {
        console.log({ Estágio: report })
        console.log(report?.stage)
    }, [report?.stage])

    useEffect(() => {
        if (report) {
            if (report.stage) setstage(report.stage)
        }

        if (report?.stage === 3) {
            navigate(user.isAdmin ? `/adm/call/${callid}/laudo/${reportid}` : `/employee/call/${callid}/laudo/${report.id}`)
        }

        io.on("stage:new", (report: Report) => {
            setLoading(false)
            update(report)
            console.log(report)
            setReport(report)
            report.stage && setstage(report.stage)
        })

        return () => {
            io.off("stage:new")
        }
    }, [report])
    useEffect(() => {
        console.log(report)
    }, [report])
    useEffect(() => {
        header.setTitle("Painel")
    }, [])

    return (
        report && (
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
                    <Header
                        back
                        location={user?.isAdmin ? `/adm/call/${callid}/laudos` : `/employee/call/${callid}/laudos`}
                    />
                </Box>

                <Box
                    style={{
                        padding: isMobile ? "5vw" : "1vw",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                        borderTopRightRadius: isMobile ? "5vw" : "2vw",
                        gap: isMobile ? "5vw" : "1vw",
                        overflow: "hidden",
                        flexDirection: "column",
                    }}
                >
                    <TitleComponents
                        title="Chamado"
                        style={{ fontSize: isMobile ? "5vw" : "1.5rem" }}
                        button={user?.employee ? true : false}
                        textButton="Acessar Cliente"
                        click={() =>
                            navigate(
                                user.isAdmin
                                    ? `/adm/profile/${producerSelect?.id}`
                                    : `/employee/profilw/${producerSelect?.id}`
                            )
                        }
                        variant
                    />

                    <Box
                        sx={{
                            gap: "1vw",
                            height: "85%",
                        }}
                    >
                        <Box
                            sx={{
                                p: isMobile ? "2vw 0" : "1vw 0",
                                gap: isMobile ? "7vw" : "1vw",
                                height: "100%",
                                overflowY: "auto",
                                // paddingBottom: "400vh",
                                paddingBottom: "40vh",
                            }}
                        >
                            <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                                <TextField
                                    label="Aberto em"
                                    name="init"
                                    type="text"
                                    value={new Date(Number(call?.init)).toLocaleDateString("pt-br")}
                                    sx={{ ...textField }}
                                    inputProps={{ "aria-readonly": true }}
                                    disabled
                                />
                                <TextField
                                    label="Cliente"
                                    name="producer"
                                    value={producerSelect ? producerSelect?.name : ""}
                                    sx={{ ...textField }}
                                    disabled
                                />
                                <TextField
                                    label="Fazenda"
                                    name="tillage"
                                    value={call?.talhao?.tillage?.name}
                                    sx={{ ...textField }}
                                    disabled
                                />
                            </Box>

                            {stage === 1 && (
                                <form onSubmit={chegadaFormik.handleSubmit}>
                                    <StageDescription
                                        title={"Chegada na localização"}
                                        values={chegadaFormik.values}
                                        change={chegadaFormik.handleChange}
                                        data={dates}
                                    />
                                    <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                        {loading ? (
                                            <CircularProgress size={"1.6rem"} sx={{ color: colors.text.white }} />
                                        ) : (
                                            "Chegou na Localização"
                                        )}
                                    </ButtonAgritech>
                                </form>
                            )}
                            {stage === 2 && (
                                <form onSubmit={pulverizacaoFormik.handleSubmit}>
                                    <StageDescription
                                        title={"Pulverização"}
                                        values={pulverizacaoFormik.values}
                                        change={pulverizacaoFormik.handleChange}
                                        data={dates}
                                    />
                                    <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                                        {loading ? (
                                            <CircularProgress
                                                size={isMobile ? "1.6rem" : "2vw"}
                                                sx={{ color: colors.text.white }}
                                            />
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
                                        <CircularProgress size={isMobile ? "7vw" : "2vw"} sx={{ color: colors.text.white }} />
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
    )
}
