import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const sendEmailVerify = async (email, token) => {
    const transporter = createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.PASS_EMAIL,
        },
    });

    const VerifyTokenUrl = `http://localhost:8080/verifikasi-email?token=${token}`;
    const mailOptions = {
        from: "noreply",
        to: email,
        subject: "Verifikasi Email",
        html: `
            <html>
            <head><title>Verifikasi Email</title></head>
            <body>
                <p>Terima kasih telah mendaftar! Klik tombol di bawah ini untuk memverifikasi email Anda:</p>
                <a href="${VerifyTokenUrl}" style="padding: 10px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Verifikasi Email</a>
                <p>Terima kasih!</p>
            </body>
            </html>`,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log("✅ Email berhasil dikirim:", info.response);
    } catch (error) {
        console.error("🚨 Gagal mengirim email:", error.message);
    }
};

export default sendEmailVerify;
