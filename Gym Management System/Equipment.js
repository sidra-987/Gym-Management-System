// Check if we are on the Equipment Entry Page
const form = document.getElementById("equipmentForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const equipment = {
      name: document.getElementById("equipmentName").value,
      description: document.getElementById("description").value,
      quantity: document.getElementById("equipmentQuantity").value,
      amount: document.getElementById("equipmentPrice").value,
      vendor: document.getElementById("vendor").value,
      contact: document.getElementById("vendorContact").value,
      purchaseDate: document.getElementById("equipmentPurchaseDate").value,
    };

    // Get existing data from localStorage or create new array
    const equipmentList =
      JSON.parse(localStorage.getItem("equipmentList")) || [];

    // Add new entry
    equipmentList.push(equipment);

    // Save back to localStorage
    localStorage.setItem("equipmentList", JSON.stringify(equipmentList));

    // Clear form
    form.reset();

    // Optionally, redirect to Equipment List page
    window.location.href = "Equipment.html";
  });
}

// Check if we are on the Equipment List Page
const table = document.getElementById("equipmentTable");
if (table) {
  const equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];

  const tbody = table.querySelector("tbody");
  tbody.innerHTML = ""; // Clear existing rows

  equipmentList.forEach((equip) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${equip.name}</td>
      <td>${equip.description}</td>
      <td>${equip.quantity}</td>
      <td>${equip.amount}</td>
      <td>${equip.vendor}</td>
      <td>${equip.contact}</td>
      <td>${equip.purchaseDate}</td>
    `;

    tbody.appendChild(row);
  });
}
