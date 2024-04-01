import React, { useRef, useState } from "react"
import { createContext, useEffect } from "react"
import { Socket, io as ioSocket } from "socket.io-client"
import { url } from "../api/backend"
import { api } from "../api"
import { useSnackbar } from "burgos-snackbar"

interface IoContextValue {
    io: Socket
}

interface IoProviderProps {
    children: React.ReactNode
}

const IoContext = createContext<IoContextValue>({} as IoContextValue)

export default IoContext

const io = ioSocket(`ws${url}`)

interface QueuedEvent {
    eventName: string
    args: any[]
}

export const IoProvider: React.FC<IoProviderProps> = ({ children }) => {
    const socketRef = useRef<Socket | null>(null)

    const { snackbar } = useSnackbar()

    if (!socketRef.current) {
        const originalSocket = io

        const handler = {
            get(target: any, propKey: string) {
                if (propKey === "emit") {
                    return function (eventName: string, ...args: any[]) {
                        if (!navigator.onLine) {
                            console.log("sem internet")
                            snackbar({
                                severity: "info",
                                text: "Você está sem conexão. Sua requisição foi salva na lista e será enviada assim que for conectado de novo, não tente novo.",
                            })
                            const events = JSON.parse(localStorage.getItem("agritech:queuedEvents") || "[]") as QueuedEvent[]
                            events.push({ eventName, args })
                            localStorage.setItem("agritech:queuedEvents", JSON.stringify(events))
                        } else {
                            return target.emit(eventName, ...args)
                        }
                    }
                } else {
                    return target[propKey]
                }
            },
        }

        socketRef.current = new Proxy(originalSocket, handler)

        originalSocket.on("connect", () => {
            const events = JSON.parse(localStorage.getItem("agritech:queuedEvents") || "[]") as QueuedEvent[]
            events.forEach(({ eventName, args }) => {
                console.log({ eventName, args })
                originalSocket.emit(eventName, ...args)
            })
            localStorage.setItem("agritech:queuedEvents", JSON.stringify([]))
        })
    }

    return <IoContext.Provider value={{ io: socketRef.current as Socket }}>{children}</IoContext.Provider>
}
