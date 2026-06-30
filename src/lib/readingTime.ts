import reader from "reading-time";

export function getReadingTime(content: string): string {
  const result = reader(content);
  return result.text;
}

export function getReadingMinutes(content: string): number {
  const result = reader(content);
  return Math.ceil(result.minutes);
}
