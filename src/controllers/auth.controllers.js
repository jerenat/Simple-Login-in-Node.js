import { pool } from "../config.js";
import { encryptPassword, matchPassword } from "../libs/helpers.js";
import { createAccessToken } from "../libs/jwt.js";

// -- Registro
export const register = async (req, res) => {
  const { email, username, password } = req.body;

  // -- Encriptar contraseña
  const getSaltPassword = await encryptPassword(password);

  // -- insertar en base de datos
  const [insertUser] = await pool.query("INSERT INTO users SET ?", {
    email,
    username,
    password: getSaltPassword,
  });

  // -- En caso de ser insertado correctamente en la DB
  if (insertUser.insertId > 0) {
    res.json({
      message: "OK",
    });
  }
};

// -- Login
export const login = async (req, res) => {
  const { username, password } = req.body;

  const [selectUser] = await pool.query("SELECT * FROM users WHERE ?", {
    username,
  });

  if (selectUser.length > 0) {
    const decryptPassword = await matchPassword(
      password,
      selectUser[0].password
    );

    if (decryptPassword) {
      // -- Crea el token JWT
      const token = await createAccessToken({
        id: selectUser[0].iduser,
        username: selectUser[0].username,
      });

      // -- Crea la cookie "token"
      res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
      });

      // -- reporta mensaje
      res.json({
        message: "OK",
      });
    } else {
      res.status(400).json({ message: "ERR_PASSWORD" });
    }
  } else {
    res.status(400).json({ message: "ERR_USERNAME" });
  }
};

// -- Logout
export const logout = async (req, res) => {
  // -- Elimina el token
  res.cookie("token", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
};