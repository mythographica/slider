import React from "react";

const Title = function () {
	Object.assign(this, this.slides.current);
};

Title.prototype.View = function () {
	const app = this;
	return (
		<div className="SlideContent">
			<div className="Title" onClick={app.clickNext} >
				<h1>{this.title}</h1>
				<h1 className="subtitle">{this.subtitle}</h1>
			</div>
		</div>
	);
};

export default Title;