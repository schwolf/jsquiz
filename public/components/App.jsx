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
		
		const fragment = window.location.hash.substr(1),
			quizIndex = isNaN(fragment) ? 0 : parseInt(fragment, 10);
		
		this.state = {
			currentQuiz: this.props.quizzes[quizIndex];
		}
		
		// event handlers have to be bound to the object, see http://reactkungfu.com/2015/07/why-and-how-to-bind-methods-in-your-react-component-classes/
		this.onRun = this.onRun.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onNav = this.onNav.bind(this);
		
		this.assert = this.assert.bind(this);
	}
	
	render() {
		return (
			<div>
				<Explantion content={this.state.currentQuiz.explanation} quizNumber={ this.props.quizzes.indexOf(this.state.currentQuiz) + 1 }/>
				<AceEditor code={this.state.currentQuiz.getActAndAsserts()} title="Test code" isReadOnly= {true} id="foo" />
				<AceEditor code={this.state.currentQuiz.initialCode} title="Your code" isReadOnly={false} id="bar" ref= {(ref) => this.myCodeComponent = ref}  /> {/* the MyCode editor gets a reference to be able to grab it's editor content later in onRun */}
				<ButtonRun onRun={this.onRun} />
				<ButtonReset onReset={this.onReset} />
				<ButtonNav onNav={this.onNav} isDisabled={ this.isFirstQuiz() } caption="Prev" step={ -1 } />
				<ButtonNav onNav={this.onNav} isDisabled={ this.isLastQuiz() } caption="Next" step= { 1 } />
				<Result currentQuiz={this.state.currentQuiz} />
			</div>
		);
	}
	
	onRun() {
		this.state.currentQuiz.resetResults();
		var userEditedCode = this.myCodeComponent.getCode(),
			testCode = this.state.currentQuiz.getActAndAsserts();
		try {
			var func = new Function('assert', userEditedCode + ";" + testCode);
            func(this.assert);
        } catch (e) {
        	this.state.currentQuiz.errorMessage = e.message;
        } finally {
			// set the new state, see https://facebook.github.io/react/docs/component-api.html
			this.state.currentQuiz.initialCode = userEditedCode; // note that initialCode is perhaps not the best name for the property
			this.updateState();
		}
	}
	
	onReset() {
		this.state.currentQuiz.resetResults();
		this.updateState();
	}
	
	 isFirstQuiz() {
		 return this.props.quizzes.indexOf(this.state.currentQuiz) === 0;
	 }
	 isLastQuiz() {
		 return this.props.quizzes.indexOf(this.state.currentQuiz) === this.props.quizzes.length - 1;
	 }
	
	onNav(step) {
		var currentIndex = this.props.quizzes.indexOf(this.state.currentQuiz),
			newIndex = currentIndex + step;
		if (newIndex < 0 || newIndex >= this.props.quizzes.length) {
			return;
		}
		window.location.hash = newIndex;
		this.state.currentQuiz.resetResults();
		this.state.currentQuiz = this.props.quizzes[newIndex];
		this.updateState();
	}
	
	updateState(userEditedCode) {
		this.setState({ currentQuiz: this.state.currentQuiz });
	}
	
	assert(isCorrect) {
		var i, a;
		for (i = 0; i < this.state.currentQuiz.asserts.length; i++) {
			a = this.state.currentQuiz.asserts[i];
			if (a.result === undefined) {
                a.result = isCorrect;
                break;
			}
		}
	}
}

App.defaultProps = {
	quizzes: Quizzes	
};


