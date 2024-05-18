import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Box, CircularProgress, TextField, useMediaQuery } from "@mui/material"
import { Form, Formik, useFormik } from "formik"
import { TitleComponents } from "../../../components/TitleComponents"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { Modal, Stepper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { OperationComponent } from "./Operation"
import { useDisclosure } from "@mantine/hooks"
import { ModalProduct } from "./ModalProduct"
import { TechReportComponent } from "./TechReportComponent"
import { ModalFlight } from "./ModalFlight"
import { useCallInfo } from "../../../hooks/useCallSelect"
import { MaterialComponent } from "./MaterialComponent"
import { ModalMaterial } from "./ModalMaterials"
import { useIo } from "../../../hooks/useIo"
import { TreatmentComponent } from "./Treatment"
import { useSnackbar } from "burgos-snackbar"
import { useCall } from "../../../hooks/useCall"
import { unmaskNumber } from "../../../hooks/unmaskNumber"
import {
    Flight,
    Material,
    NewReport,
    Operation,
    Product,
    Report,
    Stage,
    TechReport,
    Treatment,
} from "../../../definitions/report"
import { ModalStage } from "./ModalStage"
import { useReports } from "../../../hooks/useReports"
import { useResponsiveStyles } from "../../../hooks/useResponsiveStyles"

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { textField } = useResponsiveStyles()
    const io = useIo()
    const header = useHeader()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const { callid, reportid } = useParams()
    const call = useCallInfo(callid)
    const { listCalls } = useCall()
    const { listReports } = useReports()

    const selectedCall = listCalls.find((item) => item.id === Number(callid))
    const [report, setReport] = useState<Report>()
    // console.log({ Laudo: selectedCall })

    const [stage, setstage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [opened, { open, close }] = useDisclosure(false)
    const [openedProducts, { open: openProducts, close: closeProducts }] = useDisclosure(false)
    const [openedFlight, { open: openFlight, close: closeFlight }] = useDisclosure(false)
    const [openedMaterials, { open: openMaterials, close: closeMaterials }] = useDisclosure(false)

    const [listProducts, setListProducts] = useState<Product[]>([])
    const [listFlights, setListFlights] = useState<Flight[]>([])
    const [listMaterials, setListMaterials] = useState<Material[]>([])
    const [initPick, setInitPick] = useState(null)
    const [finishPick, setFinishPick] = useState(null)
    const { update } = useReports()

    const initialValues: NewReport = {
        operation: {
            service: report?.operation?.id ? report?.operation?.service : "",
            culture: report?.operation?.id ? report?.operation?.culture : "",
            areaMap: "",
            equipment: report?.call?.kit ? report?.call?.kit?.name : "",
            model: "",
        },
        areaTrabalhada: String(report?.areaTrabalhada) || "",
        treatment: {
            products: [],
        },
        material: [],
        techReport: {
            date: new Date(Number(report?.techReport?.date)).toLocaleDateString("pt-br") || "",
            init: new Date(Number(report?.techReport?.init)).toLocaleTimeString("pt-br") || "",
            finish: new Date(Number(report?.techReport?.finish)).toLocaleTimeString("pt-br") || "",
            comments: "",
            flight: [],
        },
    }
    const flightNormalize = listFlights?.map((item) => ({
        temperature: unmaskNumber(item.temperature),
        humidity: unmaskNumber(item.humidity),
        wind_velocity: unmaskNumber(item.wind_velocity),
        height: unmaskNumber(item.height),
        faixa: unmaskNumber(item.faixa),
        flight_velocity: unmaskNumber(item.flight_velocity),
        tank_volume: unmaskNumber(item.tank_volume),
        rate: unmaskNumber(item.rate),
        performance: unmaskNumber(item.performance),
    }))
    //calculate areaTrabalhada
    const sumArea = flightNormalize?.map((item) => Number(item.performance))
    const totalSum = sumArea.reduce((acc, currentValue) => acc + currentValue, 0)

    useEffect(() => {
        if (report?.treatment?.products) setListProducts(report?.treatment?.products)
        if (report?.material) setListMaterials(report?.material)
        if (report?.techReport?.flight) setListFlights(report?.techReport.flight)
    }, [report])

    useEffect(() => {
        if (listReports.length == 0) io.emit("report:list")
        if (listCalls.length == 0) io.emit("call:listApproved")
    }, [])

    useEffect(() => {
        setReport(listReports.find((item) => item.id === Number(reportid)))
        console.log({ REport: reportid })
    }, [listReports])

    useEffect(() => {
        console.log({ Atualizou: report })
    }, [report])

    const updateOperation = async (values: Operation | undefined) => {
        if (values && report) {
            const data = {
                id: report?.operation?.id,
                ...values,
                areaMap: Number(selectedCall?.talhao?.tillage?.area),
                reportId: report.id,
            }
            io.emit("operation:update", data)
            console.log({ data })
        } else {
            console.log("sem report")
        }
    }
    useEffect(() => {
        console.log({ aquiauiq: selectedCall?.reports })
    }, [report])
    useEffect(() => {
        io.on("operation:update:success", (data: Report) => {
            console.log(data)
            update(data)
        })
        io.on("operation:update:failed", (error) => {
            console.log(error)
        })
        return () => {
            io.off("operation:update:success")
            io.off("operation:update:failed")
        }
    }, [])

    const createTreatment = async (values: Treatment | undefined) => {
        if (values && report) {
            const treatmentNormalize = listProducts?.map((item) => ({
                name: item.name,
                dosage: item.dosage,
            }))

            const data = {
                id: report?.treatment?.id,
                ...values,
                products: treatmentNormalize,
                reportId: report.id,
            }
            io.emit("treatment:update", data)
            console.log({ enviei: data })
        }
    }

    useEffect(() => {
        io.on("treatment:update:success", (data) => {
            update(data)
            console.log(data)
        })
        io.on("treatment:update:failed", (error) => {
            console.log(error)
        })
        return () => {
            io.off("treatment:update:success")
            io.off("treatment:update:failed")
        }
    }, [])
    useEffect(() => {
        console.log({ Chegou: report })
    }, [])

    const createTechReport = async (values: TechReport | undefined) => {
        if (values && report) {
            const flightNormalize = listFlights?.map((item) => ({
                temperature: unmaskNumber(item.temperature),
                humidity: unmaskNumber(item.humidity),
                wind_velocity: unmaskNumber(item.wind_velocity),
                height: unmaskNumber(item.height),
                faixa: unmaskNumber(item.faixa),
                flight_velocity: unmaskNumber(item.flight_velocity),
                tank_volume: unmaskNumber(item.tank_volume),
                rate: unmaskNumber(item.rate),
                performance: unmaskNumber(item.performance),
            }))
            //calculate areaTrabalhada
            const sumArea = flightNormalize?.map((item) => Number(item.performance))
            const totalSum = sumArea.reduce((acc, currentValue) => acc + currentValue, 0)

            const data = {
                id: report?.techReport?.id,
                ...values,

                areaTrabalhada: totalSum,
                date: new Date().getTime().toString(),
                init: new Date(Number(initPick)).getTime().toString(),
                finish: new Date(Number(finishPick)).getTime().toString(),
                flight: flightNormalize,
                reportId: report.id,
            }
            io.emit("techReport:update", data)
            // io.emit("report:update", data)
            console.log({ enviei: data })
        }
    }

    useEffect(() => {
        io.on("techReport:update:success", (data) => {
            update(data)
            console.log(data)
        })
        io.on("techReport:update:failed", (error) => {
            console.log(error)
        })
        return () => {
            io.off("techReport:update:success")
            io.off("techReport:update:failed")
        }
    }, [])

    const submitMaterial = async () => {
        const materialNormalize = listMaterials?.map((item) => ({
            talhao: item.talhao,
            area: unmaskNumber(item.area),
            product: item.product,
            dosage: item.dosage,
            classification: item.classification,
            total: item.total,
            removed: item.removed,
            applied: item.applied,
            returned: item.returned,
            comments: item.comments,
        }))

        const data = {
            reportId: report?.id,
            totalPrice: totalSum * Number(selectedCall?.talhao?.tillage?.hectarePrice),
            areaTrabalhada: totalSum,
            materials: materialNormalize,
        }
        io.emit("report:update", data)

        console.log({ enviei: data })
    }

    useEffect(() => {
        io.on("report:update:success", (data) => {
            update(data)
            console.log(data)
        })
        io.on("report:update:failed", (error) => {
            console.log(error)
        })
        return () => {
            io.off("report:update:success")
            io.off("report:update:failed")
        }
    }, [])

    const handleSubmit = async (values: NewReport) => {
        const treatmentNormalize = listProducts?.map((item) => ({
            name: item.name,
            dosage: item.dosage,
        }))

        const flightNormalize = listFlights?.map((item) => ({
            temperature: unmaskNumber(item.temperature),
            humidity: unmaskNumber(item.humidity),
            wind_velocity: unmaskNumber(item.wind_velocity),
            height: unmaskNumber(item.height),
            faixa: unmaskNumber(item.faixa),
            flight_velocity: unmaskNumber(item.flight_velocity),
            tank_volume: unmaskNumber(item.tank_volume),
            rate: unmaskNumber(item.rate),
            performance: unmaskNumber(item.performance),
        }))

        //calculate areaTrabalhada
        const sumArea = flightNormalize?.map((item) => Number(item.performance))
        const totalSum = sumArea.reduce((acc, currentValue) => acc + currentValue, 0)
        console.log({ total: totalSum })

        const materialNormalize = listMaterials?.map((item) => ({
            talhao: item.talhao,
            area: unmaskNumber(item.area),
            product: item.product,
            dosage: item.dosage,
            classification: item.classification,
            total: item.total,
            removed: item.removed,
            applied: item.applied,
            returned: item.returned,
            comments: item.comments,
        }))

        const data = {
            id: Number(reportid),
            areaTrabalhada: totalSum,
            operation: { ...values.operation, areaMap: Number(selectedCall?.talhao?.tillage?.area) },
            treatment: { ...values.treatment, products: treatmentNormalize },
            techReport: {
                ...values.techReport,
                date: new Date().getTime().toString(),
                init: new Date(Number(initPick)).getTime().toString(),
                finish: new Date(Number(finishPick)).getTime().toString(),
                flight: flightNormalize,
            },
            material: materialNormalize,
        }
        console.log({ Relatório: data })

        // console.log(data)
        // console.log(initPick)
        if (data) {
            io.emit("report:update", data)
            setLoading(true)
            open()
        }
    }

    useEffect(() => {
        io.on("report:update:success", (data: Report) => {
            console.log(data)
            snackbar({ severity: "success", text: "Relatório operacional criado!" })

            setLoading(false)
            close()
            // navigate(`/adm/report/${data.id}`)
        })
        io.on("report:update:failed", (error) => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
            setLoading(false)
            close()
        })

        return () => {
            io.off("report:update:success")
            io.off("report:update:failed")
        }
    }, [])

    useEffect(() => {
        header.setTitle("Relatório Operacional")
    }, [])

    useEffect(() => {
        console.log(report)
    }, [])

    // useEffect(() => {
    //     console.log({ call: selectedCall })
    // }, [selectedCall])

    const [openedStageFinish, { open: openStage, close: closeStage }] = useDisclosure(false)
    const closeReport = async () => {}

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
            <Modal
                color="#000"
                opened={opened}
                onClose={close}
                size={"sm"}
                withCloseButton={false}
                centered
                style={{ backgroundColor: "transparent" }}
                styles={{
                    body: {
                        display: "flex",
                        flexDirection: "column",
                        gap: isMobile ? "6vw" : "1vw",
                        width: "100%",
                        height: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    root: {
                        width: "100%",

                        height: "100%",
                        maxHeight: "75%",
                    },
                    content: {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
            >
                <CircularProgress
                    size={"1.6rem"}
                    sx={{ color: colors.text.white, width: isMobile ? "15vw" : "2vw", height: isMobile ? "15vw" : "2vw" }}
                />
            </Modal>
            <ModalProduct
                opened={openedProducts}
                close={closeProducts}
                product={listProducts}
                setproduct={setListProducts}
            />
            {report && <ModalStage opened={openedStageFinish} close={closeStage} report={report} />}
            <ModalFlight opened={openedFlight} close={closeFlight} flight={listFlights} setFlight={setListFlights} />
            <ModalMaterial
                opened={openedMaterials}
                close={closeMaterials}
                material={listMaterials}
                setMaterial={setListMaterials}
            />
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                }}
            >
                <Header
                    back
                    location={
                        user?.isAdmin
                            ? `/adm/producer/${selectedCall?.producerId}/${selectedCall?.talhao?.tillageId}`
                            : `/employee/producer/${selectedCall?.producerId}/${selectedCall?.talhao?.tillageId}`
                    }
                />
            </Box>

            <Box
                style={{
                    padding: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    gap: isMobile ? "3vw" : "1vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                <TitleComponents
                    title="Preencher dados"
                    style={{ fontSize: isMobile ? "5vw" : "1.5rem" }}
                    button={user?.employee ? true : false}
                    styleButton
                    textButton="Fechar Relatório"
                    click={openStage}
                    variant
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                    {({ values, handleChange }) => (
                        <Box
                            sx={{
                                gap: isMobile ? "4vw" : "1vw",
                                height: "80%",
                                overflowY: "auto",
                                p: isMobile ? "2vw 0" : "1vw 0",
                                pb: "10vw",
                            }}
                        >
                            <Form>
                                <Box sx={{ height: "100%", pb: "7vw" }}>
                                    <Box sx={{ gap: isMobile ? "3vw" : "1vw" }}>
                                        <Box gap={isMobile ? "2vw" : "1vw"}>
                                            <Box sx={{ flexDirection: "row", gap: isMobile ? "2vw" : "1vw" }}>
                                                <TextField
                                                    label="Propriedade"
                                                    name="tillage"
                                                    value={selectedCall ? selectedCall.talhao?.tillage?.name : " "}
                                                    sx={{ ...textField, width: 0.5 }}
                                                    disabled
                                                />
                                                <TextField
                                                    label="Data do relatório"
                                                    value={new Date(Number(report?.date)).toLocaleDateString("pt-br")}
                                                    sx={{ ...textField, width: 0.5 }}
                                                    disabled
                                                />
                                            </Box>
                                            <TextField
                                                label="Contratante"
                                                name="producer"
                                                value={call.producerSelect ? call.producerSelect?.name : ""}
                                                sx={{ ...textField }}
                                                disabled
                                            />
                                        </Box>

                                        <Stepper
                                            active={stage}
                                            size="xs"
                                            onStepClick={setstage}
                                            styles={{
                                                step: {
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "1vw",
                                                    justifyContent: "center",
                                                    marginLeft: 0,
                                                },
                                                content: { margin: 0 },
                                                stepIcon: { margin: 0 },
                                                stepBody: { margin: 0 },
                                            }}
                                        >
                                            <Stepper.Step label="Operação" step={2} />
                                            <Stepper.Step label="Tratamento" />
                                            <Stepper.Step label="Laudo Técnico" />
                                            <Stepper.Step label="Insumos" />
                                        </Stepper>
                                    </Box>
                                    {stage === 0 && (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                pt: isMobile ? "5vw" : "1vw",
                                                gap: isMobile ? "5vw" : "1vw",
                                                pb: isMobile ? "5vw" : "1vw",
                                            }}
                                        >
                                            <OperationComponent
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                call={selectedCall}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                // type="submit"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    updateOperation(values.operation)
                                                    setstage(1)
                                                }}
                                            >
                                                Salvar{">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 1 && (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                pt: isMobile ? "5vw" : "1vw",
                                                pb: isMobile ? "4vw" : "1vw",
                                                gap: isMobile ? "5vw" : "1vw",
                                            }}
                                        >
                                            <TreatmentComponent
                                                listProducts={listProducts}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openProducts}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                // type="submit"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    createTreatment(values.treatment)
                                                    setstage(2)
                                                }}
                                            >
                                                Salvar{">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 2 && (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                pb: "10vw",
                                                pt: isMobile ? "5vw" : "1vw",
                                                gap: isMobile ? "2vw" : "1vw",
                                            }}
                                        >
                                            <TechReportComponent
                                                listFlights={listFlights}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openFlight}
                                                initPick={setInitPick}
                                                finishPick={setFinishPick}
                                                setInitPick={setInitPick}
                                                setFinishPick={setFinishPick}
                                            />
                                            <ButtonAgritech
                                                // type="submit"
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    createTechReport(values.techReport)
                                                    setstage(3)
                                                }}
                                            >
                                                Salvar {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 3 && (
                                        <Box
                                            sx={{
                                                height: "100%",
                                                justifyContent: "space-between",
                                                pt: isMobile ? "5vw" : "1vw",
                                            }}
                                        >
                                            <MaterialComponent
                                                values={values}
                                                change={handleChange}
                                                listMaterials={listMaterials}
                                                open={openMaterials}
                                            />
                                            <ButtonAgritech
                                                // type="submit"
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    submitMaterial()
                                                    console.log("Finalizado")
                                                    // handleSubmit(values)
                                                    // navigate(user.isAdmin ? `/` : `/employee`)
                                                }}
                                            >
                                                Salvar {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {/* {!user?.producer && <ButtonComponent title="Reportar" location="" />} */}
                                </Box>
                            </Form>
                        </Box>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}
