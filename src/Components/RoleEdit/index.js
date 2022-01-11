/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class RoleEdit extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.roleChange = this.roleChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { rolename: "" };

	resetRole = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const role = {
			rolename: this.state.rolename,
		};

		axios
			.put(
				"http://localhost:3000/admin/update-role/" + this.props.role_ID,
				role
			)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Role edit successfully`);
					this.setState(this.initialState);
					this.props.updateRole();
				} else {
					toast.error(`Failed to edit role`);
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
				<form
					className="create-form"
					onSubmit={this.submitForm}
					onReset={this.resetRole}
				>
					<label htmlFor="rolename">Role name:</label>
					<br />
					<input
						type="text"
						id="rolename"
						name="rolename"
						placeholder="Enter your role name"
						value={this.state.rolename}
						onChange={this.roleChange}
					/>
					<br />
					<button type="submit" className="create-button-form">
						Edit role
					</button>
					<button type="reset" className="create-button-form">
						Reset
					</button>
					<br />
				</form>
			</div>
		);
	}
}

export default RoleEdit;
