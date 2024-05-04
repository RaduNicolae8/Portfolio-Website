const stickySection = document.querySelector(".sticky");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const windowWidth = window.innerWidth;
var buttonToggled = false;
var skillsVisitedOddTimes = false;
var lastScroll = 0;
var firstTimeSeeingHelloSection = 0;
var scrollSectionWidth;



window.addEventListener("scroll", () => {
  transform(stickySection);

  var scrollDirection = window.scrollY > lastScroll ? "down" : "up";

  if (!buttonToggled) {
    if (scrollDirection === "down") {
      hamburgerMenu.style.transform = "translateX(-100px)";
    } else {
      hamburgerMenu.style.transform = "translateX(0px)";
    }

    lastScroll = window.scrollY;
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const scrollSection = projects.querySelector(".scroll-section");
  scrollSectionWidth = window.getComputedStyle(scrollSection).width;
});

function transform(section) {
  var scrollSectionWidthVW = parseInt(scrollSectionWidth) / window.innerWidth * 100;

  const offsetTop = section.parentElement.offsetTop;
  const scrollSection = section.querySelector(".scroll-section");
  let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * (scrollSectionWidthVW/2);
  percentage = percentage < 0 ? 0 : percentage > scrollSectionWidthVW-40 ? scrollSectionWidthVW-40 : percentage;
  console.log("scroll ", window.scrollY-offsetTop," inner ", window.innerHeight," perc ", percentage);
  scrollSection.style.transform = `translate3d(${-percentage}vw, 0, 0)`;
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

const navLinks = document.querySelectorAll(".nav-line");
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};

function intersectionCallback(entries, observer) {
  entries.forEach((entry) => {
    const navLine = document.querySelector(
      `.nav-menu-item:has([href='#${entry.target.id}'] ) .nav-line `
    );
    const navItem = document.querySelector(
      `.nav-menu-item:has([href='#${entry.target.id}'] )`
    );
    const left = navItem.querySelector(".left");
    const right = navItem.querySelector(".right");

    if (entry.isIntersecting) {
      left.style.left = 0;
      right.style.left = 0;
      right.style.opacity = 1;
      right.style.pointerEvents = "auto";

      if (navLine) {
        navLine.style.opacity = 1;
      }
    } else {
      left.style.left = "40px";
      right.style.left = "40px";
      right.style.opacity = 0;
      right.style.pointerEvents = "none";

      if (navLine) {
        navLine.style.opacity = 0;
      }
    }
    var cards = document.querySelectorAll(".card");

    if (entry.target.id === "skills" && entry.isIntersecting) {
      document.querySelector(".skills .container").style.opacity = "1";
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translateX(0px)`;
        cards[i].style.opacity = 1;
      }
    } else if (entry.target.id === "skills") {
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.transform = `translate(-40vw)`;
        cards[i].style.opacity = 0;
      }
    }

    const line1 = document.querySelector("#line1");
    const line2 = document.querySelector("#line2");
    const line3 = document.querySelector("#line3");

    if (entry.target.id === "hello" && entry.isIntersecting) {
      line1.style.opacity = 1;
      line2.style.opacity = 1;
      line3.style.opacity = 1;
    } else if (entry.target.id === "hello") {
      line1.style.opacity = 0;
      line2.style.opacity = 0;
      line3.style.opacity = 0;
    }

    if (entry.target.id === "contact" && entry.isIntersecting) {
      document.querySelector(".contact .container").style.opacity = "1";
    } else if (entry.target.id === "contact") {
      document.querySelector(".contact .container").style.opacity = "0";
    }
  });
}

const observerWithHighThreshold = new IntersectionObserver(
  intersectionCallback,
  options
);
const observerWithSmallThreshold = new IntersectionObserver(
  intersectionCallback,
  { ...options, threshold: 0.2 }
);

document.querySelectorAll("section").forEach((section) => {
  if (section.id === "projects") {
    observerWithSmallThreshold.observe(section);
  } else if (section.id === "skills" && windowWidth < 840) {
    observerWithSmallThreshold.observe(section);
  } else {
    observerWithHighThreshold.observe(section);
  }
});

hamburgerMenu.addEventListener("click", () => {
  var verticalLine = document.querySelector(".vertical-line");
  var container = document.querySelector(".container");
  var items = document.querySelector(".items");
  var middleLine = document.querySelector(".middle-line");
  var bottomLine = document.querySelector(".bottom-line");
  var topLine = document.querySelector(".top-line");
  var nav = document.querySelector("nav");
  if (!buttonToggled) {
    verticalLine.style.transform = "translateX(0px)";
    container.style.transform = "translateX(0px)";
    hamburgerMenu.style.transform = "translateX(110px)";
    items.style.transform = "translateX(0px)";
    middleLine.style.opacity = 0;
    bottomLine.style.transform =
      "rotate(-45deg) translateY(-7.5px) translateX(8px)";
    topLine.style.transform = "rotate(45deg) translateY(7.5px) translateX(8px)";
  } else {
    verticalLine.style.transform = "translateX(-220px)";
    container.style.transform = "translateX(-220px)";
    hamburgerMenu.style.transform = "translateX(0px)";
    items.style.transform = "translateX(-220px)";

    middleLine.style.opacity = 1;
    bottomLine.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
    topLine.style.transform = "rotate(0deg) translateY(0px) translateX(0px)";
  }
  buttonToggled = !buttonToggled;
});
