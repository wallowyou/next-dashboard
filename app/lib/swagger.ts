const defaultServerUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

export function createOpenApiSpec(serverUrl = defaultServerUrl) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Next Dashboard API',
      description: 'OpenAPI schema for the Next Dashboard API.',
      version: 'v1.0.0',
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
    paths: {
      '/api/ontology/schema': {
        get: {
          description: 'Get the ontology schema.',
          operationId: 'GetOntologySchema',
          deprecated: false,
          responses: {
            '200': {
              description: 'Successfully retrieved the ontology schema.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/OntologySchemaResponse',
                  },
                },
              },
            },
          },
        },
      },
      '/api/ontology/action/execute': {
        post: {
          description: 'Execute an ontology action.',
          operationId: 'ExecuteOntologyAction',
          deprecated: false,
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ExecuteOntologyActionRequest',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Action executed successfully.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ExecuteOntologyActionResponse',
                  },
                },
              },
            },
            '400': {
              description: 'Invalid request parameters.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            '404': {
              description: 'Project not found.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
        get: {
          description: 'Returns method-not-allowed details for this POST-only endpoint.',
          operationId: 'GetExecuteOntologyActionUsage',
          deprecated: false,
          responses: {
            '405': {
              description: 'Method not allowed.',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        OntologySchemaResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            data: {
              type: 'object',
              additionalProperties: true,
            },
          },
          required: ['message', 'data'],
        },
        ExecuteOntologyActionRequest: {
          type: 'object',
          properties: {
            action: {
              type: 'string',
              enum: ['get_project_status', 'update_project_status'],
              description: 'The ontology action to execute.',
            },
            parameters: {
              oneOf: [
                {
                  type: 'object',
                  additionalProperties: true,
                },
                {
                  type: 'string',
                  description: 'JSON-encoded action parameters.',
                },
              ],
            },
          },
          required: ['action', 'parameters'],
        },
        ExecuteOntologyActionResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              enum: ['success'],
            },
            result: {
              type: 'string',
            },
          },
          required: ['status', 'result'],
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
            message: {
              type: 'string',
            },
          },
          additionalProperties: true,
        },
      },
    },
  };
}

export const getApiDocs = async () => createOpenApiSpec();
