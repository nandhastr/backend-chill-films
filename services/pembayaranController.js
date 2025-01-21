import Pembayaran from "../model/pembayaranModel.js";
import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getPays() {
    return getAll(Pembayaran);
}

export async function getPay(id) {
    return getById(Pembayaran, id);
}

export async function createPay(data) {
    const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher   } = data;
    return create(Pembayaran, { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher });
}


export async function updatePay(id, data) {
    const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher  } = data;
    return update(Pembayaran, id, {user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher});
}

export async function deletePay(id) {
    return remove(Pembayaran, id);
}

