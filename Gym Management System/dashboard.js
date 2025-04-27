// Payment 
const payments = JSON.parse(localStorage.getItem('payments')) || [];

let totalRevenue = 0;
let totalPaid = 0;
let totalPending = 0;

payments.forEach(payment => {
    totalRevenue += parseFloat(payment.totalAmount);
    totalPaid += parseFloat(payment.amountPaid);
    totalPending += parseFloat(payment.amountPending);
});

const paymentCtx = document.getElementById('paymentChart').getContext('2d');

const paymentChart = new Chart(paymentCtx, {
    type: 'doughnut',
    data: {
        labels: ['Paid Amount', 'Pending Amount'],
        datasets: [{
            label: 'Payment Overview',
            data: [totalPaid, totalPending],
            backgroundColor: ['#4CAF50', '#FF5722'],
            borderColor: ['#388E3C', '#E64A19'],
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Payments Overview'
            }
        }
    }
});


// Attendance

document.addEventListener('DOMContentLoaded', () => {
 
  const ctx = document.getElementById("attendanceChart").getContext("2d");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Present", "Absent"],
      datasets: [{
        label: "Attendance Status",
        data: [0, 0], 
        backgroundColor: ['#4caf50', '#f44336'],
        borderColor: ['#388e3c', '#d32f2f'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});

// Member status
const membersData = JSON.parse(localStorage.getItem('registrations')) || [];

let activeMembers = 0;
let inactiveMembers = 0;

membersData.forEach(member => {
  if (member.plan === "Standard" || member.plan === "Premium") {
    activeMembers++;
  } else if (member.plan === "Basic") {
    inactiveMembers++;
  }
});

const memberCtx = document.getElementById('memberChart').getContext('2d');

const memberChart = new Chart(memberCtx, {
  type: 'bar',
  data: {
    labels: ['Active Members', 'Inactive Members'],
    datasets: [{
      label: 'Members Status',
      data: [activeMembers, inactiveMembers],
      backgroundColor: ['#4CAF50', '#FF9800'],
      borderColor: ['#388E3C', '#F57C00'],
      borderWidth: 1,
      barPercentage: 0.5,
      categoryPercentage: 0.5
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Member Status Overview',
        font: {
          size: 18
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const style = document.createElement('style');
style.innerHTML = `
  #memberChart {
    height: 200px !important; /* fix chart height */
  }
`;
document.head.appendChild(style);
