#!/bin/bash

# deploy.sh - Deploy standalone Next.js app to remote server
# Author: Taha
# Usage: ./deploy.sh

set -e

REMOTE_HOST=labika
REMOTE_DIR=/var/www/dashboard
APP_NAME="dashboard"

echo "🚀 Starting deployment of $APP_NAME..."

# 1. Build app locally
echo "🏗️ Building app locally..."
pnpm install --frozen-lockfile
pnpm build

echo "📤 Uploading build output to $REMOTE_HOST..."

# Upload standalone server
rsync -avz --delete \
  .next/standalone/ "$REMOTE_HOST:$REMOTE_DIR/"

# Upload public assets
rsync -avz public/ "$REMOTE_HOST:$REMOTE_DIR/public/"

# Upload static assets
rsync -avz .next/static/ "$REMOTE_HOST:$REMOTE_DIR/.next/static/"

# Upload localization messages (if needed)
rsync -avz messages/ "$REMOTE_HOST:$REMOTE_DIR/messages/"

# Upload package.json and lockfile for metadata only
rsync -avz package.json pnpm-lock.yaml "$REMOTE_HOST:$REMOTE_DIR/"

# 3. Restart PM2
ssh "$REMOTE_HOST" <<EOF
  set -e
  cd "$REMOTE_DIR"

  echo "♻️ Restarting $APP_NAME with PM2..."
  if pm2 list | grep -q "$APP_NAME"; then
    pm2 restart "$APP_NAME"
  else
    pm2 start "pnpm run start -p 3000" --name "$APP_NAME"
  fi

  pm2 save
EOF

echo "✅ Deployment complete!"
