import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
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
