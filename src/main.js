import { STARTER_SLIDE } from './config';

import { defaultCollection } from "mnemonica";

const Main = function ( rootId ) {
	
	let slideListIndex = 0;
	let slideList = [];
	
	this.rootId = rootId;
	
	this.slides = {
		count: 0,
		index: STARTER_SLIDE,
		list: [],
		slideListIndex,
		direction : 'next',
	};
	
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
			
			if (Array.isArray(value)) {
				slideList = value;
				if (this.direction === 'next') {
					slideListIndex = 0;
				} else {
					slideListIndex = slideList.length -1;
				}
			} else {
				slideList = [value];
			}
			
		}
	});
};

Main.prototype = {
	async init () {
		this.root = new this.Root();
		const list = await fetch('./slides/list.txt')
			.then((response) => {
				return response.text();
			})
			.catch(error => {
				return error;
			})
			.then((data) => {
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
		this.fetchSlide();
	},
	
	makeRender () {
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

	fetchSlide () {
		const app = this;
		const {
			slides
		} = app;
		const {
			index,
			list
		} = slides;
		
		slides.slideListIndex = 0;
		
		const slideFileName = list[index];
		const [, ext] = slideFileName.split('.');
		
		const viewTypes = {
			md : 'Mdx',
			mdx : 'Mdx',
			jsx : 'Jsx',
		};
		
		const parser = ext === 'json' ? 'json' : 'text';
		
		fetch(`./slides/${slideFileName}`)
			.then((response) => {
				return response[parser]();
			})
			.catch(error => {
				return error;
			})
			.then((data) => {
				if (data instanceof Error) {
					window.alert('something wrong');
				}
				
				if (ext === 'json') {
					if (Array.isArray(data)) {
						slides.slideList = data;
					} else {
						slides.slideList = data;
					}
				} else {
					const view = viewTypes[ext];
					
					const slideList = data.split('-----').reduce((arr, mdx) => {
						
						mdx = mdx.split('\n').map(it => it.trim()).join('\n');
						
						arr.push({
							view,
							data : mdx
						});
						return arr;
					}, []);
					
					slides.slideList = slideList;
				}
				
				app.makeRender();
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