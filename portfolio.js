document.addEventListener("DOMContentLoaded", () => {
    function getItemCount() {
        return document.querySelectorAll('.item').length;
    }

    let prevBtn = document.getElementById('prev');
    let nextBtn = document.getElementById('next');
    let carousel = document.querySelector('.carousel');
    let indicator = carousel.querySelector('.indicators');
    let active = 0;
    let autoPlay;

    function getLastPosition() {
        return getItemCount() - 1;
    }

    function getItems() {
        return document.querySelectorAll('.item');
    }

    function updateIndicators() {
        const dotsContainer = indicator.querySelector('ul');
        dotsContainer.innerHTML = ''; // Clear old indicators
        const itemCount = getItemCount();

        for (let i = 0; i < itemCount; i++) {
            const dot = document.createElement('li');
            if (i === active) {
                dot.classList.add('active');
            }
            dotsContainer.appendChild(dot);

            dot.onclick = () => {
                active = i;
                setSlider();
                startAutoPlay(); // Reset timer when clicking on an indicator
            };
        }
    }

    const startAutoPlay = () => {
        clearInterval(autoPlay);
        autoPlay = setInterval(() => {
            nextBtn.click();
        }, 5000);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlay);
    };

    const setSlider = () => {
        const items = getItems();
        updateIndicators();
        const dots = indicator.querySelectorAll('ul li');

        items.forEach(item => item.classList.remove('active'));
        items[active].classList.add('active');

        if (dots[active]) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[active].classList.add('active');
        }

        indicator.querySelector('.number').innerText = '0' + (active + 1);
    };

    nextBtn.onclick = () => {
        active = active + 1 > getLastPosition() ? 0 : active + 1;
        carousel.style.setProperty('--calculation', 1);
        setSlider();
        startAutoPlay(); // Reset timer when clicking Next
    };

    prevBtn.onclick = () => {
        active = active - 1 < 0 ? getLastPosition() : active - 1;
        carousel.style.setProperty('--calculation', -1);
        setSlider();
        startAutoPlay(); // Reset timer when clicking Prev
    };

    // Initial setup
    updateIndicators();
    setSlider();
    startAutoPlay();

    // Handling pop-ups
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    const showPopup = (popupId) => {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.style.display = 'block';
            overlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
            stopAutoPlay(); // Stop the autoplay when a pop-up is opened
        }
    };

    const hideAllPopups = () => {
        document.querySelectorAll('.popup').forEach(popup => {
            popup.style.display = 'none';
        });
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        startAutoPlay(); // Restart autoplay when all pop-ups are closed
    };

    overlay.addEventListener('click', hideAllPopups);

    document.querySelectorAll('.btn-en-savoir-plus').forEach(button => {
        button.addEventListener('click', () => {
            const popupId = button.getAttribute('data-popup-id');
            showPopup(popupId);
        });
    });

    document.querySelectorAll('.popup .close').forEach(closeButton => {
        closeButton.addEventListener('click', hideAllPopups);
    });

    // Gestion des dropdowns
    document.querySelectorAll('.dropdown-button').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            dropdownContent.classList.toggle('show');
            startAutoPlay(); // Reset timer when toggling a dropdown
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar ul li a");

    function changeActiveSection() {
        let scrollPosition = window.scrollY + window.innerHeight / 2; // Centrage du point de détection
        let activeSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });

        // Si on est tout en bas, forcer la dernière section
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 5) {
            activeSection = sections[sections.length - 1].getAttribute("id");
        }

        // Mettre à jour les liens de la navbar
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeSection}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", changeActiveSection);
    changeActiveSection(); // Pour initialiser la bonne section au chargement
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".navbar ul");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
        });
    });
});
