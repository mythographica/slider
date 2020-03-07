import React from "react";

const Header = function () {
	Object.assign(this, this.slides.current);
};

Header.prototype.View = function () {
	return (
		<div className="Slide">
			<div className="Header">
				<h1>{ this.title }</h1>
			</div>
		</div>
	);
};

export default Header;