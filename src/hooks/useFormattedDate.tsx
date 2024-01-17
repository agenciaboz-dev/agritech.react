export const dateFrontend = (value: string | Date) => {
    return new Date(new Date(value).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
}
