import React from "react";
import { Progress } from 'theme-ui';
import MDX from '@mdx-js/runtime';
import mdx from '@mdx-js/mdx';
import Prism from '@theme-ui/prism';

import Chart from './Chart';

import { Box, Heading, Donut, Container, Message, Embed, Link, Badge, Grid, AspectRatio } from 'theme-ui';

const Mdx = function () {
	this.data = this.slides.current.data;
};

Mdx.prototype.View = function () {
	
	const me = this;
	
	const {
		data,
		FooterView,
		counters
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
		<div className="MDX">
			<Progress min={1} max={counters.count} value={counters.index}></Progress>
			<div className="SlideContent">
				<MDX components={components} scope={scope}>
					{MDXContent}
				</MDX>
			</div>
			<FooterView />
		</div>
	);
};

export default Mdx;