import { Router } from 'express';
import { libros } from './controller.js'; 

const router = Router(); 

router.get('/libros', libros.getAll); 
router.get('/libros/:id', libros.getOne); 
router.post('/libros', libros.add); 
router.put('/libros', libros.update);
router.delete('/libros', libros.delete);
router.delete('/libros/isbn', libros.deleteByISBN);

export default router; 
