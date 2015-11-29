import React from 'react';

export default class TestCode extends React.Component {
	render() {
		return (
			<div className="panel panel-default">
			<div className="panel-heading">
				<h3 className="panel-title">Test code</h3>
			</div>
			<div className="panel-body">
				<pre id="readOnlyEditor">blablub</pre>
			</div>
		</div>
		);
	}
}
// to be continued here, see also: http://blog.arkency.com/2014/09/react-dot-js-and-google-charts/