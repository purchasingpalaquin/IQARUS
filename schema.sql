-- Database schema for the IQARUS project

-- Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers table
CREATE TABLE suppliers (
    supplier_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Materials table
CREATE TABLE materials (
    material_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    supplier_id INT,
    price DECIMAL(10, 2),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Purchase Orders table
CREATE TABLE purchase_orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    supplier_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
);

-- Price History table
CREATE TABLE price_history (
    price_history_id INT PRIMARY KEY AUTO_INCREMENT,
    material_id INT,
    price DECIMAL(10, 2),
    effective_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (material_id) REFERENCES materials(material_id)
);

-- Documents table
CREATE TABLE documents (
    document_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    document_type VARCHAR(50),
    document_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES purchase_orders(order_id)
);

-- Risk Alerts table
CREATE TABLE risk_alerts (
    alert_id INT PRIMARY KEY AUTO_INCREMENT,
    material_id INT,
    alert_message VARCHAR(255),
    alert_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (material_id) REFERENCES materials(material_id)
);