#!/bin/bash
set -e

# Log all output to startup script log
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "=== Starting Lumina-PDF Setup ==="

# 1. Update system and install prerequisites
apt-get update -y
apt-get install -y curl gnupg lsb-release ca-certificates

# 2. Install Docker
if ! command -v docker &> /dev/null; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com -o get-docker.sh
  sh get-docker.sh
  systemctl enable docker
  systemctl start docker
fi

# 3. Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "Installing Docker Compose..."
  LATEST_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K[^"]+')
  curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# 4. Create local directories for persistence
echo "Creating application storage folders..."
mkdir -p /opt/lumina-pdf/configs
mkdir -p /opt/lumina-pdf/logs
mkdir -p /opt/lumina-pdf/data

# Ensure folder ownership is correct (PUID/PGID 1000 in embedded Dockerfile)
chown -R 1000:1000 /opt/lumina-pdf

# 5. Write the docker-compose configuration
echo "Writing docker-compose.yml..."
cat << 'EOF' > /opt/lumina-pdf/docker-compose.yml
version: '3.8'

services:
  lumina-pdf:
    image: ${LUMINA_IMAGE}
    container_name: lumina-pdf
    restart: unless-stopped
    ports:
      - "80:8080" # Map host port 80 to container port 8080 for easy access
    volumes:
      - /opt/lumina-pdf/data:/usr/share/tessdata:rw
      - /opt/lumina-pdf/configs:/configs:rw
      - /opt/lumina-pdf/logs:/logs:rw
    environment:
      - SECURITY_ENABLELOGIN=${SECURITY_ENABLE_LOGIN}
      - UI_APPNAME=${APP_NAME}
      - SYSTEM_DEFAULTLOCALE=${SYSTEM_DEFAULT_LOCALE}
      - DOCKER_ENABLE_SECURITY=${SECURITY_ENABLE_LOGIN}
      # Increase memory limits if necessary (Standard VM has 4GB)
      - JAVA_CUSTOM_OPTS=-Xms512m -Xmx2g
EOF

# 6. Launch Lumina-PDF
echo "Launching Lumina-PDF container..."
cd /opt/lumina-pdf
docker-compose down || true
docker-compose up -d

echo "=== Lumina-PDF Setup Completed successfully ==="
