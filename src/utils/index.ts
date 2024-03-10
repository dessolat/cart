export function pause<T>(data: T): Promise<T> {
  return new Promise(res => setTimeout(() => res(data), 250));
}
