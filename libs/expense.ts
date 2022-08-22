// import React from 'react';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../secrets.json';
import currencyToInt from '../utils/currencyToInt';

// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file

const getExpenseData = async (id: number, type: string) => {
	// export async function getExpenseData() {
	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

	try {
		// google sheets
		// await doc.useServiceAccountAuth(process.env.GOOGLE_SERVICE_KEY);
		await doc.useServiceAccountAuth(creds);
		await doc.loadInfo(); // loads document properties and worksheets
		// const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id] -- get first sheet in the document
		const sheet = doc.sheetsByIndex[id]; // or use doc.sheetsById[id] -- get first sheet in the document

		const rows = await sheet.getRows(); // return the rows from the 1st sheet

		switch (type) {
			// returns data summary
			case 'summary':
				return rows.map((row: any) => ({
					title: row.title,
					description: row.description
				}));

			case 'detail':
				let data: any = {};
				const rawData = rows.map((row: any) => ({
					date: row.date,
					title: row.title,
					description: row.description,
					cashFlow: row?.income ? row.income : (row?.charge) ? (row.charge + row.expense) : row.expense
				}))

				rows.map((row: any) => {
					const title = row.title.toLowerCase().replace(/ /g, '_');

					if (!data[title]?.length) {
						data[title] = [{
							date: row.date,
							title: row.title,
							description: row.description,
							cashFlow: row?.income ? currencyToInt(row.income) : (row?.charge) ? (currencyToInt(row.charge) + currencyToInt(row.expense)) : currencyToInt(row.expense)
						}]
					} else {
						data[title].push({
							date: row.date,
							title: row.title,
							description: row.description,
							cashFlow: row?.income ? currencyToInt(row.income) : (row?.charge) ? (currencyToInt(row.charge) + currencyToInt(row.expense)) : currencyToInt(row.expense)
						})
					}
				})

				return data;

			default:
				break;
		}


	} catch (error) {
		//   log any errors to the console
		console.log(error);
	}
};

export default getExpenseData;