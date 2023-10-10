# Serverless Express Vercel

Vercel Serverless RESTfull API example.
Using Express.js and Vercel Serverless functions.

## Intention

Express as a foundation, allows quick porting of existing applications. As well as the use of existing extensions from the Express ecosystem.

## Structure

```bash
serverless on  main [!] is 📦 v1.0.0 via  v18.16.0 via 💎 v3.0.0
❯ tree -d -C --gitignore -v
.
├── api
├── assets
│   ├── redoc
│   └── swagger
├── public
│   ├── redoc
│   └── swagger
├── scripts
├── src
│   ├── middleware
│   ├── router
│   ├── schema
│   ├── service
│   └── utils
└── tests

16 directories
```

## Features

- [x] Express App [api](./api/index.ts)
- [x] Express Router [router](./src/router)
- [x] Express Service [service](./src/service)
- [x] Express Middleware [middleware](./src/middleware)
- [x] Response Cache [middleware/cache](./src/middleware/cache.ts)
- [x] Response Compression [middleware/compression](./src/middleware/compression.ts)
- [x] Cross-Orign Resource Sharing [middleware/cors](./src/middleware/cors.ts)
- [x] Error handling [middleware/error](./src/middleware/error.ts)
- [x] JSON Webtoken support [middleware/jwt](./src/middleware/jwt.ts)
- [x] Manipulate Header [middleware/header](./src/middleware/header.ts)
- [x] Serv static paths [middleware/staticPath](./src/middleware/staticPath.ts)
- [x] Schema Validation [schema](./src/schema)
- [x] API Specification [openapi](./openapi.yml)
- [x] Environment Variables [dotenv](./.env.sample)
- [x] Log, Ip, Hash, Token, Response and RuntimeCache Utils [utils](./src/utils)
- [x] Rewrites [vercel.json](./vercel.json)
- [x] Generate `vercel.json` script [generateVercelJson.mjs](./scripts/generateVercelJson.mjs)
- [x] Generate JWToken [generateJWToken.mjs](./scripts/generateJWToken.mjs)
- [x] Generate Swagger [generateSwagger.mjs](./scripts/generateSwagger.mjs)
- [x] Generate HomePage [generateHomePage.mjs](./scripts/generateHomePage.mjs)
- [x] Ceck base bundle size [scripts](./scripts/checkSize.mjs)
- [x] Cache info Service [service/cache](./src/service/cache.ts)
- [x] Info example Service [service/info](./src/service/info.ts)
- [x] Track example Service [service/track](./src/service/track.ts)

## Solutions

