// Fungsi untuk mendapatkan semua data dari model
export async function getAll(model) {
    try {
        const data = await model.findAll({
            include: [{ all: true }]
        });
        return data;
    } catch (error) {
        console.error("Error fetching data:", error.message);
        throw error;
    }
}


// Fungsi untuk mendapatkan data berdasarkan ID
export async function getById(model, id) {
    const record = await model.findByPk(id);
    if (!record) {
        throw new Error("Data tidak ditemukan");
    }
    return record;
}

// Fungsi untuk membuat data baru
export async function create(model, data) {
    const newRecord = await model.create(data);
    return newRecord;
}

// Fungsi untuk memperbarui data
export async function update(model, id, updates) {
    try {
        const record = await getById(model, id);
        if (!record) {
            throw new Error("data tidak ditemukan");
        }
        await record.update(updates, {validate: false});
        return record;
    } catch (error) {
        console.error("Error saat memperbarui data:", error.message);
        throw error;
    }
}



// Fungsi untuk menghapus data
export async function remove(model, id) {
    const record = await getById(model, id);
    await record.destroy();
    return { message: "Data berhasil dihapus" };
}
