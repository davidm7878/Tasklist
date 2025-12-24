DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;

CREATE TABLE users (
    id serial PRIMARY KEY,
    username text NOT NULL,
    password text NOT NULL,
    UNIQUE (username)
);

CREATE TABLE tasks (
    id serial PRIMARY KEY,
    title text NOT NULL,
    done boolean NOT NULL DEFAULT FALSE,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE
);
