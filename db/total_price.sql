select sum(cart.quantity * products.price) as total_price 
from cart , products
where product_id = products.id and user_id = $1;