import React from 'react';

export default class Result extends React.Component {
	render() {
		return (
			<div role="alert" className={ this.calculateCssClass() } dangerouslySetInnerHTML={ this.calculateMessage() }></div>
		);
	}
	
	calculateCssClass() {
		if (this.completelySolved()) {
			return "alert alert-success";
		}
		
		if (this.props.currentQuiz.errorMessage || !this.props.currentQuiz.asserts.every(function (assert) { return assert.result === undefined;})) {
			return "alert alert-danger";
		}
		
		return "visibility-hidden";
	}
	
	calculateMessage() {
		if (this.props.currentQuiz.errorMessage) {
			return { __html: this.props.currentQuiz.errorMessage };
		}
		
		
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