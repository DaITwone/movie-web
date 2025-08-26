export function formatDate(str) {
  if (!str) return ''
  const d = new Date(str)
  return d.toLocaleDateString()
}
