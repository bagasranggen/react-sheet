// import React from 'react';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from '../secrets.json';

// credentials you have generated when creating the service account. TIP: DO NOT check this into your Git repo and it to your .gitignore file

const getExpenseData = async () => {
// export async function getExpenseData() {
	// Create a document object using the ID of the spreadsheet - obtained from its URL.
	const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

	try {
		// google sheets
		await doc.useServiceAccountAuth(creds);
		await doc.loadInfo(); // loads document properties and worksheets
		const sheet = doc.sheetsByIndex[2]; // or use doc.sheetsById[id] -- get first sheet in the document

		const rows = await sheet.getRows(); // return the rows from the 1st sheet

		// this returns the videos
		return rows.map((row) => {
			// return the data for each video (or whatever each row is in your sheet)
			return {
				// id: row.Video,
				title: row.title,
				description: row.description
			};
		});
	} catch (error) {
		//   log any errors to the console
		console.log(error);
	}
};

export default getExpenseData;