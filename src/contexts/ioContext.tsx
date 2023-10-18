import React from "react"
import { createContext, useEffect } from "react"
import { Socket, io as ioSocket } from "socket.io-client"
import { url } from "../api/backend"
import { api } from "../api"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

// const io = ioSocket("ws://localhost:4105")
const io = ioSocket(`ws${url}`)

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    useEffect(() => {
        io.once("connect_error", (error) => {
            console.log(error)
            alert("Não foi possível se conectar com o servidor, verifique sua conexão com a internet")
            api.get("/").then((response) => {
                console.log(response.data)
            })
        })

        io.on("connect", () => {
            alert("Conectado com o servidor")
        })

        io.on("disconnect", (reason) => {
            if (reason == "io client disconnect" || reason == "io server disconnect") {
                ;("Desconectado do servidor")
            } else {
                ;("Conexão com o servidor perdida! Tentando reconectar automaticamente")
            }
        })

        return () => {
            io.off("connect_error")
            io.off("connect")
            io.off("disconnect")
        }
    }, [])

    return <IoContext.Provider value={{ io }}>{children}</IoContext.Provider>
}
