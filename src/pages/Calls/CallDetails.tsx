import { Box, Button, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useHeader } from "../../hooks/useHeader"
import { colors } from "../../style/colors"
import { Header } from "../../components/Header"
import { TitleComponents } from "../../components/TitleComponents"
import { DialogConfirm } from "../../components/DialogConfirm"
import { useNavigate, useParams } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import findProducer from "../../hooks/filterProducer"
import { useKits } from "../../hooks/useKits"
import { useCall } from "../../hooks/useCall"
import { useUsers } from "../../hooks/useUsers"
import { useProducer } from "../../hooks/useProducer"

interface CallDetailsProps {}

const modal = {
    title: "Tem certeza que deseja cancelar esse chamado?",
    content: "Uma vez que cancelado o mesmo chamado não poderá ser refeito, apenas um novo poderá ser aberto.",
    submitTitle: "Sim, cancelar",
    cancelTitle: "Não",
}
const p_style = {
    fontSize: "3.5vw",
}

export const CallDetails: React.FC<CallDetailsProps> = ({}) => {
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const { listTillages } = useProducer()
    const { listCalls } = useCall()

    const [open, setOpen] = useState(false)

    const { callid, producerid } = useParams()

    // const producerSelect = findProducer(String(user?.producer?.id))
    const callSelect = listCalls.find((item) => item.id === Number(callid))
    const tillageSelectProd = user?.producer?.tillage?.find((item) => item.id === Number(callSelect?.tillageId))
    const tillageSelected = listTillages?.find((item) => item.id === callSelect?.tillageId)

    const handleClickOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        header.setTitle(user?.producer ? tillageSelectProd?.name || user.name : tillageSelected?.name || "")
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
                <Header
                    back
                    location={
                        user?.producer
                            ? `/producer/tillage/${callSelect?.tillageId}`
                            : `/adm/producer/${callSelect?.producerId}/${callSelect?.tillageId}`
                    }
                />
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
                        padding: "4vw",
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
                    <Box
                        sx={{
                            flexDirection: "row",
                            gap: "1vw",
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                        }}
                    >
                        <p>1/4</p>
                        <Box sx={{ gap: "1vw" }}>
                            <p style={{ fontSize: "4vw" }}>Chamado em andamento</p>
                            <p style={{ fontSize: "3vw" }}>12/04/2023</p>
                        </Box>
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                bgcolor: colors.delete,
                                textTransform: "none",
                                borderRadius: "5vw",
                                width: "fit-content",
                            }}
                            onClick={handleClickOpen}
                        >
                            Cancelar Chamado
                        </Button>
                    </Box>
                    <p style={{ fontSize: "3vw", textAlign: "justify" }}>
                        Imperdiet in tempus senectus laoreet consectetur. Quam dui fermentum vulputate sit enim amet vitae
                        hac massa. Tortor etiam adipiscing justo neque amet senectus. Cum turpis curabitur diam elementum et
                        arcu. Ac ut ipsum eget viverra consectetur gravida scelerisque enim lectus.
                    </p>
                    <p style={{ fontSize: "11vw" }}>15:00</p>
                    <Box sx={{ width: "100%" }}>
                        <p style={{ fontSize: "3vw" }}>Kit #2</p>
                        <p
                            style={{
                                display: "flex",
                                fontSize: "3vw",
                                width: "100%",
                                flexWrap: "nowrap",
                                textOverflow: "ellipsis",
                                overflowX: "hidden",
                            }}
                        >
                            aute irure dolor in reprehenderit in voluptate velit esse cillum dfhsgjhf sdhjk
                        </p>
                        <Box sx={{ p: "1vw", marginLeft: "3vw" }}>
                            <p style={p_style}>Objetos</p>
                            <p style={p_style}>1x Item</p>
                            <p style={p_style}>2x Ipsum</p>
                        </Box>
                    </Box>
                    <Box sx={{ gap: "2vw" }}>
                        <TitleComponents title="Responsáveis" />
                        <Box sx={{ marginLeft: "3vw", gap: "1vw" }}>
                            <p style={p_style}>List Item</p>
                            <p style={p_style}>Supporting line text lorem ipsum dolor sit amet, consectetur.</p>
                        </Box>
                    </Box>
                    <DialogConfirm
                        data={modal}
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        click={() => navigate("/adm/producer/2/1")}
                    />
                </Box>
            </Box>
        </Box>
    )
}
