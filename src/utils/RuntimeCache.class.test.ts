import {RuntimeCache} from './RuntimeCache.class';

describe('RuntimeCache', () => {
  type Item = {item: number | null};
  const getValue = () => Math.floor(Math.random() * 100);
  let itemValue: Item['item'] = null;

  const handleFulfilled = (value: unknown): Item => {
    itemValue = typeof value === 'number' ? value : null;
    return {item: itemValue};
  };
  const handleReject = (value: unknown): Item => {
    itemValue = typeof value === 'number' ? value : null;
    return {item: getValue()};
  };

  const promise = async () =>
    new Promise((resolve) => {
      const value = getValue();
      setTimeout(() => {
        resolve(value);
      }, 1000);
    });

  const config = {
    key: 1,
    ttl: 600 * 5,
    fallback: {item: null},
    callback: () => promise().then(handleFulfilled),
  };

  let cache = new RuntimeCache();

  beforeEach(() => {
    cache = new RuntimeCache();
  });

  test('check fetched/cached version', async () => {
    expect((await cache.get(config)).item).toBe(itemValue);
    expect((await cache.get(config)).item).toBe(itemValue);
    expect((await cache.get(config)).item).toBe(itemValue);

    expect(
      (
        await cache.get({
          ...config,
          callback: () => promise().then(handleFulfilled),
        })
      ).item,
    ).toBe(itemValue);
    expect(
      (
        await cache.get({
          ...config,
          key: 2,
          callback: () => promise().then(handleReject),
        })
      ).item,
    ).not.toBe(itemValue);
  }, 10000);

  test('check fallback version', async () => {
    const promise = async () =>
      new Promise((_resolve, reject) => {
        const value = getValue();
        setTimeout(() => {
          reject(value);
        }, 1000);
      });

    const fallback = {item: 42};
    expect(
      (
        await cache.get({
          key: 23,
          fallback,
          callback: () =>
            promise().then(
              (value) => ({item: value}),
              (error) => {
                throw new Error('rejected: ' + error);
              },
            ),
        })
      ).item,
    ).toBe(fallback.item);
  });
});
