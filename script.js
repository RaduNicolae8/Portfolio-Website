const stickySection = document.querySelector('.sticky');
const scrolledSections = new Set();

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

const navLinks = document.querySelectorAll('.nav-line');
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5 
};

function intersectionCallback(entries, observer) {
  entries.forEach(entry => {
    const navLine = document.querySelector(`.nav-menu-item:has([href='#${entry.target.id}'] ) .nav-line `);
    const navItem = document.querySelector(`.nav-menu-item:has([href='#${entry.target.id}'] )`);
    const left = navItem.querySelector('.left');
    const right = navItem.querySelector('.right');
    // const parent = document.querySelector('body');
    // const child = document.querySelector(`#${entry.target.id}`);
    // const childIndex = Array.from(parent.children).indexOf(child);
    
    if (entry.isIntersecting) {
      
      left.style.left=0;
      right.style.left=0;
      right.style.opacity=1;
      right.style.pointerEvents = 'auto';
      

      if (navLine) {
        navLine.style.opacity = 1;
      }
    } else {

      left.style.left='40px';
      right.style.left='40px';
      right.style.opacity=0;
      right.style.pointerEvents = 'none';
      
      if (navLine) {
        navLine.style.opacity = 0;
      }
    }
  });
}

const observerWithHighThreshold = new IntersectionObserver(intersectionCallback, options);
const observerWithSmallThreshold = new IntersectionObserver(intersectionCallback, { ...options, threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
  if (section.id === 'projects') {
    observerWithSmallThreshold.observe(section);
  } else {
    observerWithHighThreshold.observe(section);
  }
});