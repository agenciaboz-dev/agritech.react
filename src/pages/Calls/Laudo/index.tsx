import React, { useEffect, useState } from "react"
import { useHeader } from "../../../hooks/useHeader"
import { Box, CircularProgress, TextField } from "@mui/material"
import { Form, Formik } from "formik"
import { TitleComponents } from "../../../components/TitleComponents"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { textField } from "../../../style/input"
import { Modal, Stepper } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
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
import { useSnackbar } from "burgos-snackbar"
import { LocalizationProvider, TimeField, ptBR } from "@mui/x-date-pickers"
import { CiClock2 } from "react-icons/ci"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { useCall } from "../../../hooks/useCall"
import { unmaskNumber } from "../../../hooks/unmaskNumber"

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
            service: "",
            culture: "",
            areaMap: "",
            equipment: "",
            model: "",
        },
        areaTrabalhada: "",
        treatment: {
            products: [],
        },
        material: [],
        techReport: {
            date: "",
            init: "",
            finish: "",
            comments: "",
            flight: [],
        },
    }
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
            callId: call.call?.id,
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

    // useEffect(() => {
    //     console.log({ call: selectedCall })
    // }, [selectedCall])
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
                                                value={selectedCall ? selectedCall.talhao?.tillage?.name : " "}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                            />

                                            <LocalizationProvider
                                                dateAdapter={AdapterDayjs}
                                                localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
                                            >
                                                <DemoContainer components={["TimeField", "TimeField", "TimeField"]}>
                                                    <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                                                        <TextField
                                                            label="Data"
                                                            value={new Date().toLocaleDateString("pt-br")}
                                                            sx={{ ...textField }}
                                                            InputProps={{ readOnly: true }}
                                                            disabled={!user?.producer ? false : true}
                                                        />
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
                                            <Operation
                                                user={user}
                                                values={values}
                                                change={handleChange}
                                                call={selectedCall}
                                            />
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
