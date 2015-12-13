'use strict';

import React from 'react';

export default class ButtonRun extends React.Component {
	constructor(props) {
		super(props);
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		this.onClicked = this.onClicked.bind(this);
	}
	
	render() {
		return (
			<button className="btn btn-primary" type="button" onClick={this.onClicked}>Run</button>
		);
	}
	
	onClicked() {
		this.props.onRun();
	}
}