import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import type { NextPage } from 'next';

import getExpenseData from '../libs/expense';

import HeaderTitle from '../components/layout/header/headetTitle/HeaderTitle';
import CircleSummary from '../components/common/circle/CircleSummary';

export async function getStaticProps() {
    const data = await getExpenseData(1, 'summary');
    const year = {
        current: new Date().getFullYear(),
        list: Object.keys(data).map((key: string) => ({
            value: key,
            label: key,
        })),
    };

    return {
        props: { data, year },
        revalidate: 60,
    };
}

type HomeProps = NextPage & {
    data: Array<any>;
    year: any;
};

const Home = ({ data, year }: HomeProps): React.ReactElement => {
    const { query } = useRouter();
    const [ y, setY ] = useState(query?.year ?? year.current.toString());

    useEffect(() => {
        if (!query.year) return;
        setY(query.year);
    }, [ query ]);

    return (
        <>
            <HeaderTitle
                title={`${process.env.WEB_NAME} Fee Report`}
                homepage />

            <div className="container container--full-vh">
                <CircleSummary
                    summaryData={data}
                    year={y}
                    yearList={year.list} />
            </div>
        </>
    );
};

export default Home;

