import { Box, Tab, Tabs } from "@mui/material"
import React, { useEffect, useState } from "react"
import { colors } from "../../../../style/colors"
import { Header } from "../../../../components/Header"
import { useNavigate, useParams } from "react-router-dom"
import { useCall } from "../../../../hooks/useCall"
import { tabStyle } from "../../../../style/tabStyle"
import { OperationComponent } from "./OperationComponent"
import { TreatmentComponent } from "./TreatmentComponent"
import { TechReportComponent } from "./TechReportComponent"
import { Material } from "../Material"
import { MaterialComponent } from "./Material"

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

export const ReportDetails: React.FC<ReportDetailsProps> = ({}) => {
    const { callid, reportid } = useParams()
    const { listCalls } = useCall()

    const [tab, setTab] = React.useState("operation")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    const callSelect = listCalls.find((item) => item.id === Number(callid))
    useEffect(() => {
        console.log({ call_Select: callSelect })
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
                <Header back location="/" />
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
                        gap: "4vw",
                        height: "100%",
                    }}
                >
                    <h3>Relatório Operacional</h3>
                    <Box>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Contratante:</span> {callSelect?.producer?.user?.name}{" "}
                        </p>
                        <Box sx={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <p>
                                <span style={{ fontWeight: "bold" }}>CPF:</span> {callSelect?.producer?.user?.cpf}{" "}
                            </p>
                            <p>
                                <span style={{ fontWeight: "bold" }}>CNPJ:</span> {callSelect?.producer?.cnpj}{" "}
                            </p>
                        </Box>
                        <p>
                            <span style={{ fontWeight: "bold" }}>Propriedade:</span> {callSelect?.tillage?.name}{" "}
                        </p>
                        {/* <p>
                            <span style={{ fontWeight: "bold" }}>Localização:</span> {callSelect?.tillage?.address.street},{" "}
                            {callSelect?.tillage?.address.district}, {callSelect?.tillage?.address.city}-
                            {callSelect?.tillage?.address.uf}{" "}
                        </p> */}
                    </Box>
                    <Box>
                        <hr />
                    </Box>
                    <Box sx={{ gap: "4vw" }}>
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
                            <Tab sx={{ ...tabStyle, width: "50%" }} value="operation" label="Dados de Operação" />
                            <Tab sx={{ ...tabStyle, width: "50%" }} value="treatment" label="Tratamento" />
                            <Tab sx={{ ...tabStyle, width: "50%" }} value="techReport" label="Laudo Técnico" />
                            <Tab sx={{ ...tabStyle, width: "50%" }} value="material" label="Insumos" />
                        </Tabs>
                        {tab === "operation" && (
                            <OperationComponent call={callSelect} operation={callSelect?.report?.operation} />
                        )}
                        {tab === "treatment" && <TreatmentComponent treatment={callSelect?.report?.treatment} />}
                        {tab === "techReport" && <TechReportComponent tech={callSelect?.report?.techReport} />}
                        {tab === "material" && <MaterialComponent material={callSelect?.report?.material} />}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
