variable "project_id" {
  description = "The GCP Project ID where resources will be created"
  type        = string
}

variable "region" {
  description = "The GCP region to deploy resources in"
  type        = string
  default     = "us-central1"
}

variable "zone" {
  description = "The GCP zone to launch the VM in"
  type        = string
  default     = "us-central1-a"
}

variable "vm_name" {
  description = "Name of the GCE VM instance"
  type        = string
  default     = "lumina-pdf-vm"
}

variable "machine_type" {
  description = "The machine type for the Compute Engine instance"
  type        = string
  default     = "e2-medium" # 2 vCPU, 4GB RAM is suitable for Lumina-PDF standard mode
}

variable "image_family" {
  description = "GCP OS Image family"
  type        = string
  default     = "ubuntu-2204-lts"
}

variable "image_project" {
  description = "GCP OS Image project"
  type        = string
  default     = "ubuntu-os-cloud"
}

variable "network_name" {
  description = "The name of the VPC network"
  type        = string
  default     = "lumina-pdf-network"
}

variable "subnet_cidr" {
  description = "CIDR range for the subnet"
  type        = string
  default     = "10.0.10.0/24"
}

variable "lumina_image" {
  description = "Docker image for Lumina-PDF (standard or customized)"
  type        = string
  default     = "frooodle/s-pdf:latest"
}

variable "app_name" {
  description = "The title name of the Lumina-PDF app interface"
  type        = string
  default     = "Lumina-PDF"
}

variable "security_enable_login" {
  description = "Enable login page and user authentication (true/false)"
  type        = string
  default     = "false"
}

variable "system_default_locale" {
  description = "Default language locale for the application UI"
  type        = string
  default     = "en-GB" # GB as per repository developer rules
}
