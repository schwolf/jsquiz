'use strict';

import React from 'react';
import Explantion from './Explantion.jsx!'
import AceEditor from './AceEditor.jsx!'
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
				<ButtonPrev onNav={this.onNav} />
				<ButtonNext onNav={this.onNav} />
				<Result currentQuiz={this.state.currentQuiz} />
			</div>
		);
	}
	
	onRun() {
		this.state.currentQuiz.resetResults();
		var myCode = this.myCodeComponent.getCode(),
			testCode = this.state.currentQuiz.getActAndAsserts();
		try {
			var func = new Function('assert', myCode + ";" + testCode);
            func(this.assert);
        } catch (e) {
        	this.state.currentQuiz.errorMessage = e.message;
        } finally {
			// set the new state, see https://facebook.github.io/react/docs/component-api.html
			this.updateState();
		}
		
	}
	
	onReset() {
		this.state.currentQuiz.resetResults();
		this.updateState();
	}
	
	onNav(step) {
		var currentIndex = this.props.quizzes.indexOf(this.state.currentQuiz),
			newIndex = currentIndex + step;
		if (newIndex < 0 || newIndex >= this.props.quizzes.length) {
			return;
		}
		
		this.state.currentQuiz.resetResults();
		this.state.currentQuiz = this.props.quizzes[newIndex];
		this.updateState();
	}
	
	updateState() {
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


