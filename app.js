import db from "./config/database.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { syncDatabase } from "./model/index.js";

import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import daftarSayaRoutes from "./routes/daftarSayaRoutes.js";
import paketRoutes from "./routes/paketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import payRoutes from "./routes/payRoutes.js";
import sendEmailRoutes from "./routes/sendEmailRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// route user
app.use("/", userRoutes);
//route genre
app.use("/", genreRoutes);
// route episode/movie
app.use("/", movieRoutes);
// route series/film
app.use("/", seriesRoutes);
// route daftar saya
app.use("/", daftarSayaRoutes);
// route paket
app.use("/", paketRoutes);
// route paket
app.use("/", orderRoutes);
// route payment
app.use("/", payRoutes);
// route sendMail
app.use("/", sendEmailRoutes);
// route upload
app.use("/", uploadRoutes);

try {
    await db.authenticate();

    console.log("Database connected");

    await syncDatabase();
} catch (error) {
    console.error(error);
}

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Terjadi kesalahan pada server");
});

// Menjalankan server
const port = 8080 || process.env.PORT;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
