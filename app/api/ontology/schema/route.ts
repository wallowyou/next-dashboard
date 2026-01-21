import { NextResponse } from 'next/server';
import { SYSTEM_ONTOLOGY } from '@/app/lib/mock-data';
/**
 * @swagger
 * /api/ontology/schema:
 *   get: 
 *     description: 获取ontology schema
 *     responses:
 *       200:
 *         description: 成功返回ontology schema
 */
export async function GET() {
  // 在真实场景中，这里可能会查询数据库元数据
  return NextResponse.json({
    message: "Successfully retrieved ontology schema",
    data: SYSTEM_ONTOLOGY
  });
}