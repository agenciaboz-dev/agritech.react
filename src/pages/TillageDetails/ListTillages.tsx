import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { colors } from "../../style/colors"
import { useNavigate, useParams } from "react-router-dom"
import { useNavigationList } from "../../hooks/useNavigationList"
import { useHeader } from "../../hooks/useHeader"
import { CardUser } from "../../components/CardUser"
import { useProducer } from "../../hooks/useProducer"
import { useUser } from "../../hooks/useUser"
import { CardTillage } from "../../components/CardTillage"

interface ListTillagesProps {}

export const ListTillages: React.FC<ListTillagesProps> = ({}) => {
    const navigate = useNavigate()
    const bottomMenu = useNavigationList()
    const header = useHeader()

    // const { producerid } = useParams()

    const { listTillagesP } = useProducer()
    const { user } = useUser()

    useEffect(() => {
        header.setTitle(user?.producer !== null ? "Minhas lavouras" : "Lavouras")
    })

    useEffect(() => {
        console.log(user?.producer !== null && listTillagesP)
    }, [listTillagesP])

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
                    justifyContent: "center",
                    height: "92%",
                    backgroundColor: colors.secondary,
                    borderTopLeftRadius: "5vw",
                    borderTopRightRadius: "5vw",
                    paddingTop: 10,
                }}
            >
                <Box
                    style={{
                        padding: "4vw",
                        width: "100%",
                        flex: 1,
                        backgroundColor: "#fff",
                        borderTopLeftRadius: "7vw",
                        borderTopRightRadius: "7vw",
                        overflow: "hidden",
                    }}
                >
                    <Box sx={{ gap: "2vw", height: "90%", overflow: "auto" }}>
                        {listTillagesP?.map((item, index) => (
                            <CardTillage key={index} tillage={item} location={`/producer/tillage/${item.id}`} />
                        ))}

                        <Box style={{ width: "100%", height: "80%", overflow: "auto" }}></Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
