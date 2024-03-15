import { Modal } from "@mantine/core"
import React, { useEffect, useState } from "react"
import { ButtonAgritech } from "../../../components/ButtonAgritech"
import { Box, CircularProgress } from "@mui/material"
import { colors } from "../../../style/colors"
import { Report, Stage } from "../../../definitions/report"
import { StageDescription } from "../../../components/StageDescription"
import { useFormik } from "formik"
import { useIo } from "../../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import { useReports } from "../../../hooks/useReports"

interface ModalStageProps {
    opened: boolean
    close: () => void
    report: Report
}

export const ModalStage: React.FC<ModalStageProps> = ({ opened, close, report }) => {
    const io = useIo()
    const { snackbar } = useSnackbar()
    const navigate = useNavigate()
    const { user } = useUser()
    const reports = useReports()

    const [initPick, setInitPick] = useState(null)
    const [finishPick, setFinishPick] = useState(null)
    const [durationPick, setDuration] = useState(null)
    const [loading, setLoading] = useState(false)

    const dates = {
        initPick: initPick,
        setInitPick: setInitPick,
        finishPick: finishPick,
        setFinishPick: setFinishPick,
        durationPick: durationPick,
        setDuration: setDuration,
    }
    const backFormik = useFormik<Stage>({
        initialValues: {
            name: "",
            comments: "",
            date: new Date().toISOString(),
            duration: "",
            finish: "",
            start: "",
            reportId: report ? report?.id : 0,
        },
        onSubmit: (values) => backSubmit(values),
    })
    const backSubmit = (values: Stage) => {
        const data = {
            ...values,
            date: new Date().getTime().toString(),
            start: new Date(Number(initPick)).getTime().toString(),
            finish: new Date(Number(finishPick)).getTime().toString(),
        }
        io.emit("stage:new", data, 4)

        setLoading(true)
        console.log(data)
    }

    useEffect(() => {
        io.on("stage:new", (report: Report) => {
            snackbar({ severity: "success", text: "Dados registrados!" })
            setLoading(false)
            reports.update(report)

            console.log("Finalizado")

            if (report.stage == 4) {
                io.emit("report:close", report.id)
                setLoading(true)
            }
        })

        io.on("report:closed:success", (updatedReport: Report) => {
            reports.update(updatedReport)
            console.log("report closed success")
            console.log(updatedReport)
            if (updatedReport.pdf_path) {
                window.open(updatedReport.pdf_path, "_blank")?.focus()
            }
            navigate(
                user?.isAdmin
                    ? `/adm/call/${report?.callId}/report/${report?.id}`
                    : `/employee/call/${report?.callId}/report/${report?.id}`
            )
        })
        io.on("report:closed:failed", (error) => {
            console.log(error)
        })

        return () => {
            io.off("stage:new")
            io.off("report:closed:success")
            io.off("report:closed:failed")
        }
    }, [])
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "1vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            <Box sx={{ width: "100%", flexDirection: "column", gap: "2vw" }}>
                <form onSubmit={backFormik.handleSubmit}>
                    <StageDescription
                        title={"Volta da Localização"}
                        values={backFormik.values}
                        change={backFormik.handleChange}
                        data={dates}
                    />

                    <ButtonAgritech type="submit" variant="contained" sx={{ bgcolor: colors.button }}>
                        {loading ? <CircularProgress size="7vw" sx={{ color: colors.text.white }} /> : "Finalizar"}
                    </ButtonAgritech>
                </form>
            </Box>
        </Modal>
    )
}
