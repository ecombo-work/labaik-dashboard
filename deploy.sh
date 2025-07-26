#!/bin/bash

# deploy.sh - Deploy standalone Next.js app to remote server
# Author: Taha
# Usage: ./deploy.sh

# Exit on error
set -e

echo "🚀 Starting local build and deployment script..."

# Define variables
REMOTE_USER=taha
REMOTE_HOST=128.199.180.111
REMOTE_DIR=/var/www/labaik/dashboard
APP_NAME="dashboard"

echo "🚀 Starting deployment of $APP_NAME..."

# 1. Build app locally
echo "🏗️ Building app locally..."
pnpm install --frozen-lockfile
pnpm build



# 2. Upload required runtime files
echo "📤 Uploading build output to $REMOTE_HOST..."


# Upload standalone server
rsync -avz --delete \
  --exclude=node_modules \
  .next/standalone/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# Upload public assets
rsync -avz public/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/public/"

# Upload static assets from `.next/static`
rsync -avz .next/static/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/.next/static/"

# Upload localization messages
rsync -avz messages/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/messages/"

# Upload package.json and lock file
rsync -avz package.json pnpm-lock.yaml "$REMOTE_USER@$REMOTE_HOST:$REMOTE_DIR/"

# 3. SSH into server to install & restart
ssh "$REMOTE_USER@$REMOTE_HOST" <<EOF
  set -e
  cd "$REMOTE_DIR"

  echo "📦 Installing production dependencies..."
  pnpm install --frozen-lockfile --prod

  echo "♻️ Restarting $APP_NAME with PM2..."
  if pm2 list | grep -q "$APP_NAME"; then
    pm2 restart "$APP_NAME"
  else
    pm2 start server.js --name "$APP_NAME"
  fi

  pm2 save
EOF

echo "✅ Deployment complete!"

