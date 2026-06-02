// js/admin/superadmin.js
console.log("Το superadmin.js φορτώθηκε!");
let keysPressed = {};

document.addEventListener('keydown', (event) => {
    if (!event.key) return; 
    const key = event.key.toLowerCase();
    keysPressed[key] = true;
    
    if (keysPressed['a'] && keysPressed['d']) {
        console.log("A+D πατήθηκαν!");
        showAdminPanel();
        keysPressed = {};
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key) {
        delete keysPressed[event.key.toLowerCase()];
    }
});

function showAdminPanel() {
    console.log("Προσπάθεια για showPage('admin-approvals')");
    if (typeof showPage === 'function') {
        showPage('admin-approvals');
        if (typeof loadPartnerRequests === 'function') loadPartnerRequests();
        if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
    } else {
        console.error("Η showPage δεν βρέθηκε!");
    }
}

function approveService(index) {
    let pending = JSON.parse(localStorage.getItem('pendingServices') || '[]');
    let active = JSON.parse(localStorage.getItem('activeServices') || '[]');
    
    let service = pending.splice(index, 1)[0];
    active.push(service);
    
    localStorage.setItem('pendingServices', JSON.stringify(pending));
    localStorage.setItem('activeServices', JSON.stringify(active));
    
    alert("Η υπηρεσία εγκρίθηκε!");
    if (typeof loadPartnerRequests === 'function') loadPartnerRequests();
}

function loadPartnerRequests() {
    const pendingServices = JSON.parse(localStorage.getItem('pendingServices') || '[]');
    const container = document.getElementById('admin-approvals-list');
    
    if (!container) return;
    
    container.innerHTML = pendingServices.map((service, index) => `
        <div class="p-4 border rounded-xl mb-4 bg-white flex justify-between">
            <span>${service.title} - ${service.category}</span>
            <button onclick="approveService(${index})" class="bg-green-600 text-white px-3 py-1 rounded">Έγκριση</button>
        </div>
    `).join('');
}

function showAdminSection(sectionId) {
    const targetId = sectionId + '-list';
    const target = document.getElementById(targetId);

    if (target) {
        const allSections = document.querySelectorAll('#admin-data-container .admin-view');
        allSections.forEach(el => el.classList.add('hidden'));

        target.classList.remove('hidden');
        
        if (sectionId === 'customers') {
            if (typeof loadCustomers === 'function') loadCustomers();
        } else if (sectionId === 'services') {
            console.log("Φόρτωση υπηρεσιών...");
        } else if (sectionId === 'partners') {
            loadPartnerRequests(); 
        } else if (sectionId === 'approved-partners') {
            if (typeof loadApprovedPartners === 'function') loadApprovedPartners(); 
        } else if (sectionId === 'dashboard') {
            if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
        }
        
        const titleElement = document.getElementById('admin-section-title');
        if (titleElement) {
            titleElement.innerText = sectionId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        }
        
        console.log("Επιτυχία! Εμφανίστηκε το: " + targetId);
    } else {
        console.error("Σφάλμα: Δεν βρέθηκε στοιχείο με ID: " + targetId);
    }
}

async function ensureAdminPanelLoaded() {
    if (document.getElementById('admin-approvals')) return;

    const response = await fetch('superadmin.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('beforeend', html);
}

function showAdminPanel() {
    ensureAdminPanelLoaded().then(() => {
        if (typeof showPage === 'function') showPage('admin-approvals');
        if (typeof loadPartnerRequests === 'function') loadPartnerRequests();
        if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
    });
}

// js/services/bookings.js
function getAllBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function loadPartnerDashboard() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const containerName = document.getElementById('p-name');
    const jobsContainer = document.getElementById('new-jobs');

    if (!containerName || !jobsContainer || !user) return; 

    containerName.innerText = user.name || "N/A";
    const biz = document.getElementById('p-biz');
    if (biz) biz.innerText = user.hotel || "N/A";
    const phone = document.getElementById('p-phone');
    if (phone) phone.innerText = user.phone || "N/A";

    const allBookings = getAllBookings(); 
    const myJobs = allBookings.filter(b => b.partnerEmail === user.email);

    jobsContainer.innerHTML = '';

    if (myJobs.length === 0) {
        jobsContainer.innerHTML = '<p class="text-gray-500 p-4">Δεν υπάρχουν νέες αναθέσεις.</p>';
    } else {
        myJobs.forEach(job => {
            if (job.status === 'Pending') {
                jobsContainer.innerHTML += `
                    <div class="border-b p-4 flex justify-between items-center">
                        <div>
                            <p class="font-bold">${job.notes || 'Καμία σημείωση'}</p>
                            <p class="text-xs text-slate-500">${job.date} - ${job.price || '0'}€</p>
                        </div>
                        <div class="flex gap-2">
                            <button onclick="updateJobStatus('${job.id}', 'Accepted')" class="bg-green-600 text-white px-3 py-1 rounded">✔</button>
                            <button onclick="updateJobStatus('${job.id}', 'Rejected')" class="bg-red-600 text-white px-3 py-1 rounded">✘</button>
                        </div>
                    </div>
                `;
            }
        });
    }
}

