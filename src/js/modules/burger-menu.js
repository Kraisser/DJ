export default function burger(burgerWrapper, burgerBut) {
	const toggleMenu = () => {
		if (!burgerBut.classList.contains('burger-active')) {
			burgerOpen();
		} else {
			burgerClose();
		}
	};

	const burgerOpen = () => {
		burgerBut.classList.remove('burger-closed');
		burgerBut.classList.add('burger-active');

		burgerWrapper.classList.add('burgerMenuActive');
	};

	const burgerClose = () => {
		burgerBut.classList.remove('burger-active');
		burgerBut.classList.add('burger-closed');

		burgerWrapper.classList.remove('burgerMenuActive');
	};

	burgerBut.addEventListener('click', toggleMenu);
	burgerWrapper.addEventListener('click', burgerClose);
}
