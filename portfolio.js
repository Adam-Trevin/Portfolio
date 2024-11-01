document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector('.carousel');
  const indicators = document.querySelectorAll('.indicator');
  const closeBtn = document.getElementById('close-btn');
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID;
  let currentIndex = 0;
  let isClicking = true;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

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
          if (Math.abs(currentPosition - startPos) > 10) {
              isClicking = false;
          }
      }
  };

  const touchEnd = () => {
      isDragging = false;
      cancelAnimationFrame(animationID);
      const movedBy = currentTranslate - prevTranslate;
      if (movedBy < -100 && currentIndex < indicators.length - 1) {
          currentIndex += 1;
      } else if (movedBy > 100 && currentIndex > 0) {
          currentIndex -= 1;
      }
      setPositionByIndex();
      carousel.style.transition = 'transform 0.5s ease-in-out';
  };

  const showPopup = (popupId) => {
      document.querySelectorAll('.popup').forEach(popup => {
          popup.style.display = 'none';
      });
      const popup = document.getElementById(popupId);
      if (popup) {
          popup.style.display = 'block';
          overlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
      }
      document.addEventListener('click', handleClickOutside);
  };

  const hideAllPopups = () => {
      document.querySelectorAll('.popup').forEach(popup => {
          popup.style.display = 'none';
      });
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      document.removeEventListener('click', handleClickOutside);
  };

  const handleClickOutside = (event) => {
      if (!event.target.closest('.popup') && !event.target.closest('.dropdown-button')) {
          hideAllPopups();
      }
  };

  document.querySelectorAll('.project').forEach(item => {
      item.addEventListener('click', (event) => {
          if (isClicking) {
              event.stopPropagation();
              if (document.querySelector('.popup[style*="block"]')) {
                  hideAllPopups();
              } else {
                  const popupId = item.getAttribute('onclick').match(/'(.+?)'/)[1];
                  hideAllPopups();
                  showPopup(popupId);
              }
          }
      });
  });

  closeBtn.addEventListener('click', hideAllPopups);
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

  // Dropdown buttons functionality
  document.querySelectorAll('.dropdown-button').forEach(button => {
      button.addEventListener('click', () => {
          const dropdown = button.nextElementSibling;
          if (dropdown && dropdown.classList.contains('dropdown-content')) {
              dropdown.classList.toggle('active');
          }
      });
  });
});
