const { Pool } = require('pg');

// PostgreSQL client configuration
const pool = new Pool({
    user: 'your_username', // replace with your database username
    host: 'localhost', // replace with your database host
    database: 'your_database', // replace with your database name
    password: 'your_password', // replace with your database password
    port: 5432, // replace with your database port
});

// Function to get a client from the pool
const getClient = async () => {
    const client = await pool.connect();
    return client;
};

// Export the pool and getClient function
module.exports = { pool, getClient };