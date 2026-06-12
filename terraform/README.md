# Lumina-PDF Terraform Deployment Guide (GCP & OCI)

This directory contains Terraform Infrastructure as Code (IaC) configurations to automate the deployment of Lumina-PDF (or Stirling-PDF) on VM instances in both **Google Cloud Platform (GCP)** and **Oracle Cloud Infrastructure (OCI)**.

Both deployment patterns use VM-level startup configurations to:
1. Automatically install Docker and Docker Compose.
2. Setup persistent directories on the host VM (`/opt/lumina-pdf/configs` and `/opt/lumina-pdf/logs`) to ensure application settings, login credentials, and database states survive restarts.
3. Automatically build/run the application container, forwarding port 80 (HTTP) to the internal container port 8080.
4. Correctly configure local OS firewalls to permit web traffic.

---

## Prerequisites

Before starting, ensure you have the following installed on your machine:
- [Terraform](https://developer.hashicorp.com/terraform/downloads) (v1.0.0 or later)
- An active Cloud Account (GCP and/or OCI)

---

## 1. Google Cloud Platform (GCP) Deployment

### Authentication Setup
Ensure you have the Google Cloud SDK installed and authenticated. You can log in using Application Default Credentials (ADC):
```bash
gcloud auth application-default login
```
Alternatively, download a Service Account JSON key, place it on your system, and point the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to it.

### Deployment Steps
1. Navigate to the GCP directory:
   ```bash
   cd terraform/gcp
   ```
2. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```
3. Edit `terraform.tfvars` and fill in your custom details:
   - `project_id`: Your actual Google Cloud Project ID.
   - `region` / `zone`: Desired region (default: `us-central1`).
   - `lumina_image`: Set to a specific Docker image or leave as default.
4. Initialize Terraform:
   ```bash
   terraform init
   ```
5. Review the plan:
   ```bash
   terraform plan
   ```
6. Apply the configuration to deploy the infrastructure:
   ```bash
   terraform apply
   ```
7. Once completed, Terraform will output your server's **Public IP** and **App URL**. (It may take 2–3 minutes for Docker to install and launch the service).

---

## 2. Oracle Cloud Infrastructure (OCI) Deployment

### Authentication Setup
Generate an API signing key pair in OCI and upload the public key to your user account profile in the OCI Console.
Note the values for `tenancy_ocid`, `user_ocid`, `fingerprint`, and the local path to your `.pem` private key.

### Deployment Steps
1. Navigate to the OCI directory:
   ```bash
   cd terraform/oci
   ```
2. Copy the example variables file:
   ```bash
   cp terraform.tfvars.example terraform.tfvars
   ```
3. Edit `terraform.tfvars` and fill in your custom details:
   - `tenancy_ocid`, `user_ocid`, `fingerprint`, `private_key_path`: Your OCI account credentials.
   - `compartment_ocid`: The ID of the compartment where resources should be created.
   - `ssh_public_key`: Paste your public SSH key content (e.g. `ssh-rsa ...` from `~/.ssh/id_rsa.pub`) to allow terminal access.
   - `instance_shape`: The default is `VM.Standard.E4.Flex` (AMD). If you wish to use the Always-Free ARM shape, change to `VM.Standard.A1.Flex`.
4. Initialize Terraform:
   ```bash
   terraform init
   ```
5. Review the plan:
   ```bash
   terraform plan
   ```
6. Apply the configuration to deploy:
   ```bash
   terraform apply
   ```
7. Once completed, Terraform will output the **Public IP** and **App URL**. (Allow 3-4 minutes for the Docker engine and containers to complete startup).

> [!NOTE]
> **OCI Firewalls**: OCI compute instances boot up with local system firewalls (like `ufw` on Ubuntu or `firewalld` on Oracle Linux) that block ports by default. The OCI deployment automatically configures these local firewalls inside the `user_data.sh` script to open port `80` (HTTP) and `443` (HTTPS) to external users.

---

## 3. Production Recommendations & Next Steps

### persistent Data & Backups
Application database records and configs are stored in H2 format inside the container's `/configs` volume. On the VM hosts, this maps directly to `/opt/lumina-pdf/configs`. 
To back up database records or user configs:
- Periodically copy/rsync files from `/opt/lumina-pdf/configs/` to a secure object storage bucket (e.g. Google Cloud Storage or OCI Object Storage).
- Maintain snapshots of the VM's boot disk.

### HTTPS / TLS Configuration
Serving traffic directly over port `80` (HTTP) is insecure. For production deployments:
1. Map a domain name to the VM's public IP address.
2. To enable HTTPS, modify the docker-compose file on the VM (`/opt/lumina-pdf/docker-compose.yml`) to include a reverse proxy container like **Caddy** or **Nginx Proxy Manager**, which will auto-issue Let's Encrypt certificates.
   
   Example Caddy configuration:
   ```yaml
   services:
     lumina-pdf:
       image: frooodle/s-pdf:latest
       # ...
       ports:
         - "127.0.0.1:8080:8080" # Restrict to localhost
     caddy:
       image: caddy:2-alpine
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - /opt/lumina-pdf/Caddyfile:/etc/caddy/Caddyfile
         - caddy_data:/data
         - caddy_config:/config
   ```
   Where your Caddyfile contains:
   ```caddy
   pdf.yourdomain.com {
       reverse_proxy lumina-pdf:8080
   }
   ```
