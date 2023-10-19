import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import { useMuiTheme } from "./hooks/useMuiTheme"

import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './Routes'
import { Providers } from './components/Providers'

function App() {
    const theme = useMuiTheme()
  return (
    <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Providers>
                    <Routes />
                </Providers>
            </BrowserRouter>
        </ThemeProvider>
  )
}

export default App
