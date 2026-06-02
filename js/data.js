// data.js

const services = {
    "Experiences": [
        { name: "Luxury Yacht", price: "500€", desc: "Ιδιωτική κρουαζιέρα στα νερά της Ρόδου.", img: "https://images.unsplash.com/photo-1569263979104-763435422830?w=400" },
        { name: "Scuba Diving", price: "120€", desc: "Εξερευνήστε τον βυθό με επαγγελματίες.", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400" }
    ],
    "Childcare": [
        { name: "Premium Nanny", price: "25€/h", desc: "Έμπειρες παιδαγωγοί για φύλαξη στο ξενοδοχείο.", img: "https://images.unsplash.com/photo-1516627145695-17215163481a?w=400" }
    ],
    "Transfers": [
        { name: "VIP Transfer", price: "80€", desc: "Μεταφορά με πολυτελές όχημα από/προς αεροδρόμιο.", img: "https://images.unsplash.com/photo-1621072156002-e355d04576c4?w=400" }
    ],
    "Safaris": [
        { name: "Jeep Safari", price: "150€", desc: "Περιπέτεια στα βουνά της Ρόδου.", img: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400" }
    ],
    "Villa": [
        { name: "Full Cleaning", price: "100€", desc: "Επαγγελματικός καθαρισμός βίλας.", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400" }
    ],
    "Wellness": [
        { name: "Luxury Massage", price: "90€", desc: "Χαλάρωση στο χώρο σας.", img: "https://images.unsplash.com/photo-1519824145371-296894a0bcd9?w=400" }
    ]
};

// Υπόλοιπες συναρτήσεις διαχείρισης
function saveBooking(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push({ ...bookingData, id: Date.now(), status: 'Pending' });
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

function getAllBookings() {
    return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function registerUser(userData) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = {
        name: userData.name,
        email: userData.email,
        pass: userData.pass,
        phone: userData.phone || '',
        hotel: userData.hotel || ''
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log("Ο χρήστης γράφτηκε με τα στοιχεία:", newUser);
}

function savePartnerRequest(partnerData) {
    let requests = JSON.parse(localStorage.getItem('partnerRequests') || '[]');
    requests.push({...partnerData, status: 'Pending'});
    localStorage.setItem('partnerRequests', JSON.stringify(requests));
}

const destinations = [
    {
        id: 'old-town',
        title: 'Old Town of Rhodes',
        text: 'The Old Town of Rhodes is not just a destination; it is a journey back in time. As a UNESCO World Heritage site, it offers an atmosphere rarely found elsewhere: imposing Knight’s castles, narrow cobblestone streets whispering centuries-old tales, and a unique blend of Byzantine, Ottoman, and Italian architecture. Why should you visit? Because here, history comes alive. You will wander through hidden courtyards, savor authentic flavors in picturesque tavernas, and feel the energy of a place that once served as the crossroads of civilizations. It is an experience that will remain etched in your memory forever.',
        image: 'img/old-town.jpg',
        photos: ['img/old-town-1.jpg', 'img/old-town-2.jpg', 'img/old-town-3.jpg', 'img/old-town-4.jpg']
    },
    {
        id: 'lindos',
        title: 'Lindos - The Jewel of Rhodes',
        text: 'Lindos is the quintessential Mediterranean dream, where ancient history meets modern luxury. Dominated by the majestic Acropolis, this picturesque village is a maze of sugar-cube houses and narrow, stone-paved alleys that lead to hidden rooftop terraces with unparalleled views. Why visit? Because Lindos offers the perfect balance between serenity and sophistication. You can explore the ancient temple at the summit of the Acropolis, relax in the crystal-clear turquoise waters of St. Paul’s Bay, and dine in world-class restaurants tucked away in traditional courtyards. It is not just a place to see; it is a place to be enchanted. Whether you are seeking a romantic escape or a cultural awakening, Lindos promises an experience that defines the magic of the Aegean.',
        image: 'img/lindos.jpg',
        photos: ['img/lindos 1.jpg', 'img/lindos 2.jpg', 'img/lindos 3.jpg', 'img/lindos 4.jpg']
    },
    {
        id: 'butterflies',
        title: 'Valley of the Butterflies',
        text: 'Step into a natural paradise that feels like a scene from a fairy tale. The Valley of the Butterflies is a rare ecological habitat, famous for the thousands of Panaxia quadripunctaria butterflies that blanket the valley during the summer months. Why visit? It is an oasis of tranquility, where lush greenery, bubbling streams, and wooden bridges create a soothing environment perfect for a meditative escape from the bustling tourist hubs. Walking through this shaded valley, you will hear the gentle sound of waterfalls and see a mesmerizing display of colors. It is the ultimate retreat for nature lovers seeking a unique, serene experience in the heart of Rhodes.',
        image: 'img/butterflies.jpg',
        photos: ['img/Butterflies-1.jpg', 'img/Butterflies-2.jpg', 'img/Butterflies-3.jpg', 'img/Butterflies-4.jpg']
    },
    {
        id: 'kallithea-springs',
        title: 'Kallithea Springs',
        text: 'Kallithea Springs is a masterpiece of architectural elegance and natural beauty. Renowned for its therapeutic waters since ancient times, this historic site has been meticulously restored to offer a unique blend of grand Art Deco architecture, mosaic-covered courtyards, and emerald waters. Why visit? It is the definition of sophisticated relaxation. You can lounge on sunbeds by the stunning Aegean sea, enjoy a refreshment under the palm trees, or simply admire the intricate pebble mosaics that decorate the ground. Kallithea Springs is where history meets luxury, making it an essential stop for travelers looking to experience the chic side of Rhodes in an environment of timeless charm.',
        image: 'img/kallithea-springs.jpg',
        photos: ['img/kallithea-springs-1.jpg', 'img/kallithea-springs-2.jpg', 'img/kallithea-springs-3.jpg', 'img/kallithea-springs-4.jpg']
    },
    {
        id: 'filerimos',
        title: 'Filerimos Hill',
        text: 'Rising above the town of Ialysos, Filerimos Hill is a sanctuary of peace and history. Home to the remains of the ancient city of Ialysos and the impressive Monastery of Filerimos, the site offers a unique blend of Byzantine architecture and breathtaking panoramic views of the Aegean Sea. Why visit? It is a place where you can walk the "Golgotha" path, surrounded by cypress trees, and encounter the iconic peacocks that roam freely throughout the area. Whether you are looking for a spiritual retreat, a historical journey, or simply the best sunset spot in Rhodes, Filerimos provides an atmosphere of timeless serenity that captivates every visitor.',
        image: 'img/Filerimos.jpg',
        photos: ['img/Filerimos-1.jpg', 'img/Filerimos-2.jpg', 'img/Filerimos-3.jpg', 'img/Filerimos-4.jpg']
    },
    {
        id: 'seven-springs',
        title: 'Seven Springs (Epta Piges)',
        text: 'Seven Springs is one of the most enchanting and refreshing locations on the island. This lush, green oasis features a lake fed by seven distinct springs that flow together throughout the year. Why visit? It is the perfect escape for nature lovers who want to experience the cool, shaded forest paths and the unique adventure of walking through the famous, narrow 186-meter dark tunnel that leads to the lake. The area is home to free-roaming ducks, peacocks, and geese, adding to its whimsical charm. Whether you are seeking a moment of tranquility by the waterfall or a fun adventure in the tunnel, Epta Piges offers an immersive experience in the heart of the Rhodian nature.',
        image: 'img/7springs.jpg',
        photos: ['img/7springs-1.jpg', 'img/7springs-2.jpg', 'img/7springs-3.jpg', 'img/7springs-4.jpg']
    },
    {
        id: 'ancient-kamiros',
        title: 'Ancient Kamiros',
        text: 'Known as the "Pompeii of Rhodes," Ancient Kamiros is one of the three great ancient cities of the island. Unlike other fortified ancient cities, Kamiros was a purely agricultural town that flourished in the Hellenistic period, offering a glimpse into the daily life of its ancient inhabitants. Why visit? It provides a rare and authentic look at ancient urban planning. Walking through the remnants of private homes, temples, and the impressive stoa, you can feel the serenity of a bygone era. Perched on the hillside with panoramic views overlooking the deep blue Aegean Sea, it is a place of profound history and quiet beauty, perfect for travelers who appreciate the depth of Greek antiquity.',
        image: 'img/arxaia-kamiros.jpg',
        photos: ['img/arxaia-kamiros-1.jpg', 'img/arxaia-kamiros-2.jpg', 'img/arxaia-kamiros-3.jpg', 'img/arxaia-kamiros-4.jpg']
    },
    {
        id: 'monolithos-castle',
        title: 'Monolithos Castle',
        text: 'Perched dramatically atop a massive, isolated rock formation 236 meters above the sea, Monolithos Castle is the ultimate destination for those seeking adventure and panoramic views. Built by the Knights of St. John in 1480, this historic fortress offers a breathtaking perspective of the Aegean Sea and the surrounding rugged landscape. Why visit? It is the most spectacular spot in Rhodes to witness a sunset. The climb to the top is an experience in itself, leading you through narrow, weathered stone paths to reach the tiny, charming chapel within the castle walls. It is a place of raw, wild beauty that leaves every visitor speechless.',
        image: 'img/Castle-monolithos.jpg',
        photos: ['img/Castle-monolithos-1.jpg', 'img/Castle-monolithos-2.jpg', 'img/Castle-monolithos-3.jpg', 'img/Castle-monolithos-4.jpg']
    },
    {
        id: 'anthony-quinn',
        title: 'Anthony Quinn Beach',
        text: 'Widely considered one of the most beautiful beaches on the island, Anthony Quinn Beach is a hidden gem named after the legendary actor who fell in love with this spot while filming "The Guns of Navarone." Its emerald waters, enclosed by dramatic cliffs and lush pine trees, create a breathtaking natural swimming pool. Why visit? The crystal-clear sea is a paradise for snorkeling and swimming, while the unique rocky landscape provides an intimate, tranquil atmosphere. Whether you are looking for the perfect sun-kissed photo or a refreshing dip in deep turquoise waters, this beach is an essential stop for anyone wanting to experience the iconic beauty of the Rhodian coastline.',
        image: 'img/Anthony-Quinn.jpg',
        photos: ['img/Anthony-Quinn-1.jpg', 'img/Anthony-Quinn-2.jpg', 'img/Anthony-Quinn-3.jpg', 'img/Anthony-Quinn-4.jpg']
    },
    {
        id: 'prasonisi',
        title: 'Prasonisi',
        text: 'Located at the southernmost tip of Rhodes, Prasonisi is a unique natural phenomenon where two seas meet: the calm Mediterranean and the wavy Aegean. This "meeting of the two seas" creates a spectacular landscape of sand dunes that connect the mainland to a small islet. Why visit? It is the ultimate playground for windsurfers and kitesurfers from around the world due to the ideal wind conditions. Even if you are not a water sports enthusiast, the sight of the turquoise waters crashing from both sides of the narrow sandy strip is surreal. It is a place of wild, untamed beauty that represents the raw power of nature at the end of the world.',
        image: 'img/prasonisi.jpg',
        photos: ['img/prasonisi-1.jpg', 'img/prasonisi-2.jpg', 'img/prasonisi-3.jpg', 'img/prasonisi-4.jpg']
    }
];

let currentBookingService = "";

function showMarketplace(category) {
    showPage('service-marketplace');
    const catTitle = document.getElementById('cat-title');
    if (catTitle) catTitle.innerText = category;
    const container = document.getElementById('cat-items');
    if (!container) return;
    container.innerHTML = ''; 
    const approved = JSON.parse(localStorage.getItem('approvedServices')) || [];
    const filtered = approved.filter(s => s.desc.includes(category) || s.title.includes(category));
    
    filtered.forEach(item => {
        container.innerHTML += `
            <div class="bg-white border rounded-2xl p-6">
                <h3 class="text-xl font-bold">${item.title}</h3>
                <p>${item.desc}</p>
                <button onclick="openBooking('${item.title}')" class="bg-slate-800 text-white p-2 rounded mt-2">Book</button>
            </div>`;
    });
}

function openBooking(title) {
    currentBookingService = title;
    showPage('booking-form');
}

function submitBooking() {
    const date = document.getElementById('book-date').value;
    const notes = document.getElementById('book-notes').value;
    const loggedInUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!loggedInUser) { 
        alert("Πρέπει να είσαι συνδεδεμένος!"); 
        showPage('login-page'); 
        return; 
    }
    if (date) { 
        saveBooking({ 
            serviceTitle: currentBookingService, 
            date: date, 
            notes: notes, 
            customer: loggedInUser.email, 
            status: 'Pending',
            price: 0 
        });
        alert("Η κράτηση στάλθηκε!"); 
        showPage('home-page'); 
    } else {
        alert("Παρακαλώ συμπληρώστε ημερομηνία.");
    }
}

function renderProfile() {
    const nameHeader = document.getElementById('u-name-header');
    if (!nameHeader) return;
    nameHeader.innerText = "Το όνομά σου";
}

function editProfile() {
    const btn = document.getElementById('edit-btn');
    if (!btn) return;
    const fields = ['u-email', 'u-phone', 'u-hotel'];
    if (btn.innerText === "Edit Profile") {
        fields.forEach(id => {
            const span = document.getElementById(id);
            if (span) span.innerHTML = `<input type="text" value="${span.innerText}" id="in-${id}" class="border border-yellow-500 rounded p-1 w-full text-black">`;
        });
        btn.innerText = "Save Changes";
        btn.classList.replace('bg-slate-800', 'bg-green-600');
    } else {
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        fields.forEach(id => {
            const input = document.getElementById(`in-${id}`);
            if (input) {
                const newValue = input.value;
                user[id.replace('u-', '')] = newValue;
                const span = document.getElementById(id);
                if (span) span.innerText = newValue;
            }
        });
        localStorage.setItem('currentUser', JSON.stringify(user));
        btn.innerText = "Edit Profile";
        btn.classList.replace('bg-green-600', 'bg-slate-800');
        alert("Profile updated!");
    }
}

function showDestinationsPage() {
    document.querySelectorAll('.page').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
    const destPage = document.getElementById('destinations-page');
    if (destPage) { destPage.style.display = 'flex'; destPage.classList.add('active'); }
    
    const list = document.getElementById('destinations-list');
    if (list) {
        list.innerHTML = destinations.map(dest => `
            <div class="bg-white p-4 rounded-2xl shadow border cursor-pointer hover:shadow-lg transition" onclick="showDestDetails('${dest.id}')">
                <img src="${dest.image}" class="w-full h-48 object-cover rounded-xl mb-4">
                <h3 class="font-bold text-xl text-slate-800">${dest.title}</h3>
            </div>
        `).join('');
    }
}

function showDestDetails(id) {
    const dest = destinations.find(d => d.id === id);
    if (!dest) return;
    const titleEl = document.getElementById('d-title');
    const textEl = document.getElementById('d-text');
    if (titleEl) titleEl.innerText = dest.title;
    if (textEl) textEl.innerText = dest.text;
    const gallery = document.getElementById('d-gallery');
    if (gallery) {
        gallery.innerHTML = dest.photos.map(photo => `
            <div class="w-full h-80 overflow-hidden rounded-3xl shadow-2xl mb-6">
                <img src="${photo}" class="w-full h-full object-cover transform hover:scale-105 transition duration-500">
            </div>
        `).join('');
    }
    document.querySelectorAll('.page').forEach(p => { p.style.display = 'none'; });
    const target = document.getElementById('dest-details-page');
    if (target) { target.style.display = 'flex'; target.classList.add('active'); }
}