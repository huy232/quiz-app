import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default class Home extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			autoPlay: true,
			autoplaySpeed: 3000,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		return (
			<div className="home-img">
				<Slider {...settings}>
					<div>
						<img
							className="center-fit"
							src="../../Demo/assets/images/slider/slider1.jpg"
							alt="slider1"
						/>
					</div>
					<div>
						<img
							className="center-fit"
							src="../../Demo/assets/images/slider/slider2.jpg"
							alt="slider2"
						/>
					</div>
					<div>
						<img
							className="center-fit"
							src="../../Demo/assets/images/slider/slider3.jpg"
							alt="slider3"
						/>
					</div>
					<div>
						<img
							className="center-fit"
							src="../../Demo/assets/images/slider/slider4.jpg"
							alt="slider4"
						/>
					</div>
				</Slider>

				<div className="home-title">
					<h2>HOME</h2>
				</div>
				<div className="home-description">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non
						commodo purus. Morbi tincidunt pellentesque mi vitae aliquam. Sed eu
						mollis neque, ut volutpat ligula. Curabitur tristique, mauris in
						semper maximus, justo nunc euismod turpis, at bibendum sem leo a
						justo. Vestibulum diam mauris, ornare vel nisl eget, cursus maximus
						leo. Vestibulum dictum maximus cursus. Nullam vitae lacus varius,
						bibendum erat vehicula, consequat ligula. Phasellus dictum, risus
						vitae sodales eleifend, odio arcu scelerisque justo, nec consectetur
						enim tellus ac dolor. Etiam tempus, libero at blandit viverra, felis
						lorem laoreet turpis, in sagittis nunc est a tortor. Vestibulum
						vitae nibh sed ex faucibus porttitor in tincidunt dolor. Donec
						lobortis est ac mauris bibendum, sed ornare orci maximus. Maecenas
						sed pellentesque ex. Morbi bibendum gravida dignissim. Ut ultricies
						tellus nisl, ac bibendum lacus gravida non. Maecenas placerat
						aliquam risus vitae pharetra. Etiam ac laoreet magna, eu facilisis
						tellus. Mauris scelerisque, dui auctor sagittis mollis, dui tortor
						pretium mi, vel maximus odio nulla ac dui. Vivamus ac condimentum
						ipsum. Vestibulum ante ipsum primis in faucibus orci luctus et
						ultrices posuere cubilia curae; Etiam neque lacus, euismod et diam
						sed, gravida malesuada felis. Mauris et congue nibh. Aliquam ac
						purus mollis, tincidunt mi sed, cursus erat. Etiam maximus neque
						lectus, nec molestie tellus mattis finibus. Nulla eget lectus vitae
						libero cursus ullamcorper.
					</p>
				</div>
				<div className="home-button-section">
					<Link to="/sign-up">
						<button type="button">Sign Up</button>
					</Link>
					<Link to="/sign-in">
						<button type="button">Sign In</button>
					</Link>
				</div>
			</div>
		);
	}
}
