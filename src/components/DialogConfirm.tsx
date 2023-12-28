import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, SxProps } from "@mui/material"
import React from "react"
import { colors } from "../style/colors"

interface DialogConfirmProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    data: {
        title: string
        content: string
        submitTitle: string
        cancelTitle?: string
    }

    click?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({ open, setOpen, data, click }) => {
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{ sx: { bgcolor: colors.button, borderRadius: "7vw" } }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ color: colors.text.white, fontSize: "4.5vw" }}>
                {data.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ color: colors.text.white, fontSize: "3vw" }}>
                    {data.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{ color: colors.text.white, textTransform: "none" }}>
                    {data.cancelTitle}
                </Button>
                <Button onClick={click} autoFocus sx={{ color: colors.text.white, textTransform: "none" }}>
                    {data.submitTitle}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
