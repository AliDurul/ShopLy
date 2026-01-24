-- Create databases
CREATE DATABASE shoply_auth;
CREATE DATABASE shoply_user;
CREATE DATABASE shoply_catalog;
CREATE DATABASE shoply_inventory;
CREATE DATABASE shoply_order;
CREATE DATABASE shoply_payment;
CREATE DATABASE shoply_shipping;
CREATE DATABASE shoply_review;
CREATE DATABASE shoply_notification;
CREATE DATABASE shoply_search;
CREATE DATABASE shoply_pricing;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE shoply_auth TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_user TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_catalog TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_inventory TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_order TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_payment TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_shipping TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_review TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_notification TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_search TO postgres;
GRANT ALL PRIVILEGES ON DATABASE shoply_pricing TO postgres;