import { transporter } from "../config/nodemailer";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "UpTask <admin@uptask.com>",
      to: user.email,
      subject: "UpTask - Verify your email",
      text: `Click on the link to verify your email:`,
      html: `<p>Hello ${user.name}, you have created a new account at UpTask.
      Eveything is almost ready, you just need to confirm your email</p>
      <p>Visit the next link: </p>
      <a href="">Verify your email</a>
      <p>Enter your code: <b>${user.token}</b></p>
      <p>This token expires in 10 minutes</p>`,
    });
    console.log("Message sent: %s", info.messageId);
  };
}
