import type { AppProps } from 'next/app';

import '@fontsource/nunito-sans/200.css';
import '@fontsource/nunito-sans/400.css';
import '@fontsource/nunito-sans/700.css';
import '@fontsource/nunito-sans/900.css';

import '../styles/scss/bootstrap.scss';
import '../styles/scss/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
