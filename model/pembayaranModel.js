import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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