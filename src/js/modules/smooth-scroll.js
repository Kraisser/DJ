export default function smoothScroll(linkList) {
	if (linkList) {
		linkList.forEach((item) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				const id = item.getAttribute('href').slice(1);

				document.querySelector(`.anchorLink[name=${id}]`).scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			});
		});
	}
}
