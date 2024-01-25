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

interface LaudoCallProps {
    user: User
}

export const LaudoCall: React.FC<LaudoCallProps> = ({ user }) => {
    const io = useIo()
    const header = useHeader()
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
            areaMap: 0,
            equipment: "",
            model: "",
        },
        treatment: {
            products: [],
        },
        material: [],
        techReport: {
            date: "",
            init: "",
            finish: "",
            comments: "",
            flights: [],
        },
    }

    const handleSubmit = (values: NewReport) => {
        const treatmentNormalize = listProducts?.map((item) => ({
            name: item.name,
            dosage: parseFloat(item.dosage).toFixed(2),
        }))

        const materialNormalize = listMaterials?.map((item) => ({
            talhao: item.talhao,
            area: parseFloat(String(item.area)).toFixed(2),
            product: item.product,
            dosage: parseFloat(String(item.dosage)).toFixed(2),
            classification: item.classification,
            total: parseFloat(String(item.total)).toFixed(2),
            removed: parseFloat(String(item.removed)).toFixed(2),
            applied: parseFloat(String(item.applied)).toFixed(2),
            returned: parseFloat(String(item.returned)).toFixed(2),
            comments: item.comments,
        }))

        const data = {
            ...values,
            call: call,
            producer: call.producerSelect?.producer,
            operation: { areaMap: values.operation?.areaMap && parseFloat(String(values.operation?.areaMap)).toFixed(2) },
            treatment: { products: listMaterials },
            techReport: { flights: listFlights },
            material: listMaterials,
        }
        console.log({ Relatório: data })
        console.log(materialNormalize)
        if (data) {
            io.emit("", data)
            setLoading(true)
            open()
            close()
        }
    }

    useEffect(() => {
        io.on("", (data) => {
            console.log(data.report)
            setLoading(false)
            close()
        })

        return () => {
            io.off("")
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
                                            <TextField
                                                label="Área Trabalhada"
                                                InputProps={{ endAdornment: "ha" }}
                                                name="tillage"
                                                value={values.operation?.areaMap}
                                                sx={{ ...textField }}
                                                disabled={!user?.producer ? false : true}
                                                onChange={handleChange}
                                                required
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
