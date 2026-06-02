// --- ΠΕΛΑΤΕΣ ---
function loadCustomers() {
    const container = document.getElementById('customers-list');
    
    if (!container) {
        console.error("Το στοιχείο 'customers-list' δεν βρέθηκε στο HTML!");
        return;
    }

    container.innerHTML = '<h3 class="font-bold mb-4 col-span-2">Λίστα Εγγεγραμμένων Πελατών</h3>';
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    if (users.length === 0) {
        container.innerHTML += '<p class="text-slate-500">Δεν υπάρχουν εγγεγραμμένοι πελάτες ακόμα.</p>';
        return;
    }
    
    users.forEach((user) => {
        const div = document.createElement('div');
        div.className = "bg-white p-4 rounded-xl border shadow-sm cursor-pointer hover:border-yellow-500 relative z-50";
        div.innerHTML = `
            <p class="font-bold text-slate-800">${user.name || 'Άγνωστος'}</p>
            <p class="text-sm text-slate-500">${user.email}</p>
        `;
        
        div.onclick = function() {
            showCustomerDetails(user.name, user.email, user.phone || 'N/A');
        };
        
        container.appendChild(div);
    });
}

function showCustomerDetails(name, email, phone) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);
    
    const allBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const userBookings = allBookings.filter(b => b.userEmail === email);
    
    const totalSpent = userBookings.reduce((sum, b) => sum + (parseFloat(b.price) || 0), 0);

    const modal = document.getElementById('customer-modal');
    const detailsDiv = document.getElementById('modal-c-details');
    document.getElementById('modal-c-name').innerText = user ? user.name : name;

    detailsDiv.innerHTML = `
        <div class="space-y-2 text-sm text-slate-700">
            <p><strong>Όνομα:</strong> ${user ? user.name : name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Τηλέφωνο:</strong> ${phone}</p>
            <p><strong>Ξενοδοχείο/Villa:</strong> ${user ? (user.hotel || 'Δεν ορίστηκε') : 'N/A'}</p>
            <p><strong>Κωδικός:</strong> ${user ? (user.pass || '***') : 'N/A'}</p>
            <hr class="my-2">
            <p><strong>Σύνολο Κρατήσεων:</strong> ${userBookings.length}</p>
            <p><strong>Συνολικό Ποσό:</strong> ${totalSpent}€</p>
        </div>
        <div class="mt-4 max-h-64 overflow-y-auto border-t pt-2">
            <p class="font-bold mb-2">Ιστορικό Κρατήσεων (${userBookings.length}):</p>
            ${userBookings.length > 0 ? 
                userBookings.map((b, index) => `
                    <div class="text-xs mb-1 p-1 border-b border-slate-100 flex justify-between">
                        <span>${index + 1}. ${b.service}</span>
                        <span class="text-slate-400">${b.date}</span>
                    </div>
                `).join('') 
                : '<p class="text-xs text-slate-400">Καμία κράτηση</p>'}
        </div>
        <button onclick="deleteCustomer('${email}')" class="w-full mt-6 bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700 transition">Διαγραφή Πελάτη</button>
    `;
    modal.classList.remove('hidden');
}

