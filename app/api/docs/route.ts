import { getApiDocs, withServerUrl } from '@/app/lib/swagger';
import fs from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function getRequestServerUrl(request: Request) {
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');

  if (!host)
    return undefined;

  const protocol =
    request.headers.get('x-forwarded-proto') ?? new URL(request.url).protocol.replace(':', '');

  return `${protocol}://${host}`;
}

export async function GET(request: Request) {
  const openapiPath = path.join(process.cwd(), 'public', 'openapi.json');
  const requestServerUrl = getRequestServerUrl(request);

  try {
    const raw = await fs.readFile(openapiPath, 'utf8');
    const spec = JSON.parse(raw);
    return NextResponse.json(requestServerUrl ? withServerUrl(spec, requestServerUrl) : spec);
  } catch {
    // Fallback for local dev if file was not generated yet.
    const spec = await getApiDocs(requestServerUrl);
    return NextResponse.json(spec);
  }
}
