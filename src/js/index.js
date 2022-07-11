import 'normalize.css';
import '../css/variables.css';

import '../css/index.css';
import '../css/header.css';
import '../css/main-start-view.css';
import '../css/news.css';
import '../css/about-us.css';
import '../css/last-track.css';
import '../css/gallery.css';
import '../css/slider.css';
import '../css/footer.css';

import smoothScroll from './modules/smooth-scroll';
import audio from './modules/audio';
import slider from './modules/slider';

const newSinglePlayer = {
	currentPlayer: null,
	track: document.querySelector('#newSinglePlay ~ audio').getAttribute('src'),
	constrols: {
		playBut: document.querySelector('#newSinglePlay'),
		timeLine: document.querySelector('#newSingleTimeLine'),
		fullTime: document.querySelector('#newSingleTimeEnd'),
	},
};

const lastTrackPlayer = {
	currentPlayer: null,
	trackContainer: document.querySelector('#lastTrackList'),
	trackList: document.querySelectorAll('#lastTrackList .lastTrackItem'),
	controls: {
		playBut: document.querySelector('#lastTrackPlay'),
		timeLine: document.querySelector('#lastTrackTimeLine'),
		fullTime: document.querySelector('#lastTrackTimeEnd'),
	},
};

newSinglePlayer.currentPlayer = audio(newSinglePlayer.track, newSinglePlayer.constrols);

const removeActivePlayerStyle = () => {
	lastTrackPlayer.trackList.forEach((item) => item.classList.remove('lastTrackItem-active'));
};

const setActiveTrack = (item, noAutoPlay) => {
	removeActivePlayerStyle();

	item.classList.add('lastTrackItem-active');
	const musicSrc = item.querySelector('audio').getAttribute('src');

	if (lastTrackPlayer.currentPlayer) {
		lastTrackPlayer.currentPlayer.remove();
	}

	lastTrackPlayer.currentPlayer = audio(musicSrc, lastTrackPlayer.controls);

	if (noAutoPlay) {
		return;
	}
	lastTrackPlayer.currentPlayer.playTrigger();
};

lastTrackPlayer.trackContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('lastTrackItem')) {
		setActiveTrack(e.target);
	}
});

setActiveTrack(lastTrackPlayer.trackList[0], true);

// Smooth
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothScroll(smoothLinks);

// Slider
const sliderWrapper = document.querySelector('.sliderWrapper');
slider(sliderWrapper);
