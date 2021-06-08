import { gql } from '@apollo/client';

export const ALL_LISTS = gql`
	query {
		lists {
			id
			name
			description
			icon
			locked
			public
		}
	}
`;

export const GET_LIST = gql`
	query lists($id: String!) {
		lists(id: $id) {
			id
			name
			icon
			locked
			description
			series {
				id
				name
				popularity
				vote_average
				backdrop_path
			}
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

export const DISCOVER_SERIES = gql`
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

export const POPULAR_SERIES = gql`
	query {
		popular {
			id
			name
			popularity
			vote_average
			backdrop_path
		}
	}
`;

export const TOP_RATED_SERIES = gql`
	query {
		topRated {
			id
			name
			popularity
			vote_average
			backdrop_path
		}
	}
`;

export const AIRING_TODAY_SERIES = gql`
	query {
		airingToday {
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

export const GET_SERIE = gql`
	query getSerie($id: String!) {
		getSerie(id: $id) {
			id
			name
			networks {
				name
				logo_path
			}
			backdrop_path
			first_air_date
			genres {
				id
				name
			}
			overview
			popularity
			poster_path
			created_by {
				name
				profile_path
				id
			}
			episode_run_time
			in_production
			last_air_date
			seasons {
				id
				name
				episode_count
				season_number
				overview
			}
			status
			number_of_seasons
			number_of_episodes
			created_by {
				name
				profile_path
			}
			vote_average
			production_companies {
				id
				logo_path
				name
			}
			lists {
				id
				name
			}
		}
	}
`;

export const GET_CAST = gql`
	query getCast($id: String!) {
		getCast(id: $id) {
			adult
			gender
			id
			known_for_department
			name
			original_name
			popularity
			profile_path
			character
		}
	}
`;

export const GET_RECOMENDATIONS = gql`
	query getRecomendations($id: String!) {
		getRecomendations(id: $id) {
			id
			name
			popularity
			vote_average
			backdrop_path
		}
	}
`;
