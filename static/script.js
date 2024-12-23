const input = document.getElementById('dropdown-input');
const dropdownList = document.getElementById('dropdown-list');
const options = dropdownList.querySelectorAll('div');
const modal = document.getElementById('invalid-selection-modal');
const closeModalButton = document.getElementById('close-modal');

// Show the first 10 options when focusing or clicking on the input field
input.addEventListener('focus', function () {
    dropdownList.style.display = 'block';
    options.forEach((option, index) => {
        if (index < 4800) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
});

// Filter options dynamically based on user input
input.addEventListener('input', function () {
    const filter = input.value.toLowerCase();
    dropdownList.style.display = 'block';

    let matchFound = false;
    options.forEach(option => {
        if (option.textContent.toLowerCase().includes(filter)) {
            option.style.display = 'block';
            matchFound = true;
        } else {
            option.style.display = 'none';
        }
    });

    // If no match found, clear the input box (prevent typing custom value)
    if (!matchFound) {
        input.value = '';
    }
});

// Hide dropdown when clicking outside the input or dropdown list
document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.style.display = 'none';
    }
});

// Handle selection of an option
dropdownList.addEventListener('click', function (e) {
    if (e.target && e.target.matches('div')) {
        input.value = e.target.textContent;
        dropdownList.style.display = 'none';
    }
});

// Ensure the input value is a valid selection before submitting the form
document.querySelector('form').addEventListener('submit', function (e) {
    const selectedValue = input.value.trim().toLowerCase();
    let validSelection = false;

    options.forEach(option => {
        if (option.textContent.toLowerCase() === selectedValue) {
            validSelection = true;
        }
    });

    // If the selected value is not valid, prevent form submission and show the modal
    if (!validSelection) {
        e.preventDefault();  // Prevent form submission
        modal.style.display = 'flex';  // Show the modal
    }
});

// Close the modal when the close button is clicked
closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
});
