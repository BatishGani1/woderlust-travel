const LS_KEY = 'wonderlust_kashmir_plans';

function getPlans() {
  const stored = localStorage.getItem(LS_KEY);
  if (stored) return JSON.parse(stored);
  
  // Local Kashmir landscape images from assets folder
  const kashmirImages = {
    pahalgam: './assets/1.jpg',
    sonamarg: './assets/2.jpg',
    gulmarg: './assets/3.jpg',
    mughalGardens: './assets/4.jpg',
    dalLake: './assets/5.jpg',
    shikara: './assets/6.jpg'
  };
  
  // Default Kashmir packages with local images from assets folder
  return [
    {
      title: 'Kashmir Tour Package',
      duration: '4 days & 3 nights',
      price: 11999, // 11500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.pahalgam // Pahalgam
    },
    {
      title: 'Magical Kashmir Package',
      duration: '5 days & 4 nights',
      price: 13999, // 13500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.sonamarg // Sonamarg
    },
    {
      title: 'Alluring Kashmir Package',
      duration: '6 days & 5 nights',
      price: 15999, // 15500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.gulmarg // Gulmarg
    },
    {
      title: 'Short Escape Kashmir Package',
      duration: '7 days & 6 nights',
      price: 17999, // 17500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.mughalGardens // Mughal Gardens
    },
    {
      title: 'Honeymoon Tour Package',
      duration: '6 days & nights',
      price: 37999, // 37500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.dalLake // Dal Lake
    },
    {
      title: 'Magical Kashmir',
      duration: '9 days & 8 nights',
      price: 22999, // 22500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.shikara // Shikara
    }
  ];
}

function formatRupees(num) {
  return '₹' + num.toLocaleString('en-IN');
}

function createPlanCard(plan, idx) {
  const priceText = plan.title === 'Honeymoon Tour Package' ? 
    `${formatRupees(plan.price)}/Couple` : 
    `${formatRupees(plan.price)}/person`;
    
  return `
    <div class="plan-card" style="animation-delay: ${idx * 0.2}s">
      <div class="plan-image">
        <img src="${plan.image}" alt="${plan.title}" />
      </div>
      <div class="plan-content">
        <h3>${plan.title}</h3>
        <div class="plan-duration">${plan.duration}</div>
        <div class="plan-price">Starting Price: ${priceText}</div>
        <div class="plan-inclusions"><strong>Inclusions:</strong> ${plan.inclusions}</div>
        <div class="plan-locations"><strong>Locations:</strong> ${plan.locations}</div>
        <div class="plan-service">${plan.service}</div>
        <div class="plan-actions">
          <button onclick="openQuoteModal('${plan.title}', '${priceText}')" class="quote-btn">Get a Quote</button>
          <a href="tel:8899127434" class="phone-btn">+91 8899127434</a>
        </div>
      </div>
    </div>
  `;
}

// Hero Slideshow images and content - using specific hero images
const heroSlides = [
  {
    img: './assets/hero1.jpg',
    title: 'Discover Kashmir\'s Beauty',
    description: 'Explore the paradise on Earth with our curated travel experiences.',
    buttonText: 'View Packages',
    buttonLink: '#plans',
    secondButtonText: 'Download Brochure',
    secondButtonLink: './assets/brochure.pdf',
    thirdButtonText: 'Call Us',
    thirdButtonLink: 'tel:+918899127434'
  },
  {
    img: './assets/hero2.png',
    title: 'Exclusive Kashmir Tours',
    description: 'From snow-capped mountains to serene lakes, every moment is magical.',
    buttonText: 'Book Now',
    buttonLink: 'booking.html',
    secondButtonText: 'Download Brochure',
    secondButtonLink: './assets/brochure.pdf',
    thirdButtonText: 'Call Us',
    thirdButtonLink: 'tel:+918899127434'
  },
  {
    img: './assets/hero3.jpg',
    title: 'Experience Paradise',
    description: 'Your trusted partner for exploring the beauty of Kashmir.',
    buttonText: 'Get Quote',
    buttonLink: '#plans',
    secondButtonText: 'Download Brochure',
    secondButtonLink: './assets/brochure.pdf',
    thirdButtonText: 'Call Us',
    thirdButtonLink: 'tel:+918899127434'
  },
];
let currentHeroSlide = 0;

function renderHeroSlideshow() {
  const container = document.getElementById('hero-slideshow');
  if (!container) return;
  container.innerHTML = ''; // Clear existing content
  heroSlides.forEach((slide, idx) => {
    const slideItem = document.createElement('div');
    slideItem.className = 'hero-slide-item' + (idx === 0 ? ' active' : '');

    const img = document.createElement('img');
    img.src = slide.img;
    img.alt = 'Kashmir Landscape';
    img.className = 'hero-slide-img';
    slideItem.appendChild(img);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'hero-slide-content';
    contentDiv.innerHTML = `
      <h1>${slide.title}</h1>
      <p>${slide.description}</p>
      <div class="hero-buttons">
        ${slide.buttonText ? `<a href="${slide.buttonLink}" class="cta-btn primary-btn"><i class="fas fa-arrow-right"></i> ${slide.buttonText}</a>` : ''}
        ${slide.secondButtonText ? `<a href="${slide.secondButtonLink}" class="cta-btn secondary-btn" download><i class="fas fa-download"></i> ${slide.secondButtonText}</a>` : ''}
        ${slide.thirdButtonText ? `<a href="${slide.thirdButtonLink}" class="cta-btn tertiary-btn"><i class="fas fa-phone"></i> ${slide.thirdButtonText}</a>` : ''}
      </div>
    `;
    slideItem.appendChild(contentDiv);

    container.appendChild(slideItem);
  });
}

function showNextHeroSlide() {
  const slideItems = document.querySelectorAll('.hero-slide-item');
  slideItems[currentHeroSlide].classList.remove('active');
  currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;
  slideItems[currentHeroSlide].classList.add('active');
}

// Modal functions
function openQuoteModal(packageTitle, price) {
  document.getElementById('selectedPackage').value = packageTitle;
  document.getElementById('selectedPrice').value = price;
  document.getElementById('quoteModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeQuoteModal() {
  document.getElementById('quoteModal').style.display = 'none';
  document.body.style.overflow = 'auto'; // Restore scrolling
  document.getElementById('quoteForm').reset();
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  const modal = document.getElementById('quoteModal');
  if (event.target === modal) {
    closeQuoteModal();
  }
}

// Handle form submission
function handleQuoteSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const submitBtn = form.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;
  
  const formData = new FormData(form);
  
  // Send form data to PHP script
  fetch('send-quote.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      closeQuoteModal();
      window.location.href = 'thank-you.html';
    } else {
      alert(data.error || 'Something went wrong. Please try again.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Network error. Please try again or contact us directly.');
  })
  .finally(() => {
    // Reset button state
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroSlideshow();
  setInterval(showNextHeroSlide, 8000); // Change slide every 8 seconds

  const plansContainer = document.getElementById('plans-container');
  const plans = getPlans();
  plansContainer.innerHTML = plans.map(createPlanCard).join('');
  
  // Add form submission handler
  document.getElementById('quoteForm').addEventListener('submit', handleQuoteSubmit);
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }
});

 