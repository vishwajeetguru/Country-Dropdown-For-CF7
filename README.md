Sure! Here is a step-by-step user documentation for the "Country Dropdown For CF7" plugin.

---

# Country Dropdown For CF7 Plugin

**Version**: 1.0.0  
**Author**: Vishwajeet Guru  
**Description**: This plugin adds a country dropdown to the Contact Form 7 phone field using the `intl-tel-input` library.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Adding the Phone Field to a Form](#adding-the-phone-field-to-a-form)
4. [Usage](#usage)
5. [Settings](#settings)
6. [Troubleshooting](#troubleshooting)
7. [FAQs](#faqs)

## Installation

### Step 1: Download the Plugin
1. Download the `Country Dropdown For CF7` plugin zip file from the provided source.

### Step 2: Install the Plugin
1. Log in to your WordPress admin dashboard.
2. Navigate to `Plugins` > `Add New`.
3. Click on the `Upload Plugin` button.
4. Choose the downloaded zip file and click `Install Now`.
5. After installation, click `Activate`.

## Configuration

### Step 1: Access the Plugin Settings
1. Navigate to `Settings` > `Intl Tel Input`.

### Step 2: Configure the Settings
1. **Enable Intl Tel Input for Phone Field**: Check this box to enable the phone field with the country dropdown.
2. **Display Dial Code**:
   - `None`: Do not display the dial code.
   - `Separate Dial Code`: Display the dial code separately from the phone number.
   - `In Input Field`: Display the dial code within the phone number input field.
3. **Default Country Code**: Enter the default country code (e.g., US, GB, FR) or use `auto` for automatic detection based on the user's IP address.

### Step 3: Save the Settings
1. Click `Save Changes` to apply the settings.

## Adding the Phone Field to a Form

### Step 1: Edit Your Contact Form
1. Navigate to `Contact` > `Contact Forms`.
2. Edit the form where you want to add the phone field.

### Step 2: Add the Phone Field Shortcode
1. Use the `[tel]` shortcode to add the phone field with the country dropdown. Example:
   ```html
   [tel your-phone]
   ```

### Step 3: Save the Form
1. Click `Save` to update the form.

## Usage

Once the plugin is configured and the phone field is added to the form, your users will see a phone input field with a country dropdown. They can select their country, and the phone number will be formatted accordingly.

## Settings

### Enable Intl Tel Input for Phone Field
- **Description**: Enable or disable the intl-tel-input feature for phone fields.
- **Default**: Disabled

### Display Dial Code
- **Description**: Choose how the dial code is displayed.
- **Options**:
  - `None`: No dial code displayed.
  - `Separate Dial Code`: Display the dial code separately.
  - `In Input Field`: Display the dial code within the input field.
- **Default**: None

### Default Country Code
- **Description**: Set the default country code for the phone field.
- **Options**: Enter a country code (e.g., US, GB, FR) or `auto` for automatic detection.
- **Default**: Auto

## Troubleshooting

### Phone Number Not Displaying Correctly
- Ensure the intl-tel-input library is loaded correctly.
- Verify the plugin settings to make sure the correct display options are selected.

### Form Submission Issues
- Ensure the phone number input is valid.
- Check for any JavaScript errors in the browser console.

### Hidden Input Field for Full Number
- The plugin automatically adds a hidden input field to store the full phone number in E.164 format.
- Ensure the hidden input field is present if the full phone number is not being submitted.

## FAQs

### How do I change the default country code?
- Go to `Settings` > `Intl Tel Input` and update the `Default Country Code` field.

### How do I hide the dial code in the input field?
- Set the `Display Dial Code` option to `None` in the plugin settings.

### Can I use this plugin with other forms besides Contact Form 7?
- This plugin is specifically designed for Contact Form 7. For other forms, custom integration would be required.

---

By following this documentation, users should be able to install, configure, and use the "Country Dropdown For CF7" plugin effectively.
