select cart.id as cart_id, * from cart 
join products on products.id = cart.product_id
where user_id = $1
order by cart_id;