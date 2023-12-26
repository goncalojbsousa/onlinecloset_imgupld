import pool from '../db';

class Cloth {
    static async findById(id){
        const query = 'SELECT * FROM cloths WHERE id = ?';
        const values = [id];
        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results[0]);
                }
            });
        });
    };

    static async createCloth (categoria, cor, tamanho, userId) {
        const query = 'INSERT INTO cloths (categoria, cor, tamanho, userId) VALUES (?, ?, ?, ?)';
        const values = [categoria, cor, tamanho, userId]

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.insertId);
                }
            });
        });
    }

    static async fetchCloths() {
        const query = 'SELECT * FROM cloths';
        return new Promise((resolve, reject) => {
            pool.query(query, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async deleteCloth(clothId) {
        const query = 'DELETE FROM cloths WHERE id = ?';
        const values = [clothId];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }

    static async updateCloth(clothId, clothData) {
        const { categoria, cor, tamanho } = clothData;
        const query = 'UPDATE cloths SET categoria = ?, cor = ?, tamanho = ? WHERE id = ?';
        const values = [categoria, cor, tamanho, clothId];

        return new Promise((resolve, reject) => {
            pool.query(query, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results.affectedRows);
                }
            });
        });
    }
}

export default Cloth;