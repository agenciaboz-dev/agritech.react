import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { Call } from "../definitions/call"

interface CallContextValue {
    listCallsPending: Call[]
    setCallsPending: (value: Call[]) => void
    listCalls: Call[]
    setCalls: (value: Call[]) => void
    addCallPending: (newCall: Call) => void
    addCallApprove: (newCall: Call) => void
    removeCallApprove: (call: Call) => void
}

interface CallProviderProps {
    children: React.ReactNode
}

const CallContext = createContext<CallContextValue>({} as CallContextValue)

export default CallContext

export const CallProvider: React.FC<CallProviderProps> = ({ children }) => {
    const io = useIo()
    const [listCalls, setCalls] = useState<Call[]>([])
    const [listCallsPending, setCallsPending] = useState<Call[]>([])

    const addCallPending = (newCall: Call) => {
        setCallsPending((calls) => [...calls, newCall])
    }
    const addCallApprove = (newCall: Call) => {
        setCalls((calls) => [...calls, newCall])
    }

    //atualiza a lista de pendentes após aprovação
    const removeCallApprove = (call: Call) => {
        setCallsPending(listCallsPending.filter((item) => item.id !== call.id))
    }

    useEffect(() => {
        io.emit("call:listPending")

        io.on("call:listPending:success", (data: Call[]) => {
            setCallsPending(data)
        })

        return () => {
            io.off("call:listPending:success")
        }
    }, [])

    useEffect(() => {
        io.emit("call:listApproved")

        io.on("call:listApproved:success", (data: Call[]) => {
            setCalls(data)
        })

        return () => {
            io.off("call:listApproved:success")
        }
    }, [])

    return (
        <CallContext.Provider
            value={{
                listCallsPending,
                setCallsPending,
                listCalls,
                setCalls,
                addCallPending,
                addCallApprove,
                removeCallApprove,
            }}
        >
            {children}
        </CallContext.Provider>
    )
}
