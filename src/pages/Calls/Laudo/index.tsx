import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Call, CallStatus } from "../../../definitions/call"
import { Box, CircularProgress, TextField } from "@mui/material"
import { ButtonComponent } from "../../../components/ButtonComponent"
import { Form, Formik } from "formik"
import { TitleComponents } from "../../../components/TitleComponents"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { textField } from "../../../style/input"
import { StageDescription } from "../../../components/StageDescription"
import { Modal, Stepper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import findProducer from "../../../hooks/filterProducer"
import { useKits } from "../../../hooks/useKits"
import { useUsers } from "../../../hooks/useUsers"
import { useCall } from "../../../hooks/useCall"
import { useProducer } from "../../../hooks/useProducer"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { Operation } from "./Operation"

import { useDisclosure } from "@mantine/hooks"
import { ModalProduct } from "./ModalProduct"
import { TechReport } from "./TechReport"
import { ModalFlight } from "./ModalFlight"
import { useCallInfo } from "../../../hooks/useCallSelect"
import { Material } from "./Material"
import { ModalMaterial } from "./ModalMaterials"
import { useIo } from "../../../hooks/useIo"
import { Treatment } from "./Treatment"
import MaskedInput from "../../../components/MaskedInput"
import { dateFrontend } from "../../../hooks/useFormattedDate"
import { useSnackbar } from "burgos-snackbar"

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const { callid } = useParams()
    const call = useCallInfo(callid)

    const [stage, setstage] = useState(0)
    const [loading, setLoading] = useState(true)

    const [opened, { open, close }] = useDisclosure(false)
    const [openedProducts, { open: openProducts, close: closeProducts }] = useDisclosure(false)
    const [openedFlight, { open: openFlight, close: closeFlight }] = useDisclosure(false)
    const [openedMaterials, { open: openMaterials, close: closeMaterials }] = useDisclosure(false)

    const [listProducts, setListProducts] = useState<Product[]>([])
    const [listFlights, setListFlights] = useState<Flight[]>([])
    const [listMaterials, setListMaterials] = useState<Material[]>([])

    const initialValues: NewReport = {
        operation: {
            service: "",
            culture: "",
            areaMap: "",
            equipment: "",
            model: "",
        },
        treatment: {
            products: [],
        },
        material: [],
        techReport: {
            date: new Date().toISOString(),
            init: "",
            finish: "",
            comments: "",
            flight: [],
        },
    }

    const handleSubmit = async (values: NewReport) => {
        // const v = 8
        // var float2 = parseFloat(String(v)).toFixed(2)
        // console.log(float2) // 8.000

        const isoDateTimeStart = `2022-01-24T${values.techReport?.init}:00.000Z`
        const isoDateTimeFinish = `2022-01-23T${values.techReport?.finish}:00.000Z`

        const treatmentNormalize = listProducts?.map((item) => ({
            name: item.name,
            dosage: 3.5,
            unit: item.unit,
        }))

        const flightNormalize = listFlights?.map((item) => ({
            temperature: Number(item.temperature),
            humidity: Number(item.humidity),
            wind_velocity: Number(item.wind_velocity),
            height: Number(item.height),
            faixa: Number(item.faixa),
            flight_velocity: Number(item.flight_velocity),
            tank_volume: Number(item.tank_volume),
            rate: Number(item.rate),
            performance: Number(item.performance),
        }))

        const materialNormalize = listMaterials?.map((item) => ({
            talhao: item.talhao,
            area: Number(item.area),
            product: item.product,
            dosage: Number(item.dosage),
            classification: item.classification,
            total: Number(item.total),
            removed: Number(item.removed),
            applied: Number(item.applied),
            returned: Number(item.returned),
            comments: item.comments,
        }))

        const data = {
            callId: call.call?.id,
            operation: { ...values.operation, areaMap: Number(values.operation?.areaMap) },
            treatment: { ...values.treatment, products: treatmentNormalize },
            techReport: {
                ...values.techReport,
                date: new Date().toISOString(),
                init: new Date().toISOString(),
                finish: new Date().toISOString(),
                flight: flightNormalize,
            },
            material: materialNormalize,
        }
        console.log({ Relatório: data })
        console.log(
            { Products: data.treatment.products },
            { TechReport: flightNormalize },
            { Material: materialNormalize },
            { operation: values.operation }
        )
        if (data) {
            io.emit("report:create", data)
            setLoading(true)
            open()
        }
    }

    useEffect(() => {
        io.on("report:creation:success", (data: Report) => {
            console.log(data)
            snackbar({ severity: "success", text: "Relatório operacional criado!" })

            setLoading(false)
            close()
            navigate(`/adm/report/${data.id}`)
        })
        io.on("report:creation:failed", (error) => {
            snackbar({ severity: "error", text: "Algo deu errado!" })
            setLoading(false)
            close()
        })

        return () => {
            io.off("report:create")
        }
    }, [])
    useEffect(() => {
        header.setTitle("Relatório Operacional")
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
                            ? `/adm/producer/${call.producerSelect?.id}/${call.tillageSelect?.id}`
                            : `/employee/producer/${call.producerSelect?.id}/${call.tillageSelect?.id}`
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
                <TitleComponents
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
                />
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Box sx={{ gap: "3vw", height: "85%", overflowY: "auto", p: "2vw 0" }}>
                            <Form>
                                <Box sx={{ justifyContent: "space-between", height: "100%" }}>
                                    <Box sx={{ gap: "5vw" }}>
                                        <Box gap={"3vw"}>
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
                                                value={call.tillageSelect ? call.tillageSelect?.name : " "}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />
                                            {(stage === 0 || stage === 1) && (
                                                <TextField
                                                    label="Área Trabalhada"
                                                    InputProps={{ endAdornment: "ha" }}
                                                    // name="operation.areaMap"
                                                    type="number"
                                                    // value={values.operation?.areaMap}
                                                    value={22.5}
                                                    sx={{ ...textField }}
                                                    disabled={!user?.producer ? false : true}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            )}
                                            {stage === 2 && (
                                                <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                                    <TextField
                                                        label={"Data"}
                                                        type="text"
                                                        name="techReport.date"
                                                        value={dateFrontend(values.techReport?.date || "")}
                                                        sx={{ ...textField, width: "30%" }}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <TextField
                                                        label="Início"
                                                        name="init"
                                                        type="time"
                                                        value={values.techReport?.init}
                                                        sx={{ ...textField }}
                                                        onChange={!user?.producer ? handleChange : () => {}}
                                                        InputLabelProps={{
                                                            shrink: true, // Encolher o rótulo quando houver valor
                                                        }}
                                                    />
                                                    <TextField
                                                        label="Final"
                                                        name="finish"
                                                        type="time"
                                                        value={values.techReport?.finish}
                                                        sx={{ ...textField }}
                                                        onChange={!user?.producer ? handleChange : () => {}}
                                                        InputLabelProps={{
                                                            shrink: true, // Encolher o rótulo quando houver valor
                                                        }}
                                                    />
                                                </Box>
                                            )}
                                        </Box>
                                        <Stepper
                                            active={stage}
                                            size="xs"
                                            onStepClick={setstage}
                                            styles={{
                                                step: {
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    gap: "2vw",
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
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <Operation user={user} values={values} change={handleChange} call={call.call} />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(1)
                                                }}
                                            >
                                                Tratamento {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 1 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <Treatment
                                                listProducts={listProducts}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openProducts}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(2)
                                                }}
                                            >
                                                Laudo Técnico {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 2 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <TechReport
                                                listFlights={listFlights}
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                open={openFlight}
                                            />
                                            <ButtonAgritech
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(3)
                                                }}
                                            >
                                                Insumos {">"}
                                            </ButtonAgritech>
                                        </Box>
                                    )}
                                    {stage === 3 && (
                                        <Box sx={{ height: "100%", justifyContent: "space-between", pt: "6vw" }}>
                                            <Material
                                                values={values}
                                                change={handleChange}
                                                listMaterials={listMaterials}
                                                open={openMaterials}
                                            />
                                            <ButtonAgritech
                                                type="submit"
                                                variant="contained"
                                                sx={{ bgcolor: colors.button }}
                                                onClick={() => {
                                                    setstage(4)
                                                    console.log("Finalizado")
                                                    handleSubmit(values)
                                                    // navigate(user.isAdmin ? `/` : `/employee`)
                                                }}
                                            >
                                                Enviar Relatório {">"}
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
