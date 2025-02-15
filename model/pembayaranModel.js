import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";
import Order from "./orderModel.js"

const Pembayaran = sequelize.define(
    "pembayaran",
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
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: "id",
            },
        },
        pay_method: {
            type: DataTypes.ENUM("transer_bank", "e-wallet", "credit_card"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "complete", "failed", "canceled"),
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        tgl_bayar: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        kode_voucher: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);


export default Pembayaran;