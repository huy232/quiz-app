/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";

export default function Header(props) {
	const [, setToken] = useState(props.tokenMain);

	const onClickToSignOut = (event) => {
		localStorage.removeItem("token");
		setToken(null);
	};

	useEffect(() => {
		setToken(props.tokenMain);
	}, [props.tokenMain]);

	return (
		<div className="header">
			<div className="logo">
				<Link to="/">
					<img src={"/Demo/assets/images/logo.png"} alt="SCC Logo"></img>
				</Link>
			</div>
			<ul id="nav">
				{localStorage.token === undefined ? (
					<li className="hideLink" key="1">
						<Link to="/admin">Admin</Link>
					</li>
				) : (
					[
						jwt_decode(localStorage.token).role_ID === 2 ? (
							<li key="2">
								<Link to="/admin">Admin</Link>
							</li>
						) : (
							<li className="hideLink" key="3">
								<Link to="/admin">Admin</Link>
							</li>
						),
					]
				)}
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
				<li>
					<Link to="/quiz-topics">Quiz Topic</Link>
				</li>
				<li>
					<Link to="/history">Quiz's History</Link>
				</li>
				<li>
					<a href="#">
						<i className="ti-user"></i>
					</a>
					<ul className="subnav">
						{localStorage.getItem("token") == null ? (
							<li>
								<li>
									<Link to="/sign-in">Sign in </Link>
								</li>
								<li>
									<Link to="/sign-up">Sign up</Link>
								</li>
							</li>
						) : (
							<li>
								<li>
									<Link to="/sign-in" onClick={onClickToSignOut}>
										Log out
									</Link>
								</li>
							</li>
						)}
					</ul>
				</li>
			</ul>
			<div id="mobile-menu" className="mobile-menu-btn">
				<i className="menu-icon ti-menu"></i>
			</div>
		</div>
	);
}
