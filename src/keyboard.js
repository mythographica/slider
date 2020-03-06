
export default function () {
	
	const app = this;
	const listener = new window.keypress.Listener();
	
	listener.simple_combo('left', app.slidePrev);
	listener.simple_combo('right', app.slideNext);
	listener.simple_combo('space', app.slideNext);
	listener.simple_combo('home', app.setSlideIndex.bind(app, 0));
	listener.simple_combo('end', app.setSlideIndex.bind(app, -1));
	listener.simple_combo('ctrl m', () => {
		const {
			count
		} = app.slides;
		const msg = `please input slide number between 1 an ${count+1}`;
		const input = window.prompt(msg);
		var number;
		try {
			number = parseInt(input, 10) - 1;
			if (number === -1) {
				number = 0;
			}
		} catch (error) {
			window.alert('invalid input');
		}
		try {
			app.setSlideIndex(number);
		} catch (error) {
			window.alert(error.message);
		}
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