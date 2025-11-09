# DNS Configuration Guide: GoDaddy + Vercel

This guide will help you connect your GoDaddy domain (broulaye.com) to your Vercel deployment.

## Step 1: Add Domain to Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your **portfolio** project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter your domain: `broulaye.com`
6. Click **Add**
7. Vercel will show you DNS records to configure (you'll need these in Step 2)

## Step 2: Configure DNS in GoDaddy

### Option A: Using Nameservers (Recommended - Easiest)

This method lets Vercel manage all DNS settings:

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Navigate to DNS Management**
   - Go to **My Products** → **Domains**
   - Find `broulaye.com` and click **DNS** (or **Manage DNS**)

3. **Update Nameservers**
   - Scroll down to **Nameservers** section
   - Click **Change** or **Edit**
   - Select **Custom** (instead of "GoDaddy Nameservers")
   - Delete existing nameservers
   - Add Vercel's nameservers (Vercel will provide these in Step 1):
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Click **Save**

4. **Wait for Propagation**
   - DNS changes can take 24-48 hours to propagate
   - Usually works within a few hours

### Option B: Using DNS Records (Advanced)

If you want to keep GoDaddy nameservers, use DNS records:

1. **Log in to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

2. **Navigate to DNS Management**
   - Go to **My Products** → **Domains**
   - Find `broulaye.com` and click **DNS** (or **Manage DNS**)

3. **Add/Update DNS Records**
   
   **For the root domain (broulaye.com):**
   - Find or add an **A Record**:
     - **Type**: A
     - **Name**: @ (or leave blank)
     - **Value**: Use the IP address Vercel provides (usually `76.76.21.21`)
     - **TTL**: 600 (or default)
   
   **For www subdomain (www.broulaye.com):**
   - Find or add a **CNAME Record**:
     - **Type**: CNAME
     - **Name**: www
     - **Value**: `cname.vercel-dns.com.` (note the trailing dot)
     - **TTL**: 600 (or default)

4. **Remove Conflicting Records**
   - Delete any existing A records pointing to other IPs
   - Delete any existing CNAME records for www

5. **Save Changes**
   - Click **Save** after each record

## Step 3: Verify in Vercel

1. Go back to Vercel dashboard
2. Navigate to **Settings** → **Domains**
3. You should see your domain listed
4. Wait for DNS verification (green checkmark)
   - This can take a few minutes to several hours

## Step 4: SSL Certificate (Automatic)

- Vercel automatically provisions SSL certificates via Let's Encrypt
- Once DNS is configured correctly, SSL will be activated automatically
- You'll see "Valid" status in the Domains section

## Troubleshooting

### DNS Not Propagating?

1. **Check DNS Propagation**
   - Use https://dnschecker.org
   - Search for `broulaye.com`
   - Check if nameservers or A records are updated globally

2. **Clear DNS Cache**
   ```bash
   # On Mac/Linux
   sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
   
   # On Windows
   ipconfig /flushdns
   ```

3. **Wait Longer**
   - DNS changes can take up to 48 hours
   - Most changes propagate within 2-4 hours

### Domain Not Connecting?

1. **Verify Records in GoDaddy**
   - Double-check nameservers or DNS records match Vercel's requirements
   - Ensure no typos

2. **Check Vercel Dashboard**
   - Look for error messages in the Domains section
   - Vercel will show specific issues if DNS is misconfigured

3. **Test Connection**
   ```bash
   # Check nameservers
   dig NS broulaye.com
   
   # Check A record
   dig A broulaye.com
   
   # Check CNAME
   dig CNAME www.broulaye.com
   ```

### Common Issues

**Issue**: "Domain not verified" in Vercel
- **Solution**: Wait for DNS propagation (can take up to 48 hours)

**Issue**: SSL certificate not issued
- **Solution**: DNS must be fully propagated first. Wait and check again later.

**Issue**: Site shows GoDaddy parking page
- **Solution**: DNS hasn't propagated yet, or nameservers weren't updated correctly

**Issue**: www subdomain not working
- **Solution**: Ensure CNAME record for `www` is correctly configured

## Quick Reference

### Vercel Nameservers
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

### Vercel DNS Records (if not using nameservers)
- **A Record**: `76.76.21.21` (check Vercel dashboard for current IP)
- **CNAME (www)**: `cname.vercel-dns.com.`

## Additional Resources

- [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains)
- [GoDaddy DNS Help](https://www.godaddy.com/help/manage-dns-records-680)
- [DNS Propagation Checker](https://dnschecker.org)

## Notes

- **Nameserver method is recommended** because Vercel can automatically manage all DNS records
- DNS changes are not instant - be patient
- You can use both methods, but nameservers override DNS records
- Keep your GoDaddy account active to maintain domain ownership

