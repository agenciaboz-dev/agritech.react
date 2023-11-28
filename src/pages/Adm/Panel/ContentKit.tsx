import { Box, TextField } from "@mui/material"
import React, { useState } from "react"
import { Avatar } from "@files-ui/react"
import { TitleComponents } from "../../../components/TitleComponents"
import { textField } from "../../../style/input"

interface ContentKitProps {
    edit?: boolean
}

export const ContentKit: React.FC<ContentKitProps> = ({ edit }) => {
    const [image, setImage] = useState<File>()

    return (
        <Box sx={{ flexDirection: "column", gap: "6vw", width: "100%" }}>
            <Box sx={{ gap: "3vw" }}>
                <TitleComponents title="Informações Básicas" />
                <Box sx={{ flexDirection: "row", gap: "2vw", width: "100%" }}>
                    <Avatar
                        src={image}
                        onChange={(file) => setImage(file)}
                        changeLabel="Trocar foto"
                        emptyLabel="Adicionar foto"
                        variant="square"
                        style={{
                            width: "28vw",
                            height: "28vw",
                            fontSize: "4vw",
                            fontFamily: "MalgunGothic2",
                        }}
                    />
                    <Box sx={{ flexDirection: "column", gap: "2vw", width: "70%" }}>
                        <TextField
                            label={"Nome do Kit"}
                            name="name"
                            value={""}
                            sx={{ ...textField, width: "100%" }}
                            // onChange={handleChange}
                            required
                        />
                        <TextField
                            label={"Descrição"}
                            name="description"
                            value={""}
                            sx={textField}
                            // onChange={}
                            required
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ gap: "4vw" }}>
                <TitleComponents title="Objetos" button />
                <Box sx={{ flexDirection: "row", gap: "5vw", p: "2vw" }}>
                    <p style={{ fontSize: "3.5vw" }}>1x</p>
                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontSize: "3.5vw" }}>List Item</p>
                        <p
                            style={{
                                fontSize: "3vw",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "70%",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna dolor.
                        </p>
                    </Box>
                </Box>
                <Box sx={{ flexDirection: "row", gap: "1vw" }}>
                    <TextField
                        label={"Qtd"}
                        name="quantity"
                        value={""}
                        sx={{ ...textField, width: "20%" }}
                        // onChange={handleChange}
                    />
                    <Box sx={{ flexDirection: "column", gap: "2vw", width: "80%", alignItems: "cenetr" }}>
                        <TextField
                            label={"Objeto"}
                            name="name"
                            value={""}
                            sx={{ ...textField, width: "100%" }}
                            // onChange={handleChange}
                            required
                        />
                        <TextField
                            label={"Descrição"}
                            name="description"
                            value={""}
                            sx={textField}
                            // onChange={}
                            required
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{ gap: "3vw" }}>
                <TitleComponents title="Responsáveis" button />
                <Box sx={{ p: "2vw", gap: "3vw" }}>
                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontSize: "3.5vw" }}>List Item</p>
                        <p
                            style={{
                                fontSize: "3vw",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna dolor.
                        </p>
                    </Box>
                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontSize: "3.5vw" }}>List Item</p>
                        <p
                            style={{
                                fontSize: "3vw",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna dolor.
                        </p>
                    </Box>
                    <Box sx={{ flexDirection: "column" }}>
                        <p style={{ fontSize: "3.5vw" }}>List Item</p>
                        <p
                            style={{
                                fontSize: "3vw",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                overflow: "hidden",
                                width: "100%",
                            }}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras in magna dolor.
                        </p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
