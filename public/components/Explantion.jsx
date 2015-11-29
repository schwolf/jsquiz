import React from 'react';

export default class Explanation extends React.Component {
	render() {
		return (
			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title">Quiz {this.props.quizNumber}</h3>
				</div>
				<div className="panel-body">{this.props.content}</div>
			</div>
		);
	}
}