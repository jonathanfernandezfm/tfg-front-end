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
			public
			description
			series {
				id
				name
				popularity
				vote_average
				backdrop_path
			}
			user {
				id
				userInfo {
					username
					img
				}
			}
		}
	}
`;

export const ME = gql`
	query {
		me {
			id
			followsCount
			followersCount
			userInfo {
				name
				surname
				username
				email
				birthDate
				gender
				public
				city
				img
			}
		}
	}
`;

export const GET_USER = gql`
	query getUser($id: ID!) {
		getUser(id: $id) {
			id
			followersCount
			followsCount
			isFollowed
			platforms {
				name
				logo_path
			}
			lists {
				id
				icon
				name
				series {
					name
					vote_average
				}
			}
			userInfo {
				name
				id
				surname
				username
				gender
				birthDate
				city
				img
			}
		}
	}
`;

export const GET_FOLLOWERS = gql`
	query getFollowers($id: ID) {
		getFollowers(id: $id) {
			id
			followersCount
			followsCount
			userInfo {
				name
				id
				surname
				username
				gender
				birthDate
				city
				img
			}
		}
	}
`;

export const GET_FOLLOWS = gql`
	query getFollows($id: ID) {
		getFollows(id: $id) {
			id
			followersCount
			followsCount
			userInfo {
				name
				id
				surname
				username
				gender
				birthDate
				city
				img
			}
		}
	}
`;

export const GET_PERSON_SERIES = gql`
	query getPersonSeries($id: ID!) {
		getPersonSeries(id: $id) {
			id
			backdrop_path
			name
			vote_average
		}
	}
`;

export const GET_PERSON = gql`
	query getPersonDetails($id: ID!) {
		getPersonDetails(id: $id) {
			id
			gender
			known_for_department
			also_known_as
			biography
			popularity
			place_of_birth
			profile_path
			imdb_id
			homepage
			name
			deathday
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

export const DISCOVER_GENRE = gql`
	query discover($genres: [String!]!) {
		discover(genres: $genres) {
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

export const GET_RATING = gql`
	query ratings($serie: String!) {
		ratings(serie: $serie) {
			id
			rating
			date
			serie
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

export const SEARCH_USERS = gql`
	query searchusers($query: String!) {
		searchUsers(query: $query) {
			id
			followersCount
			followsCount
			isFollowed
			platforms {
				name
				logo_path
			}
			lists {
				id
				icon
				name
				series {
					name
					vote_average
				}
			}
			userInfo {
				name
				id
				surname
				username
				gender
				birthDate
				city
				img
			}
		}
	}
`;

export const GET_COMMENTS = gql`
	query comments($serie: String!) {
		comments(serie: $serie) {
			id
			message
			spoiler
			date
			user {
				userInfo {
					name
					username
					surname
					img
				}
			}
		}
	}
`;

export const GET_CONVERSATION_MESSAGES = gql`
	query conversation($user: ID!) {
		conversation(user: $user) {
			user1 {
				id
			}
			user2 {
				id
			}
			messages {
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
	}
`;
export const GET_CONVERSATIONS = gql`
	query conversations {
		conversations {
			user1 {
				id
				userInfo {
					id
					username
					img
				}
			}
			user2 {
				id
				userInfo {
					id
					username
					img
				}
			}
		}
	}
`;
