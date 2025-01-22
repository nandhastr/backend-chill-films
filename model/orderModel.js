import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

 const Order = sequelize.define(
    "order",
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
                model: "user",
                key: "id",
            }
        },
        paket_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "paket",
                key: "id",
            }
        },
        tgl_order: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        kode_order: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("pending", "complete", "failed", "canceled"),
            allowNull: false,
        },
    },
    {
       freezeTableName: true,
        timestamps: true,
    }
);

export default Order;