import React from "react";

const Footer = ({ count, index, scale }) => {
	
	count = `${count}`;
	index = `${index}`.padStart(count.length, '0');
	
	return (
		<div className="Footer">
			<h3 className="myname">github@wentout</h3>
			<h3 className="slides"> { index } » { count }</h3>
		</div>
	);
};

export default Footer;