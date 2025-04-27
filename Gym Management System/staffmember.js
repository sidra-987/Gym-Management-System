// Function to load members from localStorage and display in the table
function loadMembers() {
    const memberTableBody = document.querySelector("#memberTable tbody");
    if (!memberTableBody) return; // If we're not on the list page, stop

    const members = JSON.parse(localStorage.getItem("staffMembers")) || [];

    // Clear previous table rows
    memberTableBody.innerHTML = "";

    // Add each member to the table
    members.forEach((member, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.contact}</td>
            <td>${member.gender}</td>
            <td>${member.profession}</td>
        `;

        memberTableBody.appendChild(row);
    });
}

// Function to handle form submission and save a new member
function handleFormSubmit(event) {
    event.preventDefault(); // Stop page reload

    const name = document.getElementById("name").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const gender = document.getElementById("gender").value;
    const professionInput = document.querySelector('input[placeholder="profession"]');
    const profession = professionInput ? professionInput.value.trim() : "";

    if (name === "" || contact === "" || gender === "" || profession === "") {
        alert("Please fill all fields.");
        return;
    }

    const newMember = { name, contact, gender, profession };

    // Get existing members from localStorage or empty array
    const members = JSON.parse(localStorage.getItem("staffMembers")) || [];

    // Add new member to the list
    members.push(newMember);

    // Save updated list to localStorage
    localStorage.setItem("staffMembers", JSON.stringify(members));

    // Redirect to the staff member list page
    window.location.href = "staffmember.html";
}

// Setup event listener if the form is on the page
const staffForm = document.getElementById("staffmemberForm");
if (staffForm) {
    staffForm.addEventListener("submit", handleFormSubmit);
}

// Always load members if we're on the list page
loadMembers();
