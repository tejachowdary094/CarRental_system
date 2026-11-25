
// =====================================
// DRIVEX - CAR RENTAL SYSTEM
// FRONTEND JAVASCRIPT
// =====================================

// CAR DATABASE (DEMO DATA)

const cars = [
    {
        id: 1,
        name: "Porsche 911",
        type: "Sports",
        price: 12000,
        seats: 2,
        fuel: "Petrol",
        mileage: "12 km/l",
        transmission: "Automatic",
        eco: 45,
        purpose: ["Luxury", "Adventure"],
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
    },
    {
        id: 2,
        name: "BMW X5",
        type: "SUV",
        price: 8500,
        seats: 5,
        fuel: "Diesel",
        mileage: "14 km/l",
        transmission: "Automatic",
        eco: 55,
        purpose: ["Family", "Business", "Adventure"],
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800"
    },
    {
        id: 3,
        name: "Mercedes-Benz C-Class",
        type: "Luxury",
        price: 9500,
        seats: 5,
        fuel: "Petrol",
        mileage: "16 km/l",
        transmission: "Automatic",
        eco: 60,
        purpose: ["Luxury", "Business"],
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800"
    },
    {
        id: 4,
        name: "Tesla Model 3",
        type: "Electric",
        price: 7500,
        seats: 5,
        fuel: "Electric",
        mileage: "EV",
        transmission: "Automatic",
        eco: 95,
        purpose: ["Eco", "Business"],
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800"
    },
    {
        id: 5,
        name: "Range Rover Sport",
        type: "SUV",
        price: 11000,
        seats: 5,
        fuel: "Diesel",
        mileage: "13 km/l",
        transmission: "Automatic",
        eco: 50,
        purpose: ["Family", "Luxury", "Adventure"],
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"
    },
    {
        id: 6,
        name: "Audi A6",
        type: "Sedan",
        price: 7000,
        seats: 5,
        fuel: "Petrol",
        mileage: "17 km/l",
        transmission: "Automatic",
        eco: 65,
        purpose: ["Business", "Family"],
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800"
    },
    {
        id: 7,
        name: "Lamborghini Huracan",
        type: "Sports",
        price: 25000,
        seats: 2,
        fuel: "Petrol",
        mileage: "8 km/l",
        transmission: "Automatic",
        eco: 25,
        purpose: ["Luxury", "Adventure"],
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800"
    },
    {
        id: 8,
        name: "Toyota Fortuner",
        type: "SUV",
        price: 6500,
        seats: 7,
        fuel: "Diesel",
        mileage: "14 km/l",
        transmission: "Automatic",
        eco: 55,
        purpose: ["Family", "Adventure"],
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800"
    },
    {
        id: 9,
        name: "Hyundai IONIQ 5",
        type: "Electric",
        price: 8000,
        seats: 5,
        fuel: "Electric",
        mileage: "EV",
        transmission: "Automatic",
        eco: 95,
        purpose: ["Eco", "Family"],
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800"
    }
];

let activeCategory = "All";
let currentCars = [...cars];

// =====================================
// LOCAL STORAGE
// =====================================

function getBookings() {
    try {
        return JSON.parse(localStorage.getItem("drivexBookings")) || [];
    } catch {
        return [];
    }
}

function saveBookings(bookings) {
    localStorage.setItem("drivexBookings", JSON.stringify(bookings));
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem("drivexFavorites")) || [];
    } catch {
        return [];
    }
}

// =====================================
// DISPLAY CARS
// =====================================

