import { Avatar } from "@files-ui/react"
import { Avatar as ProfileImage } from "@mui/material"
import { Box, TextField, SxProps, FormGroup, FormControlLabel, styled, Switch } from "@mui/material"
import React, { ChangeEventHandler, useEffect } from "react"
import { textField } from "../../style/input"
import MaskedInput from "../../components/MaskedInput"
import { useIo } from "../../hooks/useIo"
import { useUser } from "../../hooks/useUser"
import { useSnackbar } from "burgos-snackbar"

interface HeaderProfileProps {
    values: Partial<Omit<User, "producer"> & { producer: Partial<Producer> }>
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    style?: SxProps
    view?: boolean
    image: File | undefined
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>
    isAdmin?: boolean
    isManager?: boolean
    setIsAdmin: (value: boolean) => void
    setIsManager: (value: boolean) => void
    profile: User | undefined
    setProfile: (values: User) => void
}

const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
        borderRadius: 22 / 2,
        "&:before, &:after": {
            content: '""',
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            width: 16,
            height: 16,
        },
        "&:before": {
            left: 12,
        },
        "&:after": {
            right: 12,
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "none",
        width: 16,
        height: 16,
        margin: 2,
    },
}))

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
    values,
    handleChange,
    style,
    view,
    image,
    setImage,
    isAdmin,
    isManager,
    setIsAdmin,
    setIsManager,
    profile,
    setProfile,
}) => {
    const { snackbar } = useSnackbar()
    const { user } = useUser()

    const io = useIo()

    const handleChangeAdmin = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsAdmin(event.target.checked)
        io.emit("user:toggle:admin", values.id) // Emitir evento com o ID do usuário
    }

    const handleChangeManager = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setIsManager(event.target.checked)
        io.emit("user:toggle:manager", values.id) // Emitir evento com o ID do usuário
    }

    useEffect(() => {
        io.on("user:manager:toggle:success", (data: User) => {
            setProfile(data)
            console.log({ Manager: data })
        })
        io.on("user:admin:toggle:success", (data: User) => {
            setProfile(data)
            console.log({ Admin: data })
        })
        io.on("user:admin:toggle:failed", (error) => {
            snackbar({ severity: "error", text: "Não foi possível atualizar!" })
        })
        io.on("user:manager:toggle:failed", (error) => {
            snackbar({ severity: "error", text: "Não foi possível atualizar!" })
        })

        return () => {
            io.off("user:manager:toggle:success")
            io.off("user:manager:toggle:failed")
            io.off("user:admin:toggle:success")
            io.off("user:admin:toggle:failed")
        }
    }, [])
    useEffect(() => {
        profile?.isAdmin && setIsAdmin(profile?.isAdmin)
    }, [profile?.isAdmin])
    useEffect(() => {
        profile?.isManager && setIsManager(profile?.isManager)
    }, [profile?.isManager])

    useEffect(() => {
        console.log(profile)
    }, [profile])
    return (
        <Box
            sx={{
                ...style,
            }}
        >
            {view && values !== user ? (
                <ProfileImage src={values.image} style={{ width: "40vw", height: "40vw" }} />
            ) : (
                <Avatar
                    src={image || values.image || null}
                    onChange={(file) => setImage(file)}
                    variant="circle"
                    style={{ width: "52vw", height: "43vw", alignSelf: "center" }}
                    emptyLabel="enviar imagem"
                    changeLabel="trocar imagem"
                />
            )}
            <Box sx={{ flexDirection: "column", gap: "3vw", width: "60%" }}>
                <TextField
                    label={"Nome Completo"}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{ readOnly: true }}
                />
                <TextField
                    label={"Telefone"}
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    sx={textField}
                    InputProps={{
                        inputComponent: MaskedInput,
                        inputProps: { mask: "(00) 0 0000-0000" },
                    }}
                />

                {user?.isAdmin && values.employee?.id !== undefined && profile && (
                    <Box sx={{ flexDirection: "column", justifyContent: "space-between" }}>
                        <FormGroup sx={{ width: "90%" }}>
                            <FormControlLabel
                                checked={isAdmin}
                                control={<Android12Switch />}
                                onChange={handleChangeAdmin}
                                label={
                                    <Box sx={{ width: "100%" }}>
                                        <p style={{ fontSize: "3.5vw", width: "100%" }}>Administrador</p>
                                    </Box>
                                }
                            />
                        </FormGroup>
                        <FormGroup sx={{ width: "90%" }}>
                            <FormControlLabel
                                checked={isManager}
                                control={<Android12Switch />}
                                onChange={handleChangeManager}
                                label={
                                    <Box sx={{ width: "100%" }}>
                                        <p style={{ fontSize: "3.5vw", width: "100%" }}>Gerente</p>
                                    </Box>
                                }
                            />
                        </FormGroup>
                    </Box>
                )}
            </Box>
        </Box>
    )
}
