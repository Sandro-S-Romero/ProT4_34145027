import { pool } from './database.js';

class LibrosController {
    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async add(req, res) {
        try {
            const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;
            const [result] = await pool.query(
                'INSERT INTO libros (id, nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?, ?)', 
                [id, nombre, autor, categoria, año_publicacion, ISBN]
            );
            res.status(201).json({ "Id insertado": result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body;
            const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;
            const [result] = await pool.query(
                'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?',
                [nombre, autor, categoria, año_publicacion, ISBN, id]
            );
            res.json({ "Registros actualizados": result.changedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const libros = new LibrosController();
