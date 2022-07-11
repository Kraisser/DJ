import pauseIcon from '../../assets/icons/pause.png';
import playIcon from '../../assets/icons/play.png';

export default function audio(url, controls) {
	const audioObj = new Audio(url);

	const info = {
		duration: 0,
	};

	audioObj.volume = 0.4;

	const {playBut, timeLine, fullTime} = controls;

	const playedTarget = fullTime.querySelector('div:nth-child(1)');
	const progressTimeLine = timeLine.querySelector('.musicTimeLinePlayed');

	const onClickTimeLine = (e) => {
		const width = e.currentTarget.clientWidth;
		const clickPos = e.offsetX;

		const newProgress = (clickPos / width) * 100;

		audioObj.currentTime = (info.duration * newProgress) / 100;
	};

	const playTrigger = () => (audioObj.paused ? audioObj.play() : stop());

	const stop = () => audioObj.pause();

	const setTimeLine = () => {
		const progress = ((audioObj.currentTime / info.duration) * 100).toFixed(2);

		progressTimeLine.style.width = progress + '%';
	};

	const setTimeValue = () => {
		const fullSec = Math.floor(audioObj.currentTime);

		const min = Math.floor(fullSec / 60);
		const sec = fullSec % 60;

		playedTarget.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
	};

	audioObj.addEventListener('timeupdate', () => {
		setTimeLine();
		setTimeValue();
	});

	audioObj.addEventListener('loadedmetadata', () => {
		info.duration = Math.floor(audioObj.duration);

		const min = Math.floor(info.duration / 60);
		const sec = info.duration % 60;

		const durationTarget = fullTime.querySelector('div:nth-child(3)');

		durationTarget.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
	});

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
		playTrigger,
		stop,
	};
}
