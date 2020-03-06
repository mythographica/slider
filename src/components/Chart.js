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
	
	setTimeout(() => {
		const chartRoot = document.getElementById(id);
		const chartSVG = charts[chart.type](chart);
		chartRoot.append(chartSVG);
	}, 100);
	
	return (<div id={id} className='Chart'>{opts.title}</div>);
};

export default Chart;