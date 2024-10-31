<?php
/**
 * Plugin Name: Papernap‑Free Expert Reviews
 * Plugin URI: https://www.papernap.com
 * Description: Add expert reviews to your product page. Keep your users engage and help them understand your product or the product category well.
 * Version: 1.2
 * Author: Air Suggest
 * Author URI: mailto:prashant@flyingcheckout.com
 * License: GPLv2 or later
 * Text Domain: airsuggest
 *
 */

$airs_options = get_option('papernap_setting');
require_once(ABSPATH . 'wp-admin/includes/upgrade.php');

include('admin_page_dash.php');

function papernap_activation_redirect( $plugin ) {
    if( $plugin == plugin_basename( __FILE__ ) ) {
        exit( wp_redirect('https://www.papernap.com/wpdashboard?shop='.$_SERVER['HTTP_HOST'].'&app=wordpress&site_type=wordpress') );
    }
}
add_action( 'activated_plugin', 'papernap_activation_redirect' );
