document.addEventListener('wpcf7submit', function (event) {
    const phoneInputs = document.querySelectorAll('.wpcf7 input[type="tel"]');
    let isValid = true;
    const validationErrors = wpIntlTelInputSettings.validationErrors;

    phoneInputs.forEach(function (input) {
        if (input.intlTelInput) {
            const iti = window.intlTelInputGlobals.getInstance(input);
            const displayDialCode = wpIntlTelInputSettings.displayDialCode; // Retrieve the setting

            if (!iti.isValidNumber()) {
                isValid = false;
                const errorCode = iti.getValidationError();
                const errorMessage = validationErrors[errorCode] || 'Invalid number.';
                input.setCustomValidity(errorMessage);
                input.reportValidity();
            } else {
                input.setCustomValidity('');
                if (displayDialCode === 'in_field') {
                    input.value = iti.getNumber();
                } else if (displayDialCode === 'separate') {
                    input.value = iti.getNumber();
                }
                // Update input value with the full number including dial code
                input.value = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            }
        }
    });

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if any phone number is invalid
    }
});