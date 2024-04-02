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
        io.on("report:creation:success", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                addReport(data)
            }
        })
        io.on("report:approve:success", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:closed:success", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:update:success", (data: Report) => {
            if (user?.isAdmin || data.call?.kit?.employees?.find((employee) => employee.id == user?.employee?.id)) {
                replaceReport(data)
            }
        })
        io.on("report:list:success", (data: Report[]) => {
            // setListReports(data)
        })

        return () => {
            io.off("report:creation:success")
            io.off("report:approve:success")
            io.off("report:closed:success")
            io.off("report:update:success")
        }
    }, [listReports])

    return <ReportsContext.Provider value={{ listReports, setListReports, update }}>{children}</ReportsContext.Provider>
}
