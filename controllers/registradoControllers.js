import Registrado from '../models/Registrado.js'

const agregarRegistrado = async (req, res) => {
	const registrado = new Registrado(req.body)
	registrado.usuario = req.usuario._id
	try {
		const registradoAlmacenado = await registrado.save()
		res.json(registradoAlmacenado)
	} catch (error) {
	console.log(error)
	} 	
}

const obtenerRegistrados = async (req, res) => {
	const registrado = await Registrado.find()
		.where ("usuario")
		.equals(req.usuario)
	res.json(registrado)
}

const obtenerRegistrado = async (req, res) => {
	const { id } = req.params
	const registrado = await Registrado.findById(id)
	
	if (!registrado) {
		return res.status(404).json({ message: "Registrado no encontrado" })
	}

	if (registrado.usuario._id.toString() !== req.usuario._id) {
		return res.json({ message: "No autorizado" })
	}

	res.json(registrado)
} 

const actualizarRegistrado = async (req, res) => {
	
	const { id } = req.params
	const registrado = await Registrado.findById(id)
	
	if (!registrado) {
		return res.status(404).json({ msg: "Registrado no encontrado" })
	}

	if (registrado.usuario._id.toString() 
	!== req.usuario._id.toString()) {
		return res.json({ msg: "Acción no Valida" })
	}
	
	if (registrado) {
		registrado.LUMINOSIDAD = req.body.LUMINOSIDAD || registrado.LUMINOSIDAD
		registrado.TEMPERATURA = req.body.TEMPERATURA || registrado.TEMPERATURA
		registrado.HUMEDAD = req.body.HUMEDAD || registrado.HUMEDAD
		const registradoActualizado = await registrado.save()
		res.json(registradoActualizado)
	} else {
		res.status(404).json({ msg: "Registrado no encontrado" })
	}

}

const eliminarRegistrado = async (req, res) => {
	const { id } = req.params
	
	const registrado = await Registrado.findById(id)
	if (!registrado) {
		return res.status(404).json({ msg: "Registrado no encontrado" })
	}
    
	
	if (registrado.usuario._id.toString()
		!== req.usuario._id.toString()) {
		return res.json({ msg: "No autorizado 00" })
	}

	try {
		await registrado.deleteOne()
		res.json({ msg: "Registrado eliminado" })
	} catch (error) {
		console.error(error);
	}
}

export { 
	agregarRegistrado,
	obtenerRegistrados,
	obtenerRegistrado,
	actualizarRegistrado,
	eliminarRegistrado }