// lib/mock-data.ts

// 1. 定义本体 (Ontology) - 告诉 LLM 系统能做什么
export const SYSTEM_ONTOLOGY = {
  objects: [
    { name: "Project", description: "项目实体，包含名称、状态和进度" },
    { name: "Task", description: "项目下的具体任务" }
  ],
  actions: [
    {
      name: "get_project_status",
      description: "查询指定项目的状态和进度",
      parameters: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "项目名称" }
        },
        required: ["projectName"]
      }
    },
    {
      name: "update_project_status",
      description: "更新项目的状态",
      parameters: {
        type: "object",
        properties: {
          projectName: { type: "string", description: "项目名称" },
          newStatus: { type: "string", enum: ["Pending", "Active", "Completed"] }
        },
        required: ["projectName", "newStatus"]
      }
    }
  ]
};

// 2. 模拟业务数据 (Database)
export let MOCK_DB = {
  projects: [
    { id: 1, name: "Alpha", status: "Active", progress: "80%" },
    { id: 2, name: "Beta", status: "Pending", progress: "0%" },
  ]
};