class MaterialController {
    constructor(pool) {
        this.pool = pool;
    }

    async createMaterial(material) {
        const { name, quantity, unit, price } = material;
        const query = 'INSERT INTO materials (name, quantity, unit, price) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, quantity, unit, price];
        const res = await this.pool.query(query, values);
        return res.rows[0];
    }

    async getAllMaterials() {
        const query = 'SELECT * FROM materials';
        const res = await this.pool.query(query);
        return res.rows;
    }

    async getMaterialById(id) {
        const query = 'SELECT * FROM materials WHERE id = $1';
        const values = [id];
        const res = await this.pool.query(query, values);
        return res.rows[0];
    }

    async updateMaterial(id, material) {
        const { name, quantity, unit, price } = material;
        const query = 'UPDATE materials SET name = $1, quantity = $2, unit = $3, price = $4 WHERE id = $5 RETURNING *';
        const values = [name, quantity, unit, price, id];
        const res = await this.pool.query(query, values);
        return res.rows[0];
    }

    async deleteMaterial(id) {
        const query = 'DELETE FROM materials WHERE id = $1 RETURNING *';
        const values = [id];
        const res = await this.pool.query(query, values);
        return res.rows[0];
    }

    async getLowStockMaterials(threshold) {
        const query = 'SELECT * FROM materials WHERE quantity < $1';
        const values = [threshold];
        const res = await this.pool.query(query, values);
        return res.rows;
    }

    async updateStock(id, quantity) {
        const query = 'UPDATE materials SET quantity = quantity + $1 WHERE id = $2 RETURNING *';
        const values = [quantity, id];
        const res = await this.pool.query(query, values);
        return res.rows[0];
    }
}

module.exports = MaterialController;