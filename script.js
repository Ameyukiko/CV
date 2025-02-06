const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeIn 0.8s ease-out forwards';
        observer.unobserve(entry.target); // Stop observing once animation is triggered
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.opacity = '0';
      observer.observe(section);
    });
  
    // Initialize progress bars
    animateProgressBarsOnScroll();
  });
  
  // Enhanced progress bar animation
  function animateProgressBarsOnScroll() {
    const progressBars = document.querySelectorAll('.progress-bar');
    const progressObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const targetWidth = progressBar.getAttribute('style').match(/width:\s*(\d+)%/)[1];
          progressBar.style.width = '0%';
          setTimeout(() => {
            progressBar.style.width = targetWidth + '%';
          }, 100);
          observer.unobserve(progressBar);
        }
      });
    }, observerOptions);
  
    progressBars.forEach(bar => {
      progressObserver.observe(bar);
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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