function updateJobStatus(jobId, newStatus) {
    let bookings = getAllBookings(); 
    let job = bookings.find(b => b.id === jobId);
    
    if (job) {
        job.status = newStatus;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        alert("Η κατάσταση της δουλειάς ενημερώθηκε!");
        loadPartnerDashboard(); 
    }
}

function submitBooking(bookingData) {
    const subject = "Νέα κράτηση για εσένα!";
    const body = `Γεια σου συνεργάτη, έχεις μια νέα κράτηση από τον ${bookingData.userName}.`;
    window.location.href = `mailto:${bookingData.partnerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

let currentReviewService = ""; 
let currentReviewId = null;

function getRatingForService(serviceTitle) {
    const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
    const reviews = allReviews.filter(r => r.service === serviceTitle);
    if (reviews.length === 0) return "No reviews yet";
    const avg = (reviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / reviews.length).toFixed(1);
    return `⭐ ${avg} (${reviews.length} reviews)`;
}

function openReview(serviceTitle) {
    currentReviewService = serviceTitle;
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeReview() {
    const modal = document.getElementById('review-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function submitReview() {
    const ratingEl = document.getElementById('rev-rating');
    const commentEl = document.getElementById('rev-text');
    if (!ratingEl || !commentEl) return;

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert("Πρέπει να είστε συνδεδεμένος για να αφήσετε κριτική.");
        return;
    }

    const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
    allReviews.push({ 
        service: currentReviewService, 
        rating: ratingEl.value, 
        comment: commentEl.value, 
        user: user.name || "Customer", 
        date: new Date().toLocaleDateString() 
    });
    
    localStorage.setItem('allReviews', JSON.stringify(allReviews));
    alert("Η κριτική σας υποβλήθηκε επιτυχώς!");
    
    closeReview();
    if (typeof renderProfile === 'function') renderProfile();
}

function renderReviews() {
    const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
    const container = document.getElementById('partner-reviews');
    if (!container) return;
    
    container.innerHTML = allReviews.length > 0 ? allReviews.map((r, index) => `
        <div class="p-4 border rounded-xl bg-slate-50 mb-3">
            <p class="font-bold text-yellow-600">${r.service}</p>
            <p class="font-bold text-sm">Από: ${r.user} (${r.date})</p>
            <p class="text-sm italic">"${r.comment}"</p>
            <button onclick="openReply(${index})" class="mt-2 text-xs text-blue-600 underline">Απάντηση</button>
        </div>
    `).join('') : '<p class="text-slate-400">Δεν υπάρχουν κριτικές ακόμα.</p>';
}

function openReply(id) { 
    currentReviewId = id; 
    const modal = document.getElementById('reply-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeReply() { 
    const modal = document.getElementById('reply-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function saveReply() { 
    const replyText = document.getElementById('reply-text');
    if (!replyText || !replyText.value) {
        alert("Παρακαλώ γράψτε μια απάντηση.");
        return;
    }
    alert("Η απάντηση στάλθηκε!"); 
    closeReply(); 
}

function goBack() {
    // 1. Κρύβουμε όλες τις σελίδες (για να είμαστε σίγουροι)
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    // 2. Εμφανίζουμε την κεντρική σελίδα (π.χ. destinations-page)
    const mainPage = document.getElementById('destinations-page');
    if (mainPage) {
        mainPage.style.display = 'flex';
        mainPage.classList.add('active');
    }
}