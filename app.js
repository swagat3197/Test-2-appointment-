// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAscyG9Z24pE54FVcg3XSD-SMRvFT1Xy8M",
  authDomain: "test1-3f99e.firebaseapp.com",
  databaseURL: "https://test1-3f99e-default-rtdb.firebaseio.com",
  projectId: "test1-3f99e",
  storageBucket: "test1-3f99e.appspot.com",
  messagingSenderId: "259892994980",
  appId: "1:259892994980:web:6b1ee3dccec02deb79d731",
  measurementId: "G-44G0B5ENPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Handle appointment booking
document.getElementById("appointmentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const datetime = document.getElementById("datetime").value;

  set(ref(db, "appointments/" + phone), {
    name: name,
    phone: phone,
    datetime: datetime
  })
    .then(() => alert("Appointment booked successfully!"))
    .catch((error) => alert("Error: " + error));
});

// Handle appointment update
document.getElementById("updateForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const phone = document.getElementById("updatePhone").value;
  const datetime = document.getElementById("updateDatetime").value;

  update(ref(db, "appointments/" + phone), {
    datetime: datetime
  })
    .then(() => alert("Appointment updated successfully!"))
    .catch((error) => alert("Error: " + error));
});
