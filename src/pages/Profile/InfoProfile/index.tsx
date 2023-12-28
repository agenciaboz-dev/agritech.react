import React, { ChangeEventHandler } from "react"
import { Box, Button, MenuItem, Tab, Tabs, TextField } from "@mui/material"
import { tabStyle } from "../../../style/tabStyle"
import { textField } from "../../../style/input"
import { Personal } from "./Personal"
import { Documentation } from "./Documentation"
import { colors } from "../../../style/colors"
import { Contact } from "./Contact"
import { Address } from "./Address"
import { Bank } from "./Bank"
import { Professional } from "./Professional"

interface InfoProfileProps {
    values: SignupValues
    handleChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    review: boolean
}

export const InfoProfile: React.FC<InfoProfileProps> = ({ values, handleChange, review }) => {
    const [tab, setTab] = React.useState("personal")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }
    return (
        <Box sx={{ gap: "5vw", maxWidth: "100%", color: "black" }}>
            <Tabs
                value={tab}
                onChange={changeTab}
                textColor="primary"
                indicatorColor="primary"
                aria-label="tabs"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
            >
                <Tab sx={tabStyle} value="historic" label="Histórico" />
                <Tab sx={tabStyle} value="personal" label="Pessoal" />
                {values.employee && <Tab sx={tabStyle} value="documentation" label="Documentação" />}
                <Tab sx={tabStyle} value="contact" label="Contato" />
                <Tab sx={tabStyle} value="address" label="Endereço" />
                {!review && <Tab sx={tabStyle} value="bank" label="Dados Bancários" />}
                {!review && <Tab sx={tabStyle} value="professional" label="Profissional" />}
            </Tabs>
            {tab === "personal" && <Personal values={values} handleChange={handleChange ? handleChange : () => {}} />}
            {tab === "documentation" && values.employee && (
                <Documentation values={values} handleChange={handleChange ? handleChange : () => {}} />
            )}
            {tab === "contact" && <Contact values={values} handleChange={handleChange ? handleChange : () => {}} />}
            {tab === "address" && <Address values={values} handleChange={handleChange ? handleChange : () => {}} />}
            {!review && tab === "bank" && values.employee && (
                <Bank values={values} handleChange={handleChange ? handleChange : () => {}} />
            )}
            {!review && tab === "professional" && values.employee && (
                <Professional values={values} handleChange={handleChange ? handleChange : () => {}} />
            )}
        </Box>
    )
}
