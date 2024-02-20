import { Accordion, AccordionSummary, Box, CircularProgress, Tab, Tabs, Typography, styled } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useCall } from "../../../../hooks/useCall"
import { tabStyle } from "../../../../style/tabStyle"
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
import { GeralReport, Report } from "../../../../definitions/report"
import { useSnackbar } from "burgos-snackbar"
import { useDisclosure } from "@mantine/hooks"

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
    const { callid, reportid } = useParams()
    const { listCalls } = useCall()
    const { user } = useUser()
    const io = useIo()
    const { snackbar } = useSnackbar()

    const [expanded, setExpanded] = React.useState<string | false>("")
    const expandendChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const [opened, { open, close }] = useDisclosure(false)

    const [tab, setTab] = React.useState("operation")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const [selectedReport, setSelectedReport] = useState<Report>()
    const callSelect = listCalls.find((item) => item.id === Number(callid))
    useEffect(() => {
        setSelectedReport(callSelect?.reports?.find((item) => item.id === Number(reportid)))
    }, [callSelect?.reports])

    const handleApprove = async () => {
        io.emit("report:approve", selectedReport?.id)
        open()
    }

    useEffect(() => {
        io.on("report:approved:success", (data: Report) => {
            snackbar({ severity: "success", text: "Relatório aprovado" })
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
                <Header back location={`/adm/producer/${callSelect?.producerId}/${callSelect?.talhao?.tillageId}`} />
            </Box>
            <Box
                style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#353535",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                }}
            >
                <Box
                    style={{
                        padding: "5vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                        gap: "3vw",
                        height: "100%",
                    }}
                >
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h3>Relatório Operacional</h3>

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
                                        <IconDots style={{ width: "7vw", height: "7vw" }} stroke={2} />
                                    </ActionIcon>
                                </Menu.Target>
                                <Menu.Dropdown>
                                    <Menu.Item>Exportar PDF</Menu.Item>
                                    <Menu.Item>Compartihar</Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        </Group>
                    </Box>
                    <Box sx={{ gap: "4vw" }}>
                        <Box>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>Data:</span>{" "}
                                    {selectedReport && new Date(Number(selectedReport?.date)).toLocaleDateString("pt-br")}{" "}
                                </p>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>Hora:</span>{" "}
                                    {selectedReport && new Date(Number(selectedReport?.date)).toLocaleTimeString("pt-br")}{" "}
                                </p>
                            </Box>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Contratante:</span> {callSelect?.producer?.user?.name}{" "}
                            </p>
                            <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>CPF:</span>{" "}
                                    {formatCPF(callSelect?.producer?.user?.cpf || "")}{" "}
                                </p>
                                <p>
                                    <span style={{ fontWeight: "bold" }}>CNPJ:</span>{" "}
                                    {formatCNPJ(callSelect?.producer?.cnpj || "")}{" "}
                                </p>
                            </Box>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Propriedade:</span> {callSelect?.talhao?.tillage?.name}{" "}
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold" }}>Talhão:</span> {callSelect?.talhao?.name}{" "}
                            </p>
                        </Box>

                        {/* <p>
                            <span style={{ fontWeight: "bold" }}>Localização:</span> {callSelect?.tillage?.address.street},{" "}
                            {callSelect?.tillage?.address.district}, {callSelect?.tillage?.address.city}-
                            {callSelect?.tillage?.address.uf}{" "}
                        </p> */}
                        <hr />
                    </Box>
                    <Box sx={{ gap: "2vw" }}>
                        <Box sx={{ justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                            <p style={{ fontWeight: "bold" }}>Custo por hectare: </p>
                            <CurrencyText value={Number(callSelect?.talhao?.tillage?.hectarePrice)} />
                        </Box>
                        <Box sx={{ justifyContent: "space-between", width: "100%", flexDirection: "row" }}>
                            <p style={{ fontWeight: "bold" }}>Área Trabalhada no dia:</p> {selectedReport?.areaTrabalhada} ha{" "}
                        </Box>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p style={{ fontWeight: "bold" }}>Custo total: </p>
                            <p style={{ justifyContent: "space-between" }}>
                                <CurrencyText value={Number(selectedReport?.totalPrice)} />
                            </p>
                        </Box>
                        <hr />
                    </Box>

                    <Box sx={{ gap: "0vw", justifyContent: "space-between", height: "53%" }}>
                        <Box sx={{ gap: "3vw", height: "100%" }}>
                            <Box sx={{ gap: "2vw" }}>
                                {tab === "operation" &&
                                    selectedReport?.techReport?.flight?.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                width: "100%",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                                gap: "3vw",
                                            }}
                                        >
                                            Voo {index + 1} <p>{item.performance} ha</p>
                                        </Box>
                                    ))}
                                {/* <hr /> */}
                                {/* <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <p style={{ fontWeight: "bold" }}>Custo total: </p>
                                    <p style={{ justifyContent: "space-between" }}>
                                        <CurrencyText value={Number(selectedReport?.totalPrice)} />
                                    </p>
                                </Box> */}
                            </Box>
                            <hr />
                            <Box sx={{ gap: "1vw", height: "90%" }}>
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
                                    <Tab sx={{ ...tabStyle, width: "40%" }} value="operation" label="Dados de Operação" />
                                    <Tab sx={{ ...tabStyle, width: "38%" }} value="treatment" label="Tratamento" />
                                    <Tab sx={{ ...tabStyle, width: "30%" }} value="techReport" label="Laudo Técnico" />
                                    <Tab sx={{ ...tabStyle, width: "35%" }} value="material" label="Insumos" />
                                </Tabs>
                                <Box sx={{ height: "max-content", maxHeight: "100%", overflowY: "auto" }}>
                                    {tab === "operation" && (
                                        <Box sx={{ gap: "4vw" }}>
                                            <Box sx={{ gap: "2vw" }}>
                                                <OperationComponent
                                                    call={callSelect}
                                                    operation={selectedReport?.operation}
                                                />
                                                <hr />
                                            </Box>
                                        </Box>
                                    )}
                                    {tab === "treatment" && <TreatmentComponent treatment={selectedReport?.treatment} />}
                                    {tab === "techReport" && <TechReportComponent tech={selectedReport?.techReport} />}
                                    {tab === "material" && <MaterialComponent material={selectedReport?.material} />}
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ gap: "3vw" }}>
                            {/* {tab !== "operation" && (
                                <ButtonAgritech
                                    variant="contained"
                                    sx={{ bgcolor: colors.button }}
                                    onClick={() => {
                                        tab === "treatment" && setTab("operation")
                                        tab === "techReport" && setTab("treatment")
                                        tab === "material" && setTab("techReport")
                                    }}
                                >
                                    {tab === "treatment"
                                        ? "< Dados de Operação "
                                        : tab === "techReport"
                                        ? "< Dados de Tratamento"
                                        : tab === "material" && "< Laudo Técnico"}
                                </ButtonAgritech>
                            )} */}
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
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
