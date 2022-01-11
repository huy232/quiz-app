/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Components/Header/header";
import Footer from "./Components/Footer/footer";
import Contact from "./Components/Contact/contact";
import Home from "./Components/Home/home.js";
import QuizTopic from "./Components/QuizTopic/";
import Quiz from "./Components/Quiz/quiz";
import SignUp from "./Components/SignUp/signup.js";
import SignIn from "./Components/SignIn/signin.js";
import Admin from "./Components/Admin/admin.js";
import QuestionManagement from "./Components/QuestionManagement";
import Result from "./Components/Result";
import History from "./Components/History";
import HistoryDetail from "./Components/HistoryDetail";
import AnswerManagement from "./Components/AnswerManagement";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { GlobalContext } from "./Context/GlobalContext";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			token: localStorage.getItem("token"),
			data: null,
		};
	}
	handleCallBack = (childData) => {
		this.setState({ data: childData });
	};
	render() {
		const { data } = this.state;
		const { token } = this.state;
		return (
			<GlobalContext.Provider value={token}>
				<Router>
					<div id="main">
						<Header tokenMain={this.state.data} />

						<div className="content">
							<ToastContainer />
							<Switch>
								<Route
									path="/history-detail/:history_ID"
									component={HistoryDetail}
								/>
								<Route path="/history" component={History} />
								<Route path="/contact" component={Contact} />
								<Route path="/quiz-topics" component={QuizTopic} />
								<Route path="/sign-up" component={SignUp} />
								<Route
									path="/sign-in"
									component={() => (
										<SignIn parentCallback={this.handleCallBack} />
									)}
								/>
								{data}
								<Route
									path="/quiz/:topicId/"
									render={(props) => <Quiz {...props} rootState={this.state} />}
								/>
								<Route
									path="/admin/:quiz_ID/:question_ID"
									component={AnswerManagement}
								/>
								<Route path="/result/:history_ID" component={Result} />
								<Route path="/admin/:quiz_ID" component={QuestionManagement} />
								<Route path="/admin" component={Admin} />
								<Route exact path="/" component={Home} />
							</Switch>
						</div>

						<Footer />
					</div>
				</Router>
			</GlobalContext.Provider>
		);
	}
}
export default App;
