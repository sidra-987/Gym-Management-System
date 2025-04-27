const form = document.getElementById("attendance-form");
const tableBody = document.getElementById("attendance-table");
const searchInput = document.getElementById("search-input");

let attendanceData = JSON.parse(localStorage.getItem("attendanceData")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("member-name").value.trim();
  const status = document.getElementById("status").value;
  const date = new Date().toLocaleDateString();

  if (name && status) {
    // Add new attendance entry to the array
    const newEntry = { name, status, date };
    attendanceData.push(newEntry);

    // Save updated data to localStorage
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));

    // Add row to the table
    const newRow = `
      <tr>
        <td>${name}</td>
        <td>${status}</td>
        <td>${date}</td>
      </tr>
    `;
    tableBody.innerHTML += newRow;
    form.reset();

    updateDashboardAttendance();
  }
});

// Search filter
searchInput.addEventListener("keyup", function () {
  const filter = searchInput.value.toLowerCase();
  const rows = tableBody.getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let td = rows[i].getElementsByTagName("td")[0];
    if (td) {
      let textValue = td.textContent || td.innerText;
      rows[i].style.display = textValue.toLowerCase().includes(filter)
        ? ""
        : "none";
    }
  }
});

function updateDashboardAttendance() {
  // Create counters for Present and Absent
  let presentCount = 0;
  let absentCount = 0;

  attendanceData.forEach((entry) => {
    if (entry.status === "Present") {
      presentCount++;
    } else if (entry.status === "Absent") {
      absentCount++;
    }
  });

  const presentElement = document.getElementById("totalPresent");
  const absentElement = document.getElementById("totalAbsent");

  presentElement.textContent = presentCount;
  absentElement.textContent = absentCount;

  updateAttendanceChart(presentCount, absentCount);
}

updateDashboardAttendance();
