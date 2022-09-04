import React from 'react';
import Navigation from '../navigation/Navigation';

export type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps): React.ReactElement => (
    <>
        <Navigation />
        {children}
    </>
);

export default MainLayout;