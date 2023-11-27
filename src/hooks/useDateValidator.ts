export const useDateValidator = ()=>{ 
    
const isValidDateString =(dateString:any)=> {
    // Verifica se a string da data não está vazia
    if (!dateString) {
        return false;
    }

    // Divide a string da data em partes (dia, mês, ano)
    const parts = dateString.split("/");
    if (parts.length !== 3) {
        return false;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    // Verifica se dia, mês e ano são números válidos
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return false;
    }

    // Verifica se o mês está no intervalo correto (1-12)
    if (month < 1 || month > 12) {
        return false;
    }

    // Verifica se o dia está no intervalo correto para o mês
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
        return false;
    }

    // Verifica se a data não está no futuro (opcional)
    const today = new Date();
    const inputDate = new Date(year, month - 1, day);
    if (inputDate > today) {
        return false;
    }

    return true;
    }
return {isValidDateString}
} 