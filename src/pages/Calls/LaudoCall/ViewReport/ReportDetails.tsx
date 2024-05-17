import {
    Accordion,
    AccordionSummary,
    Box,
    CircularProgress,
    Skeleton,
    Tab,
    Tabs,
    Typography,
    styled,
    useMediaQuery,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useCall } from "../../../../hooks/useCall"
import { OperationComponent } from "./OperationComponent"
import { TreatmentComponent } from "./TreatmentComponent"
import { TechReportComponent } from "./TechReportComponent"

// import { MaterialComponent } from "./Material"
import { ActionIcon, Group, Menu, Modal } from "@mantine/core"
import { IconDots } from "@tabler/icons-react"
import { ButtonAgritech } from "../../../../components/ButtonAgritech"
import MuiAccordionDetails from "@mui/material/AccordionDetails"
import { CurrencyText } from "../../../../components/CurrencyText"
import { formatCNPJ, formatCPF } from "../../../../hooks/useFormattedDocument.ts"
import { MaterialComponent } from "./MaterialComponent.tsx"
import { useUser } from "../../../../hooks/useUser.ts"
import { useIo } from "../../../../hooks/useIo.ts"
import { Report } from "../../../../definitions/report"
import { useSnackbar } from "burgos-snackbar"
import { useDisclosure } from "@mantine/hooks"
import { api } from "../../../../api/index.ts"
import { useReports } from "../../../../hooks/useReports.ts"
import { Call } from "../../../../definitions/call"
import { useResponsiveStyles } from "../../../../hooks/useResponsiveStyles.ts"

interface ReportDetailsProps {}

