import React from 'react';

export default class Result extends React.Component {
	render() {
		return (
			<div role="alert" className={ this.calculateCssClass() } dangerouslySetInnerHTML={ this.calculateMessage() }></div>
		);
	}
	
	calculateCssClass() {
		if (this.props.currentQuiz.asserts.every(function (assert) { return assert.result === undefined;})) {
			return "visibility-hidden";
		}
		
		if (this.completelySolved()) {
			return "alert alert-success";
		}
		return "alert alert-danger";
	}
	
	calculateMessage() {
		if (this.completelySolved()) {
			return { __html: "Well done!<br/>Key takeaway: " + this.props.currentQuiz.takeaway };
		}
		
		var wrongAsserts = this.props.currentQuiz.asserts.filter(function (assert) { return assert.result === false;})
		
		return { __html: wrongAsserts.length + " assert(s) not yet ok." };
	}
	
	completelySolved() {
		return this.props.currentQuiz.asserts.every(function (assert) { return assert.result === true;})
	}
}