export type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  #reap() {
    const now = Date.now();
    for (const [key, entry] of this.#cache.entries()) {
      if (now - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  #startReapLoop() {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
  }

  constructor(interval: number = 2 * 60 * 1000) {
    this.#interval = interval;
    this.#startReapLoop();
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, val: T): void {
    const entry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val,
    };
    this.#cache.set(key, entry);
  }

  get<T>(key: string): T | undefined {
    const entry = this.#cache.get(key);
    return entry?.val as T | undefined;
  }

  has(key: string): boolean {
    return this.#cache.has(key);
  }

  clear(): void {
    this.#cache.clear();
  }
}
