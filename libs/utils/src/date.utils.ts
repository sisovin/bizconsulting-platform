export function formatDate(date: Date, format: string): string {
  const options: Intl.DateTimeFormatOptions = {};

  if (format.includes('yyyy')) options.year = 'numeric';
  if (format.includes('MM')) options.month = '2-digit';
  if (format.includes('dd')) options.day = '2-digit';
  if (format.includes('HH')) options.hour = '2-digit';
  if (format.includes('mm')) options.minute = '2-digit';
  if (format.includes('ss')) options.second = '2-digit';

  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function subtractDays(date: Date, days: number): Date {
  return addDays(date, -days);
}

export function calculateDateDifference(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
