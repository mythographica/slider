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

const App = define(Main);
const Slide = App.define(Root);
	Slide.define(Title);
	Slide.define(Header);
	Slide.define(Mdx);

const app = App.call(Component, 'root');
// const app = new App('root');

app.init()
	.then(app.start)
	.then(initKeyboard.bind(app));

