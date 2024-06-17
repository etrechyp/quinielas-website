import { query } from "@/utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET;

export default async function LoginHandler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        const { cedula, clave } = body;

        if (!cedula || !clave) {
          return res.status(301).json({ success: false, message: "Insert all data" });
        }

        // Consultar el usuario por cedula en la base de datos
        const sql = `SELECT * FROM usuarios WHERE cedula = '${cedula}'`;
        const users = await query(sql, { type: "SELECT" });

        if (users.length === 0) {
          return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const user = users[0];

        // Comparar la clave proporcionada con la clave almacenada usando bcrypt
        const match = await bcrypt.compare(clave, user.clave);

        if (!match) {
          return res.status(401).json({ success: false, message: "Cedula or password invalid" });
        }

        // Generar el token de acceso JWT
        const access_token = jwt.sign(
          {
            usuario_id: user.usuario_id,
            rol_id: user.rol_id,
            empresa_id: user.empresa_id,
            cedula: user.cedula,
            nombres: user.nombres,
            apellidos: user.apellidos,
          },
          secret,
          { expiresIn: "24h" }
        );

        // Devolver respuesta con éxito y token de acceso
        return res.status(200).json({ success: true, access_token });
      } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ success: false, message: "An error occurred", error });
      }

    default:
      return res.status(503).json({ success: false, message: "Method not allowed" });
  }
}
