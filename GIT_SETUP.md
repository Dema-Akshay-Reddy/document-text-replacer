# 🚀 Push to GitHub - Step by Step Guide

## Prerequisites

Make sure you have:
- ✅ Git installed on your computer
- ✅ GitHub account created
- ✅ GitHub repository created (or follow steps below)

---

## Option 1: Create Repository on GitHub First (Recommended)

### Step 1: Create Repository on GitHub

1. Go to [github.com](https://github.com)
2. Click the **"+"** icon (top-right) → **"New repository"**
3. Fill in repository details:
   - **Repository name:** `document-text-replacer` (or your preferred name)
   - **Description:** "Replace multiple texts in Word documents via web interface"
   - **Visibility:** Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Copy Your Repository URL

After creating, you'll see a URL like:
```
https://github.com/YOUR_USERNAME/document-text-replacer.git
```

Copy this URL!

### Step 3: Run These Commands

Open PowerShell in your project folder (`c:\Users\aksha\Downloads\converter`) and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Document Text Replacer application"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/document-text-replacer.git

# Push to GitHub (main branch)
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## Option 2: Create Repository from Command Line

### Step 1: Initialize Local Repository

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Document Text Replacer application"
```

### Step 2: Create GitHub Repository via CLI (Requires GitHub CLI)

If you have GitHub CLI (`gh`) installed:

```bash
# Create repository on GitHub
gh repo create document-text-replacer --public --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

If you don't have GitHub CLI, follow **Option 1** instead.

---

## Complete Command Reference

### First Time Setup (Run Once)

```bash
# Navigate to project folder
cd c:\Users\aksha\Downloads\converter

# Initialize Git
git init

# Configure your Git identity (if not done already)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Add all files
git add .

# Check what will be committed
git status

# Create first commit
git commit -m "Initial commit: Document Text Replacer application"

# Add remote repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/document-text-replacer.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## Future Updates (After Initial Push)

When you make changes to your code:

```bash
# See what changed
git status

# Add specific files
git add server.js
git add README.md

# Or add all changed files
git add .

# Commit with message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

---

## Useful Git Commands

### Check Status
```bash
git status                    # See what files changed
git log                       # View commit history
git log --oneline            # Compact commit history
```

### Branching
```bash
git branch                    # List branches
git branch feature-name      # Create new branch
git checkout feature-name    # Switch to branch
git checkout -b feature-name # Create and switch in one command
git merge feature-name       # Merge branch into current branch
```

### Remote Management
```bash
git remote -v                # View remote URLs
git remote set-url origin URL # Change remote URL
git pull                     # Pull latest changes from GitHub
git fetch                    # Fetch changes without merging
```

### Undo Changes
```bash
git restore file.js          # Discard changes in working directory
git restore --staged file.js # Unstage file
git reset --soft HEAD~1      # Undo last commit, keep changes
git reset --hard HEAD~1      # Undo last commit, discard changes (CAREFUL!)
```

---

## Common Scenarios

### Scenario 1: First Time Push
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

### Scenario 2: Update After Changes
```bash
git add .
git commit -m "Added mobile support and cleanup"
git push
```

### Scenario 3: Pull Updates from GitHub
```bash
git pull origin main
```

### Scenario 4: Clone Repository on Another Computer
```bash
git clone https://github.com/USERNAME/REPO.git
cd REPO
npm install
npm start
```

---

## What Gets Pushed to GitHub?

### ✅ Included (Tracked by Git):
- `server.js` - Main application
- `package.json` - Dependencies list
- `package-lock.json` - Exact dependency versions
- `README.md` - Documentation
- `QUICK_START.txt` - Quick reference
- `.gitignore` - Git ignore rules
- `uploads/.gitkeep` - Empty uploads directory placeholder

### ❌ Excluded (In .gitignore):
- `node_modules/` - Dependencies (too large, can be reinstalled)
- `uploads/*` - User uploaded files (temporary)
- `.env` - Environment variables (sensitive)
- `*.log` - Log files
- OS-specific files

---

## After Pushing: Setup on Another Computer

Someone else (or you on another computer) can get your project:

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/document-text-replacer.git

# Navigate into project
cd document-text-replacer

# Install dependencies
npm install

# Start server
npm start
```

The application will be ready at `http://localhost:3000`!

---

## Troubleshooting

### Error: "fatal: not a git repository"
**Solution:** Run `git init` first

### Error: "failed to push some refs"
**Solution:** Pull first, then push
```bash
git pull origin main --rebase
git push
```

### Error: "Permission denied (publickey)"
**Solution:** Use HTTPS URL instead of SSH, or setup SSH keys
```bash
# Use HTTPS (easier)
git remote set-url origin https://github.com/USERNAME/REPO.git
```

### Error: "refusing to merge unrelated histories"
**Solution:**
```bash
git pull origin main --allow-unrelated-histories
```

---

## Tips & Best Practices

### Commit Messages
✅ **Good:**
- "Add mobile responsive design"
- "Fix text replacement for formatted content"
- "Update README with mobile instructions"

❌ **Bad:**
- "Update"
- "Changes"
- "Fix"

### Commit Frequency
- Commit after completing a feature
- Commit after fixing a bug
- Commit before major changes
- Don't wait too long between commits

### Branch Strategy
- `main` - Production-ready code
- `develop` - Development branch
- `feature/name` - New features
- `bugfix/name` - Bug fixes

---

## Quick Command Cheatsheet

```bash
# Setup
git init                                    # Initialize repository
git clone URL                               # Clone repository

# Daily Use
git status                                  # Check status
git add .                                   # Stage all changes
git commit -m "message"                     # Commit with message
git push                                    # Push to GitHub
git pull                                    # Pull from GitHub

# Branches
git branch                                  # List branches
git checkout -b branch-name                 # Create & switch branch
git merge branch-name                       # Merge branch

# History
git log                                     # View commits
git diff                                    # See changes

# Remote
git remote -v                               # View remotes
git remote add origin URL                   # Add remote
```

---

## Your Project URL After Pushing

After pushing, your project will be available at:
```
https://github.com/YOUR_USERNAME/document-text-replacer
```

Share this URL with others to collaborate!

---

## 🎉 Success!

Once pushed, you'll be able to:
- ✅ Share your code with others
- ✅ Access your code from any computer
- ✅ Track changes and version history
- ✅ Collaborate with others
- ✅ Showcase your work
- ✅ Keep backups of your code

---

**Ready? Run the commands above and your project will be on GitHub!** 🚀
