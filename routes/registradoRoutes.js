import express from 'express'
const router = express.Router()
import { 
	agregarRegistrado,
	obtenerRegistrados,
	obtenerRegistrado,
	actualizarRegistrado,
	eliminarRegistrado
} from '../controllers/registradoControllers.js'
import checkAuth from '../middleware/authMiddleware.js'

router
	.route('/')
	.post(checkAuth, agregarRegistrado)
	.get(checkAuth, obtenerRegistrados)

router
	.route('/:id')
	.get(checkAuth, obtenerRegistrado)
	.put(checkAuth, actualizarRegistrado)
	.delete(checkAuth, eliminarRegistrado)

export default router;

