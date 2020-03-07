import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'theme-ui';
import { dark } from '@theme-ui/presets';

const Root = function () {
	const app = this;
	
	this.rootElement = document.getElementById( this.rootId );
	
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
	this.SlideView = slide.View;
	
	this.footer = new slide.Footer(counters);
	this.FooterView = this.footer.View;

};

Root.prototype.View = function () {
	
	const {
		SlideView
	} = this;
	
	ReactDOM.render(
		<React.StrictMode>
			<ThemeProvider theme={dark}>
				<div className="Slide">
					<SlideView />
				</div>
			</ThemeProvider>
		</React.StrictMode>,
		this.rootElement
	);
};

export default Root;