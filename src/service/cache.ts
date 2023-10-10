import apiCache from 'apicache';

export type CachePerformance = {
  performance: Array<Record<string, string>>;
};

export const performance = (): CachePerformance => apiCache.getPerformance();

export type Cache = {
  all: Array<Record<string, string>>;
  groups: Record<string, Array<Record<string, string>>>;
};

export const index = (): Cache => apiCache.getIndex();
