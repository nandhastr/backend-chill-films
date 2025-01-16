import { connect } from "../config/database.js";

export async function getAll(tableName) {
    const [rows] = await connect.query(`SELECT * FROM ${tableName}`);
    return rows;
}

export async function getById(tableName, id) {
    const [rows] = await connect.query(`SELECT * FROM ${tableName} WHERE id = ?`, [id]);
    return rows[0];
}

export async function create(tableName, columns, values) {
    const placeholders = columns.map(() => "?").join(", ");
    const query = `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${placeholders})`;
    const [result] = await connect.query(query, values);
    return getById(tableName, result.insertId);
}

export async function update(tableName, id, updates) {
    const columns = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const query = `UPDATE ${tableName} SET ${setClause} WHERE id = ?`;
    await connect.query(query, [...values, id]);
    return getById(tableName, id);
}

export async function remove(tableName, id) {
    const [result] = await connect.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
        throw new Error("Data tidak ditemukan");
    }
    return { message: "Data berhasil dihapus" };
}
