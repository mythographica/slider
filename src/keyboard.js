const wrapErrored = function (method) {
	const app = this;
	return function () {
		if (app.errored) {
			window.alert('please press Ctrl + Esc to continue');
		} else {
			method();
		}
	}
};


export default function () {

	const app = this;

	const {
		slidePrev,
		slideNext,
		setSlideIndex,
		requestSlideNav,
		unsetErrored
	} = app;

	const w = wrapErrored.bind(this);

	const listener = new window.keypress.Listener();

	listener.simple_combo('left', w(slidePrev));
	listener.simple_combo('right', w(slideNext));
	listener.simple_combo('space', w(slideNext));
	listener.simple_combo('ctrl home', w(setSlideIndex.bind(app, 0)));
	listener.simple_combo('ctrl end', w(setSlideIndex.bind(app, -1)));
	listener.simple_combo('ctrl m', w(requestSlideNav));
	listener.simple_combo('ctrl esc', () => {
		unsetErrored();
	});

	/*
	window.onkeyup = function (event) {
		
		const {
			keyCode
		} = event;
		
		const where = CODES[keyCode];
		if (typeof app[where] === 'function') {
			app[where]();
		}
		
	};
	*/

};