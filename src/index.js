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

