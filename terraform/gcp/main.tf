provider "google" {
  project = var.project_id
  region  = var.region
  zone    = var.zone
}

# 1. VPC Network
resource "google_compute_network" "vpc" {
  name                    = var.network_name
  auto_create_subnetworks = false
}

# 2. Subnet
resource "google_compute_subnetwork" "subnet" {
  name          = "${var.network_name}-subnet"
  ip_cidr_range = var.subnet_cidr
  region        = var.region
  network       = google_compute_network.vpc.id
}

# 3. Firewall Rules
resource "google_compute_firewall" "allow_ssh" {
  name    = "${var.network_name}-allow-ssh"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = ["0.0.0.0/0"] # In production, restrict this to your IP
}

resource "google_compute_firewall" "allow_http" {
  name    = "${var.network_name}-allow-http"
  network = google_compute_network.vpc.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443"]
  }

  source_ranges = ["0.0.0.0/0"]
}

# 4. Reserved Static External IP
resource "google_compute_address" "static_ip" {
  name   = "${var.vm_name}-ip"
  region = var.region
}

# 5. Compute Engine Instance
resource "google_compute_instance" "vm" {
  name         = var.vm_name
  machine_type = var.machine_type
  zone         = var.zone

  boot_disk {
    initialize_params {
      image = "${var.image_project}/${var.image_family}"
      size  = 20 # 20GB disk space is plenty for container + cache
    }
  }

  network_interface {
    network    = google_compute_network.vpc.name
    subnetwork = google_compute_subnetwork.subnet.name

    access_config {
      nat_ip = google_compute_address.static_ip.address
    }
  }

  # Render startup script with Terraform variables
  metadata_startup_script = templatefile("${path.module}/templates/startup.sh", {
    LUMINA_IMAGE          = var.lumina_image
    SECURITY_ENABLE_LOGIN = var.security_enable_login
    APP_NAME              = var.app_name
    SYSTEM_DEFAULT_LOCALE = var.system_default_locale
  })

  # Allow standard API access from the instance (logging, monitoring, etc.)
  service_account {
    scopes = ["cloud-platform"]
  }

  # Tags for network mapping if needed, e.g., for external load balancing
  tags = ["http-server", "https-server"]

  lifecycle {
    ignore_changes = [metadata_startup_script]
  }
}
