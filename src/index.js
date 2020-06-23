import {Component} from 'react-dom';

import {define, defaultNamespace} from "mnemonica";
// import {define} from "mnemonica";

import {Slide, Title, Starter, MDX, Footer, Progressor} from './components';

import Keys from './keyboard';

import Main from './main';
import postHook from './postCreation';


defaultNamespace.registerHook('postCreation', postHook);

const App = define('Main', Main);

const SlideRoot = App.define('Slide', Slide);

SlideRoot.define('Title', Title);

const SlideStarter = SlideRoot.define('Starter', Starter);
SlideStarter.define('Progressor', Progressor);
SlideStarter.define('Footer', Footer);

const SlideMDX = SlideRoot.define('MDX', MDX);
SlideMDX.define('Progressor', Progressor);
SlideMDX.define('Footer', Footer);

const app = App.call(Component, 'root');
// const app = new App('root');

window.onerror = function (...args) {
	// debugger;
	app.setErrored(...args);
};

app.init()
	.then(app.start)
	.then(() => {
		if (app.print) return;
		Keys.call(app);
		// new app.Keys();
	});


