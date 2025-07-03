import camelcaseKeys from 'camelcase-keys';

export function toCamelCase<T>(data: any): T {
  return camelcaseKeys(data, { deep: true }) as T;
}

export function toSnakeCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function keysToSnakeCase(obj: any): any {
  if (Array.isArray(obj)) return obj.map(keysToSnakeCase);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [toSnakeCase(k), keysToSnakeCase(v)]),
    );
  }
  return obj;
}
