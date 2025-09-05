import { connect } from "@/dbConfig/dbConfig";
import nodemailer from "nodemailer";
import { User } from "@/models/usermodel";
import bcrypt from "bcryptjs";

connect();
// Looking to send emails in production? Check out our Email API/SMTP product!
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "01bb0d2fc403ab",
    pass: "e01598d82e35cf",
  },
});
export const sendMail = async ({ email, userId, emailType }: any) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashToken = await bcrypt.hash(userId.toString(), salt);
    if (emailType === "VERIFY") {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            verifyToken: hashToken,
            verifyTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    } else if (emailType === "RESET") {
      await User.updateOne(
        { _id: userId },
        {
          $set: {
            forgotPasswordToken: hashToken,
            forgotPasswordTokenExpiry: Date.now() + 3600000,
          },
        }
      );
    }
    let verifyEmailUrl = `${process.env.DOMAIN}verifyEmail?token=${hashToken}`;
    let resetUrl = `${process.env.DOMAIN}resetUrl?token=${hashToken}`;
    let htmlContent =
      emailType === "VERIFY"
        ? `<p>Click <a href="${verifyEmailUrl}">here</a> or Copy and Paste link ${verifyEmailUrl} </p>`
        : `<p> Click <a href="${resetUrl}">Here</a> or copy and paste url ${resetUrl} </p>`;

    const info = await transporter.sendMail({
      from: "truimphthilak@gmail.com", // sender address
      to: email, // list of receivers
      subject: `${emailType === "VERIFY" ? "Verify User" : "Reset Password"}`, // Subject line
      html: htmlContent,
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};
