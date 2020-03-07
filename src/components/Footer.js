import React from "react";

import { NICK_TITLE } from '../config';

const Footer = ({ count, index, level }) => {
	
	count = `${count}`;
	index = `${index}`.padStart(count.length, '0');
	
	return (
		<div className="Footer">
			<h3 className="myname">{NICK_TITLE}</h3>
			<h3 className="slides"> { index }.{ level } » { count }</h3>
		</div>
	);
};

export default Footer;