import '../styles/globals.css';

import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { Provider, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { store } from '../store/store';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache, useQuery } from '@apollo/client';
import { setContext } from 'apollo-link-context';

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
	uri: 'http://localhost:4000',
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(link as any) as any,
});

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ApolloProvider client={client}>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</ApolloProvider>
	);
};

export default App;
