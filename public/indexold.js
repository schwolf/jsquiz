var alertDiv = document.querySelector('.alert'),
	quizIndex = 0,
	assertIndex;

var readOnlyEditor = ace.edit("readOnlyEditor");
initEditor(readOnlyEditor);
readOnlyEditor.setReadOnly(true);
readOnlyEditor.setOptions({
	maxLines: 5
});
readOnlyEditor.setHighlightActiveLine(false);
readOnlyEditor.gotoLine(0, 0);

var editor = ace.edit("editor");
initEditor(editor);
initQuiz();


function initQuiz() {
	// results => set to initial value
	resetResults();
	// test code => set to initial value
	setTestCode();
	// your code => set to initial value  
	editor.setValue(quizzes[quizIndex].initialCode, 1);
	// explanation => set to initial value
	document.querySelector('#explanation').innerHTML = quizzes[quizIndex].explanation;
	hideAlert();
}

function next() {
	if (quizIndex === quizzes.length - 1) {
		return;
	}
	quizIndex++;
	initQuiz();
}

function previous() {
	if (quizIndex === 0) {
		return;
	}
	quizIndex--;
	initQuiz();
}

function hideAlert() {
	alertDiv.style.visibility = "hidden";
}

function resetResults() {
	quizzes[quizIndex].asserts.forEach(function (assert) {
		assert.result = undefined;
	});
}

function run() {
	var error = '';

	assertIndex = 0;

	resetResults();

	try {
		(new Function(editor.getValue() + ";" + readOnlyEditor.getValue()))();
	} catch (e) {
		// set error to a string
		error = e.message;
	}

	setTestCode();

	if (error === "") {
		// set error to an array
		error = quizzes[quizIndex].asserts.filter(function (element) {
			return !element.result;
		});
	}

	alertDiv.style.visibility = "visible";
	if (!error.length) { // both string and array has length property, so we can check for it 
		alertDiv.innerHTML = "Well done!<br/>Key takeaway: " + quizzes[quizIndex].takeaway;
		alertDiv.className = "alert alert-success";
	} else {
		alertDiv.className = "alert alert-danger";
		alertDiv.innerHTML = Array.isArray(error) ? error.length + " assert(s) not yet ok." : error;
	}
}

function assert(isCorrect) {
	quizzes[quizIndex].asserts[assertIndex].result = isCorrect;
	assertIndex++;
}

function initEditor(ed) {
	ed.setTheme("ace/theme/chrome");
	ed.session.setMode("ace/mode/javascript");
	ed.renderer.setShowGutter(false);
	ed.setShowPrintMargin(false);
}

function setTestCode() {
	var code = quizzes[quizIndex].act + "\n",
		flag;

	quizzes[quizIndex].asserts.forEach(function (assert) {
		code += "\n" + assert.code;
		if (assert.result !== undefined) {
			flag = assert.result ? "ok" : "nok";
			code += " // " + flag;
		}
	});
	readOnlyEditor.setValue(code, 1);
}
