// Smooth scroll for navbar buttons (nav-link id is required)
const links = document.querySelectorAll('.nav-link');

for (const link of links) {
    link.addEventListener('click', clickHandler);
}

function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;

    scroll({
        top: offsetTop,
        behavior: 'smooth'
    });
}