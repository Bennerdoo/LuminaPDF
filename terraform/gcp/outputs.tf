output "instance_name" {
  description = "The name of the GCE VM instance"
  value       = google_compute_instance.vm.name
}

output "public_ip" {
  description = "The static public IP address of the Lumina-PDF server"
  value       = google_compute_address.static_ip.address
}

output "app_url" {
  description = "The web URL to access the Lumina-PDF application"
  value       = "http://${google_compute_address.static_ip.address}"
}
