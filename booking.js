const LS_KEY = 'wonderlust_kashmir_plans';
function getPlans() {
  const stored = localStorage.getItem(LS_KEY);
  if (stored) return JSON.parse(stored);
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
// Populate plan dropdown
function populatePlanDropdown() {
  const plans = getPlans();
  const select = document.getElementById('plan');
  select.innerHTML = '';
  plans.forEach(plan => {
    const opt = document.createElement('option');
    opt.value = `${plan.days}-Day Kashmir Tour @ ${formatRupees(plan.price)}`;
    opt.textContent = `${plan.days}-Day Kashmir Tour (${plan.location}) - ${formatRupees(plan.price)}`;
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
    const whatsappUrl = `https://wa.me/916006442046?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  // Custom plan logic
  let customLocations = [];
  const customLocationsInput = document.getElementById('custom-location-input');
  const customLocationsList = document.getElementById('custom-locations-list');
  document.getElementById('add-location-btn').onclick = function() {
    const loc = customLocationsInput.value.trim();
    if (loc && !customLocations.includes(loc)) {
      customLocations.push(loc);
      renderCustomLocations();
      customLocationsInput.value = '';
    }
  };
  function renderCustomLocations() {
    customLocationsList.innerHTML = '';
    customLocations.forEach((loc, idx) => {
      const li = document.createElement('li');
      li.textContent = loc;
      const btn = document.createElement('button');
      btn.textContent = 'Remove';
      btn.className = 'remove-location-btn';
      btn.onclick = () => {
        customLocations.splice(idx, 1);
        renderCustomLocations();
      };
      li.appendChild(btn);
      customLocationsList.appendChild(li);
    });
  }
  document.getElementById('custom-plan-form').onsubmit = function(ev) {
    ev.preventDefault();
    const name = document.getElementById('custom-name').value.trim();
    const phone = document.getElementById('custom-phone').value.trim();
    const preferences = document.getElementById('custom-preferences').value.trim();
    const message = document.getElementById('custom-message').value.trim();
    if (!name || !phone || customLocations.length === 0) return alert('Please fill all required fields and add at least one location.');
    const text = `Custom Plan Request for Wonderlust Travels Kashmir:%0AName: ${name}%0APhone: ${phone}%0ALocations: ${customLocations.join(', ')}%0APreferences: ${preferences}%0AMessage: ${encodeURIComponent(message)}`;
    const whatsappUrl = `https://wa.me/916006442046?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };
}); 