import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	})
	const { email, nombre, token } = datos

	//Enviar el email
	const info = await transport.sendMail({
		from: "Subcripción a Administrador de Registros de Gesture Time",
		to: email,
		subject: "Te has subcrito a que te envien correos de Administracion",

		text: "¡Estamos emocionados de compartir contigo todo lo que Gesture Time",
		html: `
			<h1>Hola ${nombre}</h1>
			<p>¡Estamos emocionados de compartir contigo todo lo que Gesture Time tiene para ofrecer! Con nuestra suscripción, no solo obtienes acceso a nuestra innovadora plataforma de seguimiento y análisis de gestos, sino que también te conviertes en parte de una comunidad en crecimiento que valora la comunicación efectiva y la tecnología de vanguardia. </p>
			
			<p>Customer ID: [ID del Cliente]
			Subscription Plan: Monthly Access
			Subscription Period: 1 Month
			
			Charges:
			
			Monthly Subscription Fee: $5.00
			Subtotal: $5.00</p>
			<a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
		`
	})

	console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro