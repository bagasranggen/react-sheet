// @ts-ignore
import { GoogleSpreadsheet } from 'google-spreadsheet';
import currencyToInt from './utils/currencyToInt';
import { createDetailData, createExpenseData } from "./helper";

// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file

const getExpenseData = async (id: number, type: string) => {
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
                let summary: any = {};

                rows.map((row: any) => {
                    switch (typeof summary[row.year as keyof Object]) {
                        case "undefined":
                            summary[row.year as keyof Object] = [ createExpenseData(row) ];
                            break;

                        case "object":
                            summary[row.year as keyof Object].push(createExpenseData(row));
                            break;
                    }
                });

                return summary;

            case 'detail':
                let data: any = {
                    total: {
                        income: 0,
                        expense: 0
                    },
                    detail: {},
                };

                rows.map((row: any) => {
                    const title = row?.title?.toLowerCase()?.replace(/ /g, '_');

                    if (!data.detail[title]?.length) {
                        data.detail[title] = [ createDetailData(row) ];
                    } else {
                        data.detail[title].push(createDetailData(row));
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