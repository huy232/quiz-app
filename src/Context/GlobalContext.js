import React, { createContext, Component } from "react";

export const GlobalContext = createContext();

class GlobalContextProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			useToken: false,
		};
		this.handleOnSubmit = this.handleOnSubmit.bind(this);
	}

	handleOnSubmit = () => {
		this.setState({ useToken: true });
	};

	render() {
		return (
			<GlobalContext.Provider
				value={{ ...this.state, handleOnSubmit: this.handleOnSubmit }}
			>
				{this.props.children}
			</GlobalContext.Provider>
		);
	}
}
export default GlobalContextProvider;
