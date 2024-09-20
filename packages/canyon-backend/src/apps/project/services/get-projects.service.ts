// import { PrismaClient } from '@prisma/client';

// 定义 Context 类型
interface Context {
  db: any;
}

// 定义 Args 类型 (根据你的 GraphQL schema 的参数结构)
interface GetProjectsArgs {
  // 根据你的 schema 定义参数类型，比如：
  projectID?: string;
}

// 定义返回值类型
interface GetProjectsResponse {
  data: any[];  // 你可以更具体地定义数据的类型
  total: number;
}

// 优化后的 getProjectsService
export const getProjectsService = async (
  parent: any,         // 这里可以根据需要优化 parent 的类型
  args: GetProjectsArgs, // 定义 args 类型
  context: Context       // 使用明确的 Context 类型
): Promise<GetProjectsResponse> => {

  // 查询用户数据 (根据你的 schema 和数据库结构调整查询)
  const users = await context.db.user.findMany({});

  // 打印查询结果，便于调试
  console.log(users);

  // 返回符合 GraphQL schema 的响应结构
  return {
    data: [{
      id: "1",
      description: "description",
    }],  // 这里可以返回实际的数据
    total: 0,
  };
};
