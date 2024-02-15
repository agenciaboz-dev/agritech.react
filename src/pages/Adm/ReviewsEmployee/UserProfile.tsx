import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { Box, Button, ButtonBase, CircularProgress } from "@mui/material"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { useDataHandler } from "../../../hooks/useDataHandler"
import { useSnackbar } from "burgos-snackbar"
import { HeaderProfile } from "../../Profile/HeaderProfile"
import { InfoProfile } from "../../Profile/InfoProfile"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { unmaskCurrency } from "../../../hooks/unmaskNumber"

interface UserprofileProps {
    view?: boolean
}

export const Userprofile: React.FC<UserprofileProps> = ({ view }) => {
    const header = useHeader()
    const navigate = useNavigate()
    const io = useIo()
    const { user } = useUser()
    const { userId } = useParams()
    const { pendingUsers, setPendingUsers } = useUsers()
    const { listUsers, setListUsers } = useUsers()

    const userSelect = listUsers?.filter((item) => item.id === Number(userId)) || []

    const { unmask } = useDataHandler()
    const { snackbar } = useSnackbar()

    const [profile, setProfile] = useState<User>()
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    !view
        ? useEffect(() => {
              const user = pendingUsers.find((user) => String(user.id) === userId)
              setProfile(user)
          }, [pendingUsers, userId])
        : useEffect(() => {
              const user = listUsers?.find((user) => String(user.id) === userId)
              setProfile(user)
          }, [listUsers, userId])

    const valuesUser: User = {
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
            adjunct: profile?.address?.adjunct || "",
        },
        id: profile?.id || 0,

        isAdmin: false,
        approved: profile?.approved || false,
        rejected: profile?.rejected || "",
        office: profile?.office,

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
            bank: {
                account: profile?.employee?.bank?.account || "",
                name: profile?.employee?.bank?.name || "",
                agency: profile?.employee?.bank?.agency || "",
                type: profile?.employee?.bank?.type || "",
            },
            professional: {
                salary: profile?.employee?.professional?.salary,
                admission: new Date(profile?.employee?.professional?.admission || 0).toLocaleDateString("pt-br") || "",
            },
        },
        producer: {
            cnpj: profile?.producer?.cnpj || "",
            contract: profile?.producer?.contract || false,
            id: profile?.producer?.id,
            employeeId: profile?.producer?.employeeId,
        },
    }

    const handleApprove = async (valuesUser: User) => {
        const data = {
            ...valuesUser,
            approved: true,
            id: Number(userId),
        }
        setProfile(data)
        setLoadingApprove(true)

        io.emit("user:approve", data.id)
    }
    const handleReject = async (valuesUser: User) => {
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
            navigate("../reviews")
        }
        const handleRejectionSuccess = () => {
            console.log("REPROVADO")
            setLoadingReject(false)
            snackbar({ severity: "info", text: "Usuário reprovado" })
            io.emit("user:pendingApproval")
            navigate("../reviews")
        }

        io.on("application:status:approved", handleApprovalSuccess)
        io.on("application:status:rejected", handleRejectionSuccess)
        return () => {
            io.off("application:status:approved")
            io.off("application:status:rejected")
        }
    }, [])

    useEffect(() => {
        header.setTitle(view ? valuesUser.name : "Análise de Perfil")
    })
    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: view ? colors.button : colors.secondary,
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
                <Header back location={view ? "../" : "../reviews"} />
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
                    gap: "5vw",
                }}
            >
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <p style={{ fontSize: "4.5vw", fontFamily: "MalgunGothic2", textAlign: "left" }}>Informações Pessoais</p>
                    {view && userSelect[0].producer && (
                        <Button
                            variant="contained"
                            size="small"
                            sx={{ bgcolor: colors.button, borderRadius: "5vw", textTransform: "none", fontSize: "3vw" }}
                            onClick={() => {
                                if (userSelect !== null) {
                                    const path = user?.isAdmin
                                        ? `/adm/producer/${userSelect[0].producer?.id}`
                                        : `/employee/producer/${userSelect[0].producer?.id}`
                                    navigate(path)
                                } else {
                                }
                            }}
                        >
                            Acessar cadastro
                        </Button>
                    )}
                </Box>
                <HeaderProfile values={valuesUser} style={{ flexDirection: "row", gap: "5vw" }} view />
                <InfoProfile values={valuesUser} review />

                {!view && (
                    <Box sx={{ gap: "2vw", flexDirection: "row" }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                fontSize: "3.5vw",
                                color: colors.text.white,
                                width: "50%",
                                backgroundColor: colors.delete,
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
                )}
            </Box>
        </Box>
    )
}
