import React, { useState } from "react"
import { BottomNavigationAction, BottomNavigation as MuiBottomNav } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { colors } from "../style/colors"

interface BottomNavigationProps {
    external?: boolean
    section: NavigationMenu
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ external, section }) => {
    const navigate = useNavigate()

    const [currentLocation, setCurrentLocation] = useState<
        | {
              id: number
              title: string
              location: string
              icon: React.ReactNode
          }
        | undefined
    >(external ? undefined : section.bottom![0])

    const handleChange = (value: number) => {
        const location = section.bottom!.filter((item) => item.id == value)[0]
        setCurrentLocation(location)
        navigate(`${section.location}${location.location}`)
    }

    return (
        <MuiBottomNav
            showLabels
            value={currentLocation?.id || 0}
            onChange={(_, newValue) => handleChange(newValue)}
            sx={{
                marginTop: "auto",
                background: "transparent",
                padding: "4vw",
                height: "10vh",
                position: "fixed",
                left: 0,
                bottom: 0,
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            <BottomNavigationAction value={0} sx={{ display: "none" }} />
            {section.bottom?.map((item) => {
                return (
                    <BottomNavigationAction
                        key={item.id}
                        label={<p style={{ fontSize: "2.5vw" }}>{item.title}</p>}
                        icon={item.icon}
                        value={item.id}
                        sx={{
                            color: currentLocation?.id == item.id ? "white" : colors.text.black,
                            background: currentLocation?.id == item.id ? colors.text.black : "",
                            borderRadius: "2vw",
                            gap: "1vw",
                            padding: "0",
                            minWidth: "0!important",
                        }}
                    />
                )
            })}
        </MuiBottomNav>
    )
}
