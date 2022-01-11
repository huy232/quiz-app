/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { FaCheckCircle, FaWindowClose } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class History extends Component {
	constructor(props) {
		super(props);
		this.state = {
			historyList: [],
		};
	}

	async componentDidMount() {
		await axios
			.get(
				"http://localhost:3000/get-history-result/" +
					this.props.match.params.history_ID
			)
			.then((res) => {
				this.setState({ historyList: res.data });
			});
	}

	render() {
		const result = Object.values(this.state.historyList).filter(
			(item) => item.answer_checkResult === 1
		);
		const resultCount = result.length;
		const totalResult = this.state.historyList?.length;
		const calculateResult = (resultCount * 100) / totalResult;
		return (
			<div className="admin-table">
				<Link to="/history">
					<button className="go-back-button">Go back to History</button>
				</Link>
				<br />
				Detail of
				<table className="result-table">
					<thead>
						<tr>Quiz Topic: {this.state.historyList[0]?.quizname}</tr>
					</thead>
					Total question: {totalResult}
					<br />
					Correct question: {resultCount}
					<br />
					Score: {calculateResult}
					{Object.values(this.state.historyList).map((result, i) => {
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

export default History;
