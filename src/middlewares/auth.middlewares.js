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
