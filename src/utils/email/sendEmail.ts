import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import env from '../../config/env';

export const sendEmail = async (
    email: string,
    subject: string,
    payload: Object,
    template: string
) => {
    try {
        const transporter = nodemailer.createTransport({
            host: env.emailHost,
            port: +env.emailPort,
            auth: {
                user: env.emailUserName,
                pass: env.emailPassword
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

        transporter.sendMail(options(), (error, info) => {
            if (error) {
                return error;
            } else {
                return true;
            }
        });
    } catch (error) {
        return error;
    }
};
