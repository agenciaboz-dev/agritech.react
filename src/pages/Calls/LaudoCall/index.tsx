import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Box, CircularProgress, TextField } from "@mui/material"
import { Form, Formik, useFormik } from "formik"
import { TitleComponents } from "../../../components/TitleComponents"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { textField } from "../../../style/input"
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
import { LocalizationProvider, TimeField, ptBR } from "@mui/x-date-pickers"
import { CiClock2 } from "react-icons/ci"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
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
import dayjs from "dayjs"
import { ModalStage } from "./ModalStage"

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const { callid, reportid } = useParams()
    const call = useCallInfo(callid)
    const { listCalls } = useCall()

    const selectedCall = listCalls.find((item) => item.id === Number(callid))
    const report = selectedCall?.reports?.find((item) => item.id === Number(reportid))
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
    const [areaTrabalhada, setAreaTrabalhada] = useState("")
    const [initPick, setInitPick] = useState(null)
    const [finishPick, setFinishPick] = useState(null)

    const initialValues: NewReport = {
        operation: {
            service: report?.operation?.service || "",
            culture: report?.operation?.culture || "",
            areaMap: "",
            equipment: report?.call?.kit?.name || "",
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
    }, [])

    const updateOperation = async (values: Operation | undefined) => {
        if (values) {
            const data = {
                id: report?.operation?.id,
                ...values,
                areaMap: Number(selectedCall?.talhao?.tillage?.area),
            }
            io.emit("operation:update", data)
        }
    }

    useEffect(() => {
        io.on("operation:update:success", (data) => {
            console.log(data)
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
        if (values) {
            const treatmentNormalize = listProducts?.map((item) => ({
                name: item.name,
                dosage: unmaskNumber(item.dosage),
                unit: item.unit,
            }))

            const data = {
                id: report?.treatment?.id,
                ...values,
                products: treatmentNormalize,
            }
            io.emit("treatment:update", data)
            console.log({ enviei: data })
        }
    }

    useEffect(() => {
        io.on("treatment:update:success", (data) => {
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
        if (values) {
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
            }
            io.emit("techReport:update", data)
            // io.emit("report:update", data)
            console.log({ enviei: data })
        }
    }

    useEffect(() => {
        io.on("techReport:update:success", (data) => {
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
            dosage: unmaskNumber(item.dosage),
            classification: item.classification,
            total: unmaskNumber(item.total),
            removed: unmaskNumber(item.removed),
            applied: unmaskNumber(item.applied),
            returned: unmaskNumber(item.returned),
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
            dosage: unmaskNumber(item.dosage),
            unit: item.unit,
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
            dosage: unmaskNumber(item.dosage),
            classification: item.classification,
            total: unmaskNumber(item.total),
            removed: unmaskNumber(item.removed),
            applied: unmaskNumber(item.applied),
            returned: unmaskNumber(item.returned),
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
                        gap: "6vw",
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
                <CircularProgress sx={{ color: colors.text.white, width: "15vw", height: "15vw" }} />
            </Modal>
            <ModalProduct
                opened={openedProducts}
                close={closeProducts}
                product={listProducts}
                setproduct={setListProducts}
            />
            <ModalStage opened={openedStageFinish} close={closeStage} report={report} />
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
                            ? `/adm/producer/${selectedCall?.producerId}/${selectedCall?.talhao?.tillageId}`
                            : `/employee/producer/${selectedCall?.producerId}/${selectedCall?.talhao?.tillageId}`
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
                    gap: "3vw",
                    overflow: "hidden",
                    flexDirection: "column",
                }}
            >
                {/* <TitleComponents
                    title="Preencher dados"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    textButton="Acessar Cliente"
                    click={() =>
                        navigate(
                            user.isAdmin
                                ? `/adm/profile/${call.producerSelect?.id}`
                                : `/employee/profile/${call.producerSelect?.id}`
                        )
                    }
                    variant
                /> */}
                <TitleComponents
                    title="Preencher dados"
                    style={{ fontSize: "5vw" }}
                    button={user?.employee ? true : false}
                    styleButton
                    textButton="Fechar Relatório"
                    click={openStage}
                    variant
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Box sx={{ gap: "4vw", height: "85%", overflowY: "auto", p: "2vw 0" }}>
                            <Form>
                                <Box sx={{ justifyContent: "space-between", height: "100%" }}>
                                    <Box sx={{ gap: "3vw" }}>
                                        <Box gap={"2vw"}>
                                            <Box sx={{}}>
                                                <p>{new Date(Number(report?.date)).toLocaleDateString("pt-br")}</p>
                                                <Box
                                                    sx={{
                                                        flexDirection: "row",
                                                        justifyContent: "space-between",
                                                        width: "100%",
                                                    }}
                                                >
                                                    {report?.techReport?.init && (
                                                        <p>
                                                            <span style={{ fontWeight: "bold" }}>Início: </span>
                                                            {new Date(Number(report.techReport.init)).toLocaleTimeString(
                                                                "pt-br"
                                                            )}{" "}
                                                        </p>
                                                    )}
                                                    {report?.techReport?.finish && (
                                                        <p>
                                                            <span style={{ fontWeight: "bold" }}>Final: </span>
                                                            {new Date(Number(report.techReport.finish)).toLocaleTimeString(
                                                                "pt-br"
                                                            )}{" "}
                                                        </p>
                                                    )}
                                                </Box>
                                            </Box>
                                            <TextField
                                                label="Contratante"
                                                name="producer"
                                                value={call.producerSelect ? call.producerSelect?.name : ""}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                            <TextField
                                                label="Propriedade"
                                                name="tillage"
                                                value={selectedCall ? selectedCall.talhao?.tillage?.name : " "}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />

                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                            >
                                                <DemoContainer
                                                    components={["TimeField", "TimeField", "TimeField"]}
                                                    sx={{ paddingTop: 0 }}
                                                >
                                                    <Box sx={{ flexDirection: "row", gap: "1vw", paddingTop: "0" }}>
                                                        {!report?.techReport?.init && (
                                                            <TimeField
                                                                label="Início"
                                                                name="init"
                                                                sx={{ ...textField }}
                                                                value={initPick}
                                                                onChange={(newValue) => setInitPick(newValue)}
                                                                format="HH:mm"
                                                                ampm={false}
                                                                InputProps={{
                                                                    inputMode: "numeric",
                                                                    endAdornment: (
                                                                        <CiClock2
                                                                            style={{
                                                                                color: "black",
                                                                                width: "6vw",
                                                                                height: "6vw",
                                                                            }}
                                                                        />
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                        {!report?.techReport?.finish && (
                                                            <TimeField
                                                                label="Final"
                                                                name="finish"
                                                                sx={{ ...textField }}
                                                                value={finishPick}
                                                                onChange={(newValue) => setFinishPick(newValue)}
                                                                format="HH:mm"
                                                                ampm={false}
                                                                InputProps={{
                                                                    inputMode: "numeric",
                                                                    endAdornment: (
                                                                        <CiClock2
                                                                            style={{
                                                                                color: "black",
                                                                                width: "6vw",
                                                                                height: "6vw",
                                                                            }}
                                                                        />
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    </Box>
                                                </DemoContainer>
                                            </LocalizationProvider>
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
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "5vw" }}>
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
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "5vw" }}>
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
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "5vw" }}>
                                            <TechReportComponent
                                                listFlights={listFlights}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openFlight}
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
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "5vw" }}>
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
