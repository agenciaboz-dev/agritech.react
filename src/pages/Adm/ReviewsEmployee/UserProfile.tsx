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

    const { snackbar } = useSnackbar()

    const [profile, setProfile] = useState<User>()
    const [image, setImage] = useState<File>()
    const [loadingApprove, setLoadingApprove] = useState(false)
    const [loadingReject, setLoadingReject] = useState(false)

    !view
        ? useEffect(() => {
              const user = pendingUsers.find((user) => String(user.id) === userId)
              setProfile(user)
          }, [pendingUsers, profile, userId])
        : useEffect(() => {
              const user = listUsers?.find((user) => String(user.id) === userId)
              setProfile(user)
          }, [listUsers, profile, userId])

    useEffect(() => {
        console.log({ atualizou: profile })
    }, [profile])

    const [isAdmin, setIsAdmin] = useState(profile?.isAdmin)
    const [isManager, setIsManager] = useState(profile?.isManager)

    const valuesUser: User = {
        name: profile?.name || "",
        cpf: profile?.cpf || "",
        phone: profile?.phone || "",
        email: profile?.email || "",
        username: profile?.username || "",
        password: profile?.password || "",
        birth: new Date(Number(profile?.birth) || 0).toLocaleDateString("pt-br") || "",
        image: profile?.image || null,
        isManager: profile?.isManager || false,
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

        isAdmin: profile?.isAdmin || false,
        approved: profile?.approved || false,
        rejected: profile?.rejected || "",
        office: profile?.office,

        employee: profile?.employee
            ? {
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
              }
            : undefined,
        producer: profile?.producer
            ? {
                  cnpj: profile?.producer?.cnpj || "",
                  contract: profile?.producer?.contract || false,
                  inscricaoEstadual: profile?.producer?.inscricaoEstadual || "",
                  id: profile?.producer?.id,
                  employeeId: profile?.producer?.employeeId,
              }
            : undefined,
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
                            Acessar Fazendas
                        </Button>
                    )}
                    {view && userSelect[0].employee && user?.isAdmin && (
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                alignItems: "center",
                                gap: "0vw",
                                backgroundColor: colors.button,
                                color: colors.text.white,
                                textTransform: "none",
                                borderRadius: "5vw",
                                fontSize: "3.0vw",
                                p: "1vw 3vw",
                                width: "fit-content",
                                zIndex: 1,
                            }}
                            onClick={() => {}}
                        >
                            Gerenciar acesso
                        </Button>
                    )}
                </Box>
                <HeaderProfile
                    values={valuesUser}
                    image={image}
                    setImage={setImage}
                    style={{ flexDirection: "row", gap: "5vw" }}
                    view
                    isAdmin={isAdmin}
                    isManager={isManager}
                    setIsAdmin={setIsAdmin}
                    setIsManager={setIsManager}
                    profile={profile}
                    setProfile={setProfile}
                />
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
