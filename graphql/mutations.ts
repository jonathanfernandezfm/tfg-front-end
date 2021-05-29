import { gql } from '@apollo/client';

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
			user {
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
	}
`;

export const REGISTER = gql`
	mutation register($username: String!, $email: String!, $password: String!) {
		register(username: $username, email: $email, password: $password) {
			value
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
