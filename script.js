// Booking Modal
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".close");
const bookButtons = document.querySelectorAll(".book-btn");
const selectedTour = document.getElementById("selectedTour");

bookButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tour = btn.getAttribute("data-tour");
    selectedTour.textContent = "Tour: " + tour;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Scroll Animations
const elements = document.querySelectorAll("section, .card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, {threshold: 0.2});

elements.forEach(el => observer.observe(el));

// Hero Slider
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".slider-dots");

let index = 0;

// Create dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement("div");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".slider-dots div");

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove("active");
    dots[idx].classList.remove("active");
    if (idx === i) {
      slide.classList.add("active");
      dots[idx].classList.add("active");
    }
  });
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    index = idx;
    showSlide(index);
  });
});

// Auto Slide
setInterval(nextSlide, 5000);
// Carousel Function
function initCarousel(carouselSelector, prevBtnSelector, nextBtnSelector) {
  const carousel = document.querySelector(carouselSelector);
  const prevBtn = document.querySelector(prevBtnSelector);
  const nextBtn = document.querySelector(nextBtnSelector);

  let scrollAmount = 0;
  const cardWidth = carousel.querySelector("div").offsetWidth + 16;

  nextBtn.addEventListener("click", () => {
    scrollAmount += cardWidth;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0; // Reset to start
      carousel.style.transform = `translateX(0)`;
    }
  });

  prevBtn.addEventListener("click", () => {
    scrollAmount -= cardWidth;
    if (scrollAmount < 0) scrollAmount = 0;
    carousel.style.transform = `translateX(-${scrollAmount}px)`;
  });
}

// Initialize Carousels
initCarousel(".categories-carousel", ".prev-cat", ".next-cat");
initCarousel(".tours-carousel", ".prev-tour", ".next-tour");
document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  // Normally here you’d send data to server
  window.location.href = "booking-confirmation.html";
});
