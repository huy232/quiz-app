/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class QuizCreate extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.answerChange = this.answerChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = {
		answer_desc: "",
		answer_result: "0",
		question_ID: "",
		answerList: [],
	};

	resetAnswer = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const answer = {
			answer_desc: this.state.answer_desc,
			answer_result: this.state.answer_result,
			question_ID: this.props.question_ID,
		};

		axios
			.post("http://localhost:3000/admin/create-answer", answer)
			.then((res) => {
				if (res.data != null) {
					toast.success(`answer added successfully`);
					this.setState(this.initialState);
					this.props.updateAnswer();
				} else {
					toast.error(`Failed to add quiz`);
				}
			});
	};

	answerChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		console.log(this.state.answer_result);
		return (
			<div className="admin-table">
				<form
					className="create-form"
					onSubmit={this.submitForm}
					onReset={this.resetAnswer}
				>
					<label htmlFor="answer_desc">Answer description:</label>
					<br />
					<input
						required
						type="text"
						id="answer_desc"
						name="answer_desc"
						placeholder="Enter your answer description"
						value={this.state.answer_desc}
						onChange={this.answerChange}
					/>
					<br />
					<label htmlFor="answer_result">Answer result:</label>
					<br />
					<select
						name="answer_result"
						id="answer_result"
						onChange={this.answerChange}
						value={this.state.answer_result}
					>
						<option value="0">Incorrect</option>
						<option value="1">Correct</option>
					</select>
					<br />
					<button type="submit" className="create-button-form">
						Create a new Answer
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

export default QuizCreate;
