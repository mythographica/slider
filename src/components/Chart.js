import React from "react";
import tree from './Chart/tree';
import pie from './Chart/pie';

const charts = {
	tree,
	pie,
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