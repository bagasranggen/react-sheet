import React from 'react';
import type { NextPage } from 'next';

import getExpenseData from '../../libs/expense';

import DetailPage from '../../components/container/detailPage/DetailPage';

export async function getStaticProps(context: any) {
    const { month } = context.params;

    const config = await getExpenseData(0, 'config');
    const data = await getExpenseData(config[month].id, 'detail');

    return {
        props: {
            data: data ? data : [],
            month: config[month].label,
        },
        revalidate: 60,
    };
}

export async function getStaticPaths() {
    const config = await getExpenseData(0, 'config');

    // Get the paths we want to pre-render based on month
    const paths = Object.keys(config).map((key: any) => `/monthly/${key}`);

    // We'll pre-render only these paths at build time.
    // { fallback: blocking } will server-render pages
    // on-demand if the path doesn't exist.
    return { paths, fallback: 'blocking' };
}

type MonthProps = NextPage & {
    data: any;
    month: string;
}

const Month = ({ data, month }: MonthProps): React.ReactElement => {
    return (
        <DetailPage
            title={month}
            data={data} />
    );
};

export default Month;

