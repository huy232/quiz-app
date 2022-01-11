import { Component } from "react";
import axios from "axios";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class Result extends Component {
	constructor(props) {
		super(props);
		this.state = {
			resultList: [],
		};
	}

	async componentDidMount() {
		if (!localStorage.getItem("token")) {
			toast.warning(`You need to login before viewing a history`);
			return <Redirect to="/" />;
		} else {
			var token = localStorage.token;
			var decoded = jwt_decode(token);
			await axios
				.get(
					"http://localhost:3000/get-specific-result/" +
						this.props.match.params.history_ID +
						"/" +
						decoded.user_ID
				)
				.then((res) => {
					this.setState({ resultList: res.data });
				});
		}
	}

	render() {
		const result = Object.values(this.state.resultList).filter(
			(item) => item.answer_checkResult === 1
		);
		const resultCount = result.length;
		const totalResult = Object.values(this.state.resultList).length;
		const calculateResult = (resultCount * 100) / totalResult;

		let rankList = {
			history_ID: this.props.match.params.history_ID,
			score: calculateResult,
		};
		let rankScore = rankList.score;
		if (isNaN(rankScore) === true) {
		} else {
			axios.post("http://localhost:3000/create-ranklist", rankList);
		}
		return (
			<div>
				<div className="result-info">
					RESULT of User <span className="username"> </span>
					<br />
					Topic:{" "}
					<span className="topic">
						{Object.values(this.state.resultList)[0]?.quizname}
					</span>
					<br />
					<span className="score">Your score is: {calculateResult}</span>
				</div>
				<br />
				<table className="result-table">
					<thead>
						<tr>
							<th>Questions</th>
							<th>Answer</th>
							<th>Answer Result</th>
						</tr>
					</thead>

					{Object.values(this.state.resultList).map((result, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{result.question_desc}</td>
									<td>
										{result.answer_result === null ? (
											<p>Not choosing answer</p>
										) : (
											result.answer_desc
										)}
									</td>
									<td>
										{!result.answer_checkResult ? (
											<FaWindowClose />
										) : (
											<FaCheckCircle />
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

export default Result;
