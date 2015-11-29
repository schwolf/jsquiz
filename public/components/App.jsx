import React from 'react';
import Explantion from './Explantion.jsx!'
import TestCode from './TestCode.jsx!'
import YourCode from './YourCode.jsx!'
import ButtonRun from './ButtonRun.jsx!'
import ButtonReset from './ButtonReset.jsx!'
import ButtonPrev from './ButtonPrev.jsx!'
import ButtonNext from './ButtonNext.jsx!'
import Result from './Result.jsx!'
import Quizzes from 'quizzes'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuiz: this.props.quizzes[0]
		}
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		//this.onTeamSelected = this.onTeamSelected.bind(this);
	}
	
	render() {
		return (
			<div>
				<Explantion content={this.state.currentQuiz.explanation} quizNumber={ this.props.quizzes.indexOf(this.state.currentQuiz) + 1 }/>
				<TestCode /> { /* to be continued here, http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/ */}
				<YourCode />
				<ButtonRun /><ButtonReset /><ButtonPrev /><ButtonNext />
				<Result />
			</div>
		);
	}
}

App.defaultProps = {
	quizzes: Quizzes	
};


