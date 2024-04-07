const stickySection = document.querySelector('.sticky');
const hamburger = document.querySelector('.hamburger');
const hamburgerMenu = document.querySelector('.hamburger-menu');
let lastScrollTop = 0;


window.addEventListener('scroll', ()=>{
    let navSelector = document.querySelector('nav');
    let navSelectorMobile = document.querySelector('.mobile .container');
    console.log(navSelector);
    transform(stickySection);

    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll >= lastScrollTop) {
        navSelector.style.height = '0';
        navSelector.style.overflow = 'hidden';
        navSelectorMobile.style.height = '0';
        navSelectorMobile.style.overflow = 'hidden';
        hamburgerMenu.style.height = '0px';
        hamburgerMenu.style.padding = '0px'; 
    } else{
        navSelector.style.height = '70px';
        navSelectorMobile.style.height = '70px';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;


})

hamburger.addEventListener('click', ()=>{
  if (hamburgerMenu.style.height == '0px'){
    hamburgerMenu.style.height = '200px';
    hamburgerMenu.style.padding = '20px 0'; 
  } else{
    hamburgerMenu.style.height = '0px';
    hamburgerMenu.style.padding = '0px'; 

  } 
})


function transform(section){
    const offsetTop= section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll-section');
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 200 ? 200 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw,0,0)`;
}