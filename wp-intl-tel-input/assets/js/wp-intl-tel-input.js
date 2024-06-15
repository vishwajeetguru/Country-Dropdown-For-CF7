document.addEventListener('DOMContentLoaded', function () {
	console.log('Intl Tel Input script loaded'); // Debug log

	const phoneInputs = document.querySelectorAll('input[type="tel"]');
	const displayDialCode = wpIntlTelInputSettings.displayDialCode; // Retrieve the setting

	phoneInputs.forEach(function (input) {
		console.log('Applying intlTelInput to:', input); // Debug log
		const iti = window.intlTelInput(input, {
			initialCountry: 'auto',
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

		if (displayDialCode === 'in_field') {
			input.addEventListener('countrychange', function () {
				input.value = iti.getNumber();
			});
		}
	});
});
