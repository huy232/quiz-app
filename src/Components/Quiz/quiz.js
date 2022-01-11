import React, { useState, useEffect } from "react";
import Clock from "../Clock/clock.js";
import QuizForm from "../QuizForm/quiz-form.js";
import RankList from "../RankList/ranklist.js";
import axios from "axios";

export default function Quiz(props) {
	const [dataTopic, setDataTopic] = useState([]);
	const [data, setData] = useState();
	const [data2, setData2] = useState();
	const quizID = Number(props.match.params.topicId);

	const handleCallBack = (childData) => {
		setData(childData);
	};
	const handleCallBack2 = (childData) => {
		setData2(childData);
	};

	useEffect(
		() =>
			axios.get("http://localhost:3000/quiz-topics/" + quizID).then((res) => {
				setDataTopic(res.data);
			}),
		[quizID]
	);

	return (
		<div className="row">
			{dataTopic.quiztime && (
				<Clock
					time={dataTopic.quiztime}
					data={data2}
					parentCallback={handleCallBack}
				/>
			)}
			<QuizForm quizID={quizID} time={data} parentCallback2={handleCallBack2} />

			<RankList quizID={quizID} />
		</div>
	);
}
