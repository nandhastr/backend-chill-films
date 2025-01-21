import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const Paket = sequelize.define(
    "paket",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        harga: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        benefit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
       
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default Paket;