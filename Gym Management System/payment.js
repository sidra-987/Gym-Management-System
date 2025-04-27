// Select the form and table body
const paymentForm = document.getElementById('paymentForm');
const paymentsTableBody = document.querySelector('#paymentsTable tbody');

// Check if we're on the payment form page
if (paymentForm) {
    paymentForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        const memberName = document.getElementById('memberName').value.trim();
        const totalAmount = document.getElementById('totalAmount').value.trim();
        const amountPaid = document.getElementById('amountPaid').value.trim();
        const amountPending = document.getElementById('amountPending').value.trim();
        const paymentDate = document.getElementById('paymentDate').value;
        const paymentMode = document.getElementById('paymentMode').value;

        // Create payment object
        const paymentData = {
            memberName,
            totalAmount,
            amountPaid,
            amountPending,
            paymentDate,
            paymentMode
        };

        // Save to localStorage
        let payments = JSON.parse(localStorage.getItem('payments')) || [];
        payments.push(paymentData);
        localStorage.setItem('payments', JSON.stringify(payments));

        // Clear form
        paymentForm.reset();

        // Optional: Alert and redirect to payment list
        alert('Payment submitted successfully!');
        window.location.href = 'payment-list.html'; // Redirect after submitting
    });
}

// Check if we're on the payment list page
if (paymentsTableBody) {
    // Load payments from localStorage
    const payments = JSON.parse(localStorage.getItem('payments')) || [];

    payments.forEach((payment, index) => {
        addPaymentToTable(payment, index);
    });
}

// Function to add payment to the table
function addPaymentToTable(payment, index) {
    const tr = document.createElement('tr');

    tr.innerHTML = `
        <td>${payment.memberName}</td>
        <td>${payment.totalAmount}</td>
        <td>${payment.amountPaid}</td>
        <td class="pending-amount">${payment.amountPending}</td>
        <td>${payment.paymentDate}</td>
        <td>${payment.paymentMode}</td>
        <td>
            <button class="paid-btn" data-index="${index}">Paid</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
        </td>
    `;

    paymentsTableBody.appendChild(tr);
}

// Handle Paid and Delete button actions
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('paid-btn')) {
        const index = e.target.getAttribute('data-index');
        markAsPaid(index);
    }
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        deletePayment(index);
    }
});

// Mark payment as paid
function markAsPaid(index) {
    let payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments[index].amountPending = '0'; // Set pending to 0
    localStorage.setItem('payments', JSON.stringify(payments));
    location.reload(); // Refresh to update the table
}

// Delete payment
function deletePayment(index) {
    let payments = JSON.parse(localStorage.getItem('payments')) || [];
    payments.splice(index, 1); // Remove the selected payment
    localStorage.setItem('payments', JSON.stringify(payments));
    location.reload(); // Refresh to update the table
}
