import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import env from '../../config/env';

export const sendTestEmail = async (
    email: string,
    subject: string,
    payload: Object,
    template: string
) => {
    try {
        nodemailer.createTestAccount((err, account) => {
            if (err) {
                console.error(
                    'Failed to create a testing account. ' + err.message
                );
                return process.exit(1);
            }

            console.log('Credentials obtained, sending message...');

            // Create a SMTP transporter object
            let transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            // Message object
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

            transporter.sendMail(options(), (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    return process.exit(1);
                }

                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log(
                    'Preview URL: %s',
                    nodemailer.getTestMessageUrl(info)
                );
                return true;
            });
        });
    } catch (error) {
        return error;
    }
};
