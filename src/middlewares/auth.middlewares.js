import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";
import { pool } from "../config.js";

// -- Verifica el Token con la DDBB
const verifyToken = async (req, callback) => {
  // -- Obtiene el token de las Cookies.
  const { token } = req.cookies;

  // -- Si no existe, retorna '
  if (!token) {
    callback(0);
  } else {
    // -- Desencripta el token
    await jwt.verify(token, SECRET, async (error, user) => {
      // -- Si existe algún error, retorna -1
      if (error) {
        callback(-1);
      } else {
        // -- Obtiene el id de la base de datos
        const [tokenUser] = await pool.query(
          "SELECT * FROM users WHERE iduser = ?",
          [user.id]
        );

        // -- Si existe el usuario
        if (tokenUser.length > 0) {
          callback(user.id);
        } else {
          // -- Si el usuario no existe...
          callback(-2);
        }
      }
    });
  }
};

// -- Si el usuario inició sesión
export const ifauth = async (req, res, next) => {
  await verifyToken(req, (id) => {
    if (id > 0) {
      next();
    } else {
      res.redirect("/");
    }
  });
};

// -- Verifica si el usuario NO inició sesión
export const ifnoauth = async (req, res, next) => {
  await verifyToken(req, (id) => {
    if (!id > 0) {
      next();
    } else {
      res.redirect("/profile");
    }
  });
};

// -- Obtener id del token
export const getid = async (req, res, next) => {
  // -- try-catch
  try {
    // -- extrae las cookies
    const { token } = req.cookies;

    // -- Si el token no existe
    if (!token) res.status(400).json({ mesage: "NO_TOKEN" });

    // -- Extrae las cookies
    jwt.verify(token, SECRET, (error, user) => {
      // -- si el token está vencido o es inválido
      if (error) {
        return res.status(401).json({ message: "TOKEN_INVALID" });
      }
      // -- si existe, extrae el id
      req.user = user.id;
      next();
    });

    // -- Obtiene un error
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
