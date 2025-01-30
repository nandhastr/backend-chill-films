import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { getFindUser } from "../userController.js";
import sendEmailVerify from "../mail/sendMail.js";
import { create } from "../crudService.js";
import User from "../../model/userModel.js";

const Register = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;
        const verificationToken = uuidv4();

        if (!fullname) {
            return res.status(400).send({ error: "Full Name tidak boleh kosong" });
        }

        if (!email) {
            return res.status(400).send({ error: "Email tidak boleh kosong" });
        } else {
            const existEmail = await getFindUser({ where: { email: email } });
            if (existEmail) {
                return res.status(400).send({ error: "Email sudah terdaftar" });
            }
        }

        if (!password) {
            return res.status(400).send({ error: "Password tidak boleh kosong" });
        }

        if (password.length < 6) {
            return res.status(400).send({ error: "Password minimal 6 karakter!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await create(User, { fullname, username, email, password: hashPassword, token: verificationToken });

        const savedUser = await getFindUser({ where: { email } });

        await sendEmailVerify(email, savedUser.token);

        res.status(200).send({ msg: "Register berhasil, kode verifikasi telah dikirim ke email Anda" });
    } catch (error) {
        console.error("🚨 Registrasi gagal:", error.message);
        res.status(500).send({ error: "Registrasi gagal" });
    }
};

export default Register;
