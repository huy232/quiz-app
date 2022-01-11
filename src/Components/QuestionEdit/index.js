/* eslint-disable no-lone-blocks */
import { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class QuestionEdit extends Component {
	constructor(props) {
		super(props);
		this.state = this.initialState;
		this.questionChange = this.questionChange.bind(this);
		this.submitForm = this.submitForm.bind(this);
	}
	initialState = { question_desc: "" };

	componentDidMount() {
		axios
			.get("http://localhost:3000/questions/" + this.props.question_ID)
			.then((res) => {
				this.setState({
					question_desc: res.data.question_desc,
				});
			});
	}

	resetQuestion = () => {
		this.setState(() => this.initialState);
	};

	submitForm = (event) => {
		event.preventDefault();

		const question = {
			question_desc: this.state.question_desc,
		};

		axios
			.put(
				"http://localhost:3000/admin/update-question/" + this.props.question_ID,
				question
			)
			.then((res) => {
				if (res.data != null) {
					toast.success(`Question edit successfully`);
					this.setState(this.initialState);
					this.props.updateQuestion();
				} else {
					toast.error(`Failed to edit question`);
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
					onReset={this.resetQuestion}
				>
					<label htmlFor="question_desc">Question Description:</label>
					<br />
					<input
						type="text"
						id="question_desc"
						name="question_desc"
						placeholder="Enter the question description"
						value={this.state.question_desc}
						onChange={this.questionChange}
					/>
					<br />
					<button type="submit" className="create-button-form">
						Edit question
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

export default QuestionEdit;
