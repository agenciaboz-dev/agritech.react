import { createContext, useEffect, useState } from "react"
import React from "react"
import { Report } from "../definitions/report"
import { useIo } from "../hooks/useIo"
import { useUser } from "../hooks/useUser"

interface ReportsContextValue {
    listReports: Report[]
    setListReports: (value: Report[]) => void
    update: (value: Report) => void
}

interface ReportsProviderProps {
    children: React.ReactNode
}

const ReportsContext = createContext<ReportsContextValue>({} as ReportsContextValue)

export default ReportsContext

export const ReportProvider: React.FC<ReportsProviderProps> = ({ children }) => {
    const io = useIo()
    const { user } = useUser()
    const [listReports, setListReports] = useState<Report[]>([])

    const update = (report: Report) => setListReports((list) => [...list.filter((item) => item.id != report.id), report])

    const addReport = (data: Report) => {
        setListReports((report) => [...report, data])
    }

    const replaceReport = (data: Report) => {
        setListReports((list) => [...list.filter((item) => item.id !== data.id), data])
    }
    useEffect(() => {
        io.on("report:list:success", (reports: Report[]) => {
            console.log("resposta")
            console.log(reports)
            setListReports(reports)
        })

        return () => {
            io.off("report:list:success")
        }
    }, [])

    useEffect(() => {
        io.on("report:new", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                addReport(data)
            }
        })
        io.on("report:approve", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:closed", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:update", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:list", (data: Report[]) => {
            setListReports(data)
        })

        return () => {
            io.off("report:new")
            io.off("report:approve")
            io.off("report:closed")
            io.off("report:update")
        }
    }, [listReports])

    return <ReportsContext.Provider value={{ listReports, setListReports, update }}>{children}</ReportsContext.Provider>
}
