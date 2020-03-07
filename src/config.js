const STARTER_SLIDE = parseInt(process.env.REACT_APP_STARTER_SLIDE || 0);
const NICK_TITLE = process.env.REACT_APP_SPEAKERNAME || 'github@wentout';
const SLIDES_DIR = process.env.REACT_APP_SLIDES_DIR || 'slides-example';

export {
	STARTER_SLIDE,
	NICK_TITLE,
	SLIDES_DIR,
};