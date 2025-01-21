import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        series_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default daftarSaya;