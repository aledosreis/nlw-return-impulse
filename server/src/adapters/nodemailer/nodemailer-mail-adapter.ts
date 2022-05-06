import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "327ad4af6e0252",
    pass: "614c6f9037273b"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Feedget Team <help@feedget.com>',
      to: 'Alessandro <a@b.com>',
      subject,
      html: body
    })
  }
}