import { NextResponse } from 'next/server';
import { MOCK_DB } from '@/app/lib/mock-data';

/**
 * 执行 ontology 动作的接口仅支持 POST。
 * 请求体: { action: string, parameters: string | object }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log("请求体:", body);
    // 1. 解构出 action 和 parameters
    let { action, parameters } = body;

    // 2. 关键修复：如果 parameters 是字符串，必须手动解析成对象
    if (typeof parameters === 'string') {
      try {
        parameters = JSON.parse(parameters);
        console.log("解析后的 Parameters:", parameters);
      } catch (e) {
        console.error("Parameters JSON 解析失败:", e);
        return NextResponse.json({ error: "Invalid parameters format (Expected JSON string)" }, { status: 400 });
      }
    }

    // 3. 路由分发逻辑 (使用解析后的 parameters)
    switch (action) {
      case 'get_project_status': {
        const project = MOCK_DB.projects.find(p => p.name === parameters.projectName);
        if (!project) {
          console.warn(`项目未找到: ${parameters.projectName}`);
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({
          status: "success",
          result: `项目 ${project.name} 当前状态为 ${project.status}，进度 ${project.progress}。`
        });
      }

      case 'update_project_status': {
        // 注意：这里要处理 parameters.projectName 可能为空的情况
        if (!parameters.projectName) {
           return NextResponse.json({ error: "Missing projectName" }, { status: 400 });
        }

        const projectIndex = MOCK_DB.projects.findIndex(p => p.name === parameters.projectName);
        if (projectIndex === -1) {
          console.warn(`项目未找到: ${parameters.projectName}`);
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        
        // 更新数据
        MOCK_DB.projects[projectIndex].status = parameters.newStatus;
        
        const resultMsg = `成功将项目 ${parameters.projectName} 的状态更新为 ${parameters.newStatus}。`;
        console.log("执行成功:", resultMsg);
        
        return NextResponse.json({
          status: "success",
          result: resultMsg
        });
      }

      default:
        console.error(`未知动作: ${action}`);
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e) {
    console.error("服务器内部错误:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/** 仅支持 POST，GET 返回 405 及正确用法说明 */
export async function GET() {
  return NextResponse.json(
    {
      error: 'Method Not Allowed',
      message: '此接口仅支持 POST。请使用: POST /api/ontology/action/execute，请求体: { "action": "update_project_status", "parameters": "{\\"projectName\\": \\"Alpha\\", \\"newStatus\\": \\"Completed\\"}" }'
    },
    { status: 405 }
  );
}