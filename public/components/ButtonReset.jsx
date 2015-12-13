import React from 'react';

export default class ButtonReset extends React.Component {
	constructor(props) {
		super(props);
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		this.onClicked = this.onClicked.bind(this);
	}
	
	render() {
		return (
			<button className="btn btn-default" type="button" onClick={this.onClicked}>Reset</button>
		);
	}
	
	onClicked() {
		this.props.onReset();
	}
}