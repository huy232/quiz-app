/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class AnswerEdit extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.answerChange = this.answerChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { answer_desc: "", answer_result: "0" };

	componentDidMount() {
		axios
			.get("http://localhost:3000/answer/" + this.props.question_ID)
			.then((res) => {
				this.setState({
					answer_desc: res.data.answer_desc,
				});
			});
	}

	resetAnswer = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const answer = {
			answer_desc: this.state.answer_desc,
			answer_result: this.state.answer_result,
		};

		axios
			.patch(
				"http://localhost:3000/admin/update-answer/" + this.props.answer_ID,
				answer
			)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Question edit successfully`);
					this.setState(this.initialState);
					this.props.updateAnswer();
				} else {
					toast.error(`Failed to edit question`);
				}
			});
	};

	answerChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	render() {
		{
			console.log(this.state.answer_result);
			console.log(this.state.answer_desc);
		}
		return (
			<div className="admin-table">
				<form
					className="create-form"
					onSubmit={this.submitForm}
					onReset={this.resetAnswer}
				>
					<label htmlFor="answer_desc">Answer Description:</label>
					<br />
					<input
						type="text"
						id="answer_desc"
						name="answer_desc"
						placeholder="Enter the question description"
						value={this.state.answer_desc}
						onChange={this.answerChange}
					/>
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
						Edit answer
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

export default AnswerEdit;
