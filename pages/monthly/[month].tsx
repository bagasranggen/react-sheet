import React from 'react';

import type { NextPage } from 'next';

import getExpenseData from '../../libs/expense';
import { Accordion } from 'react-bootstrap';

export async function getServerSideProps() {
    const data = await getExpenseData(2, 'detail');

    return {
        props: { data }
    };
}

type MonthProps = NextPage & {
    data: any;
}

const Month = ({ data }: MonthProps): React.ReactElement => {
    return (
        <div className="container">

            <Accordion>
                {Object.keys(data).map((key: any) => (
                    <Accordion.Item eventKey={key}>
                        <Accordion.Header>{data[key][0].title}</Accordion.Header>
                        <Accordion.Body>
                            <ul>
                                {data[key].map((detail: any) => (
                                    <li key={key + detail.date}>{detail.description} | {detail.date} | {detail.cashFlow}</li>
                                ))}
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default Month;

