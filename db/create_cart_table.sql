create table if not exists cart (
    id serial primary key,
    product_id  integer references  products(id),
    user_id  integer references users(id),
    quantity integer default 1,
    unique (user_id, product_id));
