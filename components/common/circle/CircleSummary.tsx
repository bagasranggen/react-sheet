import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import currencyToInt from '../../../utils/currencyToInt';
import currencyConvert from '../../../utils/currencyConvert';

export type CircleSummaryProps = {
    summaryData: Array<any>;
    month: number;
};

const CircleSummary = ({ summaryData, month }: CircleSummaryProps): React.ReactElement => {
    const router = useRouter();

    const currentMonth = new Date().getMonth() + 1;
    const [ selectedMonth, setSelectedMonth ] = useState<number>(month ? month : currentMonth - 1);
    const [ label, setLabel ] = useState<any>({
        isShow: false,
        isHovered: 0
    });
    const [ mousePosition, setMousePosition ] = useState({
        top: 0,
        left: 0
    });

    let currentCash: number = 0;
    summaryData.map((sm: any) => {
        currentCash += currencyToInt(sm.profit);
    });

    const mouseMoveHandler = (e: any) => {
        setMousePosition({
            top: e.clientY,
            left: e.clientX
        });
    };

    useEffect(() => {
        // if (!isActive) {
        //     setAnimating(false);
        //     return;
        // }

        // setTimeout(() => setAnimating(true), 100);

        window.addEventListener('mousemove', mouseMoveHandler);
        return () => window.removeEventListener('mousemove', mouseMoveHandler);
    }, []);

    return (
        <>
            <div className={`circle-summary${currentMonth > 1 ? ` circle-summary--${currentMonth}` : ''}`}>
                {label.isShow && (
                    <div
                        className="circle-summary__label"
                        style={{ top: mousePosition.top - 35, left: mousePosition.left + 10 }}>
                        {summaryData[label.isHovered].month}
                    </div>
                )}
                <div className="circle-summary__wrapper">
                    <ul className="list-circle">
                        {summaryData.map((m: any, i: number) => (
                            <li key={m.uri}>
                                <input
                                    type="radio"
                                    name="expenses-summary"
                                    id={`expense${m.uri}`}
                                    defaultChecked={i === currentMonth}
                                    onClick={() => {
                                        setSelectedMonth(i);
                                        router.replace({ query: { month: i } }, '', { shallow: true });
                                    }}
                                    value={i}
                                    hidden />
                                <label
                                    htmlFor={`expense${m.uri}`}
                                    onMouseEnter={() => setLabel({ isShow: true, isHovered: i })}
                                    onMouseLeave={() => setLabel({ isShow: false, isHovered: 0 })} />
                            </li>
                        ))}
                        <div className="circle-summary__progress">
                            <div className="circle-summary__half circle-summary__half--left" />
                            <div className="circle-summary__half circle-summary__half--right" />
                        </div>
                    </ul>
                </div>
                <div className="mt-5 circle-summary__text">
                    <p>Current Cash</p>
                    <h1>
                        <small>{currentCash < 0 ? '-' : ''}Rp</small>{currencyConvert(currentCash)}
                    </h1>
                    <div className="mt-3 circle-summary__card">
                        <h3 className="mb-1">{summaryData[selectedMonth].month}&apos;s Cash-flow</h3>
                        <div className="row justify-content-center">
                            <div className={`col-md-${summaryData[selectedMonth].income !== 'Rp0' || summaryData[selectedMonth].expense !== 'Rp0' || summaryData[selectedMonth].profit !== 'Rp0' ? 'auto' : '4'}`}>
                                <table className="table table-responsive">
                                    <tbody>
                                    <tr>
                                        <th>Income</th>
                                        <td className="text-primary">{summaryData[selectedMonth].income}</td>
                                    </tr>
                                    <tr>
                                        <th>Expense</th>
                                        <td className="text-danger">{summaryData[selectedMonth].expense}</td>
                                    </tr>
                                    <tr>
                                        <th>Profit</th>
                                        <td className={`text-${currencyToInt(summaryData[selectedMonth].profit) >= 0 ? 'primary' : 'danger'}`}>{summaryData[selectedMonth].profit}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Link href={summaryData[selectedMonth].url}>
                            <a className="btn btn-primary">Detail</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CircleSummary;