export * from './error';
export * from './response';
export * from './RuntimeCache.class';
export * from './getToken';
export * from './getIp';
export * from './getHash';
export * from './headers';
export * from './log';

const isDevelopment = (): boolean => process.env.NODE_ENV === 'development';
const isDebug = (): boolean =>
  isDevelopment() && process.env.DEBUG === 'enabled';

export {isDevelopment, isDebug};