function displayCars(list) {
    const grid = document.getElementById("carGrid");

    if (!list.length) {
        grid.innerHTML = `
            <div class="empty-state">
                No cars found. Try another category or search.
            </div>
        `;
        return;
    }

    grid.innerHTML = list.map(car => {
        const favorites = getFavorites();
        const isFavorite = favorites.includes(car.id);

        return `
        <div class="car-card">
            <div class="car-image">
                <img src="${car.image}"
                     alt="${car.name}"
                     loading="lazy"
                     onerror="this.src='https://placehold.co/600x400/191919/d6ad60?text=DriveX+Car'">

                <span class="car-tag">${car.type}</span>

                <button class="favorite-btn ${isFavorite ? "active" : ""}"
                    onclick="toggleFavorite(${car.id})"
                    aria-label="Toggle favourite">
                    ${isFavorite ? "♥" : "♡"}
                </button>
            </div>

            <div class="car-info">
                <h3 class="car-title">${car.name}</h3>
                <p class="car-type">Premium ${car.type} Collection</p>

                <div class="car-specs">
                    <span>👥 ${car.seats} Seats</span>
                    <span>⚙ ${car.transmission}</span>
                    <span>⛽ ${car.fuel}</span>
                </div>

                <div class="car-specs">
                    <span>⛽ ${car.mileage}</span>
                    <span>🌿 Eco ${car.eco}/100</span>
                </div>

                <div class="car-bottom">
                    <div class="car-price">
                        <strong>₹${car.price.toLocaleString("en-IN")}</strong>
                        <small>Per day</small>
                    </div>

                    <div class="car-buttons">
                        <button class="compare-add"
                            onclick="addToCompare(${car.id})">
                            Compare
                        </button>

                        <button class="gold-btn"
                            onclick="openBooking(${car.id})">
                            Book
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
    }).join("");
}

// =====================================
// CATEGORY FILTER
// =====================================

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".category").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        activeCategory = button.dataset.category;

        applyFilters();
    });
});

function applyFilters() {
    currentCars = activeCategory === "All"
        ? [...cars]
        : cars.filter(car => car.type === activeCategory);

    displayCars(currentCars);
}

// =====================================
// SORT CARS
// =====================================

document.getElementById("sortCars").addEventListener("change", function() {

    let sorted = [...currentCars];

    if (this.value === "low") {
        sorted.sort((a, b) => a.price - b.price);
    }

    if (this.value === "high") {
        sorted.sort((a, b) => b.price - a.price);
    }

    displayCars(sorted);
});

// =====================================
// SEARCH BY LOCATION AND DATES
// =====================================

document.getElementById("searchForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const pickup = document.getElementById("pickupDate").value;
    const drop = document.getElementById("returnDate").value;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (new Date(pickup + "T00:00:00") < today) {
        alert("Pickup date cannot be in the past.");
        return;
    }

    if (new Date(drop + "T00:00:00") <= new Date(pickup + "T00:00:00")) {
        alert("Return date must be after pickup date.");
        return;
    }

    alert("Search dates selected! Explore the available car collection.");

    document.getElementById("cars").scrollIntoView({
        behavior: "smooth"
    });
});

// =====================================
// FAVORITE CARS
// =====================================

function toggleFavorite(id) {

    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(item => item !== id);
    } else {
        favorites.push(id);
    }

    localStorage.setItem("drivexFavorites", JSON.stringify(favorites));

    displayCars(currentCars);
}

// =====================================
// SMART CAR RECOMMENDATION
// =====================================

function recommendCar() {

    const budget = Number(document.getElementById("budget").value);
    const purpose = document.getElementById("purpose").value;
    const result = document.getElementById("recommendation");

    if (!budget || budget <= 0) {
        alert("Please enter a valid daily budget.");
        return;
    }

    let suggestions = cars.filter(car => {
        const matchesBudget = car.price <= budget;

        const matchesPurpose =
            purpose === "Any" || car.purpose.includes(purpose);

        return matchesBudget && matchesPurpose;
    });

    suggestions.sort((a, b) => a.price - b.price);

    if (suggestions.length === 0) {
        result.innerHTML = `
            <div class="empty-state">
                No exact match found for this budget and purpose.
                Try increasing your budget or changing your purpose.
            </div>
        `;
        return;
    }

    const car = suggestions[0];

    result.innerHTML = `
        <div class="car-card">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
            </div>

            <div class="car-info">
                <p class="eyebrow">YOUR SMART MATCH</p>
                <h3>${car.name}</h3>
                <p class="muted">
                    A ${car.type} recommendation for your journey.
                </p>
                <h3 style="color:#d6ad60;margin:15px 0">
                    ₹${car.price.toLocaleString("en-IN")} / day
                </h3>
                <button class="gold-btn" onclick="openBooking(${car.id})">
                    Book Recommended Car
                </button>
            </div>
        </div>
    `;

    result.scrollIntoView({behavior: "smooth", block: "nearest"});
}

// =====================================
// CAR COMPARISON
// =====================================

function setupCompareOptions() {

    ["compareOne", "compareTwo", "compareThree"].forEach(id => {

        const select = document.getElementById(id);

        cars.forEach(car => {
            const option = document.createElement("option");

            option.value = car.id;
            option.textContent = car.name;

            select.appendChild(option);
        });
    });
}

function addToCompare(id) {

    const available = [
        "compareOne",
        "compareTwo",
        "compareThree"
    ];

    if (available.some(key =>
        document.getElementById(key).value === String(id)
    )) {
        alert("This car is already selected.");
        return;
    }

    const empty = available.find(key =>
        !document.getElementById(key).value
    );

    if (!empty) {
        alert("You can compare up to three cars. Clear a selection first.");
        return;
    }

    document.getElementById(empty).value = String(id);

    document.getElementById("compare").scrollIntoView({
        behavior: "smooth"
    });
}

function compareCars() {

    const ids = [
        document.getElementById("compareOne").value,
        document.getElementById("compareTwo").value,
        document.getElementById("compareThree").value
    ].filter(Boolean);

    const uniqueIds = [...new Set(ids)];

    if (uniqueIds.length < 2) {
        alert("Please select at least two different cars.");
        return;
    }

    const selected = uniqueIds.map(id =>
        cars.find(car => car.id === Number(id))
    );

    const rows = [
        ["Price / Day", car => "₹" + car.price.toLocaleString("en-IN")],
        ["Category", car => car.type],
        ["Seats", car => car.seats],
        ["Fuel", car => car.fuel],
        ["Mileage", car => car.mileage],
        ["Transmission", car => car.transmission],
        ["Eco Score", car => car.eco + "/100"]
    ];

    const result = document.getElementById("compareResult");

    result.innerHTML = `
        <div style="overflow-x:auto">
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Features</th>
                        ${selected.map(car => `<th>${car.name}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(([label, value]) => `
                        <tr>
                            <td>${label}</td>
                            ${selected.map(car => `<td>${value(car)}</td>`).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;
}

// =====================================
// DATE HELPERS
// =====================================

function getLocalDate() {

    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;

    return new Date(now.getTime() - offset)
        .toISOString()
        .split("T")[0];
}

function getRentalDays(pickup, drop) {

    const start = new Date(pickup + "T00:00:00");
    const end = new Date(drop + "T00:00:00");

    return Math.round((end - start) / 86400000);
}

// =====================================
// BOOKING MODAL
// =====================================

function openBooking(id) {

    const car = cars.find(item => item.id === id);

    if (!car) return;

    document.getElementById("selectedCar").value = id;

    document.getElementById("bookingModal").classList.add("show");

    const today = getLocalDate();

    const pickup = document.getElementById("bookPickup");
    const drop = document.getElementById("bookReturn");

    pickup.min = today;
    drop.min = today;

    pickup.value = "";
    drop.value = "";

    document.getElementById("priceEstimate").innerHTML =
        `<strong>${car.name}</strong><br>
         ₹${car.price.toLocaleString("en-IN")} per day<br>
         Select your dates to calculate the total.`;
}

function closeModal(id) {
    document.getElementById(id).classList.remove("show");
}

// =====================================
// LIVE PRICE CALCULATION
// =====================================

function calculatePrice() {

    const id = Number(document.getElementById("selectedCar").value);
    const car = cars.find(item => item.id === id);

    const pickup = document.getElementById("bookPickup").value;
    const drop = document.getElementById("bookReturn").value;

    const output = document.getElementById("priceEstimate");

    if (!car || !pickup || !drop) return;

    const days = getRentalDays(pickup, drop);

    if (days <= 0) {
        output.innerHTML = "Return date must be after pickup date.";
        return;
    }

    const rental = car.price * days;
    const serviceFee = Math.round(rental * 0.05);
    const total = rental + serviceFee;

    output.dataset.total = total;

    output.innerHTML = `
        <strong>Price Breakdown</strong><br>
        Rental: ₹${rental.toLocaleString("en-IN")}<br>
        Demo service fee (5%): ₹${serviceFee.toLocaleString("en-IN")}<br>
        Duration: ${days} day(s)<br>
        <hr style="border-color:#66502b;margin:10px 0">
        <strong>Total Estimate: ₹${total.toLocaleString("en-IN")}</strong>
    `;
}

document.getElementById("bookPickup").addEventListener("change", function() {

    const drop = document.getElementById("bookReturn");

    drop.min = this.value ? getNextDate(this.value) : getLocalDate();

    if (drop.value && drop.value <= this.value) {
        drop.value = "";
    }

    calculatePrice();
});

document.getElementById("bookReturn").addEventListener("change", calculatePrice);

function getNextDate(date) {

    const next = new Date(date + "T00:00:00");

    next.setDate(next.getDate() + 1);

    const year = next.getFullYear();
    const month = String(next.getMonth() + 1).padStart(2, "0");
    const day = String(next.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

// =====================================
// CONFIRM BOOKING
// =====================================

document.getElementById("bookingForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const carId = Number(document.getElementById("selectedCar").value);
    const car = cars.find(item => item.id === carId);

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();

    const pickup = document.getElementById("bookPickup").value;
    const drop = document.getElementById("bookReturn").value;

    const today = getLocalDate();

    if (!car || !name || !email || !pickup || !drop) {
        alert("Please complete all booking details.");
        return;
    }

    if (pickup < today || drop <= pickup) {
        alert("Please select valid booking dates.");
        return;
    }

    const days = getRentalDays(pickup, drop);

    const rental = car.price * days;
    const serviceFee = Math.round(rental * 0.05);
    const total = rental + serviceFee;

    const booking = {
        id: "DX" + Date.now().toString().slice(-8),
        carName: car.name,
        customer: name,
        email: email,
        pickup: pickup,
        drop: drop,
        days: days,
        total: total,
        status: "Demo Booking Created"
    };

    const bookings = getBookings();

    bookings.unshift(booking);

    saveBookings(bookings);

    document.getElementById("confirmationDetails").innerHTML = `
        <div class="confirmation-details">
            <p><strong>Booking ID:</strong> ${booking.id}</p>
            <p><strong>Customer:</strong> ${booking.customer}</p>
            <p><strong>Car:</strong> ${booking.carName}</p>
            <p><strong>Pickup:</strong> ${booking.pickup}</p>
            <p><strong>Return:</strong> ${booking.drop}</p>
            <p><strong>Duration:</strong> ${booking.days} days</p>
            <p><strong>Total:</strong> ₹${booking.total.toLocaleString("en-IN")}</p>
            <p><strong>Status:</strong> ${booking.status}</p>
        </div>
        <p class="muted">This is a frontend demo confirmation, not an actual vehicle reservation.</p>
    `;

    document.getElementById("bookingForm").reset();

    closeModal("bookingModal");

    document.getElementById("confirmationModal").classList.add("show");

    displayBookings();
});

// =====================================
// DISPLAY BOOKING HISTORY
// =====================================

function displayBookings() {

    const bookings = getBookings();
    const container = document.getElementById("bookingList");

    if (!bookings.length) {
        container.innerHTML = `
            <p class="muted">No demo bookings yet. Explore our cars and make a booking!</p>
        `;
        return;
    }

    container.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div>
                <strong>${booking.carName}</strong>
                <p class="muted">Booking ID: ${booking.id}</p>
                <p class="muted">${booking.pickup} to ${booking.drop}</p>
            </div>

            <div>
                <strong>₹${booking.total.toLocaleString("en-IN")}</strong>
                <p class="muted">${booking.status}</p>
            </div>
        </div>
    `).join("");
}

// =====================================
// LOGIN DEMONSTRATION
// =====================================

function showLogin() {
    document.getElementById("loginModal").classList.add("show");
}

document.getElementById("loginForm").addEventListener("submit", function(e) {

    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    alert("Demo login form submitted for " + email +
        ". Real authentication requires a secure backend.");

    closeModal("loginModal");
    this.reset();
});

// =====================================
// MOBILE MENU
// =====================================

function toggleMenu() {

    document.getElementById("navLinks").classList.toggle("open");
}

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {
        document.getElementById("navLinks").classList.remove("open");
    });
});

// =====================================
// INITIALIZE WEBSITE
// =====================================

document.addEventListener("DOMContentLoaded", function() {

    displayCars(cars);

    setupCompareOptions();

    displayBookings();

    document.getElementById("pickupDate").min = getLocalDate();
    document.getElementById("returnDate").min = getLocalDate();

    document.getElementById("pickupDate").addEventListener("change", function() {

        const drop = document.getElementById("returnDate");

        drop.min = this.value ? getNextDate(this.value) : getLocalDate();

        if (drop.value && drop.value <= this.value) {
            drop.value = "";
        }
    });
});
