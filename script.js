const stickySection = document.querySelector('.sticky');
let lastScrollTop = 0;

window.addEventListener('scroll', ()=>{
    transform(stickySection);
})

function transform(section){
    const offsetTop= section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll-section');
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 200 ? 200 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw, 0, 0)`;
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

//script for when a section is into view, change .nav-line opacity to 1
//use intersection observer
// Select all navigation links
const navLinks = document.querySelectorAll('.nav-line');

// Options for the IntersectionObserver
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 // Change as needed
};

// Callback function for intersection
function intersectionCallback(entries, observer) {
  entries.forEach(entry => {
    // If section is in view
    const navLine = document.querySelector(`.nav-menu-item:has([href='#${entry.target.id}'] ) .nav-line `); 
    if (entry.isIntersecting) {
      // Change opacity of associated nav-line to 1

      if (navLine) {
        navLine.style.opacity = 1;
      }
    } else {
      // Reset opacity when section is not in view
      if (navLine) {
        navLine.style.opacity = 0;

      }
    }
  });
}

// Create IntersectionObserver
const observerWithHighThreshold = new IntersectionObserver(intersectionCallback, options);
const observerWithSmallThreshold = new IntersectionObserver(intersectionCallback, { ...options, threshold: 0.2 });
// Observe each section
document.querySelectorAll('section').forEach(section => {
  if (section.id === 'projects') {
    observerWithSmallThreshold.observe(section);
  } else {
    observerWithHighThreshold.observe(section);
  }
});