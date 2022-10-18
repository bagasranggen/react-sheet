import React from 'react';
import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';
import eventSortByDate from '../utils/eventSortByDate';

import DetailPage from '../components/container/detailPage/DetailPage';

export async function getStaticProps() {
    const data = await getExpenseData(2, 'detail', 'event');
    const sort = eventSortByDate(data.detail);

    return {
        props: { data, sort },
        revalidate: 60,
    };
}

type EventsProps = NextPage & {
    data: any;
    sort: any;
};

const Events = ({ data, sort }: EventsProps): React.ReactElement => (
    <DetailPage
        title="Detail By Events"
        data={data}
        sort={sort} />
);

export default Events;