- Application
  - Express [express](https://expressjs.com/)
  - Express JWT [express-jwt](https://github.com/auth0/express-jwt)
  - Express CORS [cors](https://github.com/expressjs/cors)
  - Express StaticPaths [express static](https://expressjs.com/de/starter/static-files.html)
  - Express ApiCache [apicache](https://github.com/kwhitley/apicache)
  - HTTP Client [axios](https://www.npmjs.com/package/axios)
  - JWT [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- Testing
  - Unit Test [jest](https://jestjs.io/)
  - E2E Test [playwright](https://playwright.dev/)
- Development
  - TypeScript [typescript](https://www.typescriptlang.org/)
  - nodemon [nodemon](https://nodemon.io/)
- Code Quality
  - Lint [eslint](https://eslint.org/)
  - Format [prettier](https://prettier.io/)
  - Commitlint [commitlint](https://commitlint.js.org/)
  - Husky Pre-Commit and Push hooks [husky](https://typicode.github.io/husky/#/)
- Documentation
  - Redoc API Documentation [redoc](https://redoc.ly/)
  - Swagger API Documentation [swagger](https://swagger.io/)
  - OpenAPI Specification [openapi](https://spec.openapis.org/oas/v3.0.2)
- CI/CD
  - Vercel serverless functions [vercel](https://vercel.com/docs/serverless-functions/introduction)
  - Using Express with Vercel [vercel](https://vercel.com/guides/using-express-with-vercel)
  - Configure Projects with vercel.json [vercel](https://vercel.com/docs/projects/project-configuration)

## Setup

Prerequisites:

- [pnpm](https://pnpm.io/) `npm i -g pnpm`

Install dependencies:

`pnpm i`

Update dependencies:

`pnpm up`

The pnpm install hook updates `includeFiles` in the `vercel.json` file.

## Development

Nodemon is used to watch for changes and restart the server.
Tsc is used to compile the TypeScript code.

`pnpm dev`

## Test

Eslint is used to lint the code.

`pnpm lint`

Jest is used to run the tests.
`pnpm test`

Playwright is used to run the e2e tests.

`pnpm e2e`

## Build

Tsc is used to compile the TypeScript code.
The swagger documentation is generated from the OpenAPI specification in the `openapi.yml` file.

`pnpm build`

## Pre-Commit and Pre-Push Hooks

The pre-commit and pre-push hooks are configured with the [husky]
The pre-commit hook runs the lint and generates the documentation.
The pre-push hook runs a test build.

## APIs

- <http://localhost:8000/api/track/>
- <http://localhost:8000/api/info>
- <http://localhost:8000/api/info/req/headers>
- <http://localhost:8000/api/cache/performance>
- <http://localhost:8000/api/cache>

## Documentation

Visit <http://localhost:8000/redoc> and <http://localhost:8000/swagger> to see the documentation.

### OpenAPI

<https://spec.openapis.org/oas/v3.0.2>

The Openapi specification is used to generate the API documentation.

Update the `openapi.yml` file and run `pnpm build:docs` to update the API documentation.

The `openapi.yml` file is used to generate the `swagger.json` file for the Swagger documentation.

### Redoc

The script copy the current version of the `openapi.yml` file for the documentation. Also copy all the assets.

### Swagger

The script generate the `swagger.json` from the current `openapi.yml` and copy the current version of the `swagger.json` file for the documentation. Also copy all the assets.

### Authentication

- <https://jwt.io/>
- <https://github.com/auth0/node-jsonwebtoken>

### Generate a JWT token

```bash
serverless on  main [!?] is 📦 v1.0.0 via  v18.16.0 via 💎 v3.0.0
❯ node scripts/generateJWToken.mjs
header.payload.secret
```

## Deployment

<https://vercel.com/docs/deployments/overview>

Using the Node.js Runtime for Serverless Functions from Vercel. Use the "functions" field in `vercel.json` to configure the serverless function entry point. The entry point must be moved to a `api` subfolder.

```json
{
  "functions": {
    "api/index.ts": {
      "memory": 1024,
      "maxDuration": 10,
      "includeFiles": "{{src,public}/**,{src,public}/**/**,package.json,node_modules/{ajv,apicache,axios,compression,cors,dotenv,express,express-jwt}/**,node_modules/{ajv,apicache,axios,compression,cors,dotenv,express,express-jwt}/**/**,}",
      "excludeFiles": "{src/**/*.test.ts,src/**/**/.test.ts}"
    }
  },
  "trailingSlash": true,
  "rewrites": [
    {
      "source": "/swagger/",
      "destination": "/swagger/index.html"
    },
    {
      "source": "/redoc/",
      "destination": "/redoc/index.html"
    },
    {
      "source": "/(.*)",
      "destination": "api/index.ts"
    }
  ]
}
```

### Legacy Version

Use "builds" instead of "functions" in `vercel.json`. The entry point must be moved to the `src` subfolder.

```json
{
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node",
      "config": {
        "includeFiles": [
          "src/**",
          "public/**",
          "package.json",
          "node_modules/ajv/**",
          "node_modules/apicache/**",
          "node_modules/axios/**",
          "node_modules/compression/**",
          "node_modules/cors/**",
          "node_modules/dotenv/**",
          "node_modules/express/**",
          "node_modules/express-jwt/**"
        ],
        "excludeFiles": ["src/**/*.test.ts"]
      }
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "src/index.ts"
    }
  ]
}
```

However, in the legacy version, it is also possible to use a JavaScript file as entry point.

```diff
{
    "builds": [
        {
-           "src": "index.ts",
+           "src": "dist/api/index.js",
            "use": "@vercel/node",
            "config": {
                "includeFiles": [
-                   "**"
+                   "dist/**"
                ]
            }
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
-           "dest": "index.ts"
+           "dest": "dist/api/index.js"
        }
    ]
}
```

But then you need to build the project first. And the `dist` folder must be checked in.
This can be automated with a git pre-commit hook.
For example with the pnpm 'pre-commit' package.
That allow to add a pre-commit field in the `package.json`

```diff
    "scripts": {
+      "build:add": "git add dist -f",
    },
+  "pre-commit": [
+      "check",
+      "build",
+      "build:add"
+  ]
```

### Generate the vercel.json file

```bash
pnpm run vercel:generate
```

or

```bash
serverless on  main [!] is 📦 v1.0.0 via  v18.16.0 via 💎 v3.0.0
❯ node scripts/generateVercelJson.mjs
Generate vercel.json
Generate vercel.json include dependencies {{src,public}/**,{src,public}/**/**,package.json,node_modules/{ajv,apicache,axios,compression,cors,dotenv,express,express-jwt}/**,node_modules/{ajv,apicache,axios,compression,cors,dotenv,express,express-jwt}/**/**,}
```
