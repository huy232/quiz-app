/* eslint-disable no-restricted-globals */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserEdit from "../UserEdit";
class UserManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userList: [],
			showHideEdit: false,
		};
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	async componentDidMount() {
		await axios.get("http://localhost:3000/admin/get-list-user").then((res) => {
			this.setState({
				userList: res.data,
			});
		});
	}

	updateRole = () => {
		axios.get("http://localhost:3000/admin/get-list-user").then((res) => {
			this.setState({
				userList: res.data,
			});
		});
	};

	deleteUser = (userID) => {
		let r = confirm(
			"Press OK to confirm deleting an user, No to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/admin/delete-user/" + userID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`User deleted successfully`);
						this.setState({
							userList: this.state.userList.filter(
								(element) => element.user_ID !== userID
							),
						});
					} else {
						toast.error(`Failed to delete user`);
					}
				});
		}
	};
	toggleEdit(i) {
		if (this.state.showHideEdit === i) {
			this.setState({ showHideEdit: null });
		} else {
			this.setState({ showHideEdit: i });
		}
	}
	render() {
		const { showHideEdit } = this.state;
		return (
			<div className="admin-table">
				<table>
					<thead>
						<tr>
							<th>User ID</th>
							<th>Username</th>
							<th>Role</th>
							<th>Action</th>
						</tr>
					</thead>

					{this.state.userList.map((element, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{element.user_ID}</td>
									<td>{element.username}</td>
									<td>{element.rolename}</td>
									<td className="admin-button">
										<button
											className="admin-delete-button"
											onClick={this.deleteUser.bind(this, element.user_ID)}
										>
											Delete
										</button>
										<button
											className="admin-config-button"
											onClick={() => this.toggleEdit(i)}
											value={element.user_ID}
										>
											Edit
										</button>
										{showHideEdit === i && (
											<UserEdit
												id={element.key}
												updateRole={this.updateRole}
												user_ID={element.user_ID}
											/>
										)}
									</td>
								</tr>
							</tbody>
						);
					})}
				</table>
			</div>
		);
	}
}

export default UserManagement;
