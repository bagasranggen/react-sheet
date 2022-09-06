import React from 'react';

import currencyConvert from '../../../utils/currencyConvert';

import { Accordion } from 'react-bootstrap';

type DetailPageProps = {
    title: string;
    data: any;
}

const DetailPage = ({ title, data }: DetailPageProps): React.ReactElement => (
    <div className="my-5 container">

        <div className="row align-items-center">
            <div className="col-md-4">
                <h1>{title.toUpperCase()}</h1>
            </div>
            <div className="col-md-8 text-md-end">
                {data.total?.income && currencyConvert(data.total.income, 'Rp')}
                {(data.total?.income && data.total?.expense) && <>&nbsp;|&nbsp;</>}
                {data.total?.expense && currencyConvert(data.total.expense, 'Rp', true)}
            </div>
        </div>

        {data?.detail && (
            <Accordion className="mt-3">
                {Object?.keys(data.detail).map((key: any) => {
                    let summary = {
                        income: 0,
                        expense: 0
                    };

                    data.detail[ key ].map((detail: any) => {
                        if (detail.description.toLowerCase() === 'fee') {
                            summary.income += detail.cashFlow;
                        } else {
                            summary.expense += detail.cashFlow;
                        }
                    })

                    return (
                        <Accordion.Item
                            key={key}
                            eventKey={key}>
                            <Accordion.Header>
                                <div className="row justify-content-between gy-1 gy-md-0 w-100">
                                    <div className="col-md">{data.detail[ key ][ 0 ].title}</div>
                                    <div className="col-md-auto">{currencyConvert(summary.income, 'Rp')} | {currencyConvert(summary.expense, 'Rp', true)}</div>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {data.detail[ key ].map((detail: any) => (
                                        <li key={key + detail.description}>{detail.description} | {detail.date} | {currencyConvert(detail.cashFlow, 'Rp', detail.description.toLowerCase() !== 'fee')}</li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )
                })}
            </Accordion>
        )}
    </div>
)

export default DetailPage;

