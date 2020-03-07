import React from "react";

import { NICK_TITLE } from '../config';

const Footer = function ({ count, index, level }) {
		
	this.count = `${count}`;
	this.index = `${index}`.padStart(count.length, '0');
	this.level = `${level}`;

};
	
Footer.prototype.View = function () {
	
	return (
		<div className="Footer">
			<span className="myname">{NICK_TITLE}</span>
			<span className="slides"> { this.index }.{ this.level } » { this.count }</span>
		</div>
	);
};


export default Footer;