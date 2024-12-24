const input = document.getElementById('dropdown-input');
const dropdownList = document.getElementById('dropdown-list');
const options = dropdownList.querySelectorAll('div');
const form = document.querySelector('form');
const modal = document.getElementById('invalid-selection-modal');
const closeModalButton = document.getElementById('close-modal');


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

    
    if (!matchFound) {
        input.setCustomValidity("No matches found");
    } else {
        input.setCustomValidity(""); 
    }
});

document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !dropdownList.contains(e.target)) {
        dropdownList.style.display = 'none';
    }
});

dropdownList.addEventListener('click', function (e) {
    if (e.target && e.target.matches('div')) {
        input.value = e.target.textContent;
        dropdownList.style.display = 'none';
    }
});


input.addEventListener('blur', function () {
    setTimeout(() => {
        dropdownList.style.display = 'none';
    }, 200);
});


form.addEventListener('submit', function (e) {
    const selectedValue = input.value.trim();
    let isValid = false;

    options.forEach(option => {
        if (option.textContent.toLowerCase() === selectedValue.toLowerCase()) {
            isValid = true;
        }
    });

    if (!isValid) {
        e.preventDefault(); 
        modal.style.display = 'block'; 
    }
});


closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none'; 
});
