/* eslint-disable no-unused-expressions */
import { useState, useEffect, useRef, useHistory } from "react";
import axios from "axios";

export default function Clock(props) {
	let { time, data } = props;
	const [timer, setTimer] = useState(time);
	const id = useRef(null);
	const clear = () => {
		window.clearInterval(id.current);
	};
	useEffect(() => {
		id.current = window.setInterval(() => {
			setTimer((time) => time - 1);
		}, 1000);
		return () => clear();
	}, []);

	useEffect(() => {
		if (timer === 0) {
			alert("Time out");
			props.parentCallback(timer);
			clear();
		}
	}, [timer]);
	console.log(data);
	return (
		<div className="column left">
			{console.log()}
			<div id="clock">
				<p>
					The quiz end in <br />
					<span>{new Date(timer * 1000).toISOString().substr(11, 8)}</span>
				</p>
			</div>
		</div>
	);
}
