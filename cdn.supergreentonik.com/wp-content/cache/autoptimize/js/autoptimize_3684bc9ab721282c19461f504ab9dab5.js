window.gtm4wp_last_selected_product_variation;
window.gtm4wp_changedetail_fired_during_pageload = false;
window.gtm4wp_is_cart = false;
window.gtm4wp_is_checkout = false;
window.gtm4wp_checkout_step_fired = [];
window.gtm4wp_shipping_payment_method_step_offset = gtm4wp_needs_shipping_address ? 0 : -1;
window.gtm4wp_first_container_id = "";

function gtm4wp_map_eec_to_ga4(productdata) {
    if (!productdata) {
        return;
    }
    const category_path = productdata.category ? productdata.category : '';
    const category_parts = category_path.toString().split('/');
    let ga4_product = {
        'item_id': productdata.id ? productdata.id : '',
        'item_name': productdata.name ? productdata.name : '',
        'item_brand': productdata.brand ? productdata.brand : '',
        'price': productdata.price ? productdata.price : ""
    };
    if (1 == category_parts.length) {
        ga4_product.item_category = category_parts[0];
    } else if (category_parts.length > 1) {
        ga4_product.item_category = category_parts[0];
        for (let i = 1; i < Math.min(5, category_parts.length); i++) {
            ga4_product['item_category_' + (i + 1)] = category_parts[i];
        }
    }
    if (productdata.variant) {
        ga4_product.item_variant = productdata.variant;
    }
    if (productdata.list) {
        ga4_product.item_list_name = productdata.list;
    }
    if (productdata.position) {
        ga4_product.index = productdata.position;
    }
    if (productdata.quantity) {
        ga4_product.quantity = productdata.quantity;
    }
    if (productdata.coupon) {
        ga4_product.coupon = productdata.coupon;
    }
    ga4_product.google_business_vertical = gtm4wp_business_vertical;
    ga4_product[gtm4wp_business_vertical_id] = gtm4wp_id_prefix + ga4_product["item_id"];
    return ga4_product;
}

function gtm4wp_handle_cart_qty_change() {
    document.querySelectorAll('.product-quantity input.qty').forEach(function(qty_el) {
        const original_value = qty_el.defaultValue;
        let current_value = parseInt(qty_el.value);
        if (isNaN(current_value)) {
            current_value = original_value;
        }
        if (original_value != current_value) {
            const cart_item_temp = qty_el.closest('.cart_item');
            const productdata = cart_item_temp && cart_item_temp.querySelector('.remove');
            if (!productdata) {
                return;
            }
            let productprice = productdata.getAttribute('data-gtm4wp_product_price');
            if (typeof productprice == "string") {
                productprice = parseFloat(productprice);
                if (isNaN(productprice)) {
                    productprice = 0;
                }
            } else if (typeof productprice != "number") {
                productprice = 0;
            }
            if (original_value < current_value) {
                const product_data = {
                    'name': productdata.getAttribute('data-gtm4wp_product_name'),
                    'id': productdata.getAttribute('data-gtm4wp_product_id'),
                    'price': productprice.toFixed(2),
                    'category': productdata.getAttribute('data-gtm4wp_product_cat'),
                    'variant': productdata.getAttribute('data-gtm4wp_product_variant'),
                    'stocklevel': productdata.getAttribute('data-gtm4wp_product_stocklevel'),
                    'brand': productdata.getAttribute('data-gtm4wp_product_brand'),
                    'quantity': current_value - original_value
                };
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.addProductToCartEEC',
                    'ecommerce': {
                        'currencyCode': gtm4wp_currency,
                        'add': {
                            'products': [product_data]
                        }
                    }
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'add_to_cart',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': productprice.toFixed(2) * (current_value - original_value),
                        'items': [gtm4wp_map_eec_to_ga4(product_data)]
                    }
                });
            } else {
                const product_data = {
                    'name': productdata.getAttribute('data-gtm4wp_product_name'),
                    'id': productdata.getAttribute('data-gtm4wp_product_id'),
                    'price': productprice.toFixed(2),
                    'category': productdata.getAttribute('data-gtm4wp_product_cat'),
                    'variant': productdata.getAttribute('data-gtm4wp_product_variant'),
                    'stocklevel': productdata.getAttribute('data-gtm4wp_product_stocklevel'),
                    'brand': productdata.getAttribute('data-gtm4wp_product_brand'),
                    'quantity': original_value - current_value
                };
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.removeFromCartEEC',
                    'ecommerce': {
                        'currencyCode': gtm4wp_currency,
                        'remove': {
                            'products': [product_data]
                        }
                    }
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'remove_from_cart',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': productprice.toFixed(2) * (original_value - current_value),
                        'items': [gtm4wp_map_eec_to_ga4(product_data)]
                    }
                });
            }
        }
    });
}

function gtm4wp_handle_payment_method_change() {
    if (gtm4wp_checkout_step_fired.indexOf('payment_method') > -1) {
        return;
    }
    if ('complete' != document.readyState) {
        return;
    }
    let payment_type = '(payment type not found)';
    let payment_el = document.querySelector('.payment_methods input:checked');
    if (!payment_el) {
        payment_el = document.querySelector('input[name^=payment_method]');
    }
    if (payment_el) {
        payment_type = payment_el.value;
    }
    window[gtm4wp_datalayer_name].push({
        'event': 'gtm4wp.checkoutStepEEC',
        'ecommerce': {
            'currencyCode': gtm4wp_currency,
            'checkout': {
                'actionField': {
                    'step': 4 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset
                },
                'products': window.gtm4wp_checkout_products
            }
        }
    });
    window[gtm4wp_datalayer_name].push({
        'event': 'add_payment_info',
        'ecommerce': {
            'currency': gtm4wp_currency,
            'payment_type': payment_type,
            'value': window.gtm4wp_checkout_value,
            'items': window.gtm4wp_checkout_products_ga4
        }
    });
    gtm4wp_checkout_step_fired.push('payment_method');
}

function gtm4wp_handle_shipping_method_change() {
    if (gtm4wp_checkout_step_fired.indexOf('shipping_method') > -1) {
        return;
    }
    if ('complete' != document.readyState) {
        return;
    }
    let shipping_tier = '(shipping tier not found)';
    let shipping_el = document.querySelector('input[name^=shipping_method]:checked');
    if (!shipping_el) {
        shipping_el = document.querySelector('input[name^=shipping_method]');
    }
    if (shipping_el) {
        shipping_tier = shipping_el.value;
    }
    window[gtm4wp_datalayer_name].push({
        'event': 'gtm4wp.checkoutStepEEC',
        'ecommerce': {
            'currencyCode': gtm4wp_currency,
            'checkout': {
                'actionField': {
                    'step': 3 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset
                },
                'products': window.gtm4wp_checkout_products
            }
        }
    });
    window[gtm4wp_datalayer_name].push({
        'event': 'add_shipping_info',
        'ecommerce': {
            'currency': gtm4wp_currency,
            'shipping_tier': shipping_tier,
            'value': window.gtm4wp_checkout_value,
            'items': window.gtm4wp_checkout_products_ga4
        }
    });
    gtm4wp_checkout_step_fired.push('shipping_method');
}

function gtm4wp_process_woocommerce_pages() {
    window.gtm4wp_is_cart = false;
    window.gtm4wp_is_checkout = false;
    const doc_body = document.querySelector('body');
    if (doc_body) {
        window.gtm4wp_is_cart = doc_body.classList && doc_body.classList.contains('woocommerce-cart');
        window.gtm4wp_is_checkout = doc_body.classList && doc_body.classList.contains('woocommerce-checkout');
    }
    const gtm4wp_product_block_names = {
        'wp-block-handpicked-products': {
            'displayname': 'Handpicked Products',
            'counter': 1
        },
        'wp-block-product-best-sellers': {
            'displayname': 'Best Selling Products',
            'counter': 1
        },
        'wp-block-product-category': {
            'displayname': 'Product Category List',
            'counter': 1
        },
        'wp-block-product-new': {
            'displayname': 'New Products',
            'counter': 1
        },
        'wp-block-product-on-sale': {
            'displayname': 'Sale Products',
            'counter': 1
        },
        'wp-block-products-by-attribute': {
            'displayname': 'Products By Attribute',
            'counter': 1
        },
        'wp-block-product-tag': {
            'displayname': 'Products By Tag',
            'counter': 1
        },
        'wp-block-product-top-rated': {
            'displayname': 'Top Rated Products',
            'counter': 1
        },
    }
    document.querySelectorAll('.wc-block-grid .wc-block-grid__product').forEach(function(product_grid_item) {
        const product_grid_container = product_grid_item.closest('.wc-block-grid');
        const product_data = product_grid_item.querySelector('.gtm4wp_productdata');
        if (product_grid_container && product_data) {
            const product_grid_container_classes = product_grid_container.classList;
            if (product_grid_container_classes) {
                for (let i in gtm4wp_product_block_names) {
                    if (product_grid_container_classes.contains(i)) {
                        product_data.setAttribute("data-gtm4wp_productlist_name", gtm4wp_product_block_names[i].displayname);
                        product_data.setAttribute("data-gtm4wp_product_listposition", gtm4wp_product_block_names[i].counter);
                        gtm4wp_product_block_names[i].counter++;
                    }
                }
            }
        }
    });
    if (document.querySelectorAll('.gtm4wp_productdata,.widget-product-item').length > 0) {
        let products = [];
        let ga4_products = [];
        let productprice = 0;
        let product_data;
        document.querySelectorAll('.gtm4wp_productdata,.widget-product-item').forEach(function(dom_productdata) {
            productprice = dom_productdata.getAttribute('data-gtm4wp_product_price');
            if (typeof productprice == "string") {
                productprice = parseFloat(productprice);
                if (isNaN(productprice)) {
                    productprice = 0;
                }
            } else if (typeof productprice != "number") {
                productprice = 0;
            }
            product_data = {
                'name': dom_productdata.getAttribute('data-gtm4wp_product_name'),
                'id': dom_productdata.getAttribute('data-gtm4wp_product_id'),
                'price': productprice.toFixed(2),
                'category': dom_productdata.getAttribute('data-gtm4wp_product_cat'),
                'position': dom_productdata.getAttribute('data-gtm4wp_product_listposition'),
                'list': dom_productdata.getAttribute('data-gtm4wp_productlist_name'),
                'stocklevel': dom_productdata.getAttribute('data-gtm4wp_product_stocklevel'),
                'brand': dom_productdata.getAttribute('data-gtm4wp_product_brand')
            };
            products.push(product_data);
            ga4_products.push(gtm4wp_map_eec_to_ga4(product_data));
        });
        if (gtm4wp_product_per_impression > 0) {
            let chunk
            let ga4_chunk;
            while (products.length) {
                chunk = products.splice(0, gtm4wp_product_per_impression);
                ga4_chunk = ga4_products.splice(0, gtm4wp_product_per_impression);
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.productImpressionEEC',
                    'ecommerce': {
                        'currencyCode': gtm4wp_currency,
                        'impressions': chunk
                    }
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'view_item_list',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'items': ga4_chunk
                    }
                });
            }
        } else {
            for (var i = 0; i < window[gtm4wp_datalayer_name].length; i++) {
                if (window[gtm4wp_datalayer_name][i]['ecommerce']) {
                    if (!window[gtm4wp_datalayer_name][i]['ecommerce']['impressions']) {
                        window[gtm4wp_datalayer_name][i]['ecommerce']['impressions'] = products;
                    } else {
                        window[gtm4wp_datalayer_name][i]['ecommerce']['impressions'] = window[gtm4wp_datalayer_name][i]['ecommerce']['impressions'].concat(products);
                    }
                    break;
                }
            }
            if (i == window[gtm4wp_datalayer_name].length) {
                i = 0;
                window[gtm4wp_datalayer_name][i]['ecommerce'] = {};
                window[gtm4wp_datalayer_name][i]['ecommerce']['impressions'] = products;
            }
            window[gtm4wp_datalayer_name][i]['ecommerce']['currencyCode'] = gtm4wp_currency;
        }
    }
    document.addEventListener('click', function(e) {
        let event_target_element = e.target;
        if (!event_target_element) {
            return true;
        }
        try {
            if (!event_target_element.closest('.add_to_cart_button:not(.product_type_variable, .product_type_grouped, .single_add_to_cart_button)')) {
                return true;
            }
        } catch (e) {
            return true;
        }
        const product_el = event_target_element.closest('.product,.wc-block-grid__product');
        const productdata = product_el && product_el.querySelector('.gtm4wp_productdata');
        if (!productdata) {
            return true;
        }
        let productprice = productdata.getAttribute('data-gtm4wp_product_price');
        if (typeof productprice == "string") {
            productprice = parseFloat(productprice);
            if (isNaN(productprice)) {
                productprice = 0;
            }
        } else if (typeof productprice != "number") {
            productprice = 0;
        }
        const product_data = {
            'name': productdata.getAttribute('data-gtm4wp_product_name'),
            'id': productdata.getAttribute('data-gtm4wp_product_id'),
            'price': productprice.toFixed(2),
            'category': productdata.getAttribute('data-gtm4wp_product_cat'),
            'stocklevel': productdata.getAttribute('data-gtm4wp_product_stocklevel'),
            'brand': productdata.getAttribute('data-gtm4wp_product_brand'),
            'quantity': 1
        };
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.addProductToCartEEC',
            'ecommerce': {
                'currencyCode': gtm4wp_currency,
                'add': {
                    'products': [product_data]
                }
            }
        });
        window[gtm4wp_datalayer_name].push({
            'event': 'add_to_cart',
            'ecommerce': {
                'currency': gtm4wp_currency,
                'value': productprice.toFixed(2),
                'items': [gtm4wp_map_eec_to_ga4(product_data)]
            }
        });
    });
    document.addEventListener('click', function(e) {
        let event_target_element = e.target;
        if (!event_target_element) {
            return true;
        }
        try {
            if (!event_target_element.closest('.single_add_to_cart_button:not(.disabled)')) {
                return true;
            }
        } catch (e) {
            return true;
        }
        const product_form = event_target_element.closest('form.cart');
        if (!product_form) {
            return true;
        }
        let product_variant_id = product_form.querySelectorAll('[name=variation_id]');
        let product_is_grouped = product_form.classList && product_form.classList.contains('grouped_form');
        if (product_variant_id.length > 0) {
            if (gtm4wp_last_selected_product_variation) {
                const qty_el = product_form.querySelector('[name=quantity]');
                gtm4wp_last_selected_product_variation.quantity = (qty_el && qty_el.value) || 1;
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.addProductToCartEEC',
                    'ecommerce': {
                        'currencyCode': gtm4wp_currency,
                        'add': {
                            'products': [gtm4wp_last_selected_product_variation]
                        }
                    }
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'add_to_cart',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': gtm4wp_last_selected_product_variation.price * gtm4wp_last_selected_product_variation.quantity,
                        'items': [gtm4wp_map_eec_to_ga4(gtm4wp_last_selected_product_variation)]
                    }
                });
            }
        } else if (product_is_grouped) {
            const products_in_group = document.querySelectorAll('.grouped_form .gtm4wp_productdata');
            let products = [];
            let ga4_products = [];
            let sum_value = 0;
            products_in_group.forEach(function(dom_productdata) {
                const product_qty_input = document.querySelectorAll('input[name=quantity\\[' + dom_productdata.getAttribute('data-gtm4wp_product_id') + '\\]]');
                if (product_qty_input.length > 0) {
                    product_qty = (product_qty_input[0] && product_qty_input[0].value) || 1;
                } else {
                    return true;
                }
                if (0 == product_qty) {
                    return true;
                }
                const product_data = {
                    'id': gtm4wp_use_sku_instead ? dom_productdata.getAttribute('data-gtm4wp_product_sku') : dom_productdata.getAttribute('data-gtm4wp_product_id'),
                    'name': dom_productdata.getAttribute('data-gtm4wp_product_name'),
                    'price': dom_productdata.getAttribute('data-gtm4wp_product_price'),
                    'category': dom_productdata.getAttribute('data-gtm4wp_product_cat'),
                    'quantity': product_qty,
                    'stocklevel': dom_productdata.getAttribute('data-gtm4wp_product_stocklevel'),
                    'brand': dom_productdata.getAttribute('data-gtm4wp_product_brand')
                };
                products.push(product_data);
                ga4_products.push(gtm4wp_map_eec_to_ga4(product_data));
                sum_value += product_data.price * product_data.quantity;
            });
            if (0 == products.length) {
                return true;
            }
            window[gtm4wp_datalayer_name].push({
                'event': 'gtm4wp.addProductToCartEEC',
                'ecommerce': {
                    'currencyCode': gtm4wp_currency,
                    'add': {
                        'products': products
                    }
                }
            });
            window[gtm4wp_datalayer_name].push({
                'event': 'add_to_cart',
                'ecommerce': {
                    'currency': gtm4wp_currency,
                    'value': sum_value,
                    'items': ga4_products
                }
            });
        } else {
            const product_id_el = gtm4wp_use_sku_instead ? product_form.querySelector('[name=gtm4wp_sku]') : product_form.querySelector('[name=gtm4wp_id]');
            const product_data = {
                'id': product_id_el && product_id_el.value,
                'name': product_form.querySelector('[name=gtm4wp_name]') && product_form.querySelector('[name=gtm4wp_name]').value,
                'price': product_form.querySelector('[name=gtm4wp_price]') && product_form.querySelector('[name=gtm4wp_price]').value,
                'category': product_form.querySelector('[name=gtm4wp_category]') && product_form.querySelector('[name=gtm4wp_category]').value,
                'quantity': product_form.querySelector('[name=quantity]') && product_form.querySelector('[name=quantity]').value,
                'stocklevel': product_form.querySelector('[name=gtm4wp_stocklevel]') && product_form.querySelector('[name=gtm4wp_stocklevel]').value,
                'brand': product_form.querySelector('[name=gtm4wp_brand]') && product_form.querySelector('[name=gtm4wp_brand]').value
            };
            window[gtm4wp_datalayer_name].push({
                'event': 'gtm4wp.addProductToCartEEC',
                'ecommerce': {
                    'currencyCode': gtm4wp_currency,
                    'add': {
                        'products': [product_data]
                    }
                }
            });
            window[gtm4wp_datalayer_name].push({
                'event': 'add_to_cart',
                'ecommerce': {
                    'currency': gtm4wp_currency,
                    'value': product_data.price * product_data.quantity,
                    'items': [gtm4wp_map_eec_to_ga4(product_data)]
                }
            });
        }
    });
    document.addEventListener('click', function(e) {
        const dom_productdata = e.target;
        if (!dom_productdata || !dom_productdata.closest('.mini_cart_item a.remove,.product-remove a.remove')) {
            return true;
        }
        let qty = 0;
        const cart_item_el = dom_productdata.closest('.cart_item');
        let qty_element = cart_item_el && cart_item_el.querySelectorAll('.product-quantity input.qty');
        if (!qty_element || (qty_element.length === 0)) {
            const mini_cart_item_el = dom_productdata.closest('.mini_cart_item');
            qty_element = mini_cart_item_el && mini_cart_item_el.querySelectorAll('.quantity');
            if (qty_element && (qty_element.length > 0)) {
                qty = parseInt(qty_element[0].textContent);
                if (Number.isNaN(qty)) {
                    qty = 0;
                }
            }
        } else {
            qty = qty_element[0].value;
        }
        if (qty === 0) {
            return true;
        }
        const product_data = {
            'name': dom_productdata.getAttribute('data-gtm4wp_product_name'),
            'id': dom_productdata.getAttribute('data-gtm4wp_product_id'),
            'price': dom_productdata.getAttribute('data-gtm4wp_product_price'),
            'category': dom_productdata.getAttribute('data-gtm4wp_product_cat'),
            'variant': dom_productdata.getAttribute('data-gtm4wp_product_variant'),
            'stocklevel': dom_productdata.getAttribute('data-gtm4wp_product_stocklevel'),
            'brand': dom_productdata.getAttribute('data-gtm4wp_product_brand'),
            'quantity': qty
        };
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.removeFromCartEEC',
            'ecommerce': {
                'currencyCode': gtm4wp_currency,
                'remove': {
                    'products': [product_data]
                }
            }
        });
        window[gtm4wp_datalayer_name].push({
            'event': 'remove_from_cart',
            'ecommerce': {
                'currency': gtm4wp_currency,
                'value': product_data.price * product_data.quantity,
                'items': [gtm4wp_map_eec_to_ga4(product_data)]
            }
        });
    });
    let productlist_item_selector = '.products li:not(.product-category) a:not(.add_to_cart_button):not(.quick-view-button),' +
        '.wc-block-grid__products li:not(.product-category) a:not(.add_to_cart_button):not(.quick-view-button),' +
        '.products>div:not(.product-category) a:not(.add_to_cart_button):not(.quick-view-button),' +
        '.widget-product-item,' +
        '.woocommerce-grouped-product-list-item__label a'
    document.addEventListener('click', function(e) {
        if ('undefined' == typeof google_tag_manager) {
            return true;
        }
        const event_target_element = e.target;
        const matching_link_element = event_target_element.closest(productlist_item_selector);
        if (!matching_link_element) {
            return true;
        }
        let temp_selector = event_target_element.closest('.product,.wc-block-grid__product');
        let dom_productdata;
        if (temp_selector) {
            dom_productdata = temp_selector.querySelector('.gtm4wp_productdata');
        } else {
            temp_selector = event_target_element.closest('.products li');
            if (temp_selector) {
                dom_productdata = temp_selector.querySelector('.gtm4wp_productdata');
            } else {
                temp_selector = event_target_element.closest('.products>div');
                if (temp_selector) {
                    dom_productdata = temp_selector.querySelector('.gtm4wp_productdata');
                } else {
                    temp_selector = event_target_element.closest('.woocommerce-grouped-product-list-item__label');
                    if (temp_selector) {
                        dom_productdata = temp_selector.querySelector('.gtm4wp_productdata');
                    } else {
                        dom_productdata = event_target_element;
                    }
                }
            }
        }
        if (('undefined' == typeof dom_productdata.getAttribute('data-gtm4wp_product_id')) || ('' == dom_productdata.getAttribute('data-gtm4wp_product_id'))) {
            return true;
        }
        if (dom_productdata.getAttribute('data-gtm4wp_product_url') != matching_link_element.getAttribute('href')) {
            return true;
        }
        const product_data = {
            'id': dom_productdata.getAttribute('data-gtm4wp_product_id'),
            'name': dom_productdata.getAttribute('data-gtm4wp_product_name'),
            'price': dom_productdata.getAttribute('data-gtm4wp_product_price'),
            'category': dom_productdata.getAttribute('data-gtm4wp_product_cat'),
            'stocklevel': dom_productdata.getAttribute('data-gtm4wp_product_stocklevel'),
            'brand': dom_productdata.getAttribute('data-gtm4wp_product_brand'),
            'position': dom_productdata.getAttribute('data-gtm4wp_product_listposition')
        };
        for (let i in window.google_tag_manager) {
            if (i.substring(0, 4).toLowerCase() == "gtm-") {
                window.gtm4wp_first_container_id = i;
                break;
            }
        }
        if ("" === window.gtm4wp_first_container_id) {
            return true;
        }
        const ctrl_key_pressed = e.ctrlKey || e.metaKey;
        e.preventDefault();
        if (ctrl_key_pressed) {
            window.productpage_window = window.open('about:blank', '_blank');
        }
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.productClickEEC',
            'ecommerce': {
                'currencyCode': gtm4wp_currency,
                'click': {
                    'actionField': {
                        'list': dom_productdata.getAttribute('data-gtm4wp_productlist_name')
                    },
                    'products': [product_data]
                }
            },
            'eventCallback': function(container_id) {
                if ("undefined" !== typeof container_id && window.gtm4wp_first_container_id != container_id) {
                    return true;
                }
                window[gtm4wp_datalayer_name].push({
                    'event': 'select_item',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'items': [gtm4wp_map_eec_to_ga4(product_data)]
                    },
                    'eventCallback': function() {
                        if (ctrl_key_pressed && productpage_window) {
                            productpage_window.location.href = dom_productdata.getAttribute('data-gtm4wp_product_url');
                        } else {
                            document.location.href = dom_productdata.getAttribute('data-gtm4wp_product_url');
                        }
                    },
                    'eventTimeout': 2000
                });
            },
            'eventTimeout': 2000
        });
    });
    jQuery(document).on('found_variation', function(event, product_variation) {
        if ("undefined" == typeof product_variation) {
            return;
        }
        if ((document.readyState === "interactive") && gtm4wp_changedetail_fired_during_pageload) {
            return;
        }
        const product_form = event.target;
        const product_variant_id = product_form.querySelector('[name=variation_id]') && product_form.querySelector('[name=variation_id]').value;
        const product_id = product_form.querySelector('[name=gtm4wp_id]') && product_form.querySelector('[name=gtm4wp_id]').value;
        const product_name = product_form.querySelector('[name=gtm4wp_name]') && product_form.querySelector('[name=gtm4wp_name]').value;
        const product_sku = product_form.querySelector('[name=gtm4wp_sku]') && product_form.querySelector('[name=gtm4wp_sku]').value;
        const product_category = product_form.querySelector('[name=gtm4wp_category]') && product_form.querySelector('[name=gtm4wp_category]').value;
        const product_price = product_form.querySelector('[name=gtm4wp_price]') && product_form.querySelector('[name=gtm4wp_price]').value;
        const product_stocklevel = product_form.querySelector('[name=gtm4wp_stocklevel]') && product_form.querySelector('[name=gtm4wp_stocklevel]').value;
        const product_brand = product_form.querySelector('[name=gtm4wp_brand]') && product_form.querySelector('[name=gtm4wp_brand]').value;
        let current_product_detail_data = {
            name: product_name,
            id: 0,
            price: 0,
            category: product_category,
            stocklevel: product_stocklevel,
            brand: product_brand,
            variant: ''
        };
        current_product_detail_data.id = product_variation.variation_id;
        if (gtm4wp_use_sku_instead && product_variation.sku && ('' !== product_variation.sku)) {
            current_product_detail_data.id = product_variation.sku;
        }
        current_product_detail_data.price = product_variation.display_price;
        let product_variation_attribute_values = [];
        for (let attrib_key in product_variation.attributes) {
            product_variation_attribute_values.push(product_variation.attributes[attrib_key]);
        }
        current_product_detail_data.variant = product_variation_attribute_values.join(',');
        gtm4wp_last_selected_product_variation = current_product_detail_data;
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.changeDetailViewEEC',
            'ecommerce': {
                'currencyCode': gtm4wp_currency,
                'detail': {
                    'products': [current_product_detail_data]
                }
            },
            'ecomm_prodid': gtm4wp_id_prefix + current_product_detail_data.id,
            'ecomm_pagetype': 'product',
            'ecomm_totalvalue': current_product_detail_data.price,
        });
        window[gtm4wp_datalayer_name].push({
            'event': 'view_item',
            'ecommerce': {
                'currency': gtm4wp_currency,
                'value': current_product_detail_data.price,
                'items': [gtm4wp_map_eec_to_ga4(current_product_detail_data)]
            }
        });
        if (document.readyState === "interactive") {
            gtm4wp_changedetail_fired_during_pageload = true;
        }
    });
    jQuery('.variations select').trigger('change');
    jQuery(document).ajaxSuccess(function(event, xhr, settings) {
        if (typeof settings !== 'undefined') {
            if (settings.url.indexOf('wc-api=WC_Quick_View') > -1) {
                setTimeout(function() {
                    const dl_data = document.querySelector('#gtm4wp_quickview_data');
                    if (dl_data && dl_data.dataset && dl_data.dataset.gtm4wp_datalayer) {
                        try {
                            const dl_data_obj = JSON.parse(dl_data.dataset.gtm4wp_datalayer);
                            if (dl_data_obj && window.dataLayer) {
                                window.dataLayer.push(dl_data_obj);
                            }
                        } catch (e) {
                            console && console.error && console.error(e.message);
                        }
                    }
                }, 500);
            }
        }
    });
    if (gtm4wp_is_cart) {
        document.addEventListener('click', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest('[name=update_cart]')) {
                return true;
            }
            gtm4wp_handle_cart_qty_change();
        });
        document.addEventListener('keypress', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest('.woocommerce-cart-form input[type=number]')) {
                return true;
            }
            gtm4wp_handle_cart_qty_change();
        });
    }
    if (gtm4wp_is_checkout) {
        window.gtm4wp_checkout_step_offset = window.gtm4wp_checkout_step_offset || 0;
        window.gtm4wp_checkout_value = window.gtm4wp_checkout_value || 0;
        window.gtm4wp_checkout_products = window.gtm4wp_checkout_products || [];
        window.gtm4wp_checkout_products_ga4 = window.gtm4wp_checkout_products_ga4 || [];
        document.addEventListener('focusout', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest || !event_target_element.closest('input[name^=shipping_]:not(input[name^=shipping_method])')) {
                return true;
            }
            if (gtm4wp_checkout_step_fired.indexOf('shipping') > -1) {
                return;
            }
            if (event_target_element.value.trim() == '') {
                return;
            }
            window[gtm4wp_datalayer_name].push({
                'event': 'gtm4wp.checkoutStepEEC',
                'ecommerce': {
                    'currencyCode': gtm4wp_currency,
                    'checkout': {
                        'actionField': {
                            'step': 2 + window.gtm4wp_checkout_step_offset
                        },
                        'products': window.gtm4wp_checkout_products
                    }
                }
            });
            gtm4wp_checkout_step_fired.push('shipping');
        });
        document.addEventListener('change', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest('input[name^=shipping_method]')) {
                return true;
            }
            gtm4wp_handle_shipping_method_change();
        });
        document.addEventListener('change', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest('input[name=payment_method]')) {
                return true;
            }
            gtm4wp_handle_payment_method_change();
        });
        document.addEventListener('submit', function(e) {
            let event_target_element = e.target;
            if (!event_target_element) {
                return true;
            }
            if (!event_target_element.closest('form[name=checkout]')) {
                return true;
            }
            if (gtm4wp_checkout_step_fired.indexOf('shipping_method') == -1) {
                gtm4wp_handle_shipping_method_change();
            }
            if (gtm4wp_checkout_step_fired.indexOf('payment_method') == -1) {
                gtm4wp_handle_payment_method_change();
            }
            let shipping_el = document.querySelector('input[name^=shipping_method]:checked');
            if (!shipping_el) {
                shipping_el = document.querySelector('input[name^=shipping_method]');
            }
            if (shipping_el) {
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.checkoutOptionEEC',
                    'ecommerce': {
                        'checkout_option': {
                            'actionField': {
                                'step': 3 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset,
                                'option': 'Shipping: ' + shipping_el.value
                            }
                        }
                    }
                });
            }
            let payment_el = document.querySelector('.payment_methods input:checked');
            if (!payment_el) {
                payment_el = document.querySelector('input[name^=payment_method]');
            }
            if (payment_el) {
                window[gtm4wp_datalayer_name].push({
                    'event': 'gtm4wp.checkoutOptionEEC',
                    'ecommerce': {
                        'checkout_option': {
                            'actionField': {
                                'step': 4 + window.gtm4wp_checkout_step_offset + gtm4wp_shipping_payment_method_step_offset,
                                'option': 'Payment: ' + payment_el.value
                            }
                        }
                    }
                });
            }
        });
    }
    if (window.gtm4wp_remarketing && !gtm4wp_is_cart && !gtm4wp_is_checkout) {
        if (jQuery('.gtm4wp_productdata').length > 0) {
            for (var i = 0; i < window[gtm4wp_datalayer_name].length; i++) {
                if (window[gtm4wp_datalayer_name][i]['ecomm_prodid']) {
                    break;
                }
            }
            if (i == window[gtm4wp_datalayer_name].length) {
                i = 0;
                window[gtm4wp_datalayer_name][i]['ecomm_prodid'] = [];
            }
            if ('undefined' !== typeof window[gtm4wp_datalayer_name][i]['ecomm_prodid'].push) {
                var productdata;
                jQuery('.gtm4wp_productdata').each(function() {
                    productdata = jQuery(this);
                    window[gtm4wp_datalayer_name][i]['ecomm_prodid'].push(gtm4wp_id_prefix + productdata.data('gtm4wp_product_id'));
                });
            }
        }
    }
    if (window[gtm4wp_datalayer_name] && window[gtm4wp_datalayer_name].forEach) {
        window[gtm4wp_datalayer_name].forEach(function(item) {
            if (item && item.ecommerce && item.ecommerce.detail) {
                window[gtm4wp_datalayer_name].push({
                    'event': 'view_item',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': item.ecommerce.detail.products[0].price,
                        'items': [gtm4wp_map_eec_to_ga4(item.ecommerce.detail.products[0])]
                    }
                });
            }
            if (item && item.ecommerce && (item.ecommerce.cart || (item.ecommerce.checkout && gtm4wp_is_cart))) {
                let source_products = item.ecommerce.cart || item.ecommerce.checkout.products;
                let ga4_products = [];
                let sum_value = 0;
                source_products.forEach(function(product) {
                    ga4_products.push(gtm4wp_map_eec_to_ga4(product));
                    sum_value += product.price * product.quantity;
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'view_cart',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': sum_value.toFixed(2),
                        'items': ga4_products
                    }
                });
            }
            if (item && item.ecommerce && item.ecommerce.checkout && !gtm4wp_is_cart) {
                let ga4_products = [];
                let sum_value = 0;
                item.ecommerce.checkout.products.forEach(function(product) {
                    ga4_products.push(gtm4wp_map_eec_to_ga4(product));
                    sum_value += product.price * product.quantity;
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'begin_checkout',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': sum_value,
                        'items': ga4_products
                    }
                });
            }
            if (item && item.ecommerce && item.ecommerce.add) {
                let ga4_products = [];
                let sum_value = 0;
                item.ecommerce.add.products.forEach(function(product) {
                    ga4_products.push(gtm4wp_map_eec_to_ga4(product));
                    sum_value += product.price * product.quantity;
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'add_to_cart',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'value': sum_value,
                        'items': ga4_products
                    }
                });
            }
            if (item && item.ecommerce && item.ecommerce.purchase) {
                let ga4_products = [];
                item.ecommerce.purchase.products.forEach(function(product) {
                    ga4_products.push(gtm4wp_map_eec_to_ga4(product));
                });
                window[gtm4wp_datalayer_name].push({
                    'event': 'purchase',
                    'ecommerce': {
                        'currency': gtm4wp_currency,
                        'items': ga4_products,
                        'transaction_id': item.ecommerce.purchase.actionField.id,
                        'affiliation': item.ecommerce.purchase.actionField.affiliation,
                        'value': item.ecommerce.purchase.actionField.revenue,
                        'tax': item.ecommerce.purchase.actionField.tax,
                        'shipping': item.ecommerce.purchase.actionField.shipping,
                        'coupon': item.ecommerce.purchase.actionField.coupon
                    }
                });
            }
        });
    }
};

function gtm4wp_page_loading_completed() {
    document.removeEventListener("DOMContentLoaded", gtm4wp_page_loading_completed);
    window.removeEventListener("load", gtm4wp_page_loading_completed);
    gtm4wp_process_woocommerce_pages();
}
if (document.readyState !== "loading") {
    window.setTimeout(gtm4wp_process_woocommerce_pages);
} else {
    document.addEventListener("DOMContentLoaded", gtm4wp_page_loading_completed);
    window.addEventListener("load", gtm4wp_page_loading_completed);
};
/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
! function(e) {
    var n, o, t = !1;
    "function" == typeof define && define.amd && (define(e), t = !0), "object" == typeof exports && (module.exports = e(), t = !0), t || (n = window.Cookies, (o = window.Cookies = e()).noConflict = function() {
        return window.Cookies = n, o
    })
}(function() {
    function m() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var o, t = arguments[e];
            for (o in t) n[o] = t[o]
        }
        return n
    }
    return function e(C) {
        function g(e, n, o) {
            var t, r;
            if ("undefined" != typeof document) {
                if (1 < arguments.length) {
                    "number" == typeof(o = m({
                        path: "/"
                    }, g.defaults, o)).expires && ((r = new Date).setMilliseconds(r.getMilliseconds() + 864e5 * o.expires), o.expires = r), o.expires = o.expires ? o.expires.toUTCString() : "";
                    try {
                        t = JSON.stringify(n), /^[\{\[]/.test(t) && (n = t)
                    } catch (l) {}
                    n = C.write ? C.write(n, e) : encodeURIComponent(String(n)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent), e = (e = (e = encodeURIComponent(String(e))).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)).replace(/[\(\)]/g, escape);
                    var i, c = "";
                    for (i in o) o[i] && (c += "; " + i, !0 !== o[i] && (c += "=" + o[i]));
                    return document.cookie = e + "=" + n + c
                }
                e || (t = {});
                for (var s = document.cookie ? document.cookie.split("; ") : [], f = /(%[0-9A-Z]{2})+/g, p = 0; p < s.length; p++) {
                    var a = s[p].split("=");
                    '"' === (u = a.slice(1).join("=")).charAt(0) && (u = u.slice(1, -1));
                    try {
                        var d = a[0].replace(f, decodeURIComponent),
                            u = C.read ? C.read(u, d) : C(u, d) || u.replace(f, decodeURIComponent);
                        if (this.json) try {
                            u = JSON.parse(u)
                        } catch (l) {}
                        if (e === d) {
                            t = u;
                            break
                        }
                        e || (t[d] = u)
                    } catch (l) {}
                }
                return t
            }
        }
        return (g.set = g).get = function(e) {
            return g.call(g, e)
        }, g.getJSON = function() {
            return g.apply({
                json: !0
            }, [].slice.call(arguments))
        }, g.defaults = {}, g.remove = function(e, n) {
            g(e, "", m(n, {
                expires: -1
            }))
        }, g.withConverter = e, g
    }(function() {})
});

(function(t) {
    function e(e) {
        return u ? e.data("events") : t._data(e[0]).events
    }

    function n(t, n, r) {
        var i = e(t),
            a = i[n];
        if (!u) {
            var s = r ? a.splice(a.delegateCount - 1, 1)[0] : a.pop();
            return a.splice(r ? 0 : a.delegateCount || 0, 0, s), void 0
        }
        r ? i.live.unshift(i.live.pop()) : a.unshift(a.pop())
    }

    function r(e, r, i) {
        var a = r.split(/\s+/);
        e.each(function() {
            for (var e = 0; a.length > e; ++e) {
                var r = a[e].trim().match(/[^\.]+/i)[0];
                n(t(this), r, i)
            }
        })
    }

    function i(e) {
        t.fn[e + "First"] = function() {
            var n = t.makeArray(arguments),
                i = n.shift();
            return i && (t.fn[e].apply(this, arguments), r(this, i)), this
        }
    }
    var a = t.fn.jquery.split("."),
        s = parseInt(a[0]),
        f = parseInt(a[1]),
        u = 1 > s || 1 == s && 7 > f;
    i("bind"), i("one"), t.fn.delegateFirst = function() {
        var e = t.makeArray(arguments),
            n = e[1];
        return n && (e.splice(0, 2), t.fn.delegate.apply(this, arguments), r(this, n, !0)), this
    }, t.fn.liveFirst = function() {
        var e = t.makeArray(arguments);
        return e.unshift(this.selector), t.fn.delegateFirst.apply(t(document), e), this
    }, u || (t.fn.onFirst = function(e, n) {
        var i = t(this),
            a = "string" == typeof n;
        if (t.fn.on.apply(i, arguments), "object" == typeof e)
            for (type in e) e.hasOwnProperty(type) && r(i, type, a);
        else "string" == typeof e && r(i, e, a);
        return i
    })
})(jQuery);
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0) {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            while (k < len) {
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            return false;
        }
    });
}
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        enumerable: false,
        configurable: false,
        writable: false,
        value: function(searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        }
    });
}
if (!String.prototype.trim) {
    (function() {
        String.prototype.trim = function() {
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
        };
    })();
}! function($, options) {
    if (options.debug) {
        console.log('PYS:', options);
    }
    var dummyPinterest = function() {
        return {
            tag: function() {
                return "pinterest";
            },
            isEnabled: function() {},
            disable: function() {},
            loadPixel: function() {},
            fireEvent: function(name, data) {
                return false;
            },
            onAdSenseEvent: function(event) {},
            onClickEvent: function(params) {},
            onWatchVideo: function(params) {},
            onCommentEvent: function(event) {},
            onFormEvent: function(params) {},
            onDownloadEvent: function(params) {},
            onWooAddToCartOnButtonEvent: function(product_id) {},
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {},
            onWooRemoveFromCartEvent: function(cart_item_hash) {},
            onWooAffiliateEvent: function(product_id) {},
            onWooPayPalEvent: function(event) {},
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {},
            onEddRemoveFromCartEvent: function(item) {},
            onPageScroll: function(event) {},
            onTime: function(event) {},
        }
    }();
    var dummyBing = function() {
        return {
            tag: function() {
                return "bing";
            },
            isEnabled: function() {},
            disable: function() {},
            loadPixel: function() {},
            fireEvent: function(name, data) {
                return false;
            },
            onAdSenseEvent: function(event) {},
            onClickEvent: function(params) {},
            onWatchVideo: function(params) {},
            onCommentEvent: function(event) {},
            onFormEvent: function(params) {},
            onDownloadEvent: function(params) {},
            onWooAddToCartOnButtonEvent: function(product_id) {},
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {},
            onWooRemoveFromCartEvent: function(cart_item_hash) {},
            onWooAffiliateEvent: function(product_id) {},
            onWooPayPalEvent: function(event) {},
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {},
            onEddRemoveFromCartEvent: function(item) {},
            onPageScroll: function(event) {},
            onTime: function(event) {},
        }
    }();
    var Utils = function(options) {
        var Pinterest = dummyPinterest;
        var Bing = dummyBing;
        var gtag_loaded = false;
        let isNewSession = checkSession();

        function loadPixels() {
            if (!options.gdpr.all_disabled_by_api) {
                if (!options.gdpr.tiktok_disabled_by_api) {
                    TikTok.loadPixel();
                }
                if (!options.gdpr.facebook_disabled_by_api) {
                    Facebook.loadPixel();
                }
                if (!options.gdpr.analytics_disabled_by_api) {
                    Analytics.loadPixel();
                }
                if (!options.gdpr.google_ads_disabled_by_api) {
                    GAds.loadPixel();
                }
                if (!options.gdpr.pinterest_disabled_by_api) {
                    Pinterest.loadPixel();
                }
                if (!options.gdpr.bing_disabled_by_api) {
                    Bing.loadPixel();
                }
            }
        }

        function isJSApiAttrEnabled(url) {
            return url.indexOf('enablejsapi') > -1;
        }

        function isOriginAttrEnabled(url) {
            return url.indexOf('origin') > -1;
        }

        function getVideoCompletionMarks(duration) {
            var marks = {};
            var points = [0, 10, 50, 90, 100];
            for (var i = 0; i < points.length; i++) {
                var _point = points[i];
                var _mark = _point + '%';
                var _time = duration * _point / 100;
                if (_point === 100) {
                    _time = _time - 1;
                }
                marks[_mark] = Math.floor(_time);
            }
            return marks;
        }

        function tagIsYouTubeVideo(tag) {
            var src = tag.src || '';
            return src.indexOf('youtube.com/embed/') > -1 || src.indexOf('youtube.com/v/') > -1;
        }

        function tagIsYouTubeAsyncVideo(tag) {
            if (tag.src && tag.src.indexOf("data:image") !== -1) return false;
            var keys = Object.keys(tag.dataset);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].toLowerCase().indexOf("src") > -1) {
                    var src = tag.dataset[keys[i]];
                    return src.indexOf('youtube.com/embed/') > -1 || src.indexOf('youtube.com/v/') > -1;
                }
            }
            return false;
        }

        function normalizeYouTubeIframe(tag) {
            var loc = window.location;
            var a = document.createElement('a');
            a.href = tag.src;
            a.hostname = 'www.youtube.com';
            a.protocol = loc.protocol;
            var tmpPathname = a.pathname.charAt(0) === '/' ? a.pathname : '/' + a.pathname;
            if (!isJSApiAttrEnabled(a.search)) {
                a.search = (a.search.length > 0 ? a.search + '&' : '') + 'enablejsapi=1';
            }
            if (!isOriginAttrEnabled(a.search) && loc.hostname.indexOf('localhost') === -1) {
                var port = loc.port ? ':' + loc.port : '';
                var origin = loc.protocol + '%2F%2F' + loc.hostname + port;
                a.search = a.search + '&origin=' + origin;
            }
            if (tag.type === 'application/x-shockwave-flash') {
                var newIframe = document.createElement('iframe');
                newIframe.height = tag.height;
                newIframe.width = tag.width;
                tmpPathname = tmpPathname.replace('/v/', '/embed/');
                tag.parentNode.parentNode.replaceChild(newIframe, tag.parentNode);
                tag = newIframe;
            }
            a.pathname = tmpPathname;
            if (tag.src !== a.href + a.hash) {
                tag.src = a.href + a.hash;
            }
            return tag;
        }

        function addYouTubeEvents(iframe) {
            var player = YT.get(iframe.id);
            if (!player) {
                player = new YT.Player(iframe, {});
            }
            if (typeof iframe.pauseFlag === 'undefined') {
                iframe.pauseFlag = false;
                player.addEventListener('onStateChange', function(evt) {
                    onYouTubePlayerStateChange(evt, iframe);
                });
            }
        }

        function addDynYouTubeVideos(el) {
            if (el.tagName === 'IFRAME' && tagIsYouTubeVideo(el) && isJSApiAttrEnabled(el.src) && isOriginAttrEnabled(el.src)) {
                addYouTubeEvents(el);
            }
        }

        function onYouTubePlayerStateChange(evt, iframe) {
            var stateIndex = evt.data;
            var player = evt.target;
            var targetVideoUrl = player.getVideoUrl();
            var targetVideoId = targetVideoUrl.match(/[?&]v=([^&#]*)/)[1];
            var playerState = player.getPlayerState();
            var marks = getVideoCompletionMarks(player.getDuration());
            iframe.playTracker = iframe.playTracker || {};
            if (playerState === YT.PlayerState.PLAYING && !iframe.timer) {
                clearInterval(iframe.timer);
                iframe.timer = setInterval(function() {
                    checkYouTubeCompletion(player, marks, iframe.videoId);
                }, 1000);
            } else {
                clearInterval(iframe.timer);
                iframe.timer = false;
            }
            if (stateIndex === YT.PlayerState.PLAYING) {
                iframe.playTracker[targetVideoId] = true;
                iframe.videoId = targetVideoId;
                iframe.pauseFlag = false;
            }
            if (!iframe.playTracker[iframe.videoId]) {
                return false;
            }
            if (stateIndex === YT.PlayerState.PAUSED) {
                if (!iframe.pauseFlag) {
                    iframe.pauseFlag = true;
                } else {
                    return false;
                }
            }
        }

        function checkYouTubeCompletion(player, marks, videoId) {
            var currentTime = player.getCurrentTime();
            player[videoId] = player[videoId] || {};
            for (var key in marks) {
                if (marks[key] <= currentTime && !player[videoId][key]) {
                    player[videoId][key] = true;
                    var data = player.getVideoData();
                    if (key === '0%') {
                        key = 'play';
                    }
                    var params = {
                        video_type: 'youtube',
                        video_id: videoId,
                        video_title: data.title,
                    };
                    if (options.automatic.enable_video && options.automatic.enable_youtube && options.dynamicEvents.hasOwnProperty("automatic_event_video")) {
                        var pixels = Object.keys(options.dynamicEvents.automatic_event_video);
                        for (var i = 0; i < pixels.length; i++) {
                            var event = Utils.clone(options.dynamicEvents.automatic_event_video[pixels[i]]);
                            event.params["progress"] = key
                            Utils.copyProperties(params, event.params)
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onWatchVideo(event);
                        }
                    }
                    if (key == "play") {
                        $.each(options.triggerEventTypes, function(triggerType, events) {
                            $.each(events, function(eventId, triggers) {
                                switch (triggerType) {
                                    case 'video_play':
                                        Utils.fireTriggerEvent(eventId);
                                        break;
                                }
                            });
                        });
                    }
                }
            }
        }

        function tagIsVimeoVideo(tag) {
            var src = tag.src || '';
            return src.indexOf('player.vimeo.com/video/') > -1;
        }

        function tagIsAsincVimeoVideo(tag) {
            if (tag.src) return false;
            var keys = Object.keys(tag.dataset);
            for (var i = 0; i < keys.length; i++) {
                if (keys[i].toLowerCase().indexOf("src") > -1) {
                    var src = tag.dataset[keys[i]];
                    return src.indexOf('player.vimeo.com/video/') > -1;
                }
            }
            return false;
        }

        function attachVimeoPlayerToTag(tag) {
            var player = new Vimeo.Player(tag);
            player.getDuration().then(function(pl, seconds) {
                pl.pysMarks = getVideoCompletionMarks(seconds);
            }.bind(null, player));
            player.getVideoTitle().then(function(pl, title) {
                pl.pysVideoTitle = title;
            }.bind(null, player));
            player.getVideoId().then(function(pl, id) {
                pl.pysVideoId = id;
            }.bind(null, player));
            player.pysCompletedMarks = {};
            player.on('play', function() {
                if (this.pysTimer) {
                    return;
                }
                clearInterval(this.pysTimer);
                var player = this;
                this.pysTimer = setInterval(function() {
                    checkVimeoCompletion(player);
                }, 1000);
            });
            player.on('pause', function() {
                clearInterval(this.pysTimer);
                this.pysTimer = false;
            });
            player.on('ended', function() {
                clearInterval(this.pysTimer);
                this.pysTimer = false;
            });
        }

        function checkVimeoCompletion(player) {
            player.getCurrentTime().then(function(seconds) {
                for (var key in player.pysMarks) {
                    if (player.pysMarks[key] <= seconds && !player.pysCompletedMarks[key]) {
                        player.pysCompletedMarks[key] = true;
                        if (key === '0%') {
                            key = 'play';
                        }
                        var params = {
                            video_type: 'vimeo',
                            video_id: player.pysVideoId,
                            video_title: player.pysVideoTitle,
                        };
                        if (options.automatic.enable_video && options.automatic.enable_vimeo && options.dynamicEvents.hasOwnProperty("automatic_event_video")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_video);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_video[pixels[i]]);
                                event.params["progress"] = key
                                Utils.copyProperties(params, event.params, );
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).onWatchVideo(event);
                            }
                        }
                        if (key == "play") {
                            $.each(options.triggerEventTypes, function(triggerType, events) {
                                $.each(events, function(eventId, triggers) {
                                    switch (triggerType) {
                                        case 'video_play':
                                            Utils.fireTriggerEvent(eventId);
                                            break;
                                    }
                                });
                            });
                        }
                    }
                }
            });
        }
        var utmTerms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
        var utmId = ['fbadid', 'gadid', 'padid', 'bingid'];
        var requestParams = [];

        function getDomain(url) {
            url = url.replace(/(https?:\/\/)?(www.)?/i, '');
            if (url.indexOf('/') !== -1) {
                return url.split('/')[0];
            }
            return url;
        }

        function checkSession() {
            let duration = options.last_visit_duration * 60000
            if (Cookies.get('pys_start_session') === undefined || Cookies.get('pys_session_limit') === undefined) {
                var now = new Date();
                now.setTime(now.getTime() + duration);
                Cookies.set('pys_session_limit', true, {
                    expires: now
                })
                Cookies.set('pys_start_session', true)
                return true
            }
            return false
        }

        function getTrafficSource() {
            try {
                let referrer = document.referrer.toString(),
                    source;
                let direct = referrer.length === 0;
                let internal = direct ? false : referrer.indexOf(options.siteUrl) === 0;
                let external = !direct && !internal;
                if (external === false) {
                    source = 'direct';
                } else {
                    source = referrer;
                }
                if (source !== 'direct') {
                    return getDomain(source);
                } else {
                    return source;
                }
            } catch (e) {
                console.error(e);
                return 'direct';
            }
        }

        function getQueryVars() {
            try {
                var result = {},
                    tmp = [];
                window.location.search.substr(1).split("&").forEach(function(item) {
                    tmp = item.split('=');
                    if (tmp.length > 1) {
                        result[tmp[0]] = tmp[1];
                    }
                });
                return result;
            } catch (e) {
                console.error(e);
                return {};
            }
        }

        function getLandingPageValue() {
            let name = "pys_landing_page"
            if (options.visit_data_model === "last_visit") {
                name = "last_pys_landing_page"
            }
            if (Cookies.get(name) === 'undefined') {
                return "";
            } else {
                return Cookies.get(name);
            }
        }

        function getTrafficSourceValue() {
            let name = "pysTrafficSource"
            if (options.visit_data_model === "last_visit") {
                name = "last_pysTrafficSource"
            }
            if (Cookies.get(name) === 'undefined') {
                return "";
            } else {
                return Cookies.get(name);
            }
        }

        function getUTMId(useLast = false) {
            try {
                let cookiePrefix = 'pys_'
                let terms = [];
                if (useLast) {
                    cookiePrefix = 'last_pys_'
                }
                $.each(utmId, function(index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        terms[name] = Cookies.get(cookiePrefix + name)
                    }
                });
                return terms;
            } catch (e) {
                console.error(e);
                return [];
            }
        }

        function getUTMs(useLast = false) {
            try {
                let cookiePrefix = 'pys_'
                if (useLast) {
                    cookiePrefix = 'last_pys_'
                }
                let terms = [];
                $.each(utmTerms, function(index, name) {
                    if (Cookies.get(cookiePrefix + name)) {
                        let value = Cookies.get(cookiePrefix + name);
                        terms[name] = filterEmails(value);
                    }
                });
                return terms;
            } catch (e) {
                console.error(e);
                return [];
            }
        }

        function getDateTime() {
            var dateTime = new Array();
            var date = new Date(),
                days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                hours = ['00-01', '01-02', '02-03', '03-04', '04-05', '05-06', '06-07', '07-08', '08-09', '09-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17', '17-18', '18-19', '19-20', '20-21', '21-22', '22-23', '23-24'];
            dateTime.push(hours[date.getHours()]);
            dateTime.push(days[date.getDay()]);
            dateTime.push(months[date.getMonth()]);
            return dateTime;
        }

        function filterEmails(value) {
            return Utils.validateEmail(value) ? undefined : value;
        }
        return {
            PRODUCT_SIMPLE: 0,
            PRODUCT_VARIABLE: 1,
            PRODUCT_BUNDLE: 2,
            PRODUCT_GROUPED: 3,
            validateEmail: function(email) {
                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            fireEventForAllPixel: function(functionName, events) {
                if (events.hasOwnProperty(Facebook.tag()))
                    Facebook[functionName](events[Facebook.tag()]);
                if (events.hasOwnProperty(Analytics.tag()))
                    Analytics[functionName](events[Analytics.tag()]);
                if (events.hasOwnProperty(GAds.tag()))
                    GAds[functionName](events[GAds.tag()]);
                if (events.hasOwnProperty(Pinterest.tag()))
                    Pinterest[functionName](events[Pinterest.tag()]);
                if (events.hasOwnProperty(Bing.tag()))
                    Bing[functionName](events[Bing.tag()]);
                if (events.hasOwnProperty(TikTok.tag()))
                    TikTok[functionName](events[TikTok.tag()]);
            },
            getQueryValue: function(name) {
                return getQueryVars()[name];
            },
            filterEmails: function(value) {
                return filterEmails(value);
            },
            setupPinterestObject: function() {
                Pinterest = window.pys.Pinterest || Pinterest;
                return Pinterest;
            },
            setupBingObject: function() {
                Bing = window.pys.Bing || Bing;
                return Bing;
            },
            copyProperties: function(from, to) {
                for (var key in from) {
                    if ("function" == typeof from[key]) {
                        continue;
                    }
                    to[key] = from[key];
                }
                return to;
            },
            clone: function(obj) {
                var copy;
                if (null == obj || "object" != typeof obj) return obj;
                if (obj instanceof Date) {
                    copy = new Date();
                    copy.setTime(obj.getTime());
                    return copy;
                }
                if (obj instanceof Array) {
                    copy = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        if ("function" == typeof obj[i]) {
                            continue;
                        }
                        copy[i] = Utils.clone(obj[i]);
                    }
                    return copy;
                }
                if (obj instanceof Object) {
                    copy = {};
                    for (var attr in obj) {
                        if (obj.hasOwnProperty(attr)) {
                            if ("function" == typeof obj[attr]) {
                                continue;
                            }
                            copy[attr] = Utils.clone(obj[attr]);
                        }
                    }
                    return copy;
                }
                return obj;
            },
            getTagsAsArray: function(tag) {
                return [].slice.call(document.getElementsByTagName(tag));
            },
            initYouTubeAPI: function() {
                if (typeof window.YT === 'undefined') {
                    var tag = document.createElement('script');
                    tag.src = '//www.youtube.com/iframe_api';
                    var firstScriptTag = document.getElementsByTagName('script')[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }
                window.onYouTubeIframeAPIReady = function() {
                    var potentialVideos = Utils.getTagsAsArray('iframe').concat(Utils.getTagsAsArray('embed'));
                    for (var i = 0; i < potentialVideos.length; i++) {
                        var video = potentialVideos[i];
                        if (tagIsYouTubeVideo(video)) {
                            var iframe = normalizeYouTubeIframe(video);
                            addYouTubeEvents(iframe);
                        } else {
                            if (tagIsYouTubeAsyncVideo(video)) {
                                video.addEventListener("load", function(evt) {
                                    var iframe = normalizeYouTubeIframe(evt.currentTarget);
                                    addYouTubeEvents(iframe);
                                });
                            }
                        }
                    }
                    var targets = document.querySelectorAll('.elementor-widget-video .elementor-wrapper');
                    const config = {
                        attributes: false,
                        childList: true,
                        subtree: true
                    };
                    const callback = function(mutationsList, observer) {
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'childList') {
                                for (var m = 0; m < mutation.addedNodes.length; m++) {
                                    addDynYouTubeVideos(mutation.addedNodes[m]);
                                }
                            }
                        }
                    };
                    for (var i = 0; i < targets.length; i++) {
                        const observer = new MutationObserver(callback);
                        observer.observe(targets[i], config);
                    }
                };
            },
            initVimeoAPI: function() {
                $(document).ready(function() {
                    var potentialVideos = Utils.getTagsAsArray('iframe').concat(Utils.getTagsAsArray('embed'));
                    for (var i = 0; i < potentialVideos.length; i++) {
                        var tag = potentialVideos[i];
                        if (tagIsVimeoVideo(tag)) {
                            attachVimeoPlayerToTag(tag);
                        } else {
                            if (tagIsAsincVimeoVideo(tag)) {
                                tag.addEventListener("load", function(evt) {
                                    attachVimeoPlayerToTag(evt.currentTarget);
                                });
                            }
                        }
                    }
                });
            },
            manageCookies: function() {
                let expires = parseInt(options.cookie_duration);
                let queryVars = getQueryVars();
                let landing = window.location.href.split('?')[0];
                try {
                    if (Cookies.get('pys_first_visit') === undefined) {
                        Cookies.set('pys_first_visit', true, {
                            expires: expires
                        });
                        Cookies.set('pysTrafficSource', getTrafficSource(), {
                            expires: expires
                        });
                        Cookies.set('pys_landing_page', landing, {
                            expires: expires
                        });
                        $.each(utmTerms, function(index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], {
                                    expires: expires
                                });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        });
                        $.each(utmId, function(index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('pys_' + name, queryVars[name], {
                                    expires: expires
                                });
                            } else {
                                Cookies.remove('pys_' + name)
                            }
                        })
                    }
                    if (isNewSession) {
                        Cookies.set('last_pysTrafficSource', getTrafficSource(), {
                            expires: expires
                        });
                        $.each(utmTerms, function(index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], {
                                    expires: expires
                                });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        });
                        $.each(utmId, function(index, name) {
                            if (queryVars.hasOwnProperty(name)) {
                                Cookies.set('last_pys_' + name, queryVars[name], {
                                    expires: expires
                                });
                            } else {
                                Cookies.remove('last_pys_' + name)
                            }
                        })
                        Cookies.set('last_pys_landing_page', landing, {
                            expires: expires
                        });
                    }
                } catch (e) {
                    console.error(e);
                }
            },
            initializeRequestParams: function() {
                if (options.trackTrafficSource) {
                    requestParams.traffic_source = getTrafficSourceValue();
                }
                if (options.trackUTMs) {
                    var utms = getUTMs(options.visit_data_model === "last_visit");
                    $.each(utmTerms, function(index, term) {
                        if (term in utms) {
                            requestParams[term] = utms[term];
                        }
                    });
                }
                var dateTime = getDateTime();
                if (options.enable_event_time_param) {
                    requestParams.event_time = dateTime[0];
                }
                if (options.enable_event_day_param) {
                    requestParams.event_day = dateTime[1];
                }
                if (options.enable_event_month_param) {
                    requestParams.event_month = dateTime[2];
                }
                if (options.enable_lading_page_param) {
                    requestParams.landing_page = getLandingPageValue();
                }
            },
            getRequestParams: function() {
                return requestParams;
            },
            getLinkExtension: function(link) {
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    link = link.substring(link.lastIndexOf(".") + 1);
                    return link;
                } else {
                    return "";
                }
            },
            getLinkFilename: function(link) {
                link = link.substring(0, (link.indexOf("#") === -1) ? link.length : link.indexOf("#"));
                link = link.substring(0, (link.indexOf("?") === -1) ? link.length : link.indexOf("?"));
                link = link.substring(link.lastIndexOf("/") + 1, link.length);
                if (link.length > 0 && link.indexOf('.') !== -1) {
                    return link;
                } else {
                    return "";
                }
            },
            setupMouseOverClickEvents: function(eventId, triggers) {
                $(document).onFirst('mouseover', triggers.join(','), function() {
                    if ($(this).hasClass('pys-mouse-over-' + eventId)) {
                        return true;
                    } else {
                        $(this).addClass('pys-mouse-over-' + eventId);
                    }
                    Utils.fireTriggerEvent(eventId);
                });
            },
            setupCSSClickEvents: function(eventId, triggers) {
                $(document).onFirst('click', triggers.join(','), function() {
                    Utils.fireTriggerEvent(eventId);
                });
            },
            setupURLClickEvents: function() {
                if (!options.triggerEventTypes.hasOwnProperty('url_click')) {
                    return;
                }
                $('a').onFirst('click', function(evt) {
                    var url = $(this).attr('href');
                    if (url) {
                        $.each(options.triggerEventTypes.url_click, function(eventId, triggers) {
                            triggers.forEach(function(trigger) {
                                if (Utils.compareUrl(url, trigger.value, trigger.rule)) {
                                    Utils.fireTriggerEvent(eventId);
                                }
                            })
                        });
                    }
                });
            },
            removeUrlDomain(url) {
                if (url.indexOf("/#") > -1) {
                    url = url.substring(0, url.indexOf("/#"));
                }
                return url.replace('http://', '').replace('https://', '').replace('www.', '').trim().replace(/^\/+/g, '')
            },
            compareUrl: function(base, url, rule) {
                if (url == "*" || url == '') return true;
                base = Utils.removeUrlDomain(base)
                url = Utils.removeUrlDomain(url)
                if (rule == 'match') {
                    return url == base;
                } else {
                    return base.indexOf(url) > -1
                }
            },
            setupScrollPosEvents: function(eventId, triggers) {
                var scrollPosThresholds = {},
                    docHeight = $(document).height() - $(window).height();
                $.each(triggers, function(index, scrollPos) {
                    scrollPos = docHeight * scrollPos / 100;
                    scrollPos = Math.round(scrollPos);
                    scrollPosThresholds[scrollPos] = eventId;
                });
                $(document).on("scroll", function() {
                    var scrollPos = $(window).scrollTop();
                    $.each(scrollPosThresholds, function(threshold, eventId) {
                        if (scrollPos <= threshold) {
                            return true;
                        }
                        if (eventId === null) {
                            return true;
                        } else {
                            scrollPosThresholds[threshold] = null;
                        }
                        Utils.fireTriggerEvent(eventId);
                    });
                });
            },
            setupCommentEvents: function(eventId, triggers) {
                $('form.comment-form').on("submit", function() {
                    Utils.fireTriggerEvent(eventId);
                });
            },
            isEventInTimeWindow: function(eventName, event, prefix) {
                if (event.hasOwnProperty("hasTimeWindow") && event.hasTimeWindow) {
                    var cookieName = prefix + "_" + eventName;
                    var now = new Date().getTime();
                    if (Cookies.get(cookieName) !== undefined) {
                        var lastTimeFire = Cookies.get(cookieName);
                        var fireTime = event.timeWindow * 60 * 60 * 1000;
                        if (now - lastTimeFire > fireTime) {
                            Cookies.set(cookieName, now, {
                                expires: event.timeWindow / 24.0
                            });
                        } else {
                            return false;
                        }
                    } else {
                        Cookies.set(cookieName, now, {
                            expires: event.timeWindow / 24.0
                        });
                    }
                }
                return true
            },
            fireTriggerEvent: function(eventId) {
                if (!options.triggerEvents.hasOwnProperty(eventId)) {
                    return;
                }
                var event = {};
                var events = options.triggerEvents[eventId];
                if (events.hasOwnProperty('facebook')) {
                    event = events.facebook;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_facebook_" + eventId)) {
                        Facebook.fireEvent(event.name, event);
                    }
                }
                if (events.hasOwnProperty('ga')) {
                    event = events.ga;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_ga_" + eventId)) {
                        Analytics.fireEvent(event.name, event);
                    }
                }
                if (events.hasOwnProperty('google_ads')) {
                    event = events.google_ads;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_google_ads_" + eventId)) {
                        GAds.fireEvent(event.name, event);
                    }
                }
                if (events.hasOwnProperty('pinterest')) {
                    event = events.pinterest;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_pinterest_" + eventId)) {
                        Pinterest.fireEvent(event.name, event);;
                    }
                }
                if (events.hasOwnProperty('bing')) {
                    event = events.bing;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_bing_" + eventId)) {
                        Bing.fireEvent(event.name, event);;
                    }
                }
                if (events.hasOwnProperty('tiktok')) {
                    event = events.tiktok;
                    if (Utils.isEventInTimeWindow(event.name, event, "dyn_bing_" + eventId)) {
                        TikTok.fireEvent(event.name, event);
                    }
                }
            },
            isFirstPurchaseFire: function($eventName, orderId, pixel) {
                if (Cookies.get("pys_" + $eventName + "_order_id_" + pixel) == orderId) {
                    return false;
                } else {
                    Cookies.set("pys_" + $eventName + "_order_id_" + pixel, orderId, {
                        expires: 1
                    });
                }
                return true;
            },
            fireStaticEvents: function(pixel) {
                if (options.staticEvents.hasOwnProperty(pixel)) {
                    $.each(options.staticEvents[pixel], function(eventId, events) {
                        if (options.woo.hasOwnProperty('woo_purchase_on_transaction') && options.woo.woo_purchase_on_transaction && (eventId === "woo_purchase" || eventId === "woo_purchase_category")) {
                            if (!Utils.isFirstPurchaseFire(eventId, events[0].woo_order, pixel)) {
                                return;
                            }
                        }
                        if (options.edd.hasOwnProperty('edd_purchase_on_transaction') && options.edd.edd_purchase_on_transaction && (eventId === "edd_purchase" || eventId === "edd_purchase_category")) {
                            if (!Utils.isFirstPurchaseFire(eventId, events[0].edd_order, pixel)) {
                                return;
                            }
                        }
                        $.each(events, function(index, event) {
                            event.fired = event.fired || false;
                            if (!event.fired && Utils.isEventInTimeWindow(event.name, event, 'static_' + pixel + "_")) {
                                var fired = false;
                                getPixelBySlag(pixel).fireEvent(event.name, event);
                                event.fired = fired;
                            }
                        });
                    });
                }
            },
            loadGoogleTag: function(id) {
                if (!gtag_loaded) {
                    (function(window, document, src) {
                        var a = document.createElement('script'),
                            m = document.getElementsByTagName('script')[0];
                        a.async = 1;
                        a.src = src;
                        m.parentNode.insertBefore(a, m);
                    })(window, document, '//www.googletagmanager.com/gtag/js?id=' + id);
                    window.dataLayer = window.dataLayer || [];
                    window.gtag = window.gtag || function gtag() {
                        dataLayer.push(arguments);
                    };
                    gtag('js', new Date());
                    gtag_loaded = true;
                }
            },
            loadPixels: function() {
                if (options.gdpr.ajax_enabled && !options.gdpr.consent_magic_integration_enabled) {
                    $.get({
                        url: options.ajaxUrl,
                        dataType: 'json',
                        data: {
                            action: 'pys_get_gdpr_filters_values'
                        },
                        success: function(res) {
                            if (res.success) {
                                options.gdpr.all_disabled_by_api = res.data.all_disabled_by_api;
                                options.gdpr.facebook_disabled_by_api = res.data.facebook_disabled_by_api;
                                options.gdpr.tiktok_disabled_by_api = res.data.tiktok_disabled_by_api;
                                options.gdpr.analytics_disabled_by_api = res.data.analytics_disabled_by_api;
                                options.gdpr.google_ads_disabled_by_api = res.data.google_ads_disabled_by_api;
                                options.gdpr.pinterest_disabled_by_api = res.data.pinterest_disabled_by_api;
                                options.gdpr.bing_disabled_by_api = res.data.bing_disabled_by_api;
                            }
                            loadPixels();
                        }
                    });
                } else {
                    loadPixels();
                }
            },
            consentGiven: function(pixel) {
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {
                    var cookiebot_consent_category = options.gdpr['cookiebot_' + pixel + '_consent_category'];
                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (Cookiebot.consented === false || Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    } else {
                        if (Cookiebot.consent[cookiebot_consent_category]) {
                            return true;
                        }
                    }
                    return false;
                }
                if (options.gdpr.cookie_notice_integration_enabled && typeof cnArgs !== 'undefined') {
                    var cn_cookie = Cookies.get(cnArgs.cookieName);
                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cn_cookie === 'undefined' || cn_cookie === 'true') {
                            return true;
                        }
                    } else {
                        if (cn_cookie === 'true') {
                            return true;
                        }
                    }
                    return false;
                }
                if (options.gdpr.cookie_law_info_integration_enabled) {
                    var cli_cookie = Cookies.get('viewed_cookie_policy');
                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cli_cookie === 'undefined' || cli_cookie === 'yes') {
                            return true;
                        }
                    } else {
                        if (cli_cookie === 'yes') {
                            return true;
                        }
                    }
                    return false;
                }
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    var cs_cookie = Cookies.get('cs_viewed_cookie_policy' + test_prefix);
                    if (options.gdpr[pixel + '_prior_consent_enabled']) {
                        if (typeof cs_cookie === 'undefined' || cs_cookie === 'yes') {
                            return true;
                        }
                    } else {
                        if (typeof cs_cookie === 'undefined' || cs_cookie === 'yes') {
                            return true;
                        }
                    }
                    return false;
                }
                if (options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        switch (pixel) {
                            case "analytics":
                                return consentApi.consentSync("http", "_ga", "*").cookieOptIn;
                            case "facebook":
                                return consentApi.consentSync("http", "_fbp", "*").cookieOptIn;
                            case "pinterest":
                                return consentApi.consentSync("http", "_pinterest_sess", ".pinterest.com").cookieOptIn;
                            case "bing":
                                return consentApi.consentSync("http", "_uetsid", "*").cookieOptIn;
                            case "google_ads":
                                return consentApi.consentSync("http", "1P_JAR", ".google.com").cookieOptIn;
                            case 'tiktok':
                                return consentApi.consentSync("http", "tt_webid_v2", ".tiktok.com").cookieOptIn;
                            default:
                                return true;
                        }
                    }
                }
                return true;
            },
            setupGdprCallbacks: function() {
                if (options.gdpr.cookiebot_integration_enabled && typeof Cookiebot !== 'undefined') {
                    window.addEventListener("CookiebotOnConsentReady", function() {
                        if (Cookiebot.consent.marketing) {
                            Facebook.loadPixel();
                            Bing.loadPixel();
                            Pinterest.loadPixel();
                            GAds.loadPixel();
                            TikTok.loadPixel();
                        }
                        if (Cookiebot.consent.statistics) {
                            Analytics.loadPixel();
                        }
                        if (!Cookiebot.consent.marketing) {
                            Facebook.disable();
                            Pinterest.disable();
                            Bing.disable()
                            GAds.disable();
                            TikTok.disable();
                        }
                        if (!Cookiebot.consent.statistics) {
                            Analytics.disable();
                        }
                    });
                }
                if (options.gdpr.cookie_notice_integration_enabled) {
                    $(document).onFirst('click', '.cn-set-cookie', function() {
                        if ($(this).data('cookie-set') === 'accept') {
                            Facebook.loadPixel();
                            Analytics.loadPixel();
                            GAds.loadPixel();
                            Pinterest.loadPixel();
                            Bing.loadPixel();
                            TikTok.loadPixel();
                        } else {
                            Facebook.disable();
                            Analytics.disable();
                            GAds.disable();
                            Pinterest.disable();
                            Bing.disable();
                            TikTok.disable();
                        }
                    });
                    $(document).onFirst('click', '.cn-revoke-cookie', function() {
                        Facebook.disable();
                        Analytics.disable();
                        GAds.disable();
                        Pinterest.disable();
                        Bing.disable();
                        TikTok.disable();
                    });
                }
                if (options.gdpr.cookie_law_info_integration_enabled) {
                    $(document).onFirst('click', '#cookie_action_close_header', function() {
                        Facebook.loadPixel();
                        Analytics.loadPixel();
                        GAds.loadPixel();
                        Pinterest.loadPixel();
                        Bing.loadPixel();
                        TikTok.loadPixel();
                    });
                    $(document).onFirst('click', '#cookie_action_close_header_reject', function() {
                        Facebook.disable();
                        Analytics.disable();
                        GAds.disable();
                        Pinterest.disable();
                        Bing.disable();
                        TikTok.disable();
                    });
                }
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    var test_prefix = CS_Data.test_prefix,
                        cs_refresh_after_consent = false,
                        substring = "cs_enabled_cookie_term";
                    if (CS_Data.cs_refresh_after_consent == 1) {
                        cs_refresh_after_consent = CS_Data.cs_refresh_after_consent;
                    }
                    if (!cs_refresh_after_consent) {
                        var theCookies = document.cookie.split(';');
                        for (var i = 1; i <= theCookies.length; i++) {
                            if (theCookies[i - 1].indexOf(substring) !== -1) {
                                var categoryCookie = theCookies[i - 1].replace('cs_enabled_cookie_term' + test_prefix + '_', '');
                                categoryCookie = Number(categoryCookie.replace(/\D+/g, ""));
                                var cs_cookie_val = Cookies.get('cs_enabled_cookie_term' + test_prefix + '_' + categoryCookie);
                                if (cs_cookie_val == 'yes') {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.analytics) {
                                        Analytics.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.gads) {
                                        GAds.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.loadPixel();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.tiktok) {
                                        TikTok.loadPixel();
                                    }
                                } else {
                                    if (categoryCookie === CS_Data.cs_script_cat.facebook) {
                                        Facebook.disable();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.bing) {
                                        Bing.disable();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.analytics) {
                                        Analytics.disable();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.gads) {
                                        GAds.disable();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.pinterest) {
                                        Pinterest.disable();
                                    }
                                    if (categoryCookie === CS_Data.cs_script_cat.tiktok) {
                                        TikTok.disable();
                                    }
                                }
                                if (Cookies.get('cs_enabled_advanced_matching') == 'yes') {
                                    Facebook.loadPixel();
                                }
                            }
                        }
                        $(document).on('click', '.cs_action_btn', function(e) {
                            e.preventDefault();
                            var elm = $(this),
                                button_action = elm.attr('data-cs_action');
                            if (button_action === 'allow_all') {
                                Facebook.loadPixel();
                                Bing.loadPixel();
                                Analytics.loadPixel();
                                GAds.loadPixel();
                                Pinterest.loadPixel();
                                TikTok.loadPixel();
                            } else if (button_action === 'disable_all') {
                                Facebook.disable();
                                Bing.disable();
                                Analytics.disable();
                                GAds.disable();
                                Pinterest.disable();
                                TikTok.disable();
                            }
                        });
                    }
                }
                if (options.gdpr.real_cookie_banner_integration_enabled) {
                    var consentApi = window.consentApi;
                    if (consentApi) {
                        consentApi.consent("http", "_ga", "*").then(Analytics.loadPixel.bind(Analytics), Analytics.disable.bind(Analytics));
                        consentApi.consent("http", "_fbp", "*").then(Facebook.loadPixel.bind(Facebook), Facebook.disable.bind(Facebook));
                        consentApi.consent("http", "_pinterest_sess", ".pinterest.com").then(Pinterest.loadPixel.bind(Pinterest), Pinterest.disable.bind(Pinterest));
                        consentApi.consent("http", "_uetsid", "*").then(Bing.loadPixel.bind(Bing), Bing.disable.bind(Bing));
                        consentApi.consent("http", "1P_JAR", ".google.com").then(GAds.loadPixel.bind(GAds), GAds.disable.bind(GAds));
                        consentApi.consent("http", "tt_webid_v2", ".tiktok.com").then(TikTok.loadPixel.bind(GAds), TikTok.disable.bind(GAds));
                    }
                }
            },
            isCheckoutPage: function() {
                return $('body').hasClass('woocommerce-checkout') || $('body').hasClass('edd-checkout');
            },
            addCheckoutFields: function() {
                var utm = "";
                var utms = getUTMs()
                $.each(utmTerms, function(index, name) {
                    if (index > 0) {
                        utm += "|";
                    }
                    utm += name + ":" + utms[name];
                });
                var utmIdList = "";
                var utmsIds = getUTMId()
                $.each(utmId, function(index, name) {
                    if (index > 0) {
                        utmIdList += "|";
                    }
                    utmIdList += name + ":" + utmsIds[name];
                });
                var utmIdListLast = "";
                var utmsIdsLast = getUTMId(true)
                $.each(utmId, function(index, name) {
                    if (index > 0) {
                        utmIdListLast += "|";
                    }
                    utmIdListLast += name + ":" + utmsIdsLast[name];
                });
                var utmLast = "";
                var utmsLast = getUTMs(true)
                $.each(utmTerms, function(index, name) {
                    if (index > 0) {
                        utmLast += "|";
                    }
                    utmLast += name + ":" + utmsLast[name];
                });
                var dateTime = getDateTime();
                var landing = Cookies.get('pys_landing_page');
                var lastLanding = Cookies.get('last_pys_landing_page');
                var trafic = Cookies.get('pysTrafficSource');
                var lastTrafic = Cookies.get('last_pysTrafficSource');
                var $form = null;
                if ($('body').hasClass('woocommerce-checkout')) {
                    $form = $("form.woocommerce-checkout");
                } else {
                    $form = $("#edd_purchase_form");
                }
                var inputs = {
                    'pys_utm': utm,
                    'pys_utm_id': utmIdList,
                    'pys_browser_time': dateTime.join("|"),
                    'pys_landing': landing,
                    'pys_source': trafic,
                    'pys_order_type': $(".wcf-optin-form").length > 0 ? "wcf-optin" : "normal",
                    'last_pys_landing': lastLanding,
                    'last_pys_source': lastTrafic,
                    'last_pys_utm': utmLast,
                    'last_pys_utm_id': utmIdListLast,
                }
                Object.keys(inputs).forEach(function(key, index) {
                    $form.append("<input type='hidden' name='" + key + "' value='" + inputs[key] + "' /> ");
                });
            },
            saveAdvancedFormData: function(email, phone, firstName, lastName) {
                let data = Utils.getAdvancedFormData();
                if (email != null) {
                    data["email"] = email;
                }
                if (phone != null) {
                    data["phone"] = phone;
                }
                if (firstName != null) {
                    data["first_name"] = firstName;
                }
                if (lastName != null) {
                    data["last_name"] = lastName;
                }
                console.log("save", data)
                Cookies.set('pys_advanced_form_data', JSON.stringify(data), {
                    expires: 300
                });
            },
            getAdvancedFormData: function() {
                let dataStr = Cookies.get("pys_advanced_form_data");
                if (dataStr === undefined) {
                    return {
                        'first_name': "",
                        'last_name': "",
                        'email': "",
                        'phone': ""
                    };
                } else {
                    return JSON.parse(dataStr);
                }
            }
        };
    }(options);
    var TikTok = function(options) {
        var initialized = false;

        function fireEvent(name, event) {
            if (typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name, 'tiktok')) {
                return;
            }
            var params = Utils.copyProperties(event.params, {});
            event.pixelIds.forEach(function(pixelId) {
                if (options.debug) {
                    console.log('[TikTok] ' + name, params, "pixel_id", pixelId);
                }
                if (options.tiktok.hasOwnProperty('advanced_matching') && Object.keys(options.tiktok.advanced_matching).length > 0) {
                    ttq.instance(pixelId).identify(options.tiktok.advanced_matching)
                }
                ttq.instance(pixelId).track(name, params)
            });
        }
        return {
            tag: function() {
                return "tiktok";
            },
            isEnabled: function() {
                return options.hasOwnProperty('tiktok');
            },
            disable: function() {
                initialized = false;
            },
            loadPixel: function() {
                if (initialized || !this.isEnabled() || !Utils.consentGiven('tiktok')) {
                    return;
                }! function(w, d, t) {
                    w.TiktokAnalyticsObject = t;
                    var ttq = w[t] = w[t] || [];
                    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
                    ttq.setAndDefer = function(t, e) {
                        t[e] = function() {
                            t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
                        }
                    };
                    for (var i = 0; i < ttq.methods.length; i++)
                        ttq.setAndDefer(ttq, ttq.methods[i]);
                    ttq.instance = function(t) {
                        for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                        return e
                    };
                    ttq.load = function(e, n) {
                        var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                        ttq._i = ttq._i || {}, ttq._i[e] = [], ttq._i[e]._u = i, ttq._t = ttq._t || {}, ttq._t[e] = +new Date, ttq._o = ttq._o || {}, ttq._o[e] = n || {};
                        var o = document.createElement("script");
                        o.type = "text/javascript", o.async = !0, o.src = i + "?sdkid=" + e + "&lib=" + t;
                        var a = document.getElementsByTagName("script")[0];
                        a.parentNode.insertBefore(o, a)
                    };
                }(window, document, 'ttq');
                options.tiktok.pixelIds.forEach(function(pixelId) {
                    ttq.load(pixelId);
                    ttq.page();
                });
                initialized = true;
                Utils.fireStaticEvents('tiktok');
            },
            fireEvent: function(name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;
                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function(name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);
                }
                return true;
            },
            onClickEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {
                window.pysWooProductData = window.pysWooProductData || [];
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty(this.tag())) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()]['params'], event.params);
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {
                            if (product_type === Utils.PRODUCT_BUNDLE) {
                                var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                                var items_sum = getBundlePriceOnSingleProduct(data);
                                event.params.value = (parseFloat(data.base_price) + items_sum) * qty;
                            } else {
                                event.params.value = event.params.value * qty;
                            }
                        }
                        event.params.quantity = qty;
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onWooAddToCartOnButtonEvent: function(product_id) {
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty(this.tag())) {
                        var productData = window.pysWooProductData[product_id][this.tag()]
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])
                        Utils.copyProperties(productData['params'], event.params)
                        event.pixelIds = productData['pixelIds'];
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {
                if (!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);
                if (window.pysEddProductData.hasOwnProperty(download_id)) {
                    var index;
                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }
                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty(this.tag())) {
                            Utils.copyProperties(window.pysEddProductData[download_id][index][this.tag()].params, event.params);
                            this.fireEvent(event.name, event);
                        }
                    }
                }
            }
        }
    }(options);
    var Facebook = function(options) {
        var defaultEventTypes = ['PageView', 'ViewContent', 'Search', 'AddToCart', 'AddToWishlist', 'InitiateCheckout', 'AddPaymentInfo', 'Purchase', 'Lead', 'Subscribe', 'CustomizeProduct', 'FindLocation', 'StartTrial', 'SubmitApplication', 'Schedule', 'Contact', 'Donate'];
        var notCachedEventsIds = new Array();
        var isAddToCartFromJs = options.woo.hasOwnProperty("addToCartCatchMethod") && options.woo.addToCartCatchMethod === "add_cart_js";
        if (!isAddToCartFromJs) {
            notCachedEventsIds.push('woo_add_to_cart_on_button_click')
        }
        var initialized = false;
        var configuredPixels = new Array();

        function fireEvent(name, event) {
            if (typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name, 'facebook')) {
                return;
            }
            var data = event.params;
            var ids = event.pixelIds;
            var actionType = defaultEventTypes.includes(name) ? 'trackSingle' : 'trackSingleCustom';
            var params = {};
            Utils.copyProperties(data, params);
            Utils.copyProperties(Utils.getRequestParams(), params);
            if (options.facebook.serverApiEnabled) {
                if (event.e_id === "woo_remove_from_cart") {
                    Facebook.updateEventId(event.name);
                    event.eventID = Facebook.getEventId(event.name);
                } else if (isAddToCartFromJs && event.e_id === "woo_add_to_cart_on_button_click") {
                    Facebook.updateEventId(event.name);
                    event.eventID = Facebook.getEventId(event.name);
                } else if (!notCachedEventsIds.includes(event.e_id)) {
                    var isApiDisabled = options.gdpr.all_disabled_by_api || options.gdpr.facebook_disabled_by_api || options.gdpr.tiktok_disabled_by_api || options.gdpr.cookiebot_integration_enabled || options.gdpr.cookie_notice_integration_enabled || options.gdpr.consent_magic_integration_enabled || options.gdpr.cookie_law_info_integration_enabled;
                    if (options.facebook.ajaxForServerEvent || event.type !== "static") {
                        event.eventID = pys_generate_token(36);
                    }
                    if (options.facebook.ajaxForServerEvent || isApiDisabled || event.delay > 0 || event.type !== "static") {
                        var json = {
                            action: 'pys_api_event',
                            pixel: 'facebook',
                            event: name,
                            ids: ids,
                            data: params,
                            url: window.location.href,
                            eventID: event.eventID,
                        };
                        if (event.hasOwnProperty('woo_order')) {
                            json['woo_order'] = event.woo_order;
                        }
                        if (event.hasOwnProperty('edd_order')) {
                            json['edd_order'] = event.edd_order;
                        }
                        if (event.e_id === "automatic_event_internal_link" || event.e_id === "automatic_event_outbound_link") {
                            setTimeout(function() {
                                jQuery.ajax({
                                    type: 'POST',
                                    url: options.ajaxUrl,
                                    data: json,
                                    headers: {
                                        'Cache-Control': 'no-cache'
                                    },
                                    success: function() {},
                                });
                            }, 500)
                        } else {
                            jQuery.ajax({
                                type: 'POST',
                                url: options.ajaxUrl,
                                data: json,
                                headers: {
                                    'Cache-Control': 'no-cache'
                                },
                                success: function() {},
                            });
                        }
                    }
                    if (event.e_id !== "automatic_event_signup" && name == "CompleteRegistration" && options.facebook.wooCRSendFromServer) {
                        return;
                    }
                }
            }
            if (options.debug) {
                console.log('[Facebook] ' + name, params, "pixel_ids", ids, "eventID", event.eventID);
            }
            ids.forEach(function(pixelId) {
                var args = {};
                if (options.facebook.serverApiEnabled && event.hasOwnProperty('eventID')) {
                    args.eventID = pixelId + event.eventID;
                }
                Facebook.maybeInitPixel(pixelId);
                fbq(actionType, pixelId, name, params, args);
            });
        }
        return {
            tag: function() {
                return "facebook";
            },
            isEnabled: function() {
                return options.hasOwnProperty('facebook');
            },
            initEventIdCookies: function(key) {
                var ids = {};
                ids[key] = pys_generate_token(36)
                Cookies.set('pys_fb_event_id', JSON.stringify(ids));
            },
            updateEventId: function(key) {
                var cooData = Cookies.get("pys_fb_event_id")
                if (cooData === undefined) {
                    this.initEventIdCookies(key);
                } else {
                    var data = JSON.parse(cooData);
                    data[key] = pys_generate_token(36);
                    Cookies.set('pys_fb_event_id', JSON.stringify(data));
                }
            },
            getEventId: function(key) {
                var data = Cookies.get("pys_fb_event_id");
                if (data === undefined) {
                    this.initEventIdCookies(key);
                    data = Cookies.get("pys_fb_event_id");
                }
                return JSON.parse(data)[key];
            },
            disable: function() {
                initialized = false;
            },
            loadPixel: function() {
                if (initialized || !this.isEnabled() || !Utils.consentGiven('facebook')) {
                    return;
                }! function(f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = '2.0';
                    n.agent = 'dvpixelyoursite';
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
                options.facebook.pixelIds.forEach(function(pixelId) {
                    Facebook.maybeInitPixel(pixelId);
                });
                initialized = true;
                Utils.fireStaticEvents('facebook');
            },
            advancedMatching: function() {
                if (options.facebook.advancedMatchingEnabled) {
                    let advancedMatchingForm = Utils.getAdvancedFormData();
                    let advancedMatching = {};
                    if (Object.keys(options.facebook.advancedMatching).length > 0) {
                        advancedMatching = options.facebook.advancedMatching;
                    }
                    if (!advancedMatching.hasOwnProperty("em") && advancedMatchingForm.hasOwnProperty("email") && advancedMatchingForm["email"].length > 0) {
                        advancedMatching["em"] = advancedMatchingForm["email"];
                    }
                    if (!advancedMatching.hasOwnProperty("ph") && advancedMatchingForm.hasOwnProperty("phone") && advancedMatchingForm["phone"].length > 0) {
                        advancedMatching["ph"] = advancedMatchingForm["phone"];
                    }
                    if (!advancedMatching.hasOwnProperty("fn") && advancedMatchingForm.hasOwnProperty("first_name") && advancedMatchingForm["first_name"].length > 0) {
                        advancedMatching["fn"] = advancedMatchingForm["first_name"];
                    }
                    if (!advancedMatching.hasOwnProperty("ln") && advancedMatchingForm.hasOwnProperty("last_name") && advancedMatchingForm["last_name"].length > 0) {
                        advancedMatching["ln"] = advancedMatchingForm["last_name"];
                    }
                    if (Object.keys(advancedMatching).length > 0) {
                        return advancedMatching;
                    }
                }
                return false
            },
            maybeInitPixel: function(pixelId) {
                if (configuredPixels.includes(pixelId)) return;
                if (options.facebook.removeMetadata) {
                    fbq('set', 'autoConfig', false, pixelId);
                }
                let advancedMatching = Facebook.advancedMatching();
                if (options.gdpr.consent_magic_integration_enabled && typeof CS_Data !== "undefined") {
                    if (!advancedMatching) {
                        fbq('init', pixelId);
                    } else {
                        var cs_advanced_matching = Cookies.get('cs_enabled_advanced_matching' + test_prefix);
                        if (jQuery('#cs_enabled_advanced_matching' + test_prefix).length > 0) {
                            if (cs_advanced_matching == 'yes') {
                                fbq('init', pixelId, advancedMatching);
                            } else {
                                fbq('init', pixelId);
                            }
                        } else {
                            fbq('init', pixelId, advancedMatching);
                        }
                    }
                } else {
                    if (!advancedMatching) {
                        fbq('init', pixelId);
                    } else {
                        fbq('init', pixelId, advancedMatching);
                    }
                }
                configuredPixels.push(pixelId);
            },
            fireEvent: function(name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;
                data.params = data.params || {};
                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function(name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);
                }
                return true;
            },
            onAdSenseEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onClickEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWatchVideo: function(event) {
                this.fireEvent(event.name, event);
            },
            onCommentEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onFormEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onDownloadEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAddToCartOnButtonEvent: function(product_id) {
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])
                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook']['params'], event.params)
                        event.pixelIds = window.pysWooProductData[product_id]['facebook']['pixelIds'];
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {
                window.pysWooProductData = window.pysWooProductData || [];
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (product_type === Utils.PRODUCT_VARIABLE && !options.facebook.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click.facebook);
                        Utils.copyProperties(window.pysWooProductData[product_id]['facebook']['params'], event.params);
                        var groupValue = 0;
                        if (product_type === Utils.PRODUCT_GROUPED) {
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index) {
                                var childId = $(this).attr('name').replaceAll("quantity[", "").replaceAll("]", "");
                                var quantity = parseInt($(this).val());
                                if (isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['facebook'].grouped[childId];
                                if (quantity == 0) {
                                    event.params.content_ids.forEach(function(el, index, array) {
                                        if (el == childItem.content_id) {
                                            array.splice(index, 1);
                                        }
                                    });
                                }
                                if (event.params.hasOwnProperty('contents')) {
                                    event.params.contents.forEach(function(el, index, array) {
                                        if (el.id == childItem.content_id) {
                                            if (quantity > 0) {
                                                el.quantity = quantity;
                                            } else {
                                                array.splice(index, 1);
                                            }
                                        }
                                    });
                                }
                                groupValue += childItem.price * quantity;
                            });
                            if (groupValue == 0) return;
                        }
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {
                            if (product_type === Utils.PRODUCT_GROUPED) {
                                event.params.value = groupValue;
                            } else if (product_type === Utils.PRODUCT_BUNDLE) {
                                var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                                var items_sum = getBundlePriceOnSingleProduct(data);
                                event.params.value = (parseFloat(data.base_price) + items_sum) * qty;
                            } else {
                                event.params.value = event.params.value * qty;
                            }
                        }
                        if (event.params.hasOwnProperty('contents') && product_type !== Utils.PRODUCT_GROUPED) {
                            event.params.contents[0].quantity = qty;
                        }
                        var event_name = is_external ? options.woo.affiliateEventName : event.name;
                        this.fireEvent(event_name, event);
                    }
                }
            },
            onWooRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAffiliateEvent: function(product_id) {
                if (!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_affiliate[this.tag()]);
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('facebook')) {
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()].params, event.params)
                        this.fireEvent(options.woo.affiliateEventName, event);
                    }
                }
            },
            onWooPayPalEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {
                if (!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);
                if (window.pysEddProductData.hasOwnProperty(download_id)) {
                    var index;
                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }
                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('facebook')) {
                            Utils.copyProperties(window.pysEddProductData[download_id][index]['facebook']["params"], event.params)
                            if (options.edd.addToCartOnButtonValueEnabled && options.edd.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = event.params.value * qty;
                            }
                            var contents = event.params.contents;
                            contents[0].quantity = qty;
                            event.params.contents = JSON.stringify(contents);
                            this.fireEvent(event.name, event);
                        }
                    }
                }
            },
            onEddRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function(event) {
                this.fireEvent(event.name, event);
            },
            onTime: function(event) {
                this.fireEvent(event.name, event);
            },
        };
    }(options);
    var Analytics = function(options) {
        var initialized = false;

        function fireEvent(name, data) {
            if (typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name, 'ga')) {
                return;
            }
            var eventParams = Utils.copyProperties(data.params, {});
            Utils.copyProperties(Utils.getRequestParams(), eventParams);
            var _fireEvent = function(tracking_id, name, params) {
                params['send_to'] = tracking_id;
                if (options.debug) {
                    console.log('[Google Analytics #' + tracking_id + '] ' + name, params);
                }
                gtag('event', name, params);
            };
            data.trackingIds.forEach(function(tracking_id) {
                var copyParams = Utils.copyProperties(eventParams, {});
                var params = mapParamsTov4(tracking_id, name, copyParams)
                _fireEvent(tracking_id, name, params);
            });
        }

        function normalizeEventName(eventName) {
            var matches = {
                ViewContent: 'view_item',
                AddToCart: 'add_to_cart',
                AddToWishList: 'add_to_wishlist',
                InitiateCheckout: 'begin_checkout',
                Purchase: 'purchase',
                Lead: 'generate_lead',
                CompleteRegistration: 'sign_up',
                AddPaymentInfo: 'set_checkout_option'
            };
            return matches.hasOwnProperty(eventName) ? matches[eventName] : eventName;
        }

        function mapParamsTov4(tag, name, param) {
            delete param.page_title;
            delete param.event_url;
            delete param.landing_page;
            if (isv4(tag)) {
                delete param.traffic_source;
                delete param.event_category;
                delete param.event_label;
                delete param.ecomm_prodid;
                delete param.ecomm_pagetype;
                delete param.ecomm_totalvalue;
                if (name === 'search') {
                    param['search'] = param.search_term;
                    delete param.search_term;
                    delete param.non_interaction;
                    delete param.dynx_itemid;
                    delete param.dynx_pagetype;
                    delete param.dynx_totalvalue;
                }
            } else {
                switch (name) {
                    case 'OutboundClick':
                    case 'InternalClick':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                non_interaction: param.non_interaction,
                            }
                            if (param.hasOwnProperty("target_url")) {
                                params['event_label'] = param.target_url
                            }
                            if (options.trackTrafficSource) {
                                params['traffic_source'] = param.traffic_source
                            }
                            return params;
                        }
                    case 'AdSense':
                    case 'Comment':
                    case 'login':
                    case 'sign_up':
                    case 'EmailClick':
                    case 'TelClick':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                non_interaction: param.non_interaction,
                            }
                            return params;
                        }
                    case 'Form':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                non_interaction: param.non_interaction,
                            }
                            var formClass = (typeof param.form_class != 'undefined') ? 'class: ' + param.form_class : '';
                            if (formClass != "") {
                                params["event_label"] = formClass;
                            }
                            return params;
                        }
                    case 'Download':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                event_label: param.download_name,
                                non_interaction: param.non_interaction,
                            }
                            return params;
                        }
                    case 'TimeOnPage':
                    case 'PageScroll':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                event_label: document.title,
                                non_interaction: param.non_interaction,
                            }
                            return params;
                        }
                    case 'search':
                        {
                            let params = {
                                event_category: "Key Actions",
                                event_action: name,
                                event_label: param.search_term,
                                non_interaction: param.non_interaction,
                            }
                            return params;
                        }
                }
                delete param.post_type;
                delete param.post_id;
                delete param.plugin;
                delete param.user_role;
                delete param.cartlows;
                delete param.cartflows_flow;
                delete param.cartflows_step;
            }
            return param;
        }

        function isv4(tag) {
            return tag.indexOf('G') === 0;
        }
        return {
            tag: function() {
                return "ga";
            },
            isEnabled: function() {
                return options.hasOwnProperty('ga');
            },
            disable: function() {
                initialized = false;
            },
            loadPixel: function() {
                if (initialized || !this.isEnabled() || !Utils.consentGiven('analytics')) {
                    return;
                }
                Utils.loadGoogleTag(options.ga.trackingIds[0]);
                var cd = {
                    'dimension1': 'event_hour',
                    'dimension2': 'event_day',
                    'dimension3': 'event_month'
                };
                if (options.ga.retargetingLogic === 'ecomm') {
                    cd.dimension4 = 'ecomm_prodid';
                    cd.dimension5 = 'ecomm_pagetype';
                    cd.dimension6 = 'ecomm_totalvalue';
                } else {
                    cd.dimension4 = 'dynx_itemid';
                    cd.dimension5 = 'dynx_pagetype';
                    cd.dimension6 = 'dynx_totalvalue';
                }
                var config = {
                    'link_attribution': options.ga.enhanceLinkAttr,
                    'anonymize_ip': options.ga.anonimizeIP,
                    'custom_map': cd
                };
                if (options.user_id && options.user_id != 0) {
                    config.user_id = options.user_id;
                }
                if (options.ga.crossDomainEnabled) {
                    config.linker = {
                        accept_incoming: options.ga.crossDomainAcceptIncoming,
                        domains: options.ga.crossDomainDomains
                    };
                }
                options.ga.trackingIds.forEach(function(trackingId, index) {
                    if (options.ga.isDebugEnabled.includes("index_" + index)) {
                        config.debug_mode = true;
                    } else {
                        config.debug_mode = false;
                    }
                    if (isv4(trackingId)) {
                        if (options.ga.disableAdvertisingFeatures) {
                            config.allow_google_signals = false
                        }
                        if (options.ga.disableAdvertisingPersonalization) {
                            config.allow_ad_personalization_signals = false
                        }
                    }
                    gtag('config', trackingId, config);
                });
                initialized = true;
                Utils.fireStaticEvents('ga');
                $(document).trigger("analytics_initialized")
            },
            fireEvent: function(name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;
                data.params = data.params || {};
                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function(name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data);
                }
                return true;
            },
            onAdSenseEvent: function() {},
            onClickEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWatchVideo: function(event) {
                if (!event.hasOwnProperty("youtube_disabled") || !event.youtube_disabled || event.params.video_type !== "youtube") {
                    this.fireEvent(event.name, event);
                }
            },
            onCommentEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onFormEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onDownloadEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAddToCartOnButtonEvent: function(product_id) {
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params)
                        event.trackingIds = window.pysWooProductData[product_id]['ga']['trackingIds'];
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {
                window.pysWooProductData = window.pysWooProductData || [];
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                if (product_type === Utils.PRODUCT_VARIABLE && !options.ga.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {
                        Utils.copyProperties(window.pysWooProductData[product_id]['ga'].params, event.params);
                        if (product_type === Utils.PRODUCT_GROUPED) {
                            var groupValue = 0;
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index) {
                                var childId = $(this).attr('name').replaceAll("quantity[", "").replaceAll("]", "");
                                var quantity = parseInt($(this).val());
                                if (isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['ga'].grouped[childId];
                                event.params.items.forEach(function(el, index, array) {
                                    if (el.id == childItem.content_id) {
                                        if (quantity > 0) {
                                            el.quantity = quantity;
                                            el.price = childItem.price;
                                        } else {
                                            array.splice(index, 1);
                                        }
                                    }
                                });
                                groupValue += childItem.price * quantity;
                            });
                            if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global' && event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = groupValue;
                            }
                            if (groupValue == 0) return;
                        } else {
                            event.params.items[0].quantity = qty;
                        }
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global' && product_type !== Utils.PRODUCT_GROUPED) {
                            if (event.params.hasOwnProperty('ecomm_totalvalue')) {
                                event.params.ecomm_totalvalue = event.params.items[0].price * qty;
                            }
                        }
                        var eventName = is_external ? options.woo.affiliateEventName : event.name;
                        eventName = normalizeEventName(eventName);
                        this.fireEvent(eventName, event);
                    }
                }
            },
            onWooCheckoutProgressStep: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooSelectContent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAffiliateEvent: function(product_id) {
                if (!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.woo_affiliate[this.tag()];
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('ga')) {
                        event = Utils.clone(event);
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()], event.params)
                        this.fireEvent(normalizeEventName(options.woo.affiliateEventName), event);
                    }
                }
            },
            onWooPayPalEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {
                if (!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()]);
                if (window.pysEddProductData.hasOwnProperty(download_id)) {
                    var index;
                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }
                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('ga')) {
                            Utils.copyProperties(window.pysEddProductData[download_id][index]['ga'].params, event.params);
                            event.params.items[0].quantity = qty;
                            this.fireEvent(event.name, event);
                        }
                    }
                }
            },
            onEddRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function(event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
            onTime: function(event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
        };
    }(options);
    var GAds = function(options) {
        var initialized = false;

        function fireEvent(name, data) {
            if (typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(event_name, 'google_ads')) {
                return;
            }
            var _params = Utils.copyProperties(data.params, {});
            var ids = data.ids;
            var conversion_labels = data.conversion_labels;
            Utils.copyProperties(Utils.getRequestParams(), _params);
            var _fireEvent = function(conversion_id, event_name) {
                params = Utils.copyProperties(_params, {
                    send_to: conversion_id
                });
                if ("conversion" === event_name) {
                    delete params.items;
                    delete params.ecomm_pagetype;
                    delete params.ecomm_prodid;
                    delete params.ecomm_totalvalue;
                }
                if (options.debug) {
                    console.log('[Google Ads #' + conversion_id + '] ' + event_name, params);
                }
                gtag('event', event_name, params);
            };
            if (conversion_labels.length > 0) {
                conversion_labels.forEach(function(conversion_id) {
                    _fireEvent(conversion_id, name);
                });
            } else {
                data.conversion_ids.forEach(function(conversion_id) {
                    _fireEvent(conversion_id, name);
                });
                if (ids.length) {
                    ids.forEach(function(conversion_id) {
                        _fireEvent(conversion_id, "conversion");
                    });
                }
            }
        }

        function normalizeEventName(eventName) {
            var matches = {
                ViewContent: 'view_item',
                AddToCart: 'add_to_cart',
                AddToWishList: 'add_to_wishlist',
                InitiateCheckout: 'begin_checkout',
                Purchase: 'purchase',
                Lead: 'generate_lead',
                CompleteRegistration: 'sign_up',
                AddPaymentInfo: 'set_checkout_option'
            };
            return matches.hasOwnProperty(eventName) ? matches[eventName] : eventName;
        }
        return {
            tag: function() {
                return "google_ads";
            },
            isEnabled: function() {
                return options.hasOwnProperty('google_ads');
            },
            disable: function() {
                initialized = false;
            },
            loadPixel: function() {
                if (initialized || !this.isEnabled() || !Utils.consentGiven('google_ads')) {
                    return;
                }
                Utils.loadGoogleTag(options.google_ads.conversion_ids[0]);
                options.google_ads.conversion_ids.forEach(function(conversion_id, index) {
                    if (options.google_ads.enhanced_conversion.includes("index_" + index) && Object.keys(options.google_ads.user_data).length > 0) {
                        gtag('config', conversion_id, {
                            'allow_enhanced_conversions': true
                        });
                        gtag('set', 'user_data', options.google_ads.user_data);
                    } else {
                        gtag('config', conversion_id);
                    }
                });
                initialized = true;
                Utils.fireStaticEvents('google_ads');
            },
            fireEvent: function(name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;
                data.params = data.params || {};
                data.ids = data.ids || [];
                data.conversion_labels = data.conversion_labels || [];
                if (data.delay === 0) {
                    fireEvent(name, data);
                } else {
                    setTimeout(function(name, data) {
                        fireEvent(name, data);
                    }, data.delay * 1000, name, data);
                }
                return true;
            },
            onAdSenseEvent: function(event) {},
            onClickEvent: function(action, params) {},
            onWatchVideo: function(event) {
                this.fireEvent(event.name, event);
            },
            onCommentEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onFormEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onDownloadEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAddToCartOnButtonEvent: function(product_id) {
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {
                        var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])
                        Utils.copyProperties(window.pysWooProductData[product_id]['google_ads']['params'].params, event.params)
                        event["ids"] = window.pysWooProductData[product_id]['google_ads']['ids']
                        event["conversion_labels"] = window.pysWooProductData[product_id]['google_ads']['conversion_labels']
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {
                window.pysWooProductData = window.pysWooProductData || [];
                if (!options.dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = Utils.clone(options.dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                if (product_type === Utils.PRODUCT_VARIABLE && !options.google_ads.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {
                        Utils.copyProperties(window.pysWooProductData[product_id]['google_ads']["params"], event.params);
                        event["ids"] = window.pysWooProductData[product_id]['google_ads']['ids']
                        event["conversion_labels"] = window.pysWooProductData[product_id]['google_ads']['conversion_labels']
                        var groupValue = 0;
                        if (product_type === Utils.PRODUCT_GROUPED) {
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index) {
                                var childId = $(this).attr('name').replaceAll("quantity[", "").replaceAll("]", "");
                                var quantity = parseInt($(this).val());
                                if (isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var childItem = window.pysWooProductData[product_id]['google_ads'].grouped[childId];
                                if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global') {
                                    event.params.items.forEach(function(el, index, array) {
                                        if (el.id == childItem.content_id) {
                                            if (quantity > 0) {
                                                el.quantity = quantity;
                                                el.price = childItem.price;
                                            } else {
                                                array.splice(index, 1);
                                            }
                                        }
                                    });
                                }
                                groupValue += childItem.price * quantity;
                            });
                            if (groupValue == 0) return;
                            event.params.value = groupValue;
                        } else {
                            event.params.items[0].quantity = qty;
                        }
                        if (options.woo.addToCartOnButtonValueEnabled && options.woo.addToCartOnButtonValueOption !== 'global' && product_type !== Utils.PRODUCT_GROUPED) {
                            event.params.value = event.params.value * qty;
                        }
                        var eventName = is_external ? options.woo.affiliateEventName : event.name;
                        eventName = normalizeEventName(eventName);
                        this.fireEvent(eventName, event);
                    }
                }
            },
            onWooRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAffiliateEvent: function(product_id) {
                if (!options.dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.woo_affiliate[this.tag()];
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('google_ads')) {
                        event = Utils.clone(event)
                        Utils.copyProperties(window.pysWooProductData[product_id][this.tag()], event.params)
                        this.fireEvent(normalizeEventName(options.woo.affiliateEventName), event);
                    }
                }
            },
            onWooPayPalEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {
                if (!options.dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = options.dynamicEvents.edd_add_to_cart_on_button_click[this.tag()];
                if (window.pysEddProductData.hasOwnProperty(download_id)) {
                    var index;
                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }
                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('google_ads')) {
                            event = Utils.clone(event)
                            Utils.copyProperties(window.pysEddProductData[download_id][index]['google_ads']['params'], event.params);
                            event.ids = window.pysEddProductData[download_id][index]['google_ads']['ids']
                            this.fireEvent(event.name, event);
                        }
                    }
                }
            },
            onEddRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function(event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
            onTime: function(event) {
                if (initialized && this.isEnabled()) {
                    this.fireEvent(event.name, event);
                }
            },
        };
    }(options);
    window.pys = window.pys || {};
    window.pys.Facebook = Facebook;
    window.pys.Analytics = Analytics;
    window.pys.GAds = GAds;
    window.pys.Utils = Utils;
    window.pys.TikTok = TikTok;
    $(document).ready(function() {
        if ($("#pys_late_event").length > 0) {
            var events = JSON.parse($("#pys_late_event").attr("dir"));
            for (var key in events) {
                var event = {};
                event[events[key].e_id] = [events[key]];
                if (options.staticEvents.hasOwnProperty(key)) {
                    Object.assign(options.staticEvents[key], event);
                } else {
                    options.staticEvents[key] = event;
                }
            }
        }
        var Pinterest = Utils.setupPinterestObject();
        var Bing = Utils.setupBingObject();
        Utils.manageCookies();
        Utils.initializeRequestParams();
        Utils.setupGdprCallbacks();
        if (options.enable_auto_save_advance_matching) {
            $(document).on("blur", "input[type='email']", function() {
                let email = $(this).val().trim().toLowerCase();
                if (Utils.validateEmail(email)) {
                    Utils.saveAdvancedFormData(email, null, null, null);
                }
            })
            $(document).on("blur", "input[type='tel']", function() {
                let phone = $(this).val().trim().replace(/\D/g, "");
                if (phone.length > 5) {
                    Utils.saveAdvancedFormData(null, phone, null, null);
                }
            })
            $(document).on("blur", "input[type='text']", function() {
                let name = $(this).attr("name").trim().toLocaleString()
                if (name && options.advance_matching_fn_names.includes(name)) {
                    let value = $(this).val().trim();
                    if (value.length > 0) {
                        Utils.saveAdvancedFormData(null, null, value, null);
                    }
                }
                if (name && options.advance_matching_ln_names.includes(name)) {
                    let value = $(this).val().trim();
                    if (value.length > 0) {
                        Utils.saveAdvancedFormData(null, null, null, value);
                    }
                }
                if (name && options.advance_matching_tel_names.includes(name)) {
                    let value = $(this).val().trim();
                    if (value.length > 0) {
                        console.log(value);
                        Utils.saveAdvancedFormData(null, value, null, null);
                    }
                }
            })
        }
        if (options.dynamicEvents.hasOwnProperty("automatic_event_internal_link") || options.dynamicEvents.hasOwnProperty("automatic_event_outbound_link") || options.dynamicEvents.hasOwnProperty("automatic_event_tel_link") || options.dynamicEvents.hasOwnProperty("automatic_event_email_link") || options.dynamicEvents.hasOwnProperty("automatic_event_download")) {
            $(document).onFirst('click', 'a, button, input[type="button"], input[type="submit"]', function(e) {
                var $elem = $(this);
                if (options.dynamicEvents.hasOwnProperty("automatic_event_download")) {
                    var isFired = false;
                    if ($elem.is('a')) {
                        var href = $elem.attr('href');
                        if (typeof href !== "string") {
                            return;
                        }
                        href = href.trim();
                        var extension = Utils.getLinkExtension(href);
                        var track_download = false;
                        if (extension.length > 0) {
                            if (options.dynamicEvents.hasOwnProperty("automatic_event_download")) {
                                var pixels = Object.keys(options.dynamicEvents.automatic_event_download);
                                for (var i = 0; i < pixels.length; i++) {
                                    var event = Utils.clone(options.dynamicEvents.automatic_event_download[pixels[i]]);
                                    var extensions = event.extensions;
                                    if (extensions.includes(extension)) {
                                        if (pixels[i] == "tiktok") {
                                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                                        } else {
                                            if (options.enable_remove_download_url_param) {
                                                href = href.split('?')[0];
                                            }
                                            event.params.download_url = href;
                                            event.params.download_type = extension;
                                            event.params.download_name = Utils.getLinkFilename(href);
                                            getPixelBySlag(pixels[i]).onDownloadEvent(event);
                                        }
                                        isFired = true;
                                    }
                                }
                            }
                        }
                    }
                    if (isFired) {
                        return;
                    }
                }
                if (!e.hasOwnProperty('originalEvent')) {
                    return;
                }
                if ($elem.hasClass("add_to_cart_button") || $elem.hasClass("single_add_to_cart_button")) {
                    return;
                }
                if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_next_step_click") && $elem.hasClass("wcf-next-step-link")) {
                    return;
                }
                if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click") && $elem.hasClass("wcf-bump-order-cb")) {
                    return;
                }
                if ($elem.hasClass("remove_from_cart_button")) {
                    return;
                }
                if ($elem.hasClass("remove")) {
                    if ($elem.parents('.cart_item').length || $elem.parents('.mini_cart_item').length)
                        return;
                }
                if ($elem.attr("name") == "update_cart" || $elem.attr("name") == "apply_coupon") {
                    return;
                }
                if ($elem.hasClass('pys_block')) {
                    return;
                }
                var text = "";
                var target_url = "";
                var linkType = "Internal Click";
                if ($elem.is('a')) {
                    var href = $elem.attr('href');
                    if (typeof href !== "string") {
                        return;
                    }
                    href = href.trim();
                    text = $elem.text();
                    if (options.enable_remove_target_url_param) {
                        target_url = href.split('?')[0];
                    } else {
                        target_url = href
                    }
                    if (href.startsWith('mailto:')) {
                        if (options.dynamicEvents.hasOwnProperty("automatic_event_email_link")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_email_link);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_email_link[pixels[i]]);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                        return;
                    }
                    if (href.startsWith('tel:')) {
                        if (options.dynamicEvents.hasOwnProperty("automatic_event_tel_link")) {
                            var pixels = Object.keys(options.dynamicEvents.automatic_event_tel_link);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.automatic_event_tel_link[pixels[i]]);
                                Utils.copyProperties(Utils.getRequestParams(), event.params);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                        return;
                    }
                    if (href.startsWith('http')) {
                        var host = $elem.context != undefined ? $elem.context.host : $elem[0].host;
                        if (document.location.host != host) {
                            linkType = 'External Click';
                        }
                    }
                } else if ($elem.is('button')) {
                    if ($elem.hasClass("forminator-button-submit")) {
                        return;
                    }
                    text = $elem.text();
                } else if ($elem.is('input[type="button"]')) {
                    text = $elem.val();
                } else if ($elem.is('input[type="submit"]')) {
                    if ($elem.parents("form.comment-form")) {
                        return;
                    }
                    if ($elem.parents("form")) {
                        return;
                    }
                    text = $elem.val();
                } else {
                    return;
                }
                text = Utils.filterEmails(text);
                if (linkType === "Internal Click" && options.dynamicEvents.hasOwnProperty("automatic_event_internal_link")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_internal_link);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_internal_link[pixels[i]]);
                        if (pixels[i] !== "tiktok") {
                            event.params["text"] = text;
                            if (target_url) {
                                event.params["target_url"] = target_url;
                            }
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                        }
                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                }
                if (linkType === "External Click" && options.dynamicEvents.hasOwnProperty("automatic_event_outbound_link")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_outbound_link);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_outbound_link[pixels[i]]);
                        if (pixels[i] !== "tiktok") {
                            event.params["text"] = text;
                            if (target_url) {
                                event.params["target_url"] = target_url;
                            }
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                        }
                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                }
            });
        }
        if (options.dynamicEvents.hasOwnProperty("automatic_event_adsense")) {
            var isOverGoogleAd = false;
            $(document).on('mouseover', 'ins iframe', function() {
                isOverGoogleAd = true;
            }).on('mouseout', 'iframe', function() {
                isOverGoogleAd = false;
            });
            $(window).on("blur", function() {
                if (isOverGoogleAd) {
                    if (options.dynamicEvents.hasOwnProperty("automatic_event_adsense")) {
                        var pixels = Object.keys(options.dynamicEvents.automatic_event_adsense);
                        for (var i = 0; i < pixels.length; i++) {
                            var event = Utils.clone(options.dynamicEvents.automatic_event_adsense[pixels[i]]);
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onAdSenseEvent(event);
                        }
                    }
                    $.each(options.triggerEventTypes, function(triggerType, events) {
                        $.each(events, function(eventId, triggers) {
                            switch (triggerType) {
                                case 'ad_sense_click':
                                    Utils.fireTriggerEvent(eventId);
                                    break;
                            }
                        });
                    });
                }
            }).trigger("focus");
        }
        var dynamicAdsenseEventsTriggers = 0
        $.each(options.triggerEventTypes, function(triggerType, events) {
            if (triggerType == "ad_sense_click") {
                dynamicAdsenseEventsTriggers++;
            }
        });
        if (dynamicAdsenseEventsTriggers > 0) {
            var isOverGoogleAd = false;
            $(document).on('mouseover', 'ins > ins > iframe', function() {
                isOverGoogleAd = true;
            }).on('mouseout', 'iframe', function() {
                isOverGoogleAd = false;
            });
            $(window).on("blur", function() {
                if (isOverGoogleAd) {
                    $.each(options.triggerEventTypes, function(triggerType, events) {
                        $.each(events, function(eventId, triggers) {
                            switch (triggerType) {
                                case 'ad_sense_click':
                                    Utils.fireTriggerEvent(eventId);
                                    break;
                            }
                        });
                    });
                }
            }).trigger("focus");
        }
        if (options.dynamicEvents.hasOwnProperty("automatic_event_scroll")) {
            var singlePageScroll = function() {
                var docHeight = $(document).height() - $(window).height();
                var isFired = false;
                if (options.dynamicEvents.hasOwnProperty("automatic_event_scroll")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_scroll);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_scroll[pixels[i]]);
                        var scroll = Math.round(docHeight * event.scroll_percent / 100)
                        if (scroll < $(window).scrollTop()) {
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onPageScroll(event);
                            isFired = true
                        }
                    }
                }
                if (isFired) {
                    $(document).off("scroll", singlePageScroll);
                }
            }
            $(document).on("scroll", singlePageScroll);
        }
        if (options.dynamicEvents.hasOwnProperty("automatic_event_time_on_page")) {
            var pixels = Object.keys(options.dynamicEvents.automatic_event_time_on_page);
            var time = options.dynamicEvents.automatic_event_time_on_page[pixels[0]].time_on_page;
            setTimeout(function() {
                for (var i = 0; i < pixels.length; i++) {
                    var event = Utils.clone(options.dynamicEvents.automatic_event_time_on_page[pixels[i]]);
                    Utils.copyProperties(Utils.getRequestParams(), event.params);
                    getPixelBySlag(pixels[i]).onTime(event);
                }
            }, time * 1000);
        }
        $.each(options.triggerEventTypes, function(triggerType, events) {
            $.each(events, function(eventId, triggers) {
                switch (triggerType) {
                    case 'url_click':
                        break;
                    case 'css_click':
                        Utils.setupCSSClickEvents(eventId, triggers);
                        break;
                    case 'css_mouseover':
                        Utils.setupMouseOverClickEvents(eventId, triggers);
                        break;
                    case 'scroll_pos':
                        Utils.setupScrollPosEvents(eventId, triggers);
                        break;
                    case 'comment':
                        Utils.setupCommentEvents(eventId, triggers);
                        break;
                }
            });
        });
        if (options.woo.enabled) {
            if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_next_step_click")) {
                $("body").on("click", '.wcf-next-step-link', function() {
                    var pixels = Object.keys(options.dynamicEvents.wcf_add_to_cart_on_next_step_click);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.wcf_add_to_cart_on_next_step_click[pixels[i]])
                        getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                    }
                });
            }
            if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click") || options.dynamicEvents.hasOwnProperty("wcf_bump")) {
                $("body").on('change', '.wcf-bump-order-cb', function() {
                    if (this.checked) {
                        if (options.dynamicEvents.hasOwnProperty("wcf_add_to_cart_on_bump_click")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_add_to_cart_on_bump_click);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_add_to_cart_on_bump_click[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                        if (options.dynamicEvents.hasOwnProperty("wcf_bump")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_bump);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_bump[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                    } else {
                        if (options.dynamicEvents.hasOwnProperty("wcf_remove_from_cart_on_bump_click")) {
                            var pixels = Object.keys(options.dynamicEvents.wcf_remove_from_cart_on_bump_click);
                            for (var i = 0; i < pixels.length; i++) {
                                var event = Utils.clone(options.dynamicEvents.wcf_remove_from_cart_on_bump_click[pixels[i]]);
                                getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                            }
                        }
                    }
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_add_to_cart_on_button_click") && options.woo.hasOwnProperty("addToCartCatchMethod") && options.woo.addToCartCatchMethod === "add_cart_js") {
                $('.add_to_cart_button:not(.product_type_variable,.product_type_bundle,.single_add_to_cart_button)').on("click", function(e) {
                    var product_id = $(this).data('product_id');
                    if (typeof product_id !== 'undefined') {
                        Facebook.onWooAddToCartOnButtonEvent(product_id, $(this));
                        Analytics.onWooAddToCartOnButtonEvent(product_id);
                        GAds.onWooAddToCartOnButtonEvent(product_id);
                        Pinterest.onWooAddToCartOnButtonEvent(product_id);
                        Bing.onWooAddToCartOnButtonEvent(product_id);
                        TikTok.onWooAddToCartOnButtonEvent(product_id);
                    }
                });
                $('body').onFirst('click', 'button.single_add_to_cart_button,.single_add_to_cart_button', function(e) {
                    var $button = $(this);
                    if ($button.hasClass('disabled')) {
                        return;
                    }
                    var $form = $button.closest('form');
                    var product_type = Utils.PRODUCT_SIMPLE;
                    var is_external = false;
                    if ($form.length === 0) {
                        is_external = true;
                    } else if ($form.hasClass('variations_form')) {
                        product_type = Utils.PRODUCT_VARIABLE;
                    } else if ($form.hasClass('bundle_form')) {
                        product_type = Utils.PRODUCT_BUNDLE;
                    } else if ($form.hasClass('grouped_form')) {
                        product_type = Utils.PRODUCT_GROUPED;
                    }
                    var product_id;
                    var qty;
                    if (product_type === Utils.PRODUCT_GROUPED) {
                        qty = 1;
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                    } else if (product_type === Utils.PRODUCT_VARIABLE) {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if (qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    } else if (is_external) {
                        product_id = options.woo.singleProductId;
                        qty = 1;
                    } else {
                        product_id = parseInt($form.find('*[name="add-to-cart"]').val());
                        var qtyTag = $form.find('input[name="quantity"]');
                        if (qtyTag.length <= 0) {
                            qtyTag = $form.find('select[name="quantity"]');
                        }
                        qty = parseInt(qtyTag.val());
                    }
                    Facebook.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Analytics.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    GAds.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Pinterest.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    Bing.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                    TikTok.onWooAddToCartOnSingleEvent(product_id, qty, product_type, is_external, $form);
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_affiliate")) {
                $('.product_type_external').on("click", function(e) {
                    var product_id = $(this).data('product_id');
                    if (typeof product_id !== 'undefined') {
                        Facebook.onWooAffiliateEvent(product_id);
                        Analytics.onWooAffiliateEvent(product_id);
                        GAds.onWooAffiliateEvent(product_id);
                        Pinterest.onWooAffiliateEvent(product_id);
                        Bing.onWooAffiliateEvent(product_id);
                    }
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_remove_from_cart")) {
                $('body').on('click', options.woo.removeFromCartSelector, function(e) {
                    var $a = $(e.currentTarget),
                        href = $a.attr('href');
                    var regex = new RegExp("[\\?&]remove_item=([^&#]*)"),
                        results = regex.exec(href);
                    if (results !== null) {
                        var item_hash = results[1];
                        if (options.dynamicEvents["woo_remove_from_cart"].hasOwnProperty(item_hash)) {
                            var events = options.dynamicEvents["woo_remove_from_cart"][item_hash];
                            Utils.fireEventForAllPixel("onWooRemoveFromCartEvent", events)
                        }
                    }
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_paypal")) {
                $(document).onFirst('submit click', '#place_order', function(e) {
                    var method = $('form[name="checkout"] input[name="payment_method"]:checked').val();
                    if (method !== 'paypal') {
                        return;
                    }
                    var events = options.dynamicEvents.woo_paypal;
                    Utils.fireEventForAllPixel("onWooPayPalEvent", events)
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_f")) {
                $(document).on("change", ".woocommerce-validated #billing_first_name", function() {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_f[Analytics.tag()]);
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_l")) {
                $(document).on("change", ".woocommerce-validated #billing_last_name", function() {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_l[Analytics.tag()]);
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_e")) {
                $(document).on("change", ".woocommerce-validated #billing_email", function() {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_e[Analytics.tag()]);
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_initiate_checkout_progress_o")) {
                $(document).onFirst('submit click', '#place_order', function() {
                    Analytics.onWooCheckoutProgressStep(options.dynamicEvents.woo_initiate_checkout_progress_o[Analytics.tag()]);
                });
            }
            if (options.dynamicEvents.hasOwnProperty("woo_select_content_search") || options.dynamicEvents.hasOwnProperty("woo_select_content_shop") || options.dynamicEvents.hasOwnProperty("woo_select_content_tag") || options.dynamicEvents.hasOwnProperty("woo_select_content_single") || options.dynamicEvents.hasOwnProperty("woo_select_content_category")) {
                $('.product.type-product a.woocommerce-loop-product__link').onFirst('click', function(evt) {
                    var productId = $(this).parent().find("a.add_to_cart_button").attr("data-product_id");
                    if (options.dynamicEvents.hasOwnProperty("woo_select_content_search") && options.dynamicEvents.woo_select_content_search.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_search[productId][Analytics.tag()]);
                    } else if (options.dynamicEvents.hasOwnProperty("woo_select_content_shop") && options.dynamicEvents.woo_select_content_shop.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_shop[productId][Analytics.tag()]);
                    } else if (options.dynamicEvents.hasOwnProperty("woo_select_content_tag") && options.dynamicEvents.woo_select_content_tag.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_tag[productId][Analytics.tag()]);
                    } else if (options.dynamicEvents.hasOwnProperty("woo_select_content_single") && options.dynamicEvents.woo_select_content_single.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_single[productId][Analytics.tag()]);
                    } else if (options.dynamicEvents.hasOwnProperty("woo_select_content_category") && options.dynamicEvents.woo_select_content_category.hasOwnProperty(productId)) {
                        Analytics.onWooSelectContent(options.dynamicEvents.woo_select_content_category[productId][Analytics.tag()]);
                    }
                });
            }
        }
        if (options.edd.enabled) {
            if (options.dynamicEvents.hasOwnProperty("edd_add_to_cart_on_button_click")) {
                $('form.edd_download_purchase_form .edd-add-to-cart').on("click", function(e) {
                    var $button = $(this);
                    var $form = $button.closest('form');
                    var variable_price = $button.data('variablePrice');
                    var price_mode = $button.data('priceMode');
                    var ids = [];
                    var quantities = [];
                    var qty;
                    var id;
                    if (variable_price === 'yes' && price_mode === 'multi') {
                        id = $form.find('input[name="download_id"]').val();
                        $.each($form.find('input[name="edd_options[price_id][]"]:checked'), function(i, el) {
                            ids.push(id + '_' + $(el).val());
                        });
                        $.each(ids, function(i, variant_id) {
                            var variant_index = variant_id.split('_', 2);
                            qty = $form.find('input[name="edd_download_quantity_' + variant_index[1] + '"]').val();
                            if (typeof qty !== 'undefined') {
                                quantities.push(qty);
                            } else {
                                quantities.push(1);
                            }
                        });
                    } else if (variable_price === 'yes' && price_mode === 'single') {
                        id = $form.find('input[name="download_id"]').val();
                        ids.push(id + '_' + $form.find('input[name="edd_options[price_id][]"]:checked').val());
                        qty = $form.find('input[name="edd_download_quantity"]').val();
                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }
                    } else {
                        ids.push($button.data('downloadId'));
                        qty = $form.find('input[name="edd_download_quantity"]').val();
                        if (typeof qty !== 'undefined') {
                            quantities.push(qty);
                        } else {
                            quantities.push(1);
                        }
                    }
                    $.each(ids, function(i, download_id) {
                        var q = parseInt(quantities[i]);
                        var variant_index = download_id.toString().split('_', 2);
                        var price_index;
                        if (variant_index.length === 2) {
                            download_id = variant_index[0];
                            price_index = variant_index[1];
                        }
                        Facebook.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Analytics.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        GAds.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Pinterest.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        Bing.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                        TikTok.onEddAddToCartOnButtonEvent(download_id, price_index, q);
                    });
                });
            }
            if (options.dynamicEvents.hasOwnProperty("edd_remove_from_cart")) {
                $('form#edd_checkout_cart_form .edd_cart_remove_item_btn').on("click", function(e) {
                    var href = $(this).attr('href');
                    var key = href.substring(href.indexOf('=') + 1).charAt(0);
                    if (options.dynamicEvents.edd_remove_from_cart.hasOwnProperty(key)) {
                        var events = options.dynamicEvents.edd_remove_from_cart[key];
                        Utils.fireEventForAllPixel("onEddRemoveFromCartEvent", events)
                    }
                });
            }
        }
        Utils.setupURLClickEvents();
        if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")) {
            $('form.comment-form').on("submit", function() {
                if (options.dynamicEvents.hasOwnProperty("automatic_event_comment")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_comment);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_comment[pixels[i]]);
                        Utils.copyProperties(Utils.getRequestParams(), event.params);
                        getPixelBySlag(pixels[i]).onCommentEvent(event);
                    }
                }
            });
        }
        if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
            $(document).onFirst('submit', 'form', function(e) {
                var $form = $(this);
                if ($form.hasClass('comment-form') || $form.hasClass('search-form') || $form.attr('id') === 'adminbarsearch') {
                    return;
                }
                if ($form.hasClass('woocommerce-product-search') || $form.hasClass('cart') || $form.hasClass('woocommerce-cart-form') || $form.hasClass('woocommerce-shipping-calculator') || $form.hasClass('checkout') || $form.hasClass('checkout_coupon')) {
                    return;
                }
                if ($form.hasClass('edd_form') || $form.hasClass('edd_download_purchase_form')) {
                    return;
                }
                var params = {
                    form_id: $form.attr('id'),
                    form_class: $form.attr('class'),
                    text: $form.find('[type="submit"]').is('input') ? $form.find('[type="submit"]').val() : $form.find('[type="submit"]').text()
                };
                if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_form[pixels[i]]);
                        if (pixels[i] === "tiktok") {
                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                        } else {
                            Utils.copyProperties(params, event.params, )
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onFormEvent(event);
                        }
                    }
                }
            });
            $(document).on('forminator:form:submit:success', function(formData) {
                var params = {
                    form_id: $(formData.target).find('input[name="form_id"]').val(),
                    text: $(formData.target).find('.forminator-button-submit').text()
                };
                if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = Utils.clone(options.dynamicEvents.automatic_event_form[pixels[i]]);
                        if (pixels[i] === "tiktok") {
                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                        } else {
                            Utils.copyProperties(params, event.params)
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onFormEvent(event);
                        }
                    }
                }
            });
            $(document).onFirst('nfFormSubmitResponse', function(e, data) {
                var params = {
                    form_id: data.response.data.form_id,
                    text: data.response.data.settings.title
                };
                if (options.dynamicEvents.hasOwnProperty("automatic_event_form")) {
                    var pixels = Object.keys(options.dynamicEvents.automatic_event_form);
                    for (var i = 0; i < pixels.length; i++) {
                        var event = options.dynamicEvents.automatic_event_form[pixels[i]];
                        if (pixels[i] === "tiktok") {
                            getPixelBySlag(pixels[i]).fireEvent(event.name, event);
                        } else {
                            Utils.copyProperties(params, event.params)
                            Utils.copyProperties(Utils.getRequestParams(), event.params);
                            getPixelBySlag(pixels[i]).onFormEvent(event);
                        }
                    }
                }
            });
        }
        Utils.loadPixels();
        if (Utils.isCheckoutPage()) {
            Utils.addCheckoutFields();
        }
    });
    if (options.automatic.enable_video) {
        var consentApi = window.consentApi;
        if (consentApi && options.gdpr.real_cookie_banner_integration_enabled) {
            if (options.automatic.enable_youtube) {
                window.consentApi.consent("http", "CONSENT", ".youtube.com").then(Utils.initYouTubeAPI);
            }
            if (options.automatic.enable_vimeo) {
                window.consentApi.consent("http", "player", ".vimeo.com").then(Utils.initVimeoAPI);
            }
        } else {
            if (options.automatic.enable_youtube) {
                Utils.initYouTubeAPI();
            }
            if (options.automatic.enable_vimeo) {
                Utils.initVimeoAPI();
            }
        }
    }
}(jQuery, pysOptions);

function pys_generate_token(length) {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

function getBundlePriceOnSingleProduct(data) {
    var items_sum = 0;
    jQuery(".bundle_form .bundled_product").each(function(index) {
        var id = jQuery(this).find(".cart").data("bundled_item_id");
        var item_price = data.prices[id];
        var item_quantity = jQuery(this).find(".bundled_qty").val();
        if (!jQuery(this).hasClass("bundled_item_optional") || jQuery(this).find(".bundled_product_optional_checkbox input").prop('checked')) {
            items_sum += item_price * item_quantity;
        }
    });
    return items_sum;
}

function getPixelBySlag(slug) {
    switch (slug) {
        case "facebook":
            return window.pys.Facebook;
        case "ga":
            return window.pys.Analytics;
        case "google_ads":
            return window.pys.GAds;
        case "bing":
            return window.pys.Bing;
        case "pinterest":
            return window.pys.Pinterest;
        case "tiktok":
            return window.pys.TikTok;
    }
};
! function($) {
    var Pinterest = function() {
        var initialized = false;

        function getUtils() {
            return window.pys.Utils;
        }

        function getOptions() {
            return window.pysOptions;
        }

        function fireEvent(name, data) {
            if (typeof window.pys_event_data_filter === "function" && window.pys_disable_event_filter(name, 'pinterest')) {
                return;
            }
            var params = {};
            getUtils().copyProperties(data, params);
            getUtils().copyProperties(getUtils().getRequestParams(), params);
            if (getOptions().debug) {
                console.log('[Pinterest] ' + name, params);
            }
            pintrk('track', name, params);
        }
        return {
            tag: function() {
                return "pinterest";
            },
            isEnabled: function() {
                return getOptions().hasOwnProperty('pinterest');
            },
            disable: function() {
                initialized = false;
            },
            loadPixel: function() {
                if (initialized || !this.isEnabled() || !getUtils().consentGiven('pinterest')) {
                    return;
                }! function(e) {
                    if (!window.pintrk) {
                        window.pintrk = function() {
                            window.pintrk.queue.push(Array.prototype.slice.call(arguments))
                        };
                        var n = window.pintrk;
                        n.queue = [], n.version = "3.0";
                        var t = document.createElement("script");
                        t.async = !0, t.src = e;
                        var r = document.getElementsByTagName("script")[0];
                        r.parentNode.insertBefore(t, r)
                    }
                }("https://s.pinimg.com/ct/core.js");
                getOptions().pinterest.pixelIds.forEach(function(pixelId) {
                    pintrk('load', pixelId, {
                        em: getOptions().pinterest.advancedMatching.em,
                        np: 'pixelyoursite'
                    });
                    pintrk('page');
                });
                initialized = true;
                getUtils().fireStaticEvents('pinterest');
            },
            fireEvent: function(name, data) {
                if (!initialized || !this.isEnabled()) {
                    return false;
                }
                data.delay = data.delay || 0;
                data.params = data.params || {};
                if (data.delay === 0) {
                    fireEvent(name, data.params);
                } else {
                    setTimeout(function(name, params) {
                        fireEvent(name, params);
                    }, data.delay * 1000, name, data.params);
                }
                return true;
            },
            onAdSenseEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onClickEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWatchVideo: function(event) {
                this.fireEvent(event.name, event);
            },
            onCommentEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onFormEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onDownloadEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAddToCartOnButtonEvent: function(product_id) {
                if (!getOptions().dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('pinterest')) {
                        var event = getUtils().clone(getOptions().dynamicEvents.woo_add_to_cart_on_button_click[this.tag()]);
                        getUtils().copyProperties(window.pysWooProductData[product_id]['pinterest'].params, event.params);
                        this.fireEvent(event.name, event);
                    }
                }
            },
            onWooAddToCartOnSingleEvent: function(product_id, qty, product_type, is_external, $form) {
                window.pys_woo_product_data = window.pys_woo_product_data || [];
                if (!getOptions().dynamicEvents.woo_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                if (product_type === getUtils().PRODUCT_VARIABLE && !getOptions().pinterest.wooVariableAsSimple) {
                    product_id = parseInt($form.find('input[name="variation_id"]').val());
                }
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('pinterest')) {
                        var event = getUtils().clone(getOptions().dynamicEvents.woo_add_to_cart_on_button_click[this.tag()])
                        getUtils().copyProperties(window.pysWooProductData[product_id]['pinterest'].params, event.params);
                        if (product_type === getUtils().PRODUCT_GROUPED) {
                            var total = 0;
                            $form.find(".woocommerce-grouped-product-list .qty").each(function(index) {
                                var childId = $(this).attr('name').replaceAll("quantity[", "").replaceAll("]", "");
                                var quantity = parseInt($(this).val());
                                if (isNaN(quantity)) {
                                    quantity = 0;
                                }
                                var price = window.pysWooProductData[product_id]['pinterest'].grouped[childId].price;
                                total += price * quantity;
                            });
                            if (total == 0) return;
                            if (getOptions().woo.addToCartOnButtonValueEnabled && getOptions().woo.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = total;
                            }
                        } else {
                            if (getOptions().woo.addToCartOnButtonValueEnabled && getOptions().woo.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = event.params.value * qty;
                            }
                        }
                        event.params.product_quantity = qty;
                        if (product_type === getUtils().PRODUCT_BUNDLE) {
                            var data = $(".bundle_form .bundle_data").data("bundle_form_data");
                            var items_sum = getBundlePriceOnSingleProduct(data);
                            var price = (data.base_price + items_sum) * qty;
                            if (getOptions().woo.addToCartOnButtonValueEnabled && getOptions().woo.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = price;
                            }
                        }
                        var event_name = is_external ? getOptions().woo.affiliateEventName : event.name;
                        this.fireEvent(event_name, event);
                    }
                }
            },
            onWooRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onWooAffiliateEvent: function(product_id) {
                if (!getOptions().dynamicEvents.woo_affiliate.hasOwnProperty(this.tag()))
                    return;
                var event = getOptions().dynamicEvents.woo_affiliate[this.tag()];
                if (window.pysWooProductData.hasOwnProperty(product_id)) {
                    if (window.pysWooProductData[product_id].hasOwnProperty('pinterest')) {
                        event = getUtils().copyProperties(event, {})
                        getUtils().copyProperties(window.pysWooProductData[product_id][this.tag()].params, event.params)
                        this.fireEvent(getOptions().woo.affiliateEventName, event);
                    }
                }
            },
            onWooPayPalEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onEddAddToCartOnButtonEvent: function(download_id, price_index, qty) {
                if (!getOptions().dynamicEvents.edd_add_to_cart_on_button_click.hasOwnProperty(this.tag()))
                    return;
                var event = getOptions().dynamicEvents.edd_add_to_cart_on_button_click[this.tag()];
                if (window.pysEddProductData.hasOwnProperty(download_id)) {
                    var index;
                    if (price_index) {
                        index = download_id + '_' + price_index;
                    } else {
                        index = download_id;
                    }
                    if (window.pysEddProductData[download_id].hasOwnProperty(index)) {
                        if (window.pysEddProductData[download_id][index].hasOwnProperty('pinterest')) {
                            event = getUtils().copyProperties(event, {})
                            getUtils().copyProperties(window.pysEddProductData[download_id][index]['pinterest'].params, event.params);
                            if (getOptions().edd.addToCartOnButtonValueEnabled && getOptions().edd.addToCartOnButtonValueOption !== 'global') {
                                event.params.value = event.params.value * qty;
                            }
                            event.params.product_quantity = qty;
                            this.fireEvent(event.name, event);
                        }
                    }
                }
            },
            onEddRemoveFromCartEvent: function(event) {
                this.fireEvent(event.name, event);
            },
            onPageScroll: function(event) {
                this.fireEvent(event.name, event);
            },
            onTime: function(event) {
                this.fireEvent(event.name, event);
            },
        };
    }();
    window.pys = window.pys || {};
    window.pys.Pinterest = Pinterest;
}(jQuery);
/*! @vimeo/player v2.2.0 | (c) 2017 Vimeo | MIT License | https://github.com/vimeo/player.js */
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e.Vimeo = e.Vimeo || {}, e.Vimeo.Player = t())
}(this, function() {
    "use strict";

    function e(e, t) {
        return t = {
            exports: {}
        }, e(t, t.exports), t.exports
    }

    function t(e, t, n) {
        var r = E.get(e.element) || {};
        t in r || (r[t] = []), r[t].push(n), E.set(e.element, r)
    }

    function n(e, t) {
        return (E.get(e.element) || {})[t] || []
    }

    function r(e, t, n) {
        var r = E.get(e.element) || {};
        if (!r[t]) return !0;
        if (!n) return r[t] = [], E.set(e.element, r), !0;
        var i = r[t].indexOf(n);
        return -1 !== i && r[t].splice(i, 1), E.set(e.element, r), r[t] && 0 === r[t].length
    }

    function i(e, t) {
        var i = n(e, t);
        if (i.length < 1) return !1;
        var o = i.shift();
        return r(e, t, o), o
    }

    function o(e, t) {
        var n = E.get(e);
        E.set(t, n), E.delete(e)
    }

    function a(e, t) {
        return 0 === e.indexOf(t.toLowerCase()) ? e : "" + t.toLowerCase() + e.substr(0, 1).toUpperCase() + e.substr(1)
    }

    function u(e) {
        return e instanceof window.HTMLElement
    }

    function s(e) {
        return !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e
    }

    function c(e) {
        return /^(https?:)?\/\/((player|www).)?vimeo.com(?=$|\/)/.test(e)
    }

    function f() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = e.id,
            n = e.url,
            r = t || n;
        if (!r) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
        if (s(r)) return "https://vimeo.com/" + r;
        if (c(r)) return r.replace("http:", "https:");
        if (t) throw new TypeError("“" + t + "” is not a valid video id.");
        throw new TypeError("“" + r + "” is not a vimeo.com url.")
    }

    function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return T.reduce(function(t, n) {
            var r = e.getAttribute("data-vimeo-" + n);
            return (r || "" === r) && (t[n] = "" === r ? 1 : r), t
        }, t)
    }

    function h(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        return new Promise(function(n, r) {
            if (!c(e)) throw new TypeError("“" + e + "” is not a vimeo.com url.");
            var i = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(e);
            for (var o in t) t.hasOwnProperty(o) && (i += "&" + o + "=" + encodeURIComponent(t[o]));
            var a = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
            a.open("GET", i, !0), a.onload = function() {
                if (404 === a.status) return void r(new Error("“" + e + "” was not found."));
                if (403 === a.status) return void r(new Error("“" + e + "” is not embeddable."));
                try {
                    var t = JSON.parse(a.responseText);
                    n(t)
                } catch (e) {
                    r(e)
                }
            }, a.onerror = function() {
                var e = a.status ? " (" + a.status + ")" : "";
                r(new Error("There was an error fetching the embed code from Vimeo" + e + "."))
            }, a.send()
        })
    }

    function d(e, t) {
        var n = e.html;
        if (!t) throw new TypeError("An element must be provided");
        if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
        var r = document.createElement("div");
        return r.innerHTML = n, t.appendChild(r.firstChild), t.setAttribute("data-vimeo-initialized", "true"), t.querySelector("iframe")
    }

    function v(e) {
        return "string" == typeof e && (e = JSON.parse(e)), e
    }

    function p(e, t, n) {
        if (e.element.contentWindow && e.element.contentWindow.postMessage) {
            var r = {
                method: t
            };
            void 0 !== n && (r.value = n);
            var i = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
            i >= 8 && i < 10 && (r = JSON.stringify(r)), e.element.contentWindow.postMessage(r, e.origin)
        }
    }

    function y(e, t) {
        t = v(t);
        var o = [],
            a = void 0;
        if (t.event) {
            if ("error" === t.event) {
                n(e, t.data.method).forEach(function(n) {
                    var i = new Error(t.data.message);
                    i.name = t.data.name, n.reject(i), r(e, t.data.method, n)
                })
            }
            o = n(e, "event:" + t.event), a = t.data
        } else if (t.method) {
            var u = i(e, t.method);
            u && (o.push(u), a = t.value)
        }
        o.forEach(function(t) {
            try {
                if ("function" == typeof t) return void t.call(e, a);
                t.resolve(a)
            } catch (e) {}
        })
    }

    function m(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    var g = void 0 !== Array.prototype.indexOf,
        w = void 0 !== window.postMessage;
    if (!g || !w) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
    var k = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
        b = (e(function(e, t) {
            ! function(e) {
                function t(e, t) {
                    function r(e) {
                        if (!this || this.constructor !== r) return new r(e);
                        this._keys = [], this._values = [], this._itp = [], this.objectOnly = t, e && n.call(this, e)
                    }
                    return t || w(e, "size", {
                        get: y
                    }), e.constructor = r, r.prototype = e, r
                }

                function n(e) {
                    this.add ? e.forEach(this.add, this) : e.forEach(function(e) {
                        this.set(e[0], e[1])
                    }, this)
                }

                function r(e) {
                    return this.has(e) && (this._keys.splice(g, 1), this._values.splice(g, 1), this._itp.forEach(function(e) {
                        g < e[0] && e[0]--
                    })), -1 < g
                }

                function i(e) {
                    return this.has(e) ? this._values[g] : void 0
                }

                function o(e, t) {
                    if (this.objectOnly && t !== Object(t)) throw new TypeError("Invalid value used as weak collection key");
                    if (t != t || 0 === t)
                        for (g = e.length; g-- && !k(e[g], t););
                    else g = e.indexOf(t);
                    return -1 < g
                }

                function a(e) {
                    return o.call(this, this._values, e)
                }

                function u(e) {
                    return o.call(this, this._keys, e)
                }

                function s(e, t) {
                    return this.has(e) ? this._values[g] = t : this._values[this._keys.push(e) - 1] = t, this
                }

                function c(e) {
                    return this.has(e) || this._values.push(e), this
                }

                function f() {
                    (this._keys || 0).length = this._values.length = 0
                }

                function l() {
                    return p(this._itp, this._keys)
                }

                function h() {
                    return p(this._itp, this._values)
                }

                function d() {
                    return p(this._itp, this._keys, this._values)
                }

                function v() {
                    return p(this._itp, this._values, this._values)
                }

                function p(e, t, n) {
                    var r = [0],
                        i = !1;
                    return e.push(r), {
                        next: function() {
                            var o, a = r[0];
                            return !i && a < t.length ? (o = n ? [t[a], n[a]] : t[a], r[0]++) : (i = !0, e.splice(e.indexOf(r), 1)), {
                                done: i,
                                value: o
                            }
                        }
                    }
                }

                function y() {
                    return this._values.length
                }

                function m(e, t) {
                    for (var n = this.entries();;) {
                        var r = n.next();
                        if (r.done) break;
                        e.call(t, r.value[1], r.value[0], this)
                    }
                }
                var g, w = Object.defineProperty,
                    k = function(e, t) {
                        return e === t || e !== e && t !== t
                    };
                "undefined" == typeof WeakMap && (e.WeakMap = t({
                    delete: r,
                    clear: f,
                    get: i,
                    has: u,
                    set: s
                }, !0)), "undefined" != typeof Map && "function" == typeof(new Map).values && (new Map).values().next || (e.Map = t({
                    delete: r,
                    has: u,
                    get: i,
                    set: s,
                    keys: l,
                    values: h,
                    entries: d,
                    forEach: m,
                    clear: f
                })), "undefined" != typeof Set && "function" == typeof(new Set).values && (new Set).values().next || (e.Set = t({
                    has: a,
                    add: c,
                    delete: r,
                    clear: f,
                    keys: h,
                    values: h,
                    entries: v,
                    forEach: m
                })), "undefined" == typeof WeakSet && (e.WeakSet = t({
                    delete: r,
                    add: c,
                    clear: f,
                    has: a
                }, !0))
            }(void 0 !== k ? k : window)
        }), e(function(e) {
            var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            ! function(t, n, r) {
                n[t] = n[t] || r(), e.exports && (e.exports = n[t])
            }("Promise", k, function() {
                function e(e, t) {
                    d.add(e, t), h || (h = p(d.drain))
                }

                function n(e) {
                    var n, r = void 0 === e ? "undefined" : t(e);
                    return null == e || "object" != r && "function" != r || (n = e.then), "function" == typeof n && n
                }

                function r() {
                    for (var e = 0; e < this.chain.length; e++) i(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
                    this.chain.length = 0
                }

                function i(e, t, r) {
                    var i, o;
                    try {
                        !1 === t ? r.reject(e.msg) : (i = !0 === t ? e.msg : t.call(void 0, e.msg), i === r.promise ? r.reject(TypeError("Promise-chain cycle")) : (o = n(i)) ? o.call(i, r.resolve, r.reject) : r.resolve(i))
                    } catch (e) {
                        r.reject(e)
                    }
                }

                function o(t) {
                    var i, u = this;
                    if (!u.triggered) {
                        u.triggered = !0, u.def && (u = u.def);
                        try {
                            (i = n(t)) ? e(function() {
                                var e = new s(u);
                                try {
                                    i.call(t, function() {
                                        o.apply(e, arguments)
                                    }, function() {
                                        a.apply(e, arguments)
                                    })
                                } catch (t) {
                                    a.call(e, t)
                                }
                            }): (u.msg = t, u.state = 1, u.chain.length > 0 && e(r, u))
                        } catch (e) {
                            a.call(new s(u), e)
                        }
                    }
                }

                function a(t) {
                    var n = this;
                    n.triggered || (n.triggered = !0, n.def && (n = n.def), n.msg = t, n.state = 2, n.chain.length > 0 && e(r, n))
                }

                function u(e, t, n, r) {
                    for (var i = 0; i < t.length; i++) ! function(i) {
                        e.resolve(t[i]).then(function(e) {
                            n(i, e)
                        }, r)
                    }(i)
                }

                function s(e) {
                    this.def = e, this.triggered = !1
                }

                function c(e) {
                    this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
                }

                function f(t) {
                    if ("function" != typeof t) throw TypeError("Not a function");
                    if (0 !== this.__NPO__) throw TypeError("Not a promise");
                    this.__NPO__ = 1;
                    var n = new c(this);
                    this.then = function(t, i) {
                        var o = {
                            success: "function" != typeof t || t,
                            failure: "function" == typeof i && i
                        };
                        return o.promise = new this.constructor(function(e, t) {
                            if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
                            o.resolve = e, o.reject = t
                        }), n.chain.push(o), 0 !== n.state && e(r, n), o.promise
                    }, this.catch = function(e) {
                        return this.then(void 0, e)
                    };
                    try {
                        t.call(void 0, function(e) {
                            o.call(n, e)
                        }, function(e) {
                            a.call(n, e)
                        })
                    } catch (e) {
                        a.call(n, e)
                    }
                }
                var l, h, d, v = Object.prototype.toString,
                    p = "undefined" != typeof setImmediate ? function(e) {
                        return setImmediate(e)
                    } : setTimeout;
                try {
                    Object.defineProperty({}, "x", {}), l = function(e, t, n, r) {
                        return Object.defineProperty(e, t, {
                            value: n,
                            writable: !0,
                            configurable: !1 !== r
                        })
                    }
                } catch (e) {
                    l = function(e, t, n) {
                        return e[t] = n, e
                    }
                }
                d = function() {
                    function e(e, t) {
                        this.fn = e, this.self = t, this.next = void 0
                    }
                    var t, n, r;
                    return {
                        add: function(i, o) {
                            r = new e(i, o), n ? n.next = r : t = r, n = r, r = void 0
                        },
                        drain: function() {
                            var e = t;
                            for (t = n = h = void 0; e;) e.fn.call(e.self), e = e.next
                        }
                    }
                }();
                var y = l({}, "constructor", f, !1);
                return f.prototype = y, l(y, "__NPO__", 0, !1), l(f, "resolve", function(e) {
                    var n = this;
                    return e && "object" == (void 0 === e ? "undefined" : t(e)) && 1 === e.__NPO__ ? e : new n(function(t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        t(e)
                    })
                }), l(f, "reject", function(e) {
                    return new this(function(t, n) {
                        if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
                        n(e)
                    })
                }), l(f, "all", function(e) {
                    var t = this;
                    return "[object Array]" != v.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function(n, r) {
                        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
                        var i = e.length,
                            o = Array(i),
                            a = 0;
                        u(t, e, function(e, t) {
                            o[e] = t, ++a === i && n(o)
                        }, r)
                    })
                }), l(f, "race", function(e) {
                    var t = this;
                    return "[object Array]" != v.call(e) ? t.reject(TypeError("Not an array")) : new t(function(n, r) {
                        if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
                        u(t, e, function(e, t) {
                            n(t)
                        }, r)
                    })
                }), f
            })
        })),
        E = new WeakMap,
        T = ["id", "url", "width", "maxwidth", "height", "maxheight", "portrait", "title", "byline", "color", "autoplay", "autopause", "loop", "responsive", "speed"],
        _ = function() {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function(t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
        j = new WeakMap,
        x = new WeakMap,
        Player = function() {
            function Player(e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (m(this, Player), window.jQuery && e instanceof jQuery && (e.length > 1 && window.console && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), e = e[0]), "string" == typeof e && (e = document.getElementById(e)), !u(e)) throw new TypeError("You must pass either a valid element or a valid id.");
                if ("IFRAME" !== e.nodeName) {
                    var r = e.querySelector("iframe");
                    r && (e = r)
                }
                if ("IFRAME" === e.nodeName && !c(e.getAttribute("src") || "")) throw new Error("The player element passed isn’t a Vimeo embed.");
                if (j.has(e)) return j.get(e);
                this.element = e, this.origin = "*";
                var i = new b(function(r, i) {
                    var a = function(e) {
                        if (c(e.origin) && t.element.contentWindow === e.source) {
                            "*" === t.origin && (t.origin = e.origin);
                            var n = v(e.data),
                                i = "event" in n && "ready" === n.event,
                                o = "method" in n && "ping" === n.method;
                            if (i || o) return t.element.setAttribute("data-ready", "true"), void r();
                            y(t, n)
                        }
                    };
                    if (window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a), "IFRAME" !== t.element.nodeName) {
                        var u = l(e, n);
                        h(f(u), u).then(function(n) {
                            var r = d(n, e);
                            return t.element = r, o(e, r), j.set(t.element, t), n
                        }).catch(function(e) {
                            return i(e)
                        })
                    }
                });
                return x.set(this, i), j.set(this.element, this), "IFRAME" === this.element.nodeName && p(this, "ping"), this
            }
            return _(Player, [{
                key: "callMethod",
                value: function(e) {
                    var n = this,
                        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return new b(function(i, o) {
                        return n.ready().then(function() {
                            t(n, e, {
                                resolve: i,
                                reject: o
                            }), p(n, e, r)
                        })
                    })
                }
            }, {
                key: "get",
                value: function(e) {
                    var n = this;
                    return new b(function(r, i) {
                        return e = a(e, "get"), n.ready().then(function() {
                            t(n, e, {
                                resolve: r,
                                reject: i
                            }), p(n, e)
                        })
                    })
                }
            }, {
                key: "set",
                value: function(e, n) {
                    var r = this;
                    return b.resolve(n).then(function(n) {
                        if (e = a(e, "set"), void 0 === n || null === n) throw new TypeError("There must be a value to set.");
                        return r.ready().then(function() {
                            return new b(function(i, o) {
                                t(r, e, {
                                    resolve: i,
                                    reject: o
                                }), p(r, e, n)
                            })
                        })
                    })
                }
            }, {
                key: "on",
                value: function(e, r) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (!r) throw new TypeError("You must pass a callback function.");
                    if ("function" != typeof r) throw new TypeError("The callback must be a function.");
                    0 === n(this, "event:" + e).length && this.callMethod("addEventListener", e).catch(function() {}), t(this, "event:" + e, r)
                }
            }, {
                key: "off",
                value: function(e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
                    r(this, "event:" + e, t) && this.callMethod("removeEventListener", e).catch(function(e) {})
                }
            }, {
                key: "loadVideo",
                value: function(e) {
                    return this.callMethod("loadVideo", e)
                }
            }, {
                key: "ready",
                value: function() {
                    var e = x.get(this);
                    return b.resolve(e)
                }
            }, {
                key: "addCuePoint",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    return this.callMethod("addCuePoint", {
                        time: e,
                        data: t
                    })
                }
            }, {
                key: "removeCuePoint",
                value: function(e) {
                    return this.callMethod("removeCuePoint", e)
                }
            }, {
                key: "enableTextTrack",
                value: function(e, t) {
                    if (!e) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {
                        language: e,
                        kind: t
                    })
                }
            }, {
                key: "disableTextTrack",
                value: function() {
                    return this.callMethod("disableTextTrack")
                }
            }, {
                key: "pause",
                value: function() {
                    return this.callMethod("pause")
                }
            }, {
                key: "play",
                value: function() {
                    return this.callMethod("play")
                }
            }, {
                key: "unload",
                value: function() {
                    return this.callMethod("unload")
                }
            }, {
                key: "getAutopause",
                value: function() {
                    return this.get("autopause")
                }
            }, {
                key: "setAutopause",
                value: function(e) {
                    return this.set("autopause", e)
                }
            }, {
                key: "getColor",
                value: function() {
                    return this.get("color")
                }
            }, {
                key: "setColor",
                value: function(e) {
                    return this.set("color", e)
                }
            }, {
                key: "getCuePoints",
                value: function() {
                    return this.get("cuePoints")
                }
            }, {
                key: "getCurrentTime",
                value: function() {
                    return this.get("currentTime")
                }
            }, {
                key: "setCurrentTime",
                value: function(e) {
                    return this.set("currentTime", e)
                }
            }, {
                key: "getDuration",
                value: function() {
                    return this.get("duration")
                }
            }, {
                key: "getEnded",
                value: function() {
                    return this.get("ended")
                }
            }, {
                key: "getLoop",
                value: function() {
                    return this.get("loop")
                }
            }, {
                key: "setLoop",
                value: function(e) {
                    return this.set("loop", e)
                }
            }, {
                key: "getPaused",
                value: function() {
                    return this.get("paused")
                }
            }, {
                key: "getPlaybackRate",
                value: function() {
                    return this.get("playbackRate")
                }
            }, {
                key: "setPlaybackRate",
                value: function(e) {
                    return this.set("playbackRate", e)
                }
            }, {
                key: "getTextTracks",
                value: function() {
                    return this.get("textTracks")
                }
            }, {
                key: "getVideoEmbedCode",
                value: function() {
                    return this.get("videoEmbedCode")
                }
            }, {
                key: "getVideoId",
                value: function() {
                    return this.get("videoId")
                }
            }, {
                key: "getVideoTitle",
                value: function() {
                    return this.get("videoTitle")
                }
            }, {
                key: "getVideoWidth",
                value: function() {
                    return this.get("videoWidth")
                }
            }, {
                key: "getVideoHeight",
                value: function() {
                    return this.get("videoHeight")
                }
            }, {
                key: "getVideoUrl",
                value: function() {
                    return this.get("videoUrl")
                }
            }, {
                key: "getVolume",
                value: function() {
                    return this.get("volume")
                }
            }, {
                key: "setVolume",
                value: function(e) {
                    return this.set("volume", e)
                }
            }]), Player
        }();
    return function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                t = [].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),
                n = function(e) {
                    "console" in window && console.error && console.error("There was an error creating an embed: " + e)
                };
            t.forEach(function(e) {
                try {
                    if (null !== e.getAttribute("data-vimeo-defer")) return;
                    var t = l(e);
                    h(f(t), t).then(function(t) {
                        return d(t, e)
                    }).catch(n)
                } catch (e) {
                    n(e)
                }
            })
        }(),
        function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : document,
                t = function(t) {
                    if (c(t.origin) && t.data && "spacechange" === t.data.event)
                        for (var n = e.querySelectorAll("iframe"), r = 0; r < n.length; r++)
                            if (n[r].contentWindow === t.source) {
                                var i = n[r].parentElement;
                                i && -1 !== i.className.indexOf("vimeo-space") && (i.style.paddingBottom = t.data.data[0].bottom + "px");
                                break
                            }
                };
            window.addEventListener ? window.addEventListener("message", t, !1) : window.attachEvent && window.attachEvent("onmessage", t)
        }(), Player
});
/*!
 * Flickity PACKAGED v1.0.0
 * Touch, responsive, flickable galleries
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2015 Metafizzy
 */
(function(window) {
    var slice = Array.prototype.slice;

    function noop() {}

    function defineBridget($) {
        if (!$) {
            return;
        }

        function addOptionMethod(PluginClass) {
            if (PluginClass.prototype.option) {
                return;
            }
            PluginClass.prototype.option = function(opts) {
                if (!$.isPlainObject(opts)) {
                    return;
                }
                this.options = $.extend(true, this.options, opts);
            };
        }
        var logError = typeof console === 'undefined' ? noop : function(message) {
            console.error(message);
        };

        function bridge(namespace, PluginClass) {
            $.fn[namespace] = function(options) {
                if (typeof options === 'string') {
                    var args = slice.call(arguments, 1);
                    for (var i = 0, len = this.length; i < len; i++) {
                        var elem = this[i];
                        var instance = $.data(elem, namespace);
                        if (!instance) {
                            logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
                            continue;
                        }
                        if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
                            logError("no such method '" + options + "' for " + namespace + " instance");
                            continue;
                        }
                        var returnValue = instance[options].apply(instance, args);
                        if (returnValue !== undefined) {
                            return returnValue;
                        }
                    }
                    return this;
                } else {
                    return this.each(function() {
                        var instance = $.data(this, namespace);
                        if (instance) {
                            instance.option(options);
                            instance._init();
                        } else {
                            instance = new PluginClass(this, options);
                            $.data(this, namespace, instance);
                        }
                    });
                }
            };
        }
        $.bridget = function(namespace, PluginClass) {
            addOptionMethod(PluginClass);
            bridge(namespace, PluginClass);
        };
        return $.bridget;
    }
    if (typeof define === 'function' && define.amd) {
        define('jquery-bridget/jquery.bridget', ['jquery'], defineBridget);
    } else if (typeof exports === 'object') {
        defineBridget(require('jquery'));
    } else {
        defineBridget(window.jQuery);
    }
})(window);
/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */
(function(window) {
    function classReg(className) {
        return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
    }
    var hasClass, addClass, removeClass;
    if ('classList' in document.documentElement) {
        hasClass = function(elem, c) {
            return elem.classList.contains(c);
        };
        addClass = function(elem, c) {
            elem.classList.add(c);
        };
        removeClass = function(elem, c) {
            elem.classList.remove(c);
        };
    } else {
        hasClass = function(elem, c) {
            return classReg(c).test(elem.className);
        };
        addClass = function(elem, c) {
            if (!hasClass(elem, c)) {
                elem.className = elem.className + ' ' + c;
            }
        };
        removeClass = function(elem, c) {
            elem.className = elem.className.replace(classReg(c), ' ');
        };
    }

    function toggleClass(elem, c) {
        var fn = hasClass(elem, c) ? removeClass : addClass;
        fn(elem, c);
    }
    var classie = {
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        toggleClass: toggleClass,
        has: hasClass,
        add: addClass,
        remove: removeClass,
        toggle: toggleClass
    };
    if (typeof define === 'function' && define.amd) {
        define('classie/classie', classie);
    } else if (typeof exports === 'object') {
        module.exports = classie;
    } else {
        window.classie = classie;
    }
})(window);
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */
;
(function() {
    function EventEmitter() {}
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }
        return -1;
    }

    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        } else {
            response = events[evt] || (events[evt] = []);
        }
        return response;
    };
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;
        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }
        return flatListeners;
    };
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;
        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }
        return response || listeners;
    };
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }
        return this;
    };
    proto.on = alias('addListener');
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };
    proto.once = alias('addOnceListener');
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);
                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }
        return this;
    };
    proto.off = alias('removeListener');
    proto.addListeners = function addListeners(evt, listeners) {
        return this.manipulateListeners(false, evt, listeners);
    };
    proto.removeListeners = function removeListeners(evt, listeners) {
        return this.manipulateListeners(true, evt, listeners);
    };
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    } else {
                        multiple.call(this, i, value);
                    }
                }
            }
        } else {
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }
        return this;
    };
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;
        if (type === 'string') {
            delete events[evt];
        } else if (evt instanceof RegExp) {
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        } else {
            delete this._events;
        }
        return this;
    };
    proto.removeAllListeners = alias('removeEvent');
    proto.emitEvent = function emitEvent(evt, args) {
        var listeners = this.getListenersAsObject(evt);
        var listener;
        var i;
        var key;
        var response;
        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                i = listeners[key].length;
                while (i--) {
                    listener = listeners[key][i];
                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }
                    response = listener.listener.apply(this, args || []);
                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }
        return this;
    };
    proto.trigger = alias('emitEvent');
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        } else {
            return true;
        }
    };
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };
    if (typeof define === 'function' && define.amd) {
        define('eventEmitter/EventEmitter', [], function() {
            return EventEmitter;
        });
    } else if (typeof module === 'object' && module.exports) {
        module.exports = EventEmitter;
    } else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */
(function(window) {
    var docElem = document.documentElement;
    var bind = function() {};

    function getIEEvent(obj) {
        var event = window.event;
        event.target = event.target || event.srcElement || obj;
        return event;
    }
    if (docElem.addEventListener) {
        bind = function(obj, type, fn) {
            obj.addEventListener(type, fn, false);
        };
    } else if (docElem.attachEvent) {
        bind = function(obj, type, fn) {
            obj[type + fn] = fn.handleEvent ? function() {
                var event = getIEEvent(obj);
                fn.handleEvent.call(fn, event);
            } : function() {
                var event = getIEEvent(obj);
                fn.call(obj, event);
            };
            obj.attachEvent("on" + type, obj[type + fn]);
        };
    }
    var unbind = function() {};
    if (docElem.removeEventListener) {
        unbind = function(obj, type, fn) {
            obj.removeEventListener(type, fn, false);
        };
    } else if (docElem.detachEvent) {
        unbind = function(obj, type, fn) {
            obj.detachEvent("on" + type, obj[type + fn]);
            try {
                delete obj[type + fn];
            } catch (err) {
                obj[type + fn] = undefined;
            }
        };
    }
    var eventie = {
        bind: bind,
        unbind: unbind
    };
    if (typeof define === 'function' && define.amd) {
        define('eventie/eventie', eventie);
    } else if (typeof exports === 'object') {
        module.exports = eventie;
    } else {
        window.eventie = eventie;
    }
})(window);
/*!
 * getStyleProperty v1.0.4
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 * MIT license
 */
(function(window) {
    var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;

    function getStyleProperty(propName) {
        if (!propName) {
            return;
        }
        if (typeof docElemStyle[propName] === 'string') {
            return propName;
        }
        propName = propName.charAt(0).toUpperCase() + propName.slice(1);
        var prefixed;
        for (var i = 0, len = prefixes.length; i < len; i++) {
            prefixed = prefixes[i] + propName;
            if (typeof docElemStyle[prefixed] === 'string') {
                return prefixed;
            }
        }
    }
    if (typeof define === 'function' && define.amd) {
        define('get-style-property/get-style-property', [], function() {
            return getStyleProperty;
        });
    } else if (typeof exports === 'object') {
        module.exports = getStyleProperty;
    } else {
        window.getStyleProperty = getStyleProperty;
    }
})(window);
/*!
 * getSize v1.2.2
 * measure size of elements
 * MIT license
 */
(function(window, undefined) {
    function getStyleSize(value) {
        var num = parseFloat(value);
        var isValid = value.indexOf('%') === -1 && !isNaN(num);
        return isValid && num;
    }

    function noop() {}
    var logError = typeof console === 'undefined' ? noop : function(message) {
        console.error(message);
    };
    var measurements = ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom', 'borderLeftWidth', 'borderRightWidth', 'borderTopWidth', 'borderBottomWidth'];

    function getZeroSize() {
        var size = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        };
        for (var i = 0, len = measurements.length; i < len; i++) {
            var measurement = measurements[i];
            size[measurement] = 0;
        }
        return size;
    }

    function defineGetSize(getStyleProperty) {
        var isSetup = false;
        var getStyle, boxSizingProp, isBoxSizeOuter;

        function setup() {
            if (isSetup) {
                return;
            }
            isSetup = true;
            var getComputedStyle = window.getComputedStyle;
            getStyle = (function() {
                var getStyleFn = getComputedStyle ? function(elem) {
                    return getComputedStyle(elem, null);
                } : function(elem) {
                    return elem.currentStyle;
                };
                return function getStyle(elem) {
                    var style = getStyleFn(elem);
                    if (!style) {
                        logError('Style returned ' + style + '. Are you running this code in a hidden iframe on Firefox? ' + 'See http://bit.ly/getsizebug1');
                    }
                    return style;
                };
            })();
            boxSizingProp = getStyleProperty('boxSizing');
            if (boxSizingProp) {
                var div = document.createElement('div');
                div.style.width = '200px';
                div.style.padding = '1px 2px 3px 4px';
                div.style.borderStyle = 'solid';
                div.style.borderWidth = '1px 2px 3px 4px';
                div.style[boxSizingProp] = 'border-box';
                var body = document.body || document.documentElement;
                body.appendChild(div);
                var style = getStyle(div);
                isBoxSizeOuter = getStyleSize(style.width) === 200;
                body.removeChild(div);
            }
        }

        function getSize(elem) {
            setup();
            if (typeof elem === 'string') {
                elem = document.querySelector(elem);
            }
            if (!elem || typeof elem !== 'object' || !elem.nodeType) {
                return;
            }
            var style = getStyle(elem);
            if (style.display === 'none') {
                return getZeroSize();
            }
            var size = {};
            size.width = elem.offsetWidth;
            size.height = elem.offsetHeight;
            var isBorderBox = size.isBorderBox = !!(boxSizingProp && style[boxSizingProp] && style[boxSizingProp] === 'border-box');
            for (var i = 0, len = measurements.length; i < len; i++) {
                var measurement = measurements[i];
                var value = style[measurement];
                value = mungeNonPixel(elem, value);
                var num = parseFloat(value);
                size[measurement] = !isNaN(num) ? num : 0;
            }
            var paddingWidth = size.paddingLeft + size.paddingRight;
            var paddingHeight = size.paddingTop + size.paddingBottom;
            var marginWidth = size.marginLeft + size.marginRight;
            var marginHeight = size.marginTop + size.marginBottom;
            var borderWidth = size.borderLeftWidth + size.borderRightWidth;
            var borderHeight = size.borderTopWidth + size.borderBottomWidth;
            var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
            var styleWidth = getStyleSize(style.width);
            if (styleWidth !== false) {
                size.width = styleWidth +
                    (isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth);
            }
            var styleHeight = getStyleSize(style.height);
            if (styleHeight !== false) {
                size.height = styleHeight +
                    (isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight);
            }
            size.innerWidth = size.width - (paddingWidth + borderWidth);
            size.innerHeight = size.height - (paddingHeight + borderHeight);
            size.outerWidth = size.width + marginWidth;
            size.outerHeight = size.height + marginHeight;
            return size;
        }

        function mungeNonPixel(elem, value) {
            if (window.getComputedStyle || value.indexOf('%') === -1) {
                return value;
            }
            var style = elem.style;
            var left = style.left;
            var rs = elem.runtimeStyle;
            var rsLeft = rs && rs.left;
            if (rsLeft) {
                rs.left = elem.currentStyle.left;
            }
            style.left = value;
            value = style.pixelLeft;
            style.left = left;
            if (rsLeft) {
                rs.left = rsLeft;
            }
            return value;
        }
        return getSize;
    }
    if (typeof define === 'function' && define.amd) {
        define('get-size/get-size', ['get-style-property/get-style-property'], defineGetSize);
    } else if (typeof exports === 'object') {
        module.exports = defineGetSize(require('desandro-get-style-property'));
    } else {
        window.getSize = defineGetSize(window.getStyleProperty);
    }
})(window);
/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */
(function(window) {
    var document = window.document;
    var queue = [];

    function docReady(fn) {
        if (typeof fn !== 'function') {
            return;
        }
        if (docReady.isReady) {
            fn();
        } else {
            queue.push(fn);
        }
    }
    docReady.isReady = false;

    function onReady(event) {
        var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
        if (docReady.isReady || isIE8NotReady) {
            return;
        }
        trigger();
    }

    function trigger() {
        docReady.isReady = true;
        for (var i = 0, len = queue.length; i < len; i++) {
            var fn = queue[i];
            fn();
        }
    }

    function defineDocReady(eventie) {
        if (document.readyState === 'complete') {
            trigger();
        } else {
            eventie.bind(document, 'DOMContentLoaded', onReady);
            eventie.bind(document, 'readystatechange', onReady);
            eventie.bind(window, 'load', onReady);
        }
        return docReady;
    }
    if (typeof define === 'function' && define.amd) {
        define('doc-ready/doc-ready', ['eventie/eventie'], defineDocReady);
    } else if (typeof exports === 'object') {
        module.exports = defineDocReady(require('eventie'));
    } else {
        window.docReady = defineDocReady(window.eventie);
    }
})(window);
(function(ElemProto) {
    var matchesMethod = (function() {
        if (ElemProto.matchesSelector) {
            return 'matchesSelector';
        }
        var prefixes = ['webkit', 'moz', 'ms', 'o'];
        for (var i = 0, len = prefixes.length; i < len; i++) {
            var prefix = prefixes[i];
            var method = prefix + 'MatchesSelector';
            if (ElemProto[method]) {
                return method;
            }
        }
    })();

    function match(elem, selector) {
        return elem[matchesMethod](selector);
    }

    function checkParent(elem) {
        if (elem.parentNode) {
            return;
        }
        var fragment = document.createDocumentFragment();
        fragment.appendChild(elem);
    }

    function query(elem, selector) {
        checkParent(elem);
        var elems = elem.parentNode.querySelectorAll(selector);
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i] === elem) {
                return true;
            }
        }
        return false;
    }

    function matchChild(elem, selector) {
        checkParent(elem);
        return match(elem, selector);
    }
    var matchesSelector;
    if (matchesMethod) {
        var div = document.createElement('div');
        var supportsOrphans = match(div, 'div');
        matchesSelector = supportsOrphans ? match : matchChild;
    } else {
        matchesSelector = query;
    }
    if (typeof define === 'function' && define.amd) {
        define('matches-selector/matches-selector', [], function() {
            return matchesSelector;
        });
    } else if (typeof exports === 'object') {
        module.exports = matchesSelector;
    } else {
        window.matchesSelector = matchesSelector;
    }
})(Element.prototype);
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('fizzy-ui-utils/utils', ['doc-ready/doc-ready', 'matches-selector/matches-selector'], function(docReady, matchesSelector) {
            return factory(window, docReady, matchesSelector);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('doc-ready'), require('desandro-matches-selector'));
    } else {
        window.fizzyUIUtils = factory(window, window.docReady, window.matchesSelector);
    }
}(window, function factory(window, docReady, matchesSelector) {
    var utils = {};
    utils.extend = function(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    };
    utils.modulo = function(num, div) {
        return ((num % div) + div) % div;
    };
    var objToString = Object.prototype.toString;
    utils.isArray = function(obj) {
        return objToString.call(obj) == '[object Array]';
    };
    utils.makeArray = function(obj) {
        var ary = [];
        if (utils.isArray(obj)) {
            ary = obj;
        } else if (obj && typeof obj.length == 'number') {
            for (var i = 0, len = obj.length; i < len; i++) {
                ary.push(obj[i]);
            }
        } else {
            ary.push(obj);
        }
        return ary;
    };
    utils.indexOf = Array.prototype.indexOf ? function(ary, obj) {
        return ary.indexOf(obj);
    } : function(ary, obj) {
        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i] === obj) {
                return i;
            }
        }
        return -1;
    };
    utils.removeFrom = function(ary, obj) {
        var index = utils.indexOf(ary, obj);
        if (index != -1) {
            ary.splice(index, 1);
        }
    };
    utils.isElement = (typeof HTMLElement == 'function' || typeof HTMLElement == 'object') ? function isElementDOM2(obj) {
        return obj instanceof HTMLElement;
    } : function isElementQuirky(obj) {
        return obj && typeof obj == 'object' && obj.nodeType == 1 && typeof obj.nodeName == 'string';
    };
    utils.setText = (function() {
        var setTextProperty;

        function setText(elem, text) {
            setTextProperty = setTextProperty || (document.documentElement.textContent !== undefined ? 'textContent' : 'innerText');
            elem[setTextProperty] = text;
        }
        return setText;
    })();
    utils.getParent = function(elem, selector) {
        while (elem != document.body) {
            elem = elem.parentNode;
            if (matchesSelector(elem, selector)) {
                return elem;
            }
        }
    };
    utils.getQueryElement = function(elem) {
        if (typeof elem == 'string') {
            return document.querySelector(elem);
        }
        return elem;
    };
    utils.handleEvent = function(event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };
    utils.filterFindElements = function(elems, selector) {
        elems = utils.makeArray(elems);
        var ffElems = [];
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            if (!utils.isElement(elem)) {
                continue;
            }
            if (selector) {
                if (matchesSelector(elem, selector)) {
                    ffElems.push(elem);
                }
                var childElems = elem.querySelectorAll(selector);
                for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                    ffElems.push(childElems[j]);
                }
            } else {
                ffElems.push(elem);
            }
        }
        return ffElems;
    };
    utils.debounceMethod = function(_class, methodName, threshold) {
        var method = _class.prototype[methodName];
        var timeoutName = methodName + 'Timeout';
        _class.prototype[methodName] = function() {
            var timeout = this[timeoutName];
            if (timeout) {
                clearTimeout(timeout);
            }
            var args = arguments;
            var _this = this;
            this[timeoutName] = setTimeout(function() {
                method.apply(_this, args);
                delete _this[timeoutName];
            }, threshold || 100);
        };
    };
    var jQuery = window.jQuery;

    function toDashed(str) {
        return str.replace(/(.)([A-Z])/g, function(match, $1, $2) {
            return $1 + '-' + $2;
        }).toLowerCase();
    }
    var console = window.console;
    utils.htmlInit = function(WidgetClass, namespace) {
        docReady(function() {
            var dashedNamespace = toDashed(namespace);
            var elems = document.querySelectorAll('.js-' + dashedNamespace);
            var dataAttr = 'data-' + dashedNamespace + '-options';
            for (var i = 0, len = elems.length; i < len; i++) {
                var elem = elems[i];
                var attr = elem.getAttribute(dataAttr);
                var options;
                try {
                    options = attr && JSON.parse(attr);
                } catch (error) {
                    if (console) {
                        console.error('Error parsing ' + dataAttr + ' on ' +
                            elem.nodeName.toLowerCase() + (elem.id ? '#' + elem.id : '') + ': ' +
                            error);
                    }
                    continue;
                }
                var instance = new WidgetClass(elem, options);
                if (jQuery) {
                    jQuery.data(elem, namespace, instance);
                }
            }
        });
    };
    return utils;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/cell', ['get-size/get-size'], function(getSize) {
            return factory(window, getSize);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('get-size'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.Cell = factory(window, window.getSize);
    }
}(window, function factory(window, getSize) {
    function Cell(elem, parent) {
        this.element = elem;
        this.parent = parent;
        this.create();
    }
    var isIE8 = 'attachEvent' in window;
    Cell.prototype.create = function() {
        this.element.style.position = 'absolute';
        if (isIE8) {
            this.element.setAttribute('unselectable', 'on');
        }
        this.x = 0;
        this.shift = 0;
    };
    Cell.prototype.destroy = function() {
        this.element.style.position = '';
        var side = this.parent.originSide;
        this.element.style[side] = '';
    };
    Cell.prototype.getSize = function() {
        this.size = getSize(this.element);
    };
    Cell.prototype.setPosition = function(x) {
        this.x = x;
        this.setDefaultTarget();
        this.renderPosition(x);
    };
    Cell.prototype.setDefaultTarget = function() {
        var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
        this.target = this.x + this.size[marginProperty] +
            this.size.width * this.parent.cellAlign;
    };
    Cell.prototype.renderPosition = function(x) {
        var side = this.parent.originSide;
        this.element.style[side] = this.parent.getPositionValue(x);
    };
    Cell.prototype.wrapShift = function(shift) {
        this.shift = shift;
        this.renderPosition(this.x + this.parent.slideableWidth * shift);
    };
    Cell.prototype.remove = function() {
        this.element.parentNode.removeChild(this.element);
    };
    return Cell;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/animate', ['get-style-property/get-style-property', 'fizzy-ui-utils/utils'], function(getStyleProperty, utils) {
            return factory(window, getStyleProperty, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('desandro-get-style-property'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.animatePrototype = factory(window, window.getStyleProperty, window.fizzyUIUtils);
    }
}(window, function factory(window, getStyleProperty, utils) {
    var lastTime = 0;
    var prefixes = 'webkit moz ms o'.split(' ');
    var requestAnimationFrame = window.requestAnimationFrame;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    var prefix;
    for (var i = 0; i < prefixes.length; i++) {
        if (requestAnimationFrame && cancelAnimationFrame) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[prefix + 'RequestAnimationFrame'];
        cancelAnimationFrame = cancelAnimationFrame || window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
    }
    if (!requestAnimationFrame || !cancelAnimationFrame) {
        requestAnimationFrame = function(callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
        cancelAnimationFrame = function(id) {
            window.clearTimeout(id);
        };
    }
    var proto = {};
    proto.startAnimation = function() {
        if (this.isAnimating) {
            return;
        }
        this.isAnimating = true;
        this.restingFrames = 0;
        this.animate();
    };
    proto.animate = function() {
        this.applySelectedAttraction();
        var previousX = this.x;
        this.integratePhysics();
        this.positionSlider();
        this.settle(previousX);
        if (this.isAnimating) {
            var _this = this;
            requestAnimationFrame(function animateFrame() {
                _this.animate();
            });
        }
    };
    var transformProperty = getStyleProperty('transform');
    var is3d = !!getStyleProperty('perspective');
    proto.positionSlider = function() {
        var x = this.x;
        if (this.options.wrapAround && this.cells.length > 1) {
            x = utils.modulo(x, this.slideableWidth);
            x = x - this.slideableWidth;
            this.shiftWrapCells(x);
        }
        x = x + this.cursorPosition;
        x = this.options.rightToLeft && transformProperty ? -x : x;
        var value = this.getPositionValue(x);
        if (transformProperty) {
            this.slider.style[transformProperty] = is3d && this.isAnimating ? 'translate3d(' + value + ',0,0)' : 'translateX(' + value + ')';
        } else {
            this.slider.style[this.originSide] = value;
        }
    };
    proto.positionSliderAtSelected = function() {
        if (!this.cells.length) {
            return;
        }
        var selectedCell = this.cells[this.selectedIndex];
        this.x = -selectedCell.target;
        this.positionSlider();
    };
    proto.getPositionValue = function(position) {
        if (this.options.percentPosition) {
            return (Math.round((position / this.size.innerWidth) * 10000) * 0.01) + '%';
        } else {
            return Math.round(position) + 'px';
        }
    };
    proto.settle = function(previousX) {
        if (!this.isPointerDown && Math.round(this.x * 100) == Math.round(previousX * 100)) {
            this.restingFrames++;
        }
        if (this.restingFrames > 2) {
            this.isAnimating = false;
            delete this.isFreeScrolling;
            if (is3d) {
                this.positionSlider();
            }
            this.dispatchEvent('settle');
        }
    };
    proto.shiftWrapCells = function(x) {
        var beforeGap = this.cursorPosition + x;
        this._shiftCells(this.beforeShiftCells, beforeGap, -1);
        var afterGap = this.size.innerWidth - (x + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, afterGap, 1);
    };
    proto._shiftCells = function(cells, gap, shift) {
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            var cellShift = gap > 0 ? shift : 0;
            cell.wrapShift(cellShift);
            gap -= cell.size.outerWidth;
        }
    };
    proto._unshiftCells = function(cells) {
        if (!cells || !cells.length) {
            return;
        }
        for (var i = 0, len = cells.length; i < len; i++) {
            cells[i].wrapShift(0);
        }
    };
    proto.integratePhysics = function() {
        this.velocity += this.accel;
        this.x += this.velocity;
        this.velocity *= this.getFrictionFactor();
        this.accel = 0;
    };
    proto.applyForce = function(force) {
        this.accel += force;
    };
    proto.getFrictionFactor = function() {
        return 1 - this.options[this.isFreeScrolling ? 'freeScrollFriction' : 'friction'];
    };
    proto.getRestingPosition = function() {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
    };
    proto.applySelectedAttraction = function() {
        var len = this.cells.length;
        if (this.isPointerDown || this.isFreeScrolling || !len) {
            return;
        }
        var cell = this.cells[this.selectedIndex];
        var wrap = this.options.wrapAround && len > 1 ? this.slideableWidth * Math.floor(this.selectedIndex / len) : 0;
        var distance = (cell.target + wrap) * -1 - this.x;
        var force = distance * this.options.selectedAttraction;
        this.applyForce(force);
    };
    return proto;
}));
/*!
 * Flickity v1.0.0
 * Touch, responsive, flickable galleries
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://flickity.metafizzy.co
 * Copyright 2015 Metafizzy
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/flickity', ['classie/classie', 'eventEmitter/EventEmitter', 'eventie/eventie', 'get-size/get-size', 'fizzy-ui-utils/utils', './cell', './animate'], function(classie, EventEmitter, eventie, getSize, utils, Cell, animatePrototype) {
            return factory(window, classie, EventEmitter, eventie, getSize, utils, Cell, animatePrototype);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('desandro-classie'), require('wolfy87-eventemitter'), require('eventie'), require('get-size'), require('fizzy-ui-utils'), require('./cell'), require('./animate'));
    } else {
        var _Flickity = window.Flickity;
        window.Flickity = factory(window, window.classie, window.EventEmitter, window.eventie, window.getSize, window.fizzyUIUtils, _Flickity.Cell, _Flickity.animatePrototype);
    }
}(window, function factory(window, classie, EventEmitter, eventie, getSize, utils, Cell, animatePrototype) {
    var jQuery = window.jQuery;
    var getComputedStyle = window.getComputedStyle;
    var console = window.console;

    function moveElements(elems, toElem) {
        elems = utils.makeArray(elems);
        while (elems.length) {
            toElem.appendChild(elems.shift());
        }
    }
    var GUID = 0;
    var instances = {};

    function Flickity(element, options) {
        var queryElement = utils.getQueryElement(element);
        if (!queryElement) {
            if (console) {
                console.error('Bad element for Flickity: ' + (queryElement || element));
            }
            return;
        }
        this.element = queryElement;
        if (jQuery) {
            this.$element = jQuery(this.element);
        }
        this.options = utils.extend({}, this.constructor.defaults);
        this.option(options);
        this._create();
    }
    Flickity.defaults = {
        accessibility: true,
        cellAlign: 'center',
        freeScrollFriction: 0.075,
        friction: 0.28,
        percentPosition: true,
        resize: true,
        selectedAttraction: 0.025,
        setGallerySize: true,
        wrapAround: true
    };
    Flickity.createMethods = [];
    utils.extend(Flickity.prototype, EventEmitter.prototype);
    Flickity.prototype._create = function() {
        var id = this.guid = ++GUID;
        this.element.flickityGUID = id;
        instances[id] = this;
        this.selectedIndex = this.options.initialIndex || 0;
        this.restingFrames = 0;
        this.x = 0;
        this.velocity = 0;
        this.accel = 0;
        this.originSide = this.options.rightToLeft ? 'right' : 'left';
        this.viewport = document.createElement('div');
        this.viewport.className = 'flickity-viewport';
        Flickity.setUnselectable(this.viewport);
        this._createSlider();
        if (this.options.resize || this.options.watchCSS) {
            eventie.bind(window, 'resize', this);
            this.isResizeBound = true;
        }
        for (var i = 0, len = Flickity.createMethods.length; i < len; i++) {
            var method = Flickity.createMethods[i];
            this[method]();
        }
        if (this.options.watchCSS) {
            this.watchCSS();
        } else {
            this.activate();
        }
    };
    Flickity.prototype.option = function(opts) {
        utils.extend(this.options, opts);
    };
    Flickity.prototype.activate = function() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        classie.add(this.element, 'flickity-enabled');
        if (this.options.rightToLeft) {
            classie.add(this.element, 'flickity-rtl');
        }
        var cellElems = this._filterFindCellElements(this.element.children);
        moveElements(cellElems, this.slider);
        this.viewport.appendChild(this.slider);
        this.element.appendChild(this.viewport);
        this.getSize();
        this.reloadCells();
        this.setGallerySize();
        if (this.options.accessibility) {
            this.element.tabIndex = 0;
            eventie.bind(this.element, 'keydown', this);
        }
        this.emit('activate');
        this.positionSliderAtSelected();
        this.select(this.selectedIndex);
    };
    Flickity.prototype._createSlider = function() {
        var slider = document.createElement('div');
        slider.className = 'flickity-slider';
        slider.style[this.originSide] = 0;
        this.slider = slider;
    };
    Flickity.prototype._filterFindCellElements = function(elems) {
        return utils.filterFindElements(elems, this.options.cellSelector);
    };
    Flickity.prototype.reloadCells = function() {
        this.cells = this._makeCells(this.slider.children);
        this.positionCells();
        this._getWrapShiftCells();
        this.setGallerySize();
    };
    Flickity.prototype._makeCells = function(elems) {
        var cellElems = this._filterFindCellElements(elems);
        var cells = [];
        for (var i = 0, len = cellElems.length; i < len; i++) {
            var elem = cellElems[i];
            var cell = new Cell(elem, this);
            cells.push(cell);
        }
        return cells;
    };
    Flickity.prototype.getLastCell = function() {
        return this.cells[this.cells.length - 1];
    };
    Flickity.prototype.positionCells = function() {
        this._sizeCells(this.cells);
        this._positionCells(0);
    };
    Flickity.prototype._positionCells = function(index) {
        this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
        var cellX = 0;
        if (index > 0) {
            var startCell = this.cells[index - 1];
            cellX = startCell.x + startCell.size.outerWidth;
        }
        var cell;
        for (var len = this.cells.length, i = index; i < len; i++) {
            cell = this.cells[i];
            cell.setPosition(cellX);
            cellX += cell.size.outerWidth;
            this.maxCellHeight = Math.max(cell.size.outerHeight, this.maxCellHeight);
        }
        this.slideableWidth = cellX;
        this._containCells();
    };
    Flickity.prototype._sizeCells = function(cells) {
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            cell.getSize();
        }
    };
    Flickity.prototype._init = Flickity.prototype.reposition = function() {
        this.positionCells();
        this.positionSliderAtSelected();
    };
    Flickity.prototype.getSize = function() {
        this.size = getSize(this.element);
        this.setCellAlign();
        this.cursorPosition = this.size.innerWidth * this.cellAlign;
    };
    var cellAlignShorthands = {
        center: {
            left: 0.5,
            right: 0.5
        },
        left: {
            left: 0,
            right: 1
        },
        right: {
            right: 0,
            left: 1
        }
    };
    Flickity.prototype.setCellAlign = function() {
        var shorthand = cellAlignShorthands[this.options.cellAlign];
        this.cellAlign = shorthand ? shorthand[this.originSide] : this.options.cellAlign;
    };
    Flickity.prototype.setGallerySize = function() {
        if (this.options.setGallerySize) {
            this.viewport.style.height = this.maxCellHeight + 'px';
        }
    };
    Flickity.prototype._getWrapShiftCells = function() {
        if (!this.options.wrapAround) {
            return;
        }
        this._unshiftCells(this.beforeShiftCells);
        this._unshiftCells(this.afterShiftCells);
        var gapX = this.cursorPosition;
        var cellIndex = this.cells.length - 1;
        this.beforeShiftCells = this._getGapCells(gapX, cellIndex, -1);
        gapX = this.size.innerWidth - this.cursorPosition;
        this.afterShiftCells = this._getGapCells(gapX, 0, 1);
    };
    Flickity.prototype._getGapCells = function(gapX, cellIndex, increment) {
        var cells = [];
        while (gapX > 0) {
            var cell = this.cells[cellIndex];
            if (!cell) {
                break;
            }
            cells.push(cell);
            cellIndex += increment;
            gapX -= cell.size.outerWidth;
        }
        return cells;
    };
    Flickity.prototype._containCells = function() {
        if (!this.options.contain || this.options.wrapAround || !this.cells.length) {
            return;
        }
        var startMargin = this.options.rightToLeft ? 'marginRight' : 'marginLeft';
        var endMargin = this.options.rightToLeft ? 'marginLeft' : 'marginRight';
        var firstCellStartMargin = this.cells[0].size[startMargin];
        var lastCell = this.getLastCell();
        var contentWidth = this.slideableWidth - lastCell.size[endMargin];
        var endLimit = contentWidth - this.size.innerWidth * (1 - this.cellAlign);
        var isContentSmaller = contentWidth < this.size.innerWidth;
        for (var i = 0, len = this.cells.length; i < len; i++) {
            var cell = this.cells[i];
            cell.setDefaultTarget();
            if (isContentSmaller) {
                cell.target = contentWidth * this.cellAlign;
            } else {
                cell.target = Math.max(cell.target, this.cursorPosition + firstCellStartMargin);
                cell.target = Math.min(cell.target, endLimit);
            }
        }
    };
    Flickity.prototype.dispatchEvent = function(type, event, args) {
        var emitArgs = [event].concat(args);
        this.emitEvent(type, emitArgs);
        if (jQuery && this.$element) {
            if (event) {
                var $event = jQuery.Event(event);
                $event.type = type;
                this.$element.trigger($event, args);
            } else {
                this.$element.trigger(type, args);
            }
        }
    };
    Flickity.prototype.select = function(index, isWrap) {
        if (!this.isActive) {
            return;
        }
        var len = this.cells.length;
        if (this.options.wrapAround && len > 1) {
            if (index < 0) {
                this.x -= this.slideableWidth;
            } else if (index >= len) {
                this.x += this.slideableWidth;
            }
        }
        if (this.options.wrapAround || isWrap) {
            index = utils.modulo(index, len);
        }
        if (this.cells[index]) {
            this.selectedIndex = index;
            this.setSelectedCell();
            this.startAnimation();
            this.dispatchEvent('cellSelect');
        }
    };
    Flickity.prototype.previous = function(isWrap) {
        this.select(this.selectedIndex - 1, isWrap);
    };
    Flickity.prototype.next = function(isWrap) {
        this.select(this.selectedIndex + 1, isWrap);
    };
    Flickity.prototype.setSelectedCell = function() {
        this._removeSelectedCellClass();
        this.selectedCell = this.cells[this.selectedIndex];
        this.selectedElement = this.selectedCell.element;
        classie.add(this.selectedElement, 'is-selected');
    };
    Flickity.prototype._removeSelectedCellClass = function() {
        if (this.selectedCell) {
            classie.remove(this.selectedCell.element, 'is-selected');
        }
    };
    Flickity.prototype.getCell = function(elem) {
        for (var i = 0, len = this.cells.length; i < len; i++) {
            var cell = this.cells[i];
            if (cell.element == elem) {
                return cell;
            }
        }
    };
    Flickity.prototype.getCells = function(elems) {
        elems = utils.makeArray(elems);
        var cells = [];
        for (var i = 0, len = elems.length; i < len; i++) {
            var elem = elems[i];
            var cell = this.getCell(elem);
            if (cell) {
                cells.push(cell);
            }
        }
        return cells;
    };
    Flickity.prototype.getCellElements = function() {
        var cellElems = [];
        for (var i = 0, len = this.cells.length; i < len; i++) {
            cellElems.push(this.cells[i].element);
        }
        return cellElems;
    };
    Flickity.prototype.getParentCell = function(elem) {
        var cell = this.getCell(elem);
        if (cell) {
            return cell;
        }
        elem = utils.getParent(elem, '.flickity-slider > *');
        return this.getCell(elem);
    };
    Flickity.prototype.uiChange = function() {
        this.emit('uiChange');
    };
    Flickity.prototype.childUIPointerDown = function(event) {
        this.emitEvent('childUIPointerDown', [event]);
    };
    Flickity.prototype.onresize = function() {
        this.watchCSS();
        this.resize();
    };
    utils.debounceMethod(Flickity, 'onresize', 150);
    Flickity.prototype.resize = function() {
        if (!this.isActive) {
            return;
        }
        this.getSize();
        if (this.options.wrapAround) {
            this.x = utils.modulo(this.x, this.slideableWidth);
        }
        this.positionCells();
        this._getWrapShiftCells();
        this.setGallerySize();
        this.positionSliderAtSelected();
    };
    var supportsConditionalCSS = Flickity.supportsConditionalCSS = (function() {
        var supports;
        return function checkSupport() {
            if (supports !== undefined) {
                return supports;
            }
            if (!getComputedStyle) {
                supports = false;
                return;
            }
            var style = document.createElement('style');
            var cssText = document.createTextNode('body:after { content: "foo"; display: none; }');
            style.appendChild(cssText);
            document.head.appendChild(style);
            var afterContent = getComputedStyle(document.body, ':after').content;
            supports = afterContent.indexOf('foo') != -1;
            document.head.removeChild(style);
            return supports;
        };
    })();
    Flickity.prototype.watchCSS = function() {
        var watchOption = this.options.watchCSS;
        if (!watchOption) {
            return;
        }
        var supports = supportsConditionalCSS();
        if (!supports) {
            var method = watchOption == 'fallbackOn' ? 'activate' : 'deactivate';
            this[method]();
            return;
        }
        var afterContent = getComputedStyle(this.element, ':after').content;
        if (afterContent.indexOf('flickity') != -1) {
            this.activate();
        } else {
            this.deactivate();
        }
    };
    Flickity.prototype.onkeydown = function(event) {
        if (!this.options.accessibility || (document.activeElement && document.activeElement != this.element)) {
            return;
        }
        if (event.keyCode == 37) {
            var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
            this.uiChange();
            this[leftMethod]();
        } else if (event.keyCode == 39) {
            var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
            this.uiChange();
            this[rightMethod]();
        }
    };
    Flickity.prototype.deactivate = function() {
        if (!this.isActive) {
            return;
        }
        classie.remove(this.element, 'flickity-enabled');
        classie.remove(this.element, 'flickity-rtl');
        for (var i = 0, len = this.cells.length; i < len; i++) {
            var cell = this.cells[i];
            cell.destroy();
        }
        this._removeSelectedCellClass();
        this.element.removeChild(this.viewport);
        moveElements(this.slider.children, this.element);
        if (this.options.accessibility) {
            this.element.removeAttribute('tabIndex');
            eventie.unbind(this.element, 'keydown', this);
        }
        this.isActive = false;
        this.emit('deactivate');
    };
    Flickity.prototype.destroy = function() {
        this.deactivate();
        if (this.isResizeBound) {
            eventie.unbind(window, 'resize', this);
        }
        this.emit('destroy');
        if (jQuery && this.$element) {
            jQuery.removeData(this.element, 'flickity');
        }
        delete this.element.flickityGUID;
        delete instances[this.guid];
    };
    utils.extend(Flickity.prototype, animatePrototype);
    var isIE8 = 'attachEvent' in window;
    Flickity.setUnselectable = function(elem) {
        if (!isIE8) {
            return;
        }
        elem.setAttribute('unselectable', 'on');
    };
    Flickity.data = function(elem) {
        elem = utils.getQueryElement(elem);
        var id = elem && elem.flickityGUID;
        return id && instances[id];
    };
    utils.htmlInit(Flickity, 'flickity');
    if (jQuery && jQuery.bridget) {
        jQuery.bridget('flickity', Flickity);
    }
    Flickity.Cell = Cell;
    return Flickity;
}));
/*!
 * Unipointer v1.0.0
 * base class for doing one thing with pointer event
 * MIT license
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('unipointer/unipointer', ['eventEmitter/EventEmitter', 'eventie/eventie'], function(EventEmitter, eventie) {
            return factory(window, EventEmitter, eventie);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('wolfy87-eventemitter'), require('eventie'));
    } else {
        window.Unipointer = factory(window, window.EventEmitter, window.eventie);
    }
}(window, function factory(window, EventEmitter, eventie) {
    function noop() {}

    function Unipointer() {}
    Unipointer.prototype = new EventEmitter();
    Unipointer.prototype.bindStartEvent = function(elem) {
        this._bindStartEvent(elem, true);
    };
    Unipointer.prototype.unbindStartEvent = function(elem) {
        this._bindStartEvent(elem, false);
    };
    Unipointer.prototype._bindStartEvent = function(elem, isBind) {
        isBind = isBind === undefined ? true : !!isBind;
        var bindMethod = isBind ? 'bind' : 'unbind';
        if (window.navigator.pointerEnabled) {
            eventie[bindMethod](elem, 'pointerdown', this);
        } else if (window.navigator.msPointerEnabled) {
            eventie[bindMethod](elem, 'MSPointerDown', this);
        } else {
            eventie[bindMethod](elem, 'mousedown', this);
            eventie[bindMethod](elem, 'touchstart', this);
        }
    };
    Unipointer.prototype.handleEvent = function(event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };
    Unipointer.prototype.getTouch = function(touches) {
        for (var i = 0, len = touches.length; i < len; i++) {
            var touch = touches[i];
            if (touch.identifier == this.pointerIdentifier) {
                return touch;
            }
        }
    };
    Unipointer.prototype.onmousedown = function(event) {
        var button = event.button;
        if (button && (button !== 0 && button !== 1)) {
            return;
        }
        this._pointerDown(event, event);
    };
    Unipointer.prototype.ontouchstart = function(event) {
        this._pointerDown(event, event.changedTouches[0]);
    };
    Unipointer.prototype.onMSPointerDown = Unipointer.prototype.onpointerdown = function(event) {
        this._pointerDown(event, event);
    };
    Unipointer.prototype._pointerDown = function(event, pointer) {
        if (this.isPointerDown) {
            return;
        }
        this.isPointerDown = true;
        this.pointerIdentifier = pointer.pointerId !== undefined ? pointer.pointerId : pointer.identifier;
        this.pointerDown(event, pointer);
    };
    Unipointer.prototype.pointerDown = function(event, pointer) {
        this._bindPostStartEvents(event);
        this.emitEvent('pointerDown', [this, event, pointer]);
    };
    var postStartEvents = {
        mousedown: ['mousemove', 'mouseup'],
        touchstart: ['touchmove', 'touchend', 'touchcancel'],
        pointerdown: ['pointermove', 'pointerup', 'pointercancel'],
        MSPointerDown: ['MSPointerMove', 'MSPointerUp', 'MSPointerCancel']
    };
    Unipointer.prototype._bindPostStartEvents = function(event) {
        if (!event) {
            return;
        }
        var events = postStartEvents[event.type];
        var node = event.preventDefault ? window : document;
        for (var i = 0, len = events.length; i < len; i++) {
            var evnt = events[i];
            eventie.bind(node, evnt, this);
        }
        this._boundPointerEvents = {
            events: events,
            node: node
        };
    };
    Unipointer.prototype._unbindPostStartEvents = function() {
        var args = this._boundPointerEvents;
        if (!args || !args.events) {
            return;
        }
        for (var i = 0, len = args.events.length; i < len; i++) {
            var event = args.events[i];
            eventie.unbind(args.node, event, this);
        }
        delete this._boundPointerEvents;
    };
    Unipointer.prototype.onmousemove = function(event) {
        this._pointerMove(event, event);
    };
    Unipointer.prototype.onMSPointerMove = Unipointer.prototype.onpointermove = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
            this._pointerMove(event, event);
        }
    };
    Unipointer.prototype.ontouchmove = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
            this._pointerMove(event, touch);
        }
    };
    Unipointer.prototype._pointerMove = function(event, pointer) {
        this.pointerMove(event, pointer);
    };
    Unipointer.prototype.pointerMove = function(event, pointer) {
        this.emitEvent('pointerMove', [this, event, pointer]);
    };
    Unipointer.prototype.onmouseup = function(event) {
        this._pointerUp(event, event);
    };
    Unipointer.prototype.onMSPointerUp = Unipointer.prototype.onpointerup = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
            this._pointerUp(event, event);
        }
    };
    Unipointer.prototype.ontouchend = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
            this._pointerUp(event, touch);
        }
    };
    Unipointer.prototype._pointerUp = function(event, pointer) {
        this._pointerDone();
        this.pointerUp(event, pointer);
    };
    Unipointer.prototype.pointerUp = function(event, pointer) {
        this.emitEvent('pointerUp', [this, event, pointer]);
    };
    Unipointer.prototype._pointerDone = function() {
        this.isPointerDown = false;
        delete this.pointerIdentifier;
        this._unbindPostStartEvents();
        this.pointerDone();
    };
    Unipointer.prototype.pointerDone = noop;
    Unipointer.prototype.onMSPointerCancel = Unipointer.prototype.onpointercancel = function(event) {
        if (event.pointerId == this.pointerIdentifier) {
            this._pointerCancel(event, event);
        }
    };
    Unipointer.prototype.ontouchcancel = function(event) {
        var touch = this.getTouch(event.changedTouches);
        if (touch) {
            this._pointerCancel(event, touch);
        }
    };
    Unipointer.prototype._pointerCancel = function(event, pointer) {
        this._pointerDone();
        this.pointerCancel(event, pointer);
    };
    Unipointer.prototype.pointerCancel = function(event, pointer) {
        this.emitEvent('pointerCancel', [this, event, pointer]);
    };
    Unipointer.getPointerPoint = function(pointer) {
        return {
            x: pointer.pageX !== undefined ? pointer.pageX : pointer.clientX,
            y: pointer.pageY !== undefined ? pointer.pageY : pointer.clientY
        };
    };
    return Unipointer;
}));
/*!
 * Unidragger v1.0.0
 * Draggable base class
 * MIT license
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('unidragger/unidragger', ['eventie/eventie', 'unipointer/unipointer'], function(eventie, Unipointer) {
            return factory(window, eventie, Unipointer);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('eventie'), require('unipointer'));
    } else {
        window.Unidragger = factory(window, window.eventie, window.Unipointer);
    }
}(window, function factory(window, eventie, Unipointer) {
    function noop() {}

    function preventDefaultEvent(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    function getParentLink(elem) {
        while (elem != document.body) {
            elem = elem.parentNode;
            if (elem.nodeName == 'A') {
                return elem;
            }
        }
    }

    function Unidragger() {}
    Unidragger.prototype = new Unipointer();
    Unidragger.prototype.bindHandles = function() {
        this._bindHandles(true);
    };
    Unidragger.prototype.unbindHandles = function() {
        this._bindHandles(false);
    };
    var navigator = window.navigator;
    Unidragger.prototype._bindHandles = function(isBind) {
        isBind = isBind === undefined ? true : !!isBind;
        var binderExtra;
        if (navigator.pointerEnabled) {
            binderExtra = function(handle) {
                handle.style.touchAction = isBind ? 'none' : '';
            };
        } else if (navigator.msPointerEnabled) {
            binderExtra = function(handle) {
                handle.style.msTouchAction = isBind ? 'none' : '';
            };
        } else {
            binderExtra = function() {
                if (isBind) {
                    disableImgOndragstart(handle);
                }
            };
        }
        var bindMethod = isBind ? 'bind' : 'unbind';
        for (var i = 0, len = this.handles.length; i < len; i++) {
            var handle = this.handles[i];
            this._bindStartEvent(handle, isBind);
            binderExtra(handle);
            eventie[bindMethod](handle, 'click', this);
        }
    };

    function noDragStart() {
        return false;
    }
    var isIE8 = 'attachEvent' in document.documentElement;
    var disableImgOndragstart = !isIE8 ? noop : function(handle) {
        if (handle.nodeName == 'IMG') {
            handle.ondragstart = noDragStart;
        }
        var images = handle.querySelectorAll('img');
        for (var i = 0, len = images.length; i < len; i++) {
            var img = images[i];
            img.ondragstart = noDragStart;
        }
    };
    var allowTouchstartNodes = Unidragger.allowTouchstartNodes = {
        INPUT: true,
        A: true,
        BUTTON: true,
        SELECT: true
    };
    Unidragger.prototype.pointerDown = function(event, pointer) {
        this._dragPointerDown(event, pointer);
        var focused = document.activeElement;
        if (focused && focused.blur) {
            focused.blur();
        }
        this._bindPostStartEvents(event);
        this.emitEvent('pointerDown', [this, event, pointer]);
    };
    Unidragger.prototype._dragPointerDown = function(event, pointer) {
        this.pointerDownPoint = Unipointer.getPointerPoint(pointer);
        var targetNodeName = event.target.nodeName;
        var isTouchstartNode = event.type == 'touchstart' && (allowTouchstartNodes[targetNodeName] || getParentLink(event.target));
        if (!isTouchstartNode && targetNodeName != 'SELECT') {
            preventDefaultEvent(event);
        }
    };
    Unidragger.prototype.pointerMove = function(event, pointer) {
        var moveVector = this._dragPointerMove(event, pointer);
        this.emitEvent('pointerMove', [this, event, pointer, moveVector]);
        this._dragMove(event, pointer, moveVector);
    };
    Unidragger.prototype._dragPointerMove = function(event, pointer) {
        var movePoint = Unipointer.getPointerPoint(pointer);
        var moveVector = {
            x: movePoint.x - this.pointerDownPoint.x,
            y: movePoint.y - this.pointerDownPoint.y
        };
        if (!this.isDragging && this.hasDragStarted(moveVector)) {
            this._dragStart(event, pointer);
        }
        return moveVector;
    };
    Unidragger.prototype.hasDragStarted = function(moveVector) {
        return Math.abs(moveVector.x) > 3 || Math.abs(moveVector.y) > 3;
    };
    Unidragger.prototype.pointerUp = function(event, pointer) {
        this.emitEvent('pointerUp', [this, event, pointer]);
        this._dragPointerUp(event, pointer);
    };
    Unidragger.prototype._dragPointerUp = function(event, pointer) {
        if (this.isDragging) {
            this._dragEnd(event, pointer);
        } else {
            this._staticClick(event, pointer);
        }
    };
    Unidragger.prototype._dragStart = function(event, pointer) {
        this.isDragging = true;
        this.dragStartPoint = Unidragger.getPointerPoint(pointer);
        this.isPreventingClicks = true;
        this.dragStart(event, pointer);
    };
    Unidragger.prototype.dragStart = function(event, pointer) {
        this.emitEvent('dragStart', [this, event, pointer]);
    };
    Unidragger.prototype._dragMove = function(event, pointer, moveVector) {
        if (!this.isDragging) {
            return;
        }
        this.dragMove(event, pointer, moveVector);
    };
    Unidragger.prototype.dragMove = function(event, pointer, moveVector) {
        this.emitEvent('dragMove', [this, event, pointer, moveVector]);
    };
    Unidragger.prototype._dragEnd = function(event, pointer) {
        this.isDragging = false;
        var _this = this;
        setTimeout(function() {
            delete _this.isPreventingClicks;
        });
        this.dragEnd(event, pointer);
    };
    Unidragger.prototype.dragEnd = function(event, pointer) {
        this.emitEvent('dragEnd', [this, event, pointer]);
    };
    Unidragger.prototype.onclick = function(event) {
        if (this.isPreventingClicks) {
            preventDefaultEvent(event);
        }
    };
    Unidragger.prototype._staticClick = function(event, pointer) {
        if (event.target.nodeName == 'INPUT' && event.target.type == 'text') {
            event.target.focus();
        }
        this.staticClick(event, pointer);
    };
    Unidragger.prototype.staticClick = function(event, pointer) {
        this.emitEvent('staticClick', [this, event, pointer]);
    };
    Unidragger.getPointerPoint = function(pointer) {
        return {
            x: pointer.pageX !== undefined ? pointer.pageX : pointer.clientX,
            y: pointer.pageY !== undefined ? pointer.pageY : pointer.clientY
        };
    };
    Unidragger.getPointerPoint = Unipointer.getPointerPoint;
    return Unidragger;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/drag', ['classie/classie', 'eventie/eventie', './flickity', 'unidragger/unidragger', 'fizzy-ui-utils/utils'], function(classie, eventie, Flickity, Unidragger, utils) {
            return factory(window, classie, eventie, Flickity, Unidragger, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('desandro-classie'), require('eventie'), require('./flickity'), require('unidragger'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.dragPrototype = factory(window, window.classie, window.eventie, window.Flickity, window.Unidragger, window.fizzyUIUtils);
    }
}(window, function factory(window, classie, eventie, Flickity, Unidragger, utils) {
    function preventDefaultEvent(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
    utils.extend(Flickity.defaults, {
        draggable: true,
        touchVerticalScroll: true
    });
    Flickity.createMethods.push('_createDrag');
    var proto = {};
    utils.extend(proto, Unidragger.prototype);
    proto._createDrag = function() {
        this.on('activate', this.bindDrag);
        this.on('uiChange', this._uiChangeDrag);
        this.on('childUIPointerDown', this._childUIPointerDownDrag);
        this.on('deactivate', this.unbindDrag);
    };
    proto.bindDrag = function() {
        if (!this.options.draggable || this.isDragBound) {
            return;
        }
        classie.add(this.element, 'is-draggable');
        this.handles = [this.viewport];
        this.bindHandles();
        this.isDragBound = true;
    };
    proto.unbindDrag = function() {
        if (!this.isDragBound) {
            return;
        }
        classie.remove(this.element, 'is-draggable');
        this.unbindHandles();
        delete this.isDragBound;
    };
    proto.hasDragStarted = function(moveVector) {
        return Math.abs(moveVector.x) > 3;
    };
    proto._uiChangeDrag = function() {
        delete this.isFreeScrolling;
    };
    proto._childUIPointerDownDrag = function(event) {
        preventDefaultEvent(event);
        this.pointerDownFocus(event);
    };
    proto.pointerDown = function(event, pointer) {
        this._dragPointerDown(event, pointer);
        var focused = document.activeElement;
        if (focused && focused.blur && focused != this.element) {
            focused.blur();
        }
        this.pointerDownFocus(event);
        this.velocity = 0;
        classie.add(this.viewport, 'is-pointer-down');
        this._bindPostStartEvents(event);
        this.dispatchEvent('pointerDown', event, [pointer]);
    };
    var touchStartEvents = {
        touchstart: true,
        MSPointerDown: true
    };
    var focusNodes = {
        INPUT: true,
        SELECT: true
    };
    proto.pointerDownFocus = function(event) {
        if (this.options.accessibility && !touchStartEvents[event.type] && !focusNodes[event.target.nodeName]) {
            this.element.focus();
        }
    };
    proto.pointerMove = function(event, pointer) {
        var moveVector = this._dragPointerMove(event, pointer);
        this.touchVerticalScrollMove(event, pointer, moveVector);
        this._dragMove(event, pointer, moveVector);
        this.dispatchEvent('pointerMove', event, [pointer, moveVector]);
    };
    proto.pointerUp = function(event, pointer) {
        delete this.isTouchScrolling;
        classie.remove(this.viewport, 'is-pointer-down');
        this.dispatchEvent('pointerUp', event, [pointer]);
        this._dragPointerUp(event, pointer);
    };
    var touchScrollEvents = {
        touchmove: true,
        MSPointerMove: true
    };

    function getPointerWindowY(pointer) {
        var pointerPoint = Unidragger.getPointerPoint(pointer);
        return pointerPoint.y - window.pageYOffset;
    }
    proto.touchVerticalScrollMove = function(event, pointer, moveVector) {
        if (!this.options.touchVerticalScroll || !touchScrollEvents[event.type]) {
            return;
        }
        if (!this.isTouchScrolling && Math.abs(moveVector.y) > 16) {
            this.startScrollY = window.pageYOffset;
            this.pointerWindowStartY = getPointerWindowY(pointer);
            this.isTouchScrolling = true;
        }
        if (!this.isTouchScrolling) {
            return;
        }
        var scrollDelta = this.pointerWindowStartY - getPointerWindowY(pointer);
        var scrollY = this.startScrollY + scrollDelta;
        window.scroll(window.pageXOffset, scrollY);
    };
    proto.dragStart = function(event, pointer) {
        this.dragStartPosition = this.x;
        this.startAnimation();
        this.dispatchEvent('dragStart', event, [pointer]);
    };
    proto.dragMove = function(event, pointer, moveVector) {
        this.previousDragX = this.x;
        var movedX = moveVector.x;
        var direction = this.options.rightToLeft ? -1 : 1;
        this.x = this.dragStartPosition + movedX * direction;
        if (!this.options.wrapAround && this.cells.length) {
            var originBound = Math.max(-this.cells[0].target, this.dragStartPosition);
            this.x = this.x > originBound ? (this.x - originBound) * 0.5 + originBound : this.x;
            var endBound = Math.min(-this.getLastCell().target, this.dragStartPosition);
            this.x = this.x < endBound ? (this.x - endBound) * 0.5 + endBound : this.x;
        }
        this.previousDragMoveTime = this.dragMoveTime;
        this.dragMoveTime = new Date();
        this.dispatchEvent('dragMove', event, [pointer, moveVector]);
    };
    proto.dragEnd = function(event, pointer) {
        this.dragEndFlick();
        if (this.options.freeScroll) {
            this.isFreeScrolling = true;
        }
        var index = this.dragEndRestingSelect();
        if (this.options.freeScroll && !this.options.wrapAround) {
            var restingX = this.getRestingPosition();
            this.isFreeScrolling = -restingX > this.cells[0].target && -restingX < this.getLastCell().target;
        } else if (!this.options.freeScroll && index == this.selectedIndex) {
            index += this.dragEndBoostSelect();
        }
        this.select(index);
        this.dispatchEvent('dragEnd', event, [pointer]);
    };
    proto.dragEndFlick = function() {
        if (!isFinite(this.previousDragX)) {
            return;
        }
        var timeDelta = this.dragMoveTime - this.previousDragMoveTime;
        if (timeDelta) {
            timeDelta /= 1000 / 60;
            var xDelta = this.x - this.previousDragX;
            this.velocity = xDelta / timeDelta;
        }
        delete this.previousDragX;
    };
    proto.dragEndRestingSelect = function() {
        var restingX = this.getRestingPosition();
        var distance = Math.abs(this.getCellDistance(-restingX, this.selectedIndex));
        var positiveResting = this._getClosestResting(restingX, distance, 1);
        var negativeResting = this._getClosestResting(restingX, distance, -1);
        var index = positiveResting.distance < negativeResting.distance ? positiveResting.index : negativeResting.index;
        if (this.options.contain && !this.options.wrapAround) {
            index = Math.abs(index - this.selectedIndex) <= 1 ? this.selectedIndex : index;
        }
        return index;
    };
    proto._getClosestResting = function(restingX, distance, increment) {
        var index = this.selectedIndex;
        var minDistance = Infinity;
        var condition = this.options.contain && !this.options.wrapAround ? function(d, md) {
            return d <= md;
        } : function(d, md) {
            return d < md;
        };
        while (condition(distance, minDistance)) {
            index += increment;
            minDistance = distance;
            distance = this.getCellDistance(-restingX, index);
            if (distance === null) {
                break;
            }
            distance = Math.abs(distance);
        }
        return {
            distance: minDistance,
            index: index - increment
        };
    };
    proto.getCellDistance = function(x, index) {
        var len = this.cells.length;
        var isWrapAround = this.options.wrapAround && len > 1;
        var cellIndex = isWrapAround ? utils.modulo(index, len) : index;
        var cell = this.cells[cellIndex];
        if (!cell) {
            return null;
        }
        var wrap = isWrapAround ? this.slideableWidth * Math.floor(index / len) : 0;
        return x - (cell.target + wrap);
    };
    proto.dragEndBoostSelect = function() {
        var distance = this.getCellDistance(-this.x, this.selectedIndex);
        if (distance > 0 && this.velocity < -1) {
            return 1;
        } else if (distance < 0 && this.velocity > 1) {
            return -1;
        }
        return 0;
    };
    proto.staticClick = function(event, pointer) {
        var clickedCell = this.getParentCell(event.target);
        var cellElem = clickedCell && clickedCell.element;
        var cellIndex = clickedCell && utils.indexOf(this.cells, clickedCell);
        this.dispatchEvent('staticClick', event, [pointer, cellElem, cellIndex]);
    };
    utils.extend(Flickity.prototype, proto);
    return Flickity;
}));
/*!
 * Tap listener v1.0.0
 * listens to taps
 * MIT license
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('tap-listener/tap-listener', ['unipointer/unipointer'], function(Unipointer) {
            return factory(window, Unipointer);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('unipointer'));
    } else {
        window.TapListener = factory(window, window.Unipointer);
    }
}(window, function factory(window, Unipointer) {
    function TapListener(elem) {
        this.bindTap(elem);
    }
    TapListener.prototype = new Unipointer();
    TapListener.prototype.bindTap = function(elem) {
        if (!elem) {
            return;
        }
        this.unbindTap();
        this.tapElement = elem;
        this._bindStartEvent(elem, true);
    };
    TapListener.prototype.unbindTap = function() {
        if (!this.tapElement) {
            return;
        }
        this._bindStartEvent(this.tapElement, true);
        delete this.tapElement;
    };
    var isPageOffset = window.pageYOffset !== undefined;
    TapListener.prototype.pointerUp = function(event, pointer) {
        var pointerPoint = Unipointer.getPointerPoint(pointer);
        var boundingRect = this.tapElement.getBoundingClientRect();
        var scrollX = isPageOffset ? window.pageXOffset : document.body.scrollLeft;
        var scrollY = isPageOffset ? window.pageYOffset : document.body.scrollTop;
        var isInside = pointerPoint.x >= boundingRect.left + scrollX && pointerPoint.x <= boundingRect.right + scrollX && pointerPoint.y >= boundingRect.top + scrollY && pointerPoint.y <= boundingRect.bottom + scrollY;
        if (isInside) {
            this.emitEvent('tap', [this, event, pointer]);
        }
    };
    TapListener.prototype.destroy = function() {
        this.pointerDone();
        this.unbindTap();
    };
    return TapListener;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/prev-next-button', ['eventie/eventie', './flickity', 'tap-listener/tap-listener', 'fizzy-ui-utils/utils'], function(eventie, Flickity, TapListener, utils) {
            return factory(window, eventie, Flickity, TapListener, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('eventie'), require('./flickity'), require('tap-listener'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.PrevNextButton = factory(window, window.eventie, window.Flickity, window.TapListener, window.fizzyUIUtils);
    }
}(window, function factory(window, eventie, Flickity, TapListener, utils) {
    var svgURI = 'http://www.w3.org/2000/svg';
    var supportsInlineSVG = (function() {
        var supports;

        function checkSupport() {
            if (supports !== undefined) {
                return supports;
            }
            var div = document.createElement('div');
            div.innerHTML = '<svg/>';
            supports = (div.firstChild && div.firstChild.namespaceURI) == svgURI;
            return supports;
        }
        return checkSupport;
    })();

    function PrevNextButton(direction, parent) {
        this.direction = direction;
        this.parent = parent;
        this._create();
    }
    PrevNextButton.prototype = new TapListener();
    PrevNextButton.prototype._create = function() {
        this.isEnabled = true;
        this.isPrevious = this.direction == -1;
        var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == leftDirection;
        var element = this.element = document.createElement('button');
        element.className = 'flickity-prev-next-button';
        element.className += this.isPrevious ? ' previous' : ' next';
        element.setAttribute('type', 'button');
        Flickity.setUnselectable(element);
        if (supportsInlineSVG()) {
            var svg = this.createSVG();
            element.appendChild(svg);
        } else {
            this.setArrowText();
            element.className += ' no-svg';
        }
        var _this = this;
        this.onCellSelect = function() {
            _this.update();
        };
        this.parent.on('cellSelect', this.onCellSelect);
        this.on('tap', this.onTap);
        this.on('pointerDown', function onPointerDown(button, event) {
            _this.parent.childUIPointerDown(event);
        });
    };
    PrevNextButton.prototype.activate = function() {
        this.update();
        this.bindTap(this.element);
        eventie.bind(this.element, 'click', this);
        this.parent.element.appendChild(this.element);
    };
    PrevNextButton.prototype.deactivate = function() {
        this.parent.element.removeChild(this.element);
        TapListener.prototype.destroy.call(this);
        eventie.unbind(this.element, 'click', this);
    };
    PrevNextButton.prototype.createSVG = function() {
        var svg = document.createElementNS(svgURI, 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        var path = document.createElementNS(svgURI, 'path');
        path.setAttribute('d', 'M 50,0 L 60,10 L 20,50 L 60,90 L 50,100 L 0,50 Z');
        path.setAttribute('class', 'arrow');
        var arrowTransform = this.isLeft ? 'translate(15,0)' : 'translate(85,100) rotate(180)';
        path.setAttribute('transform', arrowTransform);
        svg.appendChild(path);
        return svg;
    };
    PrevNextButton.prototype.setArrowText = function() {
        var parentOptions = this.parent.options;
        var arrowText = this.isLeft ? parentOptions.leftArrowText : parentOptions.rightArrowText;
        utils.setText(this.element, arrowText);
    };
    PrevNextButton.prototype.onTap = function() {
        if (!this.isEnabled) {
            return;
        }
        this.parent.uiChange();
        var method = this.isPrevious ? 'previous' : 'next';
        this.parent[method]();
    };
    PrevNextButton.prototype.handleEvent = utils.handleEvent;
    PrevNextButton.prototype.onclick = function() {
        var focused = document.activeElement;
        if (focused && focused == this.element) {
            this.onTap();
        }
    };
    PrevNextButton.prototype.enable = function() {
        if (this.isEnabled) {
            return;
        }
        this.element.disabled = false;
        this.isEnabled = true;
    };
    PrevNextButton.prototype.disable = function() {
        if (!this.isEnabled) {
            return;
        }
        this.element.disabled = true;
        this.isEnabled = false;
    };
    PrevNextButton.prototype.update = function() {
        var cells = this.parent.cells;
        if (this.parent.options.wrapAround && cells.length > 1) {
            this.enable();
            return;
        }
        var lastIndex = cells.length ? cells.length - 1 : 0;
        var boundIndex = this.isPrevious ? 0 : lastIndex;
        var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
        this[method]();
    };
    PrevNextButton.prototype.destroy = function() {
        this.deactivate();
    };
    utils.extend(Flickity.defaults, {
        prevNextButtons: true,
        leftArrowText: '‹',
        rightArrowText: '›'
    });
    Flickity.createMethods.push('_createPrevNextButtons');
    Flickity.prototype._createPrevNextButtons = function() {
        if (!this.options.prevNextButtons) {
            return;
        }
        this.prevButton = new PrevNextButton(-1, this);
        this.nextButton = new PrevNextButton(1, this);
        this.on('activate', this.activatePrevNextButtons);
    };
    Flickity.prototype.activatePrevNextButtons = function() {
        this.prevButton.activate();
        this.nextButton.activate();
        this.on('deactivate', this.deactivatePrevNextButtons);
    };
    Flickity.prototype.deactivatePrevNextButtons = function() {
        this.prevButton.deactivate();
        this.nextButton.deactivate();
        this.off('deactivate', this.deactivatePrevNextButtons);
    };
    Flickity.PrevNextButton = PrevNextButton;
    return PrevNextButton;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/page-dots', ['eventie/eventie', './flickity', 'tap-listener/tap-listener', 'fizzy-ui-utils/utils'], function(eventie, Flickity, TapListener, utils) {
            return factory(window, eventie, Flickity, TapListener, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('eventie'), require('./flickity'), require('tap-listener'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.PageDots = factory(window, window.eventie, window.Flickity, window.TapListener, window.fizzyUIUtils);
    }
}(window, function factory(window, eventie, Flickity, TapListener, utils) {
    function PageDots(parent) {
        this.parent = parent;
        this._create();
    }
    PageDots.prototype = new TapListener();
    PageDots.prototype._create = function() {
        this.holder = document.createElement('ol');
        this.holder.className = 'flickity-page-dots';
        Flickity.setUnselectable(this.holder);
        this.dots = [];
        var _this = this;
        this.onCellSelect = function() {
            _this.updateSelected();
        };
        this.parent.on('cellSelect', this.onCellSelect);
        this.on('tap', this.onTap);
        this.on('pointerDown', function onPointerDown(button, event) {
            _this.parent.childUIPointerDown(event);
        });
    };
    PageDots.prototype.activate = function() {
        this.setDots();
        this.updateSelected();
        this.bindTap(this.holder);
        this.parent.element.appendChild(this.holder);
    };
    PageDots.prototype.deactivate = function() {
        this.parent.element.removeChild(this.holder);
        TapListener.prototype.destroy.call(this);
    };
    PageDots.prototype.setDots = function() {
        var delta = this.parent.cells.length - this.dots.length;
        if (delta > 0) {
            this.addDots(delta);
        } else if (delta < 0) {
            this.removeDots(-delta);
        }
    };
    PageDots.prototype.addDots = function(count) {
        var fragment = document.createDocumentFragment();
        var newDots = [];
        while (count) {
            var dot = document.createElement('li');
            dot.className = 'dot';
            fragment.appendChild(dot);
            newDots.push(dot);
            count--;
        }
        this.holder.appendChild(fragment);
        this.dots = this.dots.concat(newDots);
    };
    PageDots.prototype.removeDots = function(count) {
        var removeDots = this.dots.splice(this.dots.length - count, count);
        for (var i = 0, len = removeDots.length; i < len; i++) {
            var dot = removeDots[i];
            this.holder.removeChild(dot);
        }
    };
    PageDots.prototype.updateSelected = function() {
        if (this.selectedDot) {
            this.selectedDot.className = 'dot';
        }
        if (!this.dots.length) {
            return;
        }
        this.selectedDot = this.dots[this.parent.selectedIndex];
        this.selectedDot.className = 'dot is-selected';
    };
    PageDots.prototype.onTap = function(instance, event) {
        var target = event.target;
        if (target.nodeName != 'LI') {
            return;
        }
        this.parent.uiChange();
        var index = utils.indexOf(this.dots, target);
        this.parent.select(index);
    };
    PageDots.prototype.destroy = function() {
        this.deactivate();
    };
    Flickity.PageDots = PageDots;
    utils.extend(Flickity.defaults, {
        pageDots: true
    });
    Flickity.createMethods.push('_createPageDots');
    Flickity.prototype._createPageDots = function() {
        if (!this.options.pageDots) {
            return;
        }
        this.pageDots = new PageDots(this);
        this.on('activate', this.activatePageDots);
        this.on('cellAddedRemoved', this.onCellAddedRemovedPageDots);
        this.on('deactivate', this.deactivatePageDots);
    };
    Flickity.prototype.activatePageDots = function() {
        this.pageDots.activate();
    };
    Flickity.prototype.onCellAddedRemovedPageDots = function() {
        this.pageDots.setDots();
    };
    Flickity.prototype.deactivatePageDots = function() {
        this.pageDots.deactivate();
    };
    Flickity.PageDots = PageDots;
    return PageDots;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/player', ['eventEmitter/EventEmitter', 'eventie/eventie', './flickity'], function(EventEmitter, eventie, Flickity) {
            return factory(EventEmitter, eventie, Flickity);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(require('wolfy87-eventemitter'), require('eventie'), require('./flickity'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity.Player = factory(window.EventEmitter, window.eventie, window.Flickity);
    }
}(window, function factory(EventEmitter, eventie, Flickity) {
    var hiddenProperty, visibilityEvent;
    if ('hidden' in document) {
        hiddenProperty = 'hidden';
        visibilityEvent = 'visibilitychange';
    } else if ('webkitHidden' in document) {
        hiddenProperty = 'webkitHidden';
        visibilityEvent = 'webkitvisibilitychange';
    }

    function Player(parent) {
        this.isPlaying = false;
        this.parent = parent;
        if (visibilityEvent) {
            var _this = this;
            this.onVisibilityChange = function() {
                _this.visibilityChange();
            };
        }
    }
    Player.prototype = new EventEmitter();
    Player.prototype.play = function() {
        this.isPlaying = true;
        delete this.isPaused;
        if (visibilityEvent) {
            document.addEventListener(visibilityEvent, this.onVisibilityChange, false);
        }
        this.tick();
    };
    Player.prototype.tick = function() {
        if (!this.isPlaying || this.isPaused) {
            return;
        }
        this.tickTime = new Date();
        var time = this.parent.options.autoPlay;
        time = typeof time == 'number' ? time : 3000;
        var _this = this;
        this.timeout = setTimeout(function() {
            _this.parent.next(true);
            _this.tick();
        }, time);
    };
    Player.prototype.stop = function() {
        this.isPlaying = false;
        delete this.isPaused;
        this.clear();
        if (visibilityEvent) {
            document.removeEventListener(visibilityEvent, this.onVisibilityChange, false);
        }
    };
    Player.prototype.clear = function() {
        clearTimeout(this.timeout);
    };
    Player.prototype.pause = function() {
        if (this.isPlaying) {
            this.isPaused = true;
            this.clear();
        }
    };
    Player.prototype.unpause = function() {
        if (this.isPaused) {
            this.play();
        }
    };
    Player.prototype.visibilityChange = function() {
        var isHidden = document[hiddenProperty];
        this[isHidden ? 'pause' : 'unpause']();
    };
    Flickity.createMethods.push('_createPlayer');
    Flickity.prototype._createPlayer = function() {
        this.player = new Player(this);
        this.on('activate', this.activatePlayer);
        this.on('uiChange', this.stopPlayer);
        this.on('pointerDown', this.stopPlayer);
        this.on('deactivate', this.deactivatePlayer);
    };
    Flickity.prototype.activatePlayer = function() {
        if (!this.options.autoPlay) {
            return;
        }
        this.player.play();
        eventie.bind(this.element, 'mouseenter', this);
        this.isMouseenterBound = true;
    };
    Flickity.prototype.stopPlayer = function() {
        this.player.stop();
    };
    Flickity.prototype.deactivatePlayer = function() {
        this.player.stop();
        if (this.isMouseenterBound) {
            eventie.unbind(this.element, 'mouseenter', this);
            delete this.isMouseenterBound;
        }
    };
    Flickity.prototype.onmouseenter = function() {
        this.player.pause();
        eventie.bind(this.element, 'mouseleave', this);
    };
    Flickity.prototype.onmouseleave = function() {
        this.player.unpause();
        eventie.unbind(this.element, 'mouseleave', this);
    };
    Flickity.Player = Player;
    return Player;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/add-remove-cell', ['./flickity', 'fizzy-ui-utils/utils'], function(Flickity, utils) {
            return factory(window, Flickity, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('./flickity'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = window.Flickity || {};
        window.Flickity = factory(window, window.Flickity, window.fizzyUIUtils);
    }
}(window, function factory(window, Flickity, utils) {
    function getCellsFragment(cells) {
        var fragment = document.createDocumentFragment();
        for (var i = 0, len = cells.length; i < len; i++) {
            var cell = cells[i];
            fragment.appendChild(cell.element);
        }
        return fragment;
    }
    Flickity.prototype.insert = function(elems, index) {
        var cells = this._makeCells(elems);
        if (!cells || !cells.length) {
            return;
        }
        var len = this.cells.length;
        index = index === undefined ? len : index;
        var fragment = getCellsFragment(cells);
        var isAppend = index == len;
        if (isAppend) {
            this.slider.appendChild(fragment);
        } else {
            var insertCellElement = this.cells[index].element;
            this.slider.insertBefore(fragment, insertCellElement);
        }
        if (index === 0) {
            this.cells = cells.concat(this.cells);
        } else if (isAppend) {
            this.cells = this.cells.concat(cells);
        } else {
            var endCells = this.cells.splice(index, len - index);
            this.cells = this.cells.concat(cells).concat(endCells);
        }
        this._sizeCells(cells);
        var selectedIndexDelta = index > this.selectedIndex ? 0 : cells.length;
        this._cellAddedRemoved(index, selectedIndexDelta);
    };
    Flickity.prototype.append = function(elems) {
        this.insert(elems, this.cells.length);
    };
    Flickity.prototype.prepend = function(elems) {
        this.insert(elems, 0);
    };
    Flickity.prototype.remove = function(elems) {
        var cells = this.getCells(elems);
        var selectedIndexDelta = 0;
        var i, len, cell;
        for (i = 0, len = cells.length; i < len; i++) {
            cell = cells[i];
            var wasBefore = utils.indexOf(this.cells, cell) < this.selectedIndex;
            selectedIndexDelta -= wasBefore ? 1 : 0;
        }
        for (i = 0, len = cells.length; i < len; i++) {
            cell = cells[i];
            cell.remove();
            utils.removeFrom(this.cells, cell);
        }
        if (cells.length) {
            this._cellAddedRemoved(0, selectedIndexDelta);
        }
    };
    Flickity.prototype._cellAddedRemoved = function(changedCellIndex, selectedIndexDelta) {
        selectedIndexDelta = selectedIndexDelta || 0;
        this.selectedIndex += selectedIndexDelta;
        this.selectedIndex = Math.max(0, Math.min(this.cells.length - 1, this.selectedIndex));
        this.emitEvent('cellAddedRemoved', [changedCellIndex, selectedIndexDelta]);
        this.cellChange(changedCellIndex);
    };
    Flickity.prototype.cellSizeChange = function(elem) {
        var cell = this.getCell(elem);
        if (!cell) {
            return;
        }
        cell.getSize();
        var index = utils.indexOf(this.cells, cell);
        this.cellChange(index);
    };
    Flickity.prototype.cellChange = function(changedCellIndex) {
        changedCellIndex = changedCellIndex || 0;
        this._positionCells(changedCellIndex);
        this._getWrapShiftCells();
        this.setGallerySize();
        if (this.options.freeScroll) {
            this.positionSlider();
        } else {
            this.positionSliderAtSelected();
            this.select(this.selectedIndex);
        }
    };
    return Flickity;
}));
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity/js/index', ['./flickity', './drag', './prev-next-button', './page-dots', './player', './add-remove-cell'], factory);
    } else if (typeof exports == 'object') {
        module.exports = factory(require('./flickity'), require('./drag'), require('./prev-next-button'), require('./page-dots'), require('./player'), require('./add-remove-cell'));
    }
})(window, function factory(Flickity) {
    return Flickity;
});
/*!
 * Flickity asNavFor v1.0.0
 * enable asNavFor for Flickity
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define('flickity-as-nav-for/as-nav-for', ['classie/classie', 'flickity/js/index', 'fizzy-ui-utils/utils'], function(classie, Flickity, utils) {
            return factory(window, classie, Flickity, utils);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('dessandro-classie'), require('flickity'), require('fizzy-ui-utils'));
    } else {
        window.Flickity = factory(window, window.classie, window.Flickity, window.fizzyUIUtils);
    }
}(window, function factory(window, classie, Flickity, utils) {
    Flickity.createMethods.push('_createAsNavFor');
    Flickity.prototype._createAsNavFor = function() {
        this.on('activate', this.activateAsNavFor);
        this.on('deactivate', this.deactivateAsNavFor);
        this.on('destroy', this.destroyAsNavFor);
        var asNavForOption = this.options.asNavFor;
        if (!asNavForOption) {
            return;
        }
        var _this = this;
        setTimeout(function initNavCompanion() {
            _this.setNavCompanion(asNavForOption);
        });
    };
    Flickity.prototype.setNavCompanion = function(elem) {
        elem = utils.getQueryElement(elem);
        var companion = Flickity.data(elem);
        if (!companion || companion == this) {
            return;
        }
        this.navCompanion = companion;
        var _this = this;
        this.onNavCompanionSelect = function() {
            _this.navCompanionSelect();
        };
        companion.on('cellSelect', this.onNavCompanionSelect);
        this.on('staticClick', this.onNavStaticClick);
        this.navCompanionSelect();
    };
    Flickity.prototype.navCompanionSelect = function() {
        if (!this.navCompanion) {
            return;
        }
        var index = this.navCompanion.selectedIndex;
        this.select(index);
        this.removeNavSelectedElement();
        if (this.selectedIndex != index) {
            return;
        }
        this.navSelectedElement = this.cells[index].element;
        classie.add(this.navSelectedElement, 'is-nav-selected');
    };
    Flickity.prototype.activateAsNavFor = function() {
        this.navCompanionSelect();
    };
    Flickity.prototype.removeNavSelectedElement = function() {
        if (!this.navSelectedElement) {
            return;
        }
        classie.remove(this.navSelectedElement, 'is-nav-selected');
        delete this.navSelectedElement;
    };
    Flickity.prototype.onNavStaticClick = function(event, pointer, cellElement, cellIndex) {
        if (typeof cellIndex == 'number') {
            this.navCompanion.select(cellIndex);
        }
    };
    Flickity.prototype.deactivateAsNavFor = function() {
        this.removeNavSelectedElement();
    };
    Flickity.prototype.destroyAsNavFor = function() {
        if (!this.navCompanion) {
            return;
        }
        this.navCompanion.off('cellSelect', this.onNavCompanionSelect);
        this.off('staticClick', this.onNavStaticClick);
        delete this.navCompanion;
    };
    return Flickity;
}));
/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define('imagesloaded/imagesloaded', ['eventEmitter/EventEmitter', 'eventie/eventie'], function(EventEmitter, eventie) {
            return factory(window, EventEmitter, eventie);
        });
    } else if (typeof exports === 'object') {
        module.exports = factory(window, require('wolfy87-eventemitter'), require('eventie'));
    } else {
        window.imagesLoaded = factory(window, window.EventEmitter, window.eventie);
    }
})(window, function factory(window, EventEmitter, eventie) {
    var $ = window.jQuery;
    var console = window.console;
    var hasConsole = typeof console !== 'undefined';

    function extend(a, b) {
        for (var prop in b) {
            a[prop] = b[prop];
        }
        return a;
    }
    var objToString = Object.prototype.toString;

    function isArray(obj) {
        return objToString.call(obj) === '[object Array]';
    }

    function makeArray(obj) {
        var ary = [];
        if (isArray(obj)) {
            ary = obj;
        } else if (typeof obj.length === 'number') {
            for (var i = 0, len = obj.length; i < len; i++) {
                ary.push(obj[i]);
            }
        } else {
            ary.push(obj);
        }
        return ary;
    }

    function ImagesLoaded(elem, options, onAlways) {
        if (!(this instanceof ImagesLoaded)) {
            return new ImagesLoaded(elem, options);
        }
        if (typeof elem === 'string') {
            elem = document.querySelectorAll(elem);
        }
        this.elements = makeArray(elem);
        this.options = extend({}, this.options);
        if (typeof options === 'function') {
            onAlways = options;
        } else {
            extend(this.options, options);
        }
        if (onAlways) {
            this.on('always', onAlways);
        }
        this.getImages();
        if ($) {
            this.jqDeferred = new $.Deferred();
        }
        var _this = this;
        setTimeout(function() {
            _this.check();
        });
    }
    ImagesLoaded.prototype = new EventEmitter();
    ImagesLoaded.prototype.options = {};
    ImagesLoaded.prototype.getImages = function() {
        this.images = [];
        for (var i = 0, len = this.elements.length; i < len; i++) {
            var elem = this.elements[i];
            if (elem.nodeName === 'IMG') {
                this.addImage(elem);
            }
            var nodeType = elem.nodeType;
            if (!nodeType || !(nodeType === 1 || nodeType === 9 || nodeType === 11)) {
                continue;
            }
            var childElems = elem.querySelectorAll('img');
            for (var j = 0, jLen = childElems.length; j < jLen; j++) {
                var img = childElems[j];
                this.addImage(img);
            }
        }
    };
    ImagesLoaded.prototype.addImage = function(img) {
        var loadingImage = new LoadingImage(img);
        this.images.push(loadingImage);
    };
    ImagesLoaded.prototype.check = function() {
        var _this = this;
        var checkedCount = 0;
        var length = this.images.length;
        this.hasAnyBroken = false;
        if (!length) {
            this.complete();
            return;
        }

        function onConfirm(image, message) {
            if (_this.options.debug && hasConsole) {
                console.log('confirm', image, message);
            }
            _this.progress(image);
            checkedCount++;
            if (checkedCount === length) {
                _this.complete();
            }
            return true;
        }
        for (var i = 0; i < length; i++) {
            var loadingImage = this.images[i];
            loadingImage.on('confirm', onConfirm);
            loadingImage.check();
        }
    };
    ImagesLoaded.prototype.progress = function(image) {
        this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
        var _this = this;
        setTimeout(function() {
            _this.emit('progress', _this, image);
            if (_this.jqDeferred && _this.jqDeferred.notify) {
                _this.jqDeferred.notify(_this, image);
            }
        });
    };
    ImagesLoaded.prototype.complete = function() {
        var eventName = this.hasAnyBroken ? 'fail' : 'done';
        this.isComplete = true;
        var _this = this;
        setTimeout(function() {
            _this.emit(eventName, _this);
            _this.emit('always', _this);
            if (_this.jqDeferred) {
                var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
                _this.jqDeferred[jqMethod](_this);
            }
        });
    };
    if ($) {
        $.fn.imagesLoaded = function(options, callback) {
            var instance = new ImagesLoaded(this, options, callback);
            return instance.jqDeferred.promise($(this));
        };
    }

    function LoadingImage(img) {
        this.img = img;
    }
    LoadingImage.prototype = new EventEmitter();
    LoadingImage.prototype.check = function() {
        var resource = cache[this.img.src] || new Resource(this.img.src);
        if (resource.isConfirmed) {
            this.confirm(resource.isLoaded, 'cached was confirmed');
            return;
        }
        if (this.img.complete && this.img.naturalWidth !== undefined) {
            this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
            return;
        }
        var _this = this;
        resource.on('confirm', function(resrc, message) {
            _this.confirm(resrc.isLoaded, message);
            return true;
        });
        resource.check();
    };
    LoadingImage.prototype.confirm = function(isLoaded, message) {
        this.isLoaded = isLoaded;
        this.emit('confirm', this, message);
    };
    var cache = {};

    function Resource(src) {
        this.src = src;
        cache[src] = this;
    }
    Resource.prototype = new EventEmitter();
    Resource.prototype.check = function() {
        if (this.isChecked) {
            return;
        }
        var proxyImage = new Image();
        eventie.bind(proxyImage, 'load', this);
        eventie.bind(proxyImage, 'error', this);
        proxyImage.src = this.src;
        this.isChecked = true;
    };
    Resource.prototype.handleEvent = function(event) {
        var method = 'on' + event.type;
        if (this[method]) {
            this[method](event);
        }
    };
    Resource.prototype.onload = function(event) {
        this.confirm(true, 'onload');
        this.unbindProxyEvents(event);
    };
    Resource.prototype.onerror = function(event) {
        this.confirm(false, 'onerror');
        this.unbindProxyEvents(event);
    };
    Resource.prototype.confirm = function(isLoaded, message) {
        this.isConfirmed = true;
        this.isLoaded = isLoaded;
        this.emit('confirm', this, message);
    };
    Resource.prototype.unbindProxyEvents = function(event) {
        eventie.unbind(event.target, 'load', this);
        eventie.unbind(event.target, 'error', this);
    };
    return ImagesLoaded;
});
/*!
 * Flickity imagesLoaded v1.0.0
 * enables imagesLoaded option for Flickity
 */
(function(window, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['flickity/js/index', 'imagesloaded/imagesloaded'], function(Flickity, imagesLoaded) {
            return factory(window, Flickity, imagesLoaded);
        });
    } else if (typeof exports == 'object') {
        module.exports = factory(window, require('flickity'), require('imagesloaded'));
    } else {
        window.Flickity = factory(window, window.Flickity, window.imagesLoaded);
    }
}(window, function factory(window, Flickity, imagesLoaded) {
    Flickity.createMethods.push('_createImagesLoaded');
    Flickity.prototype._createImagesLoaded = function() {
        this.on('activate', this.imagesLoaded);
    };
    Flickity.prototype.imagesLoaded = function() {
        if (!this.options.imagesLoaded) {
            return;
        }
        var _this = this;

        function onImagesLoadedProgress(instance, image) {
            var cell = _this.getParentCell(image.img);
            _this.cellSizeChange(cell && cell.element);
        }
        imagesLoaded(this.slider).on('progress', onImagesLoadedProgress);
    };
    return Flickity;
}));

! function(a) {
    "use strict";

    function b(a, c) {
        if (!(this instanceof b)) {
            var d = new b(a, c);
            return d.open(), d
        }
        this.id = b.id++, this.setup(a, c), this.chainCallbacks(b._callbackChain)
    }

    function c(a, b) {
        var c = {};
        for (var d in a) d in b && (c[d] = a[d], delete a[d]);
        return c
    }

    function d(a, b) {
        var c = {},
            d = new RegExp("^" + b + "([A-Z])(.*)");
        for (var e in a) {
            var f = e.match(d);
            if (f) {
                var g = (f[1] + f[2].replace(/([A-Z])/g, "-$1")).toLowerCase();
                c[g] = a[e]
            }
        }
        return c
    }
    if ("undefined" == typeof a) return void("console" in window && window.console.info("Too much lightness, Featherlight needs jQuery."));
    var e = [],
        f = function(b) {
            return e = a.grep(e, function(a) {
                return a !== b && a.$instance.closest("body").length > 0
            })
        },
        g = {
            allowfullscreen: 1,
            frameborder: 1,
            height: 1,
            longdesc: 1,
            marginheight: 1,
            marginwidth: 1,
            name: 1,
            referrerpolicy: 1,
            scrolling: 1,
            sandbox: 1,
            src: 1,
            srcdoc: 1,
            width: 1
        },
        h = {
            keyup: "onKeyUp",
            resize: "onResize"
        },
        i = function(c) {
            a.each(b.opened().reverse(), function() {
                return c.isDefaultPrevented() || !1 !== this[h[c.type]](c) ? void 0 : (c.preventDefault(), c.stopPropagation(), !1)
            })
        },
        j = function(c) {
            if (c !== b._globalHandlerInstalled) {
                b._globalHandlerInstalled = c;
                var d = a.map(h, function(a, c) {
                    return c + "." + b.prototype.namespace
                }).join(" ");
                a(window)[c ? "on" : "off"](d, i)
            }
        };
    b.prototype = {
        constructor: b,
        namespace: "featherlight",
        targetAttr: "data-featherlight",
        variant: null,
        resetCss: !1,
        background: null,
        openTrigger: "click",
        closeTrigger: "click",
        filter: null,
        root: "body",
        openSpeed: 250,
        closeSpeed: 250,
        closeOnClick: "background",
        closeOnEsc: !0,
        closeIcon: "&#10005;",
        loading: "",
        persist: !1,
        otherClose: null,
        beforeOpen: a.noop,
        beforeContent: a.noop,
        beforeClose: a.noop,
        afterOpen: a.noop,
        afterContent: a.noop,
        afterClose: a.noop,
        onKeyUp: a.noop,
        onResize: a.noop,
        type: null,
        contentFilters: ["jquery", "image", "html", "ajax", "iframe", "text"],
        setup: function(b, c) {
            "object" != typeof b || b instanceof a != !1 || c || (c = b, b = void 0);
            var d = a.extend(this, c, {
                    target: b
                }),
                e = d.resetCss ? d.namespace + "-reset" : d.namespace,
                f = a(d.background || ['<div class="' + e + "-loading " + e + '">', '<div class="' + e + '-content">', '<button class="' + e + "-close-icon " + d.namespace + '-close" aria-label="Close">', d.closeIcon, "</button>", '<div class="' + d.namespace + '-inner">' + d.loading + "</div>", "</div>", "</div>"].join("")),
                g = "." + d.namespace + "-close" + (d.otherClose ? "," + d.otherClose : "");
            return d.$instance = f.clone().addClass(d.variant), d.$instance.on(d.closeTrigger + "." + d.namespace, function(b) {
                var c = a(b.target);
                ("background" === d.closeOnClick && c.is("." + d.namespace) || "anywhere" === d.closeOnClick || c.closest(g).length) && (d.close(b), b.preventDefault())
            }), this
        },
        getContent: function() {
            if (this.persist !== !1 && this.$content) return this.$content;
            var b = this,
                c = this.constructor.contentFilters,
                d = function(a) {
                    return b.$currentTarget && b.$currentTarget.attr(a)
                },
                e = d(b.targetAttr),
                f = b.target || e || "",
                g = c[b.type];
            if (!g && f in c && (g = c[f], f = b.target && e), f = f || d("href") || "", !g)
                for (var h in c) b[h] && (g = c[h], f = b[h]);
            if (!g) {
                var i = f;
                if (f = null, a.each(b.contentFilters, function() {
                        return g = c[this], g.test && (f = g.test(i)), !f && g.regex && i.match && i.match(g.regex) && (f = i), !f
                    }), !f) return "console" in window && window.console.error("Featherlight: no content filter found " + (i ? ' for "' + i + '"' : " (no target specified)")), !1
            }
            return g.process.call(b, f)
        },
        setContent: function(b) {
            var c = this;
            return b.is("iframe") && c.$instance.addClass(c.namespace + "-iframe"), c.$instance.removeClass(c.namespace + "-loading"), c.$instance.find("." + c.namespace + "-inner").not(b).slice(1).remove().end().replaceWith(a.contains(c.$instance[0], b[0]) ? "" : b), c.$content = b.addClass(c.namespace + "-inner"), c
        },
        open: function(b) {
            var c = this;
            if (c.$instance.hide().appendTo(c.root), !(b && b.isDefaultPrevented() || c.beforeOpen(b) === !1)) {
                b && b.preventDefault();
                var d = c.getContent();
                if (d) return e.push(c), j(!0), c.$instance.fadeIn(c.openSpeed), c.beforeContent(b), a.when(d).always(function(a) {
                    c.setContent(a), c.afterContent(b)
                }).then(c.$instance.promise()).done(function() {
                    c.afterOpen(b)
                })
            }
            return c.$instance.detach(), a.Deferred().reject().promise()
        },
        close: function(b) {
            var c = this,
                d = a.Deferred();
            return c.beforeClose(b) === !1 ? d.reject() : (0 === f(c).length && j(!1), c.$instance.fadeOut(c.closeSpeed, function() {
                c.$instance.detach(), c.afterClose(b), d.resolve()
            })), d.promise()
        },
        resize: function(a, b) {
            if (a && b) {
                this.$content.css("width", "").css("height", "");
                var c = Math.max(a / (this.$content.parent().width() - 1), b / (this.$content.parent().height() - 1));
                c > 1 && (c = b / Math.floor(b / c), this.$content.css("width", "" + a / c + "px").css("height", "" + b / c + "px"))
            }
        },
        chainCallbacks: function(b) {
            for (var c in b) this[c] = a.proxy(b[c], this, a.proxy(this[c], this))
        }
    }, a.extend(b, {
        id: 0,
        autoBind: "[data-featherlight]",
        defaults: b.prototype,
        contentFilters: {
            jquery: {
                regex: /^[#.]\w/,
                test: function(b) {
                    return b instanceof a && b
                },
                process: function(b) {
                    return this.persist !== !1 ? a(b) : a(b).clone(!0)
                }
            },
            image: {
                regex: /\.(png|jpg|jpeg|gif|tiff|bmp|svg)(\?\S*)?$/i,
                process: function(b) {
                    var c = this,
                        d = a.Deferred(),
                        e = new Image,
                        f = a('<img src="' + b + '" alt="" class="' + c.namespace + '-image" />');
                    return e.onload = function() {
                        f.naturalWidth = e.width, f.naturalHeight = e.height, d.resolve(f)
                    }, e.onerror = function() {
                        d.reject(f)
                    }, e.src = b, d.promise()
                }
            },
            html: {
                regex: /^\s*<[\w!][^<]*>/,
                process: function(b) {
                    return a(b)
                }
            },
            ajax: {
                regex: /./,
                process: function(b) {
                    var c = a.Deferred(),
                        d = a("<div></div>").load(b, function(a, b) {
                            "error" !== b && c.resolve(d.contents()), c.fail()
                        });
                    return c.promise()
                }
            },
            iframe: {
                process: function(b) {
                    var e = new a.Deferred,
                        f = a("<iframe/>"),
                        h = d(this, "iframe"),
                        i = c(h, g);
                    return f.hide().attr("src", b).attr(i).css(h).on("load", function() {
                        e.resolve(f.show())
                    }).appendTo(this.$instance.find("." + this.namespace + "-content")), e.promise()
                }
            },
            text: {
                process: function(b) {
                    return a("<div>", {
                        text: b
                    })
                }
            }
        },
        functionAttributes: ["beforeOpen", "afterOpen", "beforeContent", "afterContent", "beforeClose", "afterClose"],
        readElementConfig: function(b, c) {
            var d = this,
                e = new RegExp("^data-" + c + "-(.*)"),
                f = {};
            return b && b.attributes && a.each(b.attributes, function() {
                var b = this.name.match(e);
                if (b) {
                    var c = this.value,
                        g = a.camelCase(b[1]);
                    if (a.inArray(g, d.functionAttributes) >= 0) c = new Function(c);
                    else try {
                        c = JSON.parse(c)
                    } catch (h) {}
                    f[g] = c
                }
            }), f
        },
        extend: function(b, c) {
            var d = function() {
                this.constructor = b
            };
            return d.prototype = this.prototype, b.prototype = new d, b.__super__ = this.prototype, a.extend(b, this, c), b.defaults = b.prototype, b
        },
        attach: function(b, c, d) {
            var e = this;
            "object" != typeof c || c instanceof a != !1 || d || (d = c, c = void 0), d = a.extend({}, d);
            var f, g = d.namespace || e.defaults.namespace,
                h = a.extend({}, e.defaults, e.readElementConfig(b[0], g), d),
                i = function(g) {
                    var i = a(g.currentTarget),
                        j = a.extend({
                            $source: b,
                            $currentTarget: i
                        }, e.readElementConfig(b[0], h.namespace), e.readElementConfig(g.currentTarget, h.namespace), d),
                        k = f || i.data("featherlight-persisted") || new e(c, j);
                    "shared" === k.persist ? f = k : k.persist !== !1 && i.data("featherlight-persisted", k), j.$currentTarget.blur && j.$currentTarget.blur(), k.open(g)
                };
            return b.on(h.openTrigger + "." + h.namespace, h.filter, i), i
        },
        current: function() {
            var a = this.opened();
            return a[a.length - 1] || null
        },
        opened: function() {
            var b = this;
            return f(), a.grep(e, function(a) {
                return a instanceof b
            })
        },
        close: function(a) {
            var b = this.current();
            return b ? b.close(a) : void 0
        },
        _onReady: function() {
            var b = this;
            b.autoBind && (a(b.autoBind).each(function() {
                b.attach(a(this))
            }), a(document).on("click", b.autoBind, function(c) {
                if (!c.isDefaultPrevented()) {
                    var d = b.attach(a(c.currentTarget));
                    d(c)
                }
            }))
        },
        _callbackChain: {
            onKeyUp: function(b, c) {
                return 27 === c.keyCode ? (this.closeOnEsc && a.featherlight.close(c), !1) : b(c)
            },
            beforeOpen: function(b, c) {
                return this._previouslyActive = document.activeElement, this._$previouslyTabbable = a("a, input, select, textarea, iframe, button, iframe, [contentEditable=true]").not("[tabindex]").not(this.$instance.find("button")), this._$previouslyWithTabIndex = a("[tabindex]").not('[tabindex="-1"]'), this._previousWithTabIndices = this._$previouslyWithTabIndex.map(function(b, c) {
                    return a(c).attr("tabindex")
                }), this._$previouslyWithTabIndex.add(this._$previouslyTabbable).attr("tabindex", -1), document.activeElement.blur && document.activeElement.blur(), b(c)
            },
            afterClose: function(b, c) {
                var d = b(c),
                    e = this;
                return this._$previouslyTabbable.removeAttr("tabindex"), this._$previouslyWithTabIndex.each(function(b, c) {
                    a(c).attr("tabindex", e._previousWithTabIndices[b])
                }), this._previouslyActive.focus(), d
            },
            onResize: function(a, b) {
                return this.resize(this.$content.naturalWidth, this.$content.naturalHeight), a(b)
            },
            afterContent: function(a, b) {
                var c = a(b);
                return this.$instance.find("[autofocus]:not([disabled])").focus(), this.onResize(b), c
            }
        }
    }), a.featherlight = b, a.fn.featherlight = function(a, c) {
        return b.attach(this, a, c), this
    }, a(document).ready(function() {
        b._onReady()
    })
}(jQuery);
document.addEventListener("focusin", function(event) {
    const elem = event && event.target && event.target.closest("input,select,textarea,button,meter,progress");
    if (elem) {
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.formElementEnter',
            'inputID': elem.getAttribute("id") || "(no input ID)",
            'inputName': elem.getAttribute("name") || "(no input name)",
            'inputClass': elem.getAttribute("class") || "(no input class)",
            'formID': (elem.form && elem.form.getAttribute("id")) || "(no form ID)",
            'formName': (elem.form && elem.form.getAttribute("name")) || "(no form name)",
            'formClass': (elem.form && elem.form.getAttribute("class")) || "(no form class)"
        });
    }
}, false);
document.addEventListener("focusout", function(event) {
    const elem = event && event.target && event.target.closest("input,select,textarea,button,meter,progress");
    if (elem) {
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.formElementLeave',
            'inputID': elem.getAttribute("id") || "(no input ID)",
            'inputName': elem.getAttribute("name") || "(no input name)",
            'inputClass': elem.getAttribute("class") || "(no input class)",
            'formID': (elem.form && elem.form.getAttribute("id")) || "(no form ID)",
            'formName': (elem.form && elem.form.getAttribute("name")) || "(no form name)",
            'formClass': (elem.form && elem.form.getAttribute("class")) || "(no form class)"
        });
    };
}, false);
(() => {
    "use strict";
    var __webpack_modules__ = {
            536: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
                eval("\n;// CONCATENATED MODULE: ./resources/js/modules/ErrorHandler.js\nclass ErrorHandler {\n  constructor(genericErrorText) {\n    this.genericErrorText = genericErrorText;\n    this.wrapper = document.querySelector('.woocommerce-notices-wrapper');\n    this.messagesList = document.querySelector('ul.woocommerce-error');\n  }\n\n  genericError() {\n    if (this.wrapper.classList.contains('ppcp-persist')) {\n      return;\n    }\n\n    this.clear();\n    this.message(this.genericErrorText);\n  }\n\n  appendPreparedErrorMessageElement(errorMessageElement) {\n    if (this.messagesList === null) {\n      this._prepareMessagesList();\n    }\n\n    this.messagesList.replaceWith(errorMessageElement);\n  }\n  /**\n   * @param {String} text\n   * @param {Boolean} persist\n   */\n\n\n  message(text, persist = false) {\n    this._addMessage(text, persist);\n\n    this._scrollToMessages();\n  }\n  /**\n   * @param {Array} texts\n   * @param {Boolean} persist\n   */\n\n\n  messages(texts, persist = false) {\n    texts.forEach(t => this._addMessage(t, persist));\n\n    this._scrollToMessages();\n  }\n  /**\n   * @private\n   * @param {String} text\n   * @param {Boolean} persist\n   */\n\n\n  _addMessage(text, persist = false) {\n    if (!typeof String || text.length === 0) {\n      throw new Error('A new message text must be a non-empty string.');\n    }\n\n    if (this.messagesList === null) {\n      this._prepareMessagesList();\n    }\n\n    if (persist) {\n      this.wrapper.classList.add('ppcp-persist');\n    } else {\n      this.wrapper.classList.remove('ppcp-persist');\n    }\n\n    let messageNode = this._prepareMessagesListItem(text);\n\n    this.messagesList.appendChild(messageNode);\n  }\n  /**\n   * @private\n   */\n\n\n  _scrollToMessages() {\n    jQuery.scroll_to_notices(jQuery('.woocommerce-notices-wrapper'));\n  }\n  /**\n   * @private\n   */\n\n\n  _prepareMessagesList() {\n    if (this.messagesList === null) {\n      this.messagesList = document.createElement('ul');\n      this.messagesList.setAttribute('class', 'woocommerce-error');\n      this.messagesList.setAttribute('role', 'alert');\n      this.wrapper.appendChild(this.messagesList);\n    }\n  }\n  /**\n   * @private\n   */\n\n\n  _prepareMessagesListItem(message) {\n    const li = document.createElement('li');\n    li.innerHTML = message;\n    return li;\n  }\n\n  clear() {\n    if (this.messagesList === null) {\n      return;\n    }\n\n    this.messagesList.innerHTML = '';\n  }\n\n}\n\n/* harmony default export */ const modules_ErrorHandler = (ErrorHandler);\n;// CONCATENATED MODULE: ./resources/js/modules/OnApproveHandler/onApproveForContinue.js\nconst onApprove = (context, errorHandler) => {\n  return (data, actions) => {\n    return fetch(context.config.ajax.approve_order.endpoint, {\n      method: 'POST',\n      body: JSON.stringify({\n        nonce: context.config.ajax.approve_order.nonce,\n        order_id: data.orderID,\n        funding_source: window.ppcpFundingSource\n      })\n    }).then(res => {\n      return res.json();\n    }).then(data => {\n      if (!data.success) {\n        errorHandler.genericError();\n        return actions.restart().catch(err => {\n          errorHandler.genericError();\n        });\n      }\n\n      location.href = context.config.redirect;\n    });\n  };\n};\n\n/* harmony default export */ const onApproveForContinue = (onApprove);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/PayerData.js\nconst payerData = () => {\n  const payer = PayPalCommerceGateway.payer;\n\n  if (!payer) {\n    return null;\n  }\n\n  const phone = document.querySelector('#billing_phone') || typeof payer.phone !== 'undefined' ? {\n    phone_type: \"HOME\",\n    phone_number: {\n      national_number: document.querySelector('#billing_phone') ? document.querySelector('#billing_phone').value : payer.phone.phone_number.national_number\n    }\n  } : null;\n  const payerData = {\n    email_address: document.querySelector('#billing_email') ? document.querySelector('#billing_email').value : payer.email_address,\n    name: {\n      surname: document.querySelector('#billing_last_name') ? document.querySelector('#billing_last_name').value : payer.name.surname,\n      given_name: document.querySelector('#billing_first_name') ? document.querySelector('#billing_first_name').value : payer.name.given_name\n    },\n    address: {\n      country_code: document.querySelector('#billing_country') ? document.querySelector('#billing_country').value : payer.address.country_code,\n      address_line_1: document.querySelector('#billing_address_1') ? document.querySelector('#billing_address_1').value : payer.address.address_line_1,\n      address_line_2: document.querySelector('#billing_address_2') ? document.querySelector('#billing_address_2').value : payer.address.address_line_2,\n      admin_area_1: document.querySelector('#billing_state') ? document.querySelector('#billing_state').value : payer.address.admin_area_1,\n      admin_area_2: document.querySelector('#billing_city') ? document.querySelector('#billing_city').value : payer.address.admin_area_2,\n      postal_code: document.querySelector('#billing_postcode') ? document.querySelector('#billing_postcode').value : payer.address.postal_code\n    }\n  };\n\n  if (phone) {\n    payerData.phone = phone;\n  }\n\n  return payerData;\n};\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/CheckoutMethodState.js\nconst PaymentMethods = {\n  PAYPAL: 'ppcp-gateway',\n  CARDS: 'ppcp-credit-card-gateway',\n  OXXO: 'ppcp-oxxo-gateway',\n  CARD_BUTTON: 'ppcp-card-button-gateway'\n};\nconst ORDER_BUTTON_SELECTOR = '#place_order';\nconst getCurrentPaymentMethod = () => {\n  const el = document.querySelector('input[name=\"payment_method\"]:checked');\n\n  if (!el) {\n    return null;\n  }\n\n  return el.value;\n};\nconst isSavedCardSelected = () => {\n  const savedCardList = document.querySelector('#saved-credit-card');\n  return savedCardList && savedCardList.value !== '';\n};\n;// CONCATENATED MODULE: ./resources/js/modules/ActionHandler/CartActionHandler.js\n\n\n\n\nclass CartActionHandler {\n  constructor(config, errorHandler) {\n    this.config = config;\n    this.errorHandler = errorHandler;\n  }\n\n  configuration() {\n    const createOrder = (data, actions) => {\n      const payer = payerData();\n      const bnCode = typeof this.config.bn_codes[this.config.context] !== 'undefined' ? this.config.bn_codes[this.config.context] : '';\n      return fetch(this.config.ajax.create_order.endpoint, {\n        method: 'POST',\n        body: JSON.stringify({\n          nonce: this.config.ajax.create_order.nonce,\n          purchase_units: [],\n          payment_method: PaymentMethods.PAYPAL,\n          funding_source: window.ppcpFundingSource,\n          bn_code: bnCode,\n          payer,\n          context: this.config.context\n        })\n      }).then(function (res) {\n        return res.json();\n      }).then(function (data) {\n        if (!data.success) {\n          console.error(data);\n          throw Error(data.data.message);\n        }\n\n        return data.data.id;\n      });\n    };\n\n    return {\n      createOrder,\n      onApprove: onApproveForContinue(this, this.errorHandler),\n      onError: error => {\n        this.errorHandler.genericError();\n      }\n    };\n  }\n\n}\n\n/* harmony default export */ const ActionHandler_CartActionHandler = (CartActionHandler);\n;// CONCATENATED MODULE: ./resources/js/modules/ContextBootstrap/MiniCartBootstap.js\n\n\n\nclass MiniCartBootstap {\n  constructor(gateway, renderer) {\n    this.gateway = gateway;\n    this.renderer = renderer;\n    this.actionHandler = null;\n  }\n\n  init() {\n    this.actionHandler = new ActionHandler_CartActionHandler(PayPalCommerceGateway, new modules_ErrorHandler(this.gateway.labels.error.generic));\n    this.render();\n    jQuery(document.body).on('wc_fragments_loaded wc_fragments_refreshed', () => {\n      this.render();\n    });\n  }\n\n  shouldRender() {\n    return document.querySelector(this.gateway.button.mini_cart_wrapper) !== null || document.querySelector(this.gateway.hosted_fields.mini_cart_wrapper) !== null;\n  }\n\n  render() {\n    if (!this.shouldRender()) {\n      return;\n    }\n\n    this.renderer.render(this.actionHandler.configuration(), {\n      button: {\n        wrapper: this.gateway.button.mini_cart_wrapper,\n        style: this.gateway.button.mini_cart_style\n      }\n    });\n  }\n\n}\n\n/* harmony default export */ const ContextBootstrap_MiniCartBootstap = (MiniCartBootstap);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/UpdateCart.js\n\n\nclass UpdateCart {\n  constructor(endpoint, nonce) {\n    this.endpoint = endpoint;\n    this.nonce = nonce;\n  }\n  /**\n   *\n   * @param onResolve\n   * @param {Product[]} products\n   * @returns {Promise<unknown>}\n   */\n\n\n  update(onResolve, products) {\n    return new Promise((resolve, reject) => {\n      fetch(this.endpoint, {\n        method: 'POST',\n        body: JSON.stringify({\n          nonce: this.nonce,\n          products\n        })\n      }).then(result => {\n        return result.json();\n      }).then(result => {\n        if (!result.success) {\n          reject(result.data);\n          return;\n        }\n\n        const resolved = onResolve(result.data);\n        resolve(resolved);\n      });\n    });\n  }\n\n}\n\n/* harmony default export */ const Helper_UpdateCart = (UpdateCart);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/ButtonsToggleListener.js\n/**\n * When you can't add something to the cart, the PayPal buttons should not show.\n * Therefore we listen for changes on the add to cart button and show/hide the buttons accordingly.\n */\nclass ButtonsToggleListener {\n  constructor(element, showCallback, hideCallback) {\n    this.element = element;\n    this.showCallback = showCallback;\n    this.hideCallback = hideCallback;\n    this.observer = null;\n  }\n\n  init() {\n    const config = {\n      attributes: true\n    };\n\n    const callback = () => {\n      if (this.element.classList.contains('disabled')) {\n        this.hideCallback();\n        return;\n      }\n\n      this.showCallback();\n    };\n\n    this.observer = new MutationObserver(callback);\n    this.observer.observe(this.element, config);\n    callback();\n  }\n\n  disconnect() {\n    this.observer.disconnect();\n  }\n\n}\n\n/* harmony default export */ const Helper_ButtonsToggleListener = (ButtonsToggleListener);\n;// CONCATENATED MODULE: ./resources/js/modules/Entity/Product.js\nclass Product {\n  constructor(id, quantity, variations) {\n    this.id = id;\n    this.quantity = quantity;\n    this.variations = variations;\n  }\n\n  data() {\n    return {\n      id: this.id,\n      quantity: this.quantity,\n      variations: this.variations\n    };\n  }\n\n}\n\n/* harmony default export */ const Entity_Product = (Product);\n;// CONCATENATED MODULE: ./resources/js/modules/ActionHandler/SingleProductActionHandler.js\n\n\n\n\n\n\nclass SingleProductActionHandler {\n  constructor(config, updateCart, showButtonCallback, hideButtonCallback, formElement, errorHandler) {\n    this.config = config;\n    this.updateCart = updateCart;\n    this.showButtonCallback = showButtonCallback;\n    this.hideButtonCallback = hideButtonCallback;\n    this.formElement = formElement;\n    this.errorHandler = errorHandler;\n  }\n\n  configuration() {\n    if (this.hasVariations()) {\n      const observer = new Helper_ButtonsToggleListener(this.formElement.querySelector('.single_add_to_cart_button'), this.showButtonCallback, this.hideButtonCallback);\n      observer.init();\n    }\n\n    return {\n      createOrder: this.createOrder(),\n      onApprove: onApproveForContinue(this, this.errorHandler),\n      onError: error => {\n        this.errorHandler.genericError();\n      }\n    };\n  }\n\n  createOrder() {\n    var getProducts = null;\n\n    if (!this.isGroupedProduct()) {\n      getProducts = () => {\n        const id = document.querySelector('[name=\"add-to-cart\"]').value;\n        const qty = document.querySelector('[name=\"quantity\"]').value;\n        const variations = this.variations();\n        return [new Entity_Product(id, qty, variations)];\n      };\n    } else {\n      getProducts = () => {\n        const products = [];\n        this.formElement.querySelectorAll('input[type=\"number\"]').forEach(element => {\n          if (!element.value) {\n            return;\n          }\n\n          const elementName = element.getAttribute('name').match(/quantity\\[([\\d]*)\\]/);\n\n          if (elementName.length !== 2) {\n            return;\n          }\n\n          const id = parseInt(elementName[1]);\n          const quantity = parseInt(element.value);\n          products.push(new Entity_Product(id, quantity, null));\n        });\n        return products;\n      };\n    }\n\n    const createOrder = (data, actions) => {\n      this.errorHandler.clear();\n\n      const onResolve = purchase_units => {\n        const payer = payerData();\n        const bnCode = typeof this.config.bn_codes[this.config.context] !== 'undefined' ? this.config.bn_codes[this.config.context] : '';\n        return fetch(this.config.ajax.create_order.endpoint, {\n          method: 'POST',\n          body: JSON.stringify({\n            nonce: this.config.ajax.create_order.nonce,\n            purchase_units,\n            payer,\n            bn_code: bnCode,\n            payment_method: PaymentMethods.PAYPAL,\n            funding_source: window.ppcpFundingSource,\n            context: this.config.context\n          })\n        }).then(function (res) {\n          return res.json();\n        }).then(function (data) {\n          if (!data.success) {\n            console.error(data);\n            throw Error(data.data.message);\n          }\n\n          return data.data.id;\n        });\n      };\n\n      const promise = this.updateCart.update(onResolve, getProducts());\n      return promise;\n    };\n\n    return createOrder;\n  }\n\n  variations() {\n    if (!this.hasVariations()) {\n      return null;\n    }\n\n    const attributes = [...this.formElement.querySelectorAll(\"[name^='attribute_']\")].map(element => {\n      return {\n        value: element.value,\n        name: element.name\n      };\n    });\n    return attributes;\n  }\n\n  hasVariations() {\n    return this.formElement.classList.contains('variations_form');\n  }\n\n  isGroupedProduct() {\n    return this.formElement.classList.contains('grouped_form');\n  }\n\n}\n\n/* harmony default export */ const ActionHandler_SingleProductActionHandler = (SingleProductActionHandler);\n;// CONCATENATED MODULE: ./resources/js/modules/ContextBootstrap/SingleProductBootstap.js\n\n\n\n\nclass SingleProductBootstap {\n  constructor(gateway, renderer, messages) {\n    this.gateway = gateway;\n    this.renderer = renderer;\n    this.messages = messages;\n  }\n\n  handleChange() {\n    if (!this.shouldRender()) {\n      this.renderer.hideButtons(this.gateway.hosted_fields.wrapper);\n      this.renderer.hideButtons(this.gateway.button.wrapper);\n      this.messages.hideMessages();\n      return;\n    }\n\n    this.render();\n  }\n\n  init() {\n    document.querySelector('form.cart').addEventListener('change', this.handleChange.bind(this));\n\n    if (!this.shouldRender()) {\n      this.renderer.hideButtons(this.gateway.hosted_fields.wrapper);\n      this.messages.hideMessages();\n      return;\n    }\n\n    this.render();\n  }\n\n  shouldRender() {\n    return document.querySelector('form.cart') !== null && !this.priceAmountIsZero();\n  }\n\n  priceAmount() {\n    let priceText = \"0\";\n\n    if (document.querySelector('form.cart ins .woocommerce-Price-amount')) {\n      priceText = document.querySelector('form.cart ins .woocommerce-Price-amount').innerText;\n    } else if (document.querySelector('form.cart .woocommerce-Price-amount')) {\n      priceText = document.querySelector('form.cart .woocommerce-Price-amount').innerText;\n    } else if (document.querySelector('.product .woocommerce-Price-amount')) {\n      priceText = document.querySelector('.product .woocommerce-Price-amount').innerText;\n    }\n\n    priceText = priceText.replace(/,/g, '.');\n    return parseFloat(priceText.replace(/([^\\d,\\.\\s]*)/g, ''));\n  }\n\n  priceAmountIsZero() {\n    return this.priceAmount() === 0;\n  }\n\n  render() {\n    const actionHandler = new ActionHandler_SingleProductActionHandler(this.gateway, new Helper_UpdateCart(this.gateway.ajax.change_cart.endpoint, this.gateway.ajax.change_cart.nonce), () => {\n      this.renderer.showButtons(this.gateway.button.wrapper);\n      this.renderer.showButtons(this.gateway.hosted_fields.wrapper);\n      this.messages.renderWithAmount(this.priceAmount());\n    }, () => {\n      this.renderer.hideButtons(this.gateway.button.wrapper);\n      this.renderer.hideButtons(this.gateway.hosted_fields.wrapper);\n      this.messages.hideMessages();\n    }, document.querySelector('form.cart'), new modules_ErrorHandler(this.gateway.labels.error.generic));\n    this.renderer.render(actionHandler.configuration());\n  }\n\n}\n\n/* harmony default export */ const ContextBootstrap_SingleProductBootstap = (SingleProductBootstap);\n;// CONCATENATED MODULE: ./resources/js/modules/ContextBootstrap/CartBootstap.js\n\n\n\nclass CartBootstrap {\n  constructor(gateway, renderer) {\n    this.gateway = gateway;\n    this.renderer = renderer;\n  }\n\n  init() {\n    if (!this.shouldRender()) {\n      return;\n    }\n\n    this.render();\n    jQuery(document.body).on('updated_cart_totals updated_checkout', () => {\n      this.render();\n    });\n  }\n\n  shouldRender() {\n    return document.querySelector(this.gateway.button.wrapper) !== null || document.querySelector(this.gateway.hosted_fields.wrapper) !== null;\n  }\n\n  render() {\n    const actionHandler = new ActionHandler_CartActionHandler(PayPalCommerceGateway, new modules_ErrorHandler(this.gateway.labels.error.generic));\n    this.renderer.render(actionHandler.configuration());\n  }\n\n}\n\n/* harmony default export */ const CartBootstap = (CartBootstrap);\n;// CONCATENATED MODULE: ./resources/js/modules/OnApproveHandler/onApproveForPayNow.js\nconst onApproveForPayNow_onApprove = (context, errorHandler, spinner) => {\n  return (data, actions) => {\n    spinner.block();\n    errorHandler.clear();\n    return fetch(context.config.ajax.approve_order.endpoint, {\n      method: 'POST',\n      body: JSON.stringify({\n        nonce: context.config.ajax.approve_order.nonce,\n        order_id: data.orderID,\n        funding_source: window.ppcpFundingSource\n      })\n    }).then(res => {\n      return res.json();\n    }).then(data => {\n      spinner.unblock();\n\n      if (!data.success) {\n        if (data.data.code === 100) {\n          errorHandler.message(data.data.message);\n        } else {\n          errorHandler.genericError();\n        }\n\n        if (typeof actions !== 'undefined' && typeof actions.restart !== 'undefined') {\n          return actions.restart();\n        }\n\n        throw new Error(data.data.message);\n      }\n\n      document.querySelector('#place_order').click();\n    });\n  };\n};\n\n/* harmony default export */ const onApproveForPayNow = (onApproveForPayNow_onApprove);\n;// CONCATENATED MODULE: ./resources/js/modules/ActionHandler/CheckoutActionHandler.js\n\n\n\n\nclass CheckoutActionHandler {\n  constructor(config, errorHandler, spinner) {\n    this.config = config;\n    this.errorHandler = errorHandler;\n    this.spinner = spinner;\n  }\n\n  configuration() {\n    const spinner = this.spinner;\n\n    const createOrder = (data, actions) => {\n      const payer = payerData();\n      const bnCode = typeof this.config.bn_codes[this.config.context] !== 'undefined' ? this.config.bn_codes[this.config.context] : '';\n      const errorHandler = this.errorHandler;\n      const formSelector = this.config.context === 'checkout' ? 'form.checkout' : 'form#order_review';\n      const formData = new FormData(document.querySelector(formSelector)); // will not handle fields with multiple values (checkboxes, <select multiple>), but we do not care about this here\n\n      const formJsonObj = Object.fromEntries(formData);\n      const createaccount = jQuery('#createaccount').is(\":checked\") ? true : false;\n      const paymentMethod = getCurrentPaymentMethod();\n      const fundingSource = window.ppcpFundingSource;\n      return fetch(this.config.ajax.create_order.endpoint, {\n        method: 'POST',\n        body: JSON.stringify({\n          nonce: this.config.ajax.create_order.nonce,\n          payer,\n          bn_code: bnCode,\n          context: this.config.context,\n          order_id: this.config.order_id,\n          payment_method: paymentMethod,\n          funding_source: fundingSource,\n          form: formJsonObj,\n          createaccount: createaccount\n        })\n      }).then(function (res) {\n        return res.json();\n      }).then(function (data) {\n        if (!data.success) {\n          spinner.unblock(); //handle both messages sent from Woocommerce (data.messages) and this plugin (data.data.message)\n\n          if (typeof data.messages !== 'undefined') {\n            const domParser = new DOMParser();\n            errorHandler.appendPreparedErrorMessageElement(domParser.parseFromString(data.messages, 'text/html').querySelector('ul'));\n          } else {\n            errorHandler.clear();\n\n            if (data.data.details.length > 0) {\n              errorHandler.message(data.data.details.map(d => `${d.issue} ${d.description}`).join('<br/>'), true);\n            } else {\n              errorHandler.message(data.data.message, true);\n            }\n          }\n\n          throw new Error(data.data.message);\n        }\n\n        const input = document.createElement('input');\n        input.setAttribute('type', 'hidden');\n        input.setAttribute('name', 'ppcp-resume-order');\n        input.setAttribute('value', data.data.purchase_units[0].custom_id);\n        document.querySelector(formSelector).append(input);\n        return data.data.id;\n      });\n    };\n\n    return {\n      createOrder,\n      onApprove: onApproveForPayNow(this, this.errorHandler, this.spinner),\n      onCancel: () => {\n        spinner.unblock();\n      },\n      onError: () => {\n        this.errorHandler.genericError();\n        spinner.unblock();\n      }\n    };\n  }\n\n}\n\n/* harmony default export */ const ActionHandler_CheckoutActionHandler = (CheckoutActionHandler);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/Hiding.js\nconst getElement = selectorOrElement => {\n  if (typeof selectorOrElement === 'string') {\n    return document.querySelector(selectorOrElement);\n  }\n\n  return selectorOrElement;\n};\n\nconst isVisible = element => {\n  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length);\n};\nconst setVisible = (selectorOrElement, show, important = false) => {\n  const element = getElement(selectorOrElement);\n\n  if (!element) {\n    return;\n  }\n\n  const currentValue = element.style.getPropertyValue('display');\n\n  if (!show) {\n    if (currentValue === 'none') {\n      return;\n    }\n\n    element.style.setProperty('display', 'none', important ? 'important' : '');\n  } else {\n    if (currentValue === 'none') {\n      element.style.removeProperty('display');\n    } // still not visible (if something else added display: none in CSS)\n\n\n    if (!isVisible(element)) {\n      element.style.setProperty('display', 'block');\n    }\n  }\n};\nconst hide = (selectorOrElement, important = false) => {\n  setVisible(selectorOrElement, false, important);\n};\nconst show = selectorOrElement => {\n  setVisible(selectorOrElement, true);\n};\n;// CONCATENATED MODULE: ./resources/js/modules/ContextBootstrap/CheckoutBootstap.js\n\n\n\n\n\nclass CheckoutBootstap {\n  constructor(gateway, renderer, messages, spinner) {\n    this.gateway = gateway;\n    this.renderer = renderer;\n    this.messages = messages;\n    this.spinner = spinner;\n    this.standardOrderButtonSelector = ORDER_BUTTON_SELECTOR;\n    this.buttonChangeObserver = new MutationObserver(el => {\n      this.updateUi();\n    });\n  }\n\n  init() {\n    this.render(); // Unselect saved card.\n    // WC saves form values, so with our current UI it would be a bit weird\n    // if the user paid with saved, then after some time tries to pay again,\n    // but wants to enter a new card, and to do that they have to choose “Select payment” in the list.\n\n    jQuery('#saved-credit-card').val(jQuery('#saved-credit-card option:first').val());\n    jQuery(document.body).on('updated_checkout', () => {\n      this.render();\n    });\n    jQuery(document.body).on('updated_checkout payment_method_selected', () => {\n      this.updateUi();\n    });\n    jQuery(document).on('hosted_fields_loaded', () => {\n      jQuery('#saved-credit-card').on('change', () => {\n        this.updateUi();\n      });\n    });\n    this.updateUi();\n  }\n\n  shouldRender() {\n    if (document.querySelector(this.gateway.button.cancel_wrapper)) {\n      return false;\n    }\n\n    return document.querySelector(this.gateway.button.wrapper) !== null || document.querySelector(this.gateway.hosted_fields.wrapper) !== null;\n  }\n\n  render() {\n    if (!this.shouldRender()) {\n      return;\n    }\n\n    if (document.querySelector(this.gateway.hosted_fields.wrapper + '>div')) {\n      document.querySelector(this.gateway.hosted_fields.wrapper + '>div').setAttribute('style', '');\n    }\n\n    const actionHandler = new ActionHandler_CheckoutActionHandler(PayPalCommerceGateway, new modules_ErrorHandler(this.gateway.labels.error.generic), this.spinner);\n    this.renderer.render(actionHandler.configuration());\n    this.buttonChangeObserver.observe(document.querySelector(this.standardOrderButtonSelector), {\n      attributes: true\n    });\n  }\n\n  updateUi() {\n    const currentPaymentMethod = getCurrentPaymentMethod();\n    const isPaypal = currentPaymentMethod === PaymentMethods.PAYPAL;\n    const isCard = currentPaymentMethod === PaymentMethods.CARDS;\n    const isSeparateButtonGateway = [PaymentMethods.CARD_BUTTON].includes(currentPaymentMethod);\n    const isSavedCard = isCard && isSavedCardSelected();\n    const isNotOurGateway = !isPaypal && !isCard && !isSeparateButtonGateway;\n    const isFreeTrial = PayPalCommerceGateway.is_free_trial_cart;\n    const hasVaultedPaypal = PayPalCommerceGateway.vaulted_paypal_email !== '';\n    const paypalButtonWrappers = { ...Object.entries(PayPalCommerceGateway.separate_buttons).reduce((result, [k, data]) => {\n        return { ...result,\n          [data.id]: data.wrapper\n        };\n      }, {})\n    };\n    setVisible(this.standardOrderButtonSelector, isPaypal && isFreeTrial && hasVaultedPaypal || isNotOurGateway || isSavedCard, true);\n    setVisible('.ppcp-vaulted-paypal-details', isPaypal);\n    setVisible(this.gateway.button.wrapper, isPaypal && !(isFreeTrial && hasVaultedPaypal));\n    setVisible(this.gateway.messages.wrapper, isPaypal && !isFreeTrial);\n    setVisible(this.gateway.hosted_fields.wrapper, isCard && !isSavedCard);\n\n    for (const [gatewayId, wrapper] of Object.entries(paypalButtonWrappers)) {\n      setVisible(wrapper, gatewayId === currentPaymentMethod);\n    }\n\n    if (isPaypal && !isFreeTrial) {\n      this.messages.render();\n    }\n\n    if (isCard) {\n      if (isSavedCard) {\n        this.disableCreditCardFields();\n      } else {\n        this.enableCreditCardFields();\n      }\n    }\n  }\n\n  disableCreditCardFields() {\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-number\"]').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-number').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-expiry\"]').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-expiry').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-cvc\"]').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-cvc').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"vault\"]').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-vault').addClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-vault').attr(\"disabled\", true);\n    this.renderer.disableCreditCardFields();\n  }\n\n  enableCreditCardFields() {\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-number\"]').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-number').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-expiry\"]').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-expiry').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"ppcp-credit-card-gateway-card-cvc\"]').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-gateway-card-cvc').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('label[for=\"vault\"]').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-vault').removeClass('ppcp-credit-card-gateway-form-field-disabled');\n    jQuery('#ppcp-credit-card-vault').attr(\"disabled\", false);\n    this.renderer.enableCreditCardFields();\n  }\n\n}\n\n/* harmony default export */ const ContextBootstrap_CheckoutBootstap = (CheckoutBootstap);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/Subscriptions.js\nconst isChangePaymentPage = () => {\n  const urlParams = new URLSearchParams(window.location.search);\n  return urlParams.has('change_payment_method');\n};\n;// CONCATENATED MODULE: ./resources/js/modules/ContextBootstrap/PayNowBootstrap.js\n\n\n\nclass PayNowBootstrap extends ContextBootstrap_CheckoutBootstap {\n  constructor(gateway, renderer, messages, spinner) {\n    super(gateway, renderer, messages, spinner);\n  }\n\n  updateUi() {\n    if (isChangePaymentPage()) {\n      return;\n    }\n\n    super.updateUi();\n  }\n\n}\n\n/* harmony default export */ const ContextBootstrap_PayNowBootstrap = (PayNowBootstrap);\n// EXTERNAL MODULE: ./node_modules/deepmerge/dist/cjs.js\nvar cjs = __webpack_require__(996);\nvar cjs_default = /*#__PURE__*/__webpack_require__.n(cjs);\n;// CONCATENATED MODULE: ./resources/js/modules/Renderer/Renderer.js\n\n\nclass Renderer {\n  constructor(creditCardRenderer, defaultSettings, onSmartButtonClick, onSmartButtonsInit) {\n    this.defaultSettings = defaultSettings;\n    this.creditCardRenderer = creditCardRenderer;\n    this.onSmartButtonClick = onSmartButtonClick;\n    this.onSmartButtonsInit = onSmartButtonsInit;\n    this.renderedSources = new Set();\n  }\n\n  render(contextConfig, settingsOverride = {}) {\n    const settings = cjs_default()(this.defaultSettings, settingsOverride);\n    const enabledSeparateGateways = Object.fromEntries(Object.entries(settings.separate_buttons).filter(([s, data]) => document.querySelector(data.wrapper)));\n    const hasEnabledSeparateGateways = Object.keys(enabledSeparateGateways).length !== 0;\n\n    if (!hasEnabledSeparateGateways) {\n      this.renderButtons(settings.button.wrapper, settings.button.style, contextConfig, hasEnabledSeparateGateways);\n    } else {\n      // render each button separately\n      for (const fundingSource of paypal.getFundingSources().filter(s => !(s in enabledSeparateGateways))) {\n        let style = settings.button.style;\n\n        if (fundingSource !== 'paypal') {\n          style = {\n            shape: style.shape\n          };\n        }\n\n        this.renderButtons(settings.button.wrapper, style, contextConfig, hasEnabledSeparateGateways, fundingSource);\n      }\n    }\n\n    this.creditCardRenderer.render(settings.hosted_fields.wrapper, contextConfig);\n\n    for (const [fundingSource, data] of Object.entries(enabledSeparateGateways)) {\n      this.renderButtons(data.wrapper, data.style, contextConfig, hasEnabledSeparateGateways, fundingSource);\n    }\n  }\n\n  renderButtons(wrapper, style, contextConfig, hasEnabledSeparateGateways, fundingSource = null) {\n    if (!document.querySelector(wrapper) || this.isAlreadyRendered(wrapper, fundingSource, hasEnabledSeparateGateways) || 'undefined' === typeof paypal.Buttons) {\n      return;\n    }\n\n    if (fundingSource) {\n      contextConfig.fundingSource = fundingSource;\n    }\n\n    const btn = paypal.Buttons({\n      style,\n      ...contextConfig,\n      onClick: this.onSmartButtonClick,\n      onInit: this.onSmartButtonsInit\n    });\n\n    if (!btn.isEligible()) {\n      return;\n    }\n\n    btn.render(wrapper);\n    this.renderedSources.add(wrapper + fundingSource ?? '');\n  }\n\n  isAlreadyRendered(wrapper, fundingSource, hasEnabledSeparateGateways) {\n    // Simply check that has child nodes when we do not need to render buttons separately,\n    // this will reduce the risk of breaking with different themes/plugins\n    // and on the cart page (where we also do not need to render separately), which may fully reload this part of the page.\n    // Ideally we should also find a way to detect such full reloads and remove the corresponding keys from the set.\n    if (!hasEnabledSeparateGateways) {\n      return document.querySelector(wrapper).hasChildNodes();\n    }\n\n    return this.renderedSources.has(wrapper + fundingSource ?? '');\n  }\n\n  hideButtons(element) {\n    const domElement = document.querySelector(element);\n\n    if (!domElement) {\n      return false;\n    }\n\n    domElement.style.display = 'none';\n    return true;\n  }\n\n  showButtons(element) {\n    const domElement = document.querySelector(element);\n\n    if (!domElement) {\n      return false;\n    }\n\n    domElement.style.display = 'block';\n    return true;\n  }\n\n  disableCreditCardFields() {\n    this.creditCardRenderer.disableFields();\n  }\n\n  enableCreditCardFields() {\n    this.creditCardRenderer.enableFields();\n  }\n\n}\n\n/* harmony default export */ const Renderer_Renderer = (Renderer);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/DccInputFactory.js\nconst dccInputFactory = original => {\n  const styles = window.getComputedStyle(original);\n  const newElement = document.createElement('span');\n  newElement.setAttribute('id', original.id);\n  newElement.setAttribute('class', original.className);\n  Object.values(styles).forEach(prop => {\n    if (!styles[prop] || !isNaN(prop) || prop === 'background-image') {\n      return;\n    }\n\n    newElement.style.setProperty(prop, '' + styles[prop]);\n  });\n  return newElement;\n};\n\n/* harmony default export */ const DccInputFactory = (dccInputFactory);\n;// CONCATENATED MODULE: ./resources/js/modules/Renderer/CreditCardRenderer.js\n\n\n\n\nclass CreditCardRenderer {\n  constructor(defaultConfig, errorHandler, spinner) {\n    this.defaultConfig = defaultConfig;\n    this.errorHandler = errorHandler;\n    this.spinner = spinner;\n    this.cardValid = false;\n    this.formValid = false;\n    this.currentHostedFieldsInstance = null;\n  }\n\n  render(wrapper, contextConfig) {\n    if (this.defaultConfig.context !== 'checkout' && this.defaultConfig.context !== 'pay-now' || wrapper === null || document.querySelector(wrapper) === null) {\n      return;\n    }\n\n    if (typeof paypal.HostedFields === 'undefined' || !paypal.HostedFields.isEligible()) {\n      const wrapperElement = document.querySelector(wrapper);\n      wrapperElement.parentNode.removeChild(wrapperElement);\n      return;\n    }\n\n    const buttonSelector = wrapper + ' button';\n\n    if (this.currentHostedFieldsInstance) {\n      this.currentHostedFieldsInstance.teardown().catch(err => console.error(`Hosted fields teardown error: ${err}`));\n      this.currentHostedFieldsInstance = null;\n    }\n\n    const gateWayBox = document.querySelector('.payment_box.payment_method_ppcp-credit-card-gateway');\n\n    if (!gateWayBox) {\n      return;\n    }\n\n    const oldDisplayStyle = gateWayBox.style.display;\n    gateWayBox.style.display = 'block';\n    const hideDccGateway = document.querySelector('#ppcp-hide-dcc');\n\n    if (hideDccGateway) {\n      hideDccGateway.parentNode.removeChild(hideDccGateway);\n    }\n\n    const cardNumberField = document.querySelector('#ppcp-credit-card-gateway-card-number');\n    const stylesRaw = window.getComputedStyle(cardNumberField);\n    let styles = {};\n    Object.values(stylesRaw).forEach(prop => {\n      if (!stylesRaw[prop]) {\n        return;\n      }\n\n      styles[prop] = '' + stylesRaw[prop];\n    });\n    const cardNumber = DccInputFactory(cardNumberField);\n    cardNumberField.parentNode.replaceChild(cardNumber, cardNumberField);\n    const cardExpiryField = document.querySelector('#ppcp-credit-card-gateway-card-expiry');\n    const cardExpiry = DccInputFactory(cardExpiryField);\n    cardExpiryField.parentNode.replaceChild(cardExpiry, cardExpiryField);\n    const cardCodeField = document.querySelector('#ppcp-credit-card-gateway-card-cvc');\n    const cardCode = DccInputFactory(cardCodeField);\n    cardCodeField.parentNode.replaceChild(cardCode, cardCodeField);\n    gateWayBox.style.display = oldDisplayStyle;\n    const formWrapper = '.payment_box payment_method_ppcp-credit-card-gateway';\n\n    if (this.defaultConfig.enforce_vault && document.querySelector(formWrapper + ' .ppcp-credit-card-vault')) {\n      document.querySelector(formWrapper + ' .ppcp-credit-card-vault').checked = true;\n      document.querySelector(formWrapper + ' .ppcp-credit-card-vault').setAttribute('disabled', true);\n    }\n\n    paypal.HostedFields.render({\n      createOrder: contextConfig.createOrder,\n      styles: {\n        'input': styles\n      },\n      fields: {\n        number: {\n          selector: '#ppcp-credit-card-gateway-card-number',\n          placeholder: this.defaultConfig.hosted_fields.labels.credit_card_number\n        },\n        cvv: {\n          selector: '#ppcp-credit-card-gateway-card-cvc',\n          placeholder: this.defaultConfig.hosted_fields.labels.cvv\n        },\n        expirationDate: {\n          selector: '#ppcp-credit-card-gateway-card-expiry',\n          placeholder: this.defaultConfig.hosted_fields.labels.mm_yy\n        }\n      }\n    }).then(hostedFields => {\n      document.dispatchEvent(new CustomEvent(\"hosted_fields_loaded\"));\n      this.currentHostedFieldsInstance = hostedFields;\n      hostedFields.on('inputSubmitRequest', () => {\n        this._submit(contextConfig);\n      });\n      hostedFields.on('cardTypeChange', event => {\n        if (!event.cards.length) {\n          this.cardValid = false;\n          return;\n        }\n\n        const validCards = this.defaultConfig.hosted_fields.valid_cards;\n        this.cardValid = validCards.indexOf(event.cards[0].type) !== -1;\n\n        const className = this._cardNumberFiledCLassNameByCardType(event.cards[0].type);\n\n        this._recreateElementClassAttribute(cardNumber, cardNumberField.className);\n\n        if (event.fields.number.isValid) {\n          cardNumber.classList.add(className);\n        }\n      });\n      hostedFields.on('validityChange', event => {\n        const formValid = Object.keys(event.fields).every(function (key) {\n          return event.fields[key].isValid;\n        });\n\n        const className = this._cardNumberFiledCLassNameByCardType(event.cards[0].type);\n\n        event.fields.number.isValid ? cardNumber.classList.add(className) : this._recreateElementClassAttribute(cardNumber, cardNumberField.className);\n        this.formValid = formValid;\n      });\n      show(buttonSelector);\n\n      if (document.querySelector(wrapper).getAttribute('data-ppcp-subscribed') !== true) {\n        document.querySelector(buttonSelector).addEventListener('click', event => {\n          event.preventDefault();\n\n          this._submit(contextConfig);\n        });\n        document.querySelector(wrapper).setAttribute('data-ppcp-subscribed', true);\n      }\n    });\n    document.querySelector('#payment_method_ppcp-credit-card-gateway').addEventListener('click', () => {\n      document.querySelector('label[for=ppcp-credit-card-gateway-card-number]').click();\n    });\n  }\n\n  disableFields() {\n    if (this.currentHostedFieldsInstance) {\n      this.currentHostedFieldsInstance.setAttribute({\n        field: 'number',\n        attribute: 'disabled'\n      });\n      this.currentHostedFieldsInstance.setAttribute({\n        field: 'cvv',\n        attribute: 'disabled'\n      });\n      this.currentHostedFieldsInstance.setAttribute({\n        field: 'expirationDate',\n        attribute: 'disabled'\n      });\n    }\n  }\n\n  enableFields() {\n    if (this.currentHostedFieldsInstance) {\n      this.currentHostedFieldsInstance.removeAttribute({\n        field: 'number',\n        attribute: 'disabled'\n      });\n      this.currentHostedFieldsInstance.removeAttribute({\n        field: 'cvv',\n        attribute: 'disabled'\n      });\n      this.currentHostedFieldsInstance.removeAttribute({\n        field: 'expirationDate',\n        attribute: 'disabled'\n      });\n    }\n  }\n\n  _submit(contextConfig) {\n    this.spinner.block();\n    this.errorHandler.clear();\n\n    if (this.formValid && this.cardValid) {\n      const save_card = this.defaultConfig.can_save_vault_token ? true : false;\n      let vault = document.getElementById('ppcp-credit-card-vault') ? document.getElementById('ppcp-credit-card-vault').checked : save_card;\n\n      if (this.defaultConfig.enforce_vault) {\n        vault = true;\n      }\n\n      const contingency = this.defaultConfig.hosted_fields.contingency;\n      const hostedFieldsData = {\n        vault: vault\n      };\n\n      if (contingency !== 'NO_3D_SECURE') {\n        hostedFieldsData.contingencies = [contingency];\n      }\n\n      if (this.defaultConfig.payer) {\n        hostedFieldsData.cardholderName = this.defaultConfig.payer.name.given_name + ' ' + this.defaultConfig.payer.name.surname;\n      }\n\n      if (!hostedFieldsData.cardholderName) {\n        const firstName = document.getElementById('billing_first_name') ? document.getElementById('billing_first_name').value : '';\n        const lastName = document.getElementById('billing_last_name') ? document.getElementById('billing_last_name').value : '';\n        hostedFieldsData.cardholderName = firstName + ' ' + lastName;\n      }\n\n      this.currentHostedFieldsInstance.submit(hostedFieldsData).then(payload => {\n        payload.orderID = payload.orderId;\n        this.spinner.unblock();\n        return contextConfig.onApprove(payload);\n      }).catch(err => {\n        this.spinner.unblock();\n        this.errorHandler.clear();\n\n        if (err.details) {\n          this.errorHandler.message(err.details.map(d => `${d.issue} ${d.description}`).join('<br/>'), true);\n        }\n      });\n    } else {\n      this.spinner.unblock();\n      const message = !this.cardValid ? this.defaultConfig.hosted_fields.labels.card_not_supported : this.defaultConfig.hosted_fields.labels.fields_not_valid;\n      this.errorHandler.message(message);\n    }\n  }\n\n  _cardNumberFiledCLassNameByCardType(cardType) {\n    return cardType === 'american-express' ? 'amex' : cardType.replace('-', '');\n  }\n\n  _recreateElementClassAttribute(element, newClassName) {\n    element.removeAttribute('class');\n    element.setAttribute('class', newClassName);\n  }\n\n}\n\n/* harmony default export */ const Renderer_CreditCardRenderer = (CreditCardRenderer);\n;// CONCATENATED MODULE: ./resources/js/modules/DataClientIdAttributeHandler.js\nconst storageKey = 'ppcp-data-client-id';\n\nconst validateToken = (token, user) => {\n  if (!token) {\n    return false;\n  }\n\n  if (token.user !== user) {\n    return false;\n  }\n\n  const currentTime = new Date().getTime();\n  const isExpired = currentTime >= token.expiration * 1000;\n  return !isExpired;\n};\n\nconst storedTokenForUser = user => {\n  const token = JSON.parse(sessionStorage.getItem(storageKey));\n\n  if (validateToken(token, user)) {\n    return token.token;\n  }\n\n  return null;\n};\n\nconst storeToken = token => {\n  sessionStorage.setItem(storageKey, JSON.stringify(token));\n};\n\nconst dataClientIdAttributeHandler = (script, config) => {\n  fetch(config.endpoint, {\n    method: 'POST',\n    body: JSON.stringify({\n      nonce: config.nonce\n    })\n  }).then(res => {\n    return res.json();\n  }).then(data => {\n    const isValid = validateToken(data, config.user);\n\n    if (!isValid) {\n      return;\n    }\n\n    storeToken(data);\n    script.setAttribute('data-client-token', data.token);\n    document.body.append(script);\n  });\n};\n\n/* harmony default export */ const DataClientIdAttributeHandler = (dataClientIdAttributeHandler);\n;// CONCATENATED MODULE: ./resources/js/modules/Renderer/MessageRenderer.js\nclass MessageRenderer {\n  constructor(config) {\n    this.config = config;\n  }\n\n  render() {\n    if (!this.shouldRender()) {\n      return;\n    }\n\n    paypal.Messages({\n      amount: this.config.amount,\n      placement: this.config.placement,\n      style: this.config.style\n    }).render(this.config.wrapper);\n    jQuery(document.body).on('updated_cart_totals', () => {\n      paypal.Messages({\n        amount: this.config.amount,\n        placement: this.config.placement,\n        style: this.config.style\n      }).render(this.config.wrapper);\n    });\n  }\n\n  renderWithAmount(amount) {\n    if (!this.shouldRender()) {\n      return;\n    }\n\n    const newWrapper = document.createElement('div');\n    newWrapper.setAttribute('id', this.config.wrapper.replace('#', ''));\n    const sibling = document.querySelector(this.config.wrapper).nextSibling;\n    document.querySelector(this.config.wrapper).parentElement.removeChild(document.querySelector(this.config.wrapper));\n    sibling.parentElement.insertBefore(newWrapper, sibling);\n    paypal.Messages({\n      amount,\n      placement: this.config.placement,\n      style: this.config.style\n    }).render(this.config.wrapper);\n  }\n\n  shouldRender() {\n    if (typeof paypal.Messages === 'undefined' || typeof this.config.wrapper === 'undefined') {\n      return false;\n    }\n\n    if (!document.querySelector(this.config.wrapper)) {\n      return false;\n    }\n\n    return true;\n  }\n\n  hideMessages() {\n    const domElement = document.querySelector(this.config.wrapper);\n\n    if (!domElement) {\n      return false;\n    }\n\n    domElement.style.display = 'none';\n    return true;\n  }\n\n}\n\n/* harmony default export */ const Renderer_MessageRenderer = (MessageRenderer);\n;// CONCATENATED MODULE: ./resources/js/modules/Helper/Spinner.js\nclass Spinner {\n  constructor(target = 'form.woocommerce-checkout') {\n    this.target = target;\n  }\n\n  setTarget(target) {\n    this.target = target;\n  }\n\n  block() {\n    jQuery(this.target).block({\n      message: null,\n      overlayCSS: {\n        background: '#fff',\n        opacity: 0.6\n      }\n    });\n  }\n\n  unblock() {\n    jQuery(this.target).unblock();\n  }\n\n}\n\n/* harmony default export */ const Helper_Spinner = (Spinner);\n;// CONCATENATED MODULE: ./resources/js/modules/ActionHandler/FreeTrialHandler.js\n\n\n\nclass FreeTrialHandler {\n  constructor(config, spinner, errorHandler) {\n    this.config = config;\n    this.spinner = spinner;\n    this.errorHandler = errorHandler;\n  }\n\n  handle() {\n    this.spinner.block();\n    fetch(this.config.ajax.vault_paypal.endpoint, {\n      method: 'POST',\n      body: JSON.stringify({\n        nonce: this.config.ajax.vault_paypal.nonce,\n        return_url: location.href\n      })\n    }).then(res => {\n      return res.json();\n    }).then(data => {\n      if (!data.success) {\n        this.spinner.unblock();\n        console.error(data);\n        this.errorHandler.message(data.data.message);\n        throw Error(data.data.message);\n      }\n\n      location.href = data.data.approve_link;\n    }).catch(error => {\n      this.spinner.unblock();\n      console.error(error);\n      this.errorHandler.genericError();\n    });\n  }\n\n}\n\n/* harmony default export */ const ActionHandler_FreeTrialHandler = (FreeTrialHandler);\n;// CONCATENATED MODULE: ./resources/js/button.js\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n // TODO: could be a good idea to have a separate spinner for each gateway,\n// but I think we care mainly about the script loading, so one spinner should be enough.\n\nconst buttonsSpinner = new Helper_Spinner(document.querySelector('.ppc-button-wrapper'));\nconst cardsSpinner = new Helper_Spinner('#ppcp-hosted-fields');\n\nconst bootstrap = () => {\n  const errorHandler = new modules_ErrorHandler(PayPalCommerceGateway.labels.error.generic);\n  const spinner = new Helper_Spinner();\n  const creditCardRenderer = new Renderer_CreditCardRenderer(PayPalCommerceGateway, errorHandler, spinner);\n  const freeTrialHandler = new ActionHandler_FreeTrialHandler(PayPalCommerceGateway, spinner, errorHandler);\n\n  const onSmartButtonClick = (data, actions) => {\n    window.ppcpFundingSource = data.fundingSource;\n\n    if (PayPalCommerceGateway.basic_checkout_validation_enabled) {\n      // TODO: quick fix to get the error about empty form before attempting PayPal order\n      // it should solve #513 for most of the users, but proper solution should be implemented later.\n      const requiredFields = jQuery('form.woocommerce-checkout .validate-required:visible :input');\n      requiredFields.each((i, input) => {\n        jQuery(input).trigger('validate');\n      });\n      const invalidFields = Array.from(jQuery('form.woocommerce-checkout .validate-required.woocommerce-invalid:visible'));\n\n      if (invalidFields.length) {\n        const billingFieldsContainer = document.querySelector('.woocommerce-billing-fields');\n        const shippingFieldsContainer = document.querySelector('.woocommerce-shipping-fields');\n        const nameMessageMap = PayPalCommerceGateway.labels.error.required.elements;\n        const messages = invalidFields.map(el => {\n          const name = el.querySelector('[name]')?.getAttribute('name');\n\n          if (name && name in nameMessageMap) {\n            return nameMessageMap[name];\n          }\n\n          let label = el.querySelector('label').textContent.replaceAll('*', '').trim();\n\n          if (billingFieldsContainer?.contains(el)) {\n            label = PayPalCommerceGateway.labels.billing_field.replace('%s', label);\n          }\n\n          if (shippingFieldsContainer?.contains(el)) {\n            label = PayPalCommerceGateway.labels.shipping_field.replace('%s', label);\n          }\n\n          return PayPalCommerceGateway.labels.error.required.field.replace('%s', `<strong>${label}</strong>`);\n        }).filter(s => s.length > 2);\n        errorHandler.clear();\n\n        if (messages.length) {\n          errorHandler.messages(messages);\n        } else {\n          errorHandler.message(PayPalCommerceGateway.labels.error.required.generic);\n        }\n\n        return actions.reject();\n      }\n    }\n\n    const form = document.querySelector('form.woocommerce-checkout');\n\n    if (form) {\n      jQuery('#ppcp-funding-source-form-input').remove();\n      form.insertAdjacentHTML('beforeend', `<input type=\"hidden\" name=\"ppcp-funding-source\" value=\"${data.fundingSource}\" id=\"ppcp-funding-source-form-input\">`);\n    }\n\n    const isFreeTrial = PayPalCommerceGateway.is_free_trial_cart;\n\n    if (isFreeTrial && data.fundingSource !== 'card') {\n      freeTrialHandler.handle();\n      return actions.reject();\n    }\n  };\n\n  const onSmartButtonsInit = () => {\n    buttonsSpinner.unblock();\n  };\n\n  const renderer = new Renderer_Renderer(creditCardRenderer, PayPalCommerceGateway, onSmartButtonClick, onSmartButtonsInit);\n  const messageRenderer = new Renderer_MessageRenderer(PayPalCommerceGateway.messages);\n  const context = PayPalCommerceGateway.context;\n\n  if (context === 'mini-cart' || context === 'product') {\n    if (PayPalCommerceGateway.mini_cart_buttons_enabled === '1') {\n      const miniCartBootstrap = new ContextBootstrap_MiniCartBootstap(PayPalCommerceGateway, renderer);\n      miniCartBootstrap.init();\n    }\n  }\n\n  if (context === 'product' && PayPalCommerceGateway.single_product_buttons_enabled === '1') {\n    const singleProductBootstrap = new ContextBootstrap_SingleProductBootstap(PayPalCommerceGateway, renderer, messageRenderer);\n    singleProductBootstrap.init();\n  }\n\n  if (context === 'cart') {\n    const cartBootstrap = new CartBootstap(PayPalCommerceGateway, renderer);\n    cartBootstrap.init();\n  }\n\n  if (context === 'checkout') {\n    const checkoutBootstap = new ContextBootstrap_CheckoutBootstap(PayPalCommerceGateway, renderer, messageRenderer, spinner);\n    checkoutBootstap.init();\n  }\n\n  if (context === 'pay-now') {\n    const payNowBootstrap = new ContextBootstrap_PayNowBootstrap(PayPalCommerceGateway, renderer, messageRenderer, spinner);\n    payNowBootstrap.init();\n  }\n\n  if (context !== 'checkout') {\n    messageRenderer.render();\n  }\n};\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  if (!typeof PayPalCommerceGateway) {\n    console.error('PayPal button could not be configured.');\n    return;\n  }\n\n  if (PayPalCommerceGateway.context !== 'checkout' && PayPalCommerceGateway.data_client_id.user === 0 && PayPalCommerceGateway.data_client_id.has_subscriptions) {\n    return;\n  }\n\n  const paypalButtonGatewayIds = [PaymentMethods.PAYPAL, ...Object.entries(PayPalCommerceGateway.separate_buttons).map(([k, data]) => data.id)]; // Sometimes PayPal script takes long time to load,\n  // so we additionally hide the standard order button here to avoid failed orders.\n  // Normally it is hidden later after the script load.\n\n  const hideOrderButtonIfPpcpGateway = () => {\n    // only in checkout and pay now page, otherwise it may break things (e.g. payment via product page),\n    // and also the loading spinner may look weird on other pages\n    if (!['checkout', 'pay-now'].includes(PayPalCommerceGateway.context) || isChangePaymentPage() || PayPalCommerceGateway.is_free_trial_cart && PayPalCommerceGateway.vaulted_paypal_email !== '') {\n      return;\n    }\n\n    const currentPaymentMethod = getCurrentPaymentMethod();\n    const isPaypalButton = paypalButtonGatewayIds.includes(currentPaymentMethod);\n    const isCards = currentPaymentMethod === PaymentMethods.CARDS;\n    setVisible(ORDER_BUTTON_SELECTOR, !isPaypalButton && !isCards, true);\n\n    if (isPaypalButton) {\n      // stopped after the first rendering of the buttons, in onInit\n      buttonsSpinner.block();\n    } else {\n      buttonsSpinner.unblock();\n    }\n\n    if (isCards) {\n      cardsSpinner.block();\n    } else {\n      cardsSpinner.unblock();\n    }\n  };\n\n  jQuery(document).on('hosted_fields_loaded', () => {\n    cardsSpinner.unblock();\n  });\n  let bootstrapped = false;\n  hideOrderButtonIfPpcpGateway();\n  jQuery(document.body).on('updated_checkout payment_method_selected', () => {\n    if (bootstrapped) {\n      return;\n    }\n\n    hideOrderButtonIfPpcpGateway();\n  });\n  const script = document.createElement('script');\n  script.addEventListener('load', event => {\n    bootstrapped = true;\n    bootstrap();\n  });\n  script.setAttribute('src', PayPalCommerceGateway.button.url);\n  Object.entries(PayPalCommerceGateway.script_attributes).forEach(keyValue => {\n    script.setAttribute(keyValue[0], keyValue[1]);\n  });\n\n  if (PayPalCommerceGateway.data_client_id.set_attribute) {\n    DataClientIdAttributeHandler(script, PayPalCommerceGateway.data_client_id);\n    return;\n  }\n\n  document.body.append(script);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFBQSxRQUFRLENBQUM2QyxJQUFULENBQWM4SixNQUFkLENBQXFCK0ssTUFBckI7QUFDSCxDQTFGTCIsInNvdXJjZXMiOlsid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9FcnJvckhhbmRsZXIuanM/ZTY1YSIsIndlYnBhY2s6Ly9wcGMtYnV0dG9uLy4vcmVzb3VyY2VzL2pzL21vZHVsZXMvT25BcHByb3ZlSGFuZGxlci9vbkFwcHJvdmVGb3JDb250aW51ZS5qcz9jNDU0Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9IZWxwZXIvUGF5ZXJEYXRhLmpzPzJhZjEiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL0hlbHBlci9DaGVja291dE1ldGhvZFN0YXRlLmpzPzgwYTMiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL0FjdGlvbkhhbmRsZXIvQ2FydEFjdGlvbkhhbmRsZXIuanM/ODJjZiIsIndlYnBhY2s6Ly9wcGMtYnV0dG9uLy4vcmVzb3VyY2VzL2pzL21vZHVsZXMvQ29udGV4dEJvb3RzdHJhcC9NaW5pQ2FydEJvb3RzdGFwLmpzP2Q1NTIiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL0hlbHBlci9VcGRhdGVDYXJ0LmpzP2U0MjIiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL0hlbHBlci9CdXR0b25zVG9nZ2xlTGlzdGVuZXIuanM/ZTE5MyIsIndlYnBhY2s6Ly9wcGMtYnV0dG9uLy4vcmVzb3VyY2VzL2pzL21vZHVsZXMvRW50aXR5L1Byb2R1Y3QuanM/OWZmZiIsIndlYnBhY2s6Ly9wcGMtYnV0dG9uLy4vcmVzb3VyY2VzL2pzL21vZHVsZXMvQWN0aW9uSGFuZGxlci9TaW5nbGVQcm9kdWN0QWN0aW9uSGFuZGxlci5qcz9kOWI3Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9Db250ZXh0Qm9vdHN0cmFwL1NpbmdsZVByb2R1Y3RCb290c3RhcC5qcz83YzE5Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9Db250ZXh0Qm9vdHN0cmFwL0NhcnRCb290c3RhcC5qcz81ZTk0Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9PbkFwcHJvdmVIYW5kbGVyL29uQXBwcm92ZUZvclBheU5vdy5qcz85MzA1Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9BY3Rpb25IYW5kbGVyL0NoZWNrb3V0QWN0aW9uSGFuZGxlci5qcz84NTE1Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9IZWxwZXIvSGlkaW5nLmpzPzFkMzYiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL0NvbnRleHRCb290c3RyYXAvQ2hlY2tvdXRCb290c3RhcC5qcz9jODU1Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9IZWxwZXIvU3Vic2NyaXB0aW9ucy5qcz9iODcwIiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9Db250ZXh0Qm9vdHN0cmFwL1BheU5vd0Jvb3RzdHJhcC5qcz9kOWY1Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9SZW5kZXJlci9SZW5kZXJlci5qcz9mYTkzIiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9IZWxwZXIvRGNjSW5wdXRGYWN0b3J5LmpzPzJhMmYiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL1JlbmRlcmVyL0NyZWRpdENhcmRSZW5kZXJlci5qcz8zODdhIiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9EYXRhQ2xpZW50SWRBdHRyaWJ1dGVIYW5kbGVyLmpzP2VlMGIiLCJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL3Jlc291cmNlcy9qcy9tb2R1bGVzL1JlbmRlcmVyL01lc3NhZ2VSZW5kZXJlci5qcz9jZDAyIiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9IZWxwZXIvU3Bpbm5lci5qcz8xNzA4Iiwid2VicGFjazovL3BwYy1idXR0b24vLi9yZXNvdXJjZXMvanMvbW9kdWxlcy9BY3Rpb25IYW5kbGVyL0ZyZWVUcmlhbEhhbmRsZXIuanM/YWI3NyIsIndlYnBhY2s6Ly9wcGMtYnV0dG9uLy4vcmVzb3VyY2VzL2pzL2J1dHRvbi5qcz8wNjBmIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEVycm9ySGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihnZW5lcmljRXJyb3JUZXh0KVxuICAgIHtcbiAgICAgICAgdGhpcy5nZW5lcmljRXJyb3JUZXh0ID0gZ2VuZXJpY0Vycm9yVGV4dDtcbiAgICAgICAgdGhpcy53cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndvb2NvbW1lcmNlLW5vdGljZXMtd3JhcHBlcicpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsLndvb2NvbW1lcmNlLWVycm9yJyk7XG4gICAgfVxuXG4gICAgZ2VuZXJpY0Vycm9yKCkge1xuICAgICAgICBpZiAodGhpcy53cmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygncHBjcC1wZXJzaXN0JykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgIHRoaXMubWVzc2FnZSh0aGlzLmdlbmVyaWNFcnJvclRleHQpXG4gICAgfVxuXG4gICAgYXBwZW5kUHJlcGFyZWRFcnJvck1lc3NhZ2VFbGVtZW50KGVycm9yTWVzc2FnZUVsZW1lbnQpXG4gICAge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlc0xpc3QgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVNZXNzYWdlc0xpc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubWVzc2FnZXNMaXN0LnJlcGxhY2VXaXRoKGVycm9yTWVzc2FnZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZXh0XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBwZXJzaXN0XG4gICAgICovXG4gICAgbWVzc2FnZSh0ZXh0LCBwZXJzaXN0ID0gZmFsc2UpXG4gICAge1xuICAgICAgICB0aGlzLl9hZGRNZXNzYWdlKHRleHQsIHBlcnNpc3QpO1xuXG4gICAgICAgIHRoaXMuX3Njcm9sbFRvTWVzc2FnZXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0ZXh0c1xuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcGVyc2lzdFxuICAgICAqL1xuICAgIG1lc3NhZ2VzKHRleHRzLCBwZXJzaXN0ID0gZmFsc2UpXG4gICAge1xuICAgICAgICB0ZXh0cy5mb3JFYWNoKHQgPT4gdGhpcy5fYWRkTWVzc2FnZSh0LCBwZXJzaXN0KSk7XG5cbiAgICAgICAgdGhpcy5fc2Nyb2xsVG9NZXNzYWdlcygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRleHRcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHBlcnNpc3RcbiAgICAgKi9cbiAgICBfYWRkTWVzc2FnZSh0ZXh0LCBwZXJzaXN0ID0gZmFsc2UpXG4gICAge1xuICAgICAgICBpZighIHR5cGVvZiBTdHJpbmcgfHwgdGV4dC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQSBuZXcgbWVzc2FnZSB0ZXh0IG11c3QgYmUgYSBub24tZW1wdHkgc3RyaW5nLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZXNMaXN0ID09PSBudWxsKXtcbiAgICAgICAgICAgIHRoaXMuX3ByZXBhcmVNZXNzYWdlc0xpc3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwZXJzaXN0KSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuY2xhc3NMaXN0LmFkZCgncHBjcC1wZXJzaXN0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgncHBjcC1wZXJzaXN0Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWVzc2FnZU5vZGUgPSB0aGlzLl9wcmVwYXJlTWVzc2FnZXNMaXN0SXRlbSh0ZXh0KTtcbiAgICAgICAgdGhpcy5tZXNzYWdlc0xpc3QuYXBwZW5kQ2hpbGQobWVzc2FnZU5vZGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Njcm9sbFRvTWVzc2FnZXMoKVxuICAgIHtcbiAgICAgICAgalF1ZXJ5LnNjcm9sbF90b19ub3RpY2VzKGpRdWVyeSgnLndvb2NvbW1lcmNlLW5vdGljZXMtd3JhcHBlcicpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wcmVwYXJlTWVzc2FnZXNMaXN0KClcbiAgICB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VzTGlzdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc0xpc3Quc2V0QXR0cmlidXRlKCdjbGFzcycsICd3b29jb21tZXJjZS1lcnJvcicpO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlc0xpc3Quc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG4gICAgICAgICAgICB0aGlzLndyYXBwZXIuYXBwZW5kQ2hpbGQodGhpcy5tZXNzYWdlc0xpc3QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcHJlcGFyZU1lc3NhZ2VzTGlzdEl0ZW0obWVzc2FnZSlcbiAgICB7XG4gICAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgbGkuaW5uZXJIVE1MID0gbWVzc2FnZTtcblxuICAgICAgICByZXR1cm4gbGk7XG4gICAgfVxuXG4gICAgY2xlYXIoKVxuICAgIHtcbiAgICAgICAgaWYgKHRoaXMubWVzc2FnZXNMaXN0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1lc3NhZ2VzTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVycm9ySGFuZGxlcjtcbiIsImNvbnN0IG9uQXBwcm92ZSA9IChjb250ZXh0LCBlcnJvckhhbmRsZXIpID0+IHtcbiAgICByZXR1cm4gKGRhdGEsIGFjdGlvbnMpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGNvbnRleHQuY29uZmlnLmFqYXguYXBwcm92ZV9vcmRlci5lbmRwb2ludCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgbm9uY2U6IGNvbnRleHQuY29uZmlnLmFqYXguYXBwcm92ZV9vcmRlci5ub25jZSxcbiAgICAgICAgICAgICAgICBvcmRlcl9pZDpkYXRhLm9yZGVySUQsXG4gICAgICAgICAgICAgICAgZnVuZGluZ19zb3VyY2U6IHdpbmRvdy5wcGNwRnVuZGluZ1NvdXJjZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICB9KS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIuZ2VuZXJpY0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGlvbnMucmVzdGFydCgpLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlci5nZW5lcmljRXJyb3IoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBjb250ZXh0LmNvbmZpZy5yZWRpcmVjdDtcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9uQXBwcm92ZTtcbiIsImV4cG9ydCBjb25zdCBwYXllckRhdGEgPSAoKSA9PiB7XG4gICAgY29uc3QgcGF5ZXIgPSBQYXlQYWxDb21tZXJjZUdhdGV3YXkucGF5ZXI7XG4gICAgaWYgKCEgcGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGhvbmUgPSAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfcGhvbmUnKSB8fCB0eXBlb2YgcGF5ZXIucGhvbmUgIT09ICd1bmRlZmluZWQnKSA/XG4gICAge1xuICAgICAgICBwaG9uZV90eXBlOlwiSE9NRVwiLFxuICAgICAgICAgICAgcGhvbmVfbnVtYmVyOntcbiAgICAgICAgICAgIG5hdGlvbmFsX251bWJlciA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlsbGluZ19waG9uZScpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX3Bob25lJykudmFsdWUgOiBwYXllci5waG9uZS5waG9uZV9udW1iZXIubmF0aW9uYWxfbnVtYmVyXG4gICAgICAgIH1cbiAgICB9IDogbnVsbDtcbiAgICBjb25zdCBwYXllckRhdGEgPSB7XG4gICAgICAgIGVtYWlsX2FkZHJlc3M6KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2VtYWlsJykpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfZW1haWwnKS52YWx1ZSA6IHBheWVyLmVtYWlsX2FkZHJlc3MsXG4gICAgICAgIG5hbWUgOiB7XG4gICAgICAgICAgICBzdXJuYW1lOiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfbGFzdF9uYW1lJykpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfbGFzdF9uYW1lJykudmFsdWUgOiBwYXllci5uYW1lLnN1cm5hbWUsXG4gICAgICAgICAgICBnaXZlbl9uYW1lOiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfZmlyc3RfbmFtZScpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2ZpcnN0X25hbWUnKS52YWx1ZSA6IHBheWVyLm5hbWUuZ2l2ZW5fbmFtZVxuICAgICAgICB9LFxuICAgICAgICBhZGRyZXNzIDoge1xuICAgICAgICAgICAgY291bnRyeV9jb2RlIDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2NvdW50cnknKSkgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlsbGluZ19jb3VudHJ5JykudmFsdWUgOiBwYXllci5hZGRyZXNzLmNvdW50cnlfY29kZSxcbiAgICAgICAgICAgIGFkZHJlc3NfbGluZV8xIDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2FkZHJlc3NfMScpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2FkZHJlc3NfMScpLnZhbHVlIDogcGF5ZXIuYWRkcmVzcy5hZGRyZXNzX2xpbmVfMSxcbiAgICAgICAgICAgIGFkZHJlc3NfbGluZV8yIDogKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2FkZHJlc3NfMicpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX2FkZHJlc3NfMicpLnZhbHVlIDogcGF5ZXIuYWRkcmVzcy5hZGRyZXNzX2xpbmVfMixcbiAgICAgICAgICAgIGFkbWluX2FyZWFfMSA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlsbGluZ19zdGF0ZScpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX3N0YXRlJykudmFsdWUgOiBwYXllci5hZGRyZXNzLmFkbWluX2FyZWFfMSxcbiAgICAgICAgICAgIGFkbWluX2FyZWFfMiA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlsbGluZ19jaXR5JykpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2JpbGxpbmdfY2l0eScpLnZhbHVlIDogcGF5ZXIuYWRkcmVzcy5hZG1pbl9hcmVhXzIsXG4gICAgICAgICAgICBwb3N0YWxfY29kZSA6IChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYmlsbGluZ19wb3N0Y29kZScpKSA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNiaWxsaW5nX3Bvc3Rjb2RlJykudmFsdWUgOiBwYXllci5hZGRyZXNzLnBvc3RhbF9jb2RlXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBob25lKSB7XG4gICAgICAgIHBheWVyRGF0YS5waG9uZSA9IHBob25lO1xuICAgIH1cbiAgICByZXR1cm4gcGF5ZXJEYXRhO1xufVxuIiwiZXhwb3J0IGNvbnN0IFBheW1lbnRNZXRob2RzID0ge1xuICAgIFBBWVBBTDogJ3BwY3AtZ2F0ZXdheScsXG4gICAgQ0FSRFM6ICdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXknLFxuICAgIE9YWE86ICdwcGNwLW94eG8tZ2F0ZXdheScsXG4gICAgQ0FSRF9CVVRUT046ICdwcGNwLWNhcmQtYnV0dG9uLWdhdGV3YXknLFxufTtcblxuZXhwb3J0IGNvbnN0IE9SREVSX0JVVFRPTl9TRUxFQ1RPUiA9ICcjcGxhY2Vfb3JkZXInO1xuXG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFBheW1lbnRNZXRob2QgPSAoKSA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RcIl06Y2hlY2tlZCcpO1xuICAgIGlmICghZWwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsLnZhbHVlO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzU2F2ZWRDYXJkU2VsZWN0ZWQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWRDYXJkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzYXZlZC1jcmVkaXQtY2FyZCcpO1xuICAgIHJldHVybiBzYXZlZENhcmRMaXN0ICYmIHNhdmVkQ2FyZExpc3QudmFsdWUgIT09ICcnO1xufTtcbiIsImltcG9ydCBvbkFwcHJvdmUgZnJvbSAnLi4vT25BcHByb3ZlSGFuZGxlci9vbkFwcHJvdmVGb3JDb250aW51ZS5qcyc7XG5pbXBvcnQge3BheWVyRGF0YX0gZnJvbSBcIi4uL0hlbHBlci9QYXllckRhdGFcIjtcbmltcG9ydCB7UGF5bWVudE1ldGhvZHN9IGZyb20gXCIuLi9IZWxwZXIvQ2hlY2tvdXRNZXRob2RTdGF0ZVwiO1xuXG5jbGFzcyBDYXJ0QWN0aW9uSGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcsIGVycm9ySGFuZGxlcikge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBlcnJvckhhbmRsZXI7XG4gICAgfVxuXG4gICAgY29uZmlndXJhdGlvbigpIHtcbiAgICAgICAgY29uc3QgY3JlYXRlT3JkZXIgPSAoZGF0YSwgYWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF5ZXIgPSBwYXllckRhdGEoKTtcbiAgICAgICAgICAgIGNvbnN0IGJuQ29kZSA9IHR5cGVvZiB0aGlzLmNvbmZpZy5ibl9jb2Rlc1t0aGlzLmNvbmZpZy5jb250ZXh0XSAhPT0gJ3VuZGVmaW5lZCcgP1xuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLmJuX2NvZGVzW3RoaXMuY29uZmlnLmNvbnRleHRdIDogJyc7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2godGhpcy5jb25maWcuYWpheC5jcmVhdGVfb3JkZXIuZW5kcG9pbnQsIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLmNvbmZpZy5hamF4LmNyZWF0ZV9vcmRlci5ub25jZSxcbiAgICAgICAgICAgICAgICAgICAgcHVyY2hhc2VfdW5pdHM6IFtdLFxuICAgICAgICAgICAgICAgICAgICBwYXltZW50X21ldGhvZDogUGF5bWVudE1ldGhvZHMuUEFZUEFMLFxuICAgICAgICAgICAgICAgICAgICBmdW5kaW5nX3NvdXJjZTogd2luZG93LnBwY3BGdW5kaW5nU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBibl9jb2RlOmJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgcGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQ6dGhpcy5jb25maWcuY29udGV4dFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmICghZGF0YS5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGRhdGEuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGF0YS5pZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjcmVhdGVPcmRlcixcbiAgICAgICAgICAgIG9uQXBwcm92ZTogb25BcHByb3ZlKHRoaXMsIHRoaXMuZXJyb3JIYW5kbGVyKSxcbiAgICAgICAgICAgIG9uRXJyb3I6IChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLmdlbmVyaWNFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2FydEFjdGlvbkhhbmRsZXI7XG4iLCJpbXBvcnQgRXJyb3JIYW5kbGVyIGZyb20gJy4uL0Vycm9ySGFuZGxlcic7XG5pbXBvcnQgQ2FydEFjdGlvbkhhbmRsZXIgZnJvbSAnLi4vQWN0aW9uSGFuZGxlci9DYXJ0QWN0aW9uSGFuZGxlcic7XG5cbmNsYXNzIE1pbmlDYXJ0Qm9vdHN0YXAge1xuICAgIGNvbnN0cnVjdG9yKGdhdGV3YXksIHJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuZ2F0ZXdheSA9IGdhdGV3YXk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5hY3Rpb25IYW5kbGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuXG4gICAgICAgIHRoaXMuYWN0aW9uSGFuZGxlciA9IG5ldyBDYXJ0QWN0aW9uSGFuZGxlcihcbiAgICAgICAgICAgIFBheVBhbENvbW1lcmNlR2F0ZXdheSxcbiAgICAgICAgICAgIG5ldyBFcnJvckhhbmRsZXIodGhpcy5nYXRld2F5LmxhYmVscy5lcnJvci5nZW5lcmljKSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkub24oJ3djX2ZyYWdtZW50c19sb2FkZWQgd2NfZnJhZ21lbnRzX3JlZnJlc2hlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3VsZFJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nYXRld2F5LmJ1dHRvbi5taW5pX2NhcnRfd3JhcHBlcikgIT09IG51bGxcbiAgICAgICAgICAgIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nYXRld2F5Lmhvc3RlZF9maWVsZHMubWluaV9jYXJ0X3dyYXBwZXIpICE9PSBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihcbiAgICAgICAgICAgIHRoaXMuYWN0aW9uSGFuZGxlci5jb25maWd1cmF0aW9uKCksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYnV0dG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXI6IHRoaXMuZ2F0ZXdheS5idXR0b24ubWluaV9jYXJ0X3dyYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB0aGlzLmdhdGV3YXkuYnV0dG9uLm1pbmlfY2FydF9zdHlsZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaUNhcnRCb290c3RhcDtcbiIsImltcG9ydCBQcm9kdWN0IGZyb20gXCIuLi9FbnRpdHkvUHJvZHVjdFwiO1xuY2xhc3MgVXBkYXRlQ2FydCB7XG5cbiAgICBjb25zdHJ1Y3RvcihlbmRwb2ludCwgbm9uY2UpXG4gICAge1xuICAgICAgICB0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQ7XG4gICAgICAgIHRoaXMubm9uY2UgPSBub25jZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSBvblJlc29sdmVcbiAgICAgKiBAcGFyYW0ge1Byb2R1Y3RbXX0gcHJvZHVjdHNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx1bmtub3duPn1cbiAgICAgKi9cbiAgICB1cGRhdGUob25SZXNvbHZlLCBwcm9kdWN0cylcbiAgICB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBmZXRjaChcbiAgICAgICAgICAgICAgICB0aGlzLmVuZHBvaW50LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLm5vbmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHMsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmpzb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghIHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXN1bHQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSBvblJlc29sdmUocmVzdWx0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc29sdmVkKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVwZGF0ZUNhcnQ7IiwiLyoqXG4gKiBXaGVuIHlvdSBjYW4ndCBhZGQgc29tZXRoaW5nIHRvIHRoZSBjYXJ0LCB0aGUgUGF5UGFsIGJ1dHRvbnMgc2hvdWxkIG5vdCBzaG93LlxuICogVGhlcmVmb3JlIHdlIGxpc3RlbiBmb3IgY2hhbmdlcyBvbiB0aGUgYWRkIHRvIGNhcnQgYnV0dG9uIGFuZCBzaG93L2hpZGUgdGhlIGJ1dHRvbnMgYWNjb3JkaW5nbHkuXG4gKi9cblxuY2xhc3MgQnV0dG9uc1RvZ2dsZUxpc3RlbmVyIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBzaG93Q2FsbGJhY2ssIGhpZGVDYWxsYmFjaylcbiAgICB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc2hvd0NhbGxiYWNrID0gc2hvd0NhbGxiYWNrO1xuICAgICAgICB0aGlzLmhpZGVDYWxsYmFjayA9IGhpZGVDYWxsYmFjaztcbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG51bGw7XG4gICAgfVxuXG4gICAgaW5pdCgpXG4gICAge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7IGF0dHJpYnV0ZXMgOiB0cnVlIH07XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2hvd0NhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlci5vYnNlcnZlKHRoaXMuZWxlbWVudCwgY29uZmlnKTtcbiAgICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KClcbiAgICB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uc1RvZ2dsZUxpc3RlbmVyOyIsImNsYXNzIFByb2R1Y3Qge1xuXG4gICAgY29uc3RydWN0b3IoaWQsIHF1YW50aXR5LCB2YXJpYXRpb25zKSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5xdWFudGl0eSA9IHF1YW50aXR5O1xuICAgICAgICB0aGlzLnZhcmlhdGlvbnMgPSB2YXJpYXRpb25zO1xuICAgIH1cblxuICAgIGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDp0aGlzLmlkLFxuICAgICAgICAgICAgcXVhbnRpdHk6dGhpcy5xdWFudGl0eSxcbiAgICAgICAgICAgIHZhcmlhdGlvbnM6dGhpcy52YXJpYXRpb25zXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3Q7IiwiaW1wb3J0IEJ1dHRvbnNUb2dnbGVMaXN0ZW5lciBmcm9tICcuLi9IZWxwZXIvQnV0dG9uc1RvZ2dsZUxpc3RlbmVyJztcbmltcG9ydCBQcm9kdWN0IGZyb20gJy4uL0VudGl0eS9Qcm9kdWN0JztcbmltcG9ydCBvbkFwcHJvdmUgZnJvbSAnLi4vT25BcHByb3ZlSGFuZGxlci9vbkFwcHJvdmVGb3JDb250aW51ZSc7XG5pbXBvcnQge3BheWVyRGF0YX0gZnJvbSBcIi4uL0hlbHBlci9QYXllckRhdGFcIjtcbmltcG9ydCB7UGF5bWVudE1ldGhvZHN9IGZyb20gXCIuLi9IZWxwZXIvQ2hlY2tvdXRNZXRob2RTdGF0ZVwiO1xuXG5jbGFzcyBTaW5nbGVQcm9kdWN0QWN0aW9uSGFuZGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgY29uZmlnLFxuICAgICAgICB1cGRhdGVDYXJ0LFxuICAgICAgICBzaG93QnV0dG9uQ2FsbGJhY2ssXG4gICAgICAgIGhpZGVCdXR0b25DYWxsYmFjayxcbiAgICAgICAgZm9ybUVsZW1lbnQsXG4gICAgICAgIGVycm9ySGFuZGxlclxuICAgICkge1xuICAgICAgICB0aGlzLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgdGhpcy51cGRhdGVDYXJ0ID0gdXBkYXRlQ2FydDtcbiAgICAgICAgdGhpcy5zaG93QnV0dG9uQ2FsbGJhY2sgPSBzaG93QnV0dG9uQ2FsbGJhY2s7XG4gICAgICAgIHRoaXMuaGlkZUJ1dHRvbkNhbGxiYWNrID0gaGlkZUJ1dHRvbkNhbGxiYWNrO1xuICAgICAgICB0aGlzLmZvcm1FbGVtZW50ID0gZm9ybUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuICAgIH1cblxuICAgIGNvbmZpZ3VyYXRpb24oKVxuICAgIHtcblxuICAgICAgICBpZiAoIHRoaXMuaGFzVmFyaWF0aW9ucygpICkge1xuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgQnV0dG9uc1RvZ2dsZUxpc3RlbmVyKFxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcignLnNpbmdsZV9hZGRfdG9fY2FydF9idXR0b24nKSxcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dCdXR0b25DYWxsYmFjayxcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVCdXR0b25DYWxsYmFja1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIG9ic2VydmVyLmluaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjcmVhdGVPcmRlcjogdGhpcy5jcmVhdGVPcmRlcigpLFxuICAgICAgICAgICAgb25BcHByb3ZlOiBvbkFwcHJvdmUodGhpcywgdGhpcy5lcnJvckhhbmRsZXIpLFxuICAgICAgICAgICAgb25FcnJvcjogKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIuZ2VuZXJpY0Vycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVPcmRlcigpXG4gICAge1xuICAgICAgICB2YXIgZ2V0UHJvZHVjdHMgPSBudWxsO1xuICAgICAgICBpZiAoISB0aGlzLmlzR3JvdXBlZFByb2R1Y3QoKSApIHtcbiAgICAgICAgICAgIGdldFByb2R1Y3RzID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW25hbWU9XCJhZGQtdG8tY2FydFwiXScpLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNvbnN0IHF0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lPVwicXVhbnRpdHlcIl0nKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCB2YXJpYXRpb25zID0gdGhpcy52YXJpYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtuZXcgUHJvZHVjdChpZCwgcXR5LCB2YXJpYXRpb25zKV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRQcm9kdWN0cyA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cIm51bWJlclwiXScpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEgZWxlbWVudC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnROYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ25hbWUnKS5tYXRjaCgvcXVhbnRpdHlcXFsoW1xcZF0qKVxcXS8pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudE5hbWUubGVuZ3RoICE9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBwYXJzZUludChlbGVtZW50TmFtZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gcGFyc2VJbnQoZWxlbWVudC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLnB1c2gobmV3IFByb2R1Y3QoaWQsIHF1YW50aXR5LCBudWxsKSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdHM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3JlYXRlT3JkZXIgPSAoZGF0YSwgYWN0aW9ucykgPT4ge1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIuY2xlYXIoKTtcblxuICAgICAgICAgICAgY29uc3Qgb25SZXNvbHZlID0gKHB1cmNoYXNlX3VuaXRzKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5ZXIgPSBwYXllckRhdGEoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBibkNvZGUgPSB0eXBlb2YgdGhpcy5jb25maWcuYm5fY29kZXNbdGhpcy5jb25maWcuY29udGV4dF0gIT09ICd1bmRlZmluZWQnID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYm5fY29kZXNbdGhpcy5jb25maWcuY29udGV4dF0gOiAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2godGhpcy5jb25maWcuYWpheC5jcmVhdGVfb3JkZXIuZW5kcG9pbnQsIHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLmNvbmZpZy5hamF4LmNyZWF0ZV9vcmRlci5ub25jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1cmNoYXNlX3VuaXRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBibl9jb2RlOmJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBheW1lbnRfbWV0aG9kOiBQYXltZW50TWV0aG9kcy5QQVlQQUwsXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5kaW5nX3NvdXJjZTogd2luZG93LnBwY3BGdW5kaW5nU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDp0aGlzLmNvbmZpZy5jb250ZXh0XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGF0YS5pZDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLnVwZGF0ZUNhcnQudXBkYXRlKG9uUmVzb2x2ZSwgZ2V0UHJvZHVjdHMoKSk7XG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9yZGVyO1xuICAgIH1cblxuICAgIHZhcmlhdGlvbnMoKVxuICAgIHtcblxuICAgICAgICBpZiAoISB0aGlzLmhhc1ZhcmlhdGlvbnMoKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IFsuLi50aGlzLmZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmFtZV49J2F0dHJpYnV0ZV8nXVwiKV0ubWFwKFxuICAgICAgICAgICAgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOmVsZW1lbnQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ZWxlbWVudC5uYW1lXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICB9XG5cbiAgICBoYXNWYXJpYXRpb25zKClcbiAgICB7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1FbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndmFyaWF0aW9uc19mb3JtJyk7XG4gICAgfVxuXG4gICAgaXNHcm91cGVkUHJvZHVjdCgpXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5mb3JtRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2dyb3VwZWRfZm9ybScpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFNpbmdsZVByb2R1Y3RBY3Rpb25IYW5kbGVyO1xuIiwiaW1wb3J0IEVycm9ySGFuZGxlciBmcm9tICcuLi9FcnJvckhhbmRsZXInO1xuaW1wb3J0IFVwZGF0ZUNhcnQgZnJvbSBcIi4uL0hlbHBlci9VcGRhdGVDYXJ0XCI7XG5pbXBvcnQgU2luZ2xlUHJvZHVjdEFjdGlvbkhhbmRsZXIgZnJvbSBcIi4uL0FjdGlvbkhhbmRsZXIvU2luZ2xlUHJvZHVjdEFjdGlvbkhhbmRsZXJcIjtcblxuY2xhc3MgU2luZ2xlUHJvZHVjdEJvb3RzdGFwIHtcbiAgICBjb25zdHJ1Y3RvcihnYXRld2F5LCByZW5kZXJlciwgbWVzc2FnZXMpIHtcbiAgICAgICAgdGhpcy5nYXRld2F5ID0gZ2F0ZXdheTtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gbWVzc2FnZXM7XG4gICAgfVxuXG5cbiAgICBoYW5kbGVDaGFuZ2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5oaWRlQnV0dG9ucyh0aGlzLmdhdGV3YXkuaG9zdGVkX2ZpZWxkcy53cmFwcGVyKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaGlkZUJ1dHRvbnModGhpcy5nYXRld2F5LmJ1dHRvbi53cmFwcGVyKTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMuaGlkZU1lc3NhZ2VzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5jYXJ0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5oYW5kbGVDaGFuZ2UuYmluZCh0aGlzKSlcblxuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaGlkZUJ1dHRvbnModGhpcy5nYXRld2F5Lmhvc3RlZF9maWVsZHMud3JhcHBlcik7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLmhpZGVNZXNzYWdlcygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgIH1cblxuICAgIHNob3VsZFJlbmRlcigpIHtcblxuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5jYXJ0JykgIT09IG51bGwgJiYgIXRoaXMucHJpY2VBbW91bnRJc1plcm8oKTtcblxuICAgIH1cblxuICAgIHByaWNlQW1vdW50KCkge1xuXG4gICAgICAgIGxldCBwcmljZVRleHQgPSBcIjBcIjtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0uY2FydCBpbnMgLndvb2NvbW1lcmNlLVByaWNlLWFtb3VudCcpKSB7XG4gICAgICAgICAgICBwcmljZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmNhcnQgaW5zIC53b29jb21tZXJjZS1QcmljZS1hbW91bnQnKS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5jYXJ0IC53b29jb21tZXJjZS1QcmljZS1hbW91bnQnKSkge1xuICAgICAgICAgICAgcHJpY2VUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybS5jYXJ0IC53b29jb21tZXJjZS1QcmljZS1hbW91bnQnKS5pbm5lclRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QgLndvb2NvbW1lcmNlLVByaWNlLWFtb3VudCcpKSB7XG4gICAgICAgICAgICBwcmljZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdCAud29vY29tbWVyY2UtUHJpY2UtYW1vdW50JykuaW5uZXJUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpY2VUZXh0ID0gcHJpY2VUZXh0LnJlcGxhY2UoLywvZywgJy4nKTtcblxuICAgICAgICByZXR1cm4gIHBhcnNlRmxvYXQocHJpY2VUZXh0LnJlcGxhY2UoLyhbXlxcZCxcXC5cXHNdKikvZywgJycpKTtcbiAgICB9XG5cbiAgICBwcmljZUFtb3VudElzWmVybygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJpY2VBbW91bnQoKSA9PT0gMDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IGFjdGlvbkhhbmRsZXIgPSBuZXcgU2luZ2xlUHJvZHVjdEFjdGlvbkhhbmRsZXIoXG4gICAgICAgICAgICB0aGlzLmdhdGV3YXksXG4gICAgICAgICAgICBuZXcgVXBkYXRlQ2FydChcbiAgICAgICAgICAgICAgICB0aGlzLmdhdGV3YXkuYWpheC5jaGFuZ2VfY2FydC5lbmRwb2ludCxcbiAgICAgICAgICAgICAgICB0aGlzLmdhdGV3YXkuYWpheC5jaGFuZ2VfY2FydC5ub25jZSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5zaG93QnV0dG9ucyh0aGlzLmdhdGV3YXkuYnV0dG9uLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2hvd0J1dHRvbnModGhpcy5nYXRld2F5Lmhvc3RlZF9maWVsZHMud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5yZW5kZXJXaXRoQW1vdW50KHRoaXMucHJpY2VBbW91bnQoKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5oaWRlQnV0dG9ucyh0aGlzLmdhdGV3YXkuYnV0dG9uLndyYXBwZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaGlkZUJ1dHRvbnModGhpcy5nYXRld2F5Lmhvc3RlZF9maWVsZHMud3JhcHBlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5tZXNzYWdlcy5oaWRlTWVzc2FnZXMoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtLmNhcnQnKSxcbiAgICAgICAgICAgIG5ldyBFcnJvckhhbmRsZXIodGhpcy5nYXRld2F5LmxhYmVscy5lcnJvci5nZW5lcmljKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihcbiAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIuY29uZmlndXJhdGlvbigpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW5nbGVQcm9kdWN0Qm9vdHN0YXA7XG4iLCJpbXBvcnQgQ2FydEFjdGlvbkhhbmRsZXIgZnJvbSAnLi4vQWN0aW9uSGFuZGxlci9DYXJ0QWN0aW9uSGFuZGxlcic7XG5pbXBvcnQgRXJyb3JIYW5kbGVyIGZyb20gJy4uL0Vycm9ySGFuZGxlcic7XG5cbmNsYXNzIENhcnRCb290c3RyYXAge1xuICAgIGNvbnN0cnVjdG9yKGdhdGV3YXksIHJlbmRlcmVyKSB7XG4gICAgICAgIHRoaXMuZ2F0ZXdheSA9IGdhdGV3YXk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLm9uKCd1cGRhdGVkX2NhcnRfdG90YWxzIHVwZGF0ZWRfY2hlY2tvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzaG91bGRSZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2F0ZXdheS5idXR0b24ud3JhcHBlcikgIT09XG4gICAgICAgICAgICBudWxsIHx8IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nYXRld2F5Lmhvc3RlZF9maWVsZHMud3JhcHBlcikgIT09XG4gICAgICAgICAgICBudWxsO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uSGFuZGxlciA9IG5ldyBDYXJ0QWN0aW9uSGFuZGxlcihcbiAgICAgICAgICAgIFBheVBhbENvbW1lcmNlR2F0ZXdheSxcbiAgICAgICAgICAgIG5ldyBFcnJvckhhbmRsZXIodGhpcy5nYXRld2F5LmxhYmVscy5lcnJvci5nZW5lcmljKSxcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihcbiAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIuY29uZmlndXJhdGlvbigpXG4gICAgICAgICk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXJ0Qm9vdHN0cmFwO1xuIiwiY29uc3Qgb25BcHByb3ZlID0gKGNvbnRleHQsIGVycm9ySGFuZGxlciwgc3Bpbm5lcikgPT4ge1xuICAgIHJldHVybiAoZGF0YSwgYWN0aW9ucykgPT4ge1xuICAgICAgICBzcGlubmVyLmJsb2NrKCk7XG4gICAgICAgIGVycm9ySGFuZGxlci5jbGVhcigpO1xuXG4gICAgICAgIHJldHVybiBmZXRjaChjb250ZXh0LmNvbmZpZy5hamF4LmFwcHJvdmVfb3JkZXIuZW5kcG9pbnQsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG5vbmNlOiBjb250ZXh0LmNvbmZpZy5hamF4LmFwcHJvdmVfb3JkZXIubm9uY2UsXG4gICAgICAgICAgICAgICAgb3JkZXJfaWQ6ZGF0YS5vcmRlcklELFxuICAgICAgICAgICAgICAgIGZ1bmRpbmdfc291cmNlOiB3aW5kb3cucHBjcEZ1bmRpbmdTb3VyY2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgfSkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgIHNwaW5uZXIudW5ibG9jaygpO1xuICAgICAgICAgICAgaWYgKCFkYXRhLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5kYXRhLmNvZGUgPT09IDEwMCkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIubWVzc2FnZShkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyLmdlbmVyaWNFcnJvcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGlvbnMgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBhY3Rpb25zLnJlc3RhcnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zLnJlc3RhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGRhdGEuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwbGFjZV9vcmRlcicpLmNsaWNrKClcbiAgICAgICAgfSk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG9uQXBwcm92ZTtcbiIsImltcG9ydCBvbkFwcHJvdmUgZnJvbSAnLi4vT25BcHByb3ZlSGFuZGxlci9vbkFwcHJvdmVGb3JQYXlOb3cuanMnO1xuaW1wb3J0IHtwYXllckRhdGF9IGZyb20gXCIuLi9IZWxwZXIvUGF5ZXJEYXRhXCI7XG5pbXBvcnQge2dldEN1cnJlbnRQYXltZW50TWV0aG9kfSBmcm9tIFwiLi4vSGVscGVyL0NoZWNrb3V0TWV0aG9kU3RhdGVcIjtcblxuY2xhc3MgQ2hlY2tvdXRBY3Rpb25IYW5kbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGNvbmZpZywgZXJyb3JIYW5kbGVyLCBzcGlubmVyKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcbiAgICAgICAgdGhpcy5zcGlubmVyID0gc3Bpbm5lcjtcbiAgICB9XG5cbiAgICBjb25maWd1cmF0aW9uKCkge1xuICAgICAgICBjb25zdCBzcGlubmVyID0gdGhpcy5zcGlubmVyO1xuICAgICAgICBjb25zdCBjcmVhdGVPcmRlciA9IChkYXRhLCBhY3Rpb25zKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXllciA9IHBheWVyRGF0YSgpO1xuICAgICAgICAgICAgY29uc3QgYm5Db2RlID0gdHlwZW9mIHRoaXMuY29uZmlnLmJuX2NvZGVzW3RoaXMuY29uZmlnLmNvbnRleHRdICE9PSAndW5kZWZpbmVkJyA/XG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuYm5fY29kZXNbdGhpcy5jb25maWcuY29udGV4dF0gOiAnJztcblxuICAgICAgICAgICAgY29uc3QgZXJyb3JIYW5kbGVyID0gdGhpcy5lcnJvckhhbmRsZXI7XG5cbiAgICAgICAgICAgIGNvbnN0IGZvcm1TZWxlY3RvciA9IHRoaXMuY29uZmlnLmNvbnRleHQgPT09ICdjaGVja291dCcgPyAnZm9ybS5jaGVja291dCcgOiAnZm9ybSNvcmRlcl9yZXZpZXcnO1xuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtU2VsZWN0b3IpKTtcbiAgICAgICAgICAgIC8vIHdpbGwgbm90IGhhbmRsZSBmaWVsZHMgd2l0aCBtdWx0aXBsZSB2YWx1ZXMgKGNoZWNrYm94ZXMsIDxzZWxlY3QgbXVsdGlwbGU+KSwgYnV0IHdlIGRvIG5vdCBjYXJlIGFib3V0IHRoaXMgaGVyZVxuICAgICAgICAgICAgY29uc3QgZm9ybUpzb25PYmogPSBPYmplY3QuZnJvbUVudHJpZXMoZm9ybURhdGEpO1xuXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVhY2NvdW50ID0galF1ZXJ5KCcjY3JlYXRlYWNjb3VudCcpLmlzKFwiOmNoZWNrZWRcIikgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2QgPSBnZXRDdXJyZW50UGF5bWVudE1ldGhvZCgpO1xuICAgICAgICAgICAgY29uc3QgZnVuZGluZ1NvdXJjZSA9IHdpbmRvdy5wcGNwRnVuZGluZ1NvdXJjZTtcblxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHRoaXMuY29uZmlnLmFqYXguY3JlYXRlX29yZGVyLmVuZHBvaW50LCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICBub25jZTogdGhpcy5jb25maWcuYWpheC5jcmVhdGVfb3JkZXIubm9uY2UsXG4gICAgICAgICAgICAgICAgICAgIHBheWVyLFxuICAgICAgICAgICAgICAgICAgICBibl9jb2RlOmJuQ29kZSxcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dDp0aGlzLmNvbmZpZy5jb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICBvcmRlcl9pZDp0aGlzLmNvbmZpZy5vcmRlcl9pZCxcbiAgICAgICAgICAgICAgICAgICAgcGF5bWVudF9tZXRob2Q6IHBheW1lbnRNZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmRpbmdfc291cmNlOiBmdW5kaW5nU291cmNlLFxuICAgICAgICAgICAgICAgICAgICBmb3JtOiBmb3JtSnNvbk9iaixcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlYWNjb3VudDogY3JlYXRlYWNjb3VudFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgICAgICAgICAgLy9oYW5kbGUgYm90aCBtZXNzYWdlcyBzZW50IGZyb20gV29vY29tbWVyY2UgKGRhdGEubWVzc2FnZXMpIGFuZCB0aGlzIHBsdWdpbiAoZGF0YS5kYXRhLm1lc3NhZ2UpXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoZGF0YS5tZXNzYWdlcykgIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG9tUGFyc2VyID0gbmV3IERPTVBhcnNlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyLmFwcGVuZFByZXBhcmVkRXJyb3JNZXNzYWdlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21QYXJzZXIucGFyc2VGcm9tU3RyaW5nKGRhdGEubWVzc2FnZXMsICd0ZXh0L2h0bWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcigndWwnKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuZGF0YS5kZXRhaWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIubWVzc2FnZShkYXRhLmRhdGEuZGV0YWlscy5tYXAoZCA9PiBgJHtkLmlzc3VlfSAke2QuZGVzY3JpcHRpb259YCkuam9pbignPGJyLz4nKSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlci5tZXNzYWdlKGRhdGEuZGF0YS5tZXNzYWdlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ3BwY3AtcmVzdW1lLW9yZGVyJyk7XG4gICAgICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIGRhdGEuZGF0YS5wdXJjaGFzZV91bml0c1swXS5jdXN0b21faWQpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybVNlbGVjdG9yKS5hcHBlbmQoaW5wdXQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmRhdGEuaWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY3JlYXRlT3JkZXIsXG4gICAgICAgICAgICBvbkFwcHJvdmU6b25BcHByb3ZlKHRoaXMsIHRoaXMuZXJyb3JIYW5kbGVyLCB0aGlzLnNwaW5uZXIpLFxuICAgICAgICAgICAgb25DYW5jZWw6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBzcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVycm9yOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIuZ2VuZXJpY0Vycm9yKCk7XG4gICAgICAgICAgICAgICAgc3Bpbm5lci51bmJsb2NrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoZWNrb3V0QWN0aW9uSGFuZGxlcjtcbiIsImNvbnN0IGdldEVsZW1lbnQgPSAoc2VsZWN0b3JPckVsZW1lbnQpID0+IHtcbiAgICBpZiAodHlwZW9mIHNlbGVjdG9yT3JFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvck9yRWxlbWVudCk7XG4gICAgfVxuICAgIHJldHVybiBzZWxlY3Rvck9yRWxlbWVudDtcbn1cblxuZXhwb3J0IGNvbnN0IGlzVmlzaWJsZSA9IChlbGVtZW50KSA9PiB7XG4gICAgcmV0dXJuICEhKGVsZW1lbnQub2Zmc2V0V2lkdGggfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQgfHwgZWxlbWVudC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59XG5cbmV4cG9ydCBjb25zdCBzZXRWaXNpYmxlID0gKHNlbGVjdG9yT3JFbGVtZW50LCBzaG93LCBpbXBvcnRhbnQgPSBmYWxzZSkgPT4ge1xuICAgIGNvbnN0IGVsZW1lbnQgPSBnZXRFbGVtZW50KHNlbGVjdG9yT3JFbGVtZW50KTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRWYWx1ZSA9IGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnZGlzcGxheScpO1xuXG4gICAgaWYgKCFzaG93KSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09ICdub25lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnZGlzcGxheScsICdub25lJywgaW1wb3J0YW50ID8gJ2ltcG9ydGFudCcgOiAnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnJlbW92ZVByb3BlcnR5KCdkaXNwbGF5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdGlsbCBub3QgdmlzaWJsZSAoaWYgc29tZXRoaW5nIGVsc2UgYWRkZWQgZGlzcGxheTogbm9uZSBpbiBDU1MpXG4gICAgICAgIGlmICghaXNWaXNpYmxlKGVsZW1lbnQpKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgY29uc3QgaGlkZSA9IChzZWxlY3Rvck9yRWxlbWVudCwgaW1wb3J0YW50ID0gZmFsc2UpID0+IHtcbiAgICBzZXRWaXNpYmxlKHNlbGVjdG9yT3JFbGVtZW50LCBmYWxzZSwgaW1wb3J0YW50KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzaG93ID0gKHNlbGVjdG9yT3JFbGVtZW50KSA9PiB7XG4gICAgc2V0VmlzaWJsZShzZWxlY3Rvck9yRWxlbWVudCwgdHJ1ZSk7XG59O1xuIiwiaW1wb3J0IEVycm9ySGFuZGxlciBmcm9tICcuLi9FcnJvckhhbmRsZXInO1xuaW1wb3J0IENoZWNrb3V0QWN0aW9uSGFuZGxlciBmcm9tICcuLi9BY3Rpb25IYW5kbGVyL0NoZWNrb3V0QWN0aW9uSGFuZGxlcic7XG5pbXBvcnQgeyBzZXRWaXNpYmxlIH0gZnJvbSAnLi4vSGVscGVyL0hpZGluZyc7XG5pbXBvcnQge1xuICAgIGdldEN1cnJlbnRQYXltZW50TWV0aG9kLFxuICAgIGlzU2F2ZWRDYXJkU2VsZWN0ZWQsIE9SREVSX0JVVFRPTl9TRUxFQ1RPUixcbiAgICBQYXltZW50TWV0aG9kc1xufSBmcm9tIFwiLi4vSGVscGVyL0NoZWNrb3V0TWV0aG9kU3RhdGVcIjtcblxuY2xhc3MgQ2hlY2tvdXRCb290c3RhcCB7XG4gICAgY29uc3RydWN0b3IoZ2F0ZXdheSwgcmVuZGVyZXIsIG1lc3NhZ2VzLCBzcGlubmVyKSB7XG4gICAgICAgIHRoaXMuZ2F0ZXdheSA9IGdhdGV3YXk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSByZW5kZXJlcjtcbiAgICAgICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2VzO1xuICAgICAgICB0aGlzLnNwaW5uZXIgPSBzcGlubmVyO1xuXG4gICAgICAgIHRoaXMuc3RhbmRhcmRPcmRlckJ1dHRvblNlbGVjdG9yID0gT1JERVJfQlVUVE9OX1NFTEVDVE9SO1xuXG4gICAgICAgIHRoaXMuYnV0dG9uQ2hhbmdlT2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoZWwpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVWkoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuICAgICAgICAvLyBVbnNlbGVjdCBzYXZlZCBjYXJkLlxuICAgICAgICAvLyBXQyBzYXZlcyBmb3JtIHZhbHVlcywgc28gd2l0aCBvdXIgY3VycmVudCBVSSBpdCB3b3VsZCBiZSBhIGJpdCB3ZWlyZFxuICAgICAgICAvLyBpZiB0aGUgdXNlciBwYWlkIHdpdGggc2F2ZWQsIHRoZW4gYWZ0ZXIgc29tZSB0aW1lIHRyaWVzIHRvIHBheSBhZ2FpbixcbiAgICAgICAgLy8gYnV0IHdhbnRzIHRvIGVudGVyIGEgbmV3IGNhcmQsIGFuZCB0byBkbyB0aGF0IHRoZXkgaGF2ZSB0byBjaG9vc2Ug4oCcU2VsZWN0IHBheW1lbnTigJ0gaW4gdGhlIGxpc3QuXG4gICAgICAgIGpRdWVyeSgnI3NhdmVkLWNyZWRpdC1jYXJkJykudmFsKGpRdWVyeSgnI3NhdmVkLWNyZWRpdC1jYXJkIG9wdGlvbjpmaXJzdCcpLnZhbCgpKTtcblxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkub24oJ3VwZGF0ZWRfY2hlY2tvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5vbigndXBkYXRlZF9jaGVja291dCBwYXltZW50X21ldGhvZF9zZWxlY3RlZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVWkoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50KS5vbignaG9zdGVkX2ZpZWxkc19sb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBqUXVlcnkoJyNzYXZlZC1jcmVkaXQtY2FyZCcpLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVVaSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVVaSgpO1xuICAgIH1cblxuICAgIHNob3VsZFJlbmRlcigpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5nYXRld2F5LmJ1dHRvbi5jYW5jZWxfd3JhcHBlcikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2F0ZXdheS5idXR0b24ud3JhcHBlcikgIT09IG51bGwgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmdhdGV3YXkuaG9zdGVkX2ZpZWxkcy53cmFwcGVyKSAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5zaG91bGRSZW5kZXIoKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2F0ZXdheS5ob3N0ZWRfZmllbGRzLndyYXBwZXIgKyAnPmRpdicpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZ2F0ZXdheS5ob3N0ZWRfZmllbGRzLndyYXBwZXIgKyAnPmRpdicpLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYWN0aW9uSGFuZGxlciA9IG5ldyBDaGVja291dEFjdGlvbkhhbmRsZXIoXG4gICAgICAgICAgICBQYXlQYWxDb21tZXJjZUdhdGV3YXksXG4gICAgICAgICAgICBuZXcgRXJyb3JIYW5kbGVyKHRoaXMuZ2F0ZXdheS5sYWJlbHMuZXJyb3IuZ2VuZXJpYyksXG4gICAgICAgICAgICB0aGlzLnNwaW5uZXJcbiAgICAgICAgKTtcblxuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihcbiAgICAgICAgICAgIGFjdGlvbkhhbmRsZXIuY29uZmlndXJhdGlvbigpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5idXR0b25DaGFuZ2VPYnNlcnZlci5vYnNlcnZlKFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnN0YW5kYXJkT3JkZXJCdXR0b25TZWxlY3RvciksXG4gICAgICAgICAgICB7YXR0cmlidXRlczogdHJ1ZX1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB1cGRhdGVVaSgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFBheW1lbnRNZXRob2QgPSBnZXRDdXJyZW50UGF5bWVudE1ldGhvZCgpO1xuICAgICAgICBjb25zdCBpc1BheXBhbCA9IGN1cnJlbnRQYXltZW50TWV0aG9kID09PSBQYXltZW50TWV0aG9kcy5QQVlQQUw7XG4gICAgICAgIGNvbnN0IGlzQ2FyZCA9IGN1cnJlbnRQYXltZW50TWV0aG9kID09PSBQYXltZW50TWV0aG9kcy5DQVJEUztcbiAgICAgICAgY29uc3QgaXNTZXBhcmF0ZUJ1dHRvbkdhdGV3YXkgPSBbUGF5bWVudE1ldGhvZHMuQ0FSRF9CVVRUT05dLmluY2x1ZGVzKGN1cnJlbnRQYXltZW50TWV0aG9kKTtcbiAgICAgICAgY29uc3QgaXNTYXZlZENhcmQgPSBpc0NhcmQgJiYgaXNTYXZlZENhcmRTZWxlY3RlZCgpO1xuICAgICAgICBjb25zdCBpc05vdE91ckdhdGV3YXkgPSAhaXNQYXlwYWwgJiYgIWlzQ2FyZCAmJiAhaXNTZXBhcmF0ZUJ1dHRvbkdhdGV3YXk7XG4gICAgICAgIGNvbnN0IGlzRnJlZVRyaWFsID0gUGF5UGFsQ29tbWVyY2VHYXRld2F5LmlzX2ZyZWVfdHJpYWxfY2FydDtcbiAgICAgICAgY29uc3QgaGFzVmF1bHRlZFBheXBhbCA9IFBheVBhbENvbW1lcmNlR2F0ZXdheS52YXVsdGVkX3BheXBhbF9lbWFpbCAhPT0gJyc7XG5cbiAgICAgICAgY29uc3QgcGF5cGFsQnV0dG9uV3JhcHBlcnMgPSB7XG4gICAgICAgICAgICAuLi5PYmplY3QuZW50cmllcyhQYXlQYWxDb21tZXJjZUdhdGV3YXkuc2VwYXJhdGVfYnV0dG9ucylcbiAgICAgICAgICAgICAgICAucmVkdWNlKChyZXN1bHQsIFtrLCBkYXRhXSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gey4uLnJlc3VsdCwgW2RhdGEuaWRdOiBkYXRhLndyYXBwZXJ9XG4gICAgICAgICAgICAgICAgfSwge30pLFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldFZpc2libGUodGhpcy5zdGFuZGFyZE9yZGVyQnV0dG9uU2VsZWN0b3IsICAoaXNQYXlwYWwgJiYgaXNGcmVlVHJpYWwgJiYgaGFzVmF1bHRlZFBheXBhbCkgfHwgaXNOb3RPdXJHYXRld2F5IHx8IGlzU2F2ZWRDYXJkLCB0cnVlKTtcbiAgICAgICAgc2V0VmlzaWJsZSgnLnBwY3AtdmF1bHRlZC1wYXlwYWwtZGV0YWlscycsIGlzUGF5cGFsKTtcbiAgICAgICAgc2V0VmlzaWJsZSh0aGlzLmdhdGV3YXkuYnV0dG9uLndyYXBwZXIsIGlzUGF5cGFsICYmICEoaXNGcmVlVHJpYWwgJiYgaGFzVmF1bHRlZFBheXBhbCkpO1xuICAgICAgICBzZXRWaXNpYmxlKHRoaXMuZ2F0ZXdheS5tZXNzYWdlcy53cmFwcGVyLCBpc1BheXBhbCAmJiAhaXNGcmVlVHJpYWwpO1xuICAgICAgICBzZXRWaXNpYmxlKHRoaXMuZ2F0ZXdheS5ob3N0ZWRfZmllbGRzLndyYXBwZXIsIGlzQ2FyZCAmJiAhaXNTYXZlZENhcmQpO1xuICAgICAgICBmb3IgKGNvbnN0IFtnYXRld2F5SWQsIHdyYXBwZXJdIG9mIE9iamVjdC5lbnRyaWVzKHBheXBhbEJ1dHRvbldyYXBwZXJzKSkge1xuICAgICAgICAgICAgc2V0VmlzaWJsZSh3cmFwcGVyLCBnYXRld2F5SWQgPT09IGN1cnJlbnRQYXltZW50TWV0aG9kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1BheXBhbCAmJiAhaXNGcmVlVHJpYWwpIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZXMucmVuZGVyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNDYXJkKSB7XG4gICAgICAgICAgICBpZiAoaXNTYXZlZENhcmQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRpc2FibGVDcmVkaXRDYXJkRmllbGRzKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlQ3JlZGl0Q2FyZEZpZWxkcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGlzYWJsZUNyZWRpdENhcmRGaWVsZHMoKSB7XG4gICAgICAgIGpRdWVyeSgnbGFiZWxbZm9yPVwicHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtbnVtYmVyXCJdJykuYWRkQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCcjcHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtbnVtYmVyJykuYWRkQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCdsYWJlbFtmb3I9XCJwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1leHBpcnlcIl0nKS5hZGRDbGFzcygncHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWZvcm0tZmllbGQtZGlzYWJsZWQnKVxuICAgICAgICBqUXVlcnkoJyNwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1leHBpcnknKS5hZGRDbGFzcygncHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWZvcm0tZmllbGQtZGlzYWJsZWQnKVxuICAgICAgICBqUXVlcnkoJ2xhYmVsW2Zvcj1cInBwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLWN2Y1wiXScpLmFkZENsYXNzKCdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktZm9ybS1maWVsZC1kaXNhYmxlZCcpXG4gICAgICAgIGpRdWVyeSgnI3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLWN2YycpLmFkZENsYXNzKCdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktZm9ybS1maWVsZC1kaXNhYmxlZCcpXG4gICAgICAgIGpRdWVyeSgnbGFiZWxbZm9yPVwidmF1bHRcIl0nKS5hZGRDbGFzcygncHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWZvcm0tZmllbGQtZGlzYWJsZWQnKVxuICAgICAgICBqUXVlcnkoJyNwcGNwLWNyZWRpdC1jYXJkLXZhdWx0JykuYWRkQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCcjcHBjcC1jcmVkaXQtY2FyZC12YXVsdCcpLmF0dHIoXCJkaXNhYmxlZFwiLCB0cnVlKVxuICAgICAgICB0aGlzLnJlbmRlcmVyLmRpc2FibGVDcmVkaXRDYXJkRmllbGRzKClcbiAgICB9XG5cbiAgICBlbmFibGVDcmVkaXRDYXJkRmllbGRzKCkge1xuICAgICAgICBqUXVlcnkoJ2xhYmVsW2Zvcj1cInBwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLW51bWJlclwiXScpLnJlbW92ZUNsYXNzKCdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktZm9ybS1maWVsZC1kaXNhYmxlZCcpXG4gICAgICAgIGpRdWVyeSgnI3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLW51bWJlcicpLnJlbW92ZUNsYXNzKCdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktZm9ybS1maWVsZC1kaXNhYmxlZCcpXG4gICAgICAgIGpRdWVyeSgnbGFiZWxbZm9yPVwicHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtZXhwaXJ5XCJdJykucmVtb3ZlQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCcjcHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtZXhwaXJ5JykucmVtb3ZlQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCdsYWJlbFtmb3I9XCJwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1jdmNcIl0nKS5yZW1vdmVDbGFzcygncHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWZvcm0tZmllbGQtZGlzYWJsZWQnKVxuICAgICAgICBqUXVlcnkoJyNwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1jdmMnKS5yZW1vdmVDbGFzcygncHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWZvcm0tZmllbGQtZGlzYWJsZWQnKVxuICAgICAgICBqUXVlcnkoJ2xhYmVsW2Zvcj1cInZhdWx0XCJdJykucmVtb3ZlQ2xhc3MoJ3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1mb3JtLWZpZWxkLWRpc2FibGVkJylcbiAgICAgICAgalF1ZXJ5KCcjcHBjcC1jcmVkaXQtY2FyZC12YXVsdCcpLnJlbW92ZUNsYXNzKCdwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktZm9ybS1maWVsZC1kaXNhYmxlZCcpXG4gICAgICAgIGpRdWVyeSgnI3BwY3AtY3JlZGl0LWNhcmQtdmF1bHQnKS5hdHRyKFwiZGlzYWJsZWRcIiwgZmFsc2UpXG4gICAgICAgIHRoaXMucmVuZGVyZXIuZW5hYmxlQ3JlZGl0Q2FyZEZpZWxkcygpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDaGVja291dEJvb3RzdGFwXG4iLCJleHBvcnQgY29uc3QgaXNDaGFuZ2VQYXltZW50UGFnZSA9ICgpID0+IHtcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpXG4gICAgcmV0dXJuIHVybFBhcmFtcy5oYXMoJ2NoYW5nZV9wYXltZW50X21ldGhvZCcpO1xufVxuIiwiaW1wb3J0IENoZWNrb3V0Qm9vdHN0YXAgZnJvbSAnLi9DaGVja291dEJvb3RzdGFwJ1xuaW1wb3J0IHtpc0NoYW5nZVBheW1lbnRQYWdlfSBmcm9tIFwiLi4vSGVscGVyL1N1YnNjcmlwdGlvbnNcIjtcblxuY2xhc3MgUGF5Tm93Qm9vdHN0cmFwIGV4dGVuZHMgQ2hlY2tvdXRCb290c3RhcCB7XG4gICAgY29uc3RydWN0b3IoZ2F0ZXdheSwgcmVuZGVyZXIsIG1lc3NhZ2VzLCBzcGlubmVyKSB7XG4gICAgICAgIHN1cGVyKGdhdGV3YXksIHJlbmRlcmVyLCBtZXNzYWdlcywgc3Bpbm5lcilcbiAgICB9XG5cbiAgICB1cGRhdGVVaSgpIHtcbiAgICAgICAgaWYgKGlzQ2hhbmdlUGF5bWVudFBhZ2UoKSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBzdXBlci51cGRhdGVVaSgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGF5Tm93Qm9vdHN0cmFwO1xuIiwiaW1wb3J0IG1lcmdlIGZyb20gXCJkZWVwbWVyZ2VcIjtcblxuY2xhc3MgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKGNyZWRpdENhcmRSZW5kZXJlciwgZGVmYXVsdFNldHRpbmdzLCBvblNtYXJ0QnV0dG9uQ2xpY2ssIG9uU21hcnRCdXR0b25zSW5pdCkge1xuICAgICAgICB0aGlzLmRlZmF1bHRTZXR0aW5ncyA9IGRlZmF1bHRTZXR0aW5ncztcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUmVuZGVyZXIgPSBjcmVkaXRDYXJkUmVuZGVyZXI7XG4gICAgICAgIHRoaXMub25TbWFydEJ1dHRvbkNsaWNrID0gb25TbWFydEJ1dHRvbkNsaWNrO1xuICAgICAgICB0aGlzLm9uU21hcnRCdXR0b25zSW5pdCA9IG9uU21hcnRCdXR0b25zSW5pdDtcblxuICAgICAgICB0aGlzLnJlbmRlcmVkU291cmNlcyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY29udGV4dENvbmZpZywgc2V0dGluZ3NPdmVycmlkZSA9IHt9KSB7XG4gICAgICAgIGNvbnN0IHNldHRpbmdzID0gbWVyZ2UodGhpcy5kZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzT3ZlcnJpZGUpO1xuXG4gICAgICAgIGNvbnN0IGVuYWJsZWRTZXBhcmF0ZUdhdGV3YXlzID0gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKFxuICAgICAgICAgICAgc2V0dGluZ3Muc2VwYXJhdGVfYnV0dG9ucykuZmlsdGVyKChbcywgZGF0YV0pID0+IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YS53cmFwcGVyKVxuICAgICAgICApKTtcbiAgICAgICAgY29uc3QgaGFzRW5hYmxlZFNlcGFyYXRlR2F0ZXdheXMgPSBPYmplY3Qua2V5cyhlbmFibGVkU2VwYXJhdGVHYXRld2F5cykubGVuZ3RoICE9PSAwO1xuXG4gICAgICAgIGlmICghaGFzRW5hYmxlZFNlcGFyYXRlR2F0ZXdheXMpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQnV0dG9ucyhcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5idXR0b24ud3JhcHBlcixcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy5idXR0b24uc3R5bGUsXG4gICAgICAgICAgICAgICAgY29udGV4dENvbmZpZyxcbiAgICAgICAgICAgICAgICBoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5c1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIHJlbmRlciBlYWNoIGJ1dHRvbiBzZXBhcmF0ZWx5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGZ1bmRpbmdTb3VyY2Ugb2YgcGF5cGFsLmdldEZ1bmRpbmdTb3VyY2VzKCkuZmlsdGVyKHMgPT4gIShzIGluIGVuYWJsZWRTZXBhcmF0ZUdhdGV3YXlzKSkpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSBzZXR0aW5ncy5idXR0b24uc3R5bGU7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bmRpbmdTb3VyY2UgIT09ICdwYXlwYWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHN0eWxlLnNoYXBlLFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyQnV0dG9ucyhcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MuYnV0dG9uLndyYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0Q29uZmlnLFxuICAgICAgICAgICAgICAgICAgICBoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5cyxcbiAgICAgICAgICAgICAgICAgICAgZnVuZGluZ1NvdXJjZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNyZWRpdENhcmRSZW5kZXJlci5yZW5kZXIoc2V0dGluZ3MuaG9zdGVkX2ZpZWxkcy53cmFwcGVyLCBjb250ZXh0Q29uZmlnKTtcblxuICAgICAgICBmb3IgKGNvbnN0IFtmdW5kaW5nU291cmNlLCBkYXRhXSBvZiBPYmplY3QuZW50cmllcyhlbmFibGVkU2VwYXJhdGVHYXRld2F5cykpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQnV0dG9ucyhcbiAgICAgICAgICAgICAgICBkYXRhLndyYXBwZXIsXG4gICAgICAgICAgICAgICAgZGF0YS5zdHlsZSxcbiAgICAgICAgICAgICAgICBjb250ZXh0Q29uZmlnLFxuICAgICAgICAgICAgICAgIGhhc0VuYWJsZWRTZXBhcmF0ZUdhdGV3YXlzLFxuICAgICAgICAgICAgICAgIGZ1bmRpbmdTb3VyY2VcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXJCdXR0b25zKHdyYXBwZXIsIHN0eWxlLCBjb250ZXh0Q29uZmlnLCBoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5cywgZnVuZGluZ1NvdXJjZSA9IG51bGwpIHtcbiAgICAgICAgaWYgKCEgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKSB8fCB0aGlzLmlzQWxyZWFkeVJlbmRlcmVkKHdyYXBwZXIsIGZ1bmRpbmdTb3VyY2UsIGhhc0VuYWJsZWRTZXBhcmF0ZUdhdGV3YXlzKSB8fCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIHBheXBhbC5CdXR0b25zICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZ1bmRpbmdTb3VyY2UpIHtcbiAgICAgICAgICAgIGNvbnRleHRDb25maWcuZnVuZGluZ1NvdXJjZSA9IGZ1bmRpbmdTb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidG4gPSBwYXlwYWwuQnV0dG9ucyh7XG4gICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgIC4uLmNvbnRleHRDb25maWcsXG4gICAgICAgICAgICBvbkNsaWNrOiB0aGlzLm9uU21hcnRCdXR0b25DbGljayxcbiAgICAgICAgICAgIG9uSW5pdDogdGhpcy5vblNtYXJ0QnV0dG9uc0luaXQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWJ0bi5pc0VsaWdpYmxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGJ0bi5yZW5kZXIod3JhcHBlcik7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZFNvdXJjZXMuYWRkKHdyYXBwZXIgKyBmdW5kaW5nU291cmNlID8/ICcnKTtcbiAgICB9XG5cbiAgICBpc0FscmVhZHlSZW5kZXJlZCh3cmFwcGVyLCBmdW5kaW5nU291cmNlLCBoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5cykge1xuICAgICAgICAvLyBTaW1wbHkgY2hlY2sgdGhhdCBoYXMgY2hpbGQgbm9kZXMgd2hlbiB3ZSBkbyBub3QgbmVlZCB0byByZW5kZXIgYnV0dG9ucyBzZXBhcmF0ZWx5LFxuICAgICAgICAvLyB0aGlzIHdpbGwgcmVkdWNlIHRoZSByaXNrIG9mIGJyZWFraW5nIHdpdGggZGlmZmVyZW50IHRoZW1lcy9wbHVnaW5zXG4gICAgICAgIC8vIGFuZCBvbiB0aGUgY2FydCBwYWdlICh3aGVyZSB3ZSBhbHNvIGRvIG5vdCBuZWVkIHRvIHJlbmRlciBzZXBhcmF0ZWx5KSwgd2hpY2ggbWF5IGZ1bGx5IHJlbG9hZCB0aGlzIHBhcnQgb2YgdGhlIHBhZ2UuXG4gICAgICAgIC8vIElkZWFsbHkgd2Ugc2hvdWxkIGFsc28gZmluZCBhIHdheSB0byBkZXRlY3Qgc3VjaCBmdWxsIHJlbG9hZHMgYW5kIHJlbW92ZSB0aGUgY29ycmVzcG9uZGluZyBrZXlzIGZyb20gdGhlIHNldC5cbiAgICAgICAgaWYgKCFoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5cykge1xuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcikuaGFzQ2hpbGROb2RlcygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVkU291cmNlcy5oYXMod3JhcHBlciArIGZ1bmRpbmdTb3VyY2UgPz8gJycpO1xuICAgIH1cblxuICAgIGhpZGVCdXR0b25zKGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgZG9tRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWxlbWVudCk7XG4gICAgICAgIGlmICghIGRvbUVsZW1lbnQgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZG9tRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBzaG93QnV0dG9ucyhlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGRvbUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICAgICAgICBpZiAoISBkb21FbGVtZW50ICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGRvbUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGRpc2FibGVDcmVkaXRDYXJkRmllbGRzKCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRSZW5kZXJlci5kaXNhYmxlRmllbGRzKCk7XG4gICAgfVxuXG4gICAgZW5hYmxlQ3JlZGl0Q2FyZEZpZWxkcygpIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUmVuZGVyZXIuZW5hYmxlRmllbGRzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZW5kZXJlcjtcbiIsImNvbnN0IGRjY0lucHV0RmFjdG9yeSA9IChvcmlnaW5hbCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG9yaWdpbmFsKTtcbiAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuXG4gICAgbmV3RWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2lkJywgb3JpZ2luYWwuaWQpO1xuICAgIG5ld0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIG9yaWdpbmFsLmNsYXNzTmFtZSk7XG5cbiAgICBPYmplY3QudmFsdWVzKHN0eWxlcykuZm9yRWFjaCggKHByb3ApID0+IHtcbiAgICAgICAgaWYgKCEgc3R5bGVzW3Byb3BdIHx8ICEgaXNOYU4ocHJvcCkgfHwgcHJvcCA9PT0gJ2JhY2tncm91bmQtaW1hZ2UnICkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG5ld0VsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkocHJvcCwnJyArIHN0eWxlc1twcm9wXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRjY0lucHV0RmFjdG9yeTtcbiIsImltcG9ydCBkY2NJbnB1dEZhY3RvcnkgZnJvbSBcIi4uL0hlbHBlci9EY2NJbnB1dEZhY3RvcnlcIjtcbmltcG9ydCB7c2hvd30gZnJvbSBcIi4uL0hlbHBlci9IaWRpbmdcIjtcbmltcG9ydCBQcm9kdWN0IGZyb20gXCIuLi9FbnRpdHkvUHJvZHVjdFwiO1xuXG5jbGFzcyBDcmVkaXRDYXJkUmVuZGVyZXIge1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdENvbmZpZywgZXJyb3JIYW5kbGVyLCBzcGlubmVyKSB7XG4gICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IGRlZmF1bHRDb25maWc7XG4gICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuICAgICAgICB0aGlzLnNwaW5uZXIgPSBzcGlubmVyO1xuICAgICAgICB0aGlzLmNhcmRWYWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZvcm1WYWxpZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnRIb3N0ZWRGaWVsZHNJbnN0YW5jZSA9IG51bGw7XG4gICAgfVxuXG4gICAgcmVuZGVyKHdyYXBwZXIsIGNvbnRleHRDb25maWcpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5jb250ZXh0ICE9PSAnY2hlY2tvdXQnXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5kZWZhdWx0Q29uZmlnLmNvbnRleHQgIT09ICdwYXktbm93J1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgfHwgd3JhcHBlciA9PT0gbnVsbFxuICAgICAgICAgICAgfHwgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih3cmFwcGVyKSA9PT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgcGF5cGFsLkhvc3RlZEZpZWxkcyA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgIHx8ICEgcGF5cGFsLkhvc3RlZEZpZWxkcy5pc0VsaWdpYmxlKClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjb25zdCB3cmFwcGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcik7XG4gICAgICAgICAgICB3cmFwcGVyRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHdyYXBwZXJFbGVtZW50KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ1dHRvblNlbGVjdG9yID0gd3JhcHBlciArICcgYnV0dG9uJztcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvc3RlZEZpZWxkc0luc3RhbmNlLnRlYXJkb3duKClcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoYEhvc3RlZCBmaWVsZHMgdGVhcmRvd24gZXJyb3I6ICR7ZXJyfWApKTtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEhvc3RlZEZpZWxkc0luc3RhbmNlID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdhdGVXYXlCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGF5bWVudF9ib3gucGF5bWVudF9tZXRob2RfcHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5Jyk7XG4gICAgICAgIGlmKCEgZ2F0ZVdheUJveCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgb2xkRGlzcGxheVN0eWxlID0gZ2F0ZVdheUJveC5zdHlsZS5kaXNwbGF5O1xuICAgICAgICBnYXRlV2F5Qm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuXG4gICAgICAgIGNvbnN0IGhpZGVEY2NHYXRld2F5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BwY3AtaGlkZS1kY2MnKTtcbiAgICAgICAgaWYgKGhpZGVEY2NHYXRld2F5KSB7XG4gICAgICAgICAgICBoaWRlRGNjR2F0ZXdheS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGhpZGVEY2NHYXRld2F5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNhcmROdW1iZXJGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1udW1iZXInKTtcblxuICAgICAgICBjb25zdCBzdHlsZXNSYXcgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjYXJkTnVtYmVyRmllbGQpO1xuICAgICAgICBsZXQgc3R5bGVzID0ge307XG4gICAgICAgIE9iamVjdC52YWx1ZXMoc3R5bGVzUmF3KS5mb3JFYWNoKCAocHJvcCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEgc3R5bGVzUmF3W3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3R5bGVzW3Byb3BdID0gJycgKyBzdHlsZXNSYXdbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGNhcmROdW1iZXIgPSBkY2NJbnB1dEZhY3RvcnkoY2FyZE51bWJlckZpZWxkKTtcbiAgICAgICAgY2FyZE51bWJlckZpZWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNhcmROdW1iZXIsIGNhcmROdW1iZXJGaWVsZCk7XG5cbiAgICAgICAgY29uc3QgY2FyZEV4cGlyeUZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLWV4cGlyeScpO1xuICAgICAgICBjb25zdCBjYXJkRXhwaXJ5ID0gZGNjSW5wdXRGYWN0b3J5KGNhcmRFeHBpcnlGaWVsZCk7XG4gICAgICAgIGNhcmRFeHBpcnlGaWVsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjYXJkRXhwaXJ5LCBjYXJkRXhwaXJ5RmllbGQpO1xuXG4gICAgICAgIGNvbnN0IGNhcmRDb2RlRmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtY3ZjJyk7XG4gICAgICAgIGNvbnN0IGNhcmRDb2RlID0gZGNjSW5wdXRGYWN0b3J5KGNhcmRDb2RlRmllbGQpO1xuICAgICAgICBjYXJkQ29kZUZpZWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNhcmRDb2RlLCBjYXJkQ29kZUZpZWxkKTtcblxuICAgICAgICBnYXRlV2F5Qm94LnN0eWxlLmRpc3BsYXkgPSBvbGREaXNwbGF5U3R5bGU7XG5cbiAgICAgICAgY29uc3QgZm9ybVdyYXBwZXIgPSAnLnBheW1lbnRfYm94IHBheW1lbnRfbWV0aG9kX3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheSc7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdENvbmZpZy5lbmZvcmNlX3ZhdWx0XG4gICAgICAgICAgICAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGZvcm1XcmFwcGVyICsgJyAucHBjcC1jcmVkaXQtY2FyZC12YXVsdCcpXG4gICAgICAgICkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihmb3JtV3JhcHBlciArICcgLnBwY3AtY3JlZGl0LWNhcmQtdmF1bHQnKS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZm9ybVdyYXBwZXIgKyAnIC5wcGNwLWNyZWRpdC1jYXJkLXZhdWx0Jykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHBheXBhbC5Ib3N0ZWRGaWVsZHMucmVuZGVyKHtcbiAgICAgICAgICAgIGNyZWF0ZU9yZGVyOiBjb250ZXh0Q29uZmlnLmNyZWF0ZU9yZGVyLFxuICAgICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAgICAgJ2lucHV0Jzogc3R5bGVzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICAgICAgbnVtYmVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLW51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmRlZmF1bHRDb25maWcuaG9zdGVkX2ZpZWxkcy5sYWJlbHMuY3JlZGl0X2NhcmRfbnVtYmVyLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY3Z2OiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheS1jYXJkLWN2YycsXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB0aGlzLmRlZmF1bHRDb25maWcuaG9zdGVkX2ZpZWxkcy5sYWJlbHMuY3Z2LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhwaXJhdGlvbkRhdGU6IHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjcHBjcC1jcmVkaXQtY2FyZC1nYXRld2F5LWNhcmQtZXhwaXJ5JyxcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IHRoaXMuZGVmYXVsdENvbmZpZy5ob3N0ZWRfZmllbGRzLmxhYmVscy5tbV95eSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oaG9zdGVkRmllbGRzID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KFwiaG9zdGVkX2ZpZWxkc19sb2FkZWRcIikpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2UgPSBob3N0ZWRGaWVsZHM7XG5cbiAgICAgICAgICAgIGhvc3RlZEZpZWxkcy5vbignaW5wdXRTdWJtaXRSZXF1ZXN0JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1Ym1pdChjb250ZXh0Q29uZmlnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaG9zdGVkRmllbGRzLm9uKCdjYXJkVHlwZUNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICggISBldmVudC5jYXJkcy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZFZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWRDYXJkcyA9IHRoaXMuZGVmYXVsdENvbmZpZy5ob3N0ZWRfZmllbGRzLnZhbGlkX2NhcmRzO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZFZhbGlkID0gdmFsaWRDYXJkcy5pbmRleE9mKGV2ZW50LmNhcmRzWzBdLnR5cGUpICE9PSAtMTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuX2NhcmROdW1iZXJGaWxlZENMYXNzTmFtZUJ5Q2FyZFR5cGUoZXZlbnQuY2FyZHNbMF0udHlwZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjcmVhdGVFbGVtZW50Q2xhc3NBdHRyaWJ1dGUoY2FyZE51bWJlciwgY2FyZE51bWJlckZpZWxkLmNsYXNzTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmZpZWxkcy5udW1iZXIuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBjYXJkTnVtYmVyLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaG9zdGVkRmllbGRzLm9uKCd2YWxpZGl0eUNoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1WYWxpZCA9IE9iamVjdC5rZXlzKGV2ZW50LmZpZWxkcykuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQuZmllbGRzW2tleV0uaXNWYWxpZDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuX2NhcmROdW1iZXJGaWxlZENMYXNzTmFtZUJ5Q2FyZFR5cGUoZXZlbnQuY2FyZHNbMF0udHlwZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQuZmllbGRzLm51bWJlci5pc1ZhbGlkXG4gICAgICAgICAgICAgICAgICAgID8gY2FyZE51bWJlci5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl9yZWNyZWF0ZUVsZW1lbnRDbGFzc0F0dHJpYnV0ZShjYXJkTnVtYmVyLCBjYXJkTnVtYmVyRmllbGQuY2xhc3NOYW1lKTtcblxuICAgICAgICAgICAgICAgdGhpcy5mb3JtVmFsaWQgPSBmb3JtVmFsaWQ7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBzaG93KGJ1dHRvblNlbGVjdG9yKTtcblxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iod3JhcHBlcikuZ2V0QXR0cmlidXRlKCdkYXRhLXBwY3Atc3Vic2NyaWJlZCcpICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihidXR0b25TZWxlY3RvcikuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N1Ym1pdChjb250ZXh0Q29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHdyYXBwZXIpLnNldEF0dHJpYnV0ZSgnZGF0YS1wcGNwLXN1YnNjcmliZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3BheW1lbnRfbWV0aG9kX3BwY3AtY3JlZGl0LWNhcmQtZ2F0ZXdheScpLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsW2Zvcj1wcGNwLWNyZWRpdC1jYXJkLWdhdGV3YXktY2FyZC1udW1iZXJdJykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKVxuICAgIH1cblxuICAgIGRpc2FibGVGaWVsZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3N0ZWRGaWVsZHNJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2Uuc2V0QXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZGlzYWJsZWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2Uuc2V0QXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2N2dicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZGlzYWJsZWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2Uuc2V0QXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2V4cGlyYXRpb25EYXRlJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdkaXNhYmxlZCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbmFibGVGaWVsZHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRIb3N0ZWRGaWVsZHNJbnN0YW5jZSkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2UucmVtb3ZlQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZGlzYWJsZWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2UucmVtb3ZlQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2N2dicsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlOiAnZGlzYWJsZWQnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SG9zdGVkRmllbGRzSW5zdGFuY2UucmVtb3ZlQXR0cmlidXRlKHtcbiAgICAgICAgICAgICAgICBmaWVsZDogJ2V4cGlyYXRpb25EYXRlJyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGU6ICdkaXNhYmxlZCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfc3VibWl0KGNvbnRleHRDb25maWcpIHtcbiAgICAgICAgdGhpcy5zcGlubmVyLmJsb2NrKCk7XG4gICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLmNsZWFyKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9ybVZhbGlkICYmIHRoaXMuY2FyZFZhbGlkKSB7XG4gICAgICAgICAgICBjb25zdCBzYXZlX2NhcmQgPSB0aGlzLmRlZmF1bHRDb25maWcuY2FuX3NhdmVfdmF1bHRfdG9rZW4gPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBsZXQgdmF1bHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHBjcC1jcmVkaXQtY2FyZC12YXVsdCcpID9cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHBjcC1jcmVkaXQtY2FyZC12YXVsdCcpLmNoZWNrZWQgOiBzYXZlX2NhcmQ7XG4gICAgICAgICAgICBpZiAodGhpcy5kZWZhdWx0Q29uZmlnLmVuZm9yY2VfdmF1bHQpIHtcbiAgICAgICAgICAgICAgICB2YXVsdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjb250aW5nZW5jeSA9IHRoaXMuZGVmYXVsdENvbmZpZy5ob3N0ZWRfZmllbGRzLmNvbnRpbmdlbmN5O1xuICAgICAgICAgICAgY29uc3QgaG9zdGVkRmllbGRzRGF0YSA9IHtcbiAgICAgICAgICAgICAgICB2YXVsdDogdmF1bHRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY29udGluZ2VuY3kgIT09ICdOT18zRF9TRUNVUkUnKSB7XG4gICAgICAgICAgICAgICAgaG9zdGVkRmllbGRzRGF0YS5jb250aW5nZW5jaWVzID0gW2NvbnRpbmdlbmN5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZGVmYXVsdENvbmZpZy5wYXllcikge1xuICAgICAgICAgICAgICAgIGhvc3RlZEZpZWxkc0RhdGEuY2FyZGhvbGRlck5hbWUgPSB0aGlzLmRlZmF1bHRDb25maWcucGF5ZXIubmFtZS5naXZlbl9uYW1lICsgJyAnICsgdGhpcy5kZWZhdWx0Q29uZmlnLnBheWVyLm5hbWUuc3VybmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaG9zdGVkRmllbGRzRGF0YS5jYXJkaG9sZGVyTmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiaWxsaW5nX2ZpcnN0X25hbWUnKSA/IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiaWxsaW5nX2ZpcnN0X25hbWUnKS52YWx1ZSA6ICcnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3ROYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JpbGxpbmdfbGFzdF9uYW1lJykgPyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmlsbGluZ19sYXN0X25hbWUnKS52YWx1ZSA6ICcnO1xuXG4gICAgICAgICAgICAgICAgaG9zdGVkRmllbGRzRGF0YS5jYXJkaG9sZGVyTmFtZSA9IGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRIb3N0ZWRGaWVsZHNJbnN0YW5jZS5zdWJtaXQoaG9zdGVkRmllbGRzRGF0YSkudGhlbigocGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgIHBheWxvYWQub3JkZXJJRCA9IHBheWxvYWQub3JkZXJJZDtcbiAgICAgICAgICAgICAgICB0aGlzLnNwaW5uZXIudW5ibG9jaygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250ZXh0Q29uZmlnLm9uQXBwcm92ZShwYXlsb2FkKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlci5jbGVhcigpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGVyci5kZXRhaWxzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyLm1lc3NhZ2UoZXJyLmRldGFpbHMubWFwKGQgPT4gYCR7ZC5pc3N1ZX0gJHtkLmRlc2NyaXB0aW9ufWApLmpvaW4oJzxici8+JyksIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAhIHRoaXMuY2FyZFZhbGlkID8gdGhpcy5kZWZhdWx0Q29uZmlnLmhvc3RlZF9maWVsZHMubGFiZWxzLmNhcmRfbm90X3N1cHBvcnRlZCA6IHRoaXMuZGVmYXVsdENvbmZpZy5ob3N0ZWRfZmllbGRzLmxhYmVscy5maWVsZHNfbm90X3ZhbGlkO1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIubWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jYXJkTnVtYmVyRmlsZWRDTGFzc05hbWVCeUNhcmRUeXBlKGNhcmRUeXBlKSB7XG4gICAgICAgIHJldHVybiBjYXJkVHlwZSA9PT0gJ2FtZXJpY2FuLWV4cHJlc3MnID8gJ2FtZXgnIDogY2FyZFR5cGUucmVwbGFjZSgnLScsICcnKTtcbiAgICB9XG5cbiAgICBfcmVjcmVhdGVFbGVtZW50Q2xhc3NBdHRyaWJ1dGUoZWxlbWVudCwgbmV3Q2xhc3NOYW1lKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsIG5ld0NsYXNzTmFtZSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ3JlZGl0Q2FyZFJlbmRlcmVyO1xuIiwiY29uc3Qgc3RvcmFnZUtleSA9ICdwcGNwLWRhdGEtY2xpZW50LWlkJztcblxuY29uc3QgdmFsaWRhdGVUb2tlbiA9ICh0b2tlbiwgdXNlcikgPT4ge1xuICAgIGlmICghIHRva2VuKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRva2VuLnVzZXIgIT09IHVzZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGNvbnN0IGlzRXhwaXJlZCA9IGN1cnJlbnRUaW1lID49IHRva2VuLmV4cGlyYXRpb24gKiAxMDAwO1xuICAgIHJldHVybiAhIGlzRXhwaXJlZDtcbn1cblxuY29uc3Qgc3RvcmVkVG9rZW5Gb3JVc2VyID0gKHVzZXIpID0+IHtcbiAgICBjb25zdCB0b2tlbiA9IEpTT04ucGFyc2Uoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbShzdG9yYWdlS2V5KSk7XG4gICAgaWYgKHZhbGlkYXRlVG9rZW4odG9rZW4sIHVzZXIpKSB7XG4gICAgICAgIHJldHVybiB0b2tlbi50b2tlbjtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmNvbnN0IHN0b3JlVG9rZW4gPSAodG9rZW4pID0+IHtcbiAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHN0b3JhZ2VLZXksIEpTT04uc3RyaW5naWZ5KHRva2VuKSk7XG59XG5cbmNvbnN0IGRhdGFDbGllbnRJZEF0dHJpYnV0ZUhhbmRsZXIgPSAoc2NyaXB0LCBjb25maWcpID0+IHtcbiAgICBmZXRjaChjb25maWcuZW5kcG9pbnQsIHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgIG5vbmNlOiBjb25maWcubm9uY2VcbiAgICAgICAgfSlcbiAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgIHJldHVybiByZXMuanNvbigpO1xuICAgIH0pLnRoZW4oKGRhdGEpPT57XG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB2YWxpZGF0ZVRva2VuKGRhdGEsIGNvbmZpZy51c2VyKTtcbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3RvcmVUb2tlbihkYXRhKTtcbiAgICAgICAgc2NyaXB0LnNldEF0dHJpYnV0ZSgnZGF0YS1jbGllbnQtdG9rZW4nLCBkYXRhLnRva2VuKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoc2NyaXB0KTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZGF0YUNsaWVudElkQXR0cmlidXRlSGFuZGxlcjtcbiIsImNsYXNzIE1lc3NhZ2VSZW5kZXJlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihjb25maWcpIHtcbiAgICAgICAgdGhpcy5jb25maWcgPSBjb25maWc7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoISB0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwYXlwYWwuTWVzc2FnZXMoe1xuICAgICAgICAgICAgYW1vdW50OiB0aGlzLmNvbmZpZy5hbW91bnQsXG4gICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuY29uZmlnLnBsYWNlbWVudCxcbiAgICAgICAgICAgIHN0eWxlOiB0aGlzLmNvbmZpZy5zdHlsZVxuICAgICAgICB9KS5yZW5kZXIodGhpcy5jb25maWcud3JhcHBlcik7XG5cbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLm9uKCd1cGRhdGVkX2NhcnRfdG90YWxzJywgKCkgPT4ge1xuICAgICAgICAgICAgcGF5cGFsLk1lc3NhZ2VzKHtcbiAgICAgICAgICAgICAgICBhbW91bnQ6IHRoaXMuY29uZmlnLmFtb3VudCxcbiAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMuY29uZmlnLnBsYWNlbWVudCxcbiAgICAgICAgICAgICAgICBzdHlsZTogdGhpcy5jb25maWcuc3R5bGVcbiAgICAgICAgICAgIH0pLnJlbmRlcih0aGlzLmNvbmZpZy53cmFwcGVyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyV2l0aEFtb3VudChhbW91bnQpIHtcblxuICAgICAgICBpZiAoISB0aGlzLnNob3VsZFJlbmRlcigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuZXdXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIG5ld1dyYXBwZXIuc2V0QXR0cmlidXRlKCdpZCcsIHRoaXMuY29uZmlnLndyYXBwZXIucmVwbGFjZSgnIycsICcnKSk7XG5cbiAgICAgICAgY29uc3Qgc2libGluZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcud3JhcHBlcikubmV4dFNpYmxpbmc7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb25maWcud3JhcHBlcikucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLndyYXBwZXIpKTtcbiAgICAgICAgc2libGluZy5wYXJlbnRFbGVtZW50Lmluc2VydEJlZm9yZShuZXdXcmFwcGVyLCBzaWJsaW5nKTtcbiAgICAgICAgcGF5cGFsLk1lc3NhZ2VzKHtcbiAgICAgICAgICAgIGFtb3VudCxcbiAgICAgICAgICAgIHBsYWNlbWVudDogdGhpcy5jb25maWcucGxhY2VtZW50LFxuICAgICAgICAgICAgc3R5bGU6IHRoaXMuY29uZmlnLnN0eWxlXG4gICAgICAgIH0pLnJlbmRlcih0aGlzLmNvbmZpZy53cmFwcGVyKTtcbiAgICB9XG5cbiAgICBzaG91bGRSZW5kZXIoKSB7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwYXlwYWwuTWVzc2FnZXMgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiB0aGlzLmNvbmZpZy53cmFwcGVyID09PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29uZmlnLndyYXBwZXIpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaGlkZU1lc3NhZ2VzKCkge1xuICAgICAgICBjb25zdCBkb21FbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbmZpZy53cmFwcGVyKTtcbiAgICAgICAgaWYgKCEgZG9tRWxlbWVudCApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBkb21FbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE1lc3NhZ2VSZW5kZXJlcjtcbiIsImNsYXNzIFNwaW5uZXIge1xuXG4gICAgY29uc3RydWN0b3IodGFyZ2V0ID0gJ2Zvcm0ud29vY29tbWVyY2UtY2hlY2tvdXQnKSB7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cblxuICAgIHNldFRhcmdldCh0YXJnZXQpIHtcbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuXG4gICAgYmxvY2soKSB7XG5cbiAgICAgICAgalF1ZXJ5KCB0aGlzLnRhcmdldCApLmJsb2NrKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IG51bGwsXG4gICAgICAgICAgICBvdmVybGF5Q1NTOiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJyNmZmYnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNlxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJsb2NrKCkge1xuXG4gICAgICAgIGpRdWVyeSggdGhpcy50YXJnZXQgKS51bmJsb2NrKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlubmVyO1xuIiwiaW1wb3J0IHtQYXltZW50TWV0aG9kc30gZnJvbSBcIi4uL0hlbHBlci9DaGVja291dE1ldGhvZFN0YXRlXCI7XG5pbXBvcnQgZXJyb3JIYW5kbGVyIGZyb20gXCIuLi9FcnJvckhhbmRsZXJcIjtcblxuY2xhc3MgRnJlZVRyaWFsSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgc3Bpbm5lcixcbiAgICAgICAgZXJyb3JIYW5kbGVyXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgICAgICB0aGlzLnNwaW5uZXIgPSBzcGlubmVyO1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcbiAgICB9XG5cbiAgICBoYW5kbGUoKVxuICAgIHtcbiAgICAgICAgdGhpcy5zcGlubmVyLmJsb2NrKCk7XG5cbiAgICAgICAgZmV0Y2godGhpcy5jb25maWcuYWpheC52YXVsdF9wYXlwYWwuZW5kcG9pbnQsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIG5vbmNlOiB0aGlzLmNvbmZpZy5hamF4LnZhdWx0X3BheXBhbC5ub25jZSxcbiAgICAgICAgICAgICAgICByZXR1cm5fdXJsOiBsb2NhdGlvbi5ocmVmXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgICAgIH0pLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRhdGEuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3Bpbm5lci51bmJsb2NrKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihkYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlci5tZXNzYWdlKGRhdGEuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihkYXRhLmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBkYXRhLmRhdGEuYXBwcm92ZV9saW5rO1xuICAgICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICB0aGlzLnNwaW5uZXIudW5ibG9jaygpO1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlci5nZW5lcmljRXJyb3IoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgRnJlZVRyaWFsSGFuZGxlcjtcbiIsImltcG9ydCBNaW5pQ2FydEJvb3RzdGFwIGZyb20gJy4vbW9kdWxlcy9Db250ZXh0Qm9vdHN0cmFwL01pbmlDYXJ0Qm9vdHN0YXAnO1xuaW1wb3J0IFNpbmdsZVByb2R1Y3RCb290c3RhcCBmcm9tICcuL21vZHVsZXMvQ29udGV4dEJvb3RzdHJhcC9TaW5nbGVQcm9kdWN0Qm9vdHN0YXAnO1xuaW1wb3J0IENhcnRCb290c3RyYXAgZnJvbSAnLi9tb2R1bGVzL0NvbnRleHRCb290c3RyYXAvQ2FydEJvb3RzdGFwJztcbmltcG9ydCBDaGVja291dEJvb3RzdGFwIGZyb20gJy4vbW9kdWxlcy9Db250ZXh0Qm9vdHN0cmFwL0NoZWNrb3V0Qm9vdHN0YXAnO1xuaW1wb3J0IFBheU5vd0Jvb3RzdHJhcCBmcm9tIFwiLi9tb2R1bGVzL0NvbnRleHRCb290c3RyYXAvUGF5Tm93Qm9vdHN0cmFwXCI7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9tb2R1bGVzL1JlbmRlcmVyL1JlbmRlcmVyJztcbmltcG9ydCBFcnJvckhhbmRsZXIgZnJvbSAnLi9tb2R1bGVzL0Vycm9ySGFuZGxlcic7XG5pbXBvcnQgQ3JlZGl0Q2FyZFJlbmRlcmVyIGZyb20gXCIuL21vZHVsZXMvUmVuZGVyZXIvQ3JlZGl0Q2FyZFJlbmRlcmVyXCI7XG5pbXBvcnQgZGF0YUNsaWVudElkQXR0cmlidXRlSGFuZGxlciBmcm9tIFwiLi9tb2R1bGVzL0RhdGFDbGllbnRJZEF0dHJpYnV0ZUhhbmRsZXJcIjtcbmltcG9ydCBNZXNzYWdlUmVuZGVyZXIgZnJvbSBcIi4vbW9kdWxlcy9SZW5kZXJlci9NZXNzYWdlUmVuZGVyZXJcIjtcbmltcG9ydCBTcGlubmVyIGZyb20gXCIuL21vZHVsZXMvSGVscGVyL1NwaW5uZXJcIjtcbmltcG9ydCB7XG4gICAgZ2V0Q3VycmVudFBheW1lbnRNZXRob2QsXG4gICAgT1JERVJfQlVUVE9OX1NFTEVDVE9SLFxuICAgIFBheW1lbnRNZXRob2RzXG59IGZyb20gXCIuL21vZHVsZXMvSGVscGVyL0NoZWNrb3V0TWV0aG9kU3RhdGVcIjtcbmltcG9ydCB7aGlkZSwgc2V0VmlzaWJsZX0gZnJvbSBcIi4vbW9kdWxlcy9IZWxwZXIvSGlkaW5nXCI7XG5pbXBvcnQge2lzQ2hhbmdlUGF5bWVudFBhZ2V9IGZyb20gXCIuL21vZHVsZXMvSGVscGVyL1N1YnNjcmlwdGlvbnNcIjtcbmltcG9ydCBGcmVlVHJpYWxIYW5kbGVyIGZyb20gXCIuL21vZHVsZXMvQWN0aW9uSGFuZGxlci9GcmVlVHJpYWxIYW5kbGVyXCI7XG5cbi8vIFRPRE86IGNvdWxkIGJlIGEgZ29vZCBpZGVhIHRvIGhhdmUgYSBzZXBhcmF0ZSBzcGlubmVyIGZvciBlYWNoIGdhdGV3YXksXG4vLyBidXQgSSB0aGluayB3ZSBjYXJlIG1haW5seSBhYm91dCB0aGUgc2NyaXB0IGxvYWRpbmcsIHNvIG9uZSBzcGlubmVyIHNob3VsZCBiZSBlbm91Z2guXG5jb25zdCBidXR0b25zU3Bpbm5lciA9IG5ldyBTcGlubmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcGMtYnV0dG9uLXdyYXBwZXInKSk7XG5jb25zdCBjYXJkc1NwaW5uZXIgPSBuZXcgU3Bpbm5lcignI3BwY3AtaG9zdGVkLWZpZWxkcycpO1xuXG5jb25zdCBib290c3RyYXAgPSAoKSA9PiB7XG4gICAgY29uc3QgZXJyb3JIYW5kbGVyID0gbmV3IEVycm9ySGFuZGxlcihQYXlQYWxDb21tZXJjZUdhdGV3YXkubGFiZWxzLmVycm9yLmdlbmVyaWMpO1xuICAgIGNvbnN0IHNwaW5uZXIgPSBuZXcgU3Bpbm5lcigpO1xuICAgIGNvbnN0IGNyZWRpdENhcmRSZW5kZXJlciA9IG5ldyBDcmVkaXRDYXJkUmVuZGVyZXIoUGF5UGFsQ29tbWVyY2VHYXRld2F5LCBlcnJvckhhbmRsZXIsIHNwaW5uZXIpO1xuXG4gICAgY29uc3QgZnJlZVRyaWFsSGFuZGxlciA9IG5ldyBGcmVlVHJpYWxIYW5kbGVyKFBheVBhbENvbW1lcmNlR2F0ZXdheSwgc3Bpbm5lciwgZXJyb3JIYW5kbGVyKTtcblxuICAgIGNvbnN0IG9uU21hcnRCdXR0b25DbGljayA9IChkYXRhLCBhY3Rpb25zKSA9PiB7XG4gICAgICAgIHdpbmRvdy5wcGNwRnVuZGluZ1NvdXJjZSA9IGRhdGEuZnVuZGluZ1NvdXJjZTtcblxuICAgICAgICBpZiAoUGF5UGFsQ29tbWVyY2VHYXRld2F5LmJhc2ljX2NoZWNrb3V0X3ZhbGlkYXRpb25fZW5hYmxlZCkge1xuICAgICAgICAgICAgLy8gVE9ETzogcXVpY2sgZml4IHRvIGdldCB0aGUgZXJyb3IgYWJvdXQgZW1wdHkgZm9ybSBiZWZvcmUgYXR0ZW1wdGluZyBQYXlQYWwgb3JkZXJcbiAgICAgICAgICAgIC8vIGl0IHNob3VsZCBzb2x2ZSAjNTEzIGZvciBtb3N0IG9mIHRoZSB1c2VycywgYnV0IHByb3BlciBzb2x1dGlvbiBzaG91bGQgYmUgaW1wbGVtZW50ZWQgbGF0ZXIuXG4gICAgICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IGpRdWVyeSgnZm9ybS53b29jb21tZXJjZS1jaGVja291dCAudmFsaWRhdGUtcmVxdWlyZWQ6dmlzaWJsZSA6aW5wdXQnKTtcbiAgICAgICAgICAgIHJlcXVpcmVkRmllbGRzLmVhY2goKGksIGlucHV0KSA9PiB7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KGlucHV0KS50cmlnZ2VyKCd2YWxpZGF0ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zdCBpbnZhbGlkRmllbGRzID0gQXJyYXkuZnJvbShqUXVlcnkoJ2Zvcm0ud29vY29tbWVyY2UtY2hlY2tvdXQgLnZhbGlkYXRlLXJlcXVpcmVkLndvb2NvbW1lcmNlLWludmFsaWQ6dmlzaWJsZScpKTtcbiAgICAgICAgICAgIGlmIChpbnZhbGlkRmllbGRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJpbGxpbmdGaWVsZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud29vY29tbWVyY2UtYmlsbGluZy1maWVsZHMnKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGlwcGluZ0ZpZWxkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53b29jb21tZXJjZS1zaGlwcGluZy1maWVsZHMnKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWVNZXNzYWdlTWFwID0gUGF5UGFsQ29tbWVyY2VHYXRld2F5LmxhYmVscy5lcnJvci5yZXF1aXJlZC5lbGVtZW50cztcbiAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlcyA9IGludmFsaWRGaWVsZHMubWFwKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ1tuYW1lXScpPy5nZXRBdHRyaWJ1dGUoJ25hbWUnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgJiYgbmFtZSBpbiBuYW1lTWVzc2FnZU1hcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5hbWVNZXNzYWdlTWFwW25hbWVdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBsYWJlbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJykudGV4dENvbnRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKCcqJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmlsbGluZ0ZpZWxkc0NvbnRhaW5lcj8uY29udGFpbnMoZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IFBheVBhbENvbW1lcmNlR2F0ZXdheS5sYWJlbHMuYmlsbGluZ19maWVsZC5yZXBsYWNlKCclcycsIGxhYmVsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHBpbmdGaWVsZHNDb250YWluZXI/LmNvbnRhaW5zKGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBQYXlQYWxDb21tZXJjZUdhdGV3YXkubGFiZWxzLnNoaXBwaW5nX2ZpZWxkLnJlcGxhY2UoJyVzJywgbGFiZWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXlQYWxDb21tZXJjZUdhdGV3YXkubGFiZWxzLmVycm9yLnJlcXVpcmVkLmZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgnJXMnLCBgPHN0cm9uZz4ke2xhYmVsfTwvc3Ryb25nPmApXG4gICAgICAgICAgICAgICAgfSkuZmlsdGVyKHMgPT4gcy5sZW5ndGggPiAyKTtcblxuICAgICAgICAgICAgICAgIGVycm9ySGFuZGxlci5jbGVhcigpO1xuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JIYW5kbGVyLm1lc3NhZ2VzKG1lc3NhZ2VzKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXIubWVzc2FnZShQYXlQYWxDb21tZXJjZUdhdGV3YXkubGFiZWxzLmVycm9yLnJlcXVpcmVkLmdlbmVyaWMpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBhY3Rpb25zLnJlamVjdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0ud29vY29tbWVyY2UtY2hlY2tvdXQnKTtcbiAgICAgICAgaWYgKGZvcm0pIHtcbiAgICAgICAgICAgIGpRdWVyeSgnI3BwY3AtZnVuZGluZy1zb3VyY2UtZm9ybS1pbnB1dCcpLnJlbW92ZSgpO1xuICAgICAgICAgICAgZm9ybS5pbnNlcnRBZGphY2VudEhUTUwoXG4gICAgICAgICAgICAgICAgJ2JlZm9yZWVuZCcsXG4gICAgICAgICAgICAgICAgYDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgbmFtZT1cInBwY3AtZnVuZGluZy1zb3VyY2VcIiB2YWx1ZT1cIiR7ZGF0YS5mdW5kaW5nU291cmNlfVwiIGlkPVwicHBjcC1mdW5kaW5nLXNvdXJjZS1mb3JtLWlucHV0XCI+YFxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaXNGcmVlVHJpYWwgPSBQYXlQYWxDb21tZXJjZUdhdGV3YXkuaXNfZnJlZV90cmlhbF9jYXJ0O1xuICAgICAgICBpZiAoaXNGcmVlVHJpYWwgJiYgZGF0YS5mdW5kaW5nU291cmNlICE9PSAnY2FyZCcpIHtcbiAgICAgICAgICAgIGZyZWVUcmlhbEhhbmRsZXIuaGFuZGxlKCk7XG4gICAgICAgICAgICByZXR1cm4gYWN0aW9ucy5yZWplY3QoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgY29uc3Qgb25TbWFydEJ1dHRvbnNJbml0ID0gKCkgPT4ge1xuICAgICAgICBidXR0b25zU3Bpbm5lci51bmJsb2NrKCk7XG4gICAgfTtcbiAgICBjb25zdCByZW5kZXJlciA9IG5ldyBSZW5kZXJlcihjcmVkaXRDYXJkUmVuZGVyZXIsIFBheVBhbENvbW1lcmNlR2F0ZXdheSwgb25TbWFydEJ1dHRvbkNsaWNrLCBvblNtYXJ0QnV0dG9uc0luaXQpO1xuICAgIGNvbnN0IG1lc3NhZ2VSZW5kZXJlciA9IG5ldyBNZXNzYWdlUmVuZGVyZXIoUGF5UGFsQ29tbWVyY2VHYXRld2F5Lm1lc3NhZ2VzKTtcbiAgICBjb25zdCBjb250ZXh0ID0gUGF5UGFsQ29tbWVyY2VHYXRld2F5LmNvbnRleHQ7XG4gICAgaWYgKGNvbnRleHQgPT09ICdtaW5pLWNhcnQnIHx8IGNvbnRleHQgPT09ICdwcm9kdWN0Jykge1xuICAgICAgICBpZiAoUGF5UGFsQ29tbWVyY2VHYXRld2F5Lm1pbmlfY2FydF9idXR0b25zX2VuYWJsZWQgPT09ICcxJykge1xuICAgICAgICAgICAgY29uc3QgbWluaUNhcnRCb290c3RyYXAgPSBuZXcgTWluaUNhcnRCb290c3RhcChcbiAgICAgICAgICAgICAgICBQYXlQYWxDb21tZXJjZUdhdGV3YXksXG4gICAgICAgICAgICAgICAgcmVuZGVyZXJcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIG1pbmlDYXJ0Qm9vdHN0cmFwLmluaXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb250ZXh0ID09PSAncHJvZHVjdCcgJiYgUGF5UGFsQ29tbWVyY2VHYXRld2F5LnNpbmdsZV9wcm9kdWN0X2J1dHRvbnNfZW5hYmxlZCA9PT0gJzEnKSB7XG4gICAgICAgIGNvbnN0IHNpbmdsZVByb2R1Y3RCb290c3RyYXAgPSBuZXcgU2luZ2xlUHJvZHVjdEJvb3RzdGFwKFxuICAgICAgICAgICAgUGF5UGFsQ29tbWVyY2VHYXRld2F5LFxuICAgICAgICAgICAgcmVuZGVyZXIsXG4gICAgICAgICAgICBtZXNzYWdlUmVuZGVyZXIsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2luZ2xlUHJvZHVjdEJvb3RzdHJhcC5pbml0KCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgPT09ICdjYXJ0Jykge1xuICAgICAgICBjb25zdCBjYXJ0Qm9vdHN0cmFwID0gbmV3IENhcnRCb290c3RyYXAoXG4gICAgICAgICAgICBQYXlQYWxDb21tZXJjZUdhdGV3YXksXG4gICAgICAgICAgICByZW5kZXJlcixcbiAgICAgICAgKTtcblxuICAgICAgICBjYXJ0Qm9vdHN0cmFwLmluaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dCA9PT0gJ2NoZWNrb3V0Jykge1xuICAgICAgICBjb25zdCBjaGVja291dEJvb3RzdGFwID0gbmV3IENoZWNrb3V0Qm9vdHN0YXAoXG4gICAgICAgICAgICBQYXlQYWxDb21tZXJjZUdhdGV3YXksXG4gICAgICAgICAgICByZW5kZXJlcixcbiAgICAgICAgICAgIG1lc3NhZ2VSZW5kZXJlcixcbiAgICAgICAgICAgIHNwaW5uZXJcbiAgICAgICAgKTtcblxuICAgICAgICBjaGVja291dEJvb3RzdGFwLmluaXQoKTtcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dCA9PT0gJ3BheS1ub3cnICkge1xuICAgICAgICBjb25zdCBwYXlOb3dCb290c3RyYXAgPSBuZXcgUGF5Tm93Qm9vdHN0cmFwKFxuICAgICAgICAgICAgUGF5UGFsQ29tbWVyY2VHYXRld2F5LFxuICAgICAgICAgICAgcmVuZGVyZXIsXG4gICAgICAgICAgICBtZXNzYWdlUmVuZGVyZXIsXG4gICAgICAgICAgICBzcGlubmVyXG4gICAgICAgICk7XG4gICAgICAgIHBheU5vd0Jvb3RzdHJhcC5pbml0KCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRleHQgIT09ICdjaGVja291dCcpIHtcbiAgICAgICAgbWVzc2FnZVJlbmRlcmVyLnJlbmRlcigpO1xuICAgIH1cbn07XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICdET01Db250ZW50TG9hZGVkJyxcbiAgICAoKSA9PiB7XG4gICAgICAgIGlmICghdHlwZW9mIChQYXlQYWxDb21tZXJjZUdhdGV3YXkpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQYXlQYWwgYnV0dG9uIGNvdWxkIG5vdCBiZSBjb25maWd1cmVkLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgUGF5UGFsQ29tbWVyY2VHYXRld2F5LmNvbnRleHQgIT09ICdjaGVja291dCdcbiAgICAgICAgICAgICYmIFBheVBhbENvbW1lcmNlR2F0ZXdheS5kYXRhX2NsaWVudF9pZC51c2VyID09PSAwXG4gICAgICAgICAgICAmJiBQYXlQYWxDb21tZXJjZUdhdGV3YXkuZGF0YV9jbGllbnRfaWQuaGFzX3N1YnNjcmlwdGlvbnNcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlwYWxCdXR0b25HYXRld2F5SWRzID0gW1xuICAgICAgICAgICAgUGF5bWVudE1ldGhvZHMuUEFZUEFMLFxuICAgICAgICAgICAgLi4uT2JqZWN0LmVudHJpZXMoUGF5UGFsQ29tbWVyY2VHYXRld2F5LnNlcGFyYXRlX2J1dHRvbnMpLm1hcCgoW2ssIGRhdGFdKSA9PiBkYXRhLmlkKSxcbiAgICAgICAgXVxuXG4gICAgICAgIC8vIFNvbWV0aW1lcyBQYXlQYWwgc2NyaXB0IHRha2VzIGxvbmcgdGltZSB0byBsb2FkLFxuICAgICAgICAvLyBzbyB3ZSBhZGRpdGlvbmFsbHkgaGlkZSB0aGUgc3RhbmRhcmQgb3JkZXIgYnV0dG9uIGhlcmUgdG8gYXZvaWQgZmFpbGVkIG9yZGVycy5cbiAgICAgICAgLy8gTm9ybWFsbHkgaXQgaXMgaGlkZGVuIGxhdGVyIGFmdGVyIHRoZSBzY3JpcHQgbG9hZC5cbiAgICAgICAgY29uc3QgaGlkZU9yZGVyQnV0dG9uSWZQcGNwR2F0ZXdheSA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vIG9ubHkgaW4gY2hlY2tvdXQgYW5kIHBheSBub3cgcGFnZSwgb3RoZXJ3aXNlIGl0IG1heSBicmVhayB0aGluZ3MgKGUuZy4gcGF5bWVudCB2aWEgcHJvZHVjdCBwYWdlKSxcbiAgICAgICAgICAgIC8vIGFuZCBhbHNvIHRoZSBsb2FkaW5nIHNwaW5uZXIgbWF5IGxvb2sgd2VpcmQgb24gb3RoZXIgcGFnZXNcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAhWydjaGVja291dCcsICdwYXktbm93J10uaW5jbHVkZXMoUGF5UGFsQ29tbWVyY2VHYXRld2F5LmNvbnRleHQpXG4gICAgICAgICAgICAgICAgfHwgaXNDaGFuZ2VQYXltZW50UGFnZSgpXG4gICAgICAgICAgICAgICAgfHwgKFBheVBhbENvbW1lcmNlR2F0ZXdheS5pc19mcmVlX3RyaWFsX2NhcnQgJiYgUGF5UGFsQ29tbWVyY2VHYXRld2F5LnZhdWx0ZWRfcGF5cGFsX2VtYWlsICE9PSAnJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBheW1lbnRNZXRob2QgPSBnZXRDdXJyZW50UGF5bWVudE1ldGhvZCgpO1xuICAgICAgICAgICAgY29uc3QgaXNQYXlwYWxCdXR0b24gPSBwYXlwYWxCdXR0b25HYXRld2F5SWRzLmluY2x1ZGVzKGN1cnJlbnRQYXltZW50TWV0aG9kKTtcbiAgICAgICAgICAgIGNvbnN0IGlzQ2FyZHMgPSBjdXJyZW50UGF5bWVudE1ldGhvZCA9PT0gUGF5bWVudE1ldGhvZHMuQ0FSRFM7XG5cbiAgICAgICAgICAgIHNldFZpc2libGUoT1JERVJfQlVUVE9OX1NFTEVDVE9SLCAhaXNQYXlwYWxCdXR0b24gJiYgIWlzQ2FyZHMsIHRydWUpO1xuXG4gICAgICAgICAgICBpZiAoaXNQYXlwYWxCdXR0b24pIHtcbiAgICAgICAgICAgICAgICAvLyBzdG9wcGVkIGFmdGVyIHRoZSBmaXJzdCByZW5kZXJpbmcgb2YgdGhlIGJ1dHRvbnMsIGluIG9uSW5pdFxuICAgICAgICAgICAgICAgIGJ1dHRvbnNTcGlubmVyLmJsb2NrKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1dHRvbnNTcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzQ2FyZHMpIHtcbiAgICAgICAgICAgICAgICBjYXJkc1NwaW5uZXIuYmxvY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FyZHNTcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGpRdWVyeShkb2N1bWVudCkub24oJ2hvc3RlZF9maWVsZHNfbG9hZGVkJywgKCkgPT4ge1xuICAgICAgICAgICAgY2FyZHNTcGlubmVyLnVuYmxvY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGJvb3RzdHJhcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgIGhpZGVPcmRlckJ1dHRvbklmUHBjcEdhdGV3YXkoKTtcblxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkub24oJ3VwZGF0ZWRfY2hlY2tvdXQgcGF5bWVudF9tZXRob2Rfc2VsZWN0ZWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoYm9vdHN0cmFwcGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoaWRlT3JkZXJCdXR0b25JZlBwY3BHYXRld2F5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBzY3JpcHQuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgYm9vdHN0cmFwcGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgYm9vdHN0cmFwKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKCdzcmMnLCBQYXlQYWxDb21tZXJjZUdhdGV3YXkuYnV0dG9uLnVybCk7XG4gICAgICAgIE9iamVjdC5lbnRyaWVzKFBheVBhbENvbW1lcmNlR2F0ZXdheS5zY3JpcHRfYXR0cmlidXRlcykuZm9yRWFjaChcbiAgICAgICAgICAgIChrZXlWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoa2V5VmFsdWVbMF0sIGtleVZhbHVlWzFdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoUGF5UGFsQ29tbWVyY2VHYXRld2F5LmRhdGFfY2xpZW50X2lkLnNldF9hdHRyaWJ1dGUpIHtcbiAgICAgICAgICAgIGRhdGFDbGllbnRJZEF0dHJpYnV0ZUhhbmRsZXIoc2NyaXB0LCBQYXlQYWxDb21tZXJjZUdhdGV3YXkuZGF0YV9jbGllbnRfaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoc2NyaXB0KTtcbiAgICB9LFxuKTtcbiJdLCJuYW1lcyI6WyJFcnJvckhhbmRsZXIiLCJjb25zdHJ1Y3RvciIsImdlbmVyaWNFcnJvclRleHQiLCJ3cmFwcGVyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwibWVzc2FnZXNMaXN0IiwiZ2VuZXJpY0Vycm9yIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGVhciIsIm1lc3NhZ2UiLCJhcHBlbmRQcmVwYXJlZEVycm9yTWVzc2FnZUVsZW1lbnQiLCJlcnJvck1lc3NhZ2VFbGVtZW50IiwiX3ByZXBhcmVNZXNzYWdlc0xpc3QiLCJyZXBsYWNlV2l0aCIsInRleHQiLCJwZXJzaXN0IiwiX2FkZE1lc3NhZ2UiLCJfc2Nyb2xsVG9NZXNzYWdlcyIsIm1lc3NhZ2VzIiwidGV4dHMiLCJmb3JFYWNoIiwidCIsIlN0cmluZyIsImxlbmd0aCIsIkVycm9yIiwiYWRkIiwicmVtb3ZlIiwibWVzc2FnZU5vZGUiLCJfcHJlcGFyZU1lc3NhZ2VzTGlzdEl0ZW0iLCJhcHBlbmRDaGlsZCIsImpRdWVyeSIsInNjcm9sbF90b19ub3RpY2VzIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImxpIiwiaW5uZXJIVE1MIiwib25BcHByb3ZlIiwiY29udGV4dCIsImVycm9ySGFuZGxlciIsImRhdGEiLCJhY3Rpb25zIiwiZmV0Y2giLCJjb25maWciLCJhamF4IiwiYXBwcm92ZV9vcmRlciIsImVuZHBvaW50IiwibWV0aG9kIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJub25jZSIsIm9yZGVyX2lkIiwib3JkZXJJRCIsImZ1bmRpbmdfc291cmNlIiwid2luZG93IiwicHBjcEZ1bmRpbmdTb3VyY2UiLCJ0aGVuIiwicmVzIiwianNvbiIsInN1Y2Nlc3MiLCJyZXN0YXJ0IiwiY2F0Y2giLCJlcnIiLCJsb2NhdGlvbiIsImhyZWYiLCJyZWRpcmVjdCIsInBheWVyRGF0YSIsInBheWVyIiwiUGF5UGFsQ29tbWVyY2VHYXRld2F5IiwicGhvbmUiLCJwaG9uZV90eXBlIiwicGhvbmVfbnVtYmVyIiwibmF0aW9uYWxfbnVtYmVyIiwidmFsdWUiLCJlbWFpbF9hZGRyZXNzIiwibmFtZSIsInN1cm5hbWUiLCJnaXZlbl9uYW1lIiwiYWRkcmVzcyIsImNvdW50cnlfY29kZSIsImFkZHJlc3NfbGluZV8xIiwiYWRkcmVzc19saW5lXzIiLCJhZG1pbl9hcmVhXzEiLCJhZG1pbl9hcmVhXzIiLCJwb3N0YWxfY29kZSIsIlBheW1lbnRNZXRob2RzIiwiUEFZUEFMIiwiQ0FSRFMiLCJPWFhPIiwiQ0FSRF9CVVRUT04iLCJPUkRFUl9CVVRUT05fU0VMRUNUT1IiLCJnZXRDdXJyZW50UGF5bWVudE1ldGhvZCIsImVsIiwiaXNTYXZlZENhcmRTZWxlY3RlZCIsInNhdmVkQ2FyZExpc3QiLCJDYXJ0QWN0aW9uSGFuZGxlciIsImNvbmZpZ3VyYXRpb24iLCJjcmVhdGVPcmRlciIsImJuQ29kZSIsImJuX2NvZGVzIiwiY3JlYXRlX29yZGVyIiwicHVyY2hhc2VfdW5pdHMiLCJwYXltZW50X21ldGhvZCIsImJuX2NvZGUiLCJjb25zb2xlIiwiZXJyb3IiLCJpZCIsIm9uRXJyb3IiLCJNaW5pQ2FydEJvb3RzdGFwIiwiZ2F0ZXdheSIsInJlbmRlcmVyIiwiYWN0aW9uSGFuZGxlciIsImluaXQiLCJsYWJlbHMiLCJnZW5lcmljIiwicmVuZGVyIiwib24iLCJzaG91bGRSZW5kZXIiLCJidXR0b24iLCJtaW5pX2NhcnRfd3JhcHBlciIsImhvc3RlZF9maWVsZHMiLCJzdHlsZSIsIm1pbmlfY2FydF9zdHlsZSIsIlByb2R1Y3QiLCJVcGRhdGVDYXJ0IiwidXBkYXRlIiwib25SZXNvbHZlIiwicHJvZHVjdHMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc3VsdCIsInJlc29sdmVkIiwiQnV0dG9uc1RvZ2dsZUxpc3RlbmVyIiwiZWxlbWVudCIsInNob3dDYWxsYmFjayIsImhpZGVDYWxsYmFjayIsIm9ic2VydmVyIiwiYXR0cmlidXRlcyIsImNhbGxiYWNrIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJkaXNjb25uZWN0IiwicXVhbnRpdHkiLCJ2YXJpYXRpb25zIiwiU2luZ2xlUHJvZHVjdEFjdGlvbkhhbmRsZXIiLCJ1cGRhdGVDYXJ0Iiwic2hvd0J1dHRvbkNhbGxiYWNrIiwiaGlkZUJ1dHRvbkNhbGxiYWNrIiwiZm9ybUVsZW1lbnQiLCJoYXNWYXJpYXRpb25zIiwiZ2V0UHJvZHVjdHMiLCJpc0dyb3VwZWRQcm9kdWN0IiwicXR5IiwicXVlcnlTZWxlY3RvckFsbCIsImVsZW1lbnROYW1lIiwiZ2V0QXR0cmlidXRlIiwibWF0Y2giLCJwYXJzZUludCIsInB1c2giLCJwcm9taXNlIiwibWFwIiwiU2luZ2xlUHJvZHVjdEJvb3RzdGFwIiwiaGFuZGxlQ2hhbmdlIiwiaGlkZUJ1dHRvbnMiLCJoaWRlTWVzc2FnZXMiLCJhZGRFdmVudExpc3RlbmVyIiwiYmluZCIsInByaWNlQW1vdW50SXNaZXJvIiwicHJpY2VBbW91bnQiLCJwcmljZVRleHQiLCJpbm5lclRleHQiLCJyZXBsYWNlIiwicGFyc2VGbG9hdCIsImNoYW5nZV9jYXJ0Iiwic2hvd0J1dHRvbnMiLCJyZW5kZXJXaXRoQW1vdW50IiwiQ2FydEJvb3RzdHJhcCIsInNwaW5uZXIiLCJibG9jayIsInVuYmxvY2siLCJjb2RlIiwiY2xpY2siLCJDaGVja291dEFjdGlvbkhhbmRsZXIiLCJmb3JtU2VsZWN0b3IiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZm9ybUpzb25PYmoiLCJPYmplY3QiLCJmcm9tRW50cmllcyIsImNyZWF0ZWFjY291bnQiLCJpcyIsInBheW1lbnRNZXRob2QiLCJmdW5kaW5nU291cmNlIiwiZm9ybSIsImRvbVBhcnNlciIsIkRPTVBhcnNlciIsInBhcnNlRnJvbVN0cmluZyIsImRldGFpbHMiLCJkIiwiaXNzdWUiLCJkZXNjcmlwdGlvbiIsImpvaW4iLCJpbnB1dCIsImN1c3RvbV9pZCIsImFwcGVuZCIsIm9uQ2FuY2VsIiwiZ2V0RWxlbWVudCIsInNlbGVjdG9yT3JFbGVtZW50IiwiaXNWaXNpYmxlIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJnZXRDbGllbnRSZWN0cyIsInNldFZpc2libGUiLCJzaG93IiwiaW1wb3J0YW50IiwiY3VycmVudFZhbHVlIiwiZ2V0UHJvcGVydHlWYWx1ZSIsInNldFByb3BlcnR5IiwicmVtb3ZlUHJvcGVydHkiLCJoaWRlIiwiQ2hlY2tvdXRCb290c3RhcCIsInN0YW5kYXJkT3JkZXJCdXR0b25TZWxlY3RvciIsImJ1dHRvbkNoYW5nZU9ic2VydmVyIiwidXBkYXRlVWkiLCJ2YWwiLCJjYW5jZWxfd3JhcHBlciIsImN1cnJlbnRQYXltZW50TWV0aG9kIiwiaXNQYXlwYWwiLCJpc0NhcmQiLCJpc1NlcGFyYXRlQnV0dG9uR2F0ZXdheSIsImluY2x1ZGVzIiwiaXNTYXZlZENhcmQiLCJpc05vdE91ckdhdGV3YXkiLCJpc0ZyZWVUcmlhbCIsImlzX2ZyZWVfdHJpYWxfY2FydCIsImhhc1ZhdWx0ZWRQYXlwYWwiLCJ2YXVsdGVkX3BheXBhbF9lbWFpbCIsInBheXBhbEJ1dHRvbldyYXBwZXJzIiwiZW50cmllcyIsInNlcGFyYXRlX2J1dHRvbnMiLCJyZWR1Y2UiLCJrIiwiZ2F0ZXdheUlkIiwiZGlzYWJsZUNyZWRpdENhcmRGaWVsZHMiLCJlbmFibGVDcmVkaXRDYXJkRmllbGRzIiwiYWRkQ2xhc3MiLCJhdHRyIiwicmVtb3ZlQ2xhc3MiLCJpc0NoYW5nZVBheW1lbnRQYWdlIiwidXJsUGFyYW1zIiwiVVJMU2VhcmNoUGFyYW1zIiwic2VhcmNoIiwiaGFzIiwiUGF5Tm93Qm9vdHN0cmFwIiwibWVyZ2UiLCJSZW5kZXJlciIsImNyZWRpdENhcmRSZW5kZXJlciIsImRlZmF1bHRTZXR0aW5ncyIsIm9uU21hcnRCdXR0b25DbGljayIsIm9uU21hcnRCdXR0b25zSW5pdCIsInJlbmRlcmVkU291cmNlcyIsIlNldCIsImNvbnRleHRDb25maWciLCJzZXR0aW5nc092ZXJyaWRlIiwic2V0dGluZ3MiLCJlbmFibGVkU2VwYXJhdGVHYXRld2F5cyIsImZpbHRlciIsInMiLCJoYXNFbmFibGVkU2VwYXJhdGVHYXRld2F5cyIsImtleXMiLCJyZW5kZXJCdXR0b25zIiwicGF5cGFsIiwiZ2V0RnVuZGluZ1NvdXJjZXMiLCJzaGFwZSIsImlzQWxyZWFkeVJlbmRlcmVkIiwiQnV0dG9ucyIsImJ0biIsIm9uQ2xpY2siLCJvbkluaXQiLCJpc0VsaWdpYmxlIiwiaGFzQ2hpbGROb2RlcyIsImRvbUVsZW1lbnQiLCJkaXNwbGF5IiwiZGlzYWJsZUZpZWxkcyIsImVuYWJsZUZpZWxkcyIsImRjY0lucHV0RmFjdG9yeSIsIm9yaWdpbmFsIiwic3R5bGVzIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsIm5ld0VsZW1lbnQiLCJjbGFzc05hbWUiLCJ2YWx1ZXMiLCJwcm9wIiwiaXNOYU4iLCJDcmVkaXRDYXJkUmVuZGVyZXIiLCJkZWZhdWx0Q29uZmlnIiwiY2FyZFZhbGlkIiwiZm9ybVZhbGlkIiwiY3VycmVudEhvc3RlZEZpZWxkc0luc3RhbmNlIiwiSG9zdGVkRmllbGRzIiwid3JhcHBlckVsZW1lbnQiLCJwYXJlbnROb2RlIiwicmVtb3ZlQ2hpbGQiLCJidXR0b25TZWxlY3RvciIsInRlYXJkb3duIiwiZ2F0ZVdheUJveCIsIm9sZERpc3BsYXlTdHlsZSIsImhpZGVEY2NHYXRld2F5IiwiY2FyZE51bWJlckZpZWxkIiwic3R5bGVzUmF3IiwiY2FyZE51bWJlciIsInJlcGxhY2VDaGlsZCIsImNhcmRFeHBpcnlGaWVsZCIsImNhcmRFeHBpcnkiLCJjYXJkQ29kZUZpZWxkIiwiY2FyZENvZGUiLCJmb3JtV3JhcHBlciIsImVuZm9yY2VfdmF1bHQiLCJjaGVja2VkIiwiZmllbGRzIiwibnVtYmVyIiwic2VsZWN0b3IiLCJwbGFjZWhvbGRlciIsImNyZWRpdF9jYXJkX251bWJlciIsImN2diIsImV4cGlyYXRpb25EYXRlIiwibW1feXkiLCJob3N0ZWRGaWVsZHMiLCJkaXNwYXRjaEV2ZW50IiwiQ3VzdG9tRXZlbnQiLCJfc3VibWl0IiwiZXZlbnQiLCJjYXJkcyIsInZhbGlkQ2FyZHMiLCJ2YWxpZF9jYXJkcyIsImluZGV4T2YiLCJ0eXBlIiwiX2NhcmROdW1iZXJGaWxlZENMYXNzTmFtZUJ5Q2FyZFR5cGUiLCJfcmVjcmVhdGVFbGVtZW50Q2xhc3NBdHRyaWJ1dGUiLCJpc1ZhbGlkIiwiZXZlcnkiLCJrZXkiLCJwcmV2ZW50RGVmYXVsdCIsImZpZWxkIiwiYXR0cmlidXRlIiwicmVtb3ZlQXR0cmlidXRlIiwic2F2ZV9jYXJkIiwiY2FuX3NhdmVfdmF1bHRfdG9rZW4iLCJ2YXVsdCIsImdldEVsZW1lbnRCeUlkIiwiY29udGluZ2VuY3kiLCJob3N0ZWRGaWVsZHNEYXRhIiwiY29udGluZ2VuY2llcyIsImNhcmRob2xkZXJOYW1lIiwiZmlyc3ROYW1lIiwibGFzdE5hbWUiLCJzdWJtaXQiLCJwYXlsb2FkIiwib3JkZXJJZCIsImNhcmRfbm90X3N1cHBvcnRlZCIsImZpZWxkc19ub3RfdmFsaWQiLCJjYXJkVHlwZSIsIm5ld0NsYXNzTmFtZSIsInN0b3JhZ2VLZXkiLCJ2YWxpZGF0ZVRva2VuIiwidG9rZW4iLCJ1c2VyIiwiY3VycmVudFRpbWUiLCJEYXRlIiwiZ2V0VGltZSIsImlzRXhwaXJlZCIsImV4cGlyYXRpb24iLCJzdG9yZWRUb2tlbkZvclVzZXIiLCJwYXJzZSIsInNlc3Npb25TdG9yYWdlIiwiZ2V0SXRlbSIsInN0b3JlVG9rZW4iLCJzZXRJdGVtIiwiZGF0YUNsaWVudElkQXR0cmlidXRlSGFuZGxlciIsInNjcmlwdCIsIk1lc3NhZ2VSZW5kZXJlciIsIk1lc3NhZ2VzIiwiYW1vdW50IiwicGxhY2VtZW50IiwibmV3V3JhcHBlciIsInNpYmxpbmciLCJuZXh0U2libGluZyIsInBhcmVudEVsZW1lbnQiLCJpbnNlcnRCZWZvcmUiLCJTcGlubmVyIiwidGFyZ2V0Iiwic2V0VGFyZ2V0Iiwib3ZlcmxheUNTUyIsImJhY2tncm91bmQiLCJvcGFjaXR5IiwiRnJlZVRyaWFsSGFuZGxlciIsImhhbmRsZSIsInZhdWx0X3BheXBhbCIsInJldHVybl91cmwiLCJhcHByb3ZlX2xpbmsiLCJidXR0b25zU3Bpbm5lciIsImNhcmRzU3Bpbm5lciIsImJvb3RzdHJhcCIsImZyZWVUcmlhbEhhbmRsZXIiLCJiYXNpY19jaGVja291dF92YWxpZGF0aW9uX2VuYWJsZWQiLCJyZXF1aXJlZEZpZWxkcyIsImVhY2giLCJpIiwidHJpZ2dlciIsImludmFsaWRGaWVsZHMiLCJBcnJheSIsImZyb20iLCJiaWxsaW5nRmllbGRzQ29udGFpbmVyIiwic2hpcHBpbmdGaWVsZHNDb250YWluZXIiLCJuYW1lTWVzc2FnZU1hcCIsInJlcXVpcmVkIiwiZWxlbWVudHMiLCJsYWJlbCIsInRleHRDb250ZW50IiwicmVwbGFjZUFsbCIsInRyaW0iLCJiaWxsaW5nX2ZpZWxkIiwic2hpcHBpbmdfZmllbGQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJtZXNzYWdlUmVuZGVyZXIiLCJtaW5pX2NhcnRfYnV0dG9uc19lbmFibGVkIiwibWluaUNhcnRCb290c3RyYXAiLCJzaW5nbGVfcHJvZHVjdF9idXR0b25zX2VuYWJsZWQiLCJzaW5nbGVQcm9kdWN0Qm9vdHN0cmFwIiwiY2FydEJvb3RzdHJhcCIsImNoZWNrb3V0Qm9vdHN0YXAiLCJwYXlOb3dCb290c3RyYXAiLCJkYXRhX2NsaWVudF9pZCIsImhhc19zdWJzY3JpcHRpb25zIiwicGF5cGFsQnV0dG9uR2F0ZXdheUlkcyIsImhpZGVPcmRlckJ1dHRvbklmUHBjcEdhdGV3YXkiLCJpc1BheXBhbEJ1dHRvbiIsImlzQ2FyZHMiLCJib290c3RyYXBwZWQiLCJ1cmwiLCJzY3JpcHRfYXR0cmlidXRlcyIsImtleVZhbHVlIiwic2V0X2F0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///536\n")
            },
            996: module => {
                eval("\n\nvar isMergeableObject = function isMergeableObject(value) {\n\treturn isNonNullObject(value)\n\t\t&& !isSpecial(value)\n};\n\nfunction isNonNullObject(value) {\n\treturn !!value && typeof value === 'object'\n}\n\nfunction isSpecial(value) {\n\tvar stringValue = Object.prototype.toString.call(value);\n\n\treturn stringValue === '[object RegExp]'\n\t\t|| stringValue === '[object Date]'\n\t\t|| isReactElement(value)\n}\n\n// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25\nvar canUseSymbol = typeof Symbol === 'function' && Symbol.for;\nvar REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;\n\nfunction isReactElement(value) {\n\treturn value.$$typeof === REACT_ELEMENT_TYPE\n}\n\nfunction emptyTarget(val) {\n\treturn Array.isArray(val) ? [] : {}\n}\n\nfunction cloneUnlessOtherwiseSpecified(value, options) {\n\treturn (options.clone !== false && options.isMergeableObject(value))\n\t\t? deepmerge(emptyTarget(value), value, options)\n\t\t: value\n}\n\nfunction defaultArrayMerge(target, source, options) {\n\treturn target.concat(source).map(function(element) {\n\t\treturn cloneUnlessOtherwiseSpecified(element, options)\n\t})\n}\n\nfunction getMergeFunction(key, options) {\n\tif (!options.customMerge) {\n\t\treturn deepmerge\n\t}\n\tvar customMerge = options.customMerge(key);\n\treturn typeof customMerge === 'function' ? customMerge : deepmerge\n}\n\nfunction getEnumerableOwnPropertySymbols(target) {\n\treturn Object.getOwnPropertySymbols\n\t\t? Object.getOwnPropertySymbols(target).filter(function(symbol) {\n\t\t\treturn target.propertyIsEnumerable(symbol)\n\t\t})\n\t\t: []\n}\n\nfunction getKeys(target) {\n\treturn Object.keys(target).concat(getEnumerableOwnPropertySymbols(target))\n}\n\nfunction propertyIsOnObject(object, property) {\n\ttry {\n\t\treturn property in object\n\t} catch(_) {\n\t\treturn false\n\t}\n}\n\n// Protects from prototype poisoning and unexpected merging up the prototype chain.\nfunction propertyIsUnsafe(target, key) {\n\treturn propertyIsOnObject(target, key) // Properties are safe to merge if they don't exist in the target yet,\n\t\t&& !(Object.hasOwnProperty.call(target, key) // unsafe if they exist up the prototype chain,\n\t\t\t&& Object.propertyIsEnumerable.call(target, key)) // and also unsafe if they're nonenumerable.\n}\n\nfunction mergeObject(target, source, options) {\n\tvar destination = {};\n\tif (options.isMergeableObject(target)) {\n\t\tgetKeys(target).forEach(function(key) {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(target[key], options);\n\t\t});\n\t}\n\tgetKeys(source).forEach(function(key) {\n\t\tif (propertyIsUnsafe(target, key)) {\n\t\t\treturn\n\t\t}\n\n\t\tif (propertyIsOnObject(target, key) && options.isMergeableObject(source[key])) {\n\t\t\tdestination[key] = getMergeFunction(key, options)(target[key], source[key], options);\n\t\t} else {\n\t\t\tdestination[key] = cloneUnlessOtherwiseSpecified(source[key], options);\n\t\t}\n\t});\n\treturn destination\n}\n\nfunction deepmerge(target, source, options) {\n\toptions = options || {};\n\toptions.arrayMerge = options.arrayMerge || defaultArrayMerge;\n\toptions.isMergeableObject = options.isMergeableObject || isMergeableObject;\n\t// cloneUnlessOtherwiseSpecified is added to `options` so that custom arrayMerge()\n\t// implementations can use it. The caller may not replace it.\n\toptions.cloneUnlessOtherwiseSpecified = cloneUnlessOtherwiseSpecified;\n\n\tvar sourceIsArray = Array.isArray(source);\n\tvar targetIsArray = Array.isArray(target);\n\tvar sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;\n\n\tif (!sourceAndTargetTypesMatch) {\n\t\treturn cloneUnlessOtherwiseSpecified(source, options)\n\t} else if (sourceIsArray) {\n\t\treturn options.arrayMerge(target, source, options)\n\t} else {\n\t\treturn mergeObject(target, source, options)\n\t}\n}\n\ndeepmerge.all = function deepmergeAll(array, options) {\n\tif (!Array.isArray(array)) {\n\t\tthrow new Error('first argument should be an array')\n\t}\n\n\treturn array.reduce(function(prev, next) {\n\t\treturn deepmerge(prev, next, options)\n\t}, {})\n};\n\nvar deepmerge_1 = deepmerge;\n\nmodule.exports = deepmerge_1;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTk2LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUUsSUFBSTtBQUNOOztBQUVBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHBjLWJ1dHRvbi8uL25vZGVfbW9kdWxlcy9kZWVwbWVyZ2UvZGlzdC9janMuanM/M2M0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc01lcmdlYWJsZU9iamVjdCA9IGZ1bmN0aW9uIGlzTWVyZ2VhYmxlT2JqZWN0KHZhbHVlKSB7XG5cdHJldHVybiBpc05vbk51bGxPYmplY3QodmFsdWUpXG5cdFx0JiYgIWlzU3BlY2lhbCh2YWx1ZSlcbn07XG5cbmZ1bmN0aW9uIGlzTm9uTnVsbE9iamVjdCh2YWx1ZSkge1xuXHRyZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnXG59XG5cbmZ1bmN0aW9uIGlzU3BlY2lhbCh2YWx1ZSkge1xuXHR2YXIgc3RyaW5nVmFsdWUgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuXG5cdHJldHVybiBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgUmVnRXhwXSdcblx0XHR8fCBzdHJpbmdWYWx1ZSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG5cdFx0fHwgaXNSZWFjdEVsZW1lbnQodmFsdWUpXG59XG5cbi8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9iNWFjOTYzZmI3OTFkMTI5OGU3ZjM5NjIzNjM4M2JjOTU1ZjkxNmMxL3NyYy9pc29tb3JwaGljL2NsYXNzaWMvZWxlbWVudC9SZWFjdEVsZW1lbnQuanMjTDIxLUwyNVxudmFyIGNhblVzZVN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSBjYW5Vc2VTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgOiAweGVhYzc7XG5cbmZ1bmN0aW9uIGlzUmVhY3RFbGVtZW50KHZhbHVlKSB7XG5cdHJldHVybiB2YWx1ZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFXG59XG5cbmZ1bmN0aW9uIGVtcHR5VGFyZ2V0KHZhbCkge1xuXHRyZXR1cm4gQXJyYXkuaXNBcnJheSh2YWwpID8gW10gOiB7fVxufVxuXG5mdW5jdGlvbiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCh2YWx1ZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gKG9wdGlvbnMuY2xvbmUgIT09IGZhbHNlICYmIG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QodmFsdWUpKVxuXHRcdD8gZGVlcG1lcmdlKGVtcHR5VGFyZ2V0KHZhbHVlKSwgdmFsdWUsIG9wdGlvbnMpXG5cdFx0OiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0QXJyYXlNZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuXHRyZXR1cm4gdGFyZ2V0LmNvbmNhdChzb3VyY2UpLm1hcChmdW5jdGlvbihlbGVtZW50KSB7XG5cdFx0cmV0dXJuIGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKGVsZW1lbnQsIG9wdGlvbnMpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIGdldE1lcmdlRnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG5cdGlmICghb3B0aW9ucy5jdXN0b21NZXJnZSkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2Vcblx0fVxuXHR2YXIgY3VzdG9tTWVyZ2UgPSBvcHRpb25zLmN1c3RvbU1lcmdlKGtleSk7XG5cdHJldHVybiB0eXBlb2YgY3VzdG9tTWVyZ2UgPT09ICdmdW5jdGlvbicgPyBjdXN0b21NZXJnZSA6IGRlZXBtZXJnZVxufVxuXG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlT3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sc1xuXHRcdD8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpLmZpbHRlcihmdW5jdGlvbihzeW1ib2wpIHtcblx0XHRcdHJldHVybiB0YXJnZXQucHJvcGVydHlJc0VudW1lcmFibGUoc3ltYm9sKVxuXHRcdH0pXG5cdFx0OiBbXVxufVxuXG5mdW5jdGlvbiBnZXRLZXlzKHRhcmdldCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KS5jb25jYXQoZ2V0RW51bWVyYWJsZU93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKVxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUlzT25PYmplY3Qob2JqZWN0LCBwcm9wZXJ0eSkge1xuXHR0cnkge1xuXHRcdHJldHVybiBwcm9wZXJ0eSBpbiBvYmplY3Rcblx0fSBjYXRjaChfKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn1cblxuLy8gUHJvdGVjdHMgZnJvbSBwcm90b3R5cGUgcG9pc29uaW5nIGFuZCB1bmV4cGVjdGVkIG1lcmdpbmcgdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbmZ1bmN0aW9uIHByb3BlcnR5SXNVbnNhZmUodGFyZ2V0LCBrZXkpIHtcblx0cmV0dXJuIHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgLy8gUHJvcGVydGllcyBhcmUgc2FmZSB0byBtZXJnZSBpZiB0aGV5IGRvbid0IGV4aXN0IGluIHRoZSB0YXJnZXQgeWV0LFxuXHRcdCYmICEoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpIC8vIHVuc2FmZSBpZiB0aGV5IGV4aXN0IHVwIHRoZSBwcm90b3R5cGUgY2hhaW4sXG5cdFx0XHQmJiBPYmplY3QucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh0YXJnZXQsIGtleSkpIC8vIGFuZCBhbHNvIHVuc2FmZSBpZiB0aGV5J3JlIG5vbmVudW1lcmFibGUuXG59XG5cbmZ1bmN0aW9uIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdHZhciBkZXN0aW5hdGlvbiA9IHt9O1xuXHRpZiAob3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdCh0YXJnZXQpKSB7XG5cdFx0Z2V0S2V5cyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRkZXN0aW5hdGlvbltrZXldID0gY2xvbmVVbmxlc3NPdGhlcndpc2VTcGVjaWZpZWQodGFyZ2V0W2tleV0sIG9wdGlvbnMpO1xuXHRcdH0pO1xuXHR9XG5cdGdldEtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuXHRcdGlmIChwcm9wZXJ0eUlzVW5zYWZlKHRhcmdldCwga2V5KSkge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgKHByb3BlcnR5SXNPbk9iamVjdCh0YXJnZXQsIGtleSkgJiYgb3B0aW9ucy5pc01lcmdlYWJsZU9iamVjdChzb3VyY2Vba2V5XSkpIHtcblx0XHRcdGRlc3RpbmF0aW9uW2tleV0gPSBnZXRNZXJnZUZ1bmN0aW9uKGtleSwgb3B0aW9ucykodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZGVzdGluYXRpb25ba2V5XSA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkKHNvdXJjZVtrZXldLCBvcHRpb25zKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZGVzdGluYXRpb25cbn1cblxuZnVuY3Rpb24gZGVlcG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHRvcHRpb25zLmFycmF5TWVyZ2UgPSBvcHRpb25zLmFycmF5TWVyZ2UgfHwgZGVmYXVsdEFycmF5TWVyZ2U7XG5cdG9wdGlvbnMuaXNNZXJnZWFibGVPYmplY3QgPSBvcHRpb25zLmlzTWVyZ2VhYmxlT2JqZWN0IHx8IGlzTWVyZ2VhYmxlT2JqZWN0O1xuXHQvLyBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCBpcyBhZGRlZCB0byBgb3B0aW9uc2Agc28gdGhhdCBjdXN0b20gYXJyYXlNZXJnZSgpXG5cdC8vIGltcGxlbWVudGF0aW9ucyBjYW4gdXNlIGl0LiBUaGUgY2FsbGVyIG1heSBub3QgcmVwbGFjZSBpdC5cblx0b3B0aW9ucy5jbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZCA9IGNsb25lVW5sZXNzT3RoZXJ3aXNlU3BlY2lmaWVkO1xuXG5cdHZhciBzb3VyY2VJc0FycmF5ID0gQXJyYXkuaXNBcnJheShzb3VyY2UpO1xuXHR2YXIgdGFyZ2V0SXNBcnJheSA9IEFycmF5LmlzQXJyYXkodGFyZ2V0KTtcblx0dmFyIHNvdXJjZUFuZFRhcmdldFR5cGVzTWF0Y2ggPSBzb3VyY2VJc0FycmF5ID09PSB0YXJnZXRJc0FycmF5O1xuXG5cdGlmICghc291cmNlQW5kVGFyZ2V0VHlwZXNNYXRjaCkge1xuXHRcdHJldHVybiBjbG9uZVVubGVzc090aGVyd2lzZVNwZWNpZmllZChzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSBpZiAoc291cmNlSXNBcnJheSkge1xuXHRcdHJldHVybiBvcHRpb25zLmFycmF5TWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIG1lcmdlT2JqZWN0KHRhcmdldCwgc291cmNlLCBvcHRpb25zKVxuXHR9XG59XG5cbmRlZXBtZXJnZS5hbGwgPSBmdW5jdGlvbiBkZWVwbWVyZ2VBbGwoYXJyYXksIG9wdGlvbnMpIHtcblx0aWYgKCFBcnJheS5pc0FycmF5KGFycmF5KSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignZmlyc3QgYXJndW1lbnQgc2hvdWxkIGJlIGFuIGFycmF5Jylcblx0fVxuXG5cdHJldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24ocHJldiwgbmV4dCkge1xuXHRcdHJldHVybiBkZWVwbWVyZ2UocHJldiwgbmV4dCwgb3B0aW9ucylcblx0fSwge30pXG59O1xuXG52YXIgZGVlcG1lcmdlXzEgPSBkZWVwbWVyZ2U7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVlcG1lcmdlXzE7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///996\n")
            }
        },
        __webpack_module_cache__ = {};

    function __webpack_require__(Q) {
        var F = __webpack_module_cache__[Q];
        if (void 0 !== F) return F.exports;
        var B = __webpack_module_cache__[Q] = {
            exports: {}
        };
        return __webpack_modules__[Q](B, B.exports, __webpack_require__), B.exports
    }
    __webpack_require__.n = Q => {
        var F = Q && Q.__esModule ? () => Q.default : () => Q;
        return __webpack_require__.d(F, {
            a: F
        }), F
    }, __webpack_require__.d = (Q, F) => {
        for (var B in F) __webpack_require__.o(F, B) && !__webpack_require__.o(Q, B) && Object.defineProperty(Q, B, {
            enumerable: !0,
            get: F[B]
        })
    }, __webpack_require__.o = (Q, F) => Object.prototype.hasOwnProperty.call(Q, F);
    var __webpack_exports__ = __webpack_require__(536)
})();
(function() {
    const siteNavigation = document.getElementById('site-navigation');
    if (!siteNavigation) {
        return;
    }
    const button = siteNavigation.getElementsByTagName('button')[0];
    if ('undefined' === typeof button) {
        return;
    }
    const menu = siteNavigation.getElementsByTagName('ul')[0];
    if ('undefined' === typeof menu) {
        button.style.display = 'none';
        return;
    }
    if (!menu.classList.contains('nav-menu')) {
        menu.classList.add('nav-menu');
    }
    button.addEventListener('click', function() {
        siteNavigation.classList.toggle('toggled');
        if (button.getAttribute('aria-expanded') === 'true') {
            button.setAttribute('aria-expanded', 'false');
        } else {
            button.setAttribute('aria-expanded', 'true');
        }
    });
    document.addEventListener('click', function(event) {
        const isClickInside = siteNavigation.contains(event.target);
        if (!isClickInside) {
            siteNavigation.classList.remove('toggled');
            button.setAttribute('aria-expanded', 'false');
        }
    });
    const links = menu.getElementsByTagName('a');
    const linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
    for (const link of links) {
        link.addEventListener('focus', toggleFocus, true);
        link.addEventListener('blur', toggleFocus, true);
    }
    for (const link of linksWithChildren) {
        link.addEventListener('touchstart', toggleFocus, false);
    }

    function toggleFocus() {
        if (event.type === 'focus' || event.type === 'blur') {
            let self = this;
            while (!self.classList.contains('nav-menu')) {
                if ('li' === self.tagName.toLowerCase()) {
                    self.classList.toggle('focus');
                }
                self = self.parentNode;
            }
        }
        if (event.type === 'touchstart') {
            const menuItem = this.parentNode;
            event.preventDefault();
            for (const link of menuItem.parentNode.children) {
                if (menuItem !== link) {
                    link.classList.remove('focus');
                }
            }
            menuItem.classList.toggle('focus');
        }
    }
}());

function klIdentifyBrowser(klUser) {
    var _learnq = window._learnq || [];
    if (klUser.current_user_email) {
        _learnq.push(["identify", {
            "$email": klUser.current_user_email
        }]);
    } else {
        if (klUser.commenter_email) {
            _learnq.push(["identify", {
                "$email": klUser.commenter_email
            }]);
        }
    }
}
window.addEventListener("load", function() {
    klIdentifyBrowser(klUser);
});
jQuery(document).ready(function($) {
    var SocialProof = function() {
        this.$container = null;
        this.log = function() {
            if (this.config.isDebugEnabled === 'yes') {
                console.log(...arguments);
            }
        }
        this.init = function($el, config) {
            this.config = config;
            this.$container = $el;
            this.log('Plugin init. Wait for initial loading (' + this.config.delayAfterPageLoad + 's)');
            setTimeout((function() {
                this.log('Start initial popup loading.');
                this.processLoading();
            }).bind(this), parseInt(this.config.delayAfterPageLoad) * 1000);
        }
        this.processLoading = function() {
            this.log('Checking requirements...');
            if (!this.isWidgetDisabled() && !this.maximumShowsReached() && !this.isHiddenOnMobile()) {
                this.syncCookie();
                this.loadNotification();
            }
        }
        this.isHiddenOnMobile = function() {
            this.log('Check if hide on mobile & is mobile: ' + (this.config.isHideOnMobile && window.innerWidth <= 720 ? 'Yes' : 'No'));
            return this.config.isHideOnMobile === 'yes' && window.innerWidth <= 720;
        }
        this.maximumShowsReached = function() {
            this.log('Check if maximum popups reached. Maximum: ' + this.config.popupPerSession + '; Seen: ' + this.getSeenPerSessionPopups());
            return this.getSeenPerSessionPopups() >= this.config.popupPerSession;
        }
        this.isWidgetDisabled = function() {
            this.log('Check if widget is disabled:', this.readCookie('social_proof_widget_disabled') === 'yes' ? 'Yes' : 'No');
            return this.readCookie('social_proof_widget_disabled') === 'yes';
        }
        this.disabledWidget = function() {
            this.log('Set widget to disabled.');
            return this.setCookie('social_proof_widget_disabled', 'yes');
        }
        this.enabledWidget = function() {
            return this.setCookie('social_proof_widget_disabled', 'no');
        }
        this.syncCookie = function() {
            this.log('Synchronize user-made events with localstorage.');
            var eventIds = this.readCookie('social_proof_user_made_event_ids');
            this.log('usermade events: ', eventIds);
            if (eventIds) {
                decodeURI(eventIds).split('|').map(function(id) {
                    return parseInt(id);
                }).forEach((function(id) {
                    this.addViewedEventId(id);
                }).bind(this));
            }
            this.eraseCookie('social_proof_user_made_event_ids');
        }
        this.setCookie = function(name, value, days = null) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/";
        }
        this.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        }
        this.eraseCookie = function(name) {
            document.cookie = name + '=; Max-Age=0'
        }
        this.getSeenPerSessionPopups = function() {
            var count = Math.max(0, parseInt(this.readCookie('social_proof_seen_per_session_popups_count')));
            if (isNaN(count) || count === undefined) {
                count = 0;
            }
            return count;
        }
        this.setSeenPerSessionPopups = function(count) {
            this.log('Set seen popups per session count: ' + count);
            this.setCookie('social_proof_seen_per_session_popups_count', count);
        }
        this.incrementSeenPerSessionPopups = function() {
            this.setSeenPerSessionPopups(this.getSeenPerSessionPopups() + 1);
        }
        this.getViewedEvents = function() {
            return JSON.parse(localStorage.getItem('social_proof_viewed_events'));
        }
        this.addViewedEventId = function(id) {
            this.log('Set event id as viewed: ' + id);
            var viewedEvents = this.getViewedEvents();
            viewedEvents = Array.isArray(viewedEvents) ? viewedEvents : [];
            if (!viewedEvents.includes(id)) {
                viewedEvents.unshift(id);
            }
            viewedEvents = viewedEvents.map(function(item) {
                return parseInt(item);
            });
            viewedEvents = viewedEvents.slice(0, 100);
            localStorage.setItem('social_proof_viewed_events', JSON.stringify(viewedEvents));
        }
        this.loadNotification = function() {
            this.log('Start an ajax request.');
            this.log('AJAX Params:', {
                nonce: this.config.getNewNotificationNonce,
                viewed_events: this.getViewedEvents(),
            });
            $.post(document.location.origin + document.location.pathname + '?wc-ajax=' + this.config.getNewNotificationEndpoint, {
                nonce: this.config.getNewNotificationNonce,
                viewed_events: this.getViewedEvents(),
            }, (function(response) {
                this.log('Response: ', response);
                if (response.success) {
                    var notification = new SocialProofNotification(response.notificationHTML, this);
                    this.pushNotification(notification);
                    this.addViewedEventId(response.eventId);
                } else {}
            }).bind(this));
        }
        this.pushNotification = function(notification) {
            this.log('Adding the notification to DOM.');
            this.$container.html(notification.contentHTML);
            notification.bindEvents();
        }
    }
    var SocialProofNotification = function(contentHTML, handler) {
        this.id = null;
        this.contentHTML = contentHTML;
        this.handler = handler;
        this.closeTimeout = null;
        this.bindEvents = function() {
            this.handler.log('Bind notification events');
            this.handler.$container.find('.social-proof-popup-content').click(this.handleRedirect.bind(this));
            this.handler.$container.find('.social-proof-popup-image').click(this.handleRedirect.bind(this));
            this.handler.$container.find('.social-proof-popup__close').click(this.close.bind(this));
            this.handler.log('Set timeout to hide the popup (' + parseInt(this.handler.config.popupDisplayTime) + ' seconds)');
            this.closeTimeout = setTimeout(this.close.bind(this), parseInt(this.handler.config.popupDisplayTime) * 1000);
        }
        this.handleRedirect = function(e) {
            var popup = this.handler.$container.find('.social-proof-popup');
            if (popup.length) {
                var productURL = popup.data('product-permalink');
                if (productURL) {
                    try {
                        window.location.href = new URL(productURL);
                    } catch (__) {
                        return false;
                    }
                }
            }
        }
        this.close = function(e) {
            this.handler.log('Popup closing...');
            clearTimeout(this.closeTimeout);
            this.removeAnimationClasses();
            if (this.handler.config.animationsEnabled === 'yes') {
                this.handler.log('Animation was enabled - show hide animation.');
                this.getPopupSelector().addClass('animate__animated');
                this.getPopupSelector().addClass('animate__' + this.handler.config.popupCloseAnimation);
                setTimeout((function() {
                    this.getPopupSelector().hide();
                }).bind(this), 1000);
            } else {
                this.handler.log('Animation was not enabled - hide instantly.');
                this.getPopupSelector().hide();
            }
            this.handler.incrementSeenPerSessionPopups();
            if (e !== undefined && e.type === 'click' && this.handler.config.closeWidgetEnabled === 'yes') {
                this.handler.disabledWidget();
            } else {
                this.handler.log('Set timer to proceed with the next notification.');
                setTimeout((function() {
                    this.handler.processLoading();
                }).bind(this), parseInt(this.handler.config.delayBetweenPopups) * 1000);
            }
        }
        this.removeAnimationClasses = function() {
            this.getPopupSelector().removeClass(function(index, css) {
                return (css.match(/(^|\s)animate__\S+/g) || []).join(' ');
            });
        }
        this.getPopupSelector = function() {
            return this.handler.$container.find('.social-proof-popup');
        }
    }
    if (window.socialProofConfig !== undefined) {
        window.socialProof = new SocialProof();
        window.socialProof.init($('#social-proof-popups-container'), window.socialProofConfig);
    }
});