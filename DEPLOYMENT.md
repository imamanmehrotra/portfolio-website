# 🚀 Portfolio Website Deployment Guide

## Overview
This guide covers deploying your portfolio website to various platforms. The website is built with Next.js 15 and is optimized for production deployment.

## ✅ Pre-Deployment Checklist

- [x] All ESLint errors resolved
- [x] Production build successful (`npm run build`)
- [x] All components working correctly
- [x] TypeScript compilation successful
- [x] Portfolio data properly structured

## 🎯 Deployment Options

### Option 1: Vercel (Recommended for Next.js)

Vercel is the platform created by the Next.js team and provides the best integration.

#### Steps:
1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to existing project or create new
   - Set project name (e.g., "aman-portfolio")
   - Confirm deployment settings

5. **Custom Domain (Optional):**
   - Go to Vercel dashboard
   - Navigate to your project
   - Go to Settings → Domains
   - Add your custom domain

#### Benefits:
- ✅ Zero-config Next.js deployment
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Automatic deployments on git push
- ✅ Preview deployments for PRs

### Option 2: Netlify

#### Steps:
1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `.next`

3. **Deploy:**
   - Netlify will automatically build and deploy
   - Your site will be available at a random URL

4. **Custom Domain:**
   - Go to Site settings → Domain management
   - Add your custom domain

### Option 3: AWS Amplify

#### Steps:
1. **Install AWS CLI and configure:**
   ```bash
   aws configure
   ```

2. **Install Amplify CLI:**
   ```bash
   npm install -g @aws-amplify/cli
   amplify configure
   ```

3. **Initialize Amplify:**
   ```bash
   amplify init
   ```

4. **Add hosting:**
   ```bash
   amplify add hosting
   amplify publish
   ```

## 🔧 Environment Variables

If you need to add environment variables later:

### Vercel:
```bash
vercel env add NEXT_PUBLIC_API_URL
```

### Netlify:
- Go to Site settings → Environment variables
- Add key-value pairs

### AWS Amplify:
```bash
amplify env add
```

## 📱 Post-Deployment

### 1. Test Your Site
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Chatbot functions properly
- [ ] Responsive design on mobile
- [ ] All portfolio sections display correctly

### 2. Performance Optimization
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Optimize images if needed
- [ ] Monitor loading times

### 3. SEO Setup
- [ ] Verify meta tags are working
- [ ] Test Open Graph tags
- [ ] Submit sitemap to search engines
- [ ] Set up Google Analytics (optional)

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails:**
   ```bash
   npm run build
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

2. **Deployment Fails:**
   - Check build logs
   - Verify Node.js version compatibility
   - Ensure all dependencies are in package.json

3. **Site Not Loading:**
   - Check deployment status
   - Verify custom domain DNS settings
   - Check for build errors

## 📊 Monitoring

### Vercel Analytics:
- Built-in performance monitoring
- Real user metrics
- Error tracking

### Netlify Analytics:
- Page view tracking
- Performance insights
- Form submissions

## 🔄 Continuous Deployment

### GitHub Actions (Optional):
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎉 Success!

Once deployed, your portfolio will be accessible at:
- **Vercel**: `https://your-project.vercel.app`
- **Netlify**: `https://your-site.netlify.app`
- **Custom Domain**: `https://yourdomain.com`

## 📞 Support

If you encounter issues:
1. Check the platform's documentation
2. Review build logs
3. Verify all configuration files
4. Ensure code builds locally first

---

**Happy Deploying! 🚀** 