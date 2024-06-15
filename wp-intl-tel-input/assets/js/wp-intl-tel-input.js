document.addEventListener('DOMContentLoaded', function () {
    console.log('Intl Tel Input script loaded'); // Debug log

    const phoneInputs = document.querySelectorAll('.wpcf7 input[type="tel"]');
    const defaultCountry = wpIntlTelInputSettings.defaultCountry; // Retrieve the default country code setting
    const displayDialCode = wpIntlTelInputSettings.displayDialCode; // Retrieve the setting

    // Load the intlTelInput library script asynchronously
    const loadIntlTelInputScript = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });

    loadIntlTelInputScript.then(() => {
        // Initialize intlTelInput after script is loaded
        phoneInputs.forEach(function (input) {
            console.log('Applying intlTelInput to:', input); // Debug log
            const iti = window.intlTelInput(input, {
                initialCountry: defaultCountry,
                separateDialCode: displayDialCode === 'separate',
                geoIpLookup: function (callback) {
                    fetch('https://ipinfo.io/json', {
                        cache: 'reload'
                    }).then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        throw new Error('Failed to fetch IP info');
                    }).then(ipinfo => {
                        const countryCode = (ipinfo && ipinfo.country) ? ipinfo.country : 'us';
                        callback(countryCode);
                    }).catch(() => {
                        callback('us');
                    });
                },
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
            });

            // Handle initial value and country change for 'in_field' displayDialCode
            if (displayDialCode === 'in_field') {
                // Update input value on country change
                input.addEventListener('countrychange', function () {
                    const dialCode = iti.getSelectedCountryData().dialCode;
                    setInputValue(input, dialCode);
                });
            }

            // Add a hidden input field to store the full phone number in E.164 format
            const form = input.closest('form');
            let hiddenInput = form.querySelector('input[name="' + input.name + '_full"]');
            if (!hiddenInput) {
                hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = input.name + '_full';
                form.appendChild(hiddenInput);
            }

            // Update the hidden input value on phone number change
            input.addEventListener('change', function () {
                hiddenInput.value = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            });
        });
    }).catch(error => {
        console.error('Failed to load intlTelInput script:', error);
    });

    function setInputValue(input, dialCode) {
        const phoneNumber = input.value.replace(/^\+\d+\s*/, '');
        input.value = `+${dialCode} ${phoneNumber}`;
    }
});

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
                
                // Update the hidden input field with the full phone number in E.164 format
                const form = input.closest('form');
                const hiddenInput = form.querySelector('input[name="' + input.name + '_full"]');
                if (hiddenInput) {
                    hiddenInput.value = iti.getNumber(intlTelInputUtils.numberFormat.E164);
                }
            }
        }
    });

    if (!isValid) {
        event.preventDefault(); // Prevent form submission if any phone number is invalid
    }
});
