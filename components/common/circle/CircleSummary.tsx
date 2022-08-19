import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export type CircleSummaryProps = {};

const dummy = [
    {
        month: 'January',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'jan-22',
        tooltip: 'top'
    },
    {
        month: 'February',
        income: 200000,
        expense: 100000,
        profit: -100000,
        uri: 'feb-22',
        tooltip: 'top'
    },
    {
        month: 'March',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'mar-22',
        tooltip: 'right'
    },
    {
        month: 'April',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'apr-22',
        tooltip: 'right'
    },
    {
        month: 'May',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'may-22',
        tooltip: 'right'
    },
    {
        month: 'June',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'jun-22',
        tooltip: 'bottom'
    },
    {
        month: 'July',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'jul-22',
        tooltip: 'bottom'
    },
    {
        month: 'August',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'aug-22',
        tooltip: 'bottom'
    },
    {
        month: 'September',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'sep-22',
        tooltip: 'left'
    },
    {
        month: 'October',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'oct-22',
        tooltip: 'left'
    },
    {
        month: 'November',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'nov-22',
        tooltip: 'left'
    },
    {
        month: 'December',
        income: 200000,
        expense: 100000,
        profit: 100000,
        uri: 'dec-22',
        tooltip: 'top'
    },
];

const CircleSummary = ({}: CircleSummaryProps): React.ReactElement => {
    const currentMonth = new Date().getMonth() + 1;
    const [ selectedMonth, setSelectedMonth ] = useState<number>(currentMonth - 1);
    const [ label, setLabel ] = useState<any>({
        isShow: false,
        isHovered: 0
    });
    const [ mousePosition, setMousePosition ] = useState({
        top: 0,
        left: 0
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
                        {dummy[label.isHovered].month}
                    </div>
                )}
                <div className="circle-summary__wrapper">
                    <ul className="list-circle">
                        {dummy.map((m: any, i: number) => (
                            <li key={m.uri}>
                                <input
                                    type="radio"
                                    name="expenses-summary"
                                    id={`expense${m.uri}`}
                                    defaultChecked={i === currentMonth}
                                    onClick={() => setSelectedMonth(i)}
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
                        <small>Rp</small>
                        12,000,000
                    </h1>
                    <div className="mt-3 circle-summary__card">
                        <h3 className="mb-1">{dummy[selectedMonth].month}&apos;s Cash-flow</h3>
                        <div className="row justify-content-center">
                            <div className="col-md-4">
                                <table className="table table-responsive">
                                    <tbody>
                                    <tr>
                                        <th>Income</th>
                                        <td className="text-primary">{dummy[selectedMonth].income}</td>
                                    </tr>
                                    <tr>
                                        <th>Expense</th>
                                        <td className="text-danger">{dummy[selectedMonth].expense}</td>
                                    </tr>
                                    <tr>
                                        <th>Profit</th>
                                        <td className={`text-${dummy[selectedMonth].profit > 0 ? 'primary' : 'danger'}`}>{dummy[selectedMonth].profit}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <Link href={`/monthly/${dummy[selectedMonth].uri}`}>
                            <a className="btn btn-primary">Detail</a>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CircleSummary;