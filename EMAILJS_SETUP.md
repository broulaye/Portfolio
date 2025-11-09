# EmailJS Setup Guide

This guide will help you configure EmailJS for the contact form in your portfolio.

## Step 1: Create EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Save your Service ID** (you'll need this)

## Step 3: Create an Email Template

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Use this template structure:

**Template Name:** Contact Form

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello,

You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. **Save your Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find your **Public Key** (also called API Key)
3. **Copy your Public Key**

## Step 5: Configure Environment Variables in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your **portfolio** project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

### For Production:
- **Name:** `REACT_APP_EMAILJS_SERVICE_ID`
- **Value:** Your Service ID from Step 2
- **Environment:** Production

- **Name:** `REACT_APP_EMAILJS_TEMPLATE_ID`
- **Value:** Your Template ID from Step 3
- **Environment:** Production

- **Name:** `REACT_APP_EMAILJS_PUBLIC_KEY`
- **Value:** Your Public Key from Step 4
- **Environment:** Production

### For Preview/Development (optional):
- Add the same variables for **Preview** and **Development** environments if you want to test

5. Click **Save** after adding each variable

## Step 6: Redeploy Your Application

After adding environment variables, you need to redeploy:

1. Go to **Deployments** tab in Vercel
2. Click the **three dots** (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger a new deployment

**Important:** Environment variables are only available after redeployment!

## Step 7: Test the Contact Form

1. Go to your deployed portfolio
2. Navigate to the Contact section
3. Fill out the form and submit
4. Check your email inbox for the message
5. Check the browser console (F12) for any errors

## Troubleshooting

### Form submits but no email received?

1. **Check EmailJS Dashboard:**
   - Go to EmailJS dashboard → **Logs**
   - Check if the email was sent successfully
   - Look for any error messages

2. **Check Email Service:**
   - Make sure your email service is properly connected
   - Verify the service is active in EmailJS dashboard

3. **Check Template Variables:**
   - Ensure template variables match: `{{from_name}}`, `{{from_email}}`, `{{message}}`
   - Template variables are case-sensitive

4. **Check Spam Folder:**
   - Sometimes emails go to spam
   - Check your spam/junk folder

### Error: "Email service is not configured"

- Environment variables are not set in Vercel
- Follow Step 5 to add them
- Make sure to redeploy after adding variables

### Error: "Invalid template ID" or "Invalid service ID"

- Double-check the IDs in Vercel environment variables
- Make sure there are no extra spaces or quotes
- IDs should match exactly what's in EmailJS dashboard

### Error: "Invalid public key"

- Verify your Public Key in EmailJS dashboard
- Make sure it's the Public Key, not the Private Key
- Check for any typos when copying

## Local Development Setup

To test locally, create a `.env` file in the root directory:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

**Important:** Never commit the `.env` file to git! It's already in `.gitignore`.

## EmailJS Free Tier Limits

- 200 emails per month
- For more emails, consider upgrading to a paid plan

## Security Notes

- The Public Key is safe to expose in client-side code
- Never expose your Private Key
- EmailJS handles email sending securely
- Form submissions are sent directly from the browser to EmailJS

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

