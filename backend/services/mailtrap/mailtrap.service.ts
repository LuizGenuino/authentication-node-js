// Looking to send emails in production? Check out our Email API/SMTP product!


import { MailtrapClient } from "mailtrap";
import { ENV } from "../../utils/env.ts";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./mailtrap.templates.ts";
import { logger } from "../../utils/logger.ts";


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
        logger.info("Email sent successfully:", response);
    } catch (error) {
        logger.error("Error sending email:", error);
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

export const sendWelcomeEmail = async (email: string, name: string) => {
    const emailContent = replacePlaceholders(WELCOME_EMAIL_TEMPLATE, {
        name: name,
        company: ENV.MAILTRAP_COMPANY_NAME,
    });

    await sendEmail({
        subject: "Welcome to Our Service",
        category: "Welcome Email",
        html: emailContent
    })
}

export const sendResetPasswordEmail = async (email: string, resetToken: string) => {
    const emailContent = replacePlaceholders(PASSWORD_RESET_REQUEST_TEMPLATE, {
        resetURL: `${ENV.CLIENT_URL}/reset-password/${resetToken}`,
        company: ENV.MAILTRAP_COMPANY_NAME,
    });

    await sendEmail({
        subject: "Reset Your Password",
        category: "Password Reset Email",
        html: emailContent
    })
}