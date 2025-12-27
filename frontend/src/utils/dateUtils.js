export function formatDate(dateStr) {
  if (!dateStr) return 'Не указано';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ru-RU').format(date);
}
