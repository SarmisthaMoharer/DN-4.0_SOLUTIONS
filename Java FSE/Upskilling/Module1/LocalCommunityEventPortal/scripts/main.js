console.log("main.js loaded");

function handleEventRegistration(event) {
  event.preventDefault(); // Prevent form refresh
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

function findNearbyEvents() {
  const result = document.getElementById("locationResult");

  if (!navigator.geolocation) {
    result.textContent = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude.toFixed(4);
      const lon = position.coords.longitude.toFixed(4);
      result.textContent = `Your Location: Latitude ${lat}, Longitude ${lon}`;
    },
    (error) => {
      result.textContent = `Error: ${error.message}`;
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
    }
  );
}

// Save selected event type to localStorage + update fee
function updateFeeAndSave() {
  const type = document.getElementById("regType").value;
  const feeMap = {
     summerfestival: 100,
     communityyoga: 50,
     workshop: 80
  };

  document.getElementById("eventFee").textContent = feeMap[type] || 0;
  localStorage.setItem("preferredEventType", type);
}

// Load saved preference on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedType = localStorage.getItem("preferredEventType");
  if (savedType) {
    const select = document.getElementById("regType");
    select.value = savedType;
    updateFeeAndSave();
  }
});

// Clear both localStorage and sessionStorage
function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  alert("Preferences cleared!");
  location.reload();
}