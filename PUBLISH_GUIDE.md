# 📦 How to Publish to npm

## Step-by-Step Publishing Guide

### Step 1: Check npm Account

First, make sure you're logged into npm:

```bash
npm whoami
```

If you see your username, you're logged in! If not, you'll need to login:

```bash
npm login
```

You'll be prompted for:
- Username (or email)
- Password
- Email (if not already on file)
- One-time password (if you have 2FA enabled)

### Step 2: Verify Package Name Availability

Check if the package name is available:

```bash
npm view nepali-date-picker-converter
```

If it returns "404" or "not found", the name is available! ✅

If it shows package details, the name is taken. You'll need to:
- Choose a different name, or
- Use a scoped package: `@yourusername/nepali-date-picker-converter`

### Step 3: Update package.json (Optional but Recommended)

Before publishing, update these fields in `package.json`:

```json
{
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/nepali-date-picker-converter.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/nepali-date-picker-converter/issues"
  },
  "homepage": "https://github.com/yourusername/nepali-date-picker-converter#readme"
}
```

### Step 4: Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### Step 5: Build the Package

Make sure everything is built:

```bash
npm run build
```

### Step 6: Test Installation Locally (Optional but Recommended)

Test the package locally before publishing:

```bash
# Create a tarball
npm pack

# In another directory, test install
npm install /path/to/nepali-date-picker-converter-0.1.0.tgz
```

### Step 7: Publish to npm

#### For Public Package (Standard):

```bash
npm publish --access public
```

#### If Using Scoped Package (@yourusername/...):

```bash
npm publish --access public
```

#### For Organization Scoped Package:

```bash
npm publish
```

### Step 8: Verify Publication

After publishing, verify on npm:

1. Visit: https://www.npmjs.com/package/nepali-date-picker-converter
2. You should see your package page with:
   - README content
   - Installation instructions
   - Package files

### Step 9: Test Installation

Test that others can install it:

```bash
# In a different directory
npm install nepali-date-picker-converter
```

Then test importing:

```javascript
const { adToBs, bsToAd } = require('nepali-date-picker-converter');
console.log(adToBs(new Date()));
```

## 🔄 Updating the Package

To publish updates:

1. **Update version in package.json:**
   - Patch: `0.1.0` → `0.1.1` (bug fixes)
   - Minor: `0.1.0` → `0.2.0` (new features)
   - Major: `0.1.0` → `1.0.0` (breaking changes)

   Or use npm version command:
   ```bash
   npm version patch  # 0.1.0 → 0.1.1
   npm version minor  # 0.1.0 → 0.2.0
   npm version major  # 0.1.0 → 1.0.0
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Publish:**
   ```bash
   npm publish --access public
   ```

## ⚠️ Important Notes

### Can't Unpublish After 72 Hours
- Once published, you can only unpublish within 72 hours
- After that, you can only deprecate or publish new versions

### Version Numbers Can't Be Reused
- Once you publish a version (e.g., 0.1.0), you cannot reuse it
- Always increment the version for new publishes

### Package Name
- If the name is taken, npm will show an error
- Use a scoped package name if needed: `@yourusername/nepali-date-picker-converter`

### Two-Factor Authentication (2FA)
- If enabled, you'll need a one-time password when publishing
- Get it from your authenticator app

## 🎯 Quick Publish Commands

```bash
# 1. Login (first time only)
npm login

# 2. Verify you're logged in
npm whoami

# 3. Check name availability
npm view nepali-date-picker-converter

# 4. Build
npm run build

# 5. Publish
npm publish --access public

# 6. Verify (check npm website)
# Visit: https://www.npmjs.com/package/nepali-date-picker-converter
```

## ✅ Checklist Before Publishing

- [ ] npm login successful (`npm whoami` works)
- [ ] Package name is available
- [ ] Version number is correct (0.1.0 for first release)
- [ ] Build successful (`npm run build`)
- [ ] Tests pass (`npm test`)
- [ ] README is complete
- [ ] LICENSE file exists
- [ ] No sensitive information in code
- [ ] .npmignore is correct
- [ ] package.json files field is correct

## 🆘 Troubleshooting

### "Package name already exists"
- Choose a different name, or
- Use scoped package: `@yourusername/nepali-date-picker-converter`

### "You must verify your email"
- Check your email and verify your npm account

### "403 Forbidden"
- Make sure you're logged in: `npm login`
- Check if you have publish permissions

### "Invalid package name"
- Package name must be lowercase
- No spaces or special characters (except hyphens)
- Max 214 characters

## 📚 Resources

- npm docs: https://docs.npmjs.com/packages-and-modules
- Semantic versioning: https://semver.org/
- npm publish docs: https://docs.npmjs.com/cli/v8/commands/npm-publish

---

**Ready to publish? Run: `npm publish --access public`** 🚀
