// js/admin/approvals.js

function loadPartnerRequests() {
    const container = document.getElementById('partner-requests-list');
    if (!container) return;
    
    const requests = JSON.parse(localStorage.getItem('partnerRequests') || '[]');
    container.innerHTML = ''; 

    if (requests.length === 0) {
        container.innerHTML = '<p class="p-4 text-slate-500">Δεν υπάρχουν εκκρεμείς αιτήσεις.</p>';
        return;
    }

    requests.forEach((req, index) => {
        const div = document.createElement('div');
        div.className = "p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm";
        div.innerHTML = `
            <div>
                <p class="font-bold text-lg">${req.name}</p>
                <p class="text-sm text-slate-500">${req.email}</p>
            </div>
            <button onclick="approvePartner(${index})" class="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">Έγκριση</button>
        `;
        container.appendChild(div);
    });
}

function loadAdminDashboard() {
    const requests = JSON.parse(localStorage.getItem('partnerRequests') || '[]');
    const approved = JSON.parse(localStorage.getItem('approvedPartners') || '[]');
    const container = document.getElementById('admin-data-container');

    if (!container) return;

    container.innerHTML = `
        <div class="col-span-2">
            <h3 class="text-lg font-bold mb-4 text-yellow-600">Νέες Αιτήσεις (${requests.length})</h3>
            <div id="requests-list" class="space-y-2"></div>
            
            <h3 class="text-lg font-bold mt-8 mb-4 text-slate-800">Ενεργοί Συνεργάτες (${approved.length})</h3>
            <div id="active-partners-list" class="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        </div>
    `;

    // Γέμισμα αιτήσεων
    const reqList = document.getElementById('requests-list');
    if (reqList) {
        requests.forEach((p, i) => {
            reqList.innerHTML += `
                <div class="bg-white p-4 rounded-xl border flex justify-between items-center">
                    <span><strong>${p.name}</strong> - ${p.email}</span>
                    <button onclick="approvePartner(${i})" class="bg-green-600 text-white px-4 py-1 rounded-lg">Έγκριση</button>
                </div>
            `;
        });
    }

    // Γέμισμα ενεργών συνεργατών
    const actList = document.getElementById('active-partners-list');
    if (actList) {
        approved.forEach((p, i) => {
            actList.innerHTML += `
                <div class="bg-white p-4 rounded-xl border cursor-pointer hover:border-yellow-500" 
                     onclick="showPartnerDetails(${i})">
                    <p class="font-bold">${p.name}</p>
                    <p class="text-sm text-slate-500">${p.phone}</p>
                </div>
            `;
        });
    }
}

// Συνάρτηση Έγκρισης (Η μοναδική και σωστή)
function approvePartner(index) {
    let requests = JSON.parse(localStorage.getItem('partnerRequests') || '[]');
    let approved = JSON.parse(localStorage.getItem('approvedPartners') || '[]');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    let partner = requests[index];
    
    // ΤΟΝ ΠΡΟΣΘΕΤΟΥΜΕ ΣΤΗ ΛΙΣΤΑ USERS (για login)
    users.push({
        name: partner.name,
        email: partner.email,
        password: partner.pass, 
        role: 'partner'
    });
    
    // ΤΟΝ ΠΡΟΣΘΕΤΟΥΜΕ ΚΑΙ ΣΤΟΥΣ ΕΓΚΕΚΡΙΜΕΝΟΥΣ
    approved.push(partner);
    
    // ΑΠΟΘΗΚΕΥΟΥΜΕ ΟΛΑ
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('approvedPartners', JSON.stringify(approved));
    
    // ΔΙΑΓΡΑΦΗ ΑΠΟ ΤΑ ΕΚΚΡΕΜΗ
    requests.splice(index, 1);
    localStorage.setItem('partnerRequests', JSON.stringify(requests));
    
    alert("Ο συνεργάτης εγκρίθηκε επιτυχώς!");
    
    // ΔΙΟΡΘΩΣΗ: Αντί για location.reload(), καλούμε τις συναρτήσεις για να ανανεωθεί το panel
    if (typeof loadPartnerRequests === 'function') loadPartnerRequests();
    if (typeof loadAdminDashboard === 'function') loadAdminDashboard();
}

// --- Στοιχεία Συνεργάτη (Popup) ---
function showPartnerDetails(index) {
    let approved = JSON.parse(localStorage.getItem('approvedPartners') || '[]');
    let p = approved[index];
    if (!p) return;
    
    alert("Στοιχεία Συνεργάτη:\n" +
          "Όνομα: " + p.name + "\n" +
          "Email: " + p.email + "\n" +
          "Τηλ: " + p.phone);
}

function removePartner(index) {
    if(confirm('Διαγραφή αυτού του συνεργάτη;')) {
        let approved = JSON.parse(localStorage.getItem('approvedPartners') || '[]');
        approved.splice(index, 1);
        localStorage.setItem('approvedPartners', JSON.stringify(approved));
        loadAdminDashboard();
    }
}