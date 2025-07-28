const LS_KEY = 'wonderlust_kashmir_plans';

function getPlans() {
  const stored = localStorage.getItem(LS_KEY);
  if (stored) return JSON.parse(stored);
  // Default plans if none in localStorage
  return [
    {
      days: 10,
      location: 'Srinagar, Gulmarg, Pahalgam',
      price: 35000,
      highlights: [
        'Dal Lake Shikara Ride',
        'Gulmarg Gondola',
        'Pahalgam Valley Trek',
        'Mughal Gardens',
        'Local Kashmiri Cuisine',
      ],
    },
    {
      days: 20,
      location: 'Srinagar, Sonamarg, Gulmarg, Pahalgam, Yusmarg',
      price: 65000,
      highlights: [
        'Sonamarg Glacier',
        'Gulmarg Skiing',
        'Betaab Valley',
        'Yusmarg Meadows',
        'Shopping in Srinagar',
      ],
    },
    {
      days: 30,
      location: 'Srinagar, Gulmarg, Pahalgam, Sonamarg, Doodhpathri, Kupwara',
      price: 95000,
      highlights: [
        'Doodhpathri Meadows',
        'Kupwara Adventure',
        'Extended Trekking',
        'Cultural Experiences',
        'All 20-day plan highlights',
      ],
    },
  ];
}

function formatRupees(num) {
  return '₹' + num.toLocaleString('en-IN');
}

function createPlanCard(plan, idx) {
  return `
    <div class="plan-card" style="animation-delay: ${idx * 0.2}s">
      <h3>${plan.days}-Day Kashmir Tour</h3>
      <div class="price">${formatRupees(plan.price)}</div>
      <div><strong>Locations:</strong> ${plan.location}</div>
      <ul>
        ${plan.highlights.map(h => `<li>${h}</li>`).join('')}
      </ul>
      <a href="booking.html?plan=${encodeURIComponent(plan.days + '-Day Kashmir Tour @ ' + formatRupees(plan.price))}" class="book-btn">Book Now</a>
    </div>
  `;
}

// Hero Slideshow images and content
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1614730325121-6d8d6d6e7e1f?auto=format&fit=crop&w=1920&q=80',
    title: 'Explore the Paradise of Kashmir',
    description: 'Unforgettable journeys, breathtaking landscapes, and curated experiences await you.',
    buttonText: 'Book Now',
    buttonLink: 'booking.html',
  },
  {
    img: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1920&q=80',
    title: 'Design Your Dream Tour',
    description: 'Tailor-made itineraries just for you. Create your perfect Kashmir adventure.',
    buttonText: 'Create Custom Plan',
    buttonLink: 'custom-plan.html',
  },
  {
    img: 'https://images.unsplash.com/photo-1536329583941-142876654848?auto=format&fit=crop&w=1920&q=80',
    title: 'Wonderlust Travels Kashmir',
    description: 'Your trusted partner for exploring the beauty of Kashmir. Experience excellence.',
    buttonText: 'Learn More',
    buttonLink: '#plans',
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
      ${slide.buttonText ? `<a href="${slide.buttonLink}" class="cta-btn">${slide.buttonText}</a>` : ''}
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

document.addEventListener('DOMContentLoaded', () => {
  renderHeroSlideshow();
  setInterval(showNextHeroSlide, 8000); // Change slide every 8 seconds

  const plansContainer = document.getElementById('plans-container');
  const plans = getPlans();
  plansContainer.innerHTML = plans.map(createPlanCard).join('');

  // Add custom plan button below plans
  const customBtn = document.createElement('a');
  customBtn.href = 'custom-plan.html';
  customBtn.className = 'custom-plan-btn';
  customBtn.textContent = 'Create Your Own Custom Plan';
  plansContainer.parentElement.appendChild(customBtn);
}); 