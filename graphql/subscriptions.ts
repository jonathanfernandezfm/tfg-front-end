import { gql } from '@apollo/client';

export const NEW_MESSAGE = gql`
	subscription onNewMessage {
		newMessage {
			id
			message
			type
			to {
				id
			}
			from {
				id
			}
			date
			read
			sent
		}
	}
`;
