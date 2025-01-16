import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import daftarSayaRoutes from "./routes/daftarSayaRoutes.js";
import paketRoutes from "./routes/paketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import payRoutes from "./routes/payRoutes.js";

const app = express();
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


// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Terjadi kesalahan pada server");
});

// Menjalankan server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
