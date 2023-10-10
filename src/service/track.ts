import axios from 'axios';
import Ajv from 'ajv';
import {throwError, RuntimeCache} from '../utils';
import {RecentTracks, recentTracksSchema} from '../schema/track';

export type Track = {
  artist: string;
  title: string;
};

export const index = async (): Promise<Track> => {
  const track = await getLastFmTrack();
  return track;
};

export const cache = new RuntimeCache();

async function getLastFmTrack() {
  return await cache.get<Track>({
    key: 'lastfm',
    fallback: {
      artist: 'unknown',
      title: 'unknown',
    },
    callback: async () => {
      const url = process.env.LASTFM_API_URL || '';
      const response = await axios.get(url);
      if (!isRecentTracks(response.data)) {
        throwError({
          errorCode: 'INVALID_SCHEMA',
          errorType: 'invalid schema',
          errorMessage: 'getLastFmTrack: Invalid response',
        })();
      }
      const track = response.data.recenttracks.track[0];
      const artist = track.artist['#text'];
      const title = track.name;
      return {artist, title};
    },
    ttl: 300,
  });
}

const ajv = new Ajv();
const isRecentTracks = (data: unknown): data is RecentTracks => {
  const schema = ajv.compile(recentTracksSchema);
  const isValid = schema(data);
  return isValid;
};
