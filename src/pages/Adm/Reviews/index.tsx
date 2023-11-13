import { Box, Tab, Tabs } from "@mui/material"
import React, { useEffect } from "react"
import { colors } from "../../../style/colors"
import { Header } from "../../../components/Header"
import { useHeader } from "../../../hooks/useHeader"
import { tabStyle } from "../../../style/tabStyle"

interface ReviewsProps {
    user: User
}

export const Reviews: React.FC<ReviewsProps> = ({ user }) => {
    const header = useHeader()
    const [tab, setTab] = React.useState("requests")
    const changeTab = (event: React.SyntheticEvent, newValue: string) => {
        setTab(newValue)
    }

    useEffect(() => {
        header.setTitle("Análises")
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
                    height: "10%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1vw",
                    padding: "4vw",
                    flexDirection: "row",
                }}
            >
                <Header />
            </Box>

            <Box
                style={{
                    padding: "5vw",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    flex: 1,
                    gap: "8vw",
                }}
            >
                <Tabs
                    value={tab}
                    onChange={changeTab}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="tabs"
                    sx={{ display: "flex", width: "100%" }}
                >
                    <Tab sx={tabStyle} value="requests" label="Solicitações" />
                    <Tab sx={tabStyle} value="approved" label="Aprovados" />
                    <Tab sx={tabStyle} value="reject" label="Reprovados" />

                    {tab === "requests"}
                    {tab === "approved"}
                    {tab === "reject"}
                </Tabs>
            </Box>
        </Box>
    )
}
