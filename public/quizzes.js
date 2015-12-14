'use strict'

class Quiz {
	constructor(explanation, initialCode, act, asserts, takeaway) {
		this.explanation = explanation;
		this.initialCode = initialCode;
		this.act = act;
		this.asserts = asserts;
		this.takeaway = takeaway;
	}
	getActAndAsserts() {
		var actAndAsserts = this.act + "\n",
			flag;

		this.asserts.forEach(function(assert) {
			actAndAsserts += "\n" + assert.code;
			if (assert.result !== undefined) {
				flag = assert.result ? "ok" : "nok";
				actAndAsserts += " // " + flag;
			}
		});
		return actAndAsserts;
	}

	resetResults() {
		this.asserts.forEach(function(assert) {
			assert.result = undefined;
		});
		this.errorMessage = undefined;
	}
}


export default [
	new Quiz('Write a function that merges the properties of an arbitrary number of objects to one object.',
		'function merge(root) \ {\n\tfor ( var i = 1; i < arguments.length; i++ )\n\t\tfor ( var key in arguments[i] )\n\troot[key] = arguments[i][key];\n\treturn root;\n}',
		"var merged = merge({name: 'Wolfgang'}, {city: 'Nuernberg'});", [{
			code: "assert(merged.name === 'Wolfgang');"
		}, {
			code: "assert(merged.city === 'Nuernberg');"
		}],
		"The arguments object is a very flexible way to handle values that are passed into a function. It is available in every function and contains all passed arguments. Note that arguments is similar (it has a length property) but not equal to an array (no other properties except of array)."),
	new Quiz("Create an object literal 'foo' containing a function 'isCalledInGlobalContext' that checks if the context is global and returns different results depending on the way it is called.",
		'var foo = {\n\tisCalledInGlobalContext: function() {\n\t\t return this === window;\n\t}\n};',
		"var result1 = foo.isCalledInGlobalContext();\nvar fx = foo.isCalledInGlobalContext, result2 = fx();", [{
			code: "assert(result1 === false);"
		}, {
			code: "assert(result2 === true);"
		}],
		"The context (i.e. value of 'this') of a function is determined by <i>how</i> the function is called. If you call a function 'directly' (in our case with the help of a the reference fx) the context will be the global object - a lot of people are surprised by the results of the so-called 'function invocation'. The results of the 'method invocation' are what most people would expect: the context is the object which is called."),
	new Quiz("Create an object literal 'foo' with a nested object 'bar' that contains a function 'getContext' that returns the context",
		'var foo = {\n\tbar: {\n\t\tgetContext: function() {\n\t\t\treturn this;\n\t\t}\n\t}\n};',
		"var result = foo.bar.getContext();", [{
			code: "assert(result === foo.bar);"
		}],
		"Using 'method invocation' the context is the object to which the function directly belongs. This is 'bar' in our case - not 'foo'!"
	),
	new Quiz("Extend the function produceTunedCar in a way that it returns the car tuned by the tuner function without binding the function.",
		"function produceTunedCar(car, tuner) { \n\ttuner.call(car, 'tuned by ABT', 40)\n\treturn car;\n}",
		"var result = produceTunedCar({ type: 'Audi TT', horsePower: 200 }, \n\tfunction(typeExtension, horsePowerToAdd) { this.type = this.type + ' ' + typeExtension; this.horsePower += horsePowerToAdd; });", [{
			code: "assert(result.type === 'Audi TT tuned by ABT')",
			msg: 'make has been extended with the type'      
		},        {         
			code: "assert(result.horsePower === 240)",
			msg: 'has more power now'
		}],
		"the apply invocation pattern can be used when you have a function available, e.g. one that was passed as an argument to your function. It makes use of the fact that apply and call are methods on the Function prototype and thus are available for every function. Both take the context as the first parameter, followed by a comma separated list of other parameters for call and an array for apply."),
	new Quiz("Extend the function produceTunedCar so that it returns the car tuned by the tuner function, but avoid the apply invocation pattern.",
		"function produceTunedCar(car, tuner) { \n\ttuner = tuner.bind(car);\n\ttuner('tuned by ABT', 40)\n\treturn car;\n}",
		"var result = produceTunedCar({ type: 'Audi TT', horsePower: 200 }, \n\tfunction(typeExtension, horsePowerToAdd) { this.type = this.type + ' ' + typeExtension; this.horsePower += horsePowerToAdd; });",
		 [{
			code: "assert(result.type === 'Audi TT tuned by ABT')",
			msg: 'make has been extended with the type'
		 },{
		 	code: "assert(result.horsePower === 240)",
		 	msg: 'has more power now'
		 }],
		 "Function prototype's bind function (introduced with ES5) takes care that the context points to the first argument with which bind was called. Note that once a function has been bound, they do not care how they have are called (e.g. with the apply invocation pattern): the context is always the one determined by the binding. Single exception is the constructor invocation pattern.")
];
