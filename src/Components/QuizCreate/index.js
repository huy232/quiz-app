/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class QuizCreate extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.quizChange = this.quizChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { quizname: "", quiztime: "", quizList: this.props.quizList };

	resetQuiz = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const quiz = {
			quizname: this.state.quizname,
			quiztime: this.state.quiztime,
		};

		axios.post("http://localhost:3000/admin/create-quiz", quiz).then((res) => {
			if (res.data != null) {
				toast.success(`Quiz added successfully`);
				this.setState(this.initialState);
				this.props.updateQuiz();
			} else {
				toast.error(`Failed to add quiz`);
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
					<label htmlFor="quizname">Quiz topic:</label>
					<br />
					<input
						required
						type="text"
						id="quizname"
						name="quizname"
						placeholder="Enter your quiz topic"
						value={this.state.quizname}
						onChange={this.quizChange}
					/>
					<br />
					<label htmlFor="quiztime">Quiz time:</label>
					<br />
					<input
						required
						type="number"
						id="quiztime"
						name="quiztime"
						placeholder="Enter your quiz time"
						value={this.state.quiztime}
						onChange={this.quizChange}
					/>
					<br />
					<button type="submit" className="create-button-form">
						Create a new Quiz topic
					</button>
					<button type="reset" className="reset-button-form">
						Reset
					</button>
					<br />
				</form>
			</div>
		);
	}
}

// The submitForm is the event button that when I click,
// it'll perform a POST axios, which is successful,
// but I have to refresh the page manually to see the change in the webpage.

export default QuizCreate;
