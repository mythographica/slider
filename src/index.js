import { Component } from 'react-dom';

import { define, defaultNamespace } from "mnemonica";

import { Root, Title, Header, Mdx, Footer } from './components';

import Keys from './keyboard';

import Main from './main';
import postHook from './postCreation';

window.onerror = function (...args) {
	console.log(args);
	debugger;
};

defaultNamespace.registerHook('postCreation', postHook);

const App = define('Main', Main);
App.define('Keys', Keys);

const Slide = App.define('Root', Root);

	Slide
		.define('Title', Title)
		.define('Footer', Footer);

	Slide
		.define('Header',Header)
		.define('Footer', Footer);

	Slide
		.define('Mdx', Mdx)
		.define('Footer', Footer);

const app = App.call(Component, 'root');
// const app = new App('root');

app.init()
	.then(app.start)
	.then(() => {
		if (app.print) return;
		new app.Keys();
	});


