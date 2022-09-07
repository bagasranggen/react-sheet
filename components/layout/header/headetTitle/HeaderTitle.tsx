import React from 'react';
import Head from 'next/head';

export type HeaderTitleProps = {
    title: string;
    homepage?: boolean;
};

const HeaderTitle = ({ title, homepage }: HeaderTitleProps): React.ReactElement => (
    <Head>
        <title>{title}{!homepage ? ` | ${process.env.WEB_NAME} Fee Report` : ''}</title>
    </Head>
);

export default HeaderTitle;