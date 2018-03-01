select count(product_id) from cart
where user_id = $1;