import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
			user {
				id
				followersCount
				followsCount
				userInfo {
					name
					surname
					username
					email
					birthDate
					gender
					public
					city
				}
			}
		}
	}
`;

export const REGISTER = gql`
	mutation register($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			value
		}
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser(
		$name: String
		$surname: String
		$birthDate: String
		$gender: String
		$city: String
		$public: Boolean
	) {
		updateUser(
			name: $name
			surname: $surname
			birthDate: $birthDate
			gender: $gender
			city: $city
			public: $public
		) {
			name
			surname
			username
			email
			birthDate
			gender
			public
			city
		}
	}
`;

export const CREATE_LIST = gql`
	mutation createList($name: String!, $description: String, $icon: String) {
		addList(name: $name, description: $description, icon: $icon) {
			id
			name
		}
	}
`;

export const UPDATE_LIST = gql`
	mutation updateList($id: ID!, $name: String, $public: Boolean, $description: String, $icon: String) {
		updateList(id: $id, name: $name, description: $description, public: $public, icon: $icon) {
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
		}
	}
`;

export const REMOVE_LIST = gql`
	mutation removeList($id: ID!) {
		deleteList(id: $id)
	}
`;

export const ADD_SERIE_TO_LIST = gql`
	mutation addSerie($id: ID!, $series: [String]!) {
		addSeriesToList(id: $id, serieIds: $series) {
			id
		}
	}
`;

export const REMOVE_SERIE_TO_LIST = gql`
	mutation removeSerie($id: ID!, $series: [String]!) {
		removeSeriesFromList(id: $id, serieIds: $series) {
			id
		}
	}
`;
