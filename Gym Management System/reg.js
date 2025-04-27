function loadRegistrations() {
  const registerTableBody = document.querySelector("#registerTable tbody");
  if (!registerTableBody) return; 
  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  registerTableBody.innerHTML = "";

  registrations.forEach((member, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${member.membershipId}</td>
            <td>${member.name}</td>
            <td>${member.address}</td>
            <td>${member.gender}</td>
            <td>${member.dob}</td>
            <td>${member.phone}</td>
            <td>${member.email}</td>
            <td>${member.joinDate}</td>
            <td>${member.plan}</td>
            <td>
              <button class="active-btn">Active</button>
              <button class="inactive-btn">Inactive</button>
            </td>
        `;

    registerTableBody.appendChild(row);
  });
}

// Function to handle registration form submit
function handleRegistrationForm(event) {
  event.preventDefault(); // Prevent page reload

  const membershipId = document.getElementById("membershipId").value.trim();
  const name = document.getElementById("name").value.trim();
  const address = document.getElementById("address").value.trim();
  const gender = document.getElementById("gender").value;
  const dob = document.getElementById("dob").value;
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const joinDate = document.getElementById("joinDate").value;
  const plan = document.getElementById("plan").value;

  if (
    !membershipId ||
    !name ||
    !address ||
    !gender ||
    !dob ||
    !phone ||
    !email ||
    !joinDate ||
    !plan
  ) {
    alert("Please fill all fields!");
    return;
  }

  const newRegistration = {
    membershipId,
    name,
    address,
    gender,
    dob,
    phone,
    email,
    joinDate,
    plan,
  };

  const registrations = JSON.parse(localStorage.getItem("registrations")) || [];

  registrations.push(newRegistration);

  localStorage.setItem("registrations", JSON.stringify(registrations));

  window.location.href = "reg-list.html";
}

const registrationForm = document.getElementById("registrationForm");
if (registrationForm) {
  registrationForm.addEventListener("submit", handleRegistrationForm);
}

loadRegistrations();


