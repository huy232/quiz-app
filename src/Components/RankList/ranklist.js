/* eslint-disable no-undef */
import { Component } from "react";
import axios from "axios";

class RankList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
		};
	}

	async componentDidMount() {
		await axios
			.get("http://localhost:3000/get-ranklist/" + this.props.quizID)
			.then((res) => {
				this.setState({ users: res.data });
			});
	}

	render() {
		return (
			<div className="column right">
				<table id="leaderboard">
					<thead>
						<tr>
							<th>User</th>
							<th>Score</th>
						</tr>
					</thead>
					<tbody>
						{this.state.users.map((element, i) => {
							return (
								<tr key={i}>
									<td>{element.username}</td>
									<td>{element.score}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RankList;
