import React from "react";

const Starter = function () {
	Object.assign(this, this.slides.current);
};

Starter.prototype.View = function () {
	const {
		ProgressorView,
		FooterView,
		// counters
	} = this;
	return (
		<div className="StarterSlide">
			<ProgressorView />
			<div>
				<h1>{this.title}</h1>
				<p>{this.author}</p>
			</div>
			<FooterView />
		</div>
	);
};

export default Starter;