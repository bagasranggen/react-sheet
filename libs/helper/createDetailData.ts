import currencyToInt from "../utils/currencyToInt";

export const createDetailData = (data: any) => ({
    title: data.title,
    type: data?.income ? 'income' : 'expense',
    date: data.date,
    description: data.description,
    cashFlow: data?.income ? currencyToInt(data.income) : (data?.charge ? (currencyToInt(data.charge) + currencyToInt(data?.expense ?? 'Rp0')) : currencyToInt(data?.expense ?? 'Rp0')),
});