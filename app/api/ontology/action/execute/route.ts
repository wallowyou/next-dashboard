import { NextResponse } from 'next/server';
import { MOCK_DB } from '@/app/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, parameters } = body;

    // 简单的路由分发逻辑
    switch (action) {
      case 'get_project_status': {
        const project = MOCK_DB.projects.find(p => p.name === parameters.projectName);
        if (!project) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        return NextResponse.json({
          status: "success",
          result: `项目 ${project.name} 当前状态为 ${project.status}，进度 ${project.progress}。`
        });
      }

      case 'update_project_status': {
        const projectIndex = MOCK_DB.projects.findIndex(p => p.name === parameters.projectName);
        if (projectIndex === -1) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        // 更新数据
        MOCK_DB.projects[projectIndex].status = parameters.newStatus;
        return NextResponse.json({
          status: "success",
          result: `成功将项目 ${parameters.projectName} 的状态更新为 ${parameters.newStatus}。`
        });
      }

      default:
        return NextResponse.json({ error: "Unknown action" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 500 });
  }
}