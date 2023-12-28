import mongoose from "mongoose"

const registradosSchema = mongoose.Schema({
		
	    LUMINOSIDAD: {
			type : Number,
			required : true,
		},
		TEMPERATURA: {
			type : Number,
			required : true
		
		},
		HUMEDAD: {
			type : Number,
			required : true,
		},
		usuario: {
			type : mongoose.Schema.Types.ObjectId,
			ref : "Usuario",
		},
	},{
		timestamps : true,
	} 
);

const Registrado = mongoose.model("Registrado", registradosSchema);

export default Registrado;