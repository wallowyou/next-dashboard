import fs from 'node:fs/promises'
import path from 'node:path'
import { getApiDocs } from '../app/lib/swagger'

async function main() {
  const spec = await getApiDocs()
  const outputPath = path.join(process.cwd(), 'public', 'openapi.json')

  await fs.writeFile(outputPath, `${JSON.stringify(spec, null, 2)}\n`, 'utf8')
  console.log(`Generated OpenAPI spec at ${outputPath}`)
}

main().catch((error) => {
  console.error('Failed to generate OpenAPI spec:', error)
  process.exit(1)
})
