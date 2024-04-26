// -- Librerías 
import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

// -- creamos la base de datos
export const database = {
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "simple_login",
  port: process.env.DATABASE_PORT || 3306,
};

// -- Clave secreta
export const SECRET = process.env.SECRET || 'some secret key';


// -- conexión a base de datos
export const pool = createPool(database);
console.log("Connected to DB................[OK]")