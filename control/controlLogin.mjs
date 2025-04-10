import User from '../models/User.mjs';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const welcome = (req, res) => {
  res.sendFile(path.join(__dirname, '../view/login.html'));
};


export const loginUser = async (req, res) => {
  const { usuario, contraseña } = req.body;
   

  try {
    const user = await User.findOne({ usuario, contraseña });

    if (!user) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    if ( user === null ) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: `¡Bienvenido ${user.nombre}! Tu rol es: ${user.rol}`,
      nombre: user.nombre,
      usuario: user.usuario,
      rol: user.rol
    });

  } catch (error) {
    //console.error('Error en login:', error.message); //error de consola
    res.status(500).json({ mensaje: 'Error del servidor', error: error.message }); 
  }
};

