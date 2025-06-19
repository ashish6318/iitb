# Deployment Guide

## Quick Deployment Options

### 1. Netlify (Recommended - Free)

#### Option A: Drag & Drop
1. Run `npm run build`
2. Go to [Netlify](https://app.netlify.com/)
3. Drag the `dist` folder to the deploy area
4. Your site is live!

#### Option B: Git Integration
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy automatically on every push

### 2. Vercel (Free)

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Import your project
4. Deploy with default settings

### 3. GitHub Pages (Free)

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "homepage": "https://yourusername.github.io/frontend-battle-website",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### 4. Other Options
- **Firebase Hosting**: `npm run build` → Firebase CLI
- **Surge**: `npm run build` → `surge dist/`
- **Render**: Connect GitHub repo, build with `npm run build`

## Pre-Deployment Checklist

- [ ] All assets are in `public/assets/` folder
- [ ] Update README with your live URL
- [ ] Test responsive design on different devices
- [ ] Verify all videos and images load correctly
- [ ] Check dark/light mode toggle
- [ ] Test all navigation links
- [ ] Verify smooth animations work
- [ ] Check loading screen displays correctly

## Performance Tips

1. **Optimize Videos**: Compress videos to reduce file size
2. **Image Optimization**: Use WebP format for better compression
3. **Lazy Loading**: Already implemented for performance
4. **CDN**: Most hosting providers include CDN automatically

## Domain Configuration

After deployment, you can:
1. Use the provided subdomain (e.g., `your-site.netlify.app`)
2. Configure a custom domain
3. Enable HTTPS (usually automatic)

## Environment Variables

If you need environment variables:
1. Create `.env` file (already in .gitignore)
2. Add variables with `VITE_` prefix
3. Configure in your hosting platform

## Troubleshooting

### Build Fails
- Check all file paths are correct
- Ensure all assets exist in `public/assets/`
- Run `npm run lint` to check for errors

### Videos Not Playing
- Ensure video files are in correct format (MP4)
- Check file paths in components
- Verify hosting platform supports video files

### Slow Loading
- Compress video files
- Optimize images
- Enable gzip compression (usually automatic)

---

**Need Help?** Check the main README.md for detailed instructions or contact support.
