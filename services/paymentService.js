import { create, getAll, getById, update, remove } from "./crudService.js";

export async function getPays() {
    return getAll("`pembayaran`");
}

export async function getPay(id) {
    return getById("`pembayaran`", id);
}

export async function createPay(data) {
    const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher   } = data;
    return create("`pembayaran`", ["user_id", "order_id", "amount", "tgl_bayar", "pay_method", "status", "kode_voucher"], [user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher]);
}


export async function updatePay(id, data) {
    const { user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher  } = data;
    return update("`pembayaran`", id, {user_id, order_id, amount, tgl_bayar, pay_method, status, kode_voucher});
}

export async function deletePay(id) {
    return remove("`pembayaran`", id);
}

