
const errorHandler = [
	(error, inheritedInstance) => {
		const {
			// originalError,
			instance
		} = error;
		// console.error(originalError);
		instance.showRootError(`<pre>${ error }</pre>`);
	},

	(error, inheritedInstance) => {
		const {
			originalError,
			instance
		} = error;
		// console.error(originalError);
		instance.showRootError(`<pre>${ originalError.stack }</pre>`);
	},

	(error, inheritedInstance) => {

		const {
			// originalError,
			instance,
			// stack,
			exceptionReason: {
				method,
				methodName,
				applyTo
			}
		} = error;

		try {

			const {utils, mnemonica} = instance;
			const {lookup} = mnemonica;
			const {collectConstructors} = utils;

			// const correctError = new inheritedInstance.exception(error);
			// console.error('error object: ', error);

			window.lastError = error;
			console.error('лежит в window.lastError');

			console.error('error object instance: ', error.instance);
			window.lastErrorInstance = instance;
			console.error('лежит в window.lastErrorInstance');

			console.error('конструкторы error.instance в window.Chronotope');

			window.ChronotopeTimeLine = {
				[instance.constructor.name]: instance.__timestamp__,
				[instance.parent().constructor.name]: instance.parent().__timestamp__,
				[instance.parent().parent().constructor.name]: instance.parent().parent().__timestamp__
			};

			console.error('СТРУКТУРА наследования в window.errorInstanceTree');

			console.error('последовательность наследования в window.errorInstanceChain');

			window.exceptionReason = error.exceptionReason;
			console.error('ПРИЧИНА ошибки window.exceptionReason');

			window.Chronotope = {
				[instance.constructor.name]: instance.constructor,
				[instance.parent().constructor.name]: instance.parent().constructor,
				[instance.parent().parent().constructor.name]: instance.parent().parent().constructor
			};

			const names = [...new Set(collectConstructors(instance, true))];
			const typesNames = names.splice(0, 3);
			window.errorInstanceChain = [...typesNames, ...names.splice(-1)];

			const tnr = typesNames.reverse();
			// window.lookup4tests = lookup;
			window.exceptionConstructors = {
				[tnr[0]]: lookup(tnr[0]),
				[tnr[1]]: lookup(tnr.slice(0, 2).join('.')),
				[tnr[2]]: lookup(tnr.join('.'))
			};

			console.error('КОНСТРУКТОРЫ : в window.exceptionConstructors');

			console.error('TimeLine в window.ChronotopeTimeLine');


		} catch (erroredInside) {
			debugger;
		}


		// console.error('errored object: ', instance);
		const strings = [];
		strings.push(`<h1>мы можем собрать вот это :</h1>`);
		// strings.push(`<pre>${ error }</pre>`);
		// strings.push(`<br/><hr/><br/>`);
		// strings.push(`<h1>да, это данные с самого слайда</h1>`);
		// strings.push(`<h1>да, это прям сейчас извлечено из ошибки</h1>`);
		// strings.push(`<h1>да, это воспроизводимо</h1>`);
		strings.push(`<br/><hr/><br/>`);
		strings.push(`<h1>1. анализ конструктора:</h1>`);
		strings.push(`<pre>instance.constructor: ${ instance.constructor.name }</pre>`);
		strings.push(`<pre>instance.parent(): ${ instance.parent().constructor.name }</pre>`);
		strings.push(`<pre>parent -> parent: ${ instance.parent().parent().constructor.name }\n\n</pre>`);
		strings.push(`<h1>2. аргументы конструктора:</h1>`);
		strings.push(`<pre>\nSlide Data: " ${ instance.data.trim() } "\n</pre>`);
		// strings.push(`<h1>3. достаточный stack-trace:</h1>`);
		// strings.push(`<pre>${ stack }</pre>`);
		strings.push(`<br/><hr/><br/>`);
		strings.push(`<h1>3. и ещё немножеско:</h1>`);
		strings.push(`<pre>Упало в методе [ ${ methodName } ] объекта ${ applyTo.constructor.name } </pre>`);
		strings.push(`<pre>сам метод:</pre>`);
		strings.push(`<pre>${ method }</pre>`);
		strings.push(`<br/><hr/><br/>`);
		strings.push(`<h1>а теперь посмотрим в консоль...</h1>`);
		instance.showRootError(strings.join(''));
	},

	// (error, inheritedInstance) => {
	// 	const {
	// 		// originalError,
	// 		instance,
	// 		stack,
	// 		exceptionReason: {
	// 			method,
	// 			methodName,
	// 			applyTo
	// 		}
	// 	} = error;
	// 	// const correctError = new inheritedInstance.exception(error);
	// 	console.error('error object: ', error);
	// 	console.error('errored object: ', instance);
	// 	const strings = [];
	// 	strings.push(`<h1>мы можем собрать всё это:</h1>`);
	// 	strings.push(`<pre>${ error }</pre>`);
	// 	strings.push(`<br/><hr/><br/>`);
	// 	strings.push(`<h1>да, это данные с самого слайда</h1>`);
	// 	strings.push(`<h1>да, это прям сейчас извлечено из ошибки</h1>`);
	// 	strings.push(`<h1>да, это воспроизводимо</h1>`);
	// 	strings.push(`<br/><hr/><br/>`);
	// 	strings.push(`<h1>1. анализ конструктора:</h1>`);
	// 	strings.push(`<pre>instance.constructor.name: ${ instance.constructor.name }</pre>`);
	// 	strings.push(`<pre>instance.parent(): ${ instance.parent().constructor.name }</pre>`);
	// 	strings.push(`<pre>parent -> parent: ${ instance.parent().parent().constructor.name }\n\n</pre>`);
	// 	strings.push(`<h1>2. аргументы конструктора:</h1>`);
	// 	strings.push(`<pre>\nSlide Data: " ${ instance.data.trim() } "\n\n\n</pre>`);
	// 	strings.push(`<h1>3. достаточный stack-trace:</h1>`);
	// 	strings.push(`<pre>${ stack }</pre>`);
	// 	strings.push(`<br/><hr/><br/>`);
	// 	strings.push(`<h1>и ещё немножеско:</h1>`);
	// 	strings.push(`<pre>Упало в методе [ ${ methodName } ] объекта ${ applyTo.constructor.name } </pre>`);
	// 	strings.push(`<pre>сам метод:</pre>`);
	// 	strings.push(`<pre>${ method }</pre>`);
	// 	strings.push(`<br/><hr/><br/>`);
	// 	strings.push(`<h1>а теперь посмотрим в консоль...</h1>`);
	// 	instance.showRootError(strings.join(''));
	// },

	(error, inheritedInstance) => {
		const {
			originalError,
			instance
		} = error;
		console.error(originalError);
		const strings = [];
		strings.push(`<h1>* &mdash; ${ instance.slides.current.title }</h1>`);
		strings.push(`<pre>${ originalError.stack }</pre>`);
		instance.showRootError(strings.join(''));
	},


	(error, inheritedInstance) => {
		const {
			// originalError,
			instance
		} = error;
		console.error(error);
		const strings = [];
		strings.push(`<h1>3. достаточный stack-trace:</h1>`);
		strings.push(`<pre>${ error.stack }</pre>`);
		instance.showRootError(strings.join(''));
	},

	(error, inheritedInstance) => {
		const {
			originalError,
			instance
		} = error;
		console.error(originalError);
		const strings = [];
		strings.push(`<h1>* &mdash; ${ instance.slides.current.title }</h1>`);
		strings.push(`<pre>*${ error }</pre>`);
		instance.showRootError(strings.join(''));
	},

	(error, inheritedInstance) => {
		const {
			setErrored
		} = inheritedInstance.slides.current;
		if (setErrored) {
			debugger;
			inheritedInstance.setErrored(error);
		}
		throw error.originalError;
	}

];

export default function ({inheritedInstance}) {
	// Object.entries(Object.getPrototypeOf(inheritedInstance)).forEach(([name, value]) => {

	Object.entries(inheritedInstance).forEach(([name, value]) => {
		if (typeof value === 'function') {
			inheritedInstance[name] = (...args) => {

				if (inheritedInstance.constructor.name === 'MDX' && inheritedInstance.failConstructorItself) {
					debugger;
				}

				try {
					const data = value.call(inheritedInstance, ...args);
					return data;
				} catch (error) {
					// debugger;
					const {
						errorMode
					} = inheritedInstance.slides.current;
					return errorHandler[errorMode || 0](error, inheritedInstance) || null;
				}
			}
		}
	});
};
