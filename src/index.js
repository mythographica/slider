import { Component } from 'react-dom';

import { define, defaultNamespace } from "mnemonica";

import { Root, Title, Header, Mdx } from './components';

import initKeyboard from './keyboard';
import Main from './main';
import postHook from './postCreation';

window.onerror = function (...args) {
	console.log(args);
	debugger;
};

defaultNamespace.registerHook('postCreation', postHook);

const App = define('Main', Main);
const Slide = App.define('Root', Root);
	Slide.define('Title', Title);
	Slide.define('Header',Header);
	Slide.define('Mdx', Mdx);

const app = App.call(Component, 'root');
// const app = new App('root');

app.init()
	.then(app.start)
	.then(initKeyboard.bind(app));

window.addEventListener('click', (e) => {
	if (e.target && e.target.tagName !== 'circle') {
		app.slideNext();
	}
});

// const rescale = () => {
// 	try {
// 		const {
// 			scrollWidth,
// 			clientWidth,
// 			offsetWidth,
// 		} = window.document.body;
// 		const minwidth = Math.min(scrollWidth, clientWidth, offsetWidth);
// 		const maxwidth = Math.max(scrollWidth, clientWidth, offsetWidth);
// 		const deltawidth = maxwidth / minwidth;
// 		const scale = minwidth / 1920 * deltawidth;
// 		if (scale < 1) {
// 			window.document.body.style.zoom = `${scale*100}%`;
// 			app.setScale(scale);
// 		}
// 	} catch (e) {}
// };

// window.setTimeout(rescale, 1000);
// window.addEventListener('resize', rescale);