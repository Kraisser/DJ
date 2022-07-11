export default function slider(sliderWrapper) {
	const slidesContainer = sliderWrapper.querySelector('.slideItems');
	const prevBut = sliderWrapper.querySelector('.sliderButLeft');
	const nextBut = sliderWrapper.querySelector('.sliderButRight');
	const slideNodeList = slidesContainer.querySelectorAll('.slideItem');
	const slideList = [
		slideNodeList[slideNodeList.length - 1],
		...[...slideNodeList].slice(0, slideNodeList.length - 1),
	];
	const maxSlides = 5;
	const translateStep = slideList[0].offsetWidth + 30;

	const clearContainer = () => {
		while (slidesContainer.firstChild) {
			slidesContainer.firstChild.remove();
		}
	};

	const changeArr = (dir) => {
		if (dir === 'next') {
			const newItem = slideList.shift();
			slideList.push(newItem);
		} else {
			const newItem = slideList.pop();
			slideList.unshift(newItem);
		}

		enterSlides();
	};

	const nextSlide = () => {
		slidesContainer
			.querySelectorAll('.slideItem')
			.forEach((item) => (item.style.transform = `translateX(-${translateStep * 2}px)`));

		setTimeout(() => {
			changeArr('next');
			nextBut.addEventListener('click', nextSlide, {once: true});
		}, 500);
	};

	const prevSlide = () => {
		slidesContainer
			.querySelectorAll('.slideItem')
			.forEach((item) => (item.style.transform = 'translateX(0)'));

		setTimeout(() => {
			changeArr('prev');
			prevBut.addEventListener('click', prevSlide, {once: true});
		}, 500);
	};

	const enterSlides = () => {
		clearContainer();

		slideList.forEach((item, index) => {
			if (index >= maxSlides) {
				return;
			}
			item.style.transform = `translateX(-${translateStep}px)`;
			slidesContainer.append(item);
		});
	};

	enterSlides();

	nextBut.addEventListener('click', nextSlide, {once: true});
	prevBut.addEventListener('click', prevSlide, {once: true});
}
