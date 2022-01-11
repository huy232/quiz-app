/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoleCreate from "../RoleCreate";
import RoleEdit from "../RoleEdit";

class RoleManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			roleList: [],
			showHideCreate: false,
			showHideEdit: false,
		};
		this.toggle = this.toggle.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	async componentDidMount() {
		await axios.get("http://localhost:3000/admin/get-role-list").then((res) => {
			this.setState({
				roleList: res.data,
			});
		});
	}

	updateRole = () => {
		axios.get("http://localhost:3000/admin/get-role-list").then((res) => {
			this.setState({
				roleList: res.data,
			});
		});
	};

	toggle(name) {
		switch (name) {
			case "showHideCreate":
				this.setState({ showHideCreate: !this.state.showHideCreate });
				break;
			default:
				null;
		}
	}

	deleteRole = (roleID) => {
		let r = confirm(
			"Press OK to confirm deleting a role, Cancel to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/admin/delete-role/" + roleID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`Role deleted successfully`);
						this.setState({
							roleList: this.state.roleList.filter(
								(element) => element.role_ID !== roleID
							),
						});
					} else {
						toast.error(`Failed to delete role`);
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
		const { showHideCreate, showHideEdit } = this.state;
		return (
			<div className="admin-table">
				<button
					className="overall-admin-button"
					onClick={() => this.toggle("showHideCreate")}
				>
					Create another role
				</button>
				{showHideCreate && <RoleCreate updateRole={this.updateRole} />}
				<table>
					<thead>
						<tr>
							<th>Role ID</th>
							<th>Role Name</th>
							<th>Action</th>
						</tr>
					</thead>
					{this.state.roleList.map((element, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{element.role_ID}</td>
									<td>{element.rolename}</td>
									<td className="admin-button">
										<button
											className="admin-delete-button"
											onClick={this.deleteRole.bind(this, element.role_ID)}
										>
											Delete
										</button>
										<button
											className="admin-config-button"
											onClick={() => this.toggleEdit(i)}
										>
											Edit
										</button>
										{showHideEdit === i && (
											<RoleEdit
												id={element.key}
												updateRole={this.updateRole}
												role_ID={element.role_ID}
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

export default RoleManagement;
