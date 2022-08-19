import React from 'react';

import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import CircleSummary from '../components/common/circle/CircleSummary';

export async function getStaticProps() {
    const data = await getExpenseData();

    return {
        props: { data }
    };
}

type HomeProps = NextPage & {
    data: Array<any>;
}

const Home = ({ data }: HomeProps): React.ReactElement => {
    return (
        <div className="container container--full-vh">
            <CircleSummary />
        </div>
    );
};

export default Home;

