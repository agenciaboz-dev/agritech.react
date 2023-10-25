import React, { ChangeEventHandler } from "react"
import { Box, Button, MenuItem, Tab, Tabs, TextField } from "@mui/material"
import { tabStyle } from "../../../style/tabStyle"
import { textField } from "../../../style/input"
import { Personal } from "./Personal"
import { Documentation } from "./Documentation"
import { colors } from "../../../style/colors"

interface InfoProfileProps {
    values: FormValues
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const InfoProfile: React.FC<InfoProfileProps> = ({ values, handleChange }) => {
    const [tab, setTab] = React.useState("personal")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    return (
        <Box sx={{ gap: "5vw" }}>
            <Tabs value={tab} onChange={changeTab} textColor="primary" indicatorColor="primary" aria-label="tabs">
                <Tab sx={tabStyle} value="personal" label="Pessoal" />
                <Tab sx={tabStyle} value="documentation" label="Documentação" />
                <Tab sx={tabStyle} value="contact" label="Contato" />
                <Tab sx={tabStyle} value="professional" label="Profissional" />
            </Tabs>
            {tab === "personal" && (
                <Box sx={{ justifyContent: "space-between", gap: "10vw" }}>
                    <Personal values={values} handleChange={handleChange} setTab={setTab} />
                    <Box sx={{ flexDirection: "row", gap: "2vw" }}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: "#B3261E", borderRadius: "5vw", width: "50%", textTransform: "none" }}
                            onClick={() => {}}
                        >
                            Não Aprovar
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: colors.button, borderRadius: "5vw", width: "50%", textTransform: "none" }}
                            onClick={() => {
                                setTab("documentation")
                            }}
                        >
                            Próximo
                        </Button>
                    </Box>
                </Box>
            )}
            {tab === "documentation" && <Documentation values={values} handleChange={handleChange} />}
        </Box>
    )
}
