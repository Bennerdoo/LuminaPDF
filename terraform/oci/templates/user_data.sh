#!/bin/bash
set -e

# Log all output to cloud-init script log
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1

echo "=== Starting OCI Lumina-PDF Setup ==="

# 1. Detect OS
OS_FAMILY="unknown"
if [ -f /etc/debian_version ]; then
  OS_FAMILY="debian"
elif [ -f /etc/redhat-release ] || [ -f /etc/oracle-release ]; then
  OS_FAMILY="redhat"
fi

echo "Detected OS family: $OS_FAMILY"

# 2. Configure Firewall and Install Docker
if [ "$OS_FAMILY" = "debian" ]; then
  echo "Setting up Debian/Ubuntu..."
  export DEBIAN_FRONTEND=noninteractive
  apt-get update -y
  apt-get install -y curl gnupg lsb-release ca-certificates

  # Open local firewall rules (Ubuntu standard)
  if command -v ufw &> /dev/null; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 22/tcp
    ufw --force enable || true
  fi
  
  # Also insert iptables rules just in case OCI default rules are active
  iptables -I INPUT 6 -p tcp --dport 80 -j ACCEPT || true
  iptables -I INPUT 6 -p tcp --dport 443 -j ACCEPT || true
  
  # Install Docker
  if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable docker
    systemctl start docker
  fi

elif [ "$OS_FAMILY" = "redhat" ]; then
  echo "Setting up RedHat/Oracle Linux..."
  # Open local firewall rules (firewalld standard on Oracle Linux)
  if command -v firewall-cmd &> /dev/null; then
    firewall-cmd --zone=public --add-port=80/tcp --permanent
    firewall-cmd --zone=public --add-port=443/tcp --permanent
    firewall-cmd --reload
  fi
  
  # Also insert iptables rules as fallback
  iptables -I INPUT 6 -p tcp --dport 80 -j ACCEPT || true
  iptables -I INPUT 6 -p tcp --dport 443 -j ACCEPT || true

  # Install Docker
  yum install -y yum-utils
  yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
  yum install -y docker-ce docker-ce-cli containerd.io
  systemctl enable docker
  systemctl start docker
else
  echo "Unsupported OS family. Attempting generic docker setup..."
  curl -fsSL https://get.docker.com | sh
fi

# 3. Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
  echo "Installing Docker Compose..."
  LATEST_COMPOSE_VERSION=$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K[^"]+')
  curl -L "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  chmod +x /usr/local/bin/docker-compose
  ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
fi

# 4. Create directories
echo "Creating application storage folders..."
mkdir -p /opt/lumina-pdf/configs
mkdir -p /opt/lumina-pdf/logs
mkdir -p /opt/lumina-pdf/data

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
      - "80:8080" # Map host port 80 to container port 8080
    volumes:
      - /opt/lumina-pdf/data:/usr/share/tessdata:rw
      - /opt/lumina-pdf/configs:/configs:rw
      - /opt/lumina-pdf/logs:/logs:rw
    environment:
      - SECURITY_ENABLELOGIN=${SECURITY_ENABLE_LOGIN}
      - UI_APPNAME=${APP_NAME}
      - SYSTEM_DEFAULTLOCALE=${SYSTEM_DEFAULT_LOCALE}
      - DOCKER_ENABLE_SECURITY=${SECURITY_ENABLE_LOGIN}
      # Adjust JVM memory flags
      - JAVA_CUSTOM_OPTS=-Xms512m -Xmx2g
EOF

# 6. Launch container
echo "Launching Lumina-PDF container..."
cd /opt/lumina-pdf
docker-compose down || true
docker-compose up -d

echo "=== OCI Lumina-PDF Setup Completed successfully ==="
