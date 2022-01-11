import React, { Component } from "react";
import { Link } from "react-router-dom";
import callApi from "../../utils/apiCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			repassword: "",
		};
	}

	handleOnChange = (event) => {
		let { name, value } = event.target;

		this.setState({
			[name]: value,
		});
		// console.log(this.state)
	};

	handleOnSubmit = (event) => {
		event.preventDefault();
		let { username, password, repassword } = this.state;
		if (username === "" && password === "" && repassword === "") {
			toast.warning(`Please fill all the fields`);
		} else if (username === "") {
			toast.error(`Please enter your username`);
		} else if (password === "") {
			toast.error(`Please enter your password`);
		} else if (repassword === "") {
			toast.warning(`Please enter your repassword`);
		} else if (
			password !== repassword &&
			password !== "" &&
			repassword !== ""
		) {
			toast.warning(`Please matching your password with repassword`);
		} else {
			callApi("sign-up", "POST", {
				username: username,
				password: password,
			}).then((res) => {
				toast.success(`Successfully sign up`);
			});
		}
	};
	render() {
		return (
			<div className="register-page height-fixed">
				<div id="toast"></div>
				<div
					style={{
						background:
							"url('/Demo/assets/images/slider/slider1.jpg') no-repeat fixed center",
						height: "100vh",
					}}
				>
					{/* <!-- className="center-fit img" alt="slider1"/> --> */}
					<div className="register-section vertical-center">
						<h2>Sign up</h2>
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
												id="username"
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
												id="password"
												value={this.state.password}
											/>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="password-line">
										<div className="col-25">
											<label htmlFor="password">Re-enter your password</label>
										</div>
										<div className="col-75">
											<input
												onChange={this.handleOnChange}
												type="password"
												placeholder="Re-enter password"
												name="repassword"
												value={this.state.repassword}
											/>
										</div>
									</div>
								</div>

								<div className="user-info-button">
									<Link to="/">
										<button>Go back to Home page</button>
									</Link>

									<button
										type="submit"
										id="signup-button"
										className="btn btn--success btn--danger"
									>
										Sign Up
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default SignUp;
