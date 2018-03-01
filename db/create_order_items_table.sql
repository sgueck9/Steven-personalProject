create table if not exists order_items (
    id serial primary key,
    product_id references products(id),
    order_id references orders(id)
);
