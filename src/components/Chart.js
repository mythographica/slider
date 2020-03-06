import React from "react";
import tree from './Chart/tree';

const charts = {
	tree,
};

const Chart = function (props) {
	
	const {
		id,
		opts,
	} = props;
	const {
		chart
	} = opts;
	
	const appendSVG = function (chartRoot) {
		const chartSVG = charts[chart.type](chart);
		if (chartRoot) {
			chartRoot.append(chartSVG);
		}
	};
	
	return (<div ref={appendSVG} id={id} className='Chart'>{opts.title}</div>);
};

export default Chart;