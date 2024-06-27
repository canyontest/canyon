import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
@Injectable()
export class ListGitProviderService {
  constructor(private prisma: PrismaService) {}
  invoke() {
    return this.prisma.gitProvider.findMany({
      where:{}
    })
  }
}
