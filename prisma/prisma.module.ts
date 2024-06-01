import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // this decorator used for as prisma service to be global not to import it in each module use prisma service 
@Module({
    providers:[PrismaService],
    exports:[PrismaService],
})
export  class PrismaModule {} 