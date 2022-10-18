const eventSortByDate = (items: any) => {
    let sortedObj: any = {};

    const sorted = Object.keys(items).sort((a: any, b: any) => {
        // @ts-ignore
        return new Date(items[a][0]?.eventDate) - new Date(items[b][0]?.eventDate);
    });

    sorted.map((s: any, i: number) => {
        sortedObj[s] = i;
    });

    return sortedObj;
};

export default eventSortByDate;