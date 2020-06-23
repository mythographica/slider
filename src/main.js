import {
	STARTER_SLIDE,
	SLIDES_DIR
} from './config';

import {mnemonica, utils, defaultCollection} from "mnemonica";
import Snowflakes from "magic-snowflakes";

const Main = function (rootId) {

	let slideListIndex = 0;
	let slideList = [];

	let errorMode = 0;

	const slides = {
		count: 0,
		index: STARTER_SLIDE,
		list: [],
		slideListIndex,
		direction: 'next',
	};

	const print = /print$/.test(window.location.href);

	Object.assign(this, {
		rootId,
		print,
		slides
	});

	this.errored = false;

	Object.defineProperty(this, 'mnemonica', {
		get () {
			return mnemonica;
		},
	});

	Object.defineProperty(this, 'utils', {
		get () {
			return utils;
		},
	});

	Object.defineProperty(this, 'defaultCollection', {
		get () {
			return defaultCollection;
		},
	});

	Object.defineProperty(this.slides, 'count', {
		get () {
			return this.list.length;
		}
	});

	Object.defineProperty(this.slides, 'current', {
		get () {
			const result = slideList[slideListIndex];

			if (result.settings && result.settings.length) {
				result.settings.forEach(opts => {
					Object.assign(result, opts);
				});
			}

			return result;
		}
	});

	Object.defineProperty(this.slides, 'slideListLength', {
		get () {
			return slideList.length;
		}
	});
	Object.defineProperty(this.slides, 'slideListIndex', {
		get () {
			return slideListIndex;
		},
		set (value) {
			slideListIndex = parseInt(value) || 0;
			if (window.sessionStorage) {
				window.sessionStorage.setItem('STARTER_SLIDE_LIST_INDEX', slideListIndex);
			}
		}
	});

	Object.defineProperty(this, 'errorMode', {
		get () {
			return errorMode;
		},
		set (value) {
			errorMode = parseInt(value) || 0;
		}
	});

	Object.defineProperty(this.slides, 'slideList', {
		set (value) {

			slideList = value;

			if (this.direction === 'next') {
				this.slideListIndex = 0;
			} else {
				this.slideListIndex = slideList.length - 1;
			}

		}
	});

	Object.defineProperty(this, 'counters', {
		get () {
			var progressCount = this.slides.count;
			var progressValue = this.slides.index;
			var progressIndex = this.slides.slideListIndex;
			var progressAmong = this.slides.slideListLength;

			var amount = 0;
			var current = 0;

			this.slides.list.forEach((name, idx) => {
				if (idx === progressValue) {
					current = amount + progressIndex;
				}
				amount = amount + parseInt(name.split(' ')[1]) + 1;
			});

			if (print) {
				const split = rootId.split('_');
				progressCount = split[1];
				progressValue = split[2];
				progressIndex = split[3];
			}

			return {
				count: progressCount,
				index: progressValue + 1,
				level: progressIndex + 1,
				among: progressAmong,

				amount: amount - 1,
				current
			};

		}
	});

	Object.defineProperty(this, 'failConstructorItself', {
		get () {
			return this.slides.current.failConstructorItself || false;
		},
	});

	const snowRoot = document.querySelector('#snowflakes-container');

	const snowflakes = new Snowflakes({
		color: 'white', // Default: "#5ECDEF"
		container: snowRoot, // Default: document.body
		count: 100, // 100 snowflakes. Default: 50
		minOpacity: 0.1, // From 0 to 1. Default: 0.6
		maxOpacity: 0.95, // From 0 to 1. Default: 1
		minSize: 20, // Default: 8
		maxSize: 50, // Default: 18
		rotation: true, // Default: true
		speed: 2, // The property affects the speed of falling. Default: 1
		wind: false, // Without wind. Default: true
		height: 1050, // Default: height of container
		zIndex: 100 // Default: 9999
	});
	snowflakes.stop();
	
	Object.defineProperty(this, 'startSnowflakes', {
		get () {
			return () => {
				snowRoot.style.display = 'block';
				snowflakes.start();
			}
		},
	});
	Object.defineProperty(this, 'stopSnowflakes', {
		get () {
			return () => {
				snowRoot.style.display = 'none';
				snowflakes.stop();
			}
		},
	});
};

