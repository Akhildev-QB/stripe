import NavigationBarComponent from '@/components/navigation-bar';
import '@/styles/globals.css';
import '@/styles/index.scss';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Akzcart</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <NavigationBarComponent />
      <Component {...pageProps} />
    </>
  );
}
