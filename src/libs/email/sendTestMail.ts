import { readFileSync } from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import { resolve } from 'path';
import env from '../../config/env';

export const sendTestEmail = async (
    email: string,
    subject: string,
    payload: { name: string; link: string },
    template: string
): Promise<string | false> => {
    try {
        const account = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });

        const templatePath = resolve(__dirname, template);
        const source = readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(source);
        const options = () => {
            return {
                from: env.fromEmail,
                to: email,
                subject: subject,
                html: compiledTemplate(payload)
            };
        };

        const info = await transporter.sendMail(options());
        const link = nodemailer.getTestMessageUrl(info);
        return link;
    } catch (error) {
        return error;
    }
};
