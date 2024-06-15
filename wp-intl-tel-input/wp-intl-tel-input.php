<?php
/*
Plugin Name: Country Dropdown For CF7
Description: This plugins add country dropdown to the Contact Form 7 phone field using intl-tel-input library.
Version: 1.0.0
Author: Vishwajeet Guru
Author URI: https://chatgpt.com/g/g-6cqBCrKTn-wp-plugin-architect
Text Domain: wp-intl-tel-input
*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class WP_Intl_Tel_Input {

	public function __construct() {
		// Add admin menu
		add_action( 'admin_menu', [ $this, 'add_admin_menu' ] );

		// Register settings
		add_action( 'admin_init', [ $this, 'register_settings' ] );

		// Enqueue scripts and styles
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts_styles' ] );

		// Hook into Contact Form 7
		add_action( 'wpcf7_enqueue_scripts', [ $this, 'enqueue_cf7_scripts_styles' ] );
		add_action( 'wpcf7_init', [ $this, 'add_shortcode' ] );
	}

	public function add_admin_menu() {
		add_options_page(
			__( 'Intl Tel Input Settings', 'wp-intl-tel-input' ),
			__( 'Intl Tel Input', 'wp-intl-tel-input' ),
			'manage_options',
			'wp-intl-tel-input',
			[ $this, 'settings_page' ]
		);
	}

	public function register_settings() {
		register_setting( 'wp_intl_tel_input', 'wp_intl_tel_input_enabled' );
		register_setting( 'wp_intl_tel_input', 'wp_intl_tel_input_display_dial_code' );
		add_settings_section(
			'wp_intl_tel_input_section',
			__( 'Intl Tel Input Settings', 'wp-intl-tel-input' ),
			null,
			'wp-intl-tel-input'
		);
		add_settings_field(
			'wp_intl_tel_input_enabled',
			__( 'Enable Intl Tel Input for Phone Field', 'wp-intl-tel-input' ),
			[ $this, 'settings_field_html_enabled' ],
			'wp-intl-tel-input',
			'wp_intl_tel_input_section'
		);
		add_settings_field(
			'wp_intl_tel_input_display_dial_code',
			__( 'Display Dial Code', 'wp-intl-tel-input' ),
			[ $this, 'settings_field_html_display_dial_code' ],
			'wp-intl-tel-input',
			'wp_intl_tel_input_section'
		);
	}

	public function settings_field_html_enabled() {
		$value = get_option( 'wp_intl_tel_input_enabled', 0 );
		?>
		<input type="checkbox" name="wp_intl_tel_input_enabled" value="1" <?php checked( 1, $value, true ); ?> />
		<?php
	}

	public function settings_field_html_display_dial_code() {
		$value = get_option( 'wp_intl_tel_input_display_dial_code', 'none' );
		?>
		<select name="wp_intl_tel_input_display_dial_code">
			<option value="none" <?php selected( $value, 'none' ); ?>><?php _e( 'None', 'wp-intl-tel-input' ); ?></option>
			<option value="separate" <?php selected( $value, 'separate' ); ?>><?php _e( 'Separate Dial Code', 'wp-intl-tel-input' ); ?></option>
			<option value="in_field" <?php selected( $value, 'in_field' ); ?>><?php _e( 'In Input Field', 'wp-intl-tel-input' ); ?></option>
		</select>
		<?php
	}

	public function settings_page() {
		?>
		<div class="wrap">
			<h1><?php _e( 'Intl Tel Input Settings', 'wp-intl-tel-input' ); ?></h1>
			<form method="post" action="options.php">
				<?php
				settings_fields( 'wp_intl_tel_input' );
				do_settings_sections( 'wp-intl-tel-input' );
				submit_button();
				?>
			</form>
		</div>
		<?php
	}

	public function enqueue_scripts_styles() {
		if ( get_option( 'wp_intl_tel_input_enabled', 0 ) ) {
			wp_enqueue_style( 'intl-tel-input', 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/css/intlTelInput.css' );
			wp_enqueue_script( 'intl-tel-input', 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/intlTelInput.min.js', [], false, true );
			wp_enqueue_script( 'wp-intl-tel-input', plugins_url( 'assets/js/wp-intl-tel-input.js', __FILE__ ), [ 'intl-tel-input' ], false, true );

			// Pass settings to JavaScript
			$settings = [
				'displayDialCode' => get_option( 'wp_intl_tel_input_display_dial_code', 'none' ),
			];
			wp_localize_script( 'wp-intl-tel-input', 'wpIntlTelInputSettings', $settings );
		}
	}

	public function enqueue_cf7_scripts_styles() {
		if ( get_option( 'wp_intl_tel_input_enabled', 0 ) ) {
			wp_enqueue_script( 'wp-intl-tel-input-cf7', plugins_url( 'assets/js/wp-intl-tel-input-cf7.js', __FILE__ ), [ 'wp-intl-tel-input' ], false, true );
		}
	}

	public function add_shortcode() {
		wpcf7_add_form_tag( 'tel', [ $this, 'tel_shortcode_handler' ], true );
	}

	public function tel_shortcode_handler( $tag ) {
		$tag = new WPCF7_FormTag( $tag );

		$class = wpcf7_form_controls_class( $tag->type );

		$atts = [];
		$atts['size'] = $tag->get_size_option( '40' );
		$atts['maxlength'] = $tag->get_maxlength_option();
		$atts['minlength'] = $tag->get_minlength_option();
		$atts['class'] = $tag->get_class_option( $class );
		$atts['id'] = $tag->get_id_option();
		$atts['tabindex'] = $tag->get_option( 'tabindex', 'signed_int', true );

		$value = (string) reset( $tag->values );

		$atts['value'] = $value;

		$atts = wpcf7_format_atts( $atts );

		$html = sprintf( '<input type="tel" %1$s />', $atts );

		return $html;
	}
}

new WP_Intl_Tel_Input();
