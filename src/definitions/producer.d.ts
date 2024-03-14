declare interface Producer {
    id?: number
    cnpj: string
    inscricaoEstadual: string
    contract: boolean
    tillage?: Tillage[]
    employeeId?: number
    reportId?: number
    // userid: number
    user?: User
    call: Call[]
}
