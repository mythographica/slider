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
		counters
	} = app;
	
	const {
		current,
	} = slides;
	
	const {
		view
	} = current;
	
	const slide = new app[view]();
	const SlideView = slide.View;
	
	ReactDOM.render(
		<React.StrictMode>
			<ThemeProvider theme={dark}>
				<Progress min={1} max={counters.count} value={counters.index}></Progress>
				<SlideView />
			</ThemeProvider>
			<Footer {...counters} />
		</React.StrictMode>,
		this.rootElement
	);
};

export default Root;