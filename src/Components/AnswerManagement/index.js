/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnswerEdit from "../AnswerEdit";
import AnswerCreate from "../AnswerCreate";
import { Link } from "react-router-dom";
class AnswerManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			answerList: [],
			showHideCreate: false,
			showHideEdit: false,
		};
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	async componentDidMount() {
		await axios
			.get(
				"http://localhost:3000/answer/" + this.props.match.params.question_ID
			)
			.then((res) => {
				this.setState({
					answerList: res.data,
				});
			})
			.catch((error) => console.log(error));
	}

	updateAnswer = () => {
		axios
			.get(
				"http://localhost:3000/answer/" + this.props.match.params.question_ID
			)
			.then((res) => {
				this.setState({
					answerList: res.data,
				});
			})
			.catch((error) => console.log(error));
	};

	deleteAnswer = (answerID) => {
		let r = confirm(
			"Press OK to confirm deleting a question, Cancel to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/admin/delete-answer/" + answerID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`Answer deleted successfully`);
						this.setState({
							answerList: this.state.answerList.filter(
								(element) => element.answer_ID !== answerID
							),
						});
					} else {
						toast.error(`Failed to delete an answer`);
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
	toggle(name) {
		switch (name) {
			case "showHideCreate":
				this.setState({ showHideCreate: !this.state.showHideCreate });
				break;
			default:
				null;
		}
	}
	render() {
		const { showHideEdit, showHideCreate } = this.state;
		return (
			<div className="admin-table">
				<Link to={`/admin/${this.props.match.params.quiz_ID}`}>
					<button className="go-back-button">
						Go back to question management
					</button>
				</Link>
				<button
					className="overall-admin-button"
					onClick={() => this.toggle("showHideCreate")}
				>
					Create another answer
				</button>
				{showHideCreate && (
					<AnswerCreate
						updateAnswer={this.updateAnswer}
						question_ID={this.props.match.params.question_ID}
					/>
				)}
				<table>
					<thead>
						<tr>
							<th>Answer ID</th>
							<th>Answer Description</th>
							<th>Answer Result</th>
							<th>Action</th>
						</tr>
					</thead>

					{this.state.answerList.map((element, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{element.answer_ID}</td>
									<td>{element.answer_desc}</td>
									<td>
										{element.answer_result === 1 ? "Correct" : "Incorrect"}
									</td>
									<td className="admin-button">
										<button
											className="admin-delete-button"
											onClick={this.deleteAnswer.bind(this, element.answer_ID)}
										>
											Delete
										</button>
										<button
											className="admin-config-button"
											onClick={() => this.toggleEdit(i)}
											value={element.question_ID}
										>
											Edit
										</button>
										{showHideEdit === i && (
											<AnswerEdit
												id={element.key}
												updateAnswer={this.updateAnswer}
												question_ID={element.question_ID}
												answer_ID={element.answer_ID}
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

export default AnswerManagement;
