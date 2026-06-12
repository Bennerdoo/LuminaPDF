# OCI Provider Credentials
variable "tenancy_ocid" {
  description = "OCI Tenancy OCID"
  type        = string
}

variable "user_ocid" {
  description = "OCI User OCID"
  type        = string
}

variable "fingerprint" {
  description = "OCI API key fingerprint"
  type        = string
}

variable "private_key_path" {
  description = "Local path to OCI private key file (.pem)"
  type        = string
}

variable "region" {
  description = "OCI Region"
  type        = string
  default     = "us-ashburn-1"
}

# OCI Resource Settings
variable "compartment_ocid" {
  description = "OCI Compartment OCID where resources will be created"
  type        = string
}

variable "instance_name" {
  description = "Name of the OCI Compute Instance"
  type        = string
  default     = "lumina-pdf-instance"
}

variable "instance_shape" {
  description = "The shape (size) of the compute instance"
  type        = string
  default     = "VM.Standard.E4.Flex" # Standard AMD flex shape
}

variable "instance_ocpus" {
  description = "Number of OCPUs for the instance (applicable for Flex shapes)"
  type        = number
  default     = 1
}

variable "instance_memory_in_gbs" {
  description = "Memory size in GBs for the instance (applicable for Flex shapes)"
  type        = number
  default     = 8 # 8GB is plenty for standard Stirling-PDF/Lumina-PDF
}

variable "ssh_public_key" {
  description = "SSH public key content to allow terminal access to the VM"
  type        = string
}

# Application Config
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
