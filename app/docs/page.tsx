'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// 动态导入以避免 SSR 问题
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocPage() {
  // 指向你上面创建的生成 json 的 API 地址
  // 方案一的地址是 /api/docs
  // 方案二的地址是 /api/openapi.json
  return <SwaggerUI url="/api/docs" />;
}