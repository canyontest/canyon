import { apollo, gql } from "@elysiajs/apollo";
import { Elysia } from "elysia";
import { PrismaClient } from '@prisma/client'
import path from "node:path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../../../.env"),
});

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const u = await prisma.user.findMany({
    where:{}
  })
  console.log(u)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


new Elysia()
.use(
  apollo({
    typeDefs: gql`
      type Book {
        title: String
        author: String
      }

      type Query {
        books: [Book]
      }
    `,
    resolvers: {
      Query: {
        books: () => {
          return [
            {
              title: "Elysia",
              author: "saltyAom",
            },
          ];
        },
      },
    },
  }),
)
.listen(8080);
