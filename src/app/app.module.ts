import { Module } from "@nestjs/common";
import { SharedModule } from "@shared/shared.module";

import { AuthModule } from "../auth/auth.module";
import { UserModule } from "../modules/users/user.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [SharedModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
