document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector('.carousel');
    const indicators = document.querySelectorAll('.indicator');
    const popupOverlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const closeBtn = document.getElementById('close-btn');

    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    let isClicking = false;

    const getPositionX = (event) => {
        return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
    };

    const animation = () => {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    };

    const setSliderPosition = () => {
        carousel.style.transform = `translateX(${currentTranslate}px)`;
    };

    const setPositionByIndex = () => {
        currentTranslate = currentIndex * -carousel.offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
        updateIndicators();
    };

    const updateIndicators = () => {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    };

    const touchStart = (event) => {
        startPos = getPositionX(event);
        isDragging = true;
        isClicking = true;
        animationID = requestAnimationFrame(animation);
        carousel.style.transition = 'none';
    };

    const touchMove = (event) => {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            currentTranslate = prevTranslate + currentPosition - startPos;
            isClicking = false; // Setting isClicking to false if a drag is detected
        }
    };

    const touchEnd = () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && currentIndex < indicators.length - 1) {
            currentIndex += 1;
        }

        if (movedBy > 100 && currentIndex > 0) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        carousel.style.transition = 'transform 0.5s ease-in-out';
    };

    const showPopup = (title, description) => {
        popupTitle.textContent = title;
        popupDescription.textContent = description;
        popupOverlay.style.display = 'block';
        popup.style.display = 'block';
    };

    const hidePopup = () => {
        popupOverlay.style.display = 'none';
        popup.style.display = 'none';
    };

    document.querySelectorAll('.projet-item').forEach(item => {
        item.addEventListener('click', (event) => {
            if (isClicking) { // Check if it was a click and not a drag
                event.stopPropagation();
                const title = item.querySelector('h3').textContent;
                const description = item.getAttribute('data-description');
                showPopup(title, description);
            }
        });
    });

    popupOverlay.addEventListener('click', hidePopup);
    closeBtn.addEventListener('click', hidePopup);

    carousel.addEventListener('mousedown', touchStart);
    carousel.addEventListener('mouseup', touchEnd);
    carousel.addEventListener('mousemove', touchMove);
    carousel.addEventListener('mouseleave', () => {
        if (isDragging) touchEnd();
    });

    carousel.addEventListener('touchstart', touchStart);
    carousel.addEventListener('touchend', touchEnd);
    carousel.addEventListener('touchmove', touchMove);

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            setPositionByIndex();
        });
    });

    setPositionByIndex();
});

document.addEventListener("DOMContentLoaded", function() {
    const projetItems = document.querySelectorAll(".projet-item");
    const popupOverlay = document.getElementById("popup-overlay");
    const popup = document.getElementById("popup");
    const closeBtn = document.getElementById("close-btn");
    const popupTitle = document.getElementById("popup-title");
    const popupDescription = document.getElementById("popup-description");

    projetItems.forEach(item => {
        item.addEventListener("click", function() {
            const title = item.querySelector("h3").innerText;
            const description = item.getAttribute("data-description");

            popupTitle.innerText = title;
            popupDescription.innerHTML = description; // Use innerHTML to allow HTML content

            popupOverlay.classList.add("active");
            popup.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", function() {
        popupOverlay.classList.remove("active");
        popup.classList.remove("active");
    });

    popupOverlay.addEventListener("click", function() {
        popupOverlay.classList.remove("active");
        popup.classList.remove("active");
    });
});

