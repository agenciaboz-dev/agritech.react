import { Box, Button, CircularProgress, IconButton, useMediaQuery } from "@mui/material"
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
import { dateFrontend } from "../../hooks/useFormattedDate"
import { CardTeam } from "../../components/Kit/CardTeam"
import findEmployee from "../../hooks/filterEmployee"
import { Call } from "../../definitions/call"
import { useIo } from "../../hooks/useIo"
import { useSnackbar } from "burgos-snackbar"
import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

interface CallDetailsProps {}

const modal = {
    title: "Tem certeza que deseja cancelar esse chamado?",
    content: "Uma vez que cancelado o mesmo chamado não poderá ser refeito, apenas um novo poderá ser aberto.",
    submitTitle: "Sim, cancelar",
    cancelTitle: "Não",
}

export const CallDetails: React.FC<CallDetailsProps> = ({}) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const io = useIo()
    const header = useHeader()
    const navigate = useNavigate()
    const { user } = useUser()
    const { snackbar } = useSnackbar()
    const { listKits } = useKits()
    const { listUsers } = useUsers()
    const { listTillages } = useProducer()
    const { listCalls, setCalls } = useCall()

    const [open, setOpen] = useState(false)
    const [opened, { open: openCancelModal, close }] = useDisclosure(false)

    const { callid } = useParams()

    // const producerSelect = findProducer(String(user?.producer?.id))
    const callSelect = listCalls.find((item) => item.id === Number(callid))
    const tillageSelectProd = user?.producer?.tillage?.find((item) => item.id === Number(callSelect?.tillageId))
    const tillageSelected = listTillages?.find((item) => item.id === callSelect?.tillageId)
    const kitSelected = listKits?.find((item) => item.id === callSelect?.kitId)
    const team = kitSelected?.employees?.map((item) => {
        return findEmployee(String(item.id))
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    useEffect(() => {
        header.setTitle(user?.producer ? tillageSelectProd?.name || user.name : tillageSelected?.name || "")
        console.log(kitSelected?.employees)
    }, [])

    const removeCall = (call: Call) => {
        setCalls(listCalls.filter((item) => item.id !== call.id))
    }
    const cancelCall = (values?: Call) => {
        setOpen(false)
        io.emit("call:cancel", values)
        openCancelModal()
    }
    useEffect(() => {
        io.on("call:cancel:success", (data: any) => {
            removeCall(data)
            snackbar({ severity: "success", text: "Chamado cancelado com sucesso!" })
            navigate(
                user?.producer
                    ? `/producer/tillage/${callSelect?.tillageId}`
                    : user?.isAdmin
                    ? `/adm/producer/${callSelect?.producerId}/${callSelect?.tillageId}`
                    : `/employee/producer/${callSelect?.producerId}/${callSelect?.tillageId}`
            )
            close()
        })
        io.on("call:cancel:failed", () => {
            snackbar({ severity: "error", text: "Algo deu errado" })
        })

        return () => {
            io.off("call:cancel:success")
            io.off("call:cancel:failed")
        }
    }, [])

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
                        user?.producer
                            ? `/producer/tillage/${callSelect?.tillageId}`
                            : user?.isAdmin
                            ? `/adm/producer/${callSelect?.producerId}/${callSelect?.tillageId}`
                            : `/employee/producer/${callSelect?.producerId}/${callSelect?.tillageId}`
                    }
                />
            </Box>
            <Box
                style={{
                    width: "100%",
                    justifyContent: "center",
                    height: "100%",
                    backgroundColor: "#353535",
                    borderTopLeftRadius: isMobile ? "5vw" : "2vw",
                    borderTopRightRadius: isMobile ? "5vw" : "2vw",
                }}
            >
                <Box
                    style={{
                        padding: isMobile ? "5vw" : "1vw",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: isMobile ? "7vw" : "2vw",
                        borderTopRightRadius: isMobile ? "7vw" : "2vw",
                        gap: isMobile ? "4vw" : "1vw",
                        flex: 1,
                        overflow: "hidden",
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
                            <p style={{ fontSize: isMobile ? "4.1vw" : "1.2rem" }}>Chamado em andamento</p>
                            <p style={{ fontSize: isMobile ? "2.9vw" : "1rem" }}>
                                Aberto em: {dateFrontend(callSelect?.open || "")}
                            </p>
                        </Box>
                        {!callSelect?.init && (
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
                        )}
                    </Box>
                    <p style={{ fontSize: isMobile ? "3vw" : "1rem", textAlign: "justify" }}>
                        {user?.producer && tillageSelectProd?.comments
                            ? tillageSelectProd?.comments
                            : tillageSelected?.comments
                            ? tillageSelected?.comments
                            : "Nenhuma observação"}
                    </p>
                    <p style={{ fontSize: isMobile ? "11vw" : "3rem" }}>15:00</p>
                    <Box sx={{ width: "100%", gap: isMobile ? "2vw" : "1vw" }}>
                        <p style={{ fontSize: isMobile ? "3.8vw" : "1.2rem" }}>
                            Kit: <span style={{ fontWeight: "bold" }}>{kitSelected?.name}</span>
                        </p>
                        <p
                            style={{
                                display: "flex",
                                fontSize: isMobile ? "3vw" : "1rem",
                                width: "100%",
                                flexWrap: "nowrap",
                                textOverflow: "ellipsis",
                                overflowX: "hidden",
                            }}
                        >
                            {kitSelected?.description}
                        </p>
                        <Box sx={{}}>
                            <p style={{ fontSize: isMobile ? "3.5vw" : "1rem" }}>Objetos</p>
                            {kitSelected?.objects?.map((item, index) => (
                                <Box key={index}>
                                    <p style={{ fontSize: isMobile ? "3.5vw" : "1rem" }}>
                                        {item.quantity}x {item.name}
                                    </p>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ gap: isMobile ? "2vw" : "1vw" }}>
                        <TitleComponents title="Responsáveis" />
                        {team?.map((item, index) => (
                            <CardTeam key={index} employee={item} />
                        ))}
                    </Box>
                    <DialogConfirm
                        data={modal}
                        user={user}
                        open={open}
                        setOpen={setOpen}
                        click={() => {
                            cancelCall(callSelect)
                        }}
                    />
                </Box>
            </Box>
        </Box>
    )
}
