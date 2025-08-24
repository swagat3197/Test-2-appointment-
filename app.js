// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

// Firebase config (your credentials)
const firebaseConfig = {
  apiKey: "AIzaSyAscyG9Z24pE54FVcg3XSD-SMRvFT1Xy8M",
  authDomain: "test1-3f99e.firebaseapp.com",
  databaseURL: "https://test1-3f99e-default-rtdb.firebaseio.com",
  projectId: "test1-3f99e",
  storageBucket: "test1-3f99e.firebasestorage.app",
  messagingSenderId: "259892994980",
  appId: "1:259892994980:web:6b1ee3dccec02deb79d731",
  measurementId: "G-44G0B5ENPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Form submit
document.getElementById("appointmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  if (!name || !phone || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  set(ref(db, "appointments/" + phone), {
    name: name,
    phone: phone,
    date: date,
    time: time
  }).then(() => {
    alert("Appointment booked successfully!");
    document.getElementById("appointmentForm").reset(); // ✅ Clear form after submit
  }).catch((error) => {
    console.error(error);
    alert("Error booking appointment");
  });
});

// Update form
const updatePhoneInput = document.getElementById("updatePhone");
updatePhoneInput.addEventListener("blur", function () {
  let phone = updatePhoneInput.value;
  if (!phone) return;

  const dbRef = ref(db);
  get(child(dbRef, "appointments/" + phone)).then((snapshot) => {
    if (snapshot.exists()) {
      let data = snapshot.val();
      document.getElementById("updateDate").value = data.date;
      document.getElementById("updateTime").value = data.time;

      alert(`Current Appointment:\n📅 Date: ${data.date}\n⏰ Time: ${data.time}`);
    } else {
      alert("No appointment found for this phone number");
    }
  });
});

document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let phone = document.getElementById("updatePhone").value;
  let date = document.getElementById("updateDate").value;
  let time = document.getElementById("updateTime").value;

  if (!phone || !date || !time) {
    alert("Please fill all fields");
    return;
  }

  update(ref(db, "appointments/" + phone), {
    date: date,
    time: time
  }).then(() => {
    alert("Appointment updated successfully!");
    document.getElementById("updateForm").reset(); // ✅ Clear update form after submit
  }).catch((error) => {
    console.error(error);
    alert("Error updating appointment");
  });
});
