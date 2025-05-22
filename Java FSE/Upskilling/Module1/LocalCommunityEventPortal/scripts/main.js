console.log("main.js loaded");

// Submit event registration form
function handleEventRegistration(event) {
  event.preventDefault(); 
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const date = document.getElementById("regDate").value;
  const type = document.getElementById("regType").value;
  const msg = document.getElementById("regMessage").value;

  const output = document.getElementById("regOutput");
  if (name && email && date && type && msg) {
    output.textContent = `Thank you, ${name}! You've registered for the ${type} event on ${date}.`;
  } else {
    output.textContent = "Please fill out all fields.";
  }
}

// Phone number validation
function validatePhone() {
  const phone = document.getElementById("regPhone").value;
  const pattern = /^[0-9]{10}$/;

  if (!pattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
  }
}

// Character count in textarea
function countCharacters() {
  const msg = document.getElementById("regMessage").value;
  document.getElementById("charCount").textContent = `Characters: ${msg.length}`;
}

// Event Type Selection + Fee + Storage 
function updateFeeAndSave() {
  const type = document.getElementById("regType").value;
  const feeMap = {
    summerfestival: 100,
    communityyoga: 50,
    workshop: 80
  };

  document.getElementById("eventFee").textContent = feeMap[type] || 0;

  // Save to localStorage
  localStorage.setItem("preferredEventType", type);
}

// Load saved event type on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedType = localStorage.getItem("preferredEventType");
  if (savedType) {
    const select = document.getElementById("regType");
    if (select) {
      select.value = savedType;
      updateFeeAndSave();
    }
  }
});

// Clear preferences
function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared!");
  location.reload();
}

// Image Zoom on Double Click //6
function zoomImage(img) {
  img.style.transform = "scale(1.2)";
  img.style.transition = "transform 0.3s ease";

  setTimeout(() => {
    img.style.transform = "scale(1)";
  }, 1000);
}

//Upcoming Events//
function populateFeaturedEvents() {
  const featured = document.getElementById("featuredEvents");

  const events = [
    { name: "Summer Festival", date: "2025-06-15" },
    { name: "Community Yoga", date: "2025-07-05" },
    { name: "Workshop", date: "2025-08-12" }
  ];

  events.forEach(event => {
    const div = document.createElement("div");
    div.className = "list-group-item";
    div.innerHTML = `<strong>${event.name}</strong><br><small>Date: ${event.date}</small>`;
    featured.appendChild(div);
  });
}

// Video Ready Message //7
function videoReady() {
  const status = document.getElementById("videoStatus");
  if (status) {
    status.textContent = "Video ready to play!";
  }
}

document.addEventListener("DOMContentLoaded", populateFeaturedEvents);

// Warn Before Leaving Incomplete Form //7
window.onbeforeunload = function () {
  const form = document.getElementById("eventRegistrationForm");
  if (form) {
    const inputs = form.querySelectorAll("input, textarea");
    for (let input of inputs) {
      if (input.value.trim() !== "") {
        return "You have unsaved changes. Are you sure you want to leave?";
      }
    }
  }
};

// Geolocation
function findNearbyEvents() {
  const result = document.getElementById("locationResult");

  if (!navigator.geolocation) {
    result.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  result.textContent = "Locating...";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(4);
      const lon = position.coords.longitude.toFixed(4);
       result.innerHTML = `Your Coordinates:<br>Latitude: ${lat}<br>Longitude: ${lon}`;
    },
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          result.textContent = "Location access denied.";
          break;
        case error.POSITION_UNAVAILABLE:
          result.textContent = "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          result.textContent = "Location request timed out.";
          break;
        default:
          result.textContent = "An unknown error occurred.";
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
  );
}