// --- ΥΠΗΡΕΣΙΕΣ ---
function loadServices() {
    const container = document.getElementById('admin-data-container');
    const title = document.getElementById('admin-section-title');
    if (title) title.innerText = "Διαχείριση Υπηρεσιών";
    
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    
    container.innerHTML = `<button onclick="addNewService()" class="bg-yellow-600 text-white px-4 py-2 rounded-xl mb-4">+ Προσθήκη Υπηρεσίας</button>`;

    services.forEach((s, index) => {
        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl border flex justify-between items-center">
                <p class="font-bold">${s.name} <span class="text-slate-500 font-normal">- ${s.price}€</span></p>
                <button onclick="deleteService(${index})" class="text-red-500 font-bold">Διαγραφή</button>
            </div>
        `;
    });
}

function addNewService() {
    const name = prompt("Όνομα υπηρεσίας:");
    const price = prompt("Τιμή:");
    if (name && price) {
        let services = JSON.parse(localStorage.getItem('services') || '[]');
        services.push({ name, price });
        localStorage.setItem('services', JSON.stringify(services));
        loadServices();
    }
}

function deleteService(index) {
    let services = JSON.parse(localStorage.getItem('services') || '[]');
    services.splice(index, 1);
    localStorage.setItem('services', JSON.stringify(services));
    loadServices();
}

// --- ΚΡΑΤΗΣΕΙΣ ---
function loadBookings() {
    const container = document.getElementById('admin-data-container');
    if (document.getElementById('admin-section-title')) {
        document.getElementById('admin-section-title').innerText = "Διαχείριση Κρατήσεων";
    }
    
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    container.innerHTML = '<h3 class="font-bold mb-4 col-span-2">Λίστα Κρατήσεων</h3>';

    bookings.forEach((b, index) => {
        const statusColor = b.status === 'Accepted' ? 'text-green-600' : (b.status === 'Declined' ? 'text-red-600' : 'text-yellow-600');
        container.innerHTML += `
            <div class="bg-white p-4 rounded-xl border shadow-sm">
                <p class="font-bold">${b.serviceName || 'Υπηρεσία'}</p>
                <p class="text-sm">Πελάτης: ${b.userName}</p>
                <p class="font-bold ${statusColor}">Status: ${b.status || 'Pending'}</p>
                <div class="mt-4 flex gap-2">
                    <button onclick="updateBookingStatus(${index}, 'Accepted')" class="bg-green-600 text-white px-3 py-1 rounded text-xs">Αποδοχή</button>
                    <button onclick="updateBookingStatus(${index}, 'Declined')" class="bg-red-600 text-white px-3 py-1 rounded text-xs">Απόρριψη</button>
                </div>
            </div>
        `;
    });
}

function updateBookingStatus(index, newStatus) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    let b = bookings[index];
    
    b.status = newStatus;
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    const subject = "Ενημέρωση κράτησης: " + b.serviceName;
    const body = `Η κράτησή σας για ${b.date} έχει πλέον την κατάσταση: ${newStatus}`;
    window.location.href = `mailto:${b.userEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    loadBookings();
}

// --- MAIN SWITCH ---
function showAdminSection(section) {
    switch(section) {
        case 'customers': loadCustomers(); break;
        case 'partners': loadPartnersSection(); break;
        case 'services': loadServices(); break;
        case 'bookings': loadBookings(); break;
        case 'finance': loadFinance(); break;
    }
}

function handleCustomerClick(name, email, phone) {
    showCustomerDetails(
        decodeURIComponent(name), 
        decodeURIComponent(email), 
        decodeURIComponent(phone)
    );
}

function loadFinance() {
    const container = document.getElementById('admin-data-container');
    const title = document.getElementById('admin-section-title');
    if (title) title.innerText = "Οικονομική Αναφορά";

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const accepted = bookings.filter(b => b.status === 'Accepted');
    
    let totalSales = 0;
    let totalDeposits = 0;

    accepted.forEach(b => {
        const price = parseFloat(b.price || 0);
        const deposit = parseFloat(b.deposit || 0);
        totalSales += price;
        totalDeposits += deposit;
    });

    container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            <div class="bg-green-600 text-white p-6 rounded-2xl shadow-lg">
                <p class="text-sm opacity-80">Συνολικός Τζίρος</p>
                <h3 class="text-3xl font-bold">${totalSales.toFixed(2)}€</h3>
            </div>
            <div class="bg-blue-600 text-white p-6 rounded-2xl shadow-lg">
                <p class="text-sm opacity-80">Εισπράξεις Προκαταβολών</p>
                <h3 class="text-3xl font-bold">${totalDeposits.toFixed(2)}€</h3>
            </div>
        </div>
        <div class="col-span-2 mt-6">
            <h3 class="font-bold mb-4">Αναλυτική Κίνηση</h3>
            <div class="bg-white p-4 rounded-xl border">
                ${accepted.map(b => `
                    <div class="flex justify-between border-b py-2">
                        <span>${b.userName} - ${b.serviceName}</span>
                        <span class="font-bold">${b.price}€ (Προκατ: ${b.deposit}€)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function deleteCustomer(email) {
    if(confirm('Είσαι σίγουρος ότι θέλεις να διαγράψεις οριστικά αυτόν τον πελάτη;')) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        users = users.filter(u => u.email !== email);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Ο πελάτης διαγράφηκε επιτυχώς!');
        location.reload();
    }
}

function loadApprovedPartners() {
    const container = document.getElementById('approved-partners-container');
    if (!container) return;
    container.innerHTML = '';
    const approved = JSON.parse(localStorage.getItem('approvedPartners') || '[]');

    approved.forEach(p => {
        const div = document.createElement('div');
        div.className = "p-4 bg-green-50 border border-green-200 rounded-xl mb-2";
        div.innerHTML = `<p class="font-bold">${p.name}</p><p class="text-sm">${p.email}</p>`;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const welcomeTitle = document.getElementById('welcome-message');
    
    if (user && welcomeTitle) {
        welcomeTitle.innerText = `Καλώς ήρθες, ${user.name || 'Συνεργάτη'}!`;
    }
    
    loadPartnerBookings();
});

function loadPartnerBookings() {
    const container = document.getElementById('partner-bookings-list');
    if (!container) return;

    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const myEmail = localStorage.getItem('partnerEmail'); 

    container.innerHTML = '';
    
    const myBookings = bookings.filter(b => b.partnerEmail === myEmail);

    if (myBookings.length === 0) {
        container.innerHTML = '<p class="text-slate-500">Δεν υπάρχουν νέες κρατήσεις.</p>';
        return;
    }

    myBookings.forEach((b) => {
        const bId = b.id || b.timestamp;
        container.innerHTML += `
            <div class="p-4 border rounded-xl bg-white shadow-sm mb-4">
                <p class="font-bold">Πελάτης: ${b.userName}</p>
                <p class="text-sm text-slate-600 mb-3">Ημερομηνία: ${b.date || 'N/A'}</p>
                <div class="flex gap-2">
                    <button onclick="respondToBooking('${bId}', 'accept')" class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">✅ Αποδοχή</button>
                    <button onclick="respondToBooking('${bId}', 'reject')" class="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold">❌ Απόρριψη</button>
                </div>
            </div>
        `;
    });
}

function respondToBooking(bookingId, decision) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    let b = bookings.find(item => (item.id || item.timestamp) == bookingId);
    
    if (b) {
        b.status = decision === 'accept' ? 'Accepted' : 'Declined';
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        const body = decision === 'accept' ? "Η κράτηση σας εγκρίθηκε!" : "Η κράτηση σας απορρίφθηκε.";
        window.location.href = `mailto:${b.userEmail}?subject=Απάντηση για την κράτησή σας&body=${encodeURIComponent(body)}`;
        
        alert("Η κράτηση ενημερώθηκε!");
        loadPartnerBookings();
    }
}

function loadProfile() {
    let savedData = localStorage.getItem('currentUser');
    let user = {};

    if (savedData) {
        user = JSON.parse(savedData);
    } 
    else if (localStorage.getItem('partnerEmail')) {
        let email = localStorage.getItem('partnerEmail');
        let backup = localStorage.getItem('partnerProfile_' + email);
        if (backup) {
            user = JSON.parse(backup);
            localStorage.setItem('currentUser', backup);
        }
    } else {
        return;
    }

    try {
        const fields = {
            'p-name': user.name,
            'p-business': user.businessName,
            'p-address': user.address,
            'p-phone': user.phone,
            'p-category': user.category
        };

        for (const [id, value] of Object.entries(fields)) {
            const element = document.getElementById(id);
            if (element) {
                element.value = value || ''; 
            }
        }

        const emailEl = document.getElementById('p-email');
        if (emailEl) {
            emailEl.innerText = user.email || '--';
        }
    } catch (e) {
        console.error("Σφάλμα κατά την ανάγνωση των δεδομένων:", e);
    }
}

function saveProfile() {
    let user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const nameInput = document.getElementById('p-name');
    const bizInput = document.getElementById('p-business');
    const addrInput = document.getElementById('p-address');
    const catInput = document.getElementById('p-category');
    const phoneInput = document.getElementById('p-phone');

    if (nameInput) user.name = nameInput.value;
    if (bizInput) user.businessName = bizInput.value;
    if (addrInput) user.address = addrInput.value; 
    if (catInput) user.category = catInput.value;
    if (phoneInput) user.phone = phoneInput.value;
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    if (user.email) {
        localStorage.setItem('partnerProfile_' + user.email, JSON.stringify(user));
    }
    
    alert("Τα στοιχεία αποθηκεύτηκαν!");
}

async function submitForApproval() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const imageInput = document.getElementById('new-service-images');
    
    const images = [];
    for (let file of imageInput.files) {
        images.push(await toBase64(file));
    }

    const newService = {
        title: document.getElementById('new-service-title').value,
        priceType: document.getElementById('new-service-price-type').value,
        price: document.getElementById('new-service-price').value,
        description: document.getElementById('new-service-desc').value,
        images: images.slice(0, 3),
        category: user.category,
        partnerEmail: user.email,
        status: 'pending'
    };
    
    let pendingServices = JSON.parse(localStorage.getItem('pendingServices') || '[]');
    pendingServices.push(newService);
    localStorage.setItem('pendingServices', JSON.stringify(pendingServices));
    
    alert("Η υπηρεσία σου στάλθηκε για έγκριση!");
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function toggleForm() {
    const form = document.getElementById('service-form');
    const icon = document.getElementById('toggle-icon');
    
    form.classList.toggle('hidden');
    if (icon) {
        icon.innerText = form.classList.contains('hidden') ? '➕' : '➖';
    }
}

function loadHistoryAndReviews() {
    const history = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    const historyContainer = document.getElementById('booking-history');
    
    if (historyContainer) {
        historyContainer.innerHTML = history.map(h => `
            <div class="flex justify-between items-center p-4 bg-slate-50 rounded-xl">
                <div>
                    <p class="font-bold">${h.title}</p>
                    <p class="text-xs text-slate-500">${h.date}</p>
                </div>
                <span class="px-3 py-1 rounded-full text-xs font-bold ${h.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                    ${h.status}
                </span>
            </div>
        `).join('');
    }

    const reviews = JSON.parse(localStorage.getItem('partnerReviews') || '[]');
    const reviewsContainer = document.getElementById('reviews-list');
    
    if (reviewsContainer) {
        reviewsContainer.innerHTML = reviews.map(r => `
            <div class="border-b pb-4">
                <div class="flex justify-between">
                    <p class="font-bold">${r.customerName}</p>
                    <span class="text-yellow-500">★ ${r.rating}/5</span>
                </div>
                <p class="text-sm text-slate-600 mt-1">${r.comment}</p>
                <button onclick="replyToReview('${r.id}')" class="text-xs text-blue-600 font-bold mt-2">Απάντηση</button>
            </div>
        `).join('');
    }
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });
    
    const target = document.getElementById(pageId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }

    // Η διόρθωση: Αν γυρνάμε στους προορισμούς, ξανατρέξε τη συνάρτηση που φτιάχνει τη λίστα
    if (pageId === 'destinations-page' && typeof showDestinationsPage === 'function') {
        showDestinationsPage();
    }
}

function loadPage(fileName, targetId) {
    const container = document.getElementById(targetId);
    if (!container) return;
    
    fetch(fileName)
        .then(res => res.text())
        .then(html => {
            container.innerHTML = html;
            container.style.setProperty("display", "block", "important");
            const home = document.getElementById('home-page');
            if (home) home.style.display = 'none';
        });
}