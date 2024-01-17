import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material"
import React from "react"
import { colors } from "../style/colors"
import { useNavigate } from "react-router-dom"

interface DialogConfirmProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    user?: User | null
    data: {
        title: string
        content?: string
        submitTitle: string
        cancelTitle?: string
    }

    click?: React.MouseEventHandler<HTMLButtonElement> | undefined
    clickCancel?: React.MouseEventHandler<HTMLButtonElement> | undefined
    children?: React.ReactNode
    loading?: boolean
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({ user, open, setOpen, data, click, children, loading }) => {
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { bgcolor: colors.button, borderRadius: "7vw", p: "1vw" } }}
            disableEscapeKeyDown
            onClose={(event, reason) => {
                if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
                    handleClose()
                }
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ color: colors.text.white, fontSize: "4.5vw" }}>
                {data.title}
            </DialogTitle>
            <DialogContent sx={{ gap: "6vw", display: "flex", flexDirection: "column" }}>
                <DialogContentText id="alert-dialog-description" sx={{ color: colors.text.white, fontSize: "3vw" }}>
                    {data.content}
                </DialogContentText>
                {children}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: colors.text.white, textTransform: "none" }}>
                    {data.cancelTitle}
                </Button>
                <Button onClick={click} autoFocus sx={{ color: colors.text.white, textTransform: "none" }}>
                    {loading ? <CircularProgress sx={{ color: "#fff" }} /> : data.submitTitle}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
