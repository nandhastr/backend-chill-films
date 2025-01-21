import db from "./config/database.js";
import express from "express";

import movieRoutes from "./routes/movieRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import seriesRoutes from "./routes/seriesRoutes.js";
import daftarSayaRoutes from "./routes/daftarSayaRoutes.js";
import paketRoutes from "./routes/paketRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import payRoutes from "./routes/payRoutes.js";

import User from "./model/userModel.js";
import Genre from "./model/genreModel.js";
import Paket from "./model/paketModel.js";
import episodeMovie from "./model/episodeMovieModel.js";
import Series from "./model/seriesFilmModel.js";
import daftarSaya from "./model/daftarSayaModel.js";
import Order from "./model/orderModel.js";
import Pembayaran from "./model/pembayaranModel.js";

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






try {
    await db.authenticate();

    console.log("Database connected");

// sincronisasi tabel model dengan database
    await User.sync({force:false})
    await Genre.sync({force:false})
    await Paket.sync({force:false})
    await episodeMovie.sync({ force: false })
    await Series.sync({ force: false })
    await daftarSaya.sync({ force: false })
    await Order.sync({ force: false })
    await Pembayaran.sync({ force: false })
    
} catch (error) {
    console.error(error);
}

// Middleware untuk menangani error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Terjadi kesalahan pada server");
});

// Menjalankan server
const port =  8080;
app.listen(port, () => {
    console.log("Server is running on port " + port);
});
