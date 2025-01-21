import { create, getAll, getById, update, remove } from "./crudService.js";
import  User  from "../model/userModel.js"; 
export async function getUsers() {
    return await getAll(User);
}

export async function getUser(id) {
    return getById(User, id);
}

export async function createUser(data) {
    const { fullname, username, email, password, gambar, token } = data;
      return create(User, {
          fullname,
          username,
          email,
          password,
          gambar,
          token,
      });
}


export async function updateUser(id, data) {
    const { fullname, username, email, password, gambar, token } = data;
    return update(User, id, {fullname, username, email, password, gambar, token});
}

export async function deleteUser(id) {
    return remove(User, id);
}
