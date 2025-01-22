import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const episodeMovie = sequelize.define(
    "episodeMovie",
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
        episode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        durasi: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        age_restriction: {
            type: DataTypes.INTEGER,
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

export default episodeMovie;
