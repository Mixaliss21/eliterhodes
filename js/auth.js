function handleLogin() {
    const email = document.getElementById('partner-email').value;
    const pass = document.getElementById('partner-pass').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = users.find(u => u.email === email && (u.pass === pass || u.password === pass));

    if (foundUser) {
        const savedProfileData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        const finalUserData = (savedProfileData.email === foundUser.email) 
            ? { ...savedProfileData, ...foundUser } 
            : foundUser;

        localStorage.setItem('currentUser', JSON.stringify(finalUserData));
        localStorage.setItem('partnerEmail', foundUser.email);
        
        window.location.href = 'partner-dashboard.html';
    } else {
        alert("Λάθος στοιχεία! Δεν βρέθηκε συνεργάτης με αυτό το email/κωδικό.");
        console.log("Δοκιμάστηκαν:", email, pass);
    }
}

function handlePartnerRegister() {
    const name = document.getElementById('partner-reg-name').value;
    const email = document.getElementById('partner-reg-email').value;
    const phone = document.getElementById('partner-reg-phone').value;
    const pass = document.getElementById('partner-reg-pass').value;

    if (name && email && phone && pass) {
        const requests = JSON.parse(localStorage.getItem('partnerRequests') || '[]');
        requests.push({ name, email, phone, pass, status: 'pending' });
        localStorage.setItem('partnerRequests', JSON.stringify(requests));
        alert("Η αίτησή σας στάλθηκε!");
        showPage('partner-login');
    } else {
        alert("Συμπλήρωσε όλα τα πεδία!");
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('partnerEmail');
    window.location.href = 'index.html'; 
}

function saveNewUser() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const phone = document.getElementById('reg-phone').value;
    const hotel = document.getElementById('reg-hotel').value;
    const pass = document.getElementById('reg-pass').value;
    
    if (name && email && phone && hotel && pass) {
        let users = JSON.parse(localStorage.getItem('users') || '[]');
        const newUser = { name, email, phone, hotel, pass, role: 'customer' };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        alert("Εγγραφή επιτυχής!");
        showPage('home-page');
    } else {
        alert("Συμπλήρωσε όλα τα πεδία!");
    }
}

function loginUser() {
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    const foundUser = users.find(u => u.email === emailInput && u.pass === passInput);
    
    if (foundUser) {
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        alert("Επιτυχής σύνδεση!");
        window.location.href = 'partner-dashboard.html';
    } else {
        alert("Λάθος στοιχεία!");
    }
}

function renderProfile() {
    const session = JSON.parse(localStorage.getItem('customer_session'));
    
    if (session) {
        const nameHeader = document.getElementById('u-name-header');
        if (nameHeader) nameHeader.innerText = session.name;
        
        const uName = document.getElementById('u-name');
        if (uName) uName.innerText = session.name;
        
        const uEmail = document.getElementById('u-email');
        if (uEmail) uEmail.innerText = session.email;
        
        const uPhone = document.getElementById('u-phone');
        if (uPhone) uPhone.innerText = session.phone;
        
        const uHotel = document.getElementById('u-hotel');
        if (uHotel) uHotel.innerText = session.hotel;
        
        showPage('profile-page');
    } else {
        showPage('login-page');
    }
}

function handleCustomerLogin() {
    const emailInput = document.getElementById('email').value;
    const passInput = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const foundUser = users.find(u => u.email === emailInput && u.pass === passInput);

    if (foundUser) {
        localStorage.setItem('customer_session', JSON.stringify(foundUser));
        
        const nameHeader = document.getElementById('u-name-header');
        if (nameHeader) nameHeader.innerText = foundUser.name;
        
        const uName = document.getElementById('u-name');
        if (uName) uName.innerText = foundUser.name;
        
        const uEmail = document.getElementById('u-email');
        if (uEmail) uEmail.innerText = foundUser.email;
        
        const uPhone = document.getElementById('u-phone');
        if (uPhone) uPhone.innerText = foundUser.phone;
        
        const uHotel = document.getElementById('u-hotel');
        if (uHotel) uHotel.innerText = foundUser.hotel;

        showPage('profile-page');
    } else {
        alert("Λάθος στοιχεία!");
    }
}

function logoutCustomer() {
    localStorage.removeItem('customer_session');
    alert("Αποσύνδεση επιτυχής");
    showPage('home-page');
}