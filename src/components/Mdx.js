import React from "react";
import MDX from '@mdx-js/runtime';
import mdx from '@mdx-js/mdx';
import { ThemeProvider } from 'theme-ui';
import { dark } from '@theme-ui/presets';
import Prism from '@theme-ui/prism';

import Chart from './Chart';

import { Box, Heading } from 'theme-ui';

const Mdx = function () {
	this.data = this.slides.current.data;
};

Mdx.prototype.View = function () {
	
	const me = this;
	
	const {
		data
	} = me;
	
	const jsx = mdx.sync(data);
	
	const app = function (proto) {
		const key = proto.slide.key;
		const split = key.split('.');
		const data = split.reduce((answer, name) => {
			answer = answer[name];
			return answer;
		}, me);
		return `${data}`;
	};

	const components = {
		code: Prism,
		Heading,
		Box,
		app,
		Chart,
	};
	
	const scope = {
		jsx,
		app : me
	};
	
	// const MDXContent = Object.assign({}, data, { jsx });
	const MDXContent = data;
	
	return (
		<ThemeProvider theme={dark}>
			<div className="Slide MDX">
				<MDX components={components} scope={scope}>
					{MDXContent}
				</MDX>
			</div>
		</ThemeProvider>
	);
};

export default Mdx;