export declare interface CepAbertoApi {
    altitude: number
    cep: string
    latitude: string
    longitude: string
    cidade: {
        ddd: number
        ibge: string
        nome: string
    }
    estado: {
        sigla: string
    }
}
