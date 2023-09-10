import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/router";

import currencyConvert from '../../../libs/utils/currencyConvert';
import screenResize from '../../../libs/utils/screenResize';

import chevron from '../../../assets/icon/chevron-right-dark.svg';
import Input from "../input/Input";
import { OptionItemProps } from "../input/inputSelect/InputSelect";

export type CircleSummaryProps = {
    summaryData: any;
    year: string;
    yearList: OptionItemProps[];
};

const CircleSummary = ({ summaryData, year, yearList }: CircleSummaryProps): React.ReactElement => {
    const screen = screenResize();
    const router = useRouter();
    const currentMonth = new Date().getMonth() + 1;
    const summaryRef = useRef<HTMLDivElement>(null);
    const [ currentYear, setCurrentYear ] = useState<string>(year);
    const [ selectedMonth, setSelectedMonth ] = useState<number>(0);
    const [ summaryCard, setSummaryCard ] = useState<any>({
        isShow: false,
        isHovered: 0,
        label: '',
        width: 0,
        top: 0,
        left: 0,
    });

    const summary = summaryData[currentYear as keyof Object];

    let currentCash: number = 0;
    summary.map((sm: any) => currentCash += sm.profit);

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

    const yearSelectorHandler = (e: any) => {
        setCurrentYear(e.target.value);
        router.push({
            query: { year: e.target.value },
        }, undefined, { shallow: true });
    };

    useEffect(() => {
        setCurrentYear(year);
    }, [ year ]);

    useEffect(() => {
        setSummaryCard({ ...summaryCard, ...{ width: summaryRef.current?.offsetWidth } });
    }, [ selectedMonth ]);

    return (
        <div className={`circle-summary${currentMonth > 1 ? ` circle-summary--${currentYear === yearList.at(-1)?.value ? currentMonth - 1 : 12}` : ''}`}>

            {screen > 992 && (
                <>
                    <div className="circle-summary__wrapper">
                        <ul className="list-circle">
                            {summary.map((m: any, i: number) => (
                                <Link
                                    key={m.uri}
                                    href={m.url}>
                                    <li>
                                        <input
                                            type="radio"
                                            name="expenses-summary"
                                            id={`expense${m.uri}`}
                                            {...currentYear === yearList.at(-1)?.value && { defaultChecked: i === (currentMonth - 1) }}
                                            // defaultChecked={i === (currentMonth - 1)}
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
                                <td className="text-success">{currencyConvert(summary[selectedMonth].income, 'Rp')}</td>
                                <td className="text-danger">{currencyConvert(summary[selectedMonth].expense, 'Rp', true)}</td>
                                <td className={`text-${summary[selectedMonth].isProfit ? 'success' : 'danger'}`}>{currencyConvert(summary[selectedMonth].profit, 'Rp', !summary[selectedMonth].isProfit)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            <div className="circle-summary__text">
                <Input
                    type="select"
                    className="mb-1"
                    value={year}
                    options={yearList}
                    events={{
                        onChange: yearSelectorHandler,
                    }} />
                <p>Current Cash</p>
                <h1 className="mb-0"><small>{currentCash < 0 ? '-' : ''}Rp</small>{currencyConvert(currentCash)}</h1>
            </div>

            {screen <= 992 && (
                <div className="my-3 row justify-content-center">
                    <div className="col-md-8">
                        <ul className="circle-summary__list">
                            {summary.map((m: any) => {
                                if (m.income === 0 && m.expense === 0) return;
                                return (
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
                                                        <td className="text-success">{currencyConvert(m.income, 'Rp')}</td>
                                                        <td className="text-danger">{currencyConvert(m.expense, 'Rp', true)}</td>
                                                        <td className={`text-${m.isProfit ? 'success' : 'danger'}`}>{currencyConvert(m.profit, 'Rp', !m.isProfit)}</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </li>
                                    </Link>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CircleSummary;