import fs from 'node:fs/promises'
import path from 'node:path'
import { createSwaggerSpec } from 'next-swagger-doc'

async function main() {
  const spec = createSwaggerSpec({
    apiFolder: 'app/api',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next.js API Documentation',
        version: '1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [],
    },
  })

  const outputPath = path.join(process.cwd(), 'public', 'openapi.json')
  await fs.writeFile(outputPath, `${JSON.stringify(spec, null, 2)}\n`, 'utf8')
  console.log(`Generated OpenAPI spec at ${outputPath}`)
}

main().catch((error) => {
  console.error('Failed to generate OpenAPI spec:', error)
  process.exit(1)
})
