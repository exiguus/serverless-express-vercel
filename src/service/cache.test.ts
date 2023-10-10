import {index, performance} from './cache';

describe('service cache', () => {
  test('index data', async () => {
    const data = await index();
    expect(data).toEqual({
      all: expect.any(Array),
      groups: expect.any(Object),
    });
  });

  test('performance data', async () => {
    const data = await performance();
    expect(data).toEqual(expect.any(Array));
  });
});
