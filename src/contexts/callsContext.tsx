import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { Call } from "../definitions/call"

interface CallContextValue {
    listCallsPending: Call[]
    setCallsPending: (value: Call[]) => void
    addCallPending: (newCall: Call) => void
    removeCallApprove: (call: Call) => void
}

interface CallProviderProps {
    children: React.ReactNode
}

const CallContext = createContext<CallContextValue>({} as CallContextValue)

export default CallContext

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
    const io = useIo()
    const [listCallsPending, setCallsPending] = useState<Call[]>([])

    useEffect(() => {
        io.emit("call:listPending")

        io.on("call:listPending:success", (data: Call[]) => {
            setCallsPending(data)
        })

        return () => {
            io.off("call:listPending:success")
        }
    }, [])

    const addCallPending = (newCall: Call) => {
        setCallsPending((calls) => [...calls, newCall])
    }
    const removeCallApprove = (call: Call) => {
        setCallsPending(listCallsPending.filter((item) => item.id !== call.id))
    }

    return (
        <CallContext.Provider value={{ listCallsPending, setCallsPending, addCallPending, removeCallApprove }}>
            {children}
        </CallContext.Provider>
    )
}
