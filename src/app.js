// -- LIBRERÍAS

// -- Dependencias
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import cookieParser from "cookie-parser";

// -- Locales
import authRoutes from "./routes/auth.routes.js";
import indexRoutes from "./routes/index.routes.js";
import postRoutes from "./routes/posts.routes.js";

// -- VARIABLES GLOBALES
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// -- crear renderizador
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// -- Cors credentials
app.use(
  cors({
    credentials: true,
  })
);

// -- Rutas estáticas
app.use("/public", express.static(path.join(__dirname, "/views/public/")));

// -- Middlewares
app.use("/api", authRoutes);
app.use("/api", postRoutes);
app.use(indexRoutes);

// -- EXPORTAR
export default app;
