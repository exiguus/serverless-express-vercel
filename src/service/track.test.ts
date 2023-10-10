import {index} from './track';

describe('service track', () => {
  test('data', async () => {
    const data = await index();
    expect(data).toEqual({
      artist: expect.any(String),
      title: expect.any(String),
    });
  });
});
