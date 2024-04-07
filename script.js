const stickySection = document.querySelector('.sticky');
let lastScrollTop = 0;


window.addEventListener('scroll', ()=>{
    let navSelector = document.querySelector('nav');
    transform(stickySection);

    let currentScroll = document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        navSelector.style.height = '0';
        navSelector.style.overflow = 'hidden';
    } else{
        navSelector.style.height = '70px';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

})


function transform(section){
    const offsetTop= section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll-section');
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 200 ? 200 : percentage;
    scrollSection.style.transform = `translate3d(${-(percentage)}vw,0,0)`;
}