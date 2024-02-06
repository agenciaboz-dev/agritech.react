export declare interface CepAbertoApi {
    cep: string
    latitude: string
    longitude: string
    logradouro: string
    bairro: string
    complemento: string
    altitude: number
    cidade: {
        ddd: number
        ibge: string
        nome: string
    }
    estado: {
        sigla: string
    }
}
