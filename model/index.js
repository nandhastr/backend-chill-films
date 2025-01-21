import User from "./userModel";
import daftarSaya from "./daftarSayaModel";
import episodeMovie from "./episodeMovieModel";
import Genre from "./genreModel";
import Pembayaran from "./pembayaranModel";
import Order from "./orderModel";
import Paket from "./paketModel";
import Series from "./seriesFilmModel";

User.hasMany(daftarSaya, { foreignKey: "user_id", as: "daftar_saya" });
User.hasMany(Order, { foreignKey: "user_id", as: "order" });
User.hasMany(Pembayaran, { foreignKey: "user_id", as: "pembayaran" });

daftarSaya.belongsTo(User, { foreignKey: "user_id", as: "user" });
daftarSaya.belongsTo(episodeMovie, { foreignKey: "movie_id", as: "episode_movie" });
daftarSaya.belongsTo(Series, { foreignKey: "series_id", as: "series" });

episodeMovie.belongsTo(Genre, { foreignKey: "genre_id", as: "genre" });
episodeMovie.belongsTo(Series, { foreignKey: "series_id", as: "series" });

Genre.hasMany(episodeMovie, { foreignKey: "genre_id", as: "episode_movies" });
Genre.hasMany(Series, { foreignKey: "genre_id", as: "series" });

Pembayaran.belongsTo(Order, { foreignKey: "order_id", as: "order" });
Pembayaran.belongsTo(User, { foreignKey: "user_id", as: "user" });

Order.belongsTo(User, { foreignKey: "user_id", as: "user" });
Order.belongsTo(Paket, { foreignKey: "paket_id", as: "paket" });

Paket.hasMany(Order, { foreignKey: "paket_id", as: "order" });

Series.belongsTo(Genre, { foreignKey: "genre_id", as: "genre" });
Series.hasMany(episodeMovie, { foreignKey: "series_id", as: "episode_movies" });


export { User, daftarSaya, episodeMovie, Genre, Pembayaran, Order, Paket, Series };
