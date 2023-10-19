export const useDataHandler = () => {
    const unmask = (data: string) => {
        return data.replace(/\D/g, "")
    }

    return { unmask }
}
