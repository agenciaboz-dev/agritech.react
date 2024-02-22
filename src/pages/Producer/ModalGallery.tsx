import { Modal, ModalContent, TextInput } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react"
import { LiaObjectGroupSolid } from "react-icons/lia"
import { MdNumbers, MdOutlineAdd } from "react-icons/md"
import { TbFileDescription } from "react-icons/tb"
import { Box, CircularProgress, IconButton } from "@mui/material"
import { colors } from "../../style/colors"
import { AiOutlineDelete } from "react-icons/ai"
import { NewObject } from "../../definitions/object"
import { ButtonAgritech } from "../../components/ButtonAgritech"
import { UploadDocuments } from "./UploadDocuments"
import { ExtFile } from "@files-ui/react"

interface ModalGalleryProps {
    gallery: ExtFile[]
    setGallery: (values: ExtFile[]) => void
    opened: boolean
    close: () => void
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({ opened, close, gallery, setGallery }) => {
    const addGallery = () => {
        // setGallery([...gallery, { images: [], talhaoId: 0, tillageId: 0 }])
    }
    const deleteObject = (id: number) => {
        const newObj = gallery.filter((_, index) => index !== id)
        setGallery(newObj)
    }
    const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
        const newObj = [...gallery]
        newObj[index] = {
            ...newObj[index],
            [event.target.name]: event.target.value,
        }
        setGallery(newObj)
    }

    const saveGallery = () => {
        console.log("Galeria salvas", gallery)
        close()
    }
    return (
        <Modal
            size={"sm"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title="Inserir Galerias"
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            {gallery.map((objeto, index) => (
                <Box sx={{ gap: "0.5vw" }} key={index}>
                    <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h4>Objeto {index + 1}</h4>
                        <IconButton onClick={() => deleteObject(index)}>
                            <AiOutlineDelete color={colors.delete} />
                        </IconButton>
                    </Box>
                    <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                        <UploadDocuments gallery={gallery} setGallery={setGallery} file={[]} />
                    </Box>
                </Box>
            ))}
            <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw" }}>
                <ButtonAgritech
                    variant="outlined"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "3.6vw",
                        p: "2vw",
                        bgColor: "red",
                        color: colors.text.black,
                    }}
                    onClick={addGallery}
                >
                    <MdOutlineAdd color="#000" />
                    Adicionar objeto
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: "50%",
                        alignSelf: "end",
                        fontSize: "3.6vw",
                        p: "2vw",
                        bgcolor: colors.button,
                        color: colors.text.white,
                    }}
                    onClick={saveGallery}
                >
                    Salvar
                </ButtonAgritech>
            </Box>
        </Modal>
    )
}
