abstract class Storage<T> {
  protected readonly STORAGE_KEY: string;

  public constructor(storageKey: string) {
    this.STORAGE_KEY = storageKey;
    this.init();
  }

  public abstract getItms(): T[];
  public abstract saveItems(items: T[]): void;
  public abstract clearItems(): void;
  protected abstract init(): void;
}

export default Storage;
