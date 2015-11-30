'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

export default class AceEditor extends React.Component {
	componentDidMount() {
    	this.editor = ace.edit(ReactDOM.findDOMNode(this.refs.aceEditor).id);
		this.editor.setTheme("ace/theme/chrome");
                this.editor.session.setMode("ace/mode/javascript");
                this.editor.renderer.setShowGutter(false);
                this.editor.setShowPrintMargin(false);  
                
				if (this.props.isReadOnly) {
					this.editor.setReadOnly(true);
					this.editor.setOptions({
							maxLines: 5
					});
					this.editor.setHighlightActiveLine(false);
					this.editor.gotoLine(0, 0);
				}
                
				this.setValue();
  	}
	
	componentDidUpdate() {
		this.setValue();
	}
	
	setValue() {
		this.editor.setValue(this.props.code, 1);
	}
	
	render() {
		return (
			<div className="panel panel-default">
			<div className="panel-heading">
				<h3 className="panel-title">{ this.props.title }</h3>
			</div>
			<div className="panel-body">
				<pre ref="aceEditor" id={ this.props.id } className="editor"></pre>
			</div>
		</div>
		);
	}
	
	getCode() {
    	return this.editor.getValue();
    }

}

AceEditor.editor = null;