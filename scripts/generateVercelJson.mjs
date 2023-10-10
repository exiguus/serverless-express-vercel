import fs from 'fs';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import packageJson from '../package.json' assert {type: 'json'};
const __dirname = dirname(fileURLToPath(import.meta.url)) + '/';

const args = process.argv.slice(2);

const planArg = args[0] || 'hobby';

// Vercel Plan restrictions
// https://vercel.com/docs/functions/serverless-functions/runtimes#maxduration
// https://vercel.com/docs/functions/serverless-functions/runtimes#memory-size-limits
const plans = {
  hobby: {
    memory: 1024,
    maxDuration: 10,
  },
  pro: {
    memory: 3008,
    maxDuration: 15,
  },
};

const base = {
  functions: {
    'api/index.ts': {
      memory: plans[planArg].memory,
      maxDuration: plans[planArg].maxDuration,
      // Runtime is not needed for Node.js
      // runtime: '@vercel/node@3.0.7',
      includeFiles: `{
        {src,public}/**,
        {src,public}/**/**,
        package.json,
      }`
        .replace('\n', '')
        .replace(/\s+/g, ''),
      excludeFiles: `{
        src/**/*.test.ts,
        src/**/**/.test.ts
      }`
        .replace('\n', '')
        .replace(/\s+/g, ''),
    },
  },
  trailingSlash: true,
  rewrites: [
    {
      source: '/swagger/',
      destination: '/swagger/index.html',
    },
    {
      source: '/redoc/',
      destination: '/redoc/index.html',
    },
    {
      source: '/api/(.*)',
      destination: 'api/index.ts',
    },
    {
      source: '/(.*)',
      destination: '/index.html',
    },
  ],
};

const includeDependencies = () => {
  const dependencies = Object.keys(packageJson.dependencies);
  const includeDependencies = dependencies.map((dependency) => {
    return `${dependency}`;
  });
  const includeFiles = `
    {
      {src,public}/**,
      {src,public}/**/**,
      package.json,
      node_modules/{${includeDependencies.join(',')}}/**,
      node_modules/{${includeDependencies.join(',')}}/**/**,
    }`
    .replace('\n', '')
    .replace(/\s+/g, '');

  if (includeFiles.length > 256) {
    console.error(
      'The `vercel.json` schema validation failed with the following message: `functions.api/index.ts.includeFiles` should NOT be longer than 256 characters',
    );
    process.exit(1);
  }
  return includeFiles;
};

const generateVercelJson = () => {
  fs.writeFileSync(
    __dirname + '../vercel.json',
    JSON.stringify(
      {
        ...base,
        functions: {
          ...base.functions,
          'api/index.ts': {
            ...base.functions['api/index.ts'],
            includeFiles: includeDependencies(),
          },
        },
      },
      null,
      2,
    ),
  );

  console.info('Generate vercel.json');
  console.info(
    'Generate vercel.json include dependencies',
    includeDependencies(),
  );
};

generateVercelJson();
