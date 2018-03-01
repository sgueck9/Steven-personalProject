create table if not exists orders (
    id serial primary key,
    user_id integer references users(id) 
);