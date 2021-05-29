import { gql } from '@apollo/client';

export const ALL_LISTS = gql`
	query {
		lists{
			id
			name
			description
			icon
		}
	}
`;

export const ME = gql`
	query {
		me{
			userInfo{
				name
				surname
				username
				email
				birthDate
				gender
				city
			}
		}
	}
`;