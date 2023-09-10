import { currencyToInt } from '../utils/';

export const createExpenseData = (row: any) => {
    const uri = (row?.year && row?.month) ? `${row.month.toLowerCase()}-${row.year}` : '';

    return {
        year: row?.year ? row.year : '',
        month: row?.month ? row.month : '',
        uri: uri ? uri : '',
        url: uri ? `/monthly/${uri}` : '',
        align: row?.align ? row.align : '',
        income: row?.income ? currencyToInt(row.income) : 0,
        expense: row?.expense ? currencyToInt(row.expense) : 0,
        profit: row?.profit ? currencyToInt(row.profit) : 0,
        isProfit: row?.profit ? currencyToInt(row.profit) > 0 : true
    };
};