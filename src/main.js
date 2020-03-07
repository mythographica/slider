import { STARTER_SLIDE } from './config';

import { defaultCollection } from "mnemonica";

const Main = function ( rootId ) {
	
	let slideListIndex = 0;
	let slideList = [];
	
	const slides = {
		count: 0,
		index: STARTER_SLIDE,
		list: [],
		slideListIndex,
		direction : 'next',
	};
	
	const print = /print$/.test(window.location.href);
	
	Object.assign(this, {
		rootId,
		print,
		slides
	});
	
	Object.defineProperty(this.slides, 'count', {
		get () {
			return this.list.length;
		}
	});
	
	Object.defineProperty(this.slides, 'current', {
		get () {
			return slideList[slideListIndex];
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
		}
	});
	
	Object.defineProperty(this.slides, 'slideList', {
		set (value) {
			
			slideList = value;
			if (this.direction === 'next') {
				slideListIndex = 0;
			} else {
				slideListIndex = slideList.length -1;
			}
			
		}
	});
	
	Object.defineProperty(this, 'counters', {
		get () {
			var progressCount = this.slides.count;
			var progressValue = this.slides.index;
			var progressIndex = this.slides.slideListIndex;
			
			if (print) {
				const split = rootId.split('_');
				progressCount = split[1];
				progressValue = split[2];
				progressIndex = split[3];
			}
			
			return {
				count : parseInt(progressCount),
				index : parseInt(progressValue) + 1,
				level : parseInt(progressIndex) + 1
			};
		
		}
	});
	
};

Main.prototype = {
	
	async init () {
		const list = await fetch('./slides/list.txt')
			.then(response => {
				return response.text();
			})
			.catch(error => {
				return error;
			})
			.then(data => {
				if (data instanceof Error) {
					window.alert('something wrong');
				}
				return data
					.split('\n')
					.filter(Boolean)
					.filter(name => name !== 'list.txt');
			});
			
		this.slides.list.push(...list);
		return this;
	},
	
	start () {
		if (this.print) {
			this.startPrint();
			return;
		}
		
		this.fetchSlide();
	},
	
	makeRender () {
		this.root = new this.Root();
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
			this.slides.index=0;
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
	
	_fetchSlide (slideFileName) {
		
		const [, ext] = slideFileName.split('.');
		
		const viewTypes = {
			md : 'Mdx',
			mdx : 'Mdx',
			jsx : 'Jsx',
		};
		
		const parser = ext === 'json' ? 'json' : 'text';
		
		return fetch(`./slides/${slideFileName}`)
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
						
						mdx = mdx.split('\n').map(it => it.trim()).join('\n');
						
						arr.push({
							view,
							data : mdx
						});
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
		
		slides.slideListIndex = 0;
		
		const slideFileName = list[index];
		
		this
			._fetchSlide(slideFileName)
			.then((slideList) => {
				
				
				if (this.print) {
					this.printFetched(slideList);
					return;
				}
				
				slides.slideList = slideList;
				slide.makeRender();
				
			});
			
	},
	
	startPrint () {
		document.body.style.overflow = 'auto';
		document.body.className = 'print';
		
		const rootElement = document.getElementById( this.rootId );
		const slidesCount = this.slides.list.length;
		
		this.slides.list.reduce((slides, slideName, index) => {
			
			const slideRootId = `slide_${slidesCount}_${index}`;
			const slide = this.fork(slideRootId, true);
			
			slide.slides.list = [slideName];
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
		
		const rootElement = document.getElementById( rootId );
		slideList.forEach((element, index) => {
			const slide2printId = `${rootId}_${index}`;
			const slide = this.fork(slide2printId, true);
			
			slide.slides.slideList = [element];
			
			const slide2print = document.createElement('div');
			slide2print.id = slide2printId;
			slide2print.className = 'slide2print';
			rootElement.appendChild(slide2print);
			
			slide.root = new slide.Root();
			
			// setTimeout(() => {
			slide.makeRender();
			// }, 1000);
		});
	},
	
	collectTypes (leaf = undefined, subtypes = defaultCollection) {
		return [...subtypes].reduce((o, [name, type]) => {
			const value = {
				name
			};
			if (type.subtypes instanceof Map && type.subtypes.size > 0) {
				value.children = this.collectTypes(leaf, type.subtypes);
			} else {
				if (typeof leaf === 'function') {
					value.children = leaf(value);
				}
				if (typeof leaf === 'string') {
					value.children = [{ name : `${name}${leaf}` }];
				}
			}
			o.push(value);
			return o;
		}, []);
	},
	
};

export default Main;