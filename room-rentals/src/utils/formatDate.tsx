export default function formatDate(date: Date | string) {
    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    return formatter.format(new Date(date));
  }