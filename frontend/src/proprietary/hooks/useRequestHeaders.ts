export function useRequestHeaders(): HeadersInit {
  const token = localStorage.getItem("lumina_jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
}
