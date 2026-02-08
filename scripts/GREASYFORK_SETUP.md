# GreasyFork Webhook Setup Guide

Your GreasyFork webhook is configured! Here's how to complete the setup:

## Webhook Details

- **Payload URL**: `https://greasyfork.org/en/users/118672-jonathan-jewell/webhook`
- **Secret**: `f2ff1c08a7eac48e39c00d074422c30a64e9814fc88bb34c036e06f5e32b5b5a13f45eb13b5cd76f15b436ad8676952fb81ce8186c2ee264b5733e1931fa0237`
- **Event**: Push (already configured in your GitHub settings)

## Repository Structure

Your userscripts are now organized for webhook sync:

```
grimrepo-scripts/
├── userscripts/
│   ├── GrimGreaser.user.js
│   ├── GrimPager.user.js
│   ├── GrimTemplateEngine.user.js
│   ├── GrimLicenseChecker.user.js
│   ├── GrimCIValidator.user.js
│   └── GrimSecurityScanner.user.js
└── dist/ (same files, for local testing)
```

## Initial Setup (One-Time)

Since the webhook only works for **updates**, you need to manually create each script on GreasyFork first:

### Step 1: Upload Scripts to GreasyFork

For each script in `userscripts/`:

1. Go to https://greasyfork.org/en/scripts/new
2. Click **"Choose File"** and select the `.user.js` file
3. Set **Language** to "English"
4. Add **Description** (see descriptions below)
5. Add **Tags** (see tags below)
6. Click **"Post script"**

### Step 2: Configure Webhook Sync

After creating each script on GreasyFork:

1. Go to the script's edit page
2. Scroll to **"Sync"** section
3. Select **"Sync type"**: GitHub
4. Enter **"Repository"**: `hyperpolymath/grimrepo-scripts`
5. Enter **"Branch"**: `main`
6. Enter **"Path"**: `userscripts/[ScriptName].user.js`
   - Example: `userscripts/GrimGreaser.user.js`
7. Click **"Update script"**

## Recommended Descriptions & Tags

### GrimGreaser

**Description:**
```
Pure ReScript build system with GreasyFork auto-publish capability. Meta-circular architecture allows ReScript to build itself into userscripts with automatic dependency bundling and minification.

Features:
- Self-hosting build system
- GreasyFork API integration
- Tree shaking & minification
- Single Source of Truth from deno.json

Part of the GrimRepo ecosystem for repository management.
```

**Tags:** `build-tool`, `automation`, `developer-tools`, `rescript`

---

### GrimPager

**Description:**
```
Perpetual auto-paging engine that never stops scrolling. Uses homoiconic rule database with smart pagination detection fallback.

Features:
- 20+ pre-configured site rules
- Automatic pagination detection
- Visual loading indicators
- Works on Google, GitHub, GitLab, Reddit, HN, and more

Enables infinite browsing without clicking "Next Page" buttons.
```

**Tags:** `pagination`, `auto-paging`, `infinite-scroll`, `browsing`

---

### GrimTemplateEngine

**Description:**
```
Intelligent repository health agent that detects missing community health files and generates customized templates with one click.

Features:
- Context-aware template generation (extracts owner/repo from URL)
- Health scoring system (0-100 points)
- 9 community health file templates (LICENSE, SECURITY.md, CODE_OF_CONDUCT.md, etc.)
- Priority system (Critical/Important/Recommended)
- LocalStorage persistence for dismissed repos
- One-click GitHub/GitLab editor pre-fill

Helps maintain 100+ repositories at scale.
```

**Tags:** `github`, `gitlab`, `repository-management`, `templates`, `health-check`

---

### GrimLicenseChecker

**Description:**
```
License compliance validator that scans repository files for SPDX headers and detects license inconsistencies.

Features:
- Scans source files for SPDX-License-Identifier headers
- Detects 7+ common licenses (PMPL, MPL, MIT, Apache, GPL, etc.)
- Shows compliance percentage
- Highlights files missing headers
- Supports 10+ file extensions

Essential for maintaining license compliance across multiple repositories.
```

**Tags:** `license`, `compliance`, `spdx`, `repository-management`, `legal`

---

### GrimCIValidator

**Description:**
```
GitHub Actions workflow quality checker that validates CI/CD configurations for security best practices.

Features:
- Detects unpinned actions (recommends SHA pinning)
- Validates permissions declarations
- Checks for SPDX headers in workflows
- Finds potential hardcoded secrets
- Scores workflow quality (0-100)
- Categorizes issues by severity (Critical/Warning/Info)

Ensures your CI/CD pipelines follow security best practices.
```

**Tags:** `github-actions`, `ci-cd`, `security`, `validation`, `devops`

---

### GrimSecurityScanner

**Description:**
```
Security vulnerability detector that scans repositories for common security issues and missing security files.

Features:
- Detects hardcoded secrets and API keys (10+ patterns)
- Finds dangerous code patterns (eval, innerHTML, system calls)
- Checks for missing SECURITY.md and CODE_OF_CONDUCT.md
- Calculates risk score
- Categorizes by severity (High/Medium/Low)
- Manual trigger via userscript menu

Basic security scanning for repository health checks.
```

**Tags:** `security`, `vulnerability-scanner`, `repository-management`, `code-quality`

---

## After Setup: Automatic Sync

Once configured, any push to GitHub will automatically update all scripts on GreasyFork:

```bash
# Make changes to userscripts
vim userscripts/GrimPager.user.js

# Commit and push
git add userscripts/
git commit -m "Update GrimPager: add new site rule"
git push origin main

# GreasyFork automatically updates within seconds! ✨
```

## Workflow Integration

Add this to your build pipeline:

```bash
# In deno.json tasks:
"build-all": "deno task build && deno run --allow-read --allow-write --allow-env build-userscripts.ts && cp dist/*.user.js userscripts/"
```

Then:
```bash
deno task build-all
git add userscripts/
git commit -m "Release v1.0.1"
git push
```

## Troubleshooting

If webhook sync isn't working:

1. Check webhook delivery at: https://github.com/hyperpolymath/grimrepo-scripts/settings/hooks
2. Verify the script path on GreasyFork matches exactly
3. Ensure the file has proper userscript metadata headers
4. Check that the branch is `main` (not `master`)

## Additional Resources

- [GreasyFork Webhook Docs](https://greasyfork.org/en/help/external-scripts)
- [GitHub Webhook Guide](https://docs.github.com/en/webhooks)
- [Userscript Metadata](https://wiki.greasespot.net/Metadata_Block)
