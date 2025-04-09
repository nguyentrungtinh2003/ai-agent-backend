import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // hoặc 587 nếu bạn muốn dùng TLS
  secure: false, // true cho port 465, false cho 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"K-Filter <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export default sendMail;
