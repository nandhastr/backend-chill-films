import db from "../config/database.js";

import User from "./userModel.js";
import DaftarSaya from "./daftarSayaModel.js";
import EpisodeMovie from "./episodeMovieModel.js";
import Genre from "./genreModel.js";
import Pembayaran from "./pembayaranModel.js";
import Order from "./orderModel.js";
import Paket from "./paketModel.js";
import Series from "./seriesFilmModel.js";

//    RELASI USER

User.hasMany(DaftarSaya, {
    foreignKey: "user_id",
    as: "listSaya",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Order, {
    foreignKey: "user_id",
    as: "orders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

User.hasMany(Pembayaran, {
    foreignKey: "user_id",
    as: "pembayaranUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//    RELASI EPISODE MOVIE

EpisodeMovie.belongsTo(Genre, {
    foreignKey: "genre_id",
    as: "genre",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//    RELASI DAFTAR SAYA

DaftarSaya.belongsTo(User, {
    foreignKey: "user_id",
    as: "userData",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

DaftarSaya.belongsTo(EpisodeMovie, {
    foreignKey: "movie_id",
    as: "movie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

DaftarSaya.belongsTo(Series, {
    foreignKey: "series_id",
    as: "series",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//    RELASI ORDER

Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "userOrder",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Order.belongsTo(Paket, {
    foreignKey: "paket_id",
    as: "paket",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//    RELASI PEMBAYARAN

Pembayaran.belongsTo(User, {
    foreignKey: "user_id",
    as: "userPembayaran",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Pembayaran.belongsTo(Order, {
    foreignKey: "order_id",
    as: "orderPembayaran",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

//    RELASI PAKET

Paket.hasMany(Order, {
    foreignKey: "paket_id",
    as: "paketOrders",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Sinkronisasi semua model
const syncDatabase = async () => {
    try {
        await db.sync({ alter: false });
        console.log("✅ Semua model berhasil disinkronkan dengan database");
    } catch (error) {
        console.error("❌ Error saat sinkronisasi model:", error);
    }
};

export { User, DaftarSaya, EpisodeMovie, Genre, Pembayaran, Order, Paket, Series, syncDatabase };
