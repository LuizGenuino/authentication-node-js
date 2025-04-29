// Looking to send emails in production? Check out our Email API/SMTP product!


import { MailtrapClient } from "mailtrap";
import { ENV } from "../../utils/env.ts";
import { VERIFICATION_EMAIL_TEMPLATE } from "./mailtrap.templates.ts";


const client = new MailtrapClient({
    token: ENV.MAILTRAP_API_TOKEN,
    testInboxId: 3656356,
    sandbox: true,
});

const sender = {
    email: ENV.MAILTRAP_SENDER_EMAIL,
    name: ENV.MAILTRAP_SENDER_NAME,
};
const recipients = [
    {
        email: "luiz.genuino.dev@gmail.com",
    }
];

const sendEmail = async ({ subject, category, html }: { subject: string, category: string, html: string }) => {
    try {
        const response = await client.send({
            from: sender,
            to: recipients,
            subject,
            category,
            html
        });
        console.log("Email sent successfully:", response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error
    }
}

const replacePlaceholders = (template: string, variables: Record<string, string>) => {
    return Object.keys(variables).reduce((result, key) => {
        return result.replace(new RegExp(`{${key}}`, 'g'), variables[key]);
    }, template);
}

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const emailContent = replacePlaceholders(VERIFICATION_EMAIL_TEMPLATE, {
        verificationCode: verificationToken,
        company: ENV.MAILTRAP_COMPANY_NAME,
    });

    await sendEmail({
        subject: "Verify Your Email",
        category: "verification Email",
        html: emailContent
    })
}