
// DRIVEX 360 DEGREE CAR VIEWER

const carModel = document.getElementById("carModel");
const carName = document.getElementById("carName");
const modelStatus = document.getElementById("modelStatus");

const rotateBtn = document.getElementById("rotateBtn");
const zoomInBtn = document.getElementById("zoomInBtn");
const zoomOutBtn = document.getElementById("zoomOutBtn");
const resetBtn = document.getElementById("resetBtn");

// Car model database
const carModels = {
    1: {
        name: "Porsche 911",
        model: "models/porsche.glb"
    },

    2: {
        name: "BMW X5",
        model: "models/bmw.glb"
    },

    3: {
        name: "Mercedes-Benz C-Class",
        model: "models/mercedes.glb"
    },

    4: {
        name: "Tesla Model 3",
        model: "models/tesla.glb"
    },

    5: {
        name: "Range Rover Sport",
        model: "models/range-rover.glb"
    },

    6: {
        name: "Audi A6",
        model: "models/audi.glb"
    },

    7: {
        name: "Lamborghini Huracan",
        model: "models/lamborghini.glb"
    },

    8: {
        name: "Toyota Fortuner",
        model: "models/fortuner.glb"
    },

    9: {
        name: "Hyundai IONIQ 5",
        model: "models/ioniq.glb"
    }
};

// Get car ID from URL
const urlParams = new URLSearchParams(window.location.search);

const selectedCarId = urlParams.get("id") || "1";

// Select car
const selectedCar = carModels[selectedCarId];

if (selectedCar) {

    carName.textContent = selectedCar.name;

    carModel.src = selectedCar.model;

} else {

    carName.textContent = "Car Not Found";

    modelStatus.textContent =
        "Please select a valid car.";

}

// Model loading status
carModel.addEventListener("load", () => {

    modelStatus.textContent =
        "3D model loaded successfully! Drag to rotate.";

});

carModel.addEventListener("error", () => {

    modelStatus.textContent =
        "3D model could not load. Check your GLB file and path.";

});

// Automatic rotation
rotateBtn.addEventListener("click", () => {

    if (carModel.hasAttribute("auto-rotate")) {

        carModel.removeAttribute("auto-rotate");

        rotateBtn.textContent = "Start Rotation";

    } else {

        carModel.setAttribute("auto-rotate", "");

        rotateBtn.textContent = "Pause Rotation";

    }

});

// Zoom in
zoomInBtn.addEventListener("click", () => {

    carModel.fieldOfView = "25deg";

});

// Zoom out
zoomOutBtn.addEventListener("click", () => {

    carModel.fieldOfView = "45deg";

});

// Reset camera
resetBtn.addEventListener("click", () => {

    carModel.cameraOrbit = "0deg 75deg 105%";

    carModel.fieldOfView = "30deg";

    carModel.jumpCameraToGoal();

});
