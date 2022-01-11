/* eslint-disable no-undef */
/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class QuizEdit extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.quizChange = this.quizChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = {
		quiz_ID: this.props.quiz_ID,
		quizname: "",
		quiztime: "",
		quizList: this.props.quizList,
	};

	async componentDidMount() {
		await axios
			.get("http://localhost:3000/admin/get-quiz/" + this.props.quiz_ID)
			.then((res) => {
				this.setState({
					quizname: res.data.quizname,
					quiztime: res.data.quiztime,
				});
			});
	}

	resetQuiz = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const quiz = {
			quizname: this.state.quizname,
			quiztime: this.state.quiztime,
		};

		axios
			.put(
				"http://localhost:3000/admin/update-quiz/" + this.props.quiz_ID,
				quiz
			)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Quiz edit successfully`);
					this.setState(this.initialState);
					this.props.updateQuiz();
				} else {
					toast.error(`Failed to edit quiz`);
				}
			});
	};

	quizChange = (event) => {
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
					onReset={this.resetQuiz}
				>
					<label htmlFor="quizname">Quiz name:</label>
					<br />
					<input
						type="text"
						id="quizname"
						name="quizname"
						placeholder="Enter your quiz name"
						value={this.state.quizname}
						onChange={this.quizChange}
					/>
					<br />
					<label htmlFor="quiztime">Quiz time:</label>
					<br />
					<input
						type="number"
						id="quiztime"
						name="quiztime"
						placeholder="Enter your quiz name"
						value={this.state.quiztime}
						onChange={this.quizChange}
					/>
					<br />
					<button type="submit" className="create-button-form">
						Edit quiz
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

export default QuizEdit;
