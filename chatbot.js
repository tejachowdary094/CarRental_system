
// DRIVEX AI RENTAL ASSISTANT

const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotBox = document.getElementById("chatbotBox");
const closeChat = document.getElementById("closeChat");

const chatInput = document.getElementById("chatInput");
const sendChat = document.getElementById("sendChat");
const chatMessages = document.getElementById("chatMessages");

// DriveX car database
const chatbotCars = [
    { name: "Porsche 911", price: 12000 },
    { name: "BMW X5", price: 8500 },
    { name: "Mercedes-Benz C-Class", price: 9500 },
    { name: "Tesla Model 3", price: 7500 },
    { name: "Range Rover Sport", price: 11000 },
    { name: "Audi A6", price: 7000 },
    { name: "Lamborghini Huracan", price: 25000 },
    { name: "Toyota Fortuner", price: 6500 },
    { name: "Hyundai IONIQ 5", price: 8000 }
];

// Open chatbot
chatbotToggle.addEventListener("click", () => {
    chatbotBox.classList.toggle("active");
});

// Close chatbot
closeChat.addEventListener("click", () => {
    chatbotBox.classList.remove("active");
});

// Send message
sendChat.addEventListener("click", sendMessage);

chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Display message
function addMessage(message, className) {
    const messageDiv = document.createElement("div");

    messageDiv.className = className;
    messageDiv.textContent = message;

    chatMessages.appendChild(messageDiv);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Process message
function sendMessage() {

    const message = chatInput.value.trim();

    if (message === "") {
        return;
    }

    addMessage(message, "user-message");

    chatInput.value = "";

    const reply = getBotResponse(message);

    setTimeout(() => {
        addMessage(reply, "bot-message");
    }, 400);
}

// Chatbot response system
function getBotResponse(message) {

    const msg = message.toLowerCase();

    // Greeting
    if (
        msg.includes("hello") ||
        msg.includes("hi") ||
        msg.includes("hey")
    ) {
        return "Hello! Welcome to DriveX. How can I help you today?";
    }

    // Show all cars
    if (
        msg.includes("cars") ||
        msg.includes("available cars") ||
        msg.includes("list")
    ) {
        return "Our cars include Porsche 911, BMW X5, Mercedes-Benz C-Class, Tesla Model 3, Range Rover Sport, Audi A6, Lamborghini Huracan, Toyota Fortuner and Hyundai IONIQ 5.";
    }

    // Price enquiry
    if (
        msg.includes("price") ||
        msg.includes("cost") ||
        msg.includes("rent")
    ) {

        const foundCar = chatbotCars.find(car =>
            msg.includes(car.name.toLowerCase())
        );

        if (foundCar) {
            return `${foundCar.name} rental price is ₹${foundCar.price} per day.`;
        }

        return "Our rental prices start from ₹6,500 per day. Which car would you like to know about?";
    }

    // Budget search
    if (
        msg.includes("budget") ||
        msg.includes("cheap") ||
        msg.includes("affordable")
    ) {
        return "Our budget-friendly options include Toyota Fortuner at ₹6,500/day and Audi A6 at ₹7,000/day. These are demo catalogue prices.";
    }

    // Availability
    if (msg.includes("available") || msg.includes("availability")) {
        return "You can explore our car listings and select your pickup and return dates. Actual live availability is not connected in this demo yet.";
    }

    // Booking
    if (msg.includes("booking") || msg.includes("book")) {
        return "To make a demo booking, visit the Home page, choose a car, select pickup and return dates, and submit the booking form.";
    }

    // Cancellation
    if (msg.includes("cancel")) {
        return "Please visit your customer dashboard to check your booking details. Booking cancellation is not yet connected in this demo.";
    }

    // Contact
    if (msg.includes("contact") || msg.includes("help")) {
        return "I'm the DriveX virtual assistant. Ask me about car prices, available cars or bookings.";
    }

    // Thank you
    if (msg.includes("thank")) {
        return "You're welcome! Thank you for choosing DriveX.";
    }

    // Default
    return "Sorry, I didn't understand that. You can ask me about car prices, cars, availability or bookings.";
}
