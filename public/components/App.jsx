'use strict';

import React from 'react';
import Explantion from './Explantion.jsx!'
import AceEditor from './AceEditor.jsx!'
import ButtonRun from './ButtonRun.jsx!'
import ButtonReset from './ButtonReset.jsx!'
import ButtonNav from './ButtonNav.jsx!'
import Result from './Result.jsx!'
import Quizzes from 'quizzes'

export default class App extends React.Component {
	constructor(props) {
		super(props);
		
		const fragment = "0" + window.location.hash.substr(1), // "0" prefixed because isNaN("") === false in js
			quizIndex = isNaN(fragment) ? 0 : parseInt(fragment, 10);
		
		this.state = {
			quizIndex: quizIndex,
			results: [],
			errorMessage: ''
		}
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		this.handleRun = this.handleRun.bind(this);
		this.handleReset = this.handleReset.bind(this);
		this.handleNav = this.handleNav.bind(this);
		
		this.assert = this.assert.bind(this);
	}
	
	render() {
		let currentQuiz = this.props.quizzes[this.state.quizIndex];
		return (
			<div>
				<Explantion content={currentQuiz.explanation} quizNumber={ this.state.quizIndex + 1 }/>
				<AceEditor code={currentQuiz.getActAndAsserts(this.state.results)} title="Test code" isReadOnly= {true} id="foo" />
				<AceEditor code={currentQuiz.initialCode} title="Your code" isReadOnly={false} id="bar" ref= {(ref) => this.myCodeComponent = ref}  /> {/* the MyCode editor gets a reference to be able to grab it's editor content later in handleRun */}
				<ButtonRun onRun={this.handleRun} />
				<ButtonReset onReset={this.handleReset} />
				<ButtonNav onNav={this.handleNav} isDisabled={ this.isFirstQuiz() } caption="Prev" step={ -1 } />
				<ButtonNav onNav={this.handleNav} isDisabled={ this.isLastQuiz() } caption="Next" step= { 1 } />
				<Result results={this.state.results} takeaway={currentQuiz.takeaway} errorMessage={this.state.errorMessage} />
			</div>
		);
	}
	
	handleRun() {
		this.state.results = [];
		this.state.errorMessage = "";
		var userEditedCode = this.myCodeComponent.getCode(),
			testCode = this.props.quizzes[this.state.quizIndex].getActAndAsserts();
		try {
			var func = new Function('assert', userEditedCode + ";" + testCode);
            func(this.assert);
        } catch (e) {
        	this.state.errorMessage = e.message;
        } finally {
			this.updateState();
		}
	}
	
	handleReset() {
		this.state.results = [];
		this.state.errorMessage = "";
		this.updateState();
		// myCode will be set manually:
		this.myCodeComponent.forceUpdate();
		
	}
	
	 isFirstQuiz() {
		 return this.state.quizIndex === 0;
	 }
	 isLastQuiz() {
		 return this.state.quizIndex === this.props.quizzes.length - 1;
	 }
	
	handleNav(step) {
		var newIndex = this.state.quizIndex + step;
		if (newIndex < 0 || newIndex >= this.props.quizzes.length) {
			return;
		}
		window.location.hash = newIndex;
		this.state.quizIndex = newIndex;
		this.handleReset();
	}
	
	updateState() {
		this.setState({ quizIndex: this.state.quizIndex, results: this.state.results, errorMessage: this.state.errorMessage });
	}
	
	assert(isCorrect) {
		// simply extend the result array
		this.state.results.push(isCorrect);
	}
}

App.defaultProps = {
	quizzes: Quizzes	
};


