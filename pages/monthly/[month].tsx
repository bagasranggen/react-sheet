import React from 'react';

import type { NextPage } from 'next';

import getExpenseData from '../../libs/expense';

import DetailPage from '../../components/container/detailPage/DetailPage';

export async function getServerSideProps({ params }: any) {
    const page = params.month;

    const config = await getExpenseData(0, 'config');
    const data = await getExpenseData(config[ page ].id, 'detail');

    return {
        props: {
            data: data ? data : [],
            month: config[ page ].label
        }
    };
}

type MonthProps = NextPage & {
    data: any;
    month: string;
}

const Month = ({ data, month }: MonthProps): React.ReactElement => (
    <DetailPage title={month} data={data} />
);

export default Month;

