import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../store/store';
import { ApolloProvider } from '@apollo/client';
import AuthController from '../components/AuthController';
import Head from 'next/head';
import client from '../apollo-client';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<AuthController>
					<Layout>
						<Head>
							<meta charSet="utf-8" />
							<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
							<meta
								name="viewport"
								content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
							/>
							<meta name="description" content="Description" />
							<meta name="keywords" content="Keywords" />
							<title>TFG</title>

							<link rel="manifest" href="/manifest.json" />
							<link rel="apple-touch-icon" href="/apple-icon.png"></link>
							<meta name="theme-color" content="#a78bfa" />
						</Head>
						<Component {...pageProps} />
					</Layout>
				</AuthController>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
