/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class UserEdit extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.roleChange = this.roleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { rolename: "", roleList: [] };

	async componentDidMount() {
		await axios.get("http://localhost:3000/admin/get-role-list").then((res) => {
			this.setState({
				roleList: res.data,
			});
		});
	}

	submitForm = (event) => {
		event.preventDefault();

		const role = {
			role_ID: this.state.rolename,
		};

		axios
			.patch(
				"http://localhost:3000/admin/update-user/" + this.props.user_ID,
				role
			)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Role edit for user successfully`);
					this.props.updateRole();
				} else {
					toast.error(`Failed to edit user role`);
				}
			});
	};

	roleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		return (
			<div className="admin-table">
				<form className="create-form" onSubmit={this.submitForm}>
					<label htmlFor="rolename">Role name:</label>
					<br />
					<select
						name="rolename"
						id="rolename"
						onChange={this.roleChange}
						value={this.state.roleid}
					>
						{this.state.roleList.map((role, i) => (
							<option key={i} value={role.role_ID}>
								{role.rolename}
							</option>
						))}
					</select>
					<br />
					<button type="submit" className="create-button-form">
						Edit user
					</button>
				</form>
			</div>
		);
	}
}

export default UserEdit;
