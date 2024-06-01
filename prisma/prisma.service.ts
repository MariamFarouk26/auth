
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutDownHooks(app:INestApplication){
    (this.$on as any)("beforeExit",async ()=>{
        console.log('Closing database connection...')
        await app.close();
    })
}
}