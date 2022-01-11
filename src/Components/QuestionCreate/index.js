/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class QuestionCreate extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.questionChange = this.questionChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { question_desc: "", questionList: [] };

	resetQuestion = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const question = {
			question_desc: this.state.question_desc,
			quiz_ID: this.props.quiz_ID,
		};

		axios
			.post("http://localhost:3000/admin/create-question", question)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Question added successfully`);
					this.setState(this.initialState);
					this.props.updateQuestion();
				} else {
					toast.error(`Failed to add question`);
				}
			});
	};

	questionChange = (event) => {
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
					onReset={this.resetRole}
				>
					<label htmlFor="question_desc">Question Description:</label>
					<br />
					<input
						type="text"
						id="question_desc"
						name="question_desc"
						placeholder="Enter your question description"
						value={this.state.question_desc}
						onChange={this.questionChange}
					/>
					<br />
					<button type="submit" className="create-button-form">
						Create a new question
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

export default QuestionCreate;
