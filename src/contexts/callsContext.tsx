import { createContext, useEffect, useState } from "react"
import React from "react"
import { useIo } from "../hooks/useIo"
import { Call } from "../definitions/call"
import { useUser } from "../hooks/useUser"

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
    const { user } = useUser()
    const [listCalls, setCalls] = useState<Call[]>([])
    const [listCallsPending, setCallsPending] = useState<Call[]>([])

    const addCallPending = (newCall: Call) => {
        setCallsPending((calls) => [...calls, newCall])
    }
    const addCallApprove = (newCall: Call) => {
        setCalls((calls) => [...calls, newCall])
    }
    const replaceCall = (data: Call) => {
        setCalls((list) => [...list.filter((item) => item.id !== data.id), data])
    }
    const replaceCallPending = (data: Call) => {
        setCallsPending((list) => [...list.filter((item) => item.id !== data.id), data])
    }
    //atualiza a lista de pendentes após aprovação
    const removeCallApprove = (call: Call) => {
        setCallsPending(listCallsPending.filter((item) => item.id !== call.id))
    }

    useEffect(() => {
        io.on("call:listPending:success", (data: Call[]) => {
            setCallsPending(data)
        })

        return () => {
            io.off("call:listPending:success")
        }
    }, [listCallsPending])

    useEffect(() => {
        io.on("call:new", (data: Call) => {
            if (
                user?.isAdmin ||
                data.producerId == user?.producer?.id ||
                data.kit?.employees?.find((employee) => employee.id == user?.employee?.id)
            ) {
                user?.isAdmin ? addCallApprove(data) : addCallPending(data)
            }
        })
        io.on("call:update", (data: Call) => {
            if (
                user?.isAdmin ||
                data.producerId == user?.producer?.id ||
                data.kit?.employees?.find((employee) => employee.id == user?.employee?.id)
            ) {
                replaceCall(data)
            }
        })
        io.on("call:approved", (call: Call) => {
            if (
                call.producerId == user?.producer?.id ||
                call.kit?.employees?.find((employee) => employee.id == user?.employee?.id)
            ) {
                replaceCall(call)
            }
        })
        io.on("call:closed", (call: Call) => {
            if (
                call.producerId == user?.producer?.id ||
                call.kit?.employees?.find((employee) => employee.id == user?.employee?.id)
            ) {
                replaceCall(call)
            }
        })
        io.on("call:cancel", (call: Call) => {
            if (
                call.producerId == user?.producer?.id ||
                call.kit?.employees?.find((employee) => employee.id == user?.employee?.id)
            ) {
                replaceCall(call)
            }
        })

        io.on("call:listApproved:success", (data: Call[]) => {
            setCalls(data)
        })
        io.on("call:listPending:success", (data: Call[]) => {
            setCallsPending(data)
        })

        return () => {
            io.off("call:new")
            io.off("call:update")
            io.off("call:approve")
            io.off("call:cancel")
            io.off("call:listApproved:success")
        }
    }, [listCalls])

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
