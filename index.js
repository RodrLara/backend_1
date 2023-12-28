import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import registradoRoutes from "./routes/registradoRoutes.js"

const app = express()
app.use(express.json())

dotenv.config()

connectDB()

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}

app.use(cors(corsOptions))

app.use("/api/usuarios", usuarioRoutes)
app.use("/api/registrados", registradoRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})



  




