import type { AppProps } from 'next/app';

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
