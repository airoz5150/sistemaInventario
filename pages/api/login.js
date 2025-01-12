import axios from 'axios';
import { sign } from 'jsonwebtoken';
const cookie = require("cookie");

export default async function loginHandle(req, res) {
  const { correo, password } = req.body;

  try {
    const apiUrl = `${req.headers.origin}/api/Users`;
    const response = await axios.get(apiUrl);
    const users = response.data;

    // Busca al usuario por correo
    const user = users.data.find(user => user.correo === correo);

    if (user && password === user.password) { // Verifica si el usuario existe y la contraseña es correcta
      
      // Obtiene el rol directamente desde el usuario
      const role = user.role; // El rol se obtiene de la base de datos
      const _id = user._id;
      const name = user.nombreCompleto

      // Genera el token JWT
      const token = sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 días de expiración
          correo: user.correo,
          username: user.username,
          role: role, 
          id: _id,// Agregar el rol aquí
          userName:name
        },
        'secret'
      );

      // Establecer la cookie
      res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 12 * 60 * 60,
        path: '/',
        sameSite: 'strict',
      }));

      return res.status(200).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
}
