/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-expressions */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import QuizCreate from "../QuizCreate/";
import QuizEdit from "../QuizEdit";
import { Link } from "react-router-dom";

class QuizManagement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quizList: [],
			showHideCreate: false,
			showHideEdit: false,
		};
		this.toggle = this.toggle.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	async componentDidMount() {
		await axios.get("http://localhost:3000/quiz-topics").then((res) => {
			this.setState({
				quizList: res.data,
			});
		});
	}

	updateQuiz = () => {
		axios.get("http://localhost:3000/quiz-topics").then((res) => {
			this.setState({
				quizList: res.data,
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

	deleteQuiz = (quizID) => {
		let r = confirm(
			"Press OK to confirm deleting an quiz, Cancel to cancel the action."
		);
		if (r === true) {
			axios
				.delete("http://localhost:3000/admin/delete-quiz/" + quizID)
				.then((res) => {
					if (res.data != null) {
						toast.success(`Quiz deleted successfully`);
						this.setState({
							quizList: this.state.quizList.filter(
								(element) => element.quiz_ID !== quizID
							),
						});
					} else {
						toast.error(`Failed to delete quiz`);
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
					Create another quiz
				</button>
				{showHideCreate && <QuizCreate updateQuiz={this.updateQuiz} />}
				<table>
					<thead>
						<tr>
							<th>Quiz ID</th>
							<th>Quiz Description</th>
							<th>Quiz Time</th>
							<th>Action</th>
						</tr>
					</thead>
					{this.state.quizList.map((element, i) => {
						return (
							<tbody key={i}>
								<tr>
									<td>{element.quiz_ID}</td>
									<td>
										{element.quizname}
										<br />
										<Link to={`/admin/${element.quiz_ID}`}>
											<button className="question-view">
												Question <span>View</span>
											</button>
										</Link>
									</td>
									<td>
										{new Date(element.quiztime * 1000)
											.toISOString()
											.substr(11, 8)}
									</td>
									<td className="admin-button">
										<button
											className="admin-delete-button"
											onClick={this.deleteQuiz.bind(this, element.quiz_ID)}
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
											<QuizEdit
												id={element.key}
												quiz_ID={element.quiz_ID}
												quizList={this.state.quizList}
												updateQuiz={this.updateQuiz}
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

export default QuizManagement;
