# Deployment Guide for broulaye.com

This guide provides multiple options to deploy your React portfolio to broulaye.com.

## Prerequisites

1. Make sure your project builds successfully:
   ```bash
   npm run build
   ```

2. Set up your environment variables (create a `.env` file based on `env.example`):
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

## Option 1: Vercel (Recommended)

Vercel is excellent for React applications and offers:
- Automatic deployments from Git
- Global CDN
- Custom domain support
- Free tier available

### Steps:
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts and connect your domain broulaye.com

4. For production deployment:
   ```bash
   vercel --prod
   ```

## Option 2: Netlify

Netlify is another great option with similar features.

### Steps:
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy
   ```

3. For production:
   ```bash
   netlify deploy --prod
   ```

4. Connect your domain in Netlify dashboard

## Option 3: GitHub Pages

Free hosting for static sites.

### Steps:
1. Add homepage to package.json:
   ```json
   {
     "homepage": "https://broulaye.com"
   }
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Option 4: Traditional Hosting (cPanel, etc.)

For more control over your hosting environment.

### Steps:
1. Build your project:
   ```bash
   npm run build
   ```

2. Upload the contents of the `build` folder to your web server's public directory

3. Configure your web server to serve `index.html` for all routes

4. Set up your domain DNS to point to your hosting provider

## Domain Configuration

### DNS Settings
Point your domain broulaye.com to your hosting provider:

- **A Record**: Point to your hosting IP
- **CNAME Record**: Point www.broulaye.com to broulaye.com
- **Nameservers**: Use your hosting provider's nameservers

### SSL Certificate
Most modern hosting providers offer free SSL certificates (Let's Encrypt). Enable HTTPS for security.

## Environment Variables

Make sure to set these in your hosting platform:
- `REACT_APP_PUBLIC_SANITY_PROJECT_ID`
- `REACT_APP_PUBLIC_SANITY_DATASET`
- `REACT_APP_SANITY_TOKEN`
- `REACT_APP_EMAILJS_SERVICE_ID`
- `REACT_APP_EMAILJS_TEMPLATE_ID`
- `REACT_APP_EMAILJS_PUBLIC_KEY`
- `REACT_APP_PUBLIC_BASE_URL`

## Post-Deployment Checklist

- [ ] Test all pages and functionality
- [ ] Verify contact form works
- [ ] Check mobile responsiveness
- [ ] Test loading speed
- [ ] Verify SSL certificate
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Test social media sharing
- [ ] Check SEO meta tags

## Troubleshooting

### Common Issues:
1. **404 errors on refresh**: Ensure proper redirects are configured
2. **Environment variables not working**: Check hosting platform settings
3. **Build failures**: Verify all dependencies are installed
4. **Domain not loading**: Check DNS propagation (can take up to 48 hours)

### Performance Optimization:
- Enable gzip compression
- Set up CDN
- Optimize images
- Minimize bundle size

## Support

For issues specific to your hosting provider, refer to their documentation:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [GitHub Pages Docs](https://pages.github.com/) 