# Email Setup Instructions

This document provides instructions for setting up the email functionality with SMTP in production.

## SMTP Configuration

1. Uncomment the Nodemailer code in `app/api/send-email/route.ts`
2. Add the following environment variables to your production environment:

\`\`\`
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
NEXT_PUBLIC_BASE_URL=https://your-website.com
\`\`\`

3. Replace the values with your SMTP server details:
   - `EMAIL_HOST`: Your SMTP server hostname (e.g., smtp.gmail.com for Gmail)
   - `EMAIL_PORT`: The port for your SMTP server (typically 587 for TLS or 465 for SSL)
   - `EMAIL_SECURE`: Set to "true" for port 465, "false" for other ports
   - `EMAIL_USER`: Your email address
   - `EMAIL_PASS`: Your email password or app password
   - `NEXT_PUBLIC_BASE_URL`: The URL of your website

## Gmail Configuration

If you're using Gmail:

1. Use smtp.gmail.com as your EMAIL_HOST
2. Use 587 as your EMAIL_PORT
3. Set EMAIL_SECURE to "false"
4. For EMAIL_PASS, you'll need to use an App Password:
   - Go to your Google Account > Security
   - Enable 2-Step Verification if it's not already enabled
   - Go to App passwords
   - Select "Mail" and "Other" (custom name)
   - Enter "Texas Photography Website" as the name
   - Click "Generate"
   - Use the generated 16-character password as your EMAIL_PASS

## Testing

In development and preview environments, emails are logged to the console instead of being sent. This allows you to test the form without sending actual emails.

When you deploy to production and configure the environment variables, the form will send actual emails to raisrujan@gmail.com.
