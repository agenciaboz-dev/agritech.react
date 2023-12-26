import React, { useEffect } from "react"
import { Accordion, Box, Button, Radio } from "@mui/material"
import { Avatar } from "@files-ui/react"
import GeoImage from "../../../assets/geo.svg"
import { Header } from "../../../components/Header"
import { colors } from "../../../style/colors"
import { useHeader } from "../../../hooks/useHeader"
import { useParams } from "react-router-dom"
import { useUsers } from "../../../hooks/useUsers"
import { TitleComponents } from "../../../components/TitleComponents"
import { styled } from "@mui/material/styles"

import MuiAccordionDetails from "@mui/material/AccordionDetails"
import Typography from "@mui/material/Typography"
import { AccordionSummary } from "../../../components/Accordion"
import { useArray } from "burgos-array"

interface ApproveCallProps {
    user: User
}

const p_style = {
    fontSize: "3vw",
    fontWeight: "600",
}

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}))

export const ApproveCall: React.FC<ApproveCallProps> = ({ user }) => {
    const header = useHeader()
    const kits = useArray().newArray(10)
    const { callid } = useParams()

    const [expanded, setExpanded] = React.useState<string | false>("")

    const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
    }

    const { pendingUsers } = useUsers()
    const findUser = pendingUsers?.filter((user) => String(user.id) === callid)

    useEffect(() => {
        console.log(findUser)
    }, [callid])

    useEffect(() => {
        header.setTitle(findUser[0].name)
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.button,
                flexDirection: "column",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "8%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header back location="../" />
            </Box>
            <Box
                style={{
                    height: "92%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                }}
            >
                <Box sx={{ width: "100%", height: "90%", gap: "7vw", flexDirection: "column", p: "4vw" }}>
                    <p style={{ fontSize: "4.5vw" }}>Abertura do Chamado</p>

                    <Box
                        sx={{
                            flexDirection: "row",
                            gap: "5vw",
                            width: "100%",
                            height: "23%",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            src={GeoImage}
                            // onChange={(file) => setImage(file)}
                            changeLabel="Trocar foto"
                            emptyLabel="Adicionar foto"
                            variant="square"
                            style={{
                                width: "40vw",
                                height: "40vw",
                                fontSize: "4vw",
                                fontFamily: "MalgunGothic2",
                            }}
                        />
                        <Box sx={{ flexDirection: "column", gap: "2vw", width: "65%" }}>
                            <Box>
                                <p style={p_style}>Nome da Lavoura</p>
                                <p>Fazenda Tomato</p>
                            </Box>
                            <Box>
                                <p style={p_style}>Endereço </p>
                                <p>4MF8+CV, São Francisco de Goiás - GO, 76330-000</p>
                            </Box>
                            <Box>
                                <p style={p_style}>Área</p>
                                <p>5 Hc</p>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ height: "63%" }}>
                        <TitleComponents title="Escolha o kit para enviar" button />
                        <Box sx={{ height: "100%", overflowY: "auto" }}>
                            {kits.map((kit, index) => (
                                <Accordion
                                    elevation={0}
                                    key={index}
                                    expanded={expanded === String(index)}
                                    onChange={handleChange(String(index))}
                                >
                                    <AccordionSummary aria-controls="panel1d-content" id={String(index)}>
                                        <Typography>Kit #{index}</Typography>
                                        <Radio />
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p>Objetos</p>
                                        <p>1x Item</p>
                                        <p>2x Ipsum</p>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
