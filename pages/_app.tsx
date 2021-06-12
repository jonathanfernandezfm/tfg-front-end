import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import React from 'react';
import { store } from '../store/store';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import AuthController from '../components/AuthController';
import Head from 'next/head';

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('user-token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	};
});

export const link = createHttpLink({
	uri: process.env.API_URL,
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(link as any) as any,
});

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
							{/* <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
							<link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" /> */}
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
