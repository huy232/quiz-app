/* eslint-disable no-restricted-globals */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

class History extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resultList: [],
		};
	}

	componentDidMount() {
		if (!localStorage.getItem("token")) {
			toast.warning(`You need to login`);
		} else {
			var token = localStorage.token;
			var decoded = jwt_decode(token);
			axios
				.get("http://localhost:3000/history/" + decoded.user_ID)
				.then((res) => {
					this.setState({ resultList: res.data });
				});
		}
	}

	updateHistory() {
		var token = localStorage.token;
		var decoded = jwt_decode(token);
		axios
			.get("http://localhost:3000/history/" + decoded.user_ID)
			.then((res) => {
				this.setState({ resultList: res.data });
			});
	}

	deleteHistory = (historyID) => {
		let r = confirm(
			"Press OK to confirm deleting a history, Cancel to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/delete-history/" + historyID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`History deleted successfully`);
						this.setState({
							resultList: this.state.resultList.filter(
								(result) => result.history_ID !== historyID
							),
						});
						this.updateHistory();
					} else {
						toast.error(`Failed to delete question`);
					}
				});
		}
	};

	render() {
		return (
			<div className="admin-table">
				20 records recently of {}
				<table className="result-table">
					<thead>
						<tr>Quiz Topic: </tr>
					</thead>
					{this.state.resultList.map((result, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{result.history_ID}</td>
									<td>
										{result.quizname}
										<br />
										<Link to={`/history-detail/${result.history_ID}`}>
											<button className="question-view">
												View <span>history detail of this topic</span>
											</button>
										</Link>
									</td>
									<td>
										<button
											className="delete-button"
											onClick={this.deleteHistory.bind(this, result.history_ID)}
										>
											Delete
										</button>
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

export default History;
