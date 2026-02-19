class UserController {
    constructor(pool) {
        this.pool = pool;
    }

    async createUser(req, res) {
        const { username, password } = req.body;
        const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';

        try {
            const result = await this.pool.query(query, [username, password]);
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    async loginUser(req, res) {
        const { username, password } = req.body;
        const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';

        try {
            const result = await this.pool.query(query, [username, password]);
            if (result.rows.length > 0) {
                // JWT token generation logic here
                res.status(200).json({ token: 'some-jwt-token' });
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    async getAllUsers(req, res) {
        const query = 'SELECT * FROM users';

        try {
            const result = await this.pool.query(query);
            res.status(200).json(result.rows);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching users' });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        const query = 'SELECT * FROM users WHERE id = $1';

        try {
            const result = await this.pool.query(query, [userId]);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const { username, password } = req.body;
        const query = 'UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *';

        try {
            const result = await this.pool.query(query, [username, password, userId]);
            if (result.rows.length > 0) {
                res.status(200).json(result.rows[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error updating user' });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        const query = 'DELETE FROM users WHERE id = $1';

        try {
            const result = await this.pool.query(query, [userId]);
            if (result.rowCount > 0) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Error deleting user' });
        }
    }
}

module.exports = UserController;