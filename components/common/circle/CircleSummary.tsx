import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import currencyToInt from '../../../utils/currencyToInt';
import currencyConvert from '../../../utils/currencyConvert';

export type CircleSummaryProps = {
    summaryData: Array<any>;
    month: number;
};

const CircleSummary = ({ summaryData, month }: CircleSummaryProps): React.ReactElement => {
    const currentMonth = new Date().getMonth() + 1;
    const summaryRef = useRef<HTMLDivElement>(null);
    const [ selectedMonth, setSelectedMonth ] = useState<number>(month ? month : currentMonth - 1);
    const [ summaryCard, setSummaryCard ] = useState<any>({
        isShow: false,
        isHovered: 0,
        label: '',
        width: 0,
        top: 0,
        left: 0,
    });

    let currentCash: number = 0;
    summaryData.map((sm: any) => currentCash += currencyToInt(sm.profit));

    let summaryStyle = {
        top: summaryCard.top - 15,
        left: summaryCard.align === 'left' ? ((summaryCard.left - 10) - summaryCard.width) : summaryCard.left + 10,
    }

    const summaryPositionHandler = (type: 'enter' | 'leave', align: 'left' | 'right', month: number, label: string, e?: any) => {
        setSelectedMonth(month);
        switch (type) {
            case 'enter':
                setSummaryCard({
                    ...summaryCard,
                    ...{
                        isShow: true,
                        align,
                        label,
                        left: e.clientX,
                        top: e.clientY,
                    }
                });
                break;

            case 'leave':
                setSummaryCard({
                    ...summaryCard,
                    ...{
                        isShow: false,
                        align,
                        label,
                    }
                })
                break;
        }
    }

    useEffect(() => {
        setSummaryCard({ ...summaryCard, ...{ width: summaryRef.current?.offsetWidth } });
    }, [ selectedMonth ])

    return (
        <div className={`circle-summary${currentMonth > 1 ? ` circle-summary--${currentMonth}` : ''}`}>

            <div className="circle-summary__wrapper">
                <ul className="list-circle">
                    {summaryData.map((m: any, i: number) => (
                        <Link key={m.uri} href={m.url}>
                            <li >
                                <input
                                    type="radio"
                                    name="expenses-summary"
                                    id={`expense${m.uri}`}
                                    defaultChecked={i === currentMonth}
                                    value={i}
                                    hidden />
                                <label htmlFor={`expense${m.uri}`}
                                    onMouseEnter={(e: any) => summaryPositionHandler('enter', m.align, i, m.month, e)}
                                    onMouseLeave={() => summaryPositionHandler('leave', m.align, i, m.month)} />
                            </li>
                        </Link>
                    ))}
                    <div className="circle-summary__progress">
                        <div className="circle-summary__half circle-summary__half--left" />
                        <div className="circle-summary__half circle-summary__half--right" />
                    </div>
                </ul>
            </div>

            <div
                ref={summaryRef}
                className={`circle-summary__card${summaryCard.isShow ? ' circle-summary__card--show' : ''}`}
                style={summaryStyle}>
                <h3 className="mb-1">{summaryCard.label}&apos;s Cash-flow</h3>
                <table className="table table-responsive">
                    <tbody>
                        <tr>
                            <td className="text-primary">{summaryData[ selectedMonth ].income}</td>
                            <td className="text-danger">{summaryData[ selectedMonth ].expense}</td>
                            <td className={`text-${currencyToInt(summaryData[ selectedMonth ].profit) >= 0 ? 'primary' : 'danger'}`}>{summaryData[ selectedMonth ].profit}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="circle-summary__text">
                <p>Current Cash</p>
                <h1><small>{currentCash < 0 ? '-' : ''}Rp</small>{currencyConvert(currentCash)}</h1>
            </div>

        </div>
    );
};

export default CircleSummary;