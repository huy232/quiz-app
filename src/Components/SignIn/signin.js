/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalContext } from "../../Context/GlobalContext";
import { withRouter } from "react-router-dom";

class SignIn extends Component {
	static contextType = GlobalContext;
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}

	handleOnChange = (event) => {
		let { name, value } = event.target;

		this.setState({
			[name]: value,
		});
	};

	handleOnSubmit = (event) => {
		event.preventDefault();
		let { username, password } = this.state;
		if (username === "" && password === "") {
			toast.warning(`Please enter all the fields`);
		} else if (username === "") {
			toast.error(`Please enter your username`);
		} else if (password === "") {
			toast.error(`Please enter your password`);
		} else {
			callApi("sign-in", "POST", {
				username: username,
				password: password,
			}).then((res) => {
				if (res.data.token) {
					localStorage.setItem("token", res.data.token);
					this.props.parentCallback(res.data.token);
					toast.success(`Successfully log in.`);
					this.props.history.push("/");
				} else {
					toast.error(`There is something wrong, please try again.`);
				}
			});
		}
	};
	render() {
		// console.log(this.context);
		return (
			<div className="register-page height-fixed">
				<div id="toast"></div>
				<div
					style={{
						background:
							"url('/Demo/assets/images/slider/slider1.jpg'), no-repeat, fixed, center",
						height: "100vh",
					}}
				>
					<div className="register-section vertical-center">
						<h2>Sign in</h2>
						<div className="user-info">
							<form onSubmit={this.handleOnSubmit}>
								<div className="row">
									<div className="username-line">
										<div className="col-25">
											<label htmlFor="username">Username</label>
										</div>
										<div className="col-75">
											<input
												onChange={this.handleOnChange}
												type="text"
												placeholder="Enter username"
												name="username"
												value={this.state.username}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="password-line">
										<div className="col-25">
											<label htmlFor="password">Password</label>
										</div>
										<div className="col-75">
											<input
												onChange={this.handleOnChange}
												type="password"
												placeholder="Enter password"
												name="password"
												value={this.state.password}
											/>
										</div>
									</div>
								</div>

								<div className="user-info-button">
									<Link to="/sign-up">
										<button className="btn btn--success btn--danger">
											Sign up
										</button>
									</Link>

									<button type="submit">Log in</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
SignIn.contextType = GlobalContext;
export default withRouter(SignIn);
