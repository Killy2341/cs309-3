//select the form and all necessary elements
const form = document.getElementById('registrationForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const ageInput = document.getElementById('age');
const successMessage = document.getElementById('successMessage');

//helper function to show errors
function showError(input, message) {
    const errorSpan = document.getElementById(input.id + 'Error');
    errorSpan.textContent = message;
    errorSpan.classList.add('active'); // makes it visible via css
    input.classList.add('invalid');    // adds pink border via css
}

//helper function to clear errors
function clearError(input) {
    const errorSpan = document.getElementById(input.id + 'Error');
    errorSpan.textContent = '';
    errorSpan.classList.remove('active');
    input.classList.remove('invalid');
}

//event listener for form submission
form.addEventListener('submit', function(event) {
    //prevent the page from reloading
    event.preventDefault();

    //assume the form is valid until proven otherwise
    let isValid = true;

    //hide success message in case it was showing from a previous attempt
    successMessage.style.display = 'none';

    //validation logic

    //name validation
    if (nameInput.value.trim() === '') {
        showError(nameInput, 'Name is required.');
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === '') {
        showError(emailInput, 'Email is required.');
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    } else {
        clearError(emailInput);
    }

    //password  length validation 
    if (passwordInput.value.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters.');
        isValid = false;
    } else {
        clearError(passwordInput);
    }

    //confirm password validation
    if (confirmPasswordInput.value === '') {
        showError(confirmPasswordInput, 'Please confirm your password.');
        isValid = false;
    } else if (confirmPasswordInput.value !== passwordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match.');
        isValid = false;
    } else {
        clearError(confirmPasswordInput);
    }

    //age validation
    const ageValue = parseInt(ageInput.value);
    if (ageInput.value.trim() === '') {
        showError(ageInput, 'Age is required.');
        isValid = false;
    } else if (isNaN(ageValue) || ageValue < 18) {
        showError(ageInput, 'You must be at least 18 years old.');
        isValid = false;
    } else {
        clearError(ageInput);
    }

    //final check
    if (isValid) {
        //form is valid
        //in a real app, you would send data to a server here
        console.log("Form Submitted Successfully!");
        
        //success message
        successMessage.style.display = 'block';
        
        //clear the form fields
        form.reset(); 
        
        
    } else {
        console.log("Form has errors. Submission blocked.");
    }
});

