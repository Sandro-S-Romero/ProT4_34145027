import { Router } from 'express';
import { libros } from './controller.js'; 

const router = Router(); 

router.get('/libros', libros.getAll); 
router.post('/libros', libros.add); 
router.delete('/libros', libros.delete);
router.put('/libros', libros.update);

export default router; 
