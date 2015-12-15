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
		
		if (this.props.errorMessage.length > 0 || this.props.results.length > 0) {
			return "alert alert-danger";
		}
		
		return "visibility-hidden";
	}
	
	calculateMessage() {
		if (this.props.errorMessage.length > 0) {
			return { __html: this.props.errorMessage };
		}
		
		
		if (this.completelySolved()) {
			return { __html: "Well done!<br/>Key takeaway: " + this.props.takeaway };
		}
		
		var wrongAsserts = this.props.results.filter(function (result) { return result === false;})
		
		return { __html: wrongAsserts.length + " assert(s) not yet ok." };
	}
	
	completelySolved() {
		return this.props.results.length > 0 && this.props.results.every(function (result) { return result;})
	}
}