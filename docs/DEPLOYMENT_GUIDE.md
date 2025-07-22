# 🚀 DEPLOYMENT GUIDE

## Quick Deploy Checklist

### ✅ **Pre-Deployment**
- [ ] All components tested and working
- [ ] Build process completes without errors
- [ ] Mobile responsiveness verified
- [ ] Dark mode functionality tested
- [ ] All case study interactions working

### ✅ **Build Process**
```bash
# 1. Clean previous build
npm run clean

# 2. Install dependencies (if needed)
npm install

# 3. Create production build
npm run production
```

### ✅ **Deploy Files**
Upload the entire contents of `/dist/` directory to your web server:

```
dist/
├── index.html          # Main HTML file
├── bundle.js           # Compiled JavaScript (minified)
├── styles.css          # Compiled CSS (minified)
├── favicon.ico         # Favicon
├── apple-touch-icon.png # iOS icon
├── site.webmanifest    # Web app manifest
└── favicon-*.png       # Various favicon sizes
```

### ✅ **Server Configuration**
For single-page applications, configure your server to:
- Serve `index.html` for all routes
- Enable HTTPS (recommended)
- Set proper caching headers for static assets

### ✅ **Post-Deployment Testing**
- [ ] Site loads correctly
- [ ] Navigation works smoothly
- [ ] "Hide Details" button functions properly
- [ ] CTA labels visible on case study cards
- [ ] Mobile experience optimized
- [ ] Dark mode toggle works
- [ ] Time-aware content displays correctly

## Server Examples

### **Apache (.htaccess)**
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

### **Nginx**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### **Netlify**
Create `_redirects` file:
```
/* /index.html 200
```

## Performance Tips

- Enable gzip compression
- Set cache headers for static assets
- Use CDN for global distribution
- Monitor Core Web Vitals

---
*Deployment ready - Professional grade build system*