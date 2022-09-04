import React from 'react';

import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import CircleSummary from '../components/common/circle/CircleSummary';

export async function getServerSideProps({ query }: any) {
    const month = query?.month ? query.month : 0;
    const data = await getExpenseData(1, 'summary');

    return {
        props: { data, month }
    };
}

type HomeProps = NextPage & {
    data: Array<any>;
    month: number;
};

const Home = ({ data, month }: HomeProps): React.ReactElement => {
    return (
        <div className="container container--full-vh">
            <CircleSummary
                summaryData={data}
                month={month} />
        </div>
    );
};

export default Home;

