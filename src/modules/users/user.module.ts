import { User } from "@entities/user.entity";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SharedModule } from "@shared/shared.module";

import { JwtAuthStrategy } from "../../auth/strategies/jwt-auth.strategy";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { UserAclService } from "./services/user-acl.service";

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtAuthStrategy, UserAclService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
