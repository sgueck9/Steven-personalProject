insert into users
(user_name, img, auth_id, nickname)
values
($1, $2, $3, $4)
returning *;