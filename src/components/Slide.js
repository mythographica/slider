import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from 'theme-ui';
import {dark} from '@theme-ui/presets';

const Slide = function () {
	const slide = this;

	if (this.failConstructorItself) {
		// debugger;
		throw new Error(`some ${ this.constructor.name } fail`);
	}

	this.rootElement = document.getElementById(this.rootId);

	const {
		slides,
		counters
	} = slide;

	const {
		current,
	} = slides;

	const {
		view,
		snowflakes
	} = current;
debugger;
	const slideRenderer = new slide[view]();
	this.SlideView = slideRenderer.View.bind(slideRenderer);

	if (slideRenderer.Footer instanceof Function) {
		this.footer = new slideRenderer.Footer(counters);
		this.FooterView = this.footer.View.bind(this.footer);
	}

	if (slideRenderer.Progressor instanceof Function) {
		this.progressor = new slideRenderer.Progressor();
		this.ProgressorView = this.progressor.View.bind(this.progressor);
	}

	this.stopSnowflakes();
	if (snowflakes) {
		this.startSnowflakes();
	}
};

Slide.prototype.View = function () {
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

export default Slide;