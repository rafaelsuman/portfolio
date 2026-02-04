// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Carousel Navigation
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.project-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel(index) {
    // Remove active from all
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active to current
    cards[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
  }

  // Next button
  nextBtn.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % totalCards;
    updateCarousel(nextIndex);
  });

  // Previous button
  prevBtn.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    updateCarousel(prevIndex);
  });

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });

  // Touch swipe support (mobile)
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
      nextBtn.click(); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
      prevBtn.click(); // Swipe right
    }
  }
});