add_action('rest_api_init', function() {
    register_rest_field('product', 'custom_acf_fields', [
        'get_callback' => function($object) {
            return get_fields($object['id']); // get all ACF fields
        },
        'schema' => null,
    ]);
});


function my_acf_google_map_api( $api ){
    $api['key'] = 'AIzaSyDwMV5D6dqD2QW92kglQEXYDnSWMtaArDM';
    return $api;
}
add_filter('acf/fields/google_map/api', 'my_acf_google_map_api');

add_action('template_redirect', function() {
    // Only run if ?checkout=ID exists
    if (isset($_GET['checkout'])) {
        $product_id = intval($_GET['checkout']);

        if ($product_id > 0 && function_exists('WC')) {
            // Empty existing cart (optional)
            WC()->cart->empty_cart();

            // Add product to cart
            WC()->cart->add_to_cart($product_id);

            // Redirect to checkout page
            wp_safe_redirect(wc_get_checkout_url());
            exit;
        }
    }
});



function update_apf_order_item_meta_endpoint($request) {
    $params = $request->get_json_params(); // get JSON body
    $order_id = isset($params['order_id']) ? (int) $params['order_id'] : 0;
    $product_id = isset($params['product_id']) ? (int) $params['product_id'] : 0;

    // The fields you want to update
    $fields = [
        'pickup_date'     => $params['pickup_date'] ?? '',
        'pickup_time'     => $params['pickup_time'] ?? '',
        'pickup_location' => $params['pickup_location'] ?? '',
        'dropoff_location'=> $params['dropoff_location'] ?? '',
        'passenger'       => $params['passenger'] ?? '',
        'bags'            => $params['bags'] ?? '',
    ];

    $debug = [
        'received_order_id' => $params['order_id'] ?? null,
        'casted_order_id'   => $order_id,
        'received_product_id'=> $params['product_id'] ?? null,
        'casted_product_id' => $product_id,
        'fields'            => $fields,
    ];

    $order = wc_get_order($order_id);
    if (!$order) {
        return [
            'success' => false,
            'message' => 'Order not found',
            'debug'   => $debug,
        ];
    }

    $item_found = false;

    foreach ($order->get_items() as $item) {
        if ($item->get_product_id() == $product_id) {
            foreach ($fields as $key => $value) {
                $item->update_meta_data($key, $value);
            }
            $item->save();
            $item_found = true;
        }
    }

    return [
        'success' => true,
        'item_found' => $item_found,
        'debug' => $debug,
    ];
}



add_action('rest_api_init', function () {
    register_rest_route('apf-api/v1', '/update-order-item', [
        'methods' => 'POST',
        'callback' => 'update_apf_order_item_meta_endpoint',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        }
    ]);
});

add_filter('woocommerce_get_checkout_order_received_url', 'custom_redirect_after_checkout', 10, 2);

function custom_redirect_after_checkout($url, $order) {
    if (!$order) return $url;

    $order_id = $order->get_id(); // Get the order ID
    $redirect_url = "https://finixlimo.com/success?order=" . $order_id;

    return $redirect_url;
}
