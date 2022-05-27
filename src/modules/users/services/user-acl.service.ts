import { User } from "@entities/user.entity";
import { Injectable } from "@nestjs/common";
import { BaseAclService } from "@shared/acl/acl.service";
import { Action } from "@shared/acl/action.constant";
import { Actor } from "@shared/acl/actor.constant";

import { ROLE } from "../../../auth/constants/role.constant";

@Injectable()
export class UserAclService extends BaseAclService<User> {
  constructor() {
    super();
    // Admin can do all action
    this.canDo(ROLE.ADMIN, [Action.Manage]);
    //users can read himself or any other users
    this.canDo(ROLE.USER, [Action.Read]);
    // users can only update himself
    this.canDo(ROLE.USER, [Action.Update], this.isUserItself);
  }

  isUserItself(resource: User, actor: Actor): boolean {
    return resource.id === actor.id;
  }
}
