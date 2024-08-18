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

    async getOne(req, res) {
        try {
            const { id } = req.params;
            const [result] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (result.length === 0) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            res.json(result[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async add(req, res) {
        try {
            const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;
            if (!id || !nombre || !autor || !categoria || !año_publicacion || !ISBN) {
                return res.status(400).json({ error: 'Datos incompletos' });
            }
            const [result] = await pool.query(
                'INSERT INTO libros (id, nombre, autor, categoria, año_publicacion, ISBN) VALUES (?, ?, ?, ?, ?, ?)', 
                [id, nombre, autor, categoria, año_publicacion, ISBN]
            );
            res.status(201).json({ "Id insertado": result.insertId });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id, nombre, autor, categoria, año_publicacion, ISBN } = req.body;
            if (!id || !nombre || !autor || !categoria || !año_publicacion || !ISBN) {
                return res.status(400).json({ error: 'Datos incompletos' });
            }
            const [result] = await pool.query(
                'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, año_publicacion = ?, ISBN = ? WHERE id = ?',
                [nombre, autor, categoria, año_publicacion, ISBN, id]
            );
            if (result.changedRows === 0) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            res.json({ "Registros actualizados": result.changedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'ID no proporcionado' });
            }
            const [result] = await pool.query('DELETE FROM libros WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteByISBN(req, res) {
        try {
            const { isbn } = req.body;
            if (!isbn) {
                return res.status(400).json({ error: 'ISBN no proporcionado' });
            }
            const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [isbn]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }
            res.json({ "Registros eliminados": result.affectedRows });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export const libros = new LibrosController();
