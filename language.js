
const translations = {

    en: {
        home: "Home",
        cars: "Explore Cars",
        smart: "Smart Finder",
        compare: "Compare",
        dashboard: "Dashboard",
        register: "Register",
        login: "Login",
        heroTitle: "Find Your Perfect Drive",
        heroText: "Experience luxury and comfort with DriveX.",
        explore: "Explore Our Cars",
        book: "Book Now",
        price: "Price Per Day",
        pickup: "Pickup Date",
        drop: "Return Date",
        search: "Search Cars",
        popular: "Popular Cars",
        features: "Our Features",
        footer: "Your journey, our responsibility."
    },

    hi: {
        home: "होम",
        cars: "कारें देखें",
        smart: "स्मार्ट खोज",
        compare: "तुलना करें",
        dashboard: "डैशबोर्ड",
        register: "रजिस्टर करें",
        login: "लॉगिन",
        heroTitle: "अपनी पसंदीदा कार खोजें",
        heroText: "DriveX के साथ आराम और लग्जरी का अनुभव करें।",
        explore: "हमारी कारें देखें",
        book: "अभी बुक करें",
        price: "प्रतिदिन किराया",
        pickup: "पिकअप की तारीख",
        drop: "वापसी की तारीख",
        search: "कार खोजें",
        popular: "लोकप्रिय कारें",
        features: "हमारी सुविधाएँ",
        footer: "आपका सफर, हमारी जिम्मेदारी।"
    },

    te: {
        home: "హోమ్",
        cars: "కార్లను చూడండి",
        smart: "స్మార్ట్ సెర్చ్",
        compare: "పోల్చండి",
        dashboard: "డాష్‌బోర్డ్",
        register: "నమోదు",
        login: "లాగిన్",
        heroTitle: "మీకు నచ్చిన కారును కనుగొనండి",
        heroText: "DriveXతో సౌకర్యం మరియు లగ్జరీని అనుభవించండి.",
        explore: "మా కార్లను చూడండి",
        book: "ఇప్పుడే బుక్ చేయండి",
        price: "రోజువారీ అద్దె",
        pickup: "పికప్ తేదీ",
        drop: "తిరిగి ఇచ్చే తేదీ",
        search: "కార్లను వెతకండి",
        popular: "ప్రసిద్ధ కార్లు",
        features: "మా ప్రత్యేకతలు",
        footer: "మీ ప్రయాణం, మా బాధ్యత."
    }

};

// Change website language
function changeLanguage(language) {

    const selectedLanguage = translations[language];

    if (!selectedLanguage) return;

    // Translate elements
    document.querySelectorAll("[data-i18n]").forEach(element => {

        const key = element.getAttribute("data-i18n");

        if (selectedLanguage[key]) {
            element.textContent = selectedLanguage[key];
        }

    });

    // Translate placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach(element => {

        const key = element.getAttribute("data-i18n-placeholder");

        if (selectedLanguage[key]) {
            element.placeholder = selectedLanguage[key];
        }

    });

    // Update selected language
    document.documentElement.lang = language;

    // Remember selected language
    localStorage.setItem("drivexLanguage", language);
}

// Load saved language when page opens
document.addEventListener("DOMContentLoaded", () => {

    const savedLanguage =
        localStorage.getItem("drivexLanguage") || "en";

    const selector = document.getElementById("languageSelect");

    if (selector) {
        selector.value = savedLanguage;
    }

    changeLanguage(savedLanguage);

});
