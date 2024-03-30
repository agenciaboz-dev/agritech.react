import { Box, IconButton, TextField } from "@mui/material"
import React, { ChangeEventHandler, useEffect, useState } from "react"
import { textField } from "../../../style/input"
import MaskedInputNando from "../../../components/MaskedNando"
import { useCurrencyMask } from "burgos-masks"
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined"
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers"
import { DialogConfirm } from "../../../components/DialogConfirm"
import { useIo } from "../../../hooks/useIo"
import { useUser } from "../../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"
import { useUsers } from "../../../hooks/useUsers"
import { useNavigate } from "react-router-dom"

interface SecurityProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
}

export const Security: React.FC<SecurityProps> = ({ values }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { user, setUser } = useUser()
    const { removeUser } = useUsers()
    const { snackbar } = useSnackbar()

    const io = useIo()
    const navigate = useNavigate()

    const handleSubmit = () => {
        console.log(user)
        if (user) io.emit("user:delete", user.isAdmin ? values.id : user.cpf === values.cpf && user.id)
    }

    useEffect(() => {
        io.on("user:delete", (user: User) => {
            snackbar({ severity: "info", text: "Usuário excluído com sucesso!" })
            removeUser(user)
            setUser(null)
            user.isAdmin ? navigate("/adm/panel") : user.cpf === values.cpf && navigate("/login")
        })
        io.on("user:delete:error", (user: User) => {
            snackbar({ severity: "error", text: "Aldo deu errado! tente novamente mais tarde." })
        })
    }, [])
    return (
        <Box sx={{ flexDirection: "column", gap: "1vw" }}>
            {user?.cpf === values.cpf && (
                <Box sx={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                    <p style={{ fontSize: "1rem" }}>Atualizar Senha</p>
                    <IconButton>
                        <ArrowRightIcon />
                    </IconButton>
                </Box>
            )}

            <Box sx={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between" }}>
                <p style={{ fontSize: "1rem" }}>Excluir Conta</p>
                <IconButton
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <DeleteOutlineOutlined />
                </IconButton>
            </Box>
            <DialogConfirm
                open={open}
                setOpen={setOpen}
                data={{
                    title: "Tem certeza que deseja excluir sua conta? ",
                    submitTitle: "Sim, excluir",
                    content: "Ao excluir conta você perderá todos os seus dados e acessos. Esse processo é irreversível.",
                    cancelTitle: "Não, cancelar",
                }}
                click={() => {
                    {
                        !loading && setOpen(false)
                    }
                    handleSubmit()
                }}
                loading={loading}
            />
        </Box>
    )
}
