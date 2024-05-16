<?php

$companies = array(
    'AFK',
    'Beyel',
    'Eynius',
    'Spincourt',
    'Meurthe-et-Moselle'
);

if (array_key_exists('save_prices', $_POST)) {
    // Actualizar los precios de acuerdo al nombre de la empresa
    foreach ($companies as $company) {
        $field_name = 'fuel_price_' . sanitize_title($company);
        if (isset($_POST[$field_name])) {
            update_option($field_name, $_POST[$field_name]);
        }

        $field_name_expert = 'fuel_price_expert_' . sanitize_title($company);
        if (isset($_POST[$field_name_expert])) {
            update_option($field_name_expert, $_POST[$field_name_expert]);
        }
    }
}

?>

<div class="wrap">
    <h1>Prix du fioul</h1>
    <form method="post" action="">
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Entreprise</th>
                    <th>Fioul</th>
                    <th>Fioul Expert</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($companies as $company) : ?>
                    <tr>
                        <td><?php echo $company; ?></td>
                        <td><input type="text" name="fuel_price_<?php echo sanitize_title($company); ?>" value="<?php echo esc_attr(get_option('fuel_price_' . sanitize_title($company), 'none')); ?>">
                        </td>
                        <td><input type="text" name="fuel_price_expert_<?php echo sanitize_title($company); ?>" value="<?php echo esc_attr(get_option('fuel_price_expert_' . sanitize_title($company), 'none')); ?>">
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <input type="submit" name="save_prices" class="button button-primary" value="Mettre a jour">
    </form>
</div>