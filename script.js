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
const INITIAL_DELAY_MS = 4000; // Initial 4 seconds delay on page load
const CUBE_ROTATION_DURATION_MS = 2000; // Cube rotation animation duration

// Function to update pagination arrow visibility based on active section
function updatePaginationArrows() {
  const activeSection = document.querySelector('.section.active');

  if (activeSection === sections[0]) {
    // Home section
    paginationRight.style.display = 'block';
    paginationLeft.style.display = 'none';
  } else if (activeSection === sections[4]) {
    // Contact section
    paginationRight.style.display = 'none';
    paginationLeft.style.display = 'block';
  } else {
    // Other sections: hide both arrows
    paginationRight.style.display = 'none';
    paginationLeft.style.display = 'none';
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

// Navbar click handling and cube rotation with section activation
navs.forEach((nav, idx) => {
  nav.addEventListener('click', () => {
    document.querySelector('.nav-list li.active').classList.remove('active');
    nav.classList.add('active');

    cube.style.transform = `rotateY(${idx * -90}deg)`;

    document.querySelector('.section.active').classList.remove('active');
    sections[idx].classList.add('active');

    // Manage contact section style action-contact based on active
    const array = Array.from(sections);
    const arrSecs = array.slice(1, -1);
    arrSecs.forEach((arrSec) => {
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

// Pagination arrow: go from Home to Contact
paginationRight.addEventListener('click', (e) => {
  e.preventDefault();

  navs[0].classList.remove('active');
  navs[4].classList.add('active');

  sections[0].classList.remove('active');
  sections[4].classList.add('active');
  sections[4].classList.add('action-contact');

  cube.style.transform = `rotateY(${4 * -90}deg)`;

  // Hide arrows immediately and show after rotation
  hidePaginationArrows();
  delayedArrowUpdate();
});

// Pagination arrow: go from Contact to Home
paginationLeft.addEventListener('click', (e) => {
  e.preventDefault();

  navs[4].classList.remove('active');
  navs[0].classList.add('active');

  sections[4].classList.remove('active');
  sections[4].classList.remove('action-contact');
  sections[0].classList.add('active');

  cube.style.transform = `rotateY(0deg)`;

  // Hide arrows immediately and show after rotation
  hidePaginationArrows();
  delayedArrowUpdate();
});

// Hide Contact section on page reload with delay
setTimeout(() => {
  sections[4].classList.remove('active');
}, 1500);

