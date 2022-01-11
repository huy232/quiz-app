import { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import callApi from "../../utils/apiCall";

class QuizTopic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quiztopics: [],
		};
	}

	HomeButton() {
		// let history = useHistory();
	}

	componentDidMount() {
		if (!localStorage.getItem("token")) {
			toast.warning(`You need to login before entering to quiz topic`);
		} else {
			callApi("quiz-topics", "GET")
				.then((res) => {
					this.setState({
						quiztopics: res.data,
					});
				})
				.catch((error) => console.log(error));
		}
	}

	handleClick() {
		// axios.post("http://localhost:3000/create-history");
	}

	render() {
		return (
			<div className="quiz-container">
				<div
					className="background-container"
					style={{
						background:
							"url('/Demo/assets/images/background/background-img.jpg'), no-repeat, fixed, center",
						height: "100vh",
					}}
				></div>
				<div className="quiz-card-topic">
					{this.state.quiztopics.map((quiztopic, i) => (
						<ul key={i}>
							<Link
								to={"/quiz/" + quiztopic.quiz_ID}
								onClick={this.handleClick}
							>
								<li className="toggle-quiz">
									Quiz Topic: <br />
									{quiztopic.quizname}
								</li>
								<li className="toggle-time">
									Quiz Time:
									{new Date(quiztopic.quiztime * 1000)
										.toISOString()
										.substr(11, 8)}
								</li>
							</Link>
						</ul>
					))}
				</div>
			</div>
		);
	}
}

export default QuizTopic;
