import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel";
import daftarSaya from "./daftarSayaModel";
import episodeMovie from "./episodeMovieModel";
import Genre from "./genreModel";
import Pembayaran from "./pembayaranModel";
import Order from "./orderModel";
import Paket from "./paketModel";
import Series from "./seriesFilmModel";

// Relasi User
User.hasMany(daftarSaya, {
    foreignKey: "user_id",
    as: "daftarSaya",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relasi EpisodeMovie
episodeMovie.belongsTo(Genre, {
    foreignKey: "genre_id",
    as: "Genre",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relasi daftarSaya
daftarSaya.belongsTo(User, {
    foreignKey: "user_id",
    as: "User",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

daftarSaya.belongsTo(episodeMovie, {
    foreignKey: "movie_id",
    as: "episodeMovie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

daftarSaya.belongsTo(Series, {
    foreignKey: "series_id",
    as: "seriesFilm",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relasi Order
Order.belongsTo(User, {
    foreignKey: "user_id",
    as: "User",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Order.belongsTo(Paket, {
    foreignKey: "paket_id",
    as: "Paket",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relasi Pembayaran
Pembayaran.belongsTo(User, {
    foreignKey: "user_id",
    as: "User",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

Pembayaran.belongsTo(Order, {
    foreignKey: "order_id",
    as: "Order",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

// Relasi Paket
Paket.hasMany(Order, {
    foreignKey: "paket_id",
    as: "Order",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});

export { User, daftarSaya, episodeMovie, Genre, Pembayaran, Order, Paket, Series };
