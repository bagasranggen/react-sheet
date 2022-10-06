// @ts-ignore
import { GoogleSpreadsheet } from 'google-spreadsheet';
import currencyToInt from '../utils/currencyToInt';

// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file

const getExpenseData = async (id: number, type: string, sort?: 'event' | 'non-event') => {
    // export async function getExpenseData() {
    // Create a document object using the ID of the spreadsheet - obtained from its URL.
    const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

    try {
        // google sheets
        await doc.useServiceAccountAuth(process?.env?.GOOGLE_APPLICATION_CREDENTIALS ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS) : '');
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsByIndex[id]; // or use doc.sheetsById[id] -- get first sheet in the document

        const rows = await sheet.getRows(); // return the rows from the 1st sheet

        switch (type) {
            case 'config':
                const configData: any = {};

                rows.map((row: any) => {
                    configData[row.sheet] = { id: row.id, label: row.label };
                });

                return configData;

            // returns data summary
            case 'summary':
                return rows.map((row: any) => {
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
                });

            case 'detail':
                const rowFiltered = sort === 'non-event' ? rows.filter((rf: any) => !rf?.event_venue) : (sort === 'event' ? rows.filter((rf: any) => rf?.event_venue) : rows);
                let data: any = {
                    total: {
                        income: 0,
                        expense: 0
                    },
                    detail: {},
                };

                rowFiltered.map((row: any) => {
                    const title = row.title.toLowerCase().replace(/ /g, '_');

                    const getDetailData = (data: any) => ({
                        title: data.title,
                        venue: data?.event_venue ? data?.event_venue : '',
                        eventDate: data?.event_date ? data?.event_date : '',
                        type: data?.income ? 'income' : (data?.expense ? 'expense' : 'notes'),
                        date: data?.date ? data.date : '',
                        description: data?.description ? data.description : '',
                        cashFlow: data?.income ? currencyToInt(data.income) : (data?.charge ? (currencyToInt(data.charge) + currencyToInt(data.expense)) : data?.expense ? currencyToInt(data.expense) : 0),
                    });

                    if (!data.detail[title]?.length) {
                        data.detail[title] = [ getDetailData(row) ];
                    } else {
                        data.detail[title].push(getDetailData(row));
                    }

                    data.total.income += (row?.income) ? currencyToInt(row.income) : 0;
                    data.total.expense += (row?.charge) ? (currencyToInt(row.charge) + currencyToInt(row.expense)) : (row?.expense ? currencyToInt(row.expense) : 0);

                });

                return data;
        }


    } catch (error) {
        //   log any errors to the console
        console.log(error);
    }
};

export default getExpenseData;