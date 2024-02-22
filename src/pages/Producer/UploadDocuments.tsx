import React from "react"
import { Box, SxProps } from "@mui/material"
import { Avatar, ExtFile, FileInputButton } from "@files-ui/react"

interface UploadDocumentsProps {
    style?: SxProps
    gallery: ExtFile[]
    setGallery: React.Dispatch<React.SetStateAction<ExtFile[]>>
    file?: ExtFile[]
}

export const UploadDocuments: React.FC<UploadDocumentsProps> = ({ style, gallery, setGallery, file }) => {
    return (
        <Box sx={{ gap: "2.3vw", width: "100%", flexWrap: "wrap" }}>
            {gallery.map((file) => (
                <Avatar
                    key={file.id}
                    src={file.file}
                    onClick={(event) => {
                        event.preventDefault()
                        setGallery(gallery.filter((item) => item.id != file.id))
                    }}
                    smartImgFit={"orientation"}
                    changeLabel="Clique para remover a imagem"
                    // style={{ width: "100%", height: "30vw" }}
                    style={{
                        width: "10.94vw",
                        height: "10.94vw",
                        borderRadius: "0.5vw",
                        //boxShadow: `3px -5px 0 ${muiColors.green[500]}`,
                    }}
                />
            ))}
            <FileInputButton
                onChange={(files) => setGallery(files)}
                value={gallery}
                behaviour="add"
                label="+"
                accept="image/*"
                style={{ width: "10vw", padding: "0vw", fontSize: "4vw" }}
            />
            {/* <IconButton sx={{ display: "flex", justifyContent: "end" }} onClick={() => {}}>
            <ArrowCircleUpSharpIcon color="primary" />
        </IconButton> */}
        </Box>
    )
}
