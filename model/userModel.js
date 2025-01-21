import { DataTypes, Sequelize } from "sequelize";
import db from "../config/database.js"; 

const User = db.define(
    "user",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gambar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default User;