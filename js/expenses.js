// Define an array to store expenses
let expenses = [];

// Function to add a new expense
function addExpense(date, category, amount) {
  const expense = {
	id: expenses.length + 1,
	date: date,
	category: category,
	amount: amount
  };

  expenses.push(expense);
}

// Function to delete an expense
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
}

// Function to render expenses in the table
function renderExpenses() {
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  expenses.forEach(expense => {
	const row = document.createElement('tr');
	row.innerHTML = `
	  <td>${expense.id}</td>
	  <td>${expense.date}</td>
	  <td>${expense.category}</td>
	  <td>${expense.amount}</td>
	  <td>
		<button class="btn btn-sm btn-danger delete" data-id="${expense.id}">Delete</button>
	  </td>
	`;

	tableBody.appendChild(row);
  });

  // Attach event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(button => {
	button.addEventListener('click', e => {
	  const id = parseInt(e.target.dataset.id);
	  deleteExpense(id);
	  renderExpenses();
	});
  });
}

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form element
  const form = document.getElementById('expenseForm');

  // Get form values
  const date = document.getElementById('expenseDate').value;
  const category = document.getElementById('expenseCategory').value;
  const amount = document.getElementById('expenseAmount').value;

  // Add the expense
  addExpense(date, category, amount);

  // Reset the form
  form.reset();

  // Close the modal
  const addExpenseModal = new bootstrap.Modal(document.getElementById('addExpenseModal'));
  addExpenseModal.hide();

  // Render the updated expenses table
  renderExpenses();
}

// Attach form submission event listener
const addExpenseModal = document.getElementById('addExpenseModal');
addExpenseModal.addEventListener('shown.bs.modal', function () {
  const saveExpenseButton = document.getElementById('saveExpense');
  saveExpenseButton.addEventListener('click', handleFormSubmit);
});

// Render initial expenses
renderExpenses();