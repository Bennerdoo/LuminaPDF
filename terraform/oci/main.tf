provider "oci" {
  tenancy_ocid     = var.tenancy_ocid
  user_ocid        = var.user_ocid
  fingerprint      = var.fingerprint
  private_key_path = var.private_key_path
  region           = var.region
}

# 1. Query Availability Domains in the region
data "oci_identity_availability_domains" "ad" {
  compartment_id = var.tenancy_ocid
}

# 2. Query the latest compatible Ubuntu 22.04 image for the specified instance shape
data "oci_core_images" "ubuntu" {
  compartment_id           = var.compartment_ocid
  operating_system         = "Canonical Ubuntu"
  operating_system_version = "22.04"
  shape                    = var.instance_shape
  sort_by                  = "TIMECREATED"
  sort_order               = "DESC"
}

# 3. Virtual Cloud Network (VCN)
resource "oci_core_vcn" "vcn" {
  compartment_id = var.compartment_ocid
  cidr_blocks    = ["10.0.0.0/16"]
  display_name   = "lumina-pdf-vcn"
  dns_label      = "luminapdfvcn"
}

# 4. Internet Gateway (for outbound/inbound public internet traffic)
resource "oci_core_internet_gateway" "ig" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.vcn.id
  display_name   = "lumina-pdf-ig"
  enabled        = true
}

# 5. Route Table (directs VCN traffic out through Internet Gateway)
resource "oci_core_default_route_table" "rt" {
  manage_default_resource_id = oci_core_vcn.vcn.default_route_table_id
  display_name               = "lumina-pdf-rt"

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.ig.id
  }
}

# 6. Security List (Firewall Rules at Subnet Level)
resource "oci_core_security_list" "security_list" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.vcn.id
  display_name   = "lumina-pdf-security-list"

  # Egress: Allow all outbound traffic (needed to download packages & docker images)
  egress_security_rules {
    destination      = "0.0.0.0/0"
    protocol         = "all"
    destination_type = "CIDR_BLOCK"
  }

  # Ingress: Allow SSH (Port 22)
  ingress_security_rules {
    protocol    = "6" # TCP
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    tcp_options {
      min = 22
      max = 22
    }
  }

  # Ingress: Allow HTTP (Port 80)
  ingress_security_rules {
    protocol    = "6" # TCP
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    tcp_options {
      min = 80
      max = 80
    }
  }

  # Ingress: Allow HTTPS (Port 443)
  ingress_security_rules {
    protocol    = "6" # TCP
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    tcp_options {
      min = 443
      max = 443
    }
  }

  # Ingress: Allow custom HTTP container port directly (Port 8080)
  ingress_security_rules {
    protocol    = "6" # TCP
    source      = "0.0.0.0/0"
    source_type = "CIDR_BLOCK"
    tcp_options {
      min = 8080
      max = 8080
    }
  }
}

# 7. Subnet
resource "oci_core_subnet" "subnet" {
  compartment_id      = var.compartment_ocid
  vcn_id              = oci_core_vcn.vcn.id
  cidr_block          = "10.0.1.0/24"
  display_name        = "lumina-pdf-subnet"
  dns_label           = "luminapdfsub"
  security_list_ids   = [oci_core_security_list.security_list.id]
  route_table_id      = oci_core_vcn.vcn.default_route_table_id
}

# 8. Compute Instance
resource "oci_core_instance" "instance" {
  compartment_id      = var.compartment_ocid
  availability_domain = data.oci_identity_availability_domains.ad.availability_domains[0].name
  shape               = var.instance_shape
  display_name        = var.instance_name

  # Flex shape configuration (e.g. OCPU/RAM size)
  shape_config {
    ocpus         = var.instance_ocpus
    memory_in_gbs = var.instance_memory_in_gbs
  }

  source_details {
    source_type = "image"
    source_id   = data.oci_core_images.ubuntu.images[0].id
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.subnet.id
    display_name     = "primary-vnic"
    assign_public_ip = true
  }

  metadata = {
    ssh_authorized_keys = var.ssh_public_key
    user_data = base64encode(templatefile("${path.module}/templates/user_data.sh", {
      LUMINA_IMAGE          = var.lumina_image
      SECURITY_ENABLE_LOGIN = var.security_enable_login
      APP_NAME              = var.app_name
      SYSTEM_DEFAULT_LOCALE = var.system_default_locale
    }))
  }

  # Ensure compute instance rebuilds if user_data changes
  lifecycle {
    ignore_changes = []
  }
}
