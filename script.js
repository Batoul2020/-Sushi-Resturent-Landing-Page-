
// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  
  // Change icon
  const icon = navToggle.querySelector('i');
  if (navMenu.classList.contains('show')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('show');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});


// Sticky Header on Scroll
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  // Add shadow to header when scrolled
  if (currentScroll > 50) {
    header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
  } else {
    header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip if href is just "#"
    
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Reservation Form Handling
const reservationForm = document.getElementById('reservationForm');

reservationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const formData = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    guests: document.getElementById('guests').value,
    notes: document.getElementById('notes').value
  };
  
  // Basic validation
  if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Show success message
  alert(`Thank you, ${formData.name}! Your reservation for ${formData.guests} guest(s) on ${formData.date} at ${formData.time} has been received. We'll contact you shortly at ${formData.phone} to confirm.`);
  
  // Reset form
  reservationForm.reset();
  
  // Optional: Scroll to top
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (email) {
      alert(`Thank you for subscribing! We'll send updates to ${email}`);
      emailInput.value = '';
    }
  });
}

// Hero Scroll Animation
const heroScroll = document.querySelector('.hero-scroll');

if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Add Active State to Navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.add('active');
    } else {
      document.querySelector(`.nav-link[href*="${sectionId}"]`)?.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class style
const style = document.createElement('style');
style.textContent = `
  .nav-link.active {
    color: var(--primary);
  }
  .nav-link.active::after {
    width: 100%;
  }
`;
document.head.appendChild(style);

// Intersection Observer for Fade-In Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .gallery-item, .menu-item').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Add fadeInUp keyframes if not already in CSS
const animStyle = document.createElement('style');
animStyle.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(animStyle);

// Set Minimum Date for Reservation
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const minDate = tomorrow.toISOString().split('T')[0];
  dateInput.setAttribute('min', minDate);
}

// Image Lazy Loading (Optional Enhancement)
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[src]');
  images.forEach(img => {
    img.setAttribute('loading', 'lazy');
  });
}

// Console Welcome Message
console.log('%c🍣 Welcome to Sushi Harmony! 🍱', 'font-size: 20px; font-weight: bold; color: #d32f2f;');
console.log('%cDeveloped with ❤️ by Batoul2020', 'font-size: 12px; color: #666;');
console.log('%chttps://github.com/Batoul2020', 'font-size: 12px; color: #d32f2f;');
