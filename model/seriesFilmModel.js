import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const Series = sequelize.define(
    "seriesFilm",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        genre_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "genre",
                key: "id",
            }
            
        },
        judul: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        video: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        thn_rilis: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        durasi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        parental_guidance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        casting: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        produser: {
            type: DataTypes.STRING,
            allowNull: true,
        },
       
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default Series;