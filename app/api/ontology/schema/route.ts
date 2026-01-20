import { NextResponse } from 'next/server';
import { SYSTEM_ONTOLOGY } from '@/app/lib/mock-data';

export async function GET() {
  // 在真实场景中，这里可能会查询数据库元数据
  return NextResponse.json({
    message: "Successfully retrieved ontology schema",
    data: SYSTEM_ONTOLOGY
  });
}