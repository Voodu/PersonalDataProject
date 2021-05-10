export function dateTimeReviver(key: unknown, value: unknown): Date | unknown {
  return key === 'datetime' ? new Date(value as string) : value;
}
