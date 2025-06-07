# Setting Up Resend for Email Sending

This guide will help you set up Resend to handle email sending for your contact form.

## What is Resend?

Resend is a modern email API for developers. It's designed to be simple to use and provides excellent deliverability.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Verify your email address

### 2. Get Your API Key

1. In your Resend dashboard, go to the API Keys section
2. Create a new API key
3. Copy the API key (you'll need it for your environment variables)

### 3. Set Up Environment Variables

Add the following environment variables to your project:

\`\`\`
RESEND_API_KEY=your_api_key_here
NEXT_PUBLIC_BASE_URL=your_website_url (e.g., https://yourdomain.com)
\`\`\`

### 4. Verify Your Domain (Optional but Recommended)

For better deliverability and to use your own domain in the "from" address:

1. In your Resend dashboard, go to the Domains section
2. Add your domain and follow the verification instructions
3. Once verified, update the "from" address in the API endpoint to use your domain

### 5. Deploy Your Application

Deploy your application with the environment variables set, and your contact form should now send emails through Resend.

## Troubleshooting

- If emails aren't being sent, check your Resend dashboard for any errors
- Ensure your API key is correctly set in your environment variables
- Check the server logs for any error messages

## Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
