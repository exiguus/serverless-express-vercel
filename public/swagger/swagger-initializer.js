
window.onload = function () {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
    "swaggerDoc": {
  "basePath": "/api",
  "definitions": {
    "Cache": {
      "properties": {
        "all": {
          "items": {
            "type": "string"
          },
          "type": "array"
        },
        "groups": {
          "type": "object"
        }
      },
      "required": [
        "all",
        "groups"
      ],
      "type": "object"
    },
    "CachePerformance": {
      "items": {
        "properties": {
          "callCount": {
            "example": 1,
            "type": "integer"
          },
          "hitCount": {
            "example": 1,
            "type": "integer"
          },
          "hitRate": {
            "example": 1,
            "type": "number"
          },
          "hitRateLast100": {
            "example": 1,
            "type": "number"
          },
          "hitRateLast1000": {
            "example": 1,
            "type": "number"
          },
          "hitRateLast10000": {
            "example": 1,
            "type": "number"
          },
          "hitRateLast100000": {
            "example": 1,
            "type": "number"
          },
          "lastCacheHit": {
            "example": "/api/track",
            "type": "string"
          },
          "lastCacheMiss": {
            "example": "/api/track",
            "type": "string"
          },
          "missCount": {
            "example": 1,
            "type": "integer"
          }
        },
        "required": [
          "callCount",
          "hitCount",
          "hitRate",
          "hitRateLast100",
          "hitRateLast1000",
          "hitRateLast10000",
          "hitRateLast100000",
          "lastCacheHit",
          "lastCacheMiss",
          "missCount"
        ],
        "type": "object"
      },
      "type": "array"
    },
    "Error": {
      "properties": {
        "code": {
          "example": "invalid_token",
          "type": "string"
        },
        "inner": {
          "properties": {
            "message": {
              "example": "invalid token",
              "type": "string"
            },
            "name": {
              "example": "JsonWebTokenError",
              "type": "string"
            }
          },
          "required": [
            "name",
            "message"
          ],
          "type": "object"
        },
        "message": {
          "example": "invalid token",
          "type": "string"
        },
        "name": {
          "example": "UnauthorizedError",
          "type": "string"
        }
      },
      "required": [
        "code",
        "message",
        "name"
      ],
      "type": "object"
    },
    "Info": {
      "properties": {
        "ip": {
          "example": "::1",
          "type": "string"
        },
        "language": {
          "example": "en-US,en;q=0.9,de;q=0.8",
          "type": "string"
        },
        "timestamp": {
          "example": "2023-09-11T19:58:57.316Z",
          "type": "string"
        },
        "userAgent": {
          "example": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
          "type": "string"
        }
      },
      "required": [
        "ip",
        "timestamp"
      ],
      "type": "object"
    },
    "InfoReqHeaders": {
      "properties": {
        "accept": {
          "example": "application/json",
          "type": "string"
        },
        "accept-enconding": {
          "example": "gzip, deflate, br",
          "type": "string"
        },
        "accept-language": {
          "example": "en-US,en;q=0.9,de;q=0.8",
          "type": "string"
        },
        "connection": {
          "example": "keep-alive",
          "type": "string"
        },
        "host": {
          "example": "localhost:8000",
          "type": "string"
        },
        "pragma": {
          "example": "no-cache",
          "type": "string"
        },
        "referer": {
          "example": "http://localhost:8000/",
          "type": "string"
        },
        "sec-fetch-dest": {
          "example": "empty",
          "type": "string"
        },
        "sec-fetch-mode": {
          "example": "cors",
          "type": "string"
        },
        "sec-fetch-site": {
          "example": "same-origin",
          "type": "string"
        },
        "upgrade-insecure-requests": {
          "example": "1",
          "type": "string"
        },
        "user-agent": {
          "example": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36",
          "type": "string"
        },
        "x-forwarded-for": {
          "example": "::1",
          "type": "string"
        }
      },
      "type": "object"
    },
    "Response": {
      "properties": {
        "timestamp": {
          "example": "1694274132",
          "type": "string"
        },
        "type": {
          "enum": [
            "success",
            "error"
          ],
          "type": "string"
        },
        "version": {
          "example": "1.0.0",
          "type": "string"
        }
      },
      "required": [
        "type",
        "timestamp",
        "version"
      ],
      "type": "object"
    },
    "ResponseError": {
      "allOf": [
        {
          "$ref": "#/definitions/Response"
        }
      ],
      "properties": {
        "error": {
          "$ref": "#/definitions/Error"
        },
        "message": {
          "type": "string"
        },
        "status": {
          "enum": [
            "401",
            "404",
            "403",
            "500"
          ],
          "type": "string"
        },
        "type": {
          "enum": [
            "error"
          ],
          "type": "string"
        }
      },
      "required": [
        "type",
        "status",
        "message"
      ],
      "type": "object"
    },
    "ResponseSuccess": {
      "allOf": [
        {
          "$ref": "#/definitions/Response"
        }
      ],
      "properties": {
        "message": {
          "type": "string"
        },
        "status": {
          "enum": [
            "200"
          ],
          "example": "200",
          "type": "string"
        },
        "type": {
          "enum": [
            "success"
          ],
          "type": "string"
        }
      },
      "required": [
        "type",
        "status",
        "message"
      ],
      "type": "object"
    },
    "Track": {
      "properties": {
        "artist": {
          "example": "Daft Punk",
          "type": "string"
        },
        "title": {
          "example": "Get Lucky",
          "type": "string"
        }
      },
      "required": [
        "artist",
        "title"
      ],
      "type": "object"
    }
  },
  "info": {
    "description": "Serverless Express Vercel Example",
    "title": "serverless-express-vercel",
    "version": "1.0.0"
  },
  "paths": {
    "/cache": {
      "get": {
        "description": "Get Cache Info",
        "parameters": [],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/ResponseSuccess"
                },
                {
                  "properties": {
                    "data": {
                      "$ref": "#/definitions/Cache"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          },
          "401": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "403": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          }
        },
        "summary": "Get Cache",
        "tags": [
          "cache"
        ]
      }
    },
    "/cache/performance": {
      "get": {
        "description": "Get Cache Performance Info",
        "parameters": [],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/ResponseSuccess"
                },
                {
                  "properties": {
                    "data": {
                      "$ref": "#/definitions/CachePerformance"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          },
          "401": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "403": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          }
        },
        "summary": "Get Cache Performance",
        "tags": [
          "cache"
        ]
      }
    },
    "/info": {
      "get": {
        "description": "Get User Info",
        "parameters": [],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/ResponseSuccess"
                },
                {
                  "properties": {
                    "data": {
                      "$ref": "#/definitions/Info"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          },
          "401": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "403": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          }
        },
        "summary": "Get Info",
        "tags": [
          "info"
        ]
      }
    },
    "/info/req/headers": {
      "get": {
        "description": "Get User Request Headers Info",
        "parameters": [],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/ResponseSuccess"
                },
                {
                  "properties": {
                    "data": {
                      "$ref": "#/definitions/InfoReqHeaders"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          },
          "401": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "403": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          }
        },
        "summary": "Get Request Headers",
        "tags": [
          "info"
        ]
      }
    },
    "/track": {
      "get": {
        "description": "Get recent track",
        "parameters": [],
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Success",
            "schema": {
              "allOf": [
                {
                  "$ref": "#/definitions/ResponseSuccess"
                },
                {
                  "properties": {
                    "data": {
                      "$ref": "#/definitions/Track"
                    }
                  },
                  "type": "object"
                }
              ]
            }
          },
          "401": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "403": {
            "description": "Error Access",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          },
          "500": {
            "description": "Error",
            "schema": {
              "$ref": "#/definitions/ResponseError"
            }
          }
        },
        "summary": "Get Track",
        "tags": [
          "track"
        ]
      }
    }
  },
  "security": [
    {
      "bearerAuth": []
    },
    {
      "searchParameter": []
    }
  ],
  "securityDefinitions": {
    "bearerAuth": {
      "description": "Enter the JWT token with the `Bearer: ` prefix, e.g. \"Bearer abcde12345\".",
      "in": "header",
      "name": "Authorization",
      "type": "apiKey"
    }
  },
  "swagger": "2.0",
  "x-components": {}
},
    "customOptions": {
      "requestInterceptor": (req) => {
        req.headers.Authorization = 'Bearer ' + req.headers.Authorization;
        return req;
      }
    }
  };
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if (!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
