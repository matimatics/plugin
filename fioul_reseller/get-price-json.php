<?php

require_once('../../../wp-load.php');

function get_prices_from_database() {

    $companies = array(
        'AFK',
        'Beyel',
        'Eynius',
        'Spincourt',
        'Meurthe-et-Moselle'
    );

    $prices = array();

    foreach ($companies as $company) {

        $field_name = 'fuel_price_' . sanitize_title($company);
        $field_name_expert = 'fuel_price_expert_' . sanitize_title($company);

        $fuel_price = get_option($field_name, 'none');
        $fuel_price_expert = get_option($field_name_expert, 'none');

        $prices[] = array(
            $company => array(
                
                'Fioul' => floatval($fuel_price),
                'Fioul Expert' => floatval($fuel_price_expert)
            )
        );
    }

    return $prices;
}

$prices = get_prices_from_database();

$json_data = json_encode($prices);

header('Content-Type: application/json');

echo $json_data;
