# 📦 Pre-Publish Checklist

## ✅ Files Ready for Publishing

### Included Files (via package.json "files" field):
- ✅ `dist/` - Compiled JavaScript and TypeScript definitions
- ✅ `php/` - PHP helper class
- ✅ `angular/` - Angular service
- ✅ `README.md` - Main documentation
- ✅ `LICENSE` - MIT License

### Excluded Files (via .npmignore):
- ❌ `src/` - Source TypeScript files (not needed, dist has compiled code)
- ❌ `test/` - Test files
- ❌ `examples/` - Example files
- ❌ `context/` - Context/old files
- ❌ Development config files (tsconfig.json, vite.config.ts, etc.)
- ❌ Test markdown files

## 📋 Pre-Publish Steps

### 1. Update package.json
- [x] Version number (currently 0.1.0)
- [x] Description
- [x] Keywords
- [ ] Repository URL (update with your GitHub URL)
- [ ] Author name/email
- [ ] Homepage URL (update with your GitHub URL)

### 2. Verify Build
```bash
npm run build
```
- [x] Build completes without errors
- [x] dist/ folder has all necessary files

### 3. Run Tests
```bash
npm run test:core
npm run test:simple
```
- [x] All tests pass

### 4. Check Files to Publish
```bash
npm pack --dry-run
```
- [x] Verify only necessary files are included

### 5. Update Documentation
- [x] README.md is comprehensive
- [x] angular/README.md is complete
- [x] php/README.md is complete
- [ ] Update repository URLs in package.json

### 6. Version Number
Before publishing:
- Update version in package.json
- Follow semantic versioning:
  - `0.1.0` - Initial release
  - `0.1.1` - Patch (bug fixes)
  - `0.2.0` - Minor (new features)
  - `1.0.0` - Major (breaking changes)

## 🚀 Publishing Steps

### First Time Publishing

1. **Login to npm:**
```bash
npm login
```

2. **Verify you're logged in:**
```bash
npm whoami
```

3. **Publish:**
```bash
npm publish
```

For scoped packages or public access:
```bash
npm publish --access public
```

### Updating Repository URLs

Before publishing, update these in `package.json`:
```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/nepali-date-picker-converter.git"
  },
  "bugs": {
    "url": "https://github.com/YOUR_USERNAME/nepali-date-picker-converter/issues"
  },
  "homepage": "https://github.com/YOUR_USERNAME/nepali-date-picker-converter#readme"
}
```

### After Publishing

1. Verify on npm:
   - Visit: https://www.npmjs.com/package/nepali-date-picker-converter
   - Check that all files are included
   - Test installation: `npm install nepali-date-picker-converter`

2. Create GitHub Release (if using GitHub):
   - Tag the release
   - Add release notes

## 📝 Post-Publish

- [ ] Test installation in a new project
- [ ] Update any example repositories
- [ ] Announce on social media/communities
- [ ] Monitor for issues/bugs

## ⚠️ Important Notes

- Once published, you cannot unpublish after 72 hours (npm policy)
- Version numbers cannot be reused once published
- Make sure all sensitive data is removed
- Test thoroughly before publishing

---

**Ready to publish!** 🎉
