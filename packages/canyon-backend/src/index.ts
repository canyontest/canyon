import { apollo, gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";
// import { PrismaClient } from '@prisma/client'
import path from "node:path";
import dotenv from "dotenv";
import fs from "node:fs";
import {getProjectsService} from "./apps/project/services/get-projects.service";
// import { gql } from "graphql-tag";

// 读取 .graphql 文件内容
const typeDefs = gql(fs.readFileSync(path.resolve(__dirname, "../schema.gql"), "utf-8"));


dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

new Elysia()
.use(
  apollo({
    typeDefs: typeDefs,
    resolvers: {
      Query: {
        getProjects: getProjectsService,
      },
    },
  }),
)
.listen(8080);
