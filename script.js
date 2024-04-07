const stickySection = document.querySelector('.sticky');
console.log(stickySection);


window.addEventListener('scroll', (e)=>{
        transform(stickySection);
})


function transform(section){
    const offsetTop= section.parentElement.offsetTop;
    const scrollSection = section.querySelector('.scroll-section');
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = percentage < 0 ? 0 : percentage > 200 ? 200 : percentage;
    console.log(percentage);
    scrollSection.style.transform = `translate3d(${-(percentage)}vw,0,0)`;
}