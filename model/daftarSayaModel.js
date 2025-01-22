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
            references: {
                model: "user",
                key: "id",
            }
        },
        movie_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "episodemovie",
                key: "id",
            }
        },
        series_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "seriesfilm",
                key: "id",
            }
        },
        
    },
    {
        freezeTableName: true,
        timestamps: true,
    }
);

export default daftarSaya;