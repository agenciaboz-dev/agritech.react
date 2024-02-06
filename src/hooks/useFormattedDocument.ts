export const formatCPF = (cpf: string): string => {
    // Remove todos os caracteres não numéricos da string
    const numericOnly = cpf.replace(/\D/g, "")

    // Formata o CPF com os pontos e o traço nos lugares corretos
    return `${numericOnly.substring(0, 3)}.${numericOnly.substring(3, 6)}.${numericOnly.substring(
        6,
        9
    )}-${numericOnly.substring(9, 11)}`
}
export const formatCNPJ = (cnpj: string): string => {
    // Remove todos os caracteres não numéricos da string
    const numericOnly = cnpj.replace(/\D/g, "")

    // Formata o CNPJ com os pontos, a barra e o traço nos lugares corretos
    return `${numericOnly.substring(0, 2)}.${numericOnly.substring(2, 5)}.${numericOnly.substring(
        5,
        8
    )}/${numericOnly.substring(8, 12)}-${numericOnly.substring(12, 14)}`
}
