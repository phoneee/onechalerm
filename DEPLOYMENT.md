# Deployment Guide

## 🚀 Live Website

The Onechalerm project is now live at:
**https://phoneee.github.io/onechalerm/**

## 📋 Deployment Details

- **GitHub Repository**: https://github.com/phoneee/onechalerm
- **Hosting**: GitHub Pages
- **Build System**: GitHub Actions
- **Deployment**: Automatic on push to `main` branch

## 🔄 Automatic Deployment

Every push to the `main` branch triggers:
1. GitHub Actions workflow (`.github/workflows/deploy.yml`)
2. Build process with Vite
3. Deployment to GitHub Pages

## 📝 How to Update Content

### 1. Update Timeline Events
Edit `src/data/timeline-data.ts` and push:
```bash
git add src/data/timeline-data.ts
git commit -m "Update timeline events"
git push
```

### 2. Add New Articles
Edit `src/data/articles.ts` and push:
```bash
git add src/data/articles.ts
git commit -m "Add new article: [title]"
git push
```

### 3. Update Images
Edit `src/data/real-images.ts` to add new image metadata.

## 🏗️ Architecture

### Static Site Benefits:
- **No Database**: All data in JSON/TypeScript files
- **Fast Loading**: Pre-built static assets
- **Secure**: No server-side vulnerabilities
- **Free Hosting**: GitHub Pages at no cost
- **Version Control**: All changes tracked in Git

### Data Files:
```
src/data/
├── timeline-data.ts      # Timeline events
├── articles.ts           # Article content
├── cross-references.ts   # Relationships
└── real-images.ts        # Image metadata
```

## 🛠️ Manual Deployment

If needed, you can trigger deployment manually:

1. **Via GitHub Actions**:
   - Go to [Actions tab](https://github.com/phoneee/onechalerm/actions)
   - Click "Deploy to GitHub Pages"
   - Click "Run workflow"

2. **Via Command Line**:
   ```bash
   git commit --allow-empty -m "Trigger deployment"
   git push
   ```

## 📊 Monitoring

- **Build Status**: https://github.com/phoneee/onechalerm/actions
- **Deployment Status**: Check the latest workflow run
- **Live Site**: https://phoneee.github.io/onechalerm/

## 🐛 Troubleshooting

### Build Failures
- Check [GitHub Actions logs](https://github.com/phoneee/onechalerm/actions)
- Common issues:
  - TypeScript errors: Run `npm run typecheck` locally
  - Missing dependencies: Run `npm install`
  - Build errors: Run `npm run build` locally

### Site Not Updating
- Wait 2-5 minutes for deployment
- Clear browser cache (Ctrl+Shift+R)
- Check deployment status in Actions tab

## 🔒 Security

- All images use HTTPS URLs
- No sensitive data in repository
- Real names/locations protected
- Attribution for all media

## 📱 Performance

The site is optimized for:
- Mobile devices (responsive design)
- Slow connections (code splitting)
- SEO (meta tags)
- Social sharing (Open Graph)

---

Last deployment: 2024-01-13
Status: ✅ Live