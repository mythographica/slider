import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'theme-ui';
import { dark } from '@theme-ui/presets';
import { Progress } from 'theme-ui';

import Footer from './Footer';

const Root = function () {
	this.rootElement = document.getElementById( this.rootId );
};

Root.prototype.View = function () {
	const app = this;
	
	const {
		slides,
	} = app;
	
	const {
		current,
		index,
		count
	} = slides;
	
	const {
		view
	} = current;
	
	const slide = new app[view]();
	const SlideView = slide.View;
	
	ReactDOM.render(
		<React.StrictMode>
			<ThemeProvider theme={dark}>
				<Progress min={0} max={count-1} value={index}></Progress>
				<SlideView />
				<Footer {...slides} />
			</ThemeProvider>
		</React.StrictMode>,
		this.rootElement
	);
};

export default Root;