const modal = {
    title: "Tem certeza que deseja cancelar esse chamado?",
    content: "Uma vez que cancelado o mesmo chamado não poderá ser refeito, apenas um novo poderá ser aberto.",
    submitTitle: "Sim, cancelar",
    cancelTitle: "Não",
}
const p_style = {
    fontSize: "3.5vw",
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    // padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ReportDetails: React.FC<ReportDetailsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const { tabStyle } = useResponsiveStyles()
    const io = useIo()
    const { callid, reportid } = useParams()
    const { listCalls } = useCall()
    const { listReports, update } = useReports()
    const { user } = useUser()
    const { snackbar } = useSnackbar()

    const [opened, { open, close }] = useDisclosure(false)

    const [selectedReport, setSelectedReport] = useState<Report>()
    const [call, setCall] = useState<Call>()

    const [expanded, setExpanded] = React.useState<string | false>("")
    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const [tab, setTab] = React.useState("operation")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        if (listCalls.length == 0) {
            io.emit("call:listApproved")
            console.log("emitiu call")
        }
        if (listReports.length == 0) {
            io.emit("report:list")
            console.log("emitiu report")
        }
    }, [])

    useEffect(() => {
        listCalls && setCall(listCalls.find((item) => item.id === Number(callid)))
    }, [listCalls])

    useEffect(() => {
        console.log({ encontrei: listReports.find((item) => item.id === Number(reportid)) })
    }, [listReports])

    useEffect(() => {
        console.log({ encontrei: listReports.find((item) => item.id === Number(reportid)) })
        const foundReport = listReports.find((item) => item.id === Number(reportid))
        console.log({ foundReport })
        if (foundReport) {
            setSelectedReport(foundReport)
            console.log("entrou")
        }
        console.log({ selectedReport })
    }, [listReports, reportid])

    const handleApprove = async () => {
        io.emit("report:approve", selectedReport?.id)
        open()
    }

    const exportPDF = async () => {
        console.log(selectedReport?.pdf_path)
        selectedReport?.pdf_path && openPDFLink(selectedReport.pdf_path)
    }

    const openPDFLink = (url: string) => {
        //@ts-ignore
        if (window.ReactNativeWebView) {
            const data = { type: "pdf", url }
            // @ts-ignore
            window.ReactNativeWebView.postMessage(JSON.stringify(data))
        } else {
            window.open(url, "_blank")?.focus()
        }
    }

    useEffect(() => {
        io.on("report:approved:success", (data: Report) => {
            snackbar({ severity: "success", text: "Relatório aprovado" })
            update(data)
            close()
        })
        io.on("report:approved:failed", (error) => {
            console.log(error)
        })
        return () => {
            io.off("report:approved:success")
            io.off("report:approved:failed")
        }
    }, [])

    useEffect(() => {
        console.log(selectedReport)
    }, [selectedReport])

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
                    sx={{ color: colors.text.white, width: isMobile ? "15vw" : "2vw", height: isMobile ? "15vw" : "2vw" }}
                />
            </Modal>
            <Box
                sx={{
                    width: "100%",
                    height: isMobile ? "10%" : "fit-content",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: isMobile ? "4vw" : "2.5vw",
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                <Header
                    back
                    location={
                        user?.isAdmin
                            ? `/adm/producer/${call?.producerId}/${call?.talhao?.tillageId}`
                            : `/call/${call?.id}/laudos`
                    }
                />
            </Box>

            <Box
                sx={{
                    padding: isMobile ? "5vw" : "1vw",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                    borderTopRightRadius: isMobile ? "7vw" : "2vw",
                    gap: isMobile ? "4vw" : "1vw",
                    height: "100%",
                    overflow: "auto",
                    // paddingBottom: "400vh",
                    paddingBottom: "40vh",
                }}
            >
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>Relatório Operacional</h3>

                    <Group gap={0} justify="flex-end">
                        <Menu
                            transitionProps={{ transition: "pop" }}
                            withArrow
                            position="bottom-end"
                            styles={{ dropdown: { borderRadius: "2vw" } }}
                            withinPortal
                        >
                            <Menu.Target>
                                <ActionIcon variant="subtle" color="gray">
                                    <IconDots
                                        style={{ width: isMobile ? "7vw" : "2vw", height: isMobile ? "7vw" : "2vw" }}
                                        stroke={2}
                                    />
                                </ActionIcon>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item onClick={exportPDF}>Exportar PDF</Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Box>
                {selectedReport ? (
                    <>
                        <Box sx={{ gap: isMobile ? "4vw" : "1vw" }}>
                            <Box>
                                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>Data:</span>{" "}
                                        {selectedReport &&
                                            new Date(Number(selectedReport["date"])).toLocaleDateString("pt-br")}{" "}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>Hora:</span>{" "}
                                        {selectedReport &&
                                            new Date(Number(selectedReport["date"])).toLocaleTimeString("pt-br")}{" "}
                                    </p>
                                </Box>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>Contratante:</span>{" "}
                                    {call?.producer?.user && call.producer?.user.name}
                                </p>
                                <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>CPF:</span>{" "}
                                        {call?.producer?.user && formatCPF(call.producer.user.cpf || "")}{" "}
                                    </p>
                                    <p>
                                        <span style={{ fontWeight: "bold" }}>CNPJ:</span>{" "}
                                        {call?.producer?.user && formatCNPJ(call.producer.cnpj || "")}{" "}
                                    </p>
                                </Box>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>Propriedade:</span>{" "}
                                    {call?.talhao?.tillage && call.talhao.tillage.name}{" "}
                                </p>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>Talhão:</span> {call?.talhao && call.talhao.name}
                                </p>
                            </Box>
                            <hr />
                            {/* {tab === "operation" && <hr />} */}
                        </Box>
                        <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                            <Box sx={{ justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                                <p style={{ fontWeight: "bold" }}>Custo por hectare: </p>
                                {call?.talhao?.tillage && <CurrencyText value={Number(call?.talhao.tillage.hectarePrice)} />}
                            </Box>
                            <Box sx={{ justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                                <p style={{ fontWeight: "bold" }}>Área Trabalhada no dia:</p>{" "}
                                {selectedReport?.areaTrabalhada} ha{" "}
                            </Box>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <p style={{ fontWeight: "bold" }}>Custo total: </p>
                                <p style={{ justifyContent: "space-between" }}>
                                    <CurrencyText value={Number(selectedReport?.totalPrice)} />
                                </p>
                            </Box>
                            <hr />
                        </Box>

                        <Box sx={{ gap: "0vw" }}>
                            <Box sx={{ gap: isMobile ? "3vw" : "1vw", height: "100%" }}>
                                {tab === "operation" && (
                                    <>
                                        <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                                            {selectedReport?.techReport?.flight &&
                                                selectedReport?.techReport.flight.map((item, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            width: "100%",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            gap: isMobile ? "3vw" : "1vw",
                                                        }}
                                                    >
                                                        Voo {index + 1} <p>{item.performance} ha</p>
                                                    </Box>
                                                ))}
                                        </Box>
                                        <hr />
                                    </>
                                )}
                                <Box sx={{ gap: isMobile ? "4vw" : "1vw", height: isMobile ? "90%" : "100%" }}>
                                    <Tabs
                                        value={tab}
                                        onChange={changeTab}
                                        textColor="primary"
                                        indicatorColor="primary"
                                        aria-label="tabs"
                                        variant="scrollable"
                                        scrollButtons="auto"
                                        allowScrollButtonsMobile
                                    >
                                        <Tab
                                            sx={{ ...tabStyle, width: isMobile ? "40%" : "fit-content" }}
                                            value="operation"
                                            label="Dados de Operação"
                                        />
                                        <Tab
                                            sx={{ ...tabStyle, width: isMobile ? "38%" : "fit-content" }}
                                            value="treatment"
                                            label="Tratamento"
                                        />
                                        <Tab
                                            sx={{ ...tabStyle, width: isMobile ? "30%" : "fit-content" }}
                                            value="techReport"
                                            label="Laudo Técnico"
                                        />
                                        <Tab
                                            sx={{ ...tabStyle, width: isMobile ? "35%" : "fit-content" }}
                                            value="material"
                                            label="Insumos"
                                        />
                                    </Tabs>
                                    <Box sx={{ height: "max-content", maxHeight: "100%", overflowY: "auto" }}>
                                        {tab === "operation" && selectedReport?.operation && call && (
                                            <Box sx={{ gap: isMobile ? "4vw" : "1vw" }}>
                                                <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                                                    <OperationComponent call={call} operation={selectedReport.operation} />
                                                    {/* <hr /> */}
                                                </Box>
                                            </Box>
                                        )}
                                        {tab === "treatment" && selectedReport?.treatment && (
                                            <TreatmentComponent treatment={selectedReport.treatment} />
                                        )}
                                        {tab === "techReport" && selectedReport?.techReport && (
                                            <TechReportComponent tech={selectedReport?.techReport} />
                                        )}
                                        {tab === "material" && selectedReport?.material && (
                                            <MaterialComponent material={selectedReport?.material} />
                                        )}
                                    </Box>
                                </Box>
                            </Box>
                            <Box sx={{ gap: isMobile ? "3vw" : "1vw", pt: isMobile ? "4vh" : "1vw" }}>
                                {tab !== "material" && !user?.isAdmin && (
                                    <ButtonAgritech
                                        variant="contained"
                                        sx={{ bgcolor: colors.button }}
                                        onClick={() => {
                                            tab === "operation" && setTab("treatment")
                                            tab === "treatment" && setTab("techReport")
                                            tab === "techReport" && setTab("material")
                                            tab === "material" && setTab("techReport")
                                        }}
                                    >
                                        {tab === "operation"
                                            ? "Dados de Tratamento >"
                                            : tab === "treatment"
                                            ? "Laudo Técnico >"
                                            : tab === "techReport"
                                            ? "Insumos >"
                                            : tab === "material" && "< Laudo Técnico"}
                                    </ButtonAgritech>
                                )}
                            </Box>
                            {user?.isAdmin && !selectedReport?.approved && (
                                <ButtonAgritech
                                    size="small"
                                    variant="contained"
                                    sx={{
                                        bgcolor: colors.secondary,
                                        textTransform: "none",
                                        borderRadius: "5vw",
                                        padding: "0.5vw",
                                    }}
                                    onClick={handleApprove}
                                >
                                    Aprovar Relatório
                                </ButtonAgritech>
                            )}
                        </Box>
                    </>
                ) : (
                    <Skeleton animation="wave" variant="rounded" sx={{ width: 1, height: 1 }} />
                )}
            </Box>
        </Box>
    )
}
