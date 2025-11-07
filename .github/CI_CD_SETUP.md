# CI/CD Pipeline Setup

**Created:** 2025-11-07
**Status:** ✅ Active
**Version:** 1.0

## Overview

This project includes a complete CI/CD pipeline using GitHub Actions. The pipeline automates:
- ✅ Linting and code quality checks
- ✅ TypeScript type checking
- ✅ Running test suites
- ✅ Building the Next.js application
- ✅ Security scanning
- ✅ Deployment readiness checks

---

## GitHub Actions Workflows

### 1. **ci.yml** - Main CI Pipeline
**Trigger:** Push to `main` or `Ohouse_ai_design_system` branch, or Pull Requests

**Jobs:**
- `lint-and-test`: ESLint, TypeScript check, and test execution
- `build`: Next.js build process
- `push-updates`: Automatic git push to GitHub
- `notify`: Workflow status notification

**Runtime:** ~5-10 minutes

### 2. **build-and-test.yml** - Comprehensive Testing
**Trigger:** Push to `main` branch or Pull Requests

**Jobs:**
- `test`: Run Agent 1.4 test suite (82 tests)
- `lint`: ESLint validation
- `typecheck`: TypeScript strict mode check
- `build`: Next.js production build
- `security`: Trivy vulnerability scanning

**Runtime:** ~15-20 minutes

### 3. **deploy.yml** - Deployment Pipeline
**Trigger:** Successful `build-and-test` workflow on `main` branch

**Jobs:**
- `deploy-check`: Pre-deployment validation
- `notify-deployment`: Deployment notifications
- `summary`: Final summary report

**Runtime:** ~2 minutes

---

## Local Git Hooks

### Pre-commit Hook
**Location:** `.git/hooks/pre-commit`
**Triggers:** Before each commit

**Checks:**
1. TypeScript type checking
2. ESLint validation
3. Test suite execution

**Behavior:**
- ✅ If all checks pass → commit proceeds
- ❌ If checks fail → commit is blocked
  - Run `npm run lint:fix` to auto-fix linting issues
  - Fix type errors manually
  - Fix failing tests

**Example:**
```bash
$ git commit -m "Your commit message"
🔍 Running pre-commit checks...

📝 Type checking...
✅ Type check passed

🧹 Linting...
✅ Linting passed

🧪 Running tests...
✅ Tests passed

✨ All checks passed! Proceeding with commit...
```

---

## How to Use

### Automatic Workflows (No action needed)

When you push code to GitHub:
```bash
git push origin main
```

The CI/CD pipeline automatically:
1. ✅ Runs all tests
2. ✅ Checks code quality
3. ✅ Builds the application
4. ✅ Scans for security issues
5. ✅ Reports results

### Manual Local Testing

Before committing, you can run checks manually:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Run test suite
node test_agent_14.js

# Full build
npm run build
```

### Viewing Workflow Results

1. Go to GitHub repository
2. Click "Actions" tab
3. Select the workflow run
4. View job details and logs

---

## Environment Setup

No additional setup needed! The workflows use:
- **Node.js:** v22
- **Package Manager:** npm
- **Build Tool:** Next.js 15.3

---

## Workflow Files Structure

```
.github/
├── workflows/
│   ├── ci.yml                 (Main CI pipeline)
│   ├── build-and-test.yml    (Comprehensive testing)
│   └── deploy.yml            (Deployment pipeline)
└── CI_CD_SETUP.md            (This file)

.git/
└── hooks/
    └── pre-commit            (Local commit validation)
```

---

## Status Badges

Add these to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/ilwonyoon/ohouse_ai_main/actions/workflows/ci.yml/badge.svg)
![Build Status](https://github.com/ilwonyoon/ohouse_ai_main/actions/workflows/build-and-test.yml/badge.svg)
```

---

## Customization

### Disable Pre-commit Hook

If you need to skip the pre-commit hook:
```bash
git commit --no-verify -m "Your message"
```

### Modify Workflows

Edit files in `.github/workflows/` to customize:
- Node version
- Dependencies to install
- Scripts to run
- Deployment targets

### Add Notifications

The workflows can be extended to notify:
- Slack (add Slack webhook)
- Email (use GitHub notifications)
- Discord (add Discord webhook)

---

## Troubleshooting

### Workflow not triggering?
1. Check branch protection rules
2. Verify file paths are correct
3. Check GitHub Actions permissions

### Pre-commit hook not running?
```bash
# Make sure it's executable
chmod +x .git/hooks/pre-commit

# Verify the hook exists
ls -la .git/hooks/pre-commit
```

### Tests failing in CI but passing locally?
1. Check Node version matches (v22)
2. Verify npm cache: `npm ci` instead of `npm install`
3. Check for environment-specific issues

---

## Next Steps

1. ✅ All workflows are set up and active
2. Monitor the Actions tab for workflow runs
3. Configure branch protection rules if needed
4. Add status badges to README.md
5. Set up deployment notifications (optional)

---

## Support

For issues or questions about the CI/CD setup:
1. Check GitHub Actions logs
2. Review workflow files in `.github/workflows/`
3. Run tests locally: `node test_agent_14.js`
4. Check pre-commit hook: `cat .git/hooks/pre-commit`

---

**Last Updated:** 2025-11-07
**Maintained By:** Claude Code
