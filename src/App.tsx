import "./App.css"
import { useMuiTheme } from "./hooks/useMuiTheme"

import { ThemeProvider } from "@mui/material"
import { BrowserRouter } from "react-router-dom"
import { Routes } from "./Routes"
import { Providers } from "./components/Providers"
import { MantineProvider } from "@mantine/core"

function App() {
    const theme = useMuiTheme()
    return (
        <MantineProvider>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Providers>
                        <Routes />
                    </Providers>
                </BrowserRouter>
            </ThemeProvider>
        </MantineProvider>
    )
}

export default App
