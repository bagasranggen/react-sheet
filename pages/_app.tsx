import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import NProgress from 'nprogress'

import '@fontsource/nunito-sans/200.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/900.css';
import 'nprogress/nprogress.css'

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

import MainLayout from '../components/layout/mainLayout/MainLayout';


function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    NProgress.configure({ showSpinner: false })

    useEffect(() => {
        router.events.on('routeChangeStart', () => NProgress.start())
        router.events.on('routeChangeComplete', () => NProgress.done())
        router.events.on('routeChangeError', () => NProgress.done())
    }, [router.events])

    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    );
}

export default MyApp;
