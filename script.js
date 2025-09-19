let currentRole = null;
const appointments = [];
const patients = ["john", "mary", "manish"];
const doctors = ["rozan", "prakriti", "anjila"];
const admins = ["admin"];

// ===== Show Login =====
function showLogin(role) {
  currentRole = role;

  // Hide all sections first
  hideAllSections();

  // Show login page
  const loginPage = document.getElementById("loginPage");
  loginPage.classList.remove("hidden");

  const loginTitle = document.getElementById("loginTitle");
  const loginHint = document.getElementById("loginHint");

  if (role === "patient") {
    loginTitle.textContent = "Patient Login";
    loginHint.textContent = "Demo users: john, mary, manish";
  } else if (role === "doctor") {
    loginTitle.textContent = "Doctor Login";
    loginHint.textContent = "Demo users: rozan, prakriti, anjila";
  } else {
    loginTitle.textContent = "Admin Login";
    loginHint.textContent = "Demo user: admin";
  }

  // 🔥 Force scroll directly to login section
  loginPage.scrollIntoView({ behavior: "auto", block: "start" });
}


// ===== Login Handling =====
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value.trim().toLowerCase();
  const messageEl = document.getElementById("loginMessage");

  if (currentRole === "patient" && patients.includes(username)) {
    messageEl.textContent = `✅ Welcome Patient ${username}!`;
    hideAllSections();
    document.getElementById("appointments").classList.remove("hidden");
  } else if (currentRole === "doctor" && doctors.includes(username)) {
    messageEl.textContent = `✅ Welcome Dr. ${username}!`;
    hideAllSections();
    document.getElementById("dashboardSection").classList.remove("hidden");
  } else if (currentRole === "admin" && admins.includes(username)) {
    messageEl.textContent = `✅ Welcome Admin ${username}!`;
    hideAllSections();
    document.getElementById("dashboardSection").classList.remove("hidden");
  } else {
    messageEl.textContent = "❌ Invalid username. Try again!";
  }
});

// ===== Add Appointment =====
function addAppointment(event) {
  event.preventDefault();
  const patient = document.getElementById("patientName").value.trim();
  const doctor = document.getElementById("doctorName").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const reason = document.getElementById("reason").value.trim();

  if (!patient || !doctor || !date || !time || !reason) {
    alert("Please fill in all fields!");
    return;
  }

  const newAppointment = { patient, doctor, date, time, reason };
  appointments.push(newAppointment);
  renderAppointments();
  event.target.reset();
}

function renderAppointments() {
  const list = document.getElementById("appointmentList");
  list.innerHTML = "";
  if (appointments.length === 0) {
    list.innerHTML = "<li>No appointments booked yet</li>";
  } else {
    appointments.forEach(a => {
      list.innerHTML += `<li>
        <strong>${a.date} at ${a.time}</strong><br>
        Patient: ${a.patient}<br>
        Doctor: ${a.doctor}<br>
        Reason: ${a.reason}
      </li>`;
    });
  }
}

// ===== Hide all sections helper =====
function hideAllSections() {
  ["home", "dashboardSection", "appointments", "contact", "loginPage"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

// ===== Navigation Handling =====
document.querySelectorAll("nav a").forEach(link => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href").substring(1);

    if (targetId) {
      e.preventDefault();
      hideAllSections();

      // Show the target section
      const target = document.getElementById(targetId);
      if (target) target.classList.remove("hidden");

      // Highlight active link
      document.querySelectorAll("nav a").forEach(a => a.classList.remove("active"));
      this.classList.add("active");

      // Scroll into view
      window.scrollTo({ top: target.offsetTop - 60, behavior: "smooth" });
    }
  });
});

// ===== Chatbox Logic =====
function sendMessage() {
  const input = document.getElementById("chatboxText");
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, "user-msg");

  // Simulate bot response (demo)
  setTimeout(() => {
    let reply = "🤖 I'm an AI assistant. You said: " + message;
    addMessage(reply, "bot-msg");
  }, 600);

  input.value = "";
}

function addMessage(text, type) {
  const msgContainer = document.getElementById("chatbox-messages");
  const p = document.createElement("p");
  p.className = type;
  p.textContent = text;
  msgContainer.appendChild(p);
  msgContainer.scrollTop = msgContainer.scrollHeight;
}

