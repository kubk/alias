import { reaction, runInAction } from "mobx";

// Call after makeAutoObservable; saved fields are restored synchronously.
export function persist<T extends object>(
  store: T,
  options: { name: string; fields: readonly (keyof T)[] }
) {
  const { name, fields } = options;
  try {
    const item = window.localStorage.getItem(name);
    if (item !== null) {
      const stored: Partial<T> = JSON.parse(item);
      runInAction(() => {
        for (const property of fields) {
          if (Object.hasOwn(stored, property)) {
            store[property] = stored[property]!;
          }
        }
      });
    }
  } catch {
    // Malformed data or unavailable storage should not prevent startup.
  }

  return reaction(
    () =>
      Object.fromEntries(fields.map((property) => [property, store[property]])),
    (state) => {
      try {
        window.localStorage.setItem(name, JSON.stringify(state));
      } catch {
        // Preferences still work in memory when storage is unavailable or full.
      }
    }
  );
}
