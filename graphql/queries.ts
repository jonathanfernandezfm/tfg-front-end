import { gql } from '@apollo/client';

export const ALL_LISTS = gql`
	query {
		lists {
			id
			name
			description
			icon
		}
	}
`;

export const ME = gql`
	query {
		me {
			userInfo {
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

export const SERIES = gql`
	query {
		discover {
			id
			name
			popularity
			vote_average
			backdrop_path
		}
	}
`;

export const SEARCH_SERIES = gql`
	query searchSeries($query: String!) {
		searchSeries(query: $query) {
			id
			name
			backdrop_path
			vote_average
			popularity
		}
	}
`;
