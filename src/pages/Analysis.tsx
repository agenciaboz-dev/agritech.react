import { Box, Button, IconButton } from "@mui/material"
import React, { useState } from "react"
import { useUser } from "../hooks/useUser"
import LogoutIcon from "@mui/icons-material/Logout"
import drone from "../assets/logo/droneIcon.png"
import { colors } from "../style/colors"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"

interface AnalysisProps {
    user: User
}

export const Analysis: React.FC<AnalysisProps> = ({ user }) => {
    const { logout } = useUser()

    console.log({ rejectedUser: user })

    return (
        <Box style={{ flex: 1, backgroundColor: colors.button, paddingTop: "10vw" }}>
            <Box style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "0 4vw" }}>
                <Box
                    sx={{
                        width: "100%",
                        flexDirection: "row",
                        paddingBottom: "2vw",
                        alignItems: "center",
                        paddingLeft: "4vw",
                        paddingRight: "4vw",
                        gap: "1vw",
                    }}
                >
                    <img src={drone} style={{ width: 40 }} />
                    <p
                        style={{
                            color: colors.text.white,
                            fontSize: "5vw",
                            fontFamily: "MalgunGothic2",
                            fontWeight: "bold",
                        }}
                    >
                        Análise
                    </p>
                </Box>
                <IconButton onClick={logout}>
                    <LogoutIcon sx={{ color: "#fff", width: "6vw" }} />
                </IconButton>
            </Box>
            <Box
                style={{
                    padding: "10vw",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderTopLeftRadius: "7vw",
                    borderTopRightRadius: "7vw",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    gap: "8vw",
                    textAlign: "center",
                }}
            >
                {user.rejected === null && !user.isAdmin ? (
                    <>
                        {" "}
                        <p style={{ fontSize: "5vw", fontWeight: "800" }}>Aguardando</p>
                        <p style={{ fontSize: "3.5vw", fontWeight: "400", textAlign: "center" }}>
                            Estamos analisando seu cadastro. O processo demora em torno de 2 dias. Acompanhe seu e-mail para
                            obter atualizações.
                        </p>
                    </>
                ) : (
                    <>
                        <Box sx={{ justifyContent: "center", alignItems: "center" }}>
                            {" "}
                            <HighlightOffIcon fontSize="large" sx={{ color: colors.primary }} />
                            <p style={{ fontSize: "5vw", fontWeight: "800" }}>Cadastro recusado!</p>
                            <p style={{ fontSize: "4vw", fontWeight: "400" }}>Motivo: {user.rejected}</p>
                        </Box>
                        <Button variant="contained" sx={{ textTransform: "none", justifyContent: "flex-end" }}>
                            Rever Cadastro
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    )
}
