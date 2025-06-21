const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const portfolioLists = document.querySelectorAll('.portfolio-list');
const portfolioBoxs = document.querySelectorAll('.portfolio-box');

const paginationRight = document.getElementById('paginationRight');
const paginationLeft = document.getElementById('paginationLeft');

// Duration constants (in ms)
const INITIAL_DELAY_MS = 4000;      // Initial 4 seconds delay on page load
const CUBE_ROTATION_DURATION_MS = 2000;  // Cube rotation animation duration

// Function to get current active section index
function getActiveSectionIndex() {
  const activeSection = document.querySelector('.section.active');
  return Array.from(sections).indexOf(activeSection);
}

// Function to update pagination arrow visibility based on active section
function updatePaginationArrows() {
  const activeIndex = getActiveSectionIndex();
  
  if (activeIndex === 0) { // Home section
    paginationRight.style.display = 'block';
    paginationLeft.style.display = 'block';
    paginationRight.innerHTML = '<i class="bx bx-chevron-right"></i>';
    paginationLeft.innerHTML = '<i class="bx bx-chevron-left"></i>';
  } else if (activeIndex === sections.length - 1) { // Contact section
    paginationRight.style.display = 'block';
    paginationLeft.style.display = 'block';
    paginationRight.innerHTML = '<i class="bx bx-chevron-right"></i>';
    paginationLeft.innerHTML = '<i class="bx bx-chevron-left"></i>';
  } else { // Middle sections (about, resume, portfolio)
    paginationRight.style.display = 'block';
    paginationLeft.style.display = 'block';
    paginationRight.innerHTML = '<i class="bx bx-chevron-right"></i>';
    paginationLeft.innerHTML = '<i class="bx bx-chevron-left"></i>';
  }
}

// Function to hide both arrows immediately
function hidePaginationArrows() {
  paginationRight.style.display = 'none';
  paginationLeft.style.display = 'none';
}

// Delayed arrow update to allow rotation animation to complete
function delayedArrowUpdate(delay = CUBE_ROTATION_DURATION_MS) {
  setTimeout(() => {
    updatePaginationArrows();
  }, delay);
}

// Initial arrow visibility update with 4 seconds delay on page load
window.addEventListener('load', () => {
  // Initially hide arrows in case they are visible by default
  hidePaginationArrows();
  delayedArrowUpdate(INITIAL_DELAY_MS);
});

// Function to navigate to next section
function goToNextSection() {
  const activeIndex = getActiveSectionIndex();
  const nextIndex = (activeIndex + 1) % sections.length;
  navs[nextIndex].click();
}

// Function to navigate to previous section
function goToPrevSection() {
  const activeIndex = getActiveSectionIndex();
  const prevIndex = (activeIndex - 1 + sections.length) % sections.length;
  navs[prevIndex].click();
}

// Navbar click handling and cube rotation with section activation
navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    document.querySelector('.nav-list li.active').classList.remove('active');
    nav.classList.add('active');

    cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector('.section.active').classList.remove('active');
    sections[idx].classList.add('active');

    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1);
    arrSecs.forEach(arrSec => {
      if (arrSec.classList.contains('active')) {
        sections[4].classList.add('action-contact');
      }
    });
    if (sections[0].classList.contains('active')) {
      sections[4].classList.remove('action-contact');
    }

    // Hide arrows immediately on nav click, then show after animation delay
    hidePaginationArrows();
    delayedArrowUpdate();
  });
});

// Resume tabs handling
resumeLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    document.querySelector('.resume-list.active').classList.remove('active');
    list.classList.add('active');

    document.querySelector('.resume-box.active').classList.remove('active');
    resumeBoxs[idx].classList.add('active');
  });
});

// Portfolio tabs handling
portfolioLists.forEach((list, idx) => {
  list.addEventListener('click', () => {
    document.querySelector('.portfolio-list.active').classList.remove('active');
    list.classList.add('active');

    document.querySelector('.portfolio-box.active').classList.remove('active');
    portfolioBoxs[idx].classList.add('active');
  });
});

// Contact Me button links to Contact with delayed arrow update
document.getElementById('goToContact').addEventListener('click', function (e) {
  e.preventDefault();

  const navItems = document.querySelectorAll('.nav-list li');
  const contactNav = navItems[4];

  document.querySelector('.nav-list li.active').classList.remove('active');
  contactNav.classList.add('active');

  document.querySelector('.section.active').classList.remove('active');
  sections[4].classList.add('active');

  cube.style.transform = `rotateY(${4 * -90}deg)`;
  sections[4].classList.add('action-contact');

  hidePaginationArrows();
  delayedArrowUpdate();
});

// Pagination arrow: go to next section
paginationRight.addEventListener('click', e => {
  e.preventDefault();
  goToNextSection();
});

// Pagination arrow: go to previous section
paginationLeft.addEventListener('click', e => {
  e.preventDefault();
  goToPrevSection();
});

// Hide Contact section on page reload with delay
setTimeout(() => {
  sections[4].classList.remove('active');
}, 1500);

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    goToNextSection();
  } else if (e.key === 'ArrowLeft') {
    goToPrevSection();
  }
});

document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('formMessage');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    messageDiv.style.display = 'none';
    
    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            form.reset();
            showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showMessage('Oops! Something went wrong. Please try again later.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
    
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.style.color = type === 'success' ? '#0ef' : '#ff5555';
        messageDiv.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }
});