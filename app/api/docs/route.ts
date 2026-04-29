import { getApiDocs } from '@/app/lib/swagger';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  const openapiPath = path.join(process.cwd(), 'public', 'openapi.json');

  try {
    const raw = await fs.readFile(openapiPath, 'utf8');
    return NextResponse.json(JSON.parse(raw));
  } catch {
    // Fallback for local dev if file was not generated yet.
    const spec = await getApiDocs();
    return NextResponse.json(spec);
  }
}