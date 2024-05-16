<?php
/*
Plugin Name: Fioul Reseller
Description: Fuel/Oil Reseller on a 30km distance
Author: Vargas Matias
Version: 1.1.2
*/

function fioul_reseller_shortcode()
{
    ob_start();
    include(plugin_dir_path(__FILE__) . 'index.php');
    return ob_get_clean();
}
add_shortcode('fioul_reseller', 'fioul_reseller_shortcode');

function fioul_reseller_scripts() {
    wp_enqueue_style('fioul-reseller-style', plugins_url('css/style.css', __FILE__));
    wp_enqueue_script('fioul-reseller-script', plugins_url('script.js', __FILE__), false, true);

    // Préparation des données pour JavaScript
    wp_localize_script('fioul-reseller-script', 'fioulResellerData', array(
        'cartUrl' => esc_url(wc_get_cart_url()), // Nettoyage de l'URL et passage à JavaScript
        'productId' => 4239, // Exemple d'ID produit
    ));

    wp_localize_script('fioul-reseller-script', 'fioul_reseller_vars', array(
        'store_json_url' => plugins_url('data/store.json', __FILE__),
        'price_json_url' => plugins_url('get-price-json.php', __FILE__)
    ));
}
add_action('wp_enqueue_scripts', 'fioul_reseller_scripts');

function fioul_reseller_admin_menu()
{
    add_menu_page('Price updates scripts', 'Prix du fioul', 'manage_options', 'fioul-reseller-admin-menu', 'fioul_reseller_scripts_page', '', 200);
}

add_action('admin_menu', 'fioul_reseller_admin_menu');

function fioul_reseller_scripts_page() {
    include(plugin_dir_path(__FILE__) . 'price-updater.php');
}

add_action('woocommerce_before_calculate_totals', 'set_custom_cart_item_prices', 10, 1);

function set_custom_cart_item_prices($cart) {
    if (is_admin() && !defined('DOING_AJAX')) return;

    try {
        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            if (isset($_POST['price']) && isset($_POST['product_id']) && $cart_item['product_id'] === intval($_POST['product_id'])) {
                $price = $_POST['price'];
                
                $product = $cart_item['data'];
                $product->set_price($price);
                $product->update_meta_data('_custom_price', $price);
                $product->save();
            }
        }
    } catch (Exception $e) {
        error_log("Error: " . $e->getMessage());
    }
}

