update cart 
set quantity = $1
where id = $2
returning user_id;