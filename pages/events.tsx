import React from 'react';
import type { NextPage } from 'next';

export async function getServerSideProps({ query }: any) {
    // const month = query?.month ? query.month : 0;
    // const data = await getExpenseData(1, 'summary');

    return {
        // props: { data, month }
        props: { data: '' }
    };
}

type EventsProps = NextPage & {
    data: Array<any>;
    month: number;
};

const Events = ({ data, month }: EventsProps): React.ReactElement => {
    return (
        <div className="container">
            EVENTS
        </div>
    );
};

export default Events;

