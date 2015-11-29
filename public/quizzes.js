export default [{
	explanation: 'Write a function that merges the properties of an arbitrary number of objects to one object.',
	initialCode: 'function merge(root) \ {\n\tfor ( var i = 1; i < arguments.length; i++ )\n\t\tfor ( var key in arguments[i] )\n\troot[key] = arguments[i][key];\n\treturn root;\n}',
	act: "var merged = merge({name: 'Wolfgang'}, {city: 'Nuernberg'});",
	asserts: [{
		index: 0,
		code: "assert(merged.name === 'Wolfgang');"
	}, {
			index: 1,
			code: "assert(merged.city === 'Nuernberg');"
		}],
	takeaway: "The arguments object is a very flexible way to handle values that are passed into a function. It is available in every function and contains all passed arguments. Note that arguments is similar (it has a length property) but not equal to an array (no other properties except of array)."
}, {
		explanation: "Create an object literal 'foo' containing a function 'isCalledInGlobalContext' that checks if the context is global and returns different results depending on the way it is called.",
		initialCode: 'var foo = {\n\tisCalledInGlobalContext: function() {\n\t\t return this === window;\n\t}\n};',
		act: "var result1 = foo.isCalledInGlobalContext();\nvar fx = foo.isCalledInGlobalContext, result2 = fx();",
		asserts: [{
			index: 0,
			code: "assert(result1 === false);"
		}, {
				index: 1,
				code: "assert(result2 === true);"
			}],
		takeaway: "The context (i.e. value of 'this') of a function is determined by <i>how</i> the function is called. If you call a function 'directly' (in our case with the help of a the reference fx) the context will be the global object - a lot of people are surprised by the results of the so-called 'function invocation'. The results of the 'method invocation' are what most people would expect: the context is the object which is called."
	}, {
		explanation: "Create an object literal 'foo' with a nested object 'bar' that contains a function 'getContext' that returns the context",
		initialCode: 'var foo = {\n\tbar: {\n\t\tgetContext: function() {\n\t\t\treturn this;\n\t\t}\n\t}\n};',
		act: "var result = foo.bar.getContext();",
		asserts: [{
			index: 0,
			code: "assert(result === foo.bar);"
		}],
		takeaway: "Using 'method invocation' the context is the object to which the function directly belongs. This is 'bar' in our case - not 'foo'!"
	}, ];
