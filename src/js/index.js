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
	audioEl: document.querySelector('#newSingleAudio'),
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

const removeActivePlayerStyle = () => {
	lastTrackPlayer.trackList.forEach((item) => item.classList.remove('lastTrackItem-active'));
};

const pauseLastTrack = () => {
	if (lastTrackPlayer.currentPlayer) {
		lastTrackPlayer.currentPlayer.stop();
	}
};

const setActiveTrack = (item, noAutoPlay) => {
	removeActivePlayerStyle();

	item.classList.add('lastTrackItem-active');
	const audioEl = item.querySelector('audio');

	if (lastTrackPlayer.currentPlayer) {
		lastTrackPlayer.currentPlayer.remove();
	}

	lastTrackPlayer.currentPlayer = audio(audioEl, lastTrackPlayer.controls);

	if (noAutoPlay) {
		return;
	}
	lastTrackPlayer.currentPlayer.playTrigger();
	if (newSinglePlayer.currentPlayer) {
		newSinglePlayer.currentPlayer.stop();
	}
};

lastTrackPlayer.trackContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('lastTrackItem')) {
		setActiveTrack(e.target);
	}
});

setActiveTrack(lastTrackPlayer.trackList[0], true);

newSinglePlayer.currentPlayer = audio(
	newSinglePlayer.audioEl,
	newSinglePlayer.constrols,
	pauseLastTrack
);

// Smooth
const smoothLinks = document.querySelectorAll('a[href^="#"]');
smoothScroll(smoothLinks);

// Slider
const sliderWrapper = document.querySelector('.sliderWrapper');
slider(sliderWrapper);
