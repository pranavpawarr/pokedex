import { describe, expect, test, beforeEach } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  let cache: Cache;

  beforeEach(() => {
    cache = new Cache();
  });

  test.concurrent.each([
    {
      key: "https://example.com",
      val: "testdata",
      interval: 500,
    },
    {
      key: "https://example.com/path",
      val: "moretestdata",
      interval: 1000,
    },
  ])("Test Caching $interval ms", async ({ key, val, interval }) => {
    const cache = new Cache(interval);

    cache.add(key, val);
    expect(cache.get(key)).toBe(val);

    await new Promise((resolve) => setTimeout(resolve, interval + 100));

    expect(cache.get(key)).toBeUndefined(); // Changed from toBe(null)

    cache.stopReapLoop();
  });
});
