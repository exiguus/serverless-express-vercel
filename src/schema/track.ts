import {JSONSchemaType} from 'ajv';

export type RecentTracks = {
  recenttracks: {
    track: {
      artist: {
        '#text': string;
      };
      name: string;
    }[];
  };
};

export const recentTracksSchema: JSONSchemaType<RecentTracks> = {
  type: 'object',
  properties: {
    recenttracks: {
      type: 'object',
      properties: {
        track: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            properties: {
              artist: {
                type: 'object',
                properties: {
                  '#text': {
                    type: 'string',
                  },
                },

                required: ['#text'],
              },
              name: {
                type: 'string',
              },
            },
            required: ['artist', 'name'],
          },
        },
      },
      required: ['track'],
    },
  },
  required: ['recenttracks'],
};
