/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuestionEdit from "../QuestionEdit";
import QuestionCreate from "../QuestionCreate";
import { Link } from "react-router-dom";
class QuestionManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questionList: [],
			showHideCreate: false,
			showHideEdit: false,
		};
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	async componentDidMount() {
		await axios
			.get(
				"http://localhost:3000/quiz-question/" + this.props.match.params.quiz_ID
			)
			.then((res) => {
				this.setState({
					questionList: res.data,
				});
			})
			.catch((error) => console.log(error));
	}

	updateQuestion = () => {
		axios
			.get(
				"http://localhost:3000/quiz-question/" + this.props.match.params.quiz_ID
			)
			.then((res) => {
				this.setState({
					questionList: res.data,
				});
			})
			.catch((error) => console.log(error));
	};

	deleteQuestion = (questionID) => {
		let r = confirm(
			"Press OK to confirm deleting a question, Cancel to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/admin/delete-question/" + questionID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`Question deleted successfully`);
						this.setState({
							questionList: this.state.questionList.filter(
								(element) => element.question_ID !== questionID
							),
						});
					} else {
						toast.error(`Failed to delete question`);
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
				<Link to="/admin">
					<button className="go-back-button">Go back to admin</button>
				</Link>
				<button
					className="overall-admin-button"
					onClick={() => this.toggle("showHideCreate")}
				>
					Create another question
				</button>
				{showHideCreate && (
					<QuestionCreate
						updateQuestion={this.updateQuestion}
						quiz_ID={this.props.match.params.quiz_ID}
					/>
				)}
				<table>
					<thead>
						<tr>
							<th>Question ID</th>
							<th>Question Description</th>
							<th>Action</th>
						</tr>
					</thead>

					{this.state.questionList.map((element, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{element.question_ID}</td>
									<td>
										{element.question_desc}
										<br />
										<Link
											to={`/admin/${element.quiz_ID}/${element.question_ID}`}
										>
											<button className="question-view">
												Answer <span>View</span>
											</button>
										</Link>
									</td>
									<td className="admin-button">
										<button
											className="admin-delete-button"
											onClick={this.deleteQuestion.bind(
												this,
												element.question_ID
											)}
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
											<QuestionEdit
												id={element.key}
												updateQuestion={this.updateQuestion}
												question_ID={element.question_ID}
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

export default QuestionManagement;
