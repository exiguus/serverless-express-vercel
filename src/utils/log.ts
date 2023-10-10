import {Console} from 'console';

export type ConsoleType = keyof Pick<
  Console,
  'info' | 'error' | 'warn' | 'debug'
>;

export const log = (
  message: string | Record<string, string>,
  consoleType: ConsoleType = 'info',
) => {
  if (process.env.NODE_ENV === 'production' || process.env.DEBUG === 'enabled')
    console[consoleType](message);
};
