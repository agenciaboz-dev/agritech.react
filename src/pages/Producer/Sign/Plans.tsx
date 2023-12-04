import { Avatar, Box, Button, Card, CardActionArea, CardContent, Typography } from "@mui/material"
import React, { useState } from "react"
import avatar from "../../../assets/logo/Avatar.png"
import { colors } from "../../../style/colors"

interface PlansProps {
    setCurrentStep: (value: React.SetStateAction<number>) => void
}

export const Plans: React.FC<PlansProps> = ({ setCurrentStep }) => {
    return (
        <Box sx={{ p: "8vw", gap: "13vw", alignItems: "center" }}>
            <h3 style={{ textAlign: "center", fontWeight: "400" }}>
                Escolha um dos planos que melhor se encaixa com suas necessidades:
            </h3>

            <Card
                sx={{
                    boxShadow: "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px",
                    borderRadius: "3vw",
                }}
            >
                <CardActionArea>
                    <CardContent
                        sx={{
                            gap: "3vw",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography gutterBottom variant="h5" component="div">
                            Master
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                            continents except Antarctica
                        </Typography>
                        <Box sx={{ flexDirection: "row", alignItems: "center", gap: "2vw" }}>
                            <Avatar src={avatar} sx={{ width: "5vw", height: "5vw" }} />
                            <p>Michael Scott </p>
                        </Box>
                        <Typography variant="h5" sx={{ alignSelf: "end" }}>
                            R$62,00
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Button
                variant="contained"
                sx={{
                    padding: "1vw",
                    borderColor: colors.button,
                    width: "80%",
                    backgroundColor: "#232323",
                    borderRadius: "10vw",
                    fontWeight: "800",
                    textTransform: "none",
                    fontSize: "3.5vw",
                }}
                onClick={() => {
                    setCurrentStep(2)
                }}
            >
                Próximo
            </Button>
        </Box>
    )
}
