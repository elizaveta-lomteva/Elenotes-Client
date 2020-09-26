import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link, withRouter } from 'react-router-dom';

import ButtonAsLink from './ButtonAsLink';

import logo from '../img/logo.svg';

const IS_LOGGED_IN = gql`
	{
		isLoggedIn @client
	}
`;

const HeaderBar = styled.header`
	width: 100%;
	padding: 0.5em 1em;
	display: flex;
	height: 64px;
	position: fixed;
	align-items: center;
	background-color: #fff;
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
	z-index: 1;
`;

const LogoText = styled.h1`
	margin: 0;
	padding: 0;
	display: inline;
`;

const UserState = styled.div`
	margin-left: auto;
`;

const Header = props => {
	const { data, client } = useQuery(IS_LOGGED_IN);

	return (
		<HeaderBar>
			<img src={logo} alt="Notes logo" height="40" />
			<LogoText>NOtes</LogoText>
			<UserState>
				{data.isLoggedIn ? (
					<ButtonAsLink
						onClick={() => {
							localStorage.removeItem('token');
							// clear the application's cache
							client.resetStore();
							// update local state
							client.writeData({ data: { isLoggedIn: false } });
							// redirect the user to the home page
							props.history.push('/');
						}}
					>
						Logout
					</ButtonAsLink>
				) : (
					<p>
						<Link to={'/signin'}>Sign In</Link> or{' '}
						<Link to={'/signup'}>Sign Up</Link>
					</p>
				)}
			</UserState>
		</HeaderBar>
	);
};

export default withRouter(Header);
