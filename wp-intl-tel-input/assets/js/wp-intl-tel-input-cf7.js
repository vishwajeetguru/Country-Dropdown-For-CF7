document.addEventListener('wpcf7submit', function () {
	const phoneInputs = document.querySelectorAll('.wpcf7 input[type="tel"]');
	const displayDialCode = wpIntlTelInputSettings.displayDialCode; // Retrieve the setting

	phoneInputs.forEach(function (input) {
		if (input.intlTelInput) {
			const iti = window.intlTelInputGlobals.getInstance(input);
			if (displayDialCode === 'in_field') {
				input.value = iti.getNumber();
			} else if (displayDialCode === 'separate') {
				input.value = iti.getNumber();
			}
		}
	});
});
