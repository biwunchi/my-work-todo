#!/bin/bash

# This script helps set up the repository and deploy to Vercel

echo "My Work To Do - Setup Script"
echo "=============================="
echo ""

# Check if git is configured
if ! git config user.email > /dev/null; then
    echo "Please configure git first:"
    echo "  git config --global user.email 'your-email@example.com'"
    echo "  git config --global user.name 'Your Name'"
    exit 1
fi

# Ask for GitHub username
read -p "Enter your GitHub username (e.g., biwunchi): " GITHUB_USER
REPO_NAME="my-work-todo"

echo ""
echo "To create a GitHub repository, you have two options:"
echo ""
echo "Option 1: Using GitHub CLI (Recommended)"
echo "  1. Install GitHub CLI: https://cli.github.com/manual/installation"
echo "  2. Authenticate: gh auth login"
echo "  3. Create repo: gh repo create $REPO_NAME --public --source=. --remote=origin --push"
echo ""
echo "Option 2: Manual GitHub Setup"
echo "  1. Go to https://github.com/new"
echo "  2. Create a new repository named '$REPO_NAME'"
echo "  3. Copy the repository URL and run:"
echo "     git remote add origin https://github.com/$GITHUB_USER/$REPO_NAME.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "Once your GitHub repo is set up, deploy to Vercel:"
echo "  1. Go to https://vercel.com/new"
echo "  2. Import your GitHub repository"
echo "  3. Add environment variables:"
echo "     - NEXT_PUBLIC_SUPABASE_URL"
echo "     - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo "  4. Click Deploy!"
echo ""
echo "Your live URL will be provided after deployment."
