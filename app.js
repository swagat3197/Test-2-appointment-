// Your Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Reference to appointments in Firebase
const appointmentsRef = db.ref("appointments");

// Handle form submission
document.getElementById("appointmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  appointmentsRef.child(phone).set({
    name,
    phone,
    date,
    time,
  });

  alert("Appointment saved!");

  // Clear form fields after submission
  document.getElementById("appointmentForm").reset();
});

// Handle update form
document.getElementById("updateForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const updatePhone = document.getElementById("updatePhone").value;
  const newDate = document.getElementById("updateDate").value;
  const newTime = document.getElementById("updateTime").value;

  const appointmentRef = appointmentsRef.child(updatePhone);

  appointmentRef.once("value").then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      alert(`Current Appointment:\nDate: ${data.date}\nTime: ${data.time}`);

      // Now update with new values
      appointmentRef.update({
        date: newDate,
        time: newTime,
      });

      alert("Appointment updated!");
      document.getElementById("updateForm").reset();
    } else {
      alert("No appointment found for this phone number!");
    }
  });
});
