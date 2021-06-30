import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('user-token');
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : null,
		},
	};
});

const httpLink = createHttpLink({
	uri: process.env.API_URL,
});

const wsLink = process.browser
	? new WebSocketLink({
			uri: process.env.WS_URL,
			options: {
				reconnect: true,
				lazy: true,
				connectionParams: () => ({
					Authorization: `Bearer ${localStorage.getItem('user-token')}`,
				}),
			},
	  })
	: null;

const splitLink = process.browser
	? split(
			({ query }) => {
				const definition = getMainDefinition(query);
				return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
			},
			wsLink,
			httpLink
	  )
	: httpLink;

const client = new ApolloClient({
	link: authLink.concat(splitLink as any) as any,
	cache: new InMemoryCache(),
});

export default client;
