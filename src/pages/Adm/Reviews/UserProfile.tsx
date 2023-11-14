import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUsersPending } from "../../../hooks/useUsers"
import { Box, Button, CircularProgress } from "@mui/material"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { useDataHandler } from "../../../hooks/useDataHandler"
import { useSnackbar } from "burgos-snackbar"
import { HeaderProfile } from "../../Profile/HeaderProfile"
import { InfoProfile } from "../../Profile/InfoProfile"
import { useIo } from "../../../hooks/useIo"

interface UserprofileProps {}

export const Userprofile: React.FC<UserprofileProps> = ({}) => {
    const header = useHeader()
    const navigate = useNavigate()
    const io = useIo()
    const { userId } = useParams()
    const { pendingUsers, setPendingUsers } = useUsersPending()

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    const [profile, setProfile] = useState<User>()
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    useEffect(() => {
        const user = pendingUsers.find((user) => String(user.id) === userId)
        setProfile(user)
    }, [pendingUsers, userId])

    const valuesUser: FormValues = {
        name: profile?.name || "",
        cpf: profile?.cpf || "",
        phone: profile?.phone || "",
        email: profile?.email || "",
        username: profile?.username || "",
        password: profile?.password || "",
        birth: new Date(profile?.birth || 0).toLocaleDateString("pt-br") || "",
        image: profile?.image || "",
        address: {
            cep: profile?.address?.cep || "",
            city: profile?.address?.city || "",
            district: profile?.address?.district || "",
            number: profile?.address?.number || "",
            street: profile?.address?.street || "",
            uf: profile?.address?.uf || "",
            complement: profile?.address?.complement || "",
        },

        isAdmin: false,
        approved: profile?.approved || false,
        rejected: profile?.rejected || "",

        employee: {
            id: profile?.employee?.id,
            rg: profile?.employee?.rg || "",
            gender: profile?.employee?.gender || "",
            military: profile?.employee?.military || "",
            nationality: profile?.employee?.nationality || "",
            relationship: profile?.employee?.relationship || "",
            voter_card: profile?.employee?.voter_card || "",
            work_card: profile?.employee?.work_card || "",
            residence: profile?.employee?.residence || "",
            bank_data: {
                account: profile?.employee?.bank_data?.account || "",
                name: profile?.employee?.bank_data?.name || "",
                agency: profile?.employee?.bank_data?.agency || "",
                type: profile?.employee?.bank_data?.type || "",
            },
        },
        producer: {
            cnpj: profile?.producer?.cnpj || "",
        },
    }

    const handleApprove = async (valuesUser: FormValues) => {
        const data = {
            ...valuesUser,
            approved: true,
            id: Number(userId),
        }
        setProfile(data)
        setLoadingApprove(true)

        io.emit("user:approve", data.id)
    }
    const handleReject = async (valuesUser: FormValues) => {
        const data = {
            ...valuesUser,
            approved: false,
            rejected: "Rejeitado por motivos de ....",
            id: Number(userId),
        }
        setProfile(data)
        setLoadingReject(true)

        io.emit("user:reject", data.id)
    }

    useEffect(() => {
        const handleApprovalSuccess = () => {
            console.log("deu certo aprovou")
            setLoadingApprove(false)
            snackbar({ severity: "success", text: "Usuário aprovado" })
            io.emit("user:pendingApproval")
            navigate("../history")
        }
        const handleRejectionSuccess = () => {
            console.log("REPROVADO")
            setLoadingReject(false)
            snackbar({ severity: "error", text: "Usuário reprovado" })
            io.emit("user:pendingApproval")
            navigate("../history")
        }

        io.on("application:status:approved", handleApprovalSuccess)
        io.on("application:status:rejected", handleRejectionSuccess)

        return () => {
            io.off("application:status:approved")
            io.off("application:status:rejected")
        }
    }, [])

    useEffect(() => {
        header.setTitle("Análise de Perfil")
    })
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.secondary,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="../history" />
            </Box>
            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",

                    flexDirection: "column",
                    gap: "4vw",
                }}
            >
                <HeaderProfile values={valuesUser} style={{ flexDirection: "row", gap: "5vw" }} />
                <InfoProfile values={valuesUser} />

                <Box sx={{ gap: "2vw", flexDirection: "row" }}>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            fontSize: "3.5vw",
                            color: colors.text.white,
                            width: "50%",
                            backgroundColor: "#B3261E",
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                        onClick={() => handleReject(valuesUser)}
                    >
                        {loadingReject ? (
                            <CircularProgress size={"9vw"} sx={{ color: colors.text.white, width: "0.5vw" }} />
                        ) : (
                            "Não Aprovar"
                        )}
                    </Button>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            fontSize: "3.5vw",
                            color: colors.text.white,
                            width: "50%",
                            backgroundColor: colors.button,
                            borderRadius: "5vw",
                            textTransform: "none",
                        }}
                        onClick={() => handleApprove(valuesUser)}
                    >
                        {loadingApprove ? (
                            <CircularProgress size={"9vw"} sx={{ color: colors.text.white, width: "0.5vw" }} />
                        ) : (
                            "Aprovar"
                        )}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
