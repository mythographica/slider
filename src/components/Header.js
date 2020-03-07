import React from "react";
import { Progress } from 'theme-ui';

const Header = function () {
	Object.assign(this, this.slides.current);
};

Header.prototype.View = function () {
	const {
		FooterView,
		counters
	} = this;
	return (
		<div className="Header">
			<Progress min={1} max={counters.count} value={counters.index}></Progress>
			<h1>{ this.title }</h1>
			<FooterView />
		</div>
	);
};

export default Header;