import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js"
import episodeMovie from './episodeMovieModel.js';
import Series from './seriesFilmModel.js';

 const daftarSaya = sequelize.define(
     "daftarSaya",
     {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
             autoIncrement: true,
         },
         user_id: {
             type: DataTypes.INTEGER,
             allowNull: false,
             references: {
                 model: User,
                 key: "id",
             },
         },
         movie_id: {
             type: DataTypes.INTEGER,
             allowNull: true,
             references: {
                 model: episodeMovie,
                 key: "id",
             },
         },
         series_id: {
             type: DataTypes.INTEGER,
             allowNull: true,
             references: {
                 model: Series,
                 key: "id",
             },
         },
     },
     {
         freezeTableName: true,
         timestamps: true,
     }
 );

export default daftarSaya;