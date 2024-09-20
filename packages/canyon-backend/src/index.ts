import { apollo, gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";
// import { PrismaClient } from '@prisma/client'
import path from "node:path";
import dotenv from "dotenv";
import fs from "node:fs";
import {getProjectsService} from "./apps/project/services/get-projects.service";
// import { gql } from "graphql-tag";
import { PrismaClient } from '@prisma/client';  // 引入 PrismaClient


// 读取 .graphql 文件内容
const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, "../schema.gql"), "utf-8"));


dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

// 初始化 Prisma 客户端
const prisma = new PrismaClient();

new Elysia()
.use(
  apollo({
    typeDefs: typeDefs,
    resolvers: {
      Query: {
        getProjects: getProjectsService,
      },
    },
    // 在 context 中传递 PrismaClient 实例
    context: () => ({
      db: prisma, // 将 PrismaClient 注入到 context 中作为 db
    }),
  }),
)
.listen(8080);
