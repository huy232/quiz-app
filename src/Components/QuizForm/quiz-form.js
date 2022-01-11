/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

export default function QuizForm(props) {
	const { quizID, time } = props;
	const history1 = useHistory();
	const [questions, setQuestions] = useState([]);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [history, setHistory] = useState();
	const [disabled, setDisabled] = useState(true);
	const handleDisable = () => {
		setDisabled(!disabled);
	};

	useEffect(() => {
		let hasUnmounted = false;

		async function fetchTransformAndSetQuestionsAsState() {
			var token = localStorage.token;
			var decoded = jwt_decode(token);
			const history = {
				user_ID: decoded.user_ID,
				quiz_ID: quizID,
			};
			axios
				.post("http://localhost:3000/create-history", history)
				.then((res) => {
					return res.data;
				});
			const questions = await axios
				.get("http://localhost:3000/quiz/" + quizID)
				.then((res) => {
					return res.data;
				});
			axios
				.get("http://localhost:3000/get-history/" + decoded.user_ID)
				.then((res) => setHistory(res.data));

			props.parentCallback2(history);
			if (hasUnmounted) {
				return;
			}

			const groupedByQuestionId = questions.reduce((acc, obj) => {
				const property = obj["question_ID"];
				acc[property] ?? (acc[property] = []);
				acc[property].push(obj);
				return acc;
			}, {});

			const readiedForState = Object.values(groupedByQuestionId).map(
				(questionData) => {
					return {
						question_ID: questionData[0].question_ID,
						question_desc: questionData[0].question_desc,
						quiz_ID: questionData[0].quiz_ID,
						answers: questionData.map((question) => {
							return {
								answer_ID: question.answer_ID,
								answer_desc: question.answer_desc,
								answer_result: question.answer_result,
							};
						}),
						answerSubmittedByUser: null,
					};
				}
			);

			setQuestions(readiedForState);
		}

		fetchTransformAndSetQuestionsAsState();

		return () => {
			hasUnmounted = true;
		};
	}, [quizID]);

	if (0 === questions.length) {
		return <p>Loading questions...</p>;
	}

	const currentQuestion = questions[questionIndex];
	const [isFirstQuestion, isLastQuestion] = [
		0 === questionIndex,
		questions.length - 1 === questionIndex,
	];

	const handlePreviousQuestionClick = () => {
		setQuestionIndex((prev) => Math.max(0, prev - 1));
	};

	const handleNextQuestionClick = () => {
		setQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
	};

	const handleClick = () => {
		var result = {
			question_ID: currentQuestion.question_ID,
			answer_result: currentQuestion.answerSubmittedByUser,
			answer_checkResult: currentQuestion.answerResultSubmittedByUser,
		};
		axios
			.post(
				"http://localhost:3000/create-history-result/" + history[0].history_ID,
				result
			)
			.then((res) => {
				if (res.data != null) {
				}
			});
	};
	const onSubmit = async () => {
		var token = localStorage.token;
		var decoded = jwt_decode(token);

		const result = {
			question_ID: currentQuestion.question_ID,
			answer_result: currentQuestion.answerSubmittedByUser,
			answer_checkResult: currentQuestion.answerResultSubmittedByUser,
		};

		await axios
			.post(
				"http://localhost:3000/create-history-result/" + history[0].history_ID,
				result
			)
			.then((res) => {
				if (res.data != null) {
				}
			});

		await axios
			.get("http://localhost:3000/get-history/" + decoded.user_ID)
			.then((res) => setHistory(res.data));
		history1.push(`/result/${history_ID?.[0].history_ID}`);
	};

	const wrapNext = () => {
		handleClick();
		handleNextQuestionClick();
	};

	const wrapPrevious = () => {
		handleClick();
		handlePreviousQuestionClick();
	};

	const handleAnswer = (questionId, answerId, answerResult) => {
		setQuestions((prev) => {
			const indexToUpdate =
				prev[questionIndex].question_ID === questionId
					? questionIndex
					: prev.findIndex(({ question_ID }) => questionId === question_ID);

			if (-1 !== indexToUpdate) {
				return [
					...prev.slice(0, indexToUpdate),
					{
						...prev[indexToUpdate],
						answerSubmittedByUser: answerId,
						answerResultSubmittedByUser: answerResult,
					},
					...prev.slice(indexToUpdate + 1),
				];
			}
		});
	};
	const history_ID = history;
	return (
		<>
			<div className="column middle">
				<div className="game-details-container">
					<h1>
						<span>Question: </span>
						<span id="question-number">{questionIndex + 1}</span>
						<span>{`/${questions.length}`}</span>
					</h1>
				</div>
				<div className="game-quiz-container">
					<p>{currentQuestion.question_desc}</p>
					<div className="game-options-container">
						{currentQuestion.answers.map((answer) => {
							return (
								<div key={answer.answer_ID}>
									<input
										disabled={time === 0 ? disabled : !disabled}
										type="radio"
										checked={
											answer.answer_ID === currentQuestion.answerSubmittedByUser
										}
										onChange={() =>
											handleAnswer(
												currentQuestion.question_ID,
												answer.answer_ID,
												answer.answer_result
											)
										}
										id={answer.answer_ID}
										name={answer.question_desc}
										value={answer.answer_result}
									/>
									<label htmlFor={answer.answer_ID}>{answer.answer_desc}</label>
								</div>
							);
						})}
					</div>
					<div className="next-button-container">
						<button
							className={`${questionIndex === 0 && "btn-hide"}`}
							onClick={wrapPrevious}
							disabled={isFirstQuestion}
						>
							Previous Question
						</button>
						<button
							className={`${
								questionIndex === questions.length - 1 && "btn-hide"
							}`}
							onClick={wrapNext}
							disabled={isLastQuestion}
						>
							Next Question
						</button>
					</div>

					<button
						className={`btn-hide ${
							questionIndex === questions.length - 1 && "btn-show"
						} submit-btn`}
						onClick={onSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
}
