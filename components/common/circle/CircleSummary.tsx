import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import currencyConvert from '../../../utils/currencyConvert';
import screenResize from '../../../utils/screenResize';

import chevron from '../../../assets/icon/chevron-right-dark.svg';

export type CircleSummaryProps = {
    summaryData: Array<any>;
    month: number;
};

const CircleSummary = ({ summaryData, month }: CircleSummaryProps): React.ReactElement => {
    const screen = screenResize();
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
    summaryData.map((sm: any) => currentCash += sm.profit);

    let summaryStyle = {
        top: summaryCard.top - 15,
        left: summaryCard.align === 'left' ? ((summaryCard.left - 10) - summaryCard.width) : summaryCard.left + 10,
    };

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
                });
                break;
        }
    };

    useEffect(() => {
        setSummaryCard({ ...summaryCard, ...{ width: summaryRef.current?.offsetWidth } });
    }, [ selectedMonth ]);

    return (
        <div className={`circle-summary${currentMonth > 1 ? ` circle-summary--${currentMonth}` : ''}`}>

            {screen > 992 && (
                <>
                    <div className="circle-summary__wrapper">
                        <ul className="list-circle">
                            {summaryData.map((m: any, i: number) => (
                                <Link
                                    key={m.uri}
                                    href={m.url}>
                                    <li>
                                        <input
                                            type="radio"
                                            name="expenses-summary"
                                            id={`expense${m.uri}`}
                                            defaultChecked={i === currentMonth}
                                            value={i}
                                            hidden />
                                        <label
                                            htmlFor={`expense${m.uri}`}
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
                                <td className="text-success">{currencyConvert(summaryData[selectedMonth].income, 'Rp')}</td>
                                <td className="text-danger">{currencyConvert(summaryData[selectedMonth].expense, 'Rp', true)}</td>
                                <td className={`text-${summaryData[selectedMonth].isProfit ? 'success' : 'danger'}`}>{currencyConvert(summaryData[selectedMonth].profit, 'Rp', !summaryData[selectedMonth].isProfit)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <div className="circle-summary__text">
                <p>Current Cash</p>
                <h1 className="mb-0"><small>{currentCash < 0 ? '-' : ''}Rp</small>{currencyConvert(currentCash)}</h1>
            </div>

            {screen <= 992 && (
                <div className="my-3 row justify-content-center">
                    <div className="col-md-8">
                        <ul className="circle-summary__list">
                            {summaryData.map((m: any, i: number) => (
                                <Link
                                    key={'mobile-' + m.uri}
                                    href={m.url}>
                                    <li>
                                        <div className="mb-1 d-flex align-items-center">
                                            <h2 className="mb-0 me-1">{m.month}</h2>
                                            <Image
                                                src={chevron}
                                                alt={m.month}
                                                width={12}
                                                height={22}
                                                layout="fixed" />
                                        </div>
                                        <div className="table-responsive">
                                            <table className="mb-0 table table-sm">
                                                <thead>
                                                <tr>
                                                    <th style={{ width: '33.33%' }} />
                                                    <th style={{ width: '33.33%' }} />
                                                    <th style={{ width: '33.33%' }} />
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td className="text-success">{currencyConvert(summaryData[i].income, 'Rp')}</td>
                                                    <td className="text-danger">{currencyConvert(summaryData[i].expense, 'Rp', true)}</td>
                                                    <td className={`text-${summaryData[i].isProfit ? 'success' : 'danger'}`}>{currencyConvert(summaryData[i].profit, 'Rp', !summaryData[i].isProfit)}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CircleSummary;