document.addEventListener('DOMContentLoaded', () => {
  let customLocations = [];
  const customLocationsInput = document.getElementById('custom-location-input');
  const customLocationsList = document.getElementById('custom-locations-list');
  document.getElementById('add-location-btn').onclick = function() {
    const loc = customLocationsInput.value.trim();
    if (loc && !customLocations.includes(loc)) {
      customLocations.push(loc);
      renderCustomLocations();
      customLocationsInput.value = '';
      customLocationsInput.focus();
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