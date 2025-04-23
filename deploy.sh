#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Pulling latest code from git..."

# Try pulling the latest changes
if git pull --rebase; then
  echo "Git pull successful."
else
  echo "Git pull failed. Resolve conflicts manually."
  exit 1
fi

echo "Bringing down any running containers..."
sudo docker-compose down

echo "Building Docker containers..."
sudo docker-compose build

echo "Starting up containers..."
sudo docker-compose up -d

echo "Server upgraded"
