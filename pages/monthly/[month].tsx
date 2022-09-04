import React from 'react';

import type { NextPage } from 'next';

import getExpenseData from '../../libs/expense';
import { Accordion } from 'react-bootstrap';
import currencyConvert from '../../utils/currencyConvert';

export async function getServerSideProps({ params }: any) {
    const page = params.month;

    const config = await getExpenseData(0, 'config');
    const data = await getExpenseData(config[page].id, 'detail');

    return {
        props: {
            data: data ? data : [],
            month: config[page].label
        }
    };
}

type MonthProps = NextPage & {
    data: any;
    month: string;
}

const Month = ({ data, month }: MonthProps): React.ReactElement => {
    console.log(data.total);

    return (
        <div className="my-5 container">

            <div className="row align-items-center">
                <div className="col-md-4">
                    <h1>{month.toUpperCase()}</h1>
                </div>
                <div className="col-md-8 text-end">
                    {data.total?.income && currencyConvert(data.total.income)}
                    {(data.total?.income && data.total?.expense) && <>&nbsp;|&nbsp;</>}
                    {data.total?.expense && currencyConvert(data.total.expense)}
                </div>
            </div>

            {data?.detail && (
                <Accordion className="mt-3">
                    {Object?.keys(data.detail).map((key: any) => (
                        <Accordion.Item
                            key={key}
                            eventKey={key}>
                            <Accordion.Header>{data.detail[key][0].title}</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {data.detail[key].map((detail: any) => (
                                        <li key={key + detail.description}>{detail.description} | {detail.date} | {detail.cashFlow}</li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </div>
    );
};

export default Month;

