import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getUsers() {
    return getAll("user");
}

export async function getUser(id) {
    return getById("user", id);
}

export async function createUser(data) {
    const { username, email, password, gambar } = data;
    return create("user", ["username", "email", "password", "gambar"], [username, email, password, gambar]);
}


export async function updateUser(id, data) {
    const { username, email, password, gambar } = data;
    return update("user", id, {username, email, password, gambar});
}

export async function deleteUser(id) {
    return remove("user", id);
}
