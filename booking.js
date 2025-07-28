const LS_KEY = 'wonderlust_kashmir_plans';
function getPlans() {
  const stored = localStorage.getItem(LS_KEY);
  if (stored) return JSON.parse(stored);
  
  // Beautiful Kashmir landscape images
  const kashmirImages = {
    cableCar: 'https://images.unsplash.com/photo-1614730325121-6d8d6d6e7e1f?auto=format&fit=crop&w=800&q=80',
    dalLake: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80',
    mountainValley: 'https://images.unsplash.com/photo-1536329583941-142876654848?auto=format&fit=crop&w=800&q=80',
    turquoiseRiver: 'https://images.unsplash.com/photo-1614730325121-6d8d6d6e7e1f?auto=format&fit=crop&w=800&q=80',
    panoramicMeadows: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=800&q=80',
    yellowShikara: 'https://images.unsplash.com/photo-1536329583941-142876654848?auto=format&fit=crop&w=800&q=80'
  };
  
  return [
    {
      title: 'Kashmir Tour Package',
      duration: '4 days & 3 nights',
      price: 11999, // 11500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.cableCar // Red cable car over green valley
    },
    {
      title: 'Magical Kashmir Package',
      duration: '5 days & 4 nights',
      price: 13999, // 13500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.dalLake // Dal Lake with houseboats
    },
    {
      title: 'Alluring Kashmir Package',
      duration: '6 days & 5 nights',
      price: 15999, // 15500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.mountainValley // Mountain valley with river
    },
    {
      title: 'Short Escape Kashmir Package',
      duration: '7 days & 6 nights',
      price: 17999, // 17500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.turquoiseRiver // Turquoise river flowing
    },
    {
      title: 'Honeymoon Tour Package',
      duration: '6 days & nights',
      price: 37999, // 37500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.panoramicMeadows // Panoramic meadows with horses
    },
    {
      title: 'Magical Kashmir',
      duration: '9 days & 8 nights',
      price: 22999, // 22500 + 499
      inclusions: 'Hotel, Meal & Cab',
      locations: 'Srinagar, Gulmarg & Pahalgam',
      service: 'Pick & Drop Service in Srinagar',
      image: kashmirImages.yellowShikara // Yellow shikara on lake
    }
  ];
}
function formatRupees(num) {
  return '₹' + num.toLocaleString('en-IN');
}
// Populate plan dropdown
function populatePlanDropdown() {
  const plans = getPlans();
  const select = document.getElementById('plan');
  select.innerHTML = '';
  plans.forEach(plan => {
    const priceText = plan.title === 'Honeymoon Tour Package' ? 
      `${formatRupees(plan.price)}/Couple` : 
      `${formatRupees(plan.price)}/person`;
    const opt = document.createElement('option');
    opt.value = `${plan.title} @ ${priceText}`;
    opt.textContent = `${plan.title} (${plan.duration}) - ${priceText}`;
    select.appendChild(opt);
  });
  // If plan is in URL, select it
  const urlParams = new URLSearchParams(window.location.search);
  const planParam = urlParams.get('plan');
  if (planParam) {
    select.value = planParam;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  populatePlanDropdown();
  document.getElementById('booking-form').onsubmit = function(ev) {
    ev.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const plan = document.getElementById('plan').value;
    const message = document.getElementById('message').value.trim();
    if (!name || !phone || !plan) return alert('Please fill all required fields.');
    const text = `Booking Request for Wonderlust Travels Kashmir:%0AName: ${name}%0APhone: ${phone}%0APlan: ${plan}%0AMessage: ${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/8899127434?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };
}); 