import React from 'react';
import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import DetailPage from '../components/container/detailPage/DetailPage';

export async function getServerSideProps() {
    const data = await getExpenseData(2, 'detail');

    return {
        props: { data }
    };
}

type EventsProps = NextPage & {
    data: Array<any>;
};

const Events = ({ data }: EventsProps): React.ReactElement => (
    <DetailPage title='Detail by Events' data={data} />
);

export default Events;

