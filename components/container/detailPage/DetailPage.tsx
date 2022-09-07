import React, { useState } from 'react';

import screenResize from '../../../utils/screenResize';
import currencyConvert from '../../../utils/currencyConvert';

import HeaderTitle from '../../layout/header/headetTitle/HeaderTitle';
import { Accordion } from 'react-bootstrap';

type DetailPageProps = {
    title: string;
    data: any;
}

const DetailPage = ({ title, data }: DetailPageProps): React.ReactElement => {
    const screen = screenResize();
    const [ isOpened, setIsOpened ] = useState<string>('');

    const accordionClickHandler = (key: string) => key === isOpened ? setIsOpened('') : setIsOpened(key);

    return (
        <>
            <HeaderTitle title={title} />

            <div className="my-1 my-lg-5 container">

                <div className="row align-items-center">
                    <div className="col-md">
                        <h1 className="mb-0">{title}</h1>
                    </div>
                    <div className="col-md-auto text-md-end">
                        {(data.total?.income && data.total?.expense) ? (
                            <h3 className={`mb-0 fw-normal fs-${screen < 992 ? '4' : '3'}`}>
                                <span className="text-success">{currencyConvert(data.total.income, 'Rp')}</span>
                                <>&nbsp;|&nbsp;</>
                                <span className="text-danger">{currencyConvert(data.total.expense, 'Rp', true)}</span>
                            </h3>
                        ) : null}
                    </div>
                </div>

                {data?.detail ? (
                    <Accordion className={`my-2${isOpened !== '' ? ' accordion--is-focus' : ''}`}>
                        {Object?.keys(data.detail).map((key: any) => {
                            let summary = { income: 0, expense: 0 };

                            data.detail[key].map((detail: any) => {
                                detail.type === 'income' ? summary.income += detail.cashFlow : summary.expense += detail.cashFlow;
                            });

                            return (
                                <Accordion.Item
                                    key={key}
                                    eventKey={key}
                                    onClick={() => accordionClickHandler(key)}
                                    className={isOpened === key ? 'accordion-item--is-focus' : ''}>
                                    <Accordion.Header>
                                        <div className="row justify-content-between align-items-center gy-1 gy-md-0 w-100">
                                            <div className="col-md"><h4>{data.detail[key][0].title}</h4></div>
                                            <div className="col-md-auto">
                                                <span className="text-success">{currencyConvert(summary.income, 'Rp')}</span> | <span className="text-danger">{currencyConvert(summary.expense, 'Rp', true)}</span>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <table className="mb-0 table table-borderless table-striped">
                                            <thead>
                                            <tr>
                                                <th style={{ width: '10%' }} />
                                                <th />
                                                <th style={{ width: '15%' }} />
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data.detail[key].map((detail: any) => (
                                                <tr key={key + detail.description}>
                                                    <td>{detail.date}</td>
                                                    <td>{detail.description}</td>
                                                    <td className={`text-end${detail.type === 'income' ? ' text-success' : ' text-danger'}`}>{currencyConvert(detail.cashFlow, 'Rp', detail.type !== 'income')}</td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        })}
                    </Accordion>
                ) : (
                    <h2 className="my-3 text-center">No data found</h2>
                )}
            </div>
        </>
    );
};

export default DetailPage;

