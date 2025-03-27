import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
dotenv.config();

let mailContent = ``;

const sendEmailController = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: "invalid fields" });
  }

  if (!req.body.name || !req.body.email || !req.body.phone_no)
    return res.status(400).json({ msg: "please enter all fields" });

  mailContent = `name: ${req.body?.name || "unkonwn"}\nemail: ${
    req.body?.email || "no-email"
  }\nphone: ${req.body?.phone_no || "phone-no"}\nmsg: ${
    req.body?.msg || "no-msg"
  }
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EUSER,
      pass: process.env.EPASS,
    },
  });

  const mailOptions = {
    from: process.env.EUSER,
    to: process.env.EUSER,
    subject: "Rohum Client Emails",
    text: mailContent,
  };

  //await sendMail(transporter, mailOptions);
  return res.sendStatus(200);
};

const sendMail = async (transporter, mailOptions) => {
  try {
    console.log("sending mail....");
    await transporter.sendMail(mailOptions);
    // console.log("mail sent successfully:");
    console.log("\x1b[32mMail sent successfully\x1b[0m");
  } catch (err) {
    console.log("FAILED. SOME ERROR OCCURED WHILE SENDING THE EMAIL:\n" + err);
  }
};
export default sendEmailController;
