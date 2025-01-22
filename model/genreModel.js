import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const Genre = sequelize.define(
    "genre",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama_genre: {
            type: DataTypes.ENUM("Action", "Adventure", "Comedy", "Drama", "Horror", "Science Fiction", "Fantasy", "Romance", "Thriller", "Mystery", "Animation", "Documentary", "Biography", "Crime", "Family", "War", "Sport", "Musical", "Western"),
            allowNull: false,
        },
      
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default Genre;