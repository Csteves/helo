SELECT *
FROM helo_users as u
INNER JOIN helo_posts AS p ON u.id = p.author_id;