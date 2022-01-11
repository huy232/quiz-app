/* eslint-disable no-unused-expressions */
import { Component } from "react";
import UserManagement from "../UserManagement/index";
import RoleManagement from "../RoleManagement/index";
import QuizManagement from "../QuizManagement/index";
import { Redirect } from "react-router-dom";

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showHideUser: false,
			showHideRole: false,
			showHideQuiz: false,
		};
		this.hideComponent = this.hideComponent.bind(this);
	}

	hideComponent(name) {
		switch (name) {
			case "showHideUser":
				this.setState({
					showHideUser: !this.state.showHideUser,
					showHideRole: false,
					showHideQuiz: false,
				});
				break;
			case "showHideRole":
				this.setState({
					showHideUser: false,
					showHideRole: !this.state.showHideRole,
					showHideQuiz: false,
				});
				break;
			case "showHideQuiz":
				this.setState({
					showHideUser: false,
					showHideRole: false,
					showHideQuiz: !this.state.showHideQuiz,
				});
				break;
			default:
				null;
		}
	}

	render() {
		if (localStorage.getItem("token") == null) {
			return <Redirect to="/" />;
		}
		const { showHideUser, showHideRole, showHideQuiz } = this.state;
		return (
			<div className="admin-section">
				<div className="admin-control col-25">
					<button onClick={() => this.hideComponent("showHideUser")}>
						<label>User management</label>
					</button>
					<button onClick={() => this.hideComponent("showHideRole")}>
						<label>Role management</label>
					</button>
					<button onClick={() => this.hideComponent("showHideQuiz")}>
						<label>Quiz management</label>
					</button>
				</div>
				<div className="admin-modify col-75">
					{showHideUser && <UserManagement />}
					{showHideRole && <RoleManagement />}
					{showHideQuiz && <QuizManagement />}
				</div>
			</div>
		);
	}
}

export default Admin;
