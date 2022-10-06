import React from 'react';
import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import DetailPage from '../components/container/detailPage/DetailPage';

export async function getStaticProps() {
    const data = await getExpenseData(2, 'detail', 'non-event');

    return {
        props: { data },
        revalidate: 60,
    };
}

type EventsProps = NextPage & {
    data: any;
};

const Events = ({ data }: EventsProps): React.ReactElement => (
    <DetailPage
        title="Detail For Non-Events"
        data={data} />
);

export default Events;

