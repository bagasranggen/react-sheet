import React from 'react';
import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import HeaderTitle from '../components/layout/header/headetTitle/HeaderTitle';
import CircleSummary from '../components/common/circle/CircleSummary';

export async function getStaticProps() {
    const data = await getExpenseData(1, 'summary');

    return {
        props: { data },
        revalidate: 60,
    };
}

type HomeProps = NextPage & {
    data: Array<any>;
};

const Home = ({ data }: HomeProps): React.ReactElement => {
    return (
        <>
            <HeaderTitle
                title={`${process.env.WEB_NAME} Fee Report`}
                homepage />

            <div className="container container--full-vh">
                <CircleSummary summaryData={data} />
            </div>
        </>
    );
};

export default Home;