Main.prototype = {

	async init () {
		const listPath = `./${ SLIDES_DIR }/list.txt`;
		const list = await fetch(listPath)
			.then(response => {
				return response.text();
			})
			.catch(error => {
				return error;
			})
			.then(data => {
				if (data instanceof Error) {
					window.alert('something gone wrong');
				}
				return data
					.split('\n')
					.filter(Boolean)
					.filter(name => {return name.indexOf('list.txt') === -1;});
			});

		this.slides.list.push(...list);

		return this;
	},

	start () {
		if (this.print) {
			this.startPrint();
			return;
		}

		this.starterPhase = true;

		if (window.sessionStorage) {
			const index = parseInt(window.sessionStorage.getItem('STARTER_SLIDE') || 0);
			if (index < this.slides.list.length) {
				this.setSlideIndex(index);
			}
		} else {
			this.fetchSlide();
		}

	},

	makeRender () {
		this.hideRootError();
		this.root = new this.Slide();
		this.root.View();
	},

	setSlideIndex (index) {
		const {
			count
		} = this.slides;

		if (index === undefined) {
			index = this.slides.index;
		} else {
			if (typeof index !== 'number') {
				throw new Error('index is not a number');
			}
			if (index >= 0 && index < count) {
				this.slides.index = parseInt(index, 10) || 0;
			} else if (index === -1) {
				this.slides.index = count - 1;
			} else {
				throw new Error('index is not valid');
			}
		}

		this.fetchSlide();

	},

	getNextSlide () {
		const {
			count
		} = this.slides;

		if (this.slides.index < count - 1) {
			this.slides.index++;
		} else {
			this.slides.index = 0;
		}

		this.slides.direction = 'next';
		this.setSlideIndex();

	},

	getPrevSlide () {

		if (this.slides.index > 0) {
			this.slides.index--;
		} else {
			this.slides.index = this.slides.count - 1;
		}

		this.slides.direction = 'prev';
		this.setSlideIndex();
	},

	slideNext () {
		const {
			slides
		} = this;
		const {
			slideListLength,
		} = slides;

		slides.slideListIndex = slides.slideListIndex + 1;
		if (slides.slideListIndex >= slideListLength) {
			this.getNextSlide();
		} else {
			this.makeRender();
		}
	},

	slidePrev () {
		const {
			slides
		} = this;
		slides.slideListIndex = slides.slideListIndex - 1;
		if (slides.slideListIndex < 0) {
			this.getPrevSlide();
		} else {
			this.makeRender();
		}
	},

	requestSlideNav () {
		const {
			count
		} = this.slides;
		const msg = `please input slide number between 1 an ${ count + 1 }`;
		const input = window.prompt(msg);
		var number;
		try {
			number = parseInt(input, 10) - 1;
			if (number === -1) {
				number = 0;
			}
		} catch (error) {
			window.alert('invalid input');
		}
		try {
			this.setSlideIndex(number);
		} catch (error) {
			window.alert(error.message);
		}
	},

	clickNext () {
		if (this.print) {
			return;
		}
		this.slideNext();
	},

	_fetchSlide (slideFileName) {

		const [, ext] = slideFileName.split('.');

		const viewTypes = {
			md: 'MDX',
			mdx: 'MDX',
			jsx: 'Jsx',
		};

		const parser = ext === 'json' ? 'json' : 'text';

		return fetch(`./${ SLIDES_DIR }/${ slideFileName }`)
			.then(response => {
				return response[parser]();
			})
			.catch(error => {
				return error;
			})
			.then(data => {
				if (data instanceof Error) {
					window.alert('something wrong');
				}

				let slideList = [''];

				if (ext === 'json') {
					if (Array.isArray(data)) {
						slideList = data;
					} else {
						slideList = [data];
					}
				} else {
					const view = viewTypes[ext];

					slideList = data.split('-----').reduce((arr, mdx) => {

						var isInsideCodeBlock = false;
						var settings = [];
						mdx = mdx.split('\n').map((line, idx) => {

							const result = line.trim();

							if (result.indexOf('```') === 0) {
								isInsideCodeBlock = !isInsideCodeBlock;
								return line;
							}

							if (idx === 1 && result.indexOf('[') === 0 && result.indexOf(']') === result.length - 1) {
								settings = JSON.parse(result);
								return '';
							}

							return isInsideCodeBlock ? line : result;

						}).join('\n');

						const slide = {
							view,
							data: mdx,
							settings: settings || [],
						};

						arr.push(slide);
						return arr;
					}, []);

				}

				return slideList;

			});
	},

	fetchSlide () {

		const slide = this;
		const {
			slides
		} = slide;

		const {
			index,
			list
		} = slides;

		const slideFileName = list[index].split(' ')[0];

		this
			._fetchSlide(slideFileName)
			.then((slideList) => {

				if (this.print) {
					this.printFetched(slideList);
					return;
				}

				let toBeSlideListIndex = 0;

				if (window.sessionStorage) {
					window.sessionStorage.setItem('STARTER_SLIDE', index);
					if (this.starterPhase) {
						this.starterPhase = false;
						toBeSlideListIndex = window.sessionStorage.getItem('STARTER_SLIDE_LIST_INDEX') || 0;
					}
				}

				slides.slideList = slideList;

				if (toBeSlideListIndex > 0 && toBeSlideListIndex < slideList.length) {
					slides.slideListIndex = toBeSlideListIndex;
				}

				slide.makeRender();

			});

	},

	startPrint () {
		document.body.style.overflow = 'auto';
		document.body.className = 'print';

		const rootElement = document.getElementById(this.rootId);
		const slidesCount = this.slides.list.length;

		this.slides.list.reduce((slides, slideName, index) => {

			const slideRootId = `slide_${ slidesCount }_${ index }`;
			const slide = this.fork(slideRootId, true);

			slide.slides.list = [slideName.split(' ')[0]];
			slide.slides.index = 0;

			const slideRoot = document.createElement('div');
			slideRoot.id = slideRootId;
			slideRoot.className = 'slideRoot';

			slides.push({
				slide,
				slideRootId,
				slideRoot,
			});

			rootElement.appendChild(slideRoot);
			slide.fetchSlide();
			return slides;
		}, []);
	},

	printFetched (slideList) {
		const {
			rootId
		} = this;

		const rootElement = document.getElementById(rootId);
		slideList.forEach((element, index) => {
			const slide2printId = `${ rootId }_${ index }`;
			const slide = this.fork(slide2printId, true);

			slide.slides.slideList = [element];

			const slide2print = document.createElement('div');
			slide2print.id = slide2printId;
			slide2print.className = 'slide2print';
			rootElement.appendChild(slide2print);

			slide.root = new slide.Slide();

			// setTimeout(() => {
			slide.makeRender();
			// }, 1000);
		});
	},

	collectTypes (leaf = undefined, subtypes) {
		if (subtypes === undefined) {
			subtypes = this.defaultCollection;
		}
		return [...subtypes].reduce((o, [name, type]) => {
			const value = {
				name,
				children: []
			};
			if (type.subtypes instanceof Map && type.subtypes.size > 0) {
				value.children = this.collectTypes(leaf, type.subtypes);
			} else {
				if (typeof leaf === 'function') {
					value.children = leaf(value);
				}
				if (typeof leaf === 'string') {
					value.children = [{name: `${ name }${ leaf }`}];
				}
			}
			o.push(value);
			return o;
		}, []);
	},
	
	collectTimestamps () {
		const instance = this;
		return {
			[instance.constructor.name]: new Date(instance.__timestamp__),
			[instance.parent().constructor.name]: new Date(instance.parent().__timestamp__),
			[instance.parent().parent().constructor.name]: new Date(instance.parent().parent().__timestamp__)
		};
	},

	rootError: document.getElementById('rootError'),

	hideRootError () {
		this.rootError.style.display = 'none';
	},

	showRootError (message) {
		this.rootError.style.display = 'block';
		this.rootError.innerHTML = `<pre>${ message }</pre>`;
	},

	setErrored (...args) {
		this.errored = args;
	},

	unsetErrored () {
		this.errored = false;
	},

};

export default Main;