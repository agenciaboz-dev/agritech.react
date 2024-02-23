import { Modal } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Grid } from "@mui/material"
import { colors } from "../../style/colors"
import { AiOutlineDelete } from "react-icons/ai"
import { ButtonAgritech } from "../../components/ButtonAgritech"
import { Dropzone, MIME_TYPES } from "@mantine/dropzone"
import classes from "../../style/DropzoneButton.module.css"
import { RxUpload } from "react-icons/rx"

interface ModalGalleryProps {
    images: { id: number; url: string }[]
    setImages: React.Dispatch<React.SetStateAction<{ id: number; url: string }[]>>
    opened: boolean
    close: () => void
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({ opened, close, images, setImages }) => {
    const openRef = useRef<() => void>(null)

    const handleUpload = (files: File[]) => {
        const newImages: { id: number; url: string }[] = files.map((file) => {
            const url = URL.createObjectURL(file)
            return { id: Math.random(), url, isDeleting: false }
        })

        setImages((currentImages) => [...currentImages, ...newImages])
    }

    const [selectedForDeletion, setSelectedForDeletion] = useState<number | null>(null)

    // Marcar/desmarcar imagem para deleção
    const toggleSelectionForDeletion = (imageId: number) => {
        if (selectedForDeletion === imageId) {
            setSelectedForDeletion(null)
        } else {
            // Marcar nova imagem e desmarcar as outras
            setSelectedForDeletion(imageId)
        }
    }

    const handleRemove = (imageId: number) => {
        const currentImages = images.filter((item) => item.id != imageId)
        setImages(currentImages)
        setSelectedForDeletion(null)
    }

    useEffect(() => {
        console.log({ ImagensSelecionadas: images })
    }, [images])

    const saveGallery = () => {
        console.log("Galeria salva", images)
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
            title={"Criar Galeria"}
            styles={{
                body: { display: "flex", flexDirection: "column", gap: "6vw", borderRadius: "10vw" },
                root: { maxHeight: "75%", minHeight: "fit-content" },
                content: { borderRadius: "6vw" },
            }}
        >
            <Box sx={{ gap: "0.5vw", height: "100%" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <h4>Galeria {1}</h4> */}
                    {/* <IconButton onClick={() => deleteObject(index)}>
                        <AiOutlineDelete color={colors.delete} />
                    </IconButton> */}
                </Box>
                <Box sx={{ flexDirection: "column", gap: "1vw", height: "50%", overflowY: "auto" }}>
                    <Dropzone
                        openRef={openRef}
                        onDrop={handleUpload}
                        className={classes.dropzone}
                        radius="md"
                        accept={[MIME_TYPES.jpeg, MIME_TYPES.png, MIME_TYPES.webp, MIME_TYPES.svg]}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            height: "50%",
                            padding: "2vw",
                            alignItems: "center",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            borderColor: "gray",
                            borderRadius: "4vw",
                            flexDirection: "row",
                            gap: "1.5vw",
                            overflowY: "scroll",
                        }}
                    >
                        <Grid container spacing={2}>
                            {images.map((image) => (
                                <Grid item xs={2.9} md={7} sx={{ position: "relative", display: "inline-block" }}>
                                    <Avatar
                                        variant="rounded"
                                        key={image.id}
                                        src={image.url}
                                        sx={{
                                            width: "18vw",
                                            height: "18vw",
                                            opacity: selectedForDeletion === image.id ? 0.5 : 1,
                                        }}
                                        onClick={() => image.id && toggleSelectionForDeletion(image.id)}
                                    />
                                    {selectedForDeletion === image.id && (
                                        <ButtonAgritech
                                            onClick={() => image.id && handleRemove(image.id)}
                                            style={{
                                                borderRadius: 0,
                                                position: "absolute",
                                                top: "4vw",
                                                left: "4vw",
                                                right: 0,
                                                bottom: 0,
                                                width: "18vw",
                                                height: "18vw",
                                                opacity: 0.5,
                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <AiOutlineDelete size="20" style={{ color: "white" }} />
                                        </ButtonAgritech>
                                    )}
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", flexDirection: "row", gap: "2vw", justifyContent: "space-between" }}>
                <ButtonAgritech
                    sx={{
                        width: "60%",
                        padding: "3vw",
                        color: colors.text.white,
                        fontWeight: "600",
                        fontSize: "4vw",
                        textTransform: "none",
                        borderRadius: "10vw",
                        height: "10vw",
                        gap: "2vw",
                        bgcolor: colors.secondary,
                    }}
                    onClick={() => openRef.current?.()}
                >
                    <RxUpload /> Selecionar imagens
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: "40%",
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
