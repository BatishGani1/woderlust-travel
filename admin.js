const LS_KEY = 'wonderlust_kashmir_plans';
const ADMIN_PASSWORD = 'kashmir2024'; // Set your desired password here

// Admin authentication
function checkAdminLogin() {
  const loginForm = document.getElementById('admin-login-form');
  const adminContent = document.getElementById('admin-content');
  const loginOverlay = document.getElementById('admin-login-overlay');
  
  // Check if already authenticated in this session
  if (sessionStorage.getItem('admin_authenticated') === 'true') {
    loginOverlay.style.display = 'none';
    adminContent.style.display = 'block';
    renderPlans(); // Load content immediately
    return;
  }

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const passwordInput = document.getElementById('admin-password');
    const errorElement = document.getElementById('password-error');
    
    if (passwordInput.value === ADMIN_PASSWORD) {
      // Set session authentication
      sessionStorage.setItem('admin_authenticated', 'true');
      
      // Show admin content
      loginOverlay.style.display = 'none';
      adminContent.style.display = 'block';
      
      // Clear password field
      passwordInput.value = '';
      errorElement.textContent = '';
      
      // Load admin content
      renderPlans();
    } else {
      errorElement.textContent = 'Incorrect password. Please try again.';
      passwordInput.value = '';
      passwordInput.focus();
    }
  });
}

function getPlans() {
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
}
function savePlans(plans) {
  localStorage.setItem(LS_KEY, JSON.stringify(plans));
}
function renderPlans() {
  const plans = getPlans();
  const list = document.getElementById('admin-plans-list');
  if (!plans.length) {
    list.innerHTML = '<p style="text-align:center;color:#888;">No plans yet.</p>';
    return;
  }
  list.innerHTML = plans.map((plan, idx) => `
    <div class="admin-plan-card">
      <div><strong>${plan.days}-Day Tour</strong> | <span style="color:#2e8b57;">${formatRupees(plan.price)}</span></div>
      <div><b>Locations:</b> ${plan.location}</div>
      <div><b>Highlights:</b> ${plan.highlights.join(', ')}</div>
      <div class="actions">
        <button class="edit-btn" onclick="editPlan(${idx})">Edit</button>
        <button class="delete-btn" onclick="deletePlan(${idx})">Delete</button>
      </div>
    </div>
  `).join('');
}
function formatRupees(num) {
  return '₹' + num.toLocaleString('en-IN');
}
function resetForm() {
  document.getElementById('plan-id').value = '';
  document.getElementById('days').value = '';
  document.getElementById('location').value = '';
  document.getElementById('highlights').value = '';
  document.getElementById('price').value = '';
  document.getElementById('save-btn').textContent = 'Add Plan';
  document.getElementById('cancel-btn').style.display = 'none';
}
function editPlan(idx) {
  const plans = getPlans();
  const plan = plans[idx];
  document.getElementById('plan-id').value = idx;
  document.getElementById('days').value = plan.days;
  document.getElementById('location').value = plan.location;
  document.getElementById('highlights').value = plan.highlights.join(', ');
  document.getElementById('price').value = plan.price;
  document.getElementById('save-btn').textContent = 'Update Plan';
  document.getElementById('cancel-btn').style.display = 'inline-block';
}
function deletePlan(idx) {
  if (!confirm('Delete this plan?')) return;
  const plans = getPlans();
  plans.splice(idx, 1);
  savePlans(plans);
  renderPlans();
}
document.getElementById('plan-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('plan-id').value;
  const days = parseInt(document.getElementById('days').value);
  const location = document.getElementById('location').value.trim();
  const highlights = document.getElementById('highlights').value.split(',').map(h => h.trim()).filter(Boolean);
  const price = parseInt(document.getElementById('price').value);
  if (!days || !location || !highlights.length || !price) return alert('Fill all fields.');
  let plans = getPlans();
  const planObj = { days, location, highlights, price };
  if (id === '') {
    plans.push(planObj);
  } else {
    plans[parseInt(id)] = planObj;
  }
  savePlans(plans);
  renderPlans();
  resetForm();
});
document.getElementById('cancel-btn').addEventListener('click', function() {
  resetForm();
});
window.editPlan = editPlan;
window.deletePlan = deletePlan;

// Initialize authentication and admin functionality
document.addEventListener('DOMContentLoaded', function() {
  checkAdminLogin();
}); 