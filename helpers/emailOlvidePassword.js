import nodemailer from 'nodemailer'

const emailOlvideRegistro = async (datos) => {
	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS
		}
	})

	const { email, nombre, token } = datos

	const info = await transport.sendMail({
		from: "Administrador de Registros",
		to: email,
		subject: "Reestablece tu Password",
		text: "Reestablece tu contraseña",
		html: `<h1>Hola ${nombre}, has solicitado reestablecer tu password.</h1>

			<p>Sigue el siguiente enlace para crear tu nuevo password</p>
			<a href="${process.env.FRONTEND_URL}/olvide-password/${token}"> Reestablecer Password</a>
		`,
	})

	console.log("Mensaje enviado: %s", info.messageId)
}

export default emailOlvideRegistro