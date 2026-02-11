// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId === '#') return; // Ignore empty anchors
    
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Carousel functionality
function initCarousel() {
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.project-card');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  
  // Debug: Check if elements exist
  console.log('Carousel elements found:', {
    track: !!track,
    cards: cards.length,
    dots: dots.length,
    prevBtn: !!prevBtn,
    nextBtn: !!nextBtn
  });

  if (!track || cards.length === 0) {
    console.error('Carousel elements not found!');
    return;
  }

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel(index) {
    console.log('Updating carousel to index:', index);
    
    // Remove active from all
    cards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active to current
    if (cards[index]) {
      cards[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentIndex = index;
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next button clicked');
      const nextIndex = (currentIndex + 1) % totalCards;
      updateCarousel(nextIndex);
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Prev button clicked');
      const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
      updateCarousel(prevIndex);
    });
  }

  // Dots navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Dot clicked:', index);
      updateCarousel(index);
    });
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevBtn?.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn?.click();
    }
  });

  // Touch swipe support (mobile)
  if (track) {
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeThreshold = 50;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextBtn?.click(); // Swipe left
      }
      if (touchEndX > touchStartX + swipeThreshold) {
        prevBtn?.click(); // Swipe right
      }
    }
  }

  console.log('Carousel initialized successfully');
}

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}