import React from 'react';

export default class ButtonNav extends React.Component {
	constructor(props) {
		super(props);
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		this.onClicked = this.onClicked.bind(this);
	}
	
	render() {
		return (
			<button className={ this.getClassName() } type="button" onClick={ this.onClicked }>{ this.props.caption }</button>
		);
	}
	
	getClassName() {
		let className = "btn btn-default"
		if (this.props.isDisabled) {
			className += " opacity";
		}
		return className;
	}
	
	onClicked() {
		this.props.onNav(this.props.step);
	}
}