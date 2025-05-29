CREATE TABLE user (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    identity_card VARCHAR(9) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role_id INT NOT NULL REFERENCES role(role_id),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    address VARCHAR(100),
    phone VARCHAR(15)
);