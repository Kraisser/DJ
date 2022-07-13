import pauseIcon from '../../assets/icons/pause.png';
import playIcon from '../../assets/icons/play.png';

export default function audio(audioEl, controls, pauseOther) {
	const audioSrc = audioEl.getAttribute('src');
	const audioObj = new Audio(audioSrc);

	const {playBut, timeLine, fullTime} = controls;
	const progressTimeLine = timeLine.querySelector('.musicTimeLinePlayed');
	const playedTarget = fullTime.querySelector('div:nth-child(1)');
	const durationTarget = fullTime.querySelector('div:nth-child(3)');

	let duration = 0;
	audioObj.volume = 0.4;

	const setMetaData = () => {
		duration = Math.floor(audioObj.duration);

		const min = Math.floor(duration / 60);
		const sec = duration % 60;

		const durationTime = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;

		durationTarget.innerHTML = durationTime;
	};

	const onClickTimeLine = (e) => {
		const width = e.currentTarget.clientWidth;
		const clickPos = e.offsetX;

		const newProgress = (clickPos / width) * 100;

		audioObj.currentTime = (duration * newProgress) / 100;
	};

	const playTrigger = () => {
		if (audioObj.paused) {
			if (pauseOther) {
				pauseOther();
			}
			audioObj.play();
		} else {
			stop();
		}
	};

	const stop = () => audioObj.pause();

	const setTimeLine = () => {
		const progress = ((audioObj.currentTime / duration) * 100).toFixed(2);

		progressTimeLine.style.width = progress + '%';
	};

	const setTimeValue = () => {
		const fullSec = Math.floor(audioObj.currentTime);

		const min = Math.floor(fullSec / 60);
		const sec = fullSec % 60;
		const playedTime = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;

		playedTarget.innerHTML = playedTime;
	};

	const timeUpdate = () => {
		setTimeLine();
		setTimeValue();
	};

	audioObj.addEventListener('loadedmetadata', setMetaData);

	audioObj.addEventListener('timeupdate', timeUpdate);

	audioObj.addEventListener('play', () => {
		playBut.setAttribute('src', pauseIcon);
	});

	audioObj.addEventListener('pause', () => {
		playBut.setAttribute('src', playIcon);
	});

	timeLine.addEventListener('click', onClickTimeLine);

	playBut.addEventListener('click', playTrigger);

	const remove = () => {
		audioObj.pause();
		audioObj.currentTime = 0;
		playBut.removeEventListener('click', playTrigger);
		timeLine.removeEventListener('click', onClickTimeLine);
	};

	return {
		remove,
		stop,
		playTrigger,
	};
}
