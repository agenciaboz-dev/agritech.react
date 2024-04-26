import { Modal } from "@mantine/core"
import React, { useEffect, useRef, useState } from "react"
import { Avatar, Box, Grid, useMediaQuery } from "@mui/material"
import { colors } from "../../style/colors"
import { AiOutlineDelete } from "react-icons/ai"
import { ButtonAgritech } from "../../components/ButtonAgritech"
import { Dropzone, MIME_TYPES } from "@mantine/dropzone"
import classes from "../../style/DropzoneButton.module.css"
import { RxUpload } from "react-icons/rx"

interface ModalGalleryProps {
    images: { id: number; name: string; file: File; url: string }[]
    setImages: React.Dispatch<React.SetStateAction<{ id: number; file: File; name: string; url: string }[]>>
    opened: boolean
    close: () => void
    tillageId?: number
}

export const ModalGallery: React.FC<ModalGalleryProps> = ({ opened, close, images, setImages }) => {
    const isMobile = useMediaQuery("(orientation: portrait)")
    const openRef = useRef<() => void>(null)

    const handleUpload = (files: File[]) => {
        const newImages: { id: number; file: File; name: string; url: string }[] = files.map((file) => {
            const urlImage = URL.createObjectURL(file)
            return { id: Math.random(), file: file, name: file.name, url: urlImage, isDeleting: false }
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

    const saveGallery = () => {
        console.log("Galeria salva", images)

        close()
    }
    useEffect(() => {
        console.log({ ImagensSelecionadas: images })
    }, [images])
    return (
        <Modal
            size={isMobile ? "sm" : "lg"}
            opened={opened}
            onClose={close}
            withCloseButton
            centered
            style={{}}
            title={"Criar Galeria"}
            styles={{
                body: { display: "flex", flexDirection: "column", gap: isMobile ? "6vw" : "1vw", borderRadius: isMobile ? "10vw" : "2vw" },
                root: { minHeight: "fit-content" },
                content: { maxHeight: "75%", borderRadius: isMobile ? "6vw" : "2vw" },
            }}
        >
            <Box sx={{ gap: "0.5vw", height: "100%" }}>
                <Box sx={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {/* <h4>Galeria {1}</h4> */}
                    {/* <IconButton onClick={() => deleteObject(index)}>
                        <AiOutlineDelete color={colors.delete} />
                    </IconButton> */}
                </Box>
                <Box sx={{ flexDirection: "column", gap: "1vw", height: isMobile ? "50%" : "100%", overflowY: "auto" }}>
                    <Dropzone
                        openRef={openRef}
                        onDrop={handleUpload}
                        className={classes.dropzone}
                        radius="md"
                        accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
                    />
                    <Box
                        sx={{
                            width: "100%",
                            height: isMobile ? "50%" : "100%",
                            padding: isMobile ? "2vw" : "1vw",
                            alignItems: "center",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                            borderColor: "gray",
                            borderRadius: isMobile ? "4vw" : "2vw",
                            flexDirection: "row",
                            gap: isMobile ? "1.5vw" : "1vw",
                            overflowY: "scroll",
                        }}
                    >
                        {images.length !== 0 ? (
                            <Grid container spacing={2}>
                                {images.map((image) => (
                                    <Grid item xs={isMobile ? 2.9 : 3} md={isMobile ? 7 : 3} sx={{ position: "relative", display: "inline-block" }}>
                                        <Avatar
                                            variant="rounded"
                                            key={image.id}
                                            src={image.url}
                                            sx={{
                                                width: isMobile ? "18vw" : "9vw",
                                                height: isMobile ? "18vw" : "9vw",
                                                opacity: selectedForDeletion === image.id ? 0.5 : 1,
                                                // margin: "0 auto",
                                            }}
                                            onClick={() => image.id && toggleSelectionForDeletion(image.id)}
                                        />
                                        {selectedForDeletion === image.id && (
                                            <ButtonAgritech
                                                onClick={() => image.id && handleRemove(image.id)}
                                                style={{
                                                    borderRadius: 0,
                                                    position: "absolute",
                                                    top: isMobile ? "4vw" : "",
                                                    left: isMobile ? "4vw" : "16px",
                                                    right: 0,
                                                    bottom: 0,
                                                    width: isMobile ? "18vw" : "9vw",
                                                    height: isMobile ? "18vw" : "9vw",
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
                        ) : (
                            <Box sx={{ width: "100%", alignItems: "center", color: colors.primary }}>
                                <p>Selecione as imagens</p>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ width: "100%", height: "fit-content", flexDirection: "row", gap: isMobile ? "2vw" : "1vw", justifyContent: "space-between" }}>
                <ButtonAgritech
                    sx={{
                        width: isMobile ? "60%" : "50%",
                        padding: isMobile ? "3vw" : "1vw",
                        color: colors.text.white,
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        textTransform: "none",
                        borderRadius: "5vw",
                        height: isMobile ? "10vw" : "fit-content",
                        gap: isMobile ? "2vw" : "1vw",
                        bgcolor: colors.secondary,
                    }}
                    onClick={() => openRef.current?.()}
                >
                    <RxUpload /> Selecionar imagens
                </ButtonAgritech>
                <ButtonAgritech
                    variant="contained"
                    sx={{
                        width: isMobile ? "40%" : "50%",
                        alignSelf: "end",
                        fontSize: isMobile ? "3.6vw" : "1rem",
                        p: isMobile ? "2vw" : "1vw",
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
