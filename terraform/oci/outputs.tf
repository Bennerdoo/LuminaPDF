output "instance_name" {
  description = "The display name of the OCI Compute Instance"
  value       = oci_core_instance.instance.display_name
}

output "public_ip" {
  description = "The public IP address of the Lumina-PDF server"
  value       = oci_core_instance.instance.public_ip
}

output "app_url" {
  description = "The web URL to access the Lumina-PDF application"
  value       = "http://${oci_core_instance.instance.public_ip}"
}
