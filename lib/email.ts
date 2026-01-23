import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'hello@deelstudio.com';

// --- Types ---
type EmailTemplate =
    | { type: 'welcome'; name: string }
    | { type: 'purchase-success'; name: string; credits: number; amount: string; reference: string }
    | { type: 'low-credits'; name: string; credits: number }
    | { type: 'new-login'; name: string; device: string; time: string }
    | { type: 'otp'; otp: string };

// --- Styling Constants ---
const styles = {
    container: 'font-family: "DM Sans", sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;',
    header: 'background-color: #1E2A5E; padding: 24px; text-align: center;',
    logo: 'color: #ffffff; font-size: 24px; font-weight: bold; text-decoration: none;',
    content: 'padding: 32px 24px; color: #1F2937;',
    h1: 'font-size: 24px; font-weight: bold; color: #1E2A5E; margin-bottom: 16px;',
    p: 'font-size: 16px; line-height: 1.6; margin-bottom: 24px; color: #4B5563;',
    button: 'display: inline-block; background-color: #1E2A5E; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;',
    footer: 'padding: 24px; text-align: center; font-size: 14px; color: #9CA3AF; border-top: 1px solid #E5E7EB;',
    highlight: 'color: #1E2A5E; font-weight: 600;',
};

// --- Template Generators ---
function generateHtml(template: EmailTemplate): string {
    const header = `
        <div style="${styles.header}">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="${styles.logo}">ReedAI</a>
        </div>
    `;

    const footer = `
        <div style="${styles.footer}">
            <p>&copy; ${new Date().getFullYear()} ReedAI. All rights reserved.</p>
            <p>123 Academic Avenue, Knowledge City</p>
        </div>
    `;

    let content = '';

    switch (template.type) {
        case 'otp':
            content = `
                <h1 style="${styles.h1}">Verify Your Email ✉️</h1>
                <p style="${styles.p}">
                    Use the following verification code to complete your signup. 
                    This code will expire in 15 minutes.
                </p>
                <div style="background-color: #F3F4F6; padding: 24px; border-radius: 12px; text-align: center; margin: 32px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1E2A5E; font-family: monospace;">
                        ${template.otp}
                    </span>
                </div>
                <p style="${styles.p}">
                    If you didn't request this, you can safely ignore this email.
                </p>
            `;
            break;

        case 'welcome':
            content = `
                <h1 style="${styles.h1}">Welcome to ReedAI, ${template.name}! 👋</h1>
                <p style="${styles.p}">
                    We're thrilled to have you on board. ReedAI is your personal AI tutor aimed at making learning faster, easier, and more interactive.
                </p>
                <p style="${styles.p}">
                    You've started with <strong>100 free credits</strong>. Jump into a voice session or start a chat to see what ReedAI can do.
                </p>
                <div style="text-align: center; margin-top: 32px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="${styles.button}">Start Learning</a>
                </div>
            `;
            break;

        case 'purchase-success':
            content = `
                <h1 style="${styles.h1}">Payment Successful! 🎉</h1>
                <p style="${styles.p}">
                    Hi ${template.name}, confirm receipt of your payment.
                </p>
                <div style="background-color: #F8F9FB; padding: 16px; border-radius: 12px; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #6B7280;">Amount Paid</p>
                    <p style="margin: 0; font-size: 20px; font-weight: bold; color: #1E2A5E;">${template.amount}</p>
                    <hr style="border: 0; border-top: 1px solid #E5E7EB; margin: 16px 0;" />
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #6B7280;">Credits Added</p>
                    <p style="margin: 0; font-size: 20px; font-weight: bold; color: #1E2A5E;">+${template.credits}</p>
                </div>
                <p style="${styles.p}">
                    Reference: <span style="font-family: monospace; background: #eee; padding: 2px 4px; rounded: 4px;">${template.reference}</span>
                </p>
                <div style="text-align: center; margin-top: 32px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits" style="${styles.button}">View Balance</a>
                </div>
            `;
            break;

        case 'low-credits':
            content = `
                <h1 style="${styles.h1}">Running low on credits ⚡</h1>
                <p style="${styles.p}">
                    Hi ${template.name}, we noticed your balance is getting low. You have <strong>${template.credits} credits</strong> remaining.
                </p>
                <p style="${styles.p}">
                    To ensure uninterrupted learning sessions, you might want to top up soon.
                </p>
                <div style="text-align: center; margin-top: 32px;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/credits" style="${styles.button}">Top Up Credits</a>
                </div>
            `;
            break;

        case 'new-login':
            content = `
                <h1 style="${styles.h1}">New Login Detected 🛡️</h1>
                <p style="${styles.p}">
                    Hi ${template.name}, we detected a new login to your ReedAI account.
                </p>
                <ul style="${styles.p}; list-style: none; padding: 0;">
                    <li><strong>Device:</strong> ${template.device}</li>
                    <li><strong>Time:</strong> ${template.time}</li>
                </ul>
                <p style="${styles.p}">
                    If this was you, you can safely ignore this email. If not, please secure your account immediately.
                </p>
            `;
            break;
    }

    return `
        <!DOCTYPE html>
        <html>
        <body style="margin: 0; padding: 0; background-color: #F3F4F6;">
            <div style="${styles.container}">
                ${header}
                <div style="${styles.content}">
                    ${content}
                </div>
                ${footer}
            </div>
        </body>
        </html>
    `;
}

// --- Main Send Function ---
export async function sendEmail({ to, subject, template }: { to: string; subject: string; template: EmailTemplate }) {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not defined. Skipping email send.');
        return { success: false, error: 'Missing API Key' };
    }

    try {
        const html = generateHtml(template);

        const data = await resend.emails.send({
            from: FROM_EMAIL,
            to,
            subject,
            html,
        });

        console.log(`Email sent to ${to}:`, data);
        return { success: true, data };
    } catch (error) {
        console.error('Email Send Error:', error);
        return { success: false, error };
    }
